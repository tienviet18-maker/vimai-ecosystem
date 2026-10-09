import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CTV_PRODUCTS,
  DISCOUNT_PERCENTS,
  generatePartnerToken,
  generatePublicNo,
  generateReferralCode,
  isWellFormedCode,
  normalizeCode,
  periodFromKey,
  periodOf,
  previousPeriod,
  referralPrice,
  sha256Hex,
  signOpsBody,
  toCsv,
  verifyOpsSignature,
  type CtvProduct,
} from "../src/lib/ctv-core.ts";

test("every product and discount gives a whole 1,000 VND price", () => {
  for (const product of Object.keys(CTV_PRODUCTS) as CtvProduct[]) {
    for (const percent of DISCOUNT_PERCENTS) {
      const price = referralPrice(product, percent);
      assert.equal(price.listVnd - price.discountVnd, price.payVnd);
      assert.equal(price.payVnd % 1000, 0, `${product} ${percent}%`);
    }
  }
});

test("agreed prices", () => {
  assert.deepEqual(referralPrice("menkyo", 15), { listVnd: 700_000, discountVnd: 105_000, payVnd: 595_000 });
  assert.deepEqual(referralPrice("taxi", 15), { listVnd: 500_000, discountVnd: 75_000, payVnd: 425_000 });
  assert.equal(referralPrice("transport", 10).payVnd, 450_000);
  assert.equal(referralPrice("menkyo", 20).payVnd, 560_000);
  assert.deepEqual(
    [10, 15, 20].map((p) => referralPrice("gino1", p as 10 | 15 | 20).payVnd),
    [630_000, 595_000, 560_000],
  );
});

test("codes use the unambiguous alphabet", () => {
  for (let i = 0; i < 200; i += 1) {
    const code = generateReferralCode();
    assert.equal(isWellFormedCode(code), true, code);
    assert.match(generatePublicNo(), /^[A-HJKMNP-Z][1-9]\d$/);
  }
  assert.equal(generatePartnerToken().length, 24);
  assert.equal(new Set(Array.from({ length: 500 }, generateReferralCode)).size > 495, true);
});

test("normalizeCode tolerates spaces, dashes and case", () => {
  assert.equal(normalizeCode(" k7q-x3m "), "K7QX3M");
  assert.equal(normalizeCode(undefined), "");
  assert.equal(isWellFormedCode("K7QX3O"), false);
  assert.equal(isWellFormedCode("K7QX3"), false);
});

test("periods are half months in Vietnam time", () => {
  assert.deepEqual(periodFromKey("2026-10-1"), { key: "2026-10-1", start: "2026-10-01", end: "2026-10-15" });
  assert.deepEqual(periodFromKey("2026-02-2"), { key: "2026-02-2", start: "2026-02-16", end: "2026-02-28" });
  assert.equal(periodFromKey("2026-13-1"), null);
  // 2026-10-15 17:30 UTC is already 16 Oct 00:30 in Vietnam
  assert.equal(periodOf(new Date("2026-10-15T17:30:00Z")).key, "2026-10-2");
  assert.equal(periodOf(new Date("2026-10-15T16:30:00Z")).key, "2026-10-1");
  assert.equal(previousPeriod(periodFromKey("2026-01-1")!).key, "2025-12-2");
  assert.equal(previousPeriod(periodFromKey("2026-10-2")!).key, "2026-10-1");
});

test("HMAC signature verifies and rejects tampering and old timestamps", async () => {
  const secret = "test-secret-with-enough-length";
  const body = JSON.stringify({ code: "K7QX3M", product: "menkyo" });
  const ts = String(Math.floor(Date.now() / 1000));
  const signature = await signOpsBody(secret, ts, body);
  assert.equal(await verifyOpsSignature(secret, ts, signature, body), true);
  assert.equal(await verifyOpsSignature(secret, ts, signature, body + " "), false);
  assert.equal(await verifyOpsSignature("other", ts, signature, body), false);
  assert.equal(await verifyOpsSignature(secret, ts, "zz", body), false);
  assert.equal(await verifyOpsSignature(secret, ts, null, body), false);
  assert.equal(await verifyOpsSignature("", ts, signature, body), false);
  const old = String(Math.floor(Date.now() / 1000) - 3600);
  assert.equal(await verifyOpsSignature(secret, old, await signOpsBody(secret, old, body), body), false);
});

test("sha256Hex matches a known vector", async () => {
  assert.equal(
    await sha256Hex("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});

test("csv escapes quotes, commas and spreadsheet formulas", () => {
  const csv = toCsv([["a,b", 'x"y', "=SUM(A1)", 100000]]);
  assert.equal(csv, '﻿"a,b","x""y",\'=SUM(A1),100000\r\n');
});
