import assert from "node:assert/strict";
import { test } from "node:test";
import {
  applyPriceLines,
  buildPriceLines,
  ctvProductForSlug,
  formatVnd,
  priceSummary,
} from "../src/lib/product-pricing.ts";

test("slugs map to referral products", () => {
  assert.equal(ctvProductForSlug("tokutei-taxi"), "taxi");
  assert.equal(ctvProductForSlug("tokutei-transport"), "transport");
  assert.equal(ctvProductForSlug("menkyo"), "menkyo");
  assert.equal(ctvProductForSlug("gino1-seibi"), "gino1");
  assert.equal(ctvProductForSlug("kids"), null);
});

test("VND is formatted with dots", () => {
  assert.equal(formatVnd(500000), "500.000đ");
  assert.equal(formatVnd(1199000), "1.199.000đ");
});

test("price summary follows the single price source", () => {
  assert.deepEqual(priceSummary("taxi").referral.map((r) => r.payVnd), [450000, 425000, 400000]);
  assert.deepEqual(priceSummary("menkyo").referral.map((r) => r.payVnd), [630000, 595000, 560000]);
  assert.equal(priceSummary("transport").listVnd, 500000);
});

test("price lines carry the list price and the referral rule", () => {
  const lines = buildPriceLines("menkyo");
  assert.match(lines[0], /700\.000đ/);
  assert.match(lines.join("\n"), /2 thiết bị/);
  assert.match(lines.join("\n"), /mã giới thiệu/);
});

test("old price lines are replaced, other features stay, and it is idempotent", () => {
  const old = [
    "20 đề thi thử CBT",
    "499.000đ - 1.199.000đ tùy thời hạn",
    "Thanh toán VietQR, kích hoạt tự động, tối đa 2 thiết bị",
    "Miễn phí 3 đề đầu",
  ];
  const once = applyPriceLines(old, "taxi");
  assert.deepEqual(once.slice(3), ["20 đề thi thử CBT", "Miễn phí 3 đề đầu"]);
  assert.match(once[0], /500\.000đ/);
  assert.equal(once.join("\n").includes("1.199.000"), false);
  assert.deepEqual(applyPriceLines(once, "taxi"), once);
});
