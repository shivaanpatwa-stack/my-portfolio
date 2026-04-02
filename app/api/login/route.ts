import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  if (password === 'mumbai@56y') {
    const response = NextResponse.json({ success: true })
    response.cookies.set('site-auth', 'mumbai@56y', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 10,
    })
    return response
  }
  return NextResponse.json({ success: false }, { status: 401 })
}
