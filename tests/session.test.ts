import assert from "node:assert/strict";
import { test } from "node:test";
import { readSession, signSession, SESSION_COOKIE, sessionCookieOptions } from "../src/lib/session-token.ts";

test("session cookie flags are production-safe", () => {
  const previous = process.env.CF_PAGES;
  process.env.CF_PAGES = "1";
  const options = sessionCookieOptions();
  if (previous === undefined) delete process.env.CF_PAGES;
  else process.env.CF_PAGES = previous;
  assert.equal(SESSION_COOKIE, "vimai_session");
  assert.equal(options.httpOnly, true);
  assert.equal(options.secure, true);
  assert.equal(options.sameSite, "lax");
  assert.equal(options.path, "/");
  assert.ok((options.maxAge ?? 0) > 0);
});

test("signed session round-trip and rejection of tampering", async () => {
  process.env.AUTH_SECRET = "a".repeat(32);
  const token = await signSession({ id: "user-1", email: "vimai.support@gmail.com" });
  const session = await readSession(token);
  assert.deepEqual(session, { id: "user-1", email: "vimai.support@gmail.com" });
  assert.equal(await readSession(`${token}x`), null);
  assert.equal(await readSession("not-a-token"), null);
  assert.equal(await readSession(""), null);
});
