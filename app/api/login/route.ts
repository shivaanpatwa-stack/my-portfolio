import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "site-auth";
const CORRECT_PASSWORD = "mumbai@56y";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (password !== CORRECT_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set(COOKIE_NAME, CORRECT_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year — persists across browser restarts on all devices
    path: "/",
  });

  return response;
}
