import { NextRequest, NextResponse } from "next/server";
import { getDb, isCmsConfigured } from "@/lib/cloudflare";
import { insertReview } from "@/lib/reviews";
import { rateLimit } from "@/lib/rate-limit";
import { RATE_LIMITS, clientIp, consumeRateLimit } from "@/lib/d1-rate-limit";
import { FEEDBACK_LIMITS, parseProductId, parseRating } from "@/lib/feedback-validation";
import { getProducts } from "@/lib/products";
import { locales } from "@/types";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (!rateLimit(`feedback:${ip}`, 8)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  if (!(await consumeRateLimit(getDb(), RATE_LIMITS.feedback, ip))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.display_name || !body?.body || !body?.consent) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const rating = parseRating(body.rating);
  if (!rating.ok) {
    return NextResponse.json({ error: "invalid_rating" }, { status: 400 });
  }
  const product = parseProductId(body.product_id);
  if (!product.ok) {
    return NextResponse.json({ error: "invalid_product" }, { status: 400 });
  }
  if (product.productId) {
    const products = await getProducts({ publishedOnly: false });
    if (!products.some((item) => item.id === product.productId)) {
      return NextResponse.json({ error: "invalid_product" }, { status: 400 });
    }
  }

  const locale = locales.includes(body.locale) ? body.locale : null;
  const result = await insertReview({
    display_name: String(body.display_name).slice(0, FEEDBACK_LIMITS.displayName),
    body: String(body.body).slice(0, FEEDBACK_LIMITS.body),
    product_id: product.productId,
    rating: rating.rating,
    locale,
    country: body.country ? String(body.country).slice(0, FEEDBACK_LIMITS.country) : null,
  });

  if (result.error) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
