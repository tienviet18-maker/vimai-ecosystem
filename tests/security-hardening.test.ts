import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseProductId, parseRating } from "../src/lib/feedback-validation.ts";
import { parseHttpsUrl, safeHref } from "../src/lib/safe-url.ts";
import {
  ADMIN_PASSWORD_MIN_LENGTH,
  DUMMY_PASSWORD_HASH,
  timingSafeEqualString,
  verifyPassword,
} from "../src/lib/password.ts";

test("feedback rating: optional integer 1-5 only", () => {
  for (const empty of [null, undefined, ""]) assert.deepEqual(parseRating(empty), { ok: true, rating: null });
  assert.deepEqual(parseRating("5"), { ok: true, rating: 5 });
  assert.deepEqual(parseRating(1), { ok: true, rating: 1 });
  for (const bad of ["0", "6", "4.5", 4.5, "-1", "1e0", " 3x", "NaN", true, {}, [3]]) {
    assert.deepEqual(parseRating(bad), { ok: false }, String(bad));
  }
});

test("feedback product id: uuid or slug, nothing else", () => {
  assert.deepEqual(parseProductId(null), { ok: true, productId: null });
  assert.deepEqual(parseProductId(""), { ok: true, productId: null });
  const id = "00000000-0000-0000-0000-000000000008";
  assert.deepEqual(parseProductId(id), { ok: true, productId: id });
  for (const bad of ["../x", "a b", "x'; DROP TABLE reviews;--", "-lead", "a".repeat(65), 7, {}]) {
    assert.deepEqual(parseProductId(bad), { ok: false }, String(bad));
  }
});

test("feedback route checks product existence", () => {
  const route = readFileSync("src/app/api/feedback/route.ts", "utf8");
  assert.match(route, /getProducts\(\{ publishedOnly: false \}\)/);
  assert.match(route, /invalid_rating/);
});

test("product URLs: writes accept only https", () => {
  assert.equal(parseHttpsUrl(null), null);
  assert.equal(parseHttpsUrl("  "), null);
  assert.equal(parseHttpsUrl("https://apps.apple.com/app/id1"), "https://apps.apple.com/app/id1");
  assert.equal(parseHttpsUrl(" https://tokutei-taxi.vimai.jp "), "https://tokutei-taxi.vimai.jp/");
  for (const bad of [
    "javascript:alert(1)",
    "JAVASCRIPT:alert(1)",
    "data:text/html,<script>",
    "http://example.com",
    "//example.com",
    "example.com",
    "https://user:pass@example.com",
    42,
  ]) {
    assert.equal(parseHttpsUrl(bad), "invalid", String(bad));
  }
});

test("product URLs: render only http(s) hrefs", () => {
  assert.equal(safeHref("https://vimai.jp"), "https://vimai.jp/");
  assert.equal(safeHref("http://legacy.example"), "http://legacy.example/");
  for (const bad of [null, undefined, "", "javascript:alert(1)", " javascript:alert(1)", "data:x", "/relative"]) {
    assert.equal(safeHref(bad), null, String(bad));
  }
  for (const file of ["src/components/shared/AppStoreButton.tsx", "src/components/shared/PlayStoreButton.tsx"]) {
    assert.match(readFileSync(file, "utf8"), /safeHref\(href\)/);
  }
  assert.match(
    readFileSync("src/app/[locale]/(public)/products/[slug]/page.tsx", "utf8"),
    /safeHref\(product\.website_url\)/,
  );
  assert.match(readFileSync("src/app/api/admin/products/route.ts", "utf8"), /invalid_url/);
});

test("constant-time string compare", async () => {
  assert.equal(await timingSafeEqualString("secret-value", "secret-value"), true);
  assert.equal(await timingSafeEqualString("secret-value", "secret-valuE"), false);
  assert.equal(await timingSafeEqualString("short", "much-longer-value"), false);
  assert.equal(await timingSafeEqualString("", ""), true);
});

test("dummy hash is a real PBKDF2 hash that never matches common input", async () => {
  assert.match(DUMMY_PASSWORD_HASH, /^pbkdf2:100000:/);
  for (const guess of ["", "password", "admin", "123456"]) {
    assert.equal(await verifyPassword(guess, DUMMY_PASSWORD_HASH), false);
  }
});

test("admin login equalises timing and compares bootstrap password in constant time", () => {
  const login = readFileSync("src/app/api/admin/login/route.ts", "utf8");
  assert.match(login, /user\?\.password_hash \?\? DUMMY_PASSWORD_HASH/);
  assert.match(login, /timingSafeEqualString\(password, bootstrapPassword\)/);
  assert.doesNotMatch(login, /password === bootstrapPassword/);
});

test("new admin passwords need at least 12 characters", () => {
  assert.equal(ADMIN_PASSWORD_MIN_LENGTH, 12);
  for (const file of ["src/app/api/admin/users/route.ts", "src/app/api/admin/me/route.ts"]) {
    const source = readFileSync(file, "utf8");
    assert.match(source, /ADMIN_PASSWORD_MIN_LENGTH/);
    assert.doesNotMatch(source, /length < 6/);
  }
});

const REQUIRED_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

test("security headers in public/_headers for all paths", () => {
  const file = readFileSync("public/_headers", "utf8");
  const block = file.split(/\n\s*\n/).find((section) => section.trimStart().startsWith("/*\n"));
  assert.ok(block, "missing /* block");
  for (const [key, value] of Object.entries(REQUIRED_HEADERS)) {
    assert.ok(block.includes(`  ${key}: ${value}`), key);
  }
  assert.match(block, /Permissions-Policy: camera=\(\)/);
  assert.doesNotMatch(file, /Content-Security-Policy/);
});

test("the same headers are sent for SSR and API responses", () => {
  const config = readFileSync("next.config.mjs", "utf8");
  for (const [key, value] of Object.entries(REQUIRED_HEADERS)) {
    assert.ok(config.includes(`{ key: "${key}", value: "${value}" }`), key);
  }
  assert.match(config, /source: "\/:path\*", headers: securityHeaders/);
  const headersFile = readFileSync("public/_headers", "utf8");
  const policy = /Permissions-Policy: (.+)/.exec(headersFile)?.[1];
  assert.ok(policy && config.includes(`"${policy}"`), "Permissions-Policy differs");
});

test("next is on a patched 15.5.x and the adapter peer range is overridden", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const [major, minor, patch] = String(pkg.dependencies.next).split(".").map(Number);
  assert.equal(major, 15);
  assert.equal(minor, 5);
  assert.ok(patch >= 28, `next ${pkg.dependencies.next} predates the security fixes`);
  assert.equal(pkg.devDependencies["eslint-config-next"], pkg.dependencies.next);
  assert.equal(pkg.overrides?.["@cloudflare/next-on-pages"]?.next, "$next");
});
