import assert from "node:assert/strict";
import { test } from "node:test";
import {
  appStoreUrl,
  stripWebPaymentFeatures,
  usesAppStoreOnly,
} from "../src/lib/store-policy.ts";

test("EN and JA use the App Store for Taxi and Transport, VI keeps the web", () => {
  for (const slug of ["tokutei-taxi", "tokutei-transport"]) {
    assert.equal(usesAppStoreOnly(slug, "en"), true);
    assert.equal(usesAppStoreOnly(slug, "ja"), true);
    assert.equal(usesAppStoreOnly(slug, "vi"), false);
  }
  assert.equal(usesAppStoreOnly("seibi", "en"), false);
});

test("Taxi has its App Store link; Transport has none yet (never invented)", () => {
  assert.equal(appStoreUrl("tokutei-taxi"), "https://apps.apple.com/app/id6819012544");
  assert.equal(appStoreUrl("tokutei-transport"), null);
});

test("VND / VietQR lines are removed, other features stay", () => {
  const input = [
    "20 CBT mock exams",
    "499,000 - 1,199,000 VND depending on length",
    "VietQR payment, automatic activation, up to 2 devices",
    "価格は499,000ドンから",
    "First 3 exams free",
  ];
  assert.deepEqual(stripWebPaymentFeatures(input), ["20 CBT mock exams", "First 3 exams free"]);
});
