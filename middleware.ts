import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Exclude public paths (login/signup) and Next.js static files
  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  const isNextAsset =
    pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico");

  // If trying to access protected route without token → redirect
  if (!token && !isPublicPath && !isNextAsset) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

// Run middleware on all paths
export const config = {
  matcher: ["/:path*"],
};
