import fs from 'fs'
import path from 'path'
import { put, list } from '@vercel/blob'

export interface VisitorEvent {
  id: string
  countryCode: string
  sessionId: string
  timestamp: number
}

export interface VisitorStatsState {
  counts: Record<string, number>
  events: VisitorEvent[]
  seenSessions: Record<string, boolean>
}

/** Baseline seed so the footer is not empty on first boot. */
const INITIAL_COUNTS: Record<string, number> = {
  CL: 23,
  VE: 12,
  US: 8,
  RU: 3
}

const BLOB_PATHNAME = 'visitor-stats.json'
const STORAGE_DIR = path.join(process.cwd(), 'data')
const STORAGE_FILE = path.join(
  STORAGE_DIR,
  'visitor-stats.json'
)
const TMP_FILE = path.join(
  '/tmp',
  'billgaize-visitor-stats.json'
)

const emptyState = (): VisitorStatsState => ({
  counts: { ...INITIAL_COUNTS },
  events: [],
  seenSessions: {}
})

let memoryState: VisitorStatsState = emptyState()
let memoryLoaded = false
let writeChain: Promise<void> = Promise.resolve()

function normalizeCountryCode(countryCode: string) {
  const clean = countryCode.trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(clean)) {
    return 'OTHER'
  }
  return clean
}

function isValidState(
  value: unknown
): value is VisitorStatsState {
  if (!value || typeof value !== 'object') {
    return false
  }
  const parsed = value as VisitorStatsState
  return Boolean(
    parsed.counts && parsed.events && parsed.seenSessions
  )
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function readJsonFile(
  filePath: string
): VisitorStatsState | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }
    const parsed = JSON.parse(
      fs.readFileSync(filePath, 'utf8')
    ) as unknown
    return isValidState(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeJsonFile(
  filePath: string,
  state: VisitorStatsState
) {
  try {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(
      filePath,
      JSON.stringify(state, null, 2),
      'utf8'
    )
    return true
  } catch {
    return false
  }
}

async function loadFromBlob(): Promise<VisitorStatsState | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return null
  }

  try {
    const listed = await list({
      prefix: BLOB_PATHNAME,
      limit: 10,
      token
    })
    const match = listed.blobs.find(
      (blob) =>
        blob.pathname === BLOB_PATHNAME ||
        blob.pathname.endsWith(`/${BLOB_PATHNAME}`)
    )
    if (!match?.url) {
      return null
    }

    // Private blobs require the RW token on read.
    const response = await fetch(match.url, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      return null
    }
    const parsed = (await response.json()) as unknown
    return isValidState(parsed) ? parsed : null
  } catch {
    return null
  }
}

async function saveToBlob(state: VisitorStatsState) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return false
  }

  try {
    await put(BLOB_PATHNAME, JSON.stringify(state), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      token
    })
    return true
  } catch {
    return false
  }
}

async function ensureLoaded() {
  if (memoryLoaded) {
    return memoryState
  }

  const fromBlob = await loadFromBlob()
  if (fromBlob) {
    memoryState = fromBlob
    memoryLoaded = true
    return memoryState
  }

  // Prefer /tmp on Vercel (writable), then local data/ for dev.
  const fromTmp = readJsonFile(TMP_FILE)
  if (fromTmp) {
    memoryState = fromTmp
    memoryLoaded = true
    return memoryState
  }

  const fromDisk = readJsonFile(STORAGE_FILE)
  if (fromDisk) {
    memoryState = fromDisk
    memoryLoaded = true
    return memoryState
  }

  memoryState = emptyState()
  memoryLoaded = true
  return memoryState
}

async function persist(state: VisitorStatsState) {
  memoryState = state
  memoryLoaded = true

  let blobOk = false
  writeChain = writeChain.then(async () => {
    blobOk = await saveToBlob(state)
    // Always try /tmp (works on Vercel instances) + local data/ (dev).
    writeJsonFile(TMP_FILE, state)
    if (!blobOk) {
      writeJsonFile(STORAGE_FILE, state)
    }
  })

  await writeChain
  return blobOk
}

export async function registerVisit(input: {
  sessionId: string
  countryCode: string
}) {
  const state = await ensureLoaded()
  const countryCode = normalizeCountryCode(
    input.countryCode
  )

  if (state.seenSessions[input.sessionId]) {
    return { state, blobOk: hasBlobToken() }
  }

  const nextState: VisitorStatsState = {
    counts: {
      ...state.counts,
      [countryCode]: (state.counts[countryCode] ?? 0) + 1
    },
    seenSessions: {
      ...state.seenSessions,
      [input.sessionId]: true
    },
    events: [
      ...state.events,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        countryCode,
        sessionId: input.sessionId,
        timestamp: Date.now()
      }
    ].slice(-250)
  }

  const blobOk = await persist(nextState)
  return { state: nextState, blobOk }
}

export async function readStats(since?: number) {
  const state = await ensureLoaded()

  const events =
    typeof since === 'number'
      ? state.events.filter(
          (event) => event.timestamp > since
        )
      : state.events

  const latestTimestamp =
    state.events.length > 0
      ? state.events[state.events.length - 1].timestamp
      : 0

  return {
    counts: state.counts,
    events,
    latestTimestamp,
    durable: hasBlobToken()
  }
}
