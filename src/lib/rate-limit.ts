/**
 * Lightweight in-memory rate limiter for the chat endpoint.
 *
 * Per Bill's spec: keep a GENEROUS limit so real visitors are never blocked,
 * but protect against abuse / cost blow-ups. When a client exceeds the LLM
 * budget, the caller transparently falls back to the deterministic reply
 * (no error shown to the visitor).
 *
 * Note: in-memory state is per serverless instance. It is a pragmatic guard,
 * not a distributed quota. Good enough for a portfolio; swap for Upstash/Redis
 * if traffic ever grows.
 */

interface Bucket {
  count: number
  resetAt: number
}

const WINDOW_MS = 60 * 60 * 1000 // 1 hour rolling window

// Generous budgets (Bill: "no limites nada... un limite grande").
const LLM_PER_IP_PER_HOUR = Number(
  process.env.CHAT_LLM_PER_IP_PER_HOUR ?? 120
)
const LLM_GLOBAL_PER_HOUR = Number(
  process.env.CHAT_LLM_GLOBAL_PER_HOUR ?? 4000
)

const ipBuckets = new Map<string, Bucket>()
let globalBucket: Bucket = { count: 0, resetAt: Date.now() + WINDOW_MS }

function tick(bucket: Bucket): Bucket {
  const now = Date.now()
  if (now > bucket.resetAt) {
    return { count: 0, resetAt: now + WINDOW_MS }
  }
  return bucket
}

/**
 * Returns true if this request is allowed to use the LLM.
 * When false, the caller should use the deterministic fallback reply.
 */
export function allowLlm(ip: string): boolean {
  // Global guard first (cost protection).
  globalBucket = tick(globalBucket)
  if (globalBucket.count >= LLM_GLOBAL_PER_HOUR) {
    return false
  }

  const existing = ipBuckets.get(ip)
  const bucket = existing ? tick(existing) : { count: 0, resetAt: Date.now() + WINDOW_MS }

  if (bucket.count >= LLM_PER_IP_PER_HOUR) {
    ipBuckets.set(ip, bucket)
    return false
  }

  bucket.count += 1
  globalBucket.count += 1
  ipBuckets.set(ip, bucket)

  // Opportunistic cleanup to bound memory.
  if (ipBuckets.size > 5000) {
    const now = Date.now()
    Array.from(ipBuckets.entries()).forEach(([key, value]) => {
      if (now > value.resetAt) {
        ipBuckets.delete(key)
      }
    })
  }

  return true
}
