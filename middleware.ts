// app/middleware.ts
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set<string>([
  "http://localhost:3000",             // local dev
  "https://openai-assistants-quickstart-bf8w-fi70c3v4n.vercel.app",   // your Vercel preview URL (exact)
  "https://exucomics.com",             // your site
  "https://www.exucomics.com",         // www version
]);

export function middleware(req: Request) {
  const origin = req.headers.get("origin") || "";
  const url = new URL(req.url);

  // CORS preflight
  if (req.method === "OPTIONS") {
    const res = new NextResponse(null, { status: 204 });
    if (ALLOWED_ORIGINS.has(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
      res.headers.set("Vary", "Origin");
      res.headers.set("Access-Control-Allow-Credentials", "true");
      res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
      res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    }
    return res;
  }

  // Protect ONLY API routes
  if (url.pathname.startsWith("/api/")) {
    // Allow same-origin (no Origin header, or Origin === this app)
    const isSameOrigin = !origin || origin === url.origin;

    // Block if it's cross-origin and not in the allow-list
    if (!isSameOrigin && !ALLOWED_ORIGINS.has(origin)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // For allowed cross-origin, return proper CORS headers
    const res = NextResponse.next();
    if (ALLOWED_ORIGINS.has(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
      res.headers.set("Vary", "Origin");
      res.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return res;
  }

  return NextResponse.next();
}

// Run this middleware only on /api/*
export const config = {
  matcher: ["/api/:path*"],
};
