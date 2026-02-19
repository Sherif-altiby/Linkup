import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Public paths
  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  // Next.js assets
  const isNextAsset =
    pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico");

  // Redirect if no token on protected route
  if (!token && !isPublicPath && !isNextAsset) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|login|signup|_next|favicon.ico).*)",
  ],
};

