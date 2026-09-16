import { NextRequest, NextResponse } from "next/server";
import { getDb, isAuthConfigured, isCmsConfigured, newId, nowIso } from "@/lib/cloudflare";
import {
  applySessionCookie,
  assertSameOrigin,
  hashPassword,
  signSession,
  verifyPassword,
} from "@/lib/session";
import { writeAudit } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";


export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`login:${ip}`, 8)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!isAuthConfigured() || !isCmsConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");
  if (!email || !password) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  let user = await db
    .prepare("SELECT id, email, password_hash FROM admin_users WHERE email = ?")
    .bind(email)
    .first<{ id: string; email: string; password_hash: string }>();

  if (!user) {
    const count = await db.prepare("SELECT COUNT(*) as n FROM admin_users").first<{ n: number }>();
    const bootstrapEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL ?? "").trim().toLowerCase();
    const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "";
    if ((count?.n ?? 0) === 0 && email === bootstrapEmail && password === bootstrapPassword) {
      const id = newId();
      const passwordHash = await hashPassword(password);
      await db
        .prepare(
          "INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
        )
        .bind(id, email, passwordHash, nowIso())
        .run();
      user = { id, email, password_hash: passwordHash };
    }
  }

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = await signSession({ id: user.id, email: user.email });
  const response = NextResponse.json({ ok: true });
  applySessionCookie(response, token);
  await writeAudit("login", "admin", user.id);
  return response;
}
