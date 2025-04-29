import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicPaths = [
    "/",
    "/landing",
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/features",
    "/pricing",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ]

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
  )

  const authCookie = request.cookies.get("__session")
  const firebaseToken = request.cookies.get("firebaseToken")
  const isAuthenticated = !!authCookie || !!firebaseToken

  console.log(`Middleware - Path: ${path}, Public: ${isPublicPath}, Authenticated: ${isAuthenticated}`)

  const url = new URL(request.url)
  const noRedirect = url.searchParams.get("noRedirect") === "true"

  if (noRedirect) {
    console.log("Middleware - Skipping redirect checks to prevent loops")
    return NextResponse.next()
  }

  if (!isPublicPath && !isAuthenticated) {
    console.log("Middleware - Not authenticated, redirecting to login")
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("from", path)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && path.startsWith("/auth")) {
    console.log("Middleware - Authenticated user trying to access auth page, redirecting to dashboard")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isAuthenticated && (path === "/landing" || path === "/")) {
    console.log("Middleware - Authenticated user at landing page, redirecting to dashboard")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// ✅ Updated matcher to exclude public assets like /about-us/*
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|about-us/).*)",
  ],
}
