import { NextResponse } from "next/server";
import { getOpsSecret } from "@/lib/cloudflare";
import { verifyOpsSignature } from "@/lib/ctv-core";
import { rateLimit } from "@/lib/rate-limit";

const BODY_LIMIT = 4096;

/**
 * Lời gọi từ Worker của các app (taxi, transport, menkyo, gino1). Mỗi lời gọi ký
 * HMAC-SHA256 trên `${x-ops-timestamp}.${body}` bằng OPS_HMAC_SECRET.
 * Trả về body đã parse, hoặc một response lỗi chỉ chứa mã lỗi.
 */
export async function readSignedOpsRequest(
  request: Request,
): Promise<{ body: Record<string, unknown> } | { response: NextResponse }> {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!rateLimit(`ops:${ip}`, 120, 60_000)) {
    return { response: NextResponse.json({ error: "rate_limited" }, { status: 429 }) };
  }
  const secret = getOpsSecret();
  if (secret.length < 32) {
    console.error("OPS_HMAC_SECRET is not configured");
    return { response: NextResponse.json({ error: "unavailable" }, { status: 503 }) };
  }
  const raw = await request.text();
  if (raw.length > BODY_LIMIT) {
    return { response: NextResponse.json({ error: "too_large" }, { status: 413 }) };
  }
  const ok = await verifyOpsSignature(
    secret,
    request.headers.get("x-ops-timestamp"),
    request.headers.get("x-ops-signature"),
    raw,
  );
  if (!ok) return { response: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    return { body: parsed as Record<string, unknown> };
  } catch {
    return { response: NextResponse.json({ error: "bad_request" }, { status: 400 }) };
  }
}
