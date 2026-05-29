// Protect all /admin routes — redirect to /admin/login if not authenticated
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow login page and NextAuth API routes through
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // All other /admin routes require a valid JWT session
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req:    request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
