import { NextResponse } from 'next/server'
import { readStats } from '@/lib/visitor-stats'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const sinceParam = Number(url.searchParams.get('since'))
  const since = Number.isFinite(sinceParam)
    ? sinceParam
    : undefined

  const stats = readStats(since)

  return NextResponse.json(stats)
}
