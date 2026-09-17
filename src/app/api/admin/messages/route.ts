import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { getDb } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "messages");
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const status = (searchParams.get("status") ?? "").trim();
  let sql = "SELECT * FROM contact_messages WHERE 1=1";
  const binds: unknown[] = [];
  if (status) {
    sql += " AND status = ?";
    binds.push(status);
  }
  if (q) {
    sql += " AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)";
    const like = `%${q}%`;
    binds.push(like, like, like, like);
  }
  sql += " ORDER BY created_at DESC LIMIT 200";
  const { results } = await db.prepare(sql).bind(...binds).all();
  return NextResponse.json({ messages: results ?? [] });
}

export async function PATCH(request: NextRequest) {
  const auth = await authorizeAdmin(request, "messages", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: string; status?: string } | null;
  if (!body?.id || !body.status) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const allowed = ["new", "read", "unread", "archived"];
  if (!allowed.includes(body.status)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  await db
    .prepare("UPDATE contact_messages SET status = ?, read_at = CASE WHEN ? IN ('read','archived') THEN COALESCE(read_at, ?) ELSE NULL END WHERE id = ?")
    .bind(body.status, body.status, new Date().toISOString(), body.id)
    .run();
  await writeAudit("contact updated", "contact_message", body.id, { status: body.status }, auth.user.id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "messages", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await db.prepare("DELETE FROM contact_messages WHERE id = ?").bind(body.id).run();
  await writeAudit("contact deleted", "contact_message", body.id, {}, auth.user.id);
  return NextResponse.json({ ok: true });
}
