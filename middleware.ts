import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") || "";

  // Block search engine indexing on Vercel preview domain
  if (host.includes("vercel.app")) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
