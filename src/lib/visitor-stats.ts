import fs from 'fs'
import path from 'path'

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

const INITIAL_COUNTS: Record<string, number> = {
  CL: 23,
  VE: 12,
  US: 8,
  RU: 3
}

const STORAGE_DIR = path.join(process.cwd(), 'data')
const STORAGE_FILE = path.join(
  STORAGE_DIR,
  'visitor-stats.json'
)

let memoryState: VisitorStatsState = {
  counts: INITIAL_COUNTS,
  events: [],
  seenSessions: {}
}

function normalizeCountryCode(countryCode: string) {
  const clean = countryCode.trim().toUpperCase()

  if (!/^[A-Z]{2}$/.test(clean)) {
    return 'OTHER'
  }

  return clean
}

function loadFromDisk() {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return null
    }

    const raw = fs.readFileSync(STORAGE_FILE, 'utf8')
    const parsed = JSON.parse(raw) as VisitorStatsState

    if (
      !parsed.counts ||
      !parsed.events ||
      !parsed.seenSessions
    ) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

function saveToDisk(state: VisitorStatsState) {
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true })
    }

    fs.writeFileSync(
      STORAGE_FILE,
      JSON.stringify(state, null, 2),
      'utf8'
    )
  } catch {
    // Fallback to in-memory state when filesystem is read-only.
  }
}

function getState() {
  const diskState = loadFromDisk()

  if (diskState) {
    memoryState = diskState
  }

  return memoryState
}

function setState(nextState: VisitorStatsState) {
  memoryState = nextState
  saveToDisk(nextState)
}

export function registerVisit(input: {
  sessionId: string
  countryCode: string
}) {
  const state = getState()
  const countryCode = normalizeCountryCode(
    input.countryCode
  )

  if (state.seenSessions[input.sessionId]) {
    return state
  }

  const nextCounts = {
    ...state.counts,
    [countryCode]: (state.counts[countryCode] ?? 0) + 1
  }

  const timestamp = Date.now()
  const nextEvent: VisitorEvent = {
    id: `${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
    countryCode,
    sessionId: input.sessionId,
    timestamp
  }

  const nextState: VisitorStatsState = {
    counts: nextCounts,
    seenSessions: {
      ...state.seenSessions,
      [input.sessionId]: true
    },
    events: [...state.events, nextEvent].slice(-250)
  }

  setState(nextState)

  return nextState
}

export function readStats(since?: number) {
  const state = getState()

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
    latestTimestamp
  }
}
