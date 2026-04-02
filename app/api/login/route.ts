import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "site-auth";
const CORRECT_PASSWORD = "mumbai@56y";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (password !== CORRECT_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, CORRECT_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
