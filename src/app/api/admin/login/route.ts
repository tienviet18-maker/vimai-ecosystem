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
import {
  RATE_LIMITS,
  clientIp,
  isRateLimited,
  recordRateLimitEvent,
} from "@/lib/d1-rate-limit";
import { DUMMY_PASSWORD_HASH, timingSafeEqualString } from "@/lib/password";

export const runtime = "edge";

const BOOTSTRAP_EMAIL = (process.env.ADMIN_BOOTSTRAP_EMAIL ?? "").trim().toLowerCase();

async function recordAuthEvent(ip: string, email: string, action: string) {
  try {
    const db = getDb();
    if (!db) return;
    await db
      .prepare("INSERT INTO auth_events (id, ip, email, action, created_at) VALUES (?, ?, ?, ?, ?)")
      .bind(newId(), ip, email, action, nowIso())
      .run();
  } catch {
    /* table may not exist yet */
  }
}

/** Legacy per-IP check on auth_events (migration 0003). Kept so the limit still holds
 * before migration 0017 (rate_limits) is applied; the shared limiter is the primary check. */
async function authEventsRateLimited(ip: string) {
  try {
    const db = getDb();
    if (!db) return false;
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const row = await db
      .prepare(
        `SELECT COUNT(*) as n FROM auth_events
         WHERE ip = ? AND action = 'login_failed' AND created_at > ?`,
      )
      .bind(ip, since)
      .first<{ n: number }>();
    return (row?.n ?? 0) >= 8;
  } catch {
    return false;
  }
}

async function d1RateLimited(ip: string) {
  return (await isRateLimited(getDb(), RATE_LIMITS.loginIp, ip)) || (await authEventsRateLimited(ip));
}

async function recordLoginFailure(ip: string, email: string) {
  const db = getDb();
  await recordRateLimitEvent(db, RATE_LIMITS.loginIp, ip);
  if (email) await recordRateLimitEvent(db, RATE_LIMITS.loginEmail, email);
}

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ip = clientIp(request);
  if (!rateLimit(`login:${ip}`, 8) || (await d1RateLimited(ip))) {
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

  // Per-email lockout (10 failures / 15 min), on top of the per-IP limit, so a botnet
  // cannot spread guesses for one account across many IPs.
  if (await isRateLimited(db, RATE_LIMITS.loginEmail, email)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let user = await db
    .prepare("SELECT id, email, password_hash, role, status FROM admin_users WHERE email = ?")
    .bind(email)
    .first<{
      id: string;
      email: string;
      password_hash: string;
      role?: string;
      status?: string;
    }>();

  if (!user) {
    const count = await db.prepare("SELECT COUNT(*) as n FROM admin_users").first<{ n: number }>();
    const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "";
    if (
      (count?.n ?? 0) === 0 &&
      BOOTSTRAP_EMAIL &&
      email === BOOTSTRAP_EMAIL &&
      bootstrapPassword &&
      (await timingSafeEqualString(password, bootstrapPassword))
    ) {
      const id = newId();
      const passwordHash = await hashPassword(password);
      await db
        .prepare(
          `INSERT INTO admin_users (id, email, password_hash, role, status, created_at, updated_at)
           VALUES (?, ?, ?, 'SUPER_ADMIN', 'ACTIVE', ?, ?)`,
        )
        .bind(id, email, passwordHash, nowIso(), nowIso())
        .run();
      user = { id, email, password_hash: passwordHash, role: "SUPER_ADMIN", status: "ACTIVE" };
      await writeAudit("user created", "admin_user", id, { bootstrap: true }, id);
    }
  }

  // Always run one PBKDF2 verification, even for unknown emails, so response time does not
  // reveal which admin emails exist.
  const passwordOk = await verifyPassword(password, user?.password_hash ?? DUMMY_PASSWORD_HASH);
  if (!user || user.status === "DISABLED" || !passwordOk) {
    await recordAuthEvent(ip, email, "login_failed");
    await recordLoginFailure(ip, email);
    await writeAudit("login_failed", "admin", null, { email, ip }, null);
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = await signSession({ id: user.id, email: user.email });
  const response = NextResponse.json({ ok: true });
  applySessionCookie(response, token);
  await recordAuthEvent(ip, email, "login_success");
  await writeAudit("login", "admin", user.id, { ip }, user.id);
  return response;
}
