'use client'

import Link from 'next/link'
import { countryMeta } from '@/lib/countries'
import { WelcomeToast } from './welcome-toast'
import { useEffect, useMemo, useRef, useState } from 'react'

type SiteLanguage = 'es' | 'en'

interface SiteFooterProps {
  language: SiteLanguage
}

interface VisitorEvent {
  id: string
  countryCode: string
  sessionId: string
  timestamp: number
  device?: 'mobile' | 'desktop'
}

interface YouInfo {
  countryCode: string
  ip: string
  city: string
  region: string
  timezone: string
}

interface VisitorApiResponse {
  counts: Record<string, number>
  latestTimestamp: number
  events: VisitorEvent[]
  durable?: boolean
  you?: YouInfo
}

function describeClient() {
  const ua = navigator.userAgent
  const has = (...keys: string[]) =>
    keys.some((key) => ua.includes(key))
  const browser = has('Edg/')
    ? 'Edge'
    : has('OPR/')
      ? 'Opera'
      : has('CriOS', 'Chrome/')
        ? 'Chrome'
        : has('FxiOS', 'Firefox/')
          ? 'Firefox'
          : has('Safari/')
            ? 'Safari'
            : 'Browser'
  const os = has('iPhone', 'iPad')
    ? 'iOS'
    : has('Android')
      ? 'Android'
      : has('Mac OS X')
        ? 'macOS'
        : has('Windows')
          ? 'Windows'
          : has('Linux')
            ? 'Linux'
            : ''
  const tz =
    Intl.DateTimeFormat().resolvedOptions().timeZone
  return {
    label: os ? `${browser} / ${os}` : browser,
    screen: `${window.screen.width}x${window.screen.height}`,
    tz,
    lang: navigator.language
  }
}

const COPY = {
  es: {
    recentVisitors: 'Visitantes recientes',
    legal: 'Legal',
    terms: 'Terminos de servicio',
    privacy: 'Politica de privacidad',
    blog: 'Blog',
    schedule: 'Agendar llamada',
    newVisitor: 'Nuevo visitante desde',
    onMobile: 'desde el celular',
    yourConnection: 'Tu conexion',
    yourNote:
      'Solo lo ves tu. No se guarda en el contador.',
    ipLabel: 'IP',
    localTime: 'hora local',
    loading: 'Cargando contador...'
  },
  en: {
    recentVisitors: 'Recent visitors',
    legal: 'Legal',
    terms: 'Terms of service',
    privacy: 'Privacy policy',
    blog: 'Blog',
    schedule: 'Book a call',
    newVisitor: 'New visitor from',
    onMobile: 'on mobile',
    yourConnection: 'Your connection',
    yourNote:
      'Only you see this. It is not stored in the counter.',
    ipLabel: 'IP',
    localTime: 'local time',
    loading: 'Loading counter...'
  }
} as const

const COUNTS_CACHE_KEY = 'visitor-counts-floor'

function getOrCreateSessionId() {
  const existing = window.sessionStorage.getItem(
    'visitor-session-id'
  )

  if (existing) {
    return existing
  }

  const generated =
    window.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`

  window.sessionStorage.setItem(
    'visitor-session-id',
    generated
  )

  return generated
}

function mergeCounts(
  current: Record<string, number> | null,
  incoming: Record<string, number>
) {
  const merged: Record<string, number> = {
    ...(current ?? {})
  }
  for (const [code, total] of Object.entries(incoming)) {
    merged[code] = Math.max(merged[code] ?? 0, total)
  }
  return merged
}

function readCachedCounts() {
  try {
    const raw = window.localStorage.getItem(
      COUNTS_CACHE_KEY
    )
    if (!raw) return null
    const parsed = JSON.parse(raw) as Record<string, number>
    return parsed && typeof parsed === 'object'
      ? parsed
      : null
  } catch {
    return null
  }
}

function writeCachedCounts(counts: Record<string, number>) {
  try {
    window.localStorage.setItem(
      COUNTS_CACHE_KEY,
      JSON.stringify(counts)
    )
  } catch {
    // ignore quota / private mode
  }
}

export function SiteFooter({ language }: SiteFooterProps) {
  const copy = COPY[language]
  const [counts, setCounts] = useState<Record<
    string,
    number
  > | null>(null)
  const [sessionId, setSessionId] = useState('')
  const [toast, setToast] = useState('')
  const [you, setYou] = useState<YouInfo | null>(null)
  const [client, setClient] = useState<ReturnType<
    typeof describeClient
  > | null>(null)
  const latestTimestampRef = useRef(0)
  const sessionIdRef = useRef('')

  useEffect(() => {
    const cached = readCachedCounts()
    if (cached) {
      setCounts(cached)
    }

    const id = getOrCreateSessionId()
    setSessionId(id)
    sessionIdRef.current = id

    const registerVisit = async () => {
      const response = await fetch('/api/visitors/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId: id })
      })

      if (!response.ok) {
        return
      }

      const data =
        (await response.json()) as VisitorApiResponse
      setCounts((prev) => {
        const next = mergeCounts(prev, data.counts)
        writeCachedCounts(next)
        return next
      })
      latestTimestampRef.current = data.latestTimestamp
      if (data.you) {
        setYou(data.you)
      }
      setClient(describeClient())
    }

    void registerVisit()
  }, [])

  useEffect(() => {
    if (!sessionId) {
      return
    }

    const interval = window.setInterval(() => {
      void (async () => {
        const response = await fetch(
          `/api/visitors/updates?since=${latestTimestampRef.current}`
        )

        if (!response.ok) {
          return
        }

        const data =
          (await response.json()) as VisitorApiResponse

        setCounts((prev) => {
          const next = mergeCounts(prev, data.counts)
          writeCachedCounts(next)
          return next
        })

        if (
          data.latestTimestamp > latestTimestampRef.current
        ) {
          latestTimestampRef.current = data.latestTimestamp
        }

        const latestExternalEvent = [...data.events]
          .reverse()
          .find(
            (event) =>
              event.sessionId !== sessionIdRef.current
          )

        if (!latestExternalEvent) {
          return
        }

        const country = countryMeta(
          latestExternalEvent.countryCode,
          language
        )
        const device =
          latestExternalEvent.device === 'mobile'
            ? ` · ${copy.onMobile}`
            : ''

        setToast(
          `${country.flag} ${copy.newVisitor} ${country.name}${device}`
        )
      })()
    }, 8000)

    return () => {
      window.clearInterval(interval)
    }
  }, [copy.newVisitor, copy.onMobile, language, sessionId])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = window.setTimeout(() => {
      setToast('')
    }, 3800)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [toast])

  const rankedCountries = useMemo(() => {
    if (!counts) {
      return []
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([code, total]) => ({
        code,
        total,
        meta: countryMeta(code, language)
      }))
  }, [counts, language])

  return (
    <footer className="border-t border-line bg-paper/80">
      <div
        className="mx-auto grid w-full max-w-[1500px] gap-6 px-5 py-7 sm:px-8
          lg:grid-cols-[1fr_auto] lg:items-center lg:px-12"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-wide">
            Bill Gaize Dev
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-700">
            <Link href="/insights" className="underline">
              {copy.blog}
            </Link>
            <a
              data-attr="footer-calendly"
              href="https://calendly.com/me--52uo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {copy.schedule}
            </a>
            <span className="text-zinc-400">
              {copy.legal}
            </span>
            <Link
              href="/terms-of-service"
              className="underline"
            >
              {copy.terms}
            </Link>
            <Link
              href="/privacy-policy"
              className="underline"
            >
              {copy.privacy}
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-zinc-50 px-4 py-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]
              text-zinc-500"
          >
            {copy.recentVisitors}
          </p>
          {rankedCountries.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {rankedCountries.map((country) => (
                <span
                  key={country.code}
                  className="inline-flex items-center gap-2 rounded-full border
                    border-line bg-white px-3 py-1 text-xs"
                >
                  <span>{country.meta.flag}</span>
                  <span>{country.meta.name}</span>
                  <span className="font-semibold">
                    {country.total}
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-zinc-500">
              {copy.loading}
            </p>
          )}
          {you && client ? (
            <div
              data-attr="your-connection"
              className="mt-3 border-t border-line pt-2 text-xs text-zinc-600"
            >
              <p className="font-semibold text-zinc-700">
                {copy.yourConnection}
              </p>
              <p className="mt-1">
                {
                  countryMeta(you.countryCode, language)
                    .flag
                }{' '}
                {[
                  you.city,
                  countryMeta(you.countryCode, language)
                    .name
                ]
                  .filter(Boolean)
                  .join(', ')}
                {you.ip
                  ? ` · ${copy.ipLabel} ${you.ip}`
                  : ''}
              </p>
              <p>
                {client.label} · {client.screen} ·{' '}
                {client.tz} · {client.lang}
              </p>
              <p className="text-zinc-400">
                {copy.yourNote}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <WelcomeToast language={language} />

      {toast ? (
        <div
          className="pointer-events-none fixed bottom-4 left-4 z-50 max-w-xs
            rounded-xl border border-line bg-white px-3 py-2 text-xs
            text-zinc-700 shadow-lg"
        >
          {toast}
        </div>
      ) : null}
    </footer>
  )
}
