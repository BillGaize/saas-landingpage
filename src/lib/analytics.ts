import posthog from 'posthog-js'

// Safe wrapper: no-op if PostHog is not loaded (no key, localhost, opted out).
export function track(
  event: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === 'undefined' || !posthog.__loaded) {
    return
  }
  posthog.capture(event, properties)
}
