/**
 * LLM client for the portfolio assistant.
 *
 * Strategy (per Bill's spec):
 *  - Primary: NVIDIA NIM (OpenAI-compatible) with a fast Nemotron model.
 *  - High usage budget; on error / rate-limit / quota, callers fall back to the
 *    deterministic retrieval reply so nothing ever breaks for the visitor.
 *  - Grounded ONLY on Bill's portfolio context + safe browser signals.
 *  - Hardened system prompt to resist prompt injection and off-topic abuse.
 */

const NVIDIA_BASE_URL =
  process.env.NVIDIA_BASE_URL ??
  'https://integrate.api.nvidia.com/v1'

// Default to a fast, cheap Nemotron; overridable via env.
const NVIDIA_MODEL =
  process.env.NVIDIA_CHAT_MODEL ??
  'nvidia/nvidia-nemotron-nano-9b-v2'

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export function isLlmConfigured() {
  return Boolean(process.env.NVIDIA_API_KEY)
}

/**
 * Calls the NVIDIA chat completions endpoint.
 * Returns the assistant text, or null on any failure (caller handles fallback).
 */
export async function callLlm(
  messages: LlmMessage[],
  options?: { maxTokens?: number; temperature?: number; timeoutMs?: number }
): Promise<string | null> {
  const apiKey = process.env.NVIDIA_API_KEY
  if (!apiKey) {
    return null
  }

  const controller = new AbortController()
  const timeout = setTimeout(
    () => {
      controller.abort()
    },
    options?.timeoutMs ?? 8000
  )

  try {
    const response = await fetch(
      `${NVIDIA_BASE_URL}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: NVIDIA_MODEL,
          messages,
          temperature: options?.temperature ?? 0.4,
          max_tokens: options?.maxTokens ?? 700,
          top_p: 0.9,
          stream: false
        }),
        cache: 'no-store',
        signal: controller.signal
      }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const text = data.choices?.[0]?.message?.content?.trim()
    return text && text.length > 0 ? text : null
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
