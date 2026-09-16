import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as {
    action?: string;
    entity?: string;
    entityId?: string;
  };
  await writeAudit(body.action ?? "login", body.entity, body.entityId);
  return NextResponse.json({ ok: true });
}
