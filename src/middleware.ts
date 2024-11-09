// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Check for NextAuth.js session cookie
//   const isAuthenticated = request.cookies.has("next-auth.session-token");

//   // For preview/development environments, also check the development cookie
//   const isAuthenticatedDev = request.cookies.has("next-auth.session-token.dev");

//   const isLoggedIn = isAuthenticated || isAuthenticatedDev;
//   const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
//   const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

//   if (isLoggedIn && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!isLoggedIn && isDashboardPage) {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }

//   return NextResponse.next();
// }

// // Configure which routes to run middleware on
// export const config = {

//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // This middleware does not block or modify any requests
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/:path*"], // Apply to all routes
};

