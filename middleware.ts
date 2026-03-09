import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API without a session
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session || !isValidSession(session)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", request.url);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

// Lightweight validation for edge runtime (no Node crypto)
// Checks format and age; the full HMAC check happens in the API routes
function isValidSession(cookie: string): boolean {
  const dot = cookie.indexOf(".");
  if (dot === -1) return false;
  const ts = parseInt(cookie.slice(0, dot), 10);
  if (isNaN(ts)) return false;
  const age = (Date.now() - ts) / 1000;
  return age < 7 * 24 * 60 * 60;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
