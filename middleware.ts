import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_VALUE = process.env.ADMIN_SESSION_VALUE;
const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "admin-auth";

export function middleware(request: NextRequest) {
  if (!ADMIN_SESSION_VALUE) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_VALUE;

  if (pathname.startsWith("/admin/login")) {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (hasSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};

