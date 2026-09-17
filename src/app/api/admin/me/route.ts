import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { assertSameOrigin, hashPassword } from "@/lib/session";
import { getDb, nowIso } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET() {
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
}

export async function PATCH(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = String(body?.password ?? "");
  if (password.length < 6) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const passwordHash = await hashPassword(password);
  await db
    .prepare("UPDATE admin_users SET password_hash = ?, updated_at = ? WHERE id = ?")
    .bind(passwordHash, nowIso(), user.id)
    .run();
  await writeAudit("password changed", "admin_user", user.id, { self: true }, user.id);
  return NextResponse.json({ ok: true });
}
