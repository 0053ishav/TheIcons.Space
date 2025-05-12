import { NextResponse } from "next/server";

const RATE_LIMIT = 100; 
const TIME_WINDOW = 60 * 60 * 1000; 

let requestCount: { [key: string]: { count: number, lastRequest: number } } = {};

export async function middleware(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!requestCount[ip]) {
    requestCount[ip] = { count: 0, lastRequest: Date.now() };
  }

  const currentTime = Date.now();
  const { count, lastRequest } = requestCount[ip];

  if (currentTime - lastRequest > TIME_WINDOW) {
    requestCount[ip] = { count: 0, lastRequest: currentTime };
  }

  if (count >= RATE_LIMIT) {
    return new NextResponse("Rate limit exceeded. Try again later.", {
      status: 429,
    });
  }

  requestCount[ip].count++;

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};