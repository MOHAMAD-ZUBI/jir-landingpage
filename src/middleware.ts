import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./firebase";

export async function middleware(request: NextRequest) {
  // Get the Firebase ID token from cookies or headers
  const token =
    request.cookies.get("firebase-token")?.value ||
    request.headers.get("Authorization")?.split("Bearer ")[1];

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // If there's no token and trying to access protected routes
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If there's a token and trying to access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // This middleware does not block or modify any requests
//   return NextResponse.next();
// }

// // Configure which routes to run middleware on
// export const config = {
//   matcher: ["/:path*"], // Apply to all routes
// };
