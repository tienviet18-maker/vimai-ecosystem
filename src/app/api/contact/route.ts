import { NextRequest, NextResponse } from "next/server";
import { insertContactMessage } from "@/lib/contact-messages";
import { isCmsConfigured } from "@/lib/cloudflare";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`contact:${ip}`, 8)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (!isCmsConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const result = await insertContactMessage({
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    subject: body.subject ? String(body.subject).slice(0, 200) : null,
    message: String(body.message).slice(0, 5000),
    locale: body.locale ? String(body.locale).slice(0, 8) : null,
  });

  if (result.error) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
