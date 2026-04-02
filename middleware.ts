import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('site-auth')
  const isLoggedIn = cookie?.value === 'mumbai@56y'
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isApi = request.nextUrl.pathname.startsWith('/api')
  const isStatic = request.nextUrl.pathname.startsWith('/_next')
  const isFavicon = request.nextUrl.pathname === '/favicon.ico'

  if (isLoginPage || isApi || isStatic || isFavicon) {
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
