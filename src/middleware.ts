import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/lib/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();

  if (host === "www.vimai.jp") {
    url.hostname = "vimai.jp";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  if (host.startsWith("admin.") && !url.pathname.includes("/admin") && !url.pathname.startsWith("/api")) {
    url.pathname = url.pathname === "/" ? "/admin" : `/admin${url.pathname}`;
    const rewrite = NextResponse.rewrite(url);
    rewrite.headers.set("x-pathname", url.pathname);
    rewrite.headers.set("x-robots-tag", "noindex, nofollow");
    return updateSession(request, rewrite);
  }

  const response = intlMiddleware(request);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  if (request.nextUrl.pathname.includes("/admin")) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }
  return updateSession(request, response);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
