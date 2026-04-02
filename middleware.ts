import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "site-auth";
const COOKIE_VALUE = "mumbai@56y";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude login page, Next.js internals, API routes, and favicon
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon\\.ico).*)",
  ],
};
