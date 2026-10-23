'use client'

import { Suspense, useEffect } from 'react'
import {
  usePathname,
  useSearchParams
} from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
// Events go through a same-origin proxy (/ingest, see next.config.mjs) so
// ad blockers that block *.posthog.com do not drop them.
const POSTHOG_HOST = '/ingest'
const POSTHOG_UI_HOST = 'https://us.posthog.com'
const INTERNAL_KEY = 'bg_internal'

function isInternalVisitor() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('internal') === '1') {
    localStorage.setItem(INTERNAL_KEY, '1')
  } else if (params.get('internal') === '0') {
    localStorage.removeItem(INTERNAL_KEY)
  }
  return localStorage.getItem(INTERNAL_KEY) === '1'
}

function isLocalHost() {
  return ['localhost', '127.0.0.1'].includes(
    window.location.hostname
  )
}

function classifyLink(a: HTMLAnchorElement) {
  const raw = a.getAttribute('href') ?? ''
  const label = (a.textContent ?? '').trim().slice(0, 80)
  const base = {
    label,
    cta_id: a.getAttribute('data-attr') ?? undefined,
    location:
      a
        .closest('header,footer,nav,main,aside')
        ?.tagName.toLowerCase() ?? 'other',
    path: window.location.pathname
  }

  if (raw.startsWith('mailto:')) {
    return {
      event: 'email_click',
      props: { ...base, to: raw.slice(7).split('?')[0] }
    }
  }
  let url: URL
  try {
    url = new URL(raw, window.location.href)
  } catch {
    return null
  }
  if (url.hostname.includes('calendly.com')) {
    return { event: 'calendly_click', props: base }
  }
  if (url.pathname.toLowerCase().endsWith('.pdf')) {
    return {
      event: 'file_download',
      props: { ...base, file: url.pathname }
    }
  }
  if (/linkedin\.com|github\.com/.test(url.hostname)) {
    return {
      event: 'social_click',
      props: {
        ...base,
        network: url.hostname.replace('www.', '')
      }
    }
  }
  if (
    url.hostname &&
    url.hostname !== window.location.hostname
  ) {
    return {
      event: 'outbound_click',
      props: { ...base, host: url.hostname }
    }
  }
  return null
}

function onDocumentClick(event: MouseEvent) {
  const a = (event.target as HTMLElement | null)?.closest?.(
    'a'
  )
  if (!a) {
    return
  }
  const hit = classifyLink(a)
  if (hit) {
    posthog.capture(hit.event, hit.props)
  }
}

let initialized = false

function initPostHog() {
  if (
    initialized ||
    !POSTHOG_KEY ||
    typeof window === 'undefined'
  ) {
    return
  }

  // No tracking on local dev, and none for the site owner's own devices
  // (visit any page once with ?internal=1; undo with ?internal=0).
  if (isLocalHost() || isInternalVisitor()) {
    return
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: POSTHOG_UI_HOST,
    // We capture pageviews manually below so SPA route changes are tracked.
    capture_pageview: false,
    capture_pageleave: true,
    // Capture every click / input / form interaction without hand-coding events.
    autocapture: true,
    // Session replays: record real visits (mask text inputs for privacy).
    session_recording: {
      maskAllInputs: true
    },
    persistence: 'localStorage+cookie',
    // Respect Do Not Track browser setting.
    respect_dnt: true
  })

  document.addEventListener('click', onDocumentClick, true)
  initialized = true
}

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!POSTHOG_KEY || !posthog.__loaded) {
      return
    }

    let url = window.origin + pathname
    const query = searchParams?.toString()
    if (query) {
      url = `${url}?${query}`
    }

    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initPostHog()
  }, [])

  // If no key is configured (e.g. local dev without env), render children untouched.
  if (!POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  )
}
