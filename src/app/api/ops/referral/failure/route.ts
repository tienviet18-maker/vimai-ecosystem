import { NextResponse } from "next/server";
import { isCtvProduct } from "@/lib/ctv-core";
import { upsertRecordFailure } from "@/lib/ctv";
import { readSignedOpsRequest } from "@/lib/ops-auth";

export const runtime = "edge";

/**
 * Worker của app báo: đơn đã được cấp VIP nhưng nhiều lần thử mà vimai.jp
 * vẫn không ghi nhận được. Chỉ để hiện cảnh báo ở /admin/ctv; không đụng hoa hồng.
 */
export async function POST(request: Request) {
  const parsed = await readSignedOpsRequest(request);
  if ("response" in parsed) return parsed.response;
  const { product, orderRef, userRef, code, paidVnd, reason, attempts } = parsed.body;
  if (
    !isCtvProduct(product) ||
    typeof orderRef !== "string" ||
    !orderRef ||
    orderRef.length > 120 ||
    typeof userRef !== "string" ||
    !userRef ||
    userRef.length > 120 ||
    typeof code !== "string" ||
    !code ||
    code.length > 40 ||
    typeof paidVnd !== "number" ||
    !Number.isInteger(paidVnd) ||
    (reason !== "rejected" && reason !== "unreachable") ||
    typeof attempts !== "number" ||
    !Number.isInteger(attempts)
  ) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const result = await upsertRecordFailure({
    product,
    orderRef,
    userRef,
    code,
    paidVnd,
    reason,
    attempts: Math.max(0, Math.min(attempts, 10_000)),
  });
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 503 });
  return NextResponse.json({ ok: true });
}
