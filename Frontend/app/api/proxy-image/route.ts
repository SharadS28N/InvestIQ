import { NextResponse } from "next/server"

const ALLOWED_HOSTS = new Set([
  "lh3.googleusercontent.com",
  "googleusercontent.com",
])

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const target = url.searchParams.get("url")
    if (!target) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 })
    }

    const parsed = new URL(target)
    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 400 })
    }

    const res = await fetch(target, { cache: "no-store" })
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 })
    }

    const contentType = res.headers.get("content-type") || "image/jpeg"
    const arrayBuffer = await res.arrayBuffer()

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, immutable",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
    })
  } catch (e) {
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 })
  }
}

