'use client'

import { Suspense, useEffect } from 'react'
import {
  usePathname,
  useSearchParams
} from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ??
  'https://us.i.posthog.com'

let initialized = false

function initPostHog() {
  if (
    initialized ||
    !POSTHOG_KEY ||
    typeof window === 'undefined'
  ) {
    return
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
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

  initialized = true
}

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!POSTHOG_KEY) {
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
