import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { setReferralVoid } from "@/lib/ctv";

export const runtime = "edge";

/** Hoàn tiền: hủy hoa hồng của một đơn (void: true), hoặc khôi phục (void: false). */
export async function PATCH(request: NextRequest) {
  const auth = await authorizeAdmin(request, "ctv", { mutate: true });
  if ("response" in auth) return auth.response;
  const body = (await request.json().catch(() => ({}))) as { id?: string; void?: boolean };
  if (!body.id || typeof body.void !== "boolean") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const result = await setReferralVoid(body.id, body.void);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "unconfigured" ? 503 : 409 });
  }
  await writeAudit(body.void ? "ctv referral voided" : "ctv referral restored", "ctv_referral", body.id);
  return NextResponse.json({ ok: true });
}
