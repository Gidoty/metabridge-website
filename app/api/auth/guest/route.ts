import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { displayName } = body

  if (
    !displayName ||
    typeof displayName !== 'string' ||
    displayName.trim().length === 0 ||
    displayName.trim().length > 50
  ) {
    return NextResponse.json({ error: 'Invalid display name' }, { status: 400 })
  }

  const cookieValue = JSON.stringify({ displayName: displayName.trim(), type: 'guest' })

  const response = NextResponse.json({ ok: true })
  response.cookies.set('guest_user', cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return response
}
