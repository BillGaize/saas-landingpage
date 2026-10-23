import { NextResponse } from 'next/server'

// Echoes the requester's own approximate location back to them.
// Nothing is stored or logged.
export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const h = (name: string) =>
    request.headers.get(name) ?? ''
  let city = h('x-vercel-ip-city')
  try {
    city = decodeURIComponent(city)
  } catch {
    // keep raw header
  }

  return NextResponse.json(
    { city, country: h('x-vercel-ip-country') },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
