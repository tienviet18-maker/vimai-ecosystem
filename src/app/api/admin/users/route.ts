import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";
import { hashPassword } from "@/lib/session";
import {
  ADMIN_STATUSES,
  PROTECTED_SUPER_ADMIN_EMAIL,
  isAdminRole,
  type AdminRole,
  type AdminStatus,
} from "@/lib/rbac";

export const runtime = "edge";

async function countActiveSuperAdmins(db: NonNullable<ReturnType<typeof getDb>>) {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as n FROM admin_users WHERE role = 'SUPER_ADMIN' AND status = 'ACTIVE'`,
    )
    .first<{ n: number }>();
  return row?.n ?? 0;
}

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "users");
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const { results } = await db
    .prepare(
      `SELECT id, email, role, status, created_at, updated_at FROM admin_users ORDER BY created_at ASC`,
    )
    .all();
  return NextResponse.json({ users: results ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "users", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
    role?: string;
  } | null;
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");
  const role: AdminRole = isAdminRole(body?.role) ? body.role : "EDITOR";
  if (!email || !password || password.length < 6) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const id = newId();
  const passwordHash = await hashPassword(password);
  const timestamp = nowIso();
  try {
    await db
      .prepare(
        `INSERT INTO admin_users (id, email, password_hash, role, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'ACTIVE', ?, ?)`,
      )
      .bind(id, email, passwordHash, role, timestamp, timestamp)
      .run();
  } catch {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }
  await writeAudit("user created", "admin_user", id, { email, role }, auth.user.id);
  return NextResponse.json({ ok: true, id });
}

export async function PATCH(request: NextRequest) {
  const auth = await authorizeAdmin(request, "users", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    role?: string;
    status?: string;
    password?: string;
  } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const current = await db
    .prepare("SELECT id, email, role, status FROM admin_users WHERE id = ?")
    .bind(body.id)
    .first<{ id: string; email: string; role: string; status: string }>();
  if (!current) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const nextRole = body.role && isAdminRole(body.role) ? body.role : current.role;
  const nextStatus: AdminStatus =
    body.status && ADMIN_STATUSES.includes(body.status as AdminStatus)
      ? (body.status as AdminStatus)
      : (current.status as AdminStatus);

  if (current.email === PROTECTED_SUPER_ADMIN_EMAIL) {
    if (nextRole !== "SUPER_ADMIN" || nextStatus !== "ACTIVE") {
      return NextResponse.json({ error: "protected_account" }, { status: 403 });
    }
  }

  if (
    current.role === "SUPER_ADMIN" &&
    current.status === "ACTIVE" &&
    (nextRole !== "SUPER_ADMIN" || nextStatus !== "ACTIVE")
  ) {
    const n = await countActiveSuperAdmins(db);
    if (n <= 1) {
      return NextResponse.json({ error: "last_super_admin" }, { status: 403 });
    }
  }

  if (body.password) {
    if (body.password.length < 6) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const passwordHash = await hashPassword(body.password);
    await db
      .prepare(
        `UPDATE admin_users SET role = ?, status = ?, password_hash = ?, updated_at = ? WHERE id = ?`,
      )
      .bind(nextRole, nextStatus, passwordHash, nowIso(), current.id)
      .run();
    await writeAudit("password changed", "admin_user", current.id, { by: auth.user.id }, auth.user.id);
  } else {
    await db
      .prepare(`UPDATE admin_users SET role = ?, status = ?, updated_at = ? WHERE id = ?`)
      .bind(nextRole, nextStatus, nowIso(), current.id)
      .run();
  }

  if (nextRole !== current.role) {
    await writeAudit("role changed", "admin_user", current.id, { from: current.role, to: nextRole }, auth.user.id);
  }
  if (nextStatus !== current.status) {
    await writeAudit(
      nextStatus === "ACTIVE" ? "user activated" : "user deactivated",
      "admin_user",
      current.id,
      { status: nextStatus },
      auth.user.id,
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "users", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (body.id === auth.user.id) {
    return NextResponse.json({ error: "cannot_delete_self" }, { status: 403 });
  }
  const current = await db
    .prepare("SELECT id, email, role, status FROM admin_users WHERE id = ?")
    .bind(body.id)
    .first<{ id: string; email: string; role: string; status: string }>();
  if (!current) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (current.email === PROTECTED_SUPER_ADMIN_EMAIL) {
    return NextResponse.json({ error: "protected_account" }, { status: 403 });
  }
  if (current.role === "SUPER_ADMIN" && current.status === "ACTIVE") {
    const n = await countActiveSuperAdmins(db);
    if (n <= 1) {
      return NextResponse.json({ error: "last_super_admin" }, { status: 403 });
    }
  }
  await db.prepare("DELETE FROM admin_users WHERE id = ?").bind(current.id).run();
  await writeAudit("user deleted", "admin_user", current.id, { email: current.email }, auth.user.id);
  return NextResponse.json({ ok: true });
}
