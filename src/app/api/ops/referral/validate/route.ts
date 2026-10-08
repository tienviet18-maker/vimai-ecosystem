import { NextResponse } from "next/server";
import { isCtvProduct } from "@/lib/ctv-core";
import { validateCode } from "@/lib/ctv";
import { readSignedOpsRequest } from "@/lib/ops-auth";

export const runtime = "edge";

/** Worker của app hỏi: mã này có hợp lệ không và khách phải trả bao nhiêu. */
export async function POST(request: Request) {
  const parsed = await readSignedOpsRequest(request);
  if ("response" in parsed) return parsed.response;
  const { code, product } = parsed.body;
  if (!isCtvProduct(product)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const result = await validateCode(code, product);
  if ("error" in result) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json(result);
}
