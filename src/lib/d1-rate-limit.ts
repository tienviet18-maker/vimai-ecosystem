import type { D1Database } from "@/lib/cloudflare";

/**
 * Fixed-window rate limiter backed by D1 (table `rate_limits`, migration 0017).
 *
 * The in-memory limiter in `rate-limit.ts` only sees one isolate, so on Cloudflare it is a
 * cheap first layer at best. This one is shared by every isolate. The stored key is
 * `<action>:<sha256(action:subject)>`, so raw IPs and emails never land in the table.
 *
 * Every function fails open (returns "allowed") when the DB is missing or the query fails,
 * matching the rest of the codebase: a broken limiter must never take the site down.
 */

export type RateLimitRule = {
  /** Short action name, e.g. "contact", "login_ip". */
  action: string;
  /** Max events per window. */
  limit: number;
  /** Window length in seconds. */
  windowSeconds: number;
};

type Options = {
  /** Override "now" (epoch ms) in tests. */
  now?: number;
  /** Force (true) or skip (false) the cleanup of expired rows. Default: ~2% of calls. */
  cleanup?: boolean;
};

const encoder = new TextEncoder();

export async function rateLimitKey(action: string, subject: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${action}:${subject}`));
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `${action}:${hex.slice(0, 40)}`;
}

function windowBounds(rule: RateLimitRule, nowMs: number) {
  const nowSec = Math.floor(nowMs / 1000);
  const windowStart = nowSec - (nowSec % rule.windowSeconds);
  return { nowSec, windowStart, expiresAt: windowStart + rule.windowSeconds };
}

async function maybeCleanup(db: D1Database, nowSec: number, force?: boolean) {
  const run = force ?? Math.random() < 0.02;
  if (!run) return;
  try {
    await db.prepare("DELETE FROM rate_limits WHERE expires_at < ?").bind(nowSec).run();
  } catch {
    /* best effort */
  }
}

/** Count one event and report whether it is still within the limit. */
export async function consumeRateLimit(
  db: D1Database | null | undefined,
  rule: RateLimitRule,
  subject: string,
  options: Options = {},
): Promise<boolean> {
  if (!db) return true;
  try {
    const { nowSec, windowStart, expiresAt } = windowBounds(rule, options.now ?? Date.now());
    const key = await rateLimitKey(rule.action, subject);
    const row = await db
      .prepare(
        `INSERT INTO rate_limits (key, window_start, count, expires_at) VALUES (?, ?, 1, ?)
         ON CONFLICT (key, window_start) DO UPDATE SET count = count + 1
         RETURNING count`,
      )
      .bind(key, windowStart, expiresAt)
      .first<{ count: number }>();
    await maybeCleanup(db, nowSec, options.cleanup);
    return Number(row?.count ?? 0) <= rule.limit;
  } catch {
    return true;
  }
}

/** Report whether the subject is already at the limit, without counting a new event. */
export async function isRateLimited(
  db: D1Database | null | undefined,
  rule: RateLimitRule,
  subject: string,
  options: Pick<Options, "now"> = {},
): Promise<boolean> {
  if (!db) return false;
  try {
    const { windowStart } = windowBounds(rule, options.now ?? Date.now());
    const key = await rateLimitKey(rule.action, subject);
    const row = await db
      .prepare("SELECT count FROM rate_limits WHERE key = ? AND window_start = ?")
      .bind(key, windowStart)
      .first<{ count: number }>();
    return Number(row?.count ?? 0) >= rule.limit;
  } catch {
    return false;
  }
}

/** Count one event (e.g. a failed login) without checking the limit. */
export async function recordRateLimitEvent(
  db: D1Database | null | undefined,
  rule: RateLimitRule,
  subject: string,
  options: Options = {},
): Promise<void> {
  await consumeRateLimit(db, rule, subject, options);
}

function expandIpv6(ip: string): string[] | null {
  const halves = ip.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 && missing !== 0) return null;
  if (missing < 0) return null;
  return [...head, ...Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
}

/**
 * Client IP for rate limiting. Cloudflare sets cf-connecting-ip; x-forwarded-for is only a
 * dev fallback. IPv6 addresses are grouped by /64 so one host cannot rotate through its
 * own subnet to dodge the limit.
 */
export function clientIp(request: Request): string {
  const raw =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const ip = raw.trim().toLowerCase();
  if (!ip.includes(":") || ip.includes(".")) return ip || "unknown";
  const groups = expandIpv6(ip);
  if (!groups) return ip;
  return `${groups
    .slice(0, 4)
    .map((group) => group.replace(/^0+(?=.)/, ""))
    .join(":")}::/64`;
}

export const RATE_LIMITS = {
  contact: { action: "contact", limit: 8, windowSeconds: 10 * 60 },
  feedback: { action: "feedback", limit: 8, windowSeconds: 10 * 60 },
  /** Failed admin logins per IP (same threshold as the old auth_events check). */
  loginIp: { action: "login_ip", limit: 8, windowSeconds: 10 * 60 },
  /** Failed admin logins per email: lockout after 10 failures in 15 minutes. */
  loginEmail: { action: "login_email", limit: 10, windowSeconds: 15 * 60 },
} as const satisfies Record<string, RateLimitRule>;
