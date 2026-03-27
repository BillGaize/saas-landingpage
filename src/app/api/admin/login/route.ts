import { NextResponse } from 'next/server'
import {
  createSessionValue,
  getAdminCookieName
} from '@/lib/admin-auth'

export async function POST(request: Request) {
  const body = await request.json()
  const password = body.password

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Missing ADMIN_PASSWORD in environment.' },
      { status: 500 }
    )
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Password incorrecta.' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(
    getAdminCookieName(),
    createSessionValue(),
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 14
    }
  )

  return response
}
