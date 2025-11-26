import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SESSION_VALUE = process.env.ADMIN_SESSION_VALUE;
const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "admin-auth";

export async function POST(request: Request) {
  if (!ADMIN_PASSWORD || !ADMIN_SESSION_VALUE) {
    console.error("Missing ADMIN_PASSWORD or ADMIN_SESSION_VALUE environment variables.");
    return NextResponse.json({ error: "Admin access not configured." }, { status: 500 });
  }

  let body: { password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: ADMIN_SESSION_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return response;
}

