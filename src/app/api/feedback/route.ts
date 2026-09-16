import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";
import { locales } from "@/types";

export const runtime = "edge";

const buckets = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.reset < now) {
    buckets.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return true;
  }
  if (current.count >= 8) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.display_name || !body?.body || !body?.consent) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const locale = locales.includes(body.locale) ? body.locale : null;
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const { error } = await supabase.from("reviews").insert({
    display_name: String(body.display_name).slice(0, 80),
    body: String(body.body).slice(0, 2000),
    product_id: body.product_id || null,
    rating: body.rating ? Number(body.rating) : null,
    locale,
    country: body.country ? String(body.country).slice(0, 80) : null,
    consent: true,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
