import { NextResponse } from "next/server";
import { isCtvProduct } from "@/lib/ctv-core";
import { recordReferral } from "@/lib/ctv";
import { readSignedOpsRequest } from "@/lib/ops-auth";

export const runtime = "edge";

/**
 * Worker của app gọi sau khi VIP đã được cấp và tiền đã khớp. Gọi lại cùng
 * `orderRef` chỉ trả `duplicate`, không ghi thêm hoa hồng.
 */
export async function POST(request: Request) {
  const parsed = await readSignedOpsRequest(request);
  if ("response" in parsed) return parsed.response;
  const { product, orderRef, userRef, code, paidVnd } = parsed.body;
  if (
    !isCtvProduct(product) ||
    typeof orderRef !== "string" ||
    !orderRef ||
    orderRef.length > 120 ||
    typeof userRef !== "string" ||
    !userRef ||
    userRef.length > 120 ||
    typeof paidVnd !== "number" ||
    !Number.isInteger(paidVnd)
  ) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const result = await recordReferral({ product, orderRef, userRef, code, paidVnd });
  const status =
    result.status === "recorded" || result.status === "duplicate"
      ? 200
      : result.status === "unconfigured" || result.status === "failed"
        ? 503
        : 409;
  return NextResponse.json({ result: result.status }, { status });
}
