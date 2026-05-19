import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Send apex traffic to the canonical www host (Search Console + metadata use www). */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  if (host === "enginelabs.com.au") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.enginelabs.com.au";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
};
