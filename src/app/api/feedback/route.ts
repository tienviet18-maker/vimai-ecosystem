import { NextRequest, NextResponse } from "next/server";
import { isCmsConfigured } from "@/lib/cloudflare";
import { insertReview } from "@/lib/reviews";
import { rateLimit } from "@/lib/rate-limit";
import { locales } from "@/types";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`feedback:${ip}`, 8)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.display_name || !body?.body || !body?.consent) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const locale = locales.includes(body.locale) ? body.locale : null;
  const result = await insertReview({
    display_name: String(body.display_name).slice(0, 80),
    body: String(body.body).slice(0, 2000),
    product_id: body.product_id || null,
    rating: body.rating ? Number(body.rating) : null,
    locale,
    country: body.country ? String(body.country).slice(0, 80) : null,
  });

  if (result.error) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
