import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'bill_admin_session'

function getSecret() {
  return (
    process.env.SESSION_SECRET ?? 'change-me-in-production'
  )
}

function sign(value: string) {
  return crypto
    .createHmac('sha256', getSecret())
    .update(value)
    .digest('hex')
}

export function createSessionValue() {
  const value = `admin:${Date.now()}`
  const signature = sign(value)
  return `${value}.${signature}`
}

export function verifySessionValue(sessionValue?: string) {
  if (!sessionValue) {
    return false
  }

  const [value, signature] = sessionValue.split('.')

  if (!value || !signature) {
    return false
  }

  const expectedSignature = sign(value)

  if (signature.length !== expectedSignature.length) {
    return false
  }

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export function isAdminAuthenticated() {
  const cookieStore = cookies()
  return verifySessionValue(
    cookieStore.get(COOKIE_NAME)?.value
  )
}

export function getAdminCookieName() {
  return COOKIE_NAME
}
