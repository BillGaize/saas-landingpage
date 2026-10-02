'use client'

import Link from 'next/link'
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
}

interface VisitorApiResponse {
  counts: Record<string, number>
  latestTimestamp: number
  events: VisitorEvent[]
  durable?: boolean
}

const COUNTRY_META: Record<
  string,
  { flag: string; es: string; en: string }
> = {
  CL: { flag: '🇨🇱', es: 'Chile', en: 'Chile' },
  VE: { flag: '🇻🇪', es: 'Venezuela', en: 'Venezuela' },
  US: {
    flag: '🇺🇸',
    es: 'Estados Unidos',
    en: 'United States'
  },
  RU: { flag: '🇷🇺', es: 'Rusia', en: 'Russia' },
  PE: { flag: '🇵🇪', es: 'Peru', en: 'Peru' },
  BO: { flag: '🇧🇴', es: 'Bolivia', en: 'Bolivia' },
  AE: {
    flag: '🇦🇪',
    es: 'Emiratos Arabes Unidos',
    en: 'United Arab Emirates'
  },
  CI: {
    flag: '🇨🇮',
    es: 'Costa de Marfil',
    en: "Cote d'Ivoire"
  },
  ZM: { flag: '🇿🇲', es: 'Zambia', en: 'Zambia' },
  OTHER: { flag: '🌍', es: 'Otros', en: 'Others' }
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

        const country =
          COUNTRY_META[latestExternalEvent.countryCode] ??
          COUNTRY_META.OTHER

        const countryName =
          language === 'en' ? country.en : country.es

        setToast(
          `${country.flag} ${copy.newVisitor} ${countryName}`
        )
      })()
    }, 8000)

    return () => {
      window.clearInterval(interval)
    }
  }, [copy.newVisitor, language, sessionId])

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
      .slice(0, 6)
      .map(([code, total]) => ({
        code,
        total,
        meta: COUNTRY_META[code] ?? COUNTRY_META.OTHER
      }))
  }, [counts])

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
                  <span>
                    {language === 'en'
                      ? country.meta.en
                      : country.meta.es}
                  </span>
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
        </div>
      </div>

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
