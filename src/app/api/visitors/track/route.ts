import { NextResponse } from 'next/server'
import {
  registerVisit,
  readStats
} from '@/lib/visitor-stats'

interface VisitorTrackBody {
  sessionId?: string
}

function getIPFromRequest(request: Request) {
  const forwarded =
    request.headers.get('x-forwarded-for') ?? ''

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-client-ip') ??
    ''
  )
}

async function resolveCountryCode(request: Request) {
  const byHeader =
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry')

  if (byHeader && /^[A-Za-z]{2}$/.test(byHeader)) {
    return byHeader.toUpperCase()
  }

  const ip = getIPFromRequest(request)

  if (!ip) {
    return 'OTHER'
  }

  if (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.')
  ) {
    return 'CL'
  }

  try {
    const response = await fetch(
      `https://ipapi.co/${encodeURIComponent(ip)}/country/`,
      {
        method: 'GET',
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      return 'OTHER'
    }

    const country = (await response.text())
      .trim()
      .toUpperCase()

    if (!/^[A-Z]{2}$/.test(country)) {
      return 'OTHER'
    }

    return country
  } catch {
    return 'OTHER'
  }
}

function readGeo(request: Request) {
  const h = (name: string) => request.headers.get(name) ?? ''
  let city = h('x-vercel-ip-city')
  try {
    city = decodeURIComponent(city)
  } catch {
    // keep raw header
  }
  return {
    ip: getIPFromRequest(request),
    city,
    region: h('x-vercel-ip-country-region'),
    timezone: h('x-vercel-ip-timezone')
  }
}

function readDevice(request: Request): 'mobile' | 'desktop' {
  return /Mobi|Android|iPhone|iPad/i.test(
    request.headers.get('user-agent') ?? ''
  )
    ? 'mobile'
    : 'desktop'
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VisitorTrackBody

    if (!body.sessionId) {
      return NextResponse.json(
        { message: 'sessionId is required' },
        { status: 400 }
      )
    }

    const countryCode = await resolveCountryCode(request)

    const { blobOk } = await registerVisit({
      sessionId: body.sessionId,
      countryCode,
      device: readDevice(request)
    })

    const stats = await readStats()

    // `you` is returned only to the requester and is never stored
    // (the IP is not written to the counter / blob).
    return NextResponse.json({
      ...stats,
      blobOk,
      you: { countryCode, ...readGeo(request) }
    })
  } catch {
    return NextResponse.json(
      {
        message: 'Failed to track visitor'
      },
      { status: 500 }
    )
  }
}
