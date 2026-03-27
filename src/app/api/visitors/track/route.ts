import { NextResponse } from 'next/server'
import { registerVisit, readStats } from '@/lib/visitor-stats'

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

    registerVisit({
      sessionId: body.sessionId,
      countryCode
    })

    const stats = readStats()

    return NextResponse.json(stats)
  } catch {
    return NextResponse.json(
      {
        message: 'Failed to track visitor'
      },
      { status: 500 }
    )
  }
}
