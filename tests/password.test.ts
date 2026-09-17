import assert from "node:assert/strict";
import { test } from "node:test";
import { hashPassword, verifyPassword } from "../src/lib/password.ts";

test("password hash is not plaintext and verifies", async () => {
  const password = "bootstrap-test-only";
  const hash = await hashPassword(password);
  assert.equal(hash.startsWith("pbkdf2:100000:"), true);
  assert.equal(hash.includes(password), false);
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword("wrong-password", hash), false);
});

test("malformed stored hash is rejected", async () => {
  assert.equal(await verifyPassword("any", "plaintext"), false);
  assert.equal(await verifyPassword("any", "pbkdf2:100:aa:bb"), false);
});
