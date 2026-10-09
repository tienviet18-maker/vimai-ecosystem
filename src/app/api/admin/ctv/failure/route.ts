import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { dismissRecordFailure, retryRecordFailure } from "@/lib/ctv";

export const runtime = "edge";

/** POST {id, action: "retry" | "dismiss"}: thử ghi lại đơn Worker không ghi được, hoặc bỏ cảnh báo. */
export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "ctv", { mutate: true });
  if ("response" in auth) return auth.response;
  const body = (await request.json().catch(() => ({}))) as { id?: string; action?: string };
  if (!body.id || (body.action !== "retry" && body.action !== "dismiss")) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (body.action === "dismiss") {
    const result = await dismissRecordFailure(body.id);
    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 503 });
    await writeAudit("ctv failure dismissed", "ctv_record_failure", body.id);
    return NextResponse.json({ ok: true });
  }
  const result = await retryRecordFailure(body.id);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "not_found" ? 404 : 503 });
  }
  await writeAudit("ctv failure retried", "ctv_record_failure", body.id, { status: result.status });
  return NextResponse.json({ ok: result.status === "recorded" || result.status === "duplicate", status: result.status });
}
