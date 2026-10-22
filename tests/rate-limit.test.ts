import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import {
  RATE_LIMITS,
  clientIp,
  consumeRateLimit,
  isRateLimited,
  rateLimitKey,
  recordRateLimitEvent,
} from "../src/lib/d1-rate-limit.ts";

/** Minimal D1-shaped adapter over node:sqlite, loaded with the real migration file. */
function fakeD1() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(readFileSync("d1/migrations/0017_rate_limits.sql", "utf8"));
  const db = {
    prepare(query: string) {
      let values: unknown[] = [];
      const statement = {
        bind(...next: unknown[]) {
          values = next;
          return statement;
        },
        async first<T>() {
          return (sqlite.prepare(query).get(...(values as never[])) ?? null) as T | null;
        },
        async run() {
          return sqlite.prepare(query).run(...(values as never[]));
        },
        async all<T>() {
          return { results: sqlite.prepare(query).all(...(values as never[])) as T[] };
        },
      };
      return statement;
    },
  };
  return { db, sqlite };
}

const rule = { action: "test", limit: 3, windowSeconds: 600 };
const t0 = Date.UTC(2026, 9, 22, 12, 0, 0);

test("allows up to the limit, then blocks within the same window", async () => {
  const { db } = fakeD1();
  for (let i = 0; i < 3; i += 1) {
    assert.equal(await consumeRateLimit(db, rule, "1.2.3.4", { now: t0 + i * 1000, cleanup: false }), true);
  }
  assert.equal(await consumeRateLimit(db, rule, "1.2.3.4", { now: t0 + 5000, cleanup: false }), false);
  // Another subject has its own counter.
  assert.equal(await consumeRateLimit(db, rule, "5.6.7.8", { now: t0 + 5000, cleanup: false }), true);
});

test("a new window resets the counter", async () => {
  const { db } = fakeD1();
  for (let i = 0; i < 4; i += 1) await consumeRateLimit(db, rule, "ip", { now: t0, cleanup: false });
  assert.equal(await isRateLimited(db, rule, "ip", { now: t0 }), true);
  assert.equal(await isRateLimited(db, rule, "ip", { now: t0 + 600_000 }), false);
  assert.equal(await consumeRateLimit(db, rule, "ip", { now: t0 + 600_000, cleanup: false }), true);
});

test("isRateLimited does not count; recordRateLimitEvent does", async () => {
  const { db } = fakeD1();
  for (let i = 0; i < 10; i += 1) assert.equal(await isRateLimited(db, rule, "a@b.c", { now: t0 }), false);
  for (let i = 0; i < 3; i += 1) await recordRateLimitEvent(db, rule, "a@b.c", { now: t0, cleanup: false });
  assert.equal(await isRateLimited(db, rule, "a@b.c", { now: t0 }), true);
});

test("cleanup removes expired rows only", async () => {
  const { db, sqlite } = fakeD1();
  await consumeRateLimit(db, rule, "old", { now: t0, cleanup: false });
  await consumeRateLimit(db, rule, "new", { now: t0 + 3_600_000, cleanup: true });
  const rows = sqlite.prepare("SELECT COUNT(*) AS n FROM rate_limits").get() as { n: number };
  assert.equal(rows.n, 1);
});

test("raw IPs and emails are never stored", async () => {
  const { db, sqlite } = fakeD1();
  await consumeRateLimit(db, RATE_LIMITS.loginEmail, "owner@example.com", { now: t0, cleanup: false });
  const row = sqlite.prepare("SELECT key FROM rate_limits").get() as { key: string };
  assert.equal(row.key.includes("owner"), false);
  assert.equal(row.key, await rateLimitKey("login_email", "owner@example.com"));
  assert.match(row.key, /^login_email:[0-9a-f]{40}$/);
});

test("fails open without a DB or when the table is missing", async () => {
  assert.equal(await consumeRateLimit(null, rule, "ip"), true);
  assert.equal(await isRateLimited(undefined, rule, "ip"), false);
  const broken = new DatabaseSync(":memory:");
  const db = {
    prepare(query: string) {
      const s = {
        bind: () => s,
        first: async () => broken.prepare(query).get(),
        run: async () => broken.prepare(query).run(),
        all: async () => ({ results: [] }),
      };
      return s;
    },
  };
  assert.equal(await consumeRateLimit(db, rule, "ip"), true);
  assert.equal(await isRateLimited(db, rule, "ip"), false);
});

test("admin login: 8 failures per IP / 10 min, 10 per email / 15 min", () => {
  assert.deepEqual(RATE_LIMITS.loginIp, { action: "login_ip", limit: 8, windowSeconds: 600 });
  assert.deepEqual(RATE_LIMITS.loginEmail, { action: "login_email", limit: 10, windowSeconds: 900 });
});

test("client IP prefers cf-connecting-ip and groups IPv6 by /64", () => {
  const req = (headers: Record<string, string>) => new Request("https://vimai.jp/api/contact", { headers });
  assert.equal(clientIp(req({ "cf-connecting-ip": "203.0.113.9", "x-forwarded-for": "1.1.1.1" })), "203.0.113.9");
  assert.equal(clientIp(req({ "x-forwarded-for": "198.51.100.1, 10.0.0.1" })), "198.51.100.1");
  assert.equal(clientIp(req({})), "unknown");
  assert.equal(clientIp(req({ "cf-connecting-ip": "2001:db8:1:2:aaaa::1" })), "2001:db8:1:2::/64");
  assert.equal(
    clientIp(req({ "cf-connecting-ip": "2001:0db8:0001:0002:ffff:ffff:ffff:ffff" })),
    "2001:db8:1:2::/64",
  );
  assert.equal(clientIp(req({ "cf-connecting-ip": "2001:db8::1" })), "2001:db8:0:0::/64");
});

test("contact, feedback and login routes use the shared D1 limiter", () => {
  const contact = readFileSync("src/app/api/contact/route.ts", "utf8");
  const feedback = readFileSync("src/app/api/feedback/route.ts", "utf8");
  const login = readFileSync("src/app/api/admin/login/route.ts", "utf8");
  assert.match(contact, /consumeRateLimit\(getDb\(\), RATE_LIMITS\.contact/);
  assert.match(feedback, /consumeRateLimit\(getDb\(\), RATE_LIMITS\.feedback/);
  assert.match(login, /RATE_LIMITS\.loginIp/);
  assert.match(login, /isRateLimited\(db, RATE_LIMITS\.loginEmail, email\)/);
});
