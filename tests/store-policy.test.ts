import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  appStoreUrl,
  freeWebExamCount,
  stripWebPaymentFeatures,
  usesAppStoreOnly,
  webTrialUrl,
} from "../src/lib/store-policy.ts";

test("EN and JA use the App Store for Taxi, Transport and Menkyo, VI keeps the web", () => {
  for (const slug of ["tokutei-taxi", "tokutei-transport", "menkyo"]) {
    assert.equal(usesAppStoreOnly(slug, "en"), true);
    assert.equal(usesAppStoreOnly(slug, "ja"), true);
    assert.equal(usesAppStoreOnly(slug, "vi"), false);
  }
  for (const slug of ["seibi", "kids", "maimai", "gino1-seibi"]) {
    assert.equal(usesAppStoreOnly(slug, "en"), false);
    assert.equal(usesAppStoreOnly(slug, "ja"), false);
  }
});

test("Taxi and Transport have their App Store links; Menkyo has none yet (never invented)", () => {
  assert.equal(appStoreUrl("tokutei-taxi"), "https://apps.apple.com/app/id6819012544");
  assert.equal(appStoreUrl("tokutei-transport"), "https://apps.apple.com/app/id6819710696");
  assert.equal(appStoreUrl("menkyo"), null);
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

test("no web trial link once the App Store link exists (Taxi, Transport), or without a website", () => {
  for (const slug of ["tokutei-taxi", "tokutei-transport"]) {
    const site = `https://${slug}.vimai.jp`;
    assert.equal(webTrialUrl(slug, "en", site), null);
    assert.equal(webTrialUrl(slug, "ja", site), null);
    assert.equal(webTrialUrl(slug, "vi", site), null);
  }
  assert.equal(freeWebExamCount("tokutei-transport"), 3);
  assert.equal(webTrialUrl("menkyo", "en", null), null);
  assert.equal(webTrialUrl("menkyo", "en", ""), null);
  assert.equal(webTrialUrl("menkyo", "en", "not a url"), null);
  assert.equal(webTrialUrl("menkyo", "en", "http://menkyo.vimai.jp"), null);
});

test("web trial link is general: only App Store-only products, root when no locale page", () => {
  // Menkyo has /en/ but no /ja/ page.
  assert.equal(webTrialUrl("menkyo", "en", "https://menkyo.vimai.jp"), "https://menkyo.vimai.jp/en/");
  assert.equal(webTrialUrl("menkyo", "ja", "https://menkyo.vimai.jp"), "https://menkyo.vimai.jp/");
  assert.equal(freeWebExamCount("menkyo"), null);
  // Products sold on the web in every locale keep their normal "open site" button.
  assert.equal(webTrialUrl("gino1-seibi", "en", "https://gino1-seibi.vimai.jp"), null);
  assert.equal(webTrialUrl("seibi", "ja", "https://seibishi3.vimai.jp"), null);
});

test("web trial labels never mention price, payment or VIP", () => {
  for (const locale of ["vi", "en", "ja"]) {
    const messages = JSON.parse(
      readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"),
    );
    for (const key of ["tryFreeOnWeb", "tryFreeOnWebGeneric"]) {
      const label: string = messages.products[key];
      assert.ok(label, `${locale}.products.${key} is missing`);
      assert.doesNotMatch(label, /VIP|VND|ドン|₫|VietQR|price|giá|価格|料金|pay|thanh toán|決済|購入|buy|mua/i);
    }
  }
  const en = JSON.parse(readFileSync(new URL("../messages/en.json", import.meta.url), "utf8"));
  const ja = JSON.parse(readFileSync(new URL("../messages/ja.json", import.meta.url), "utf8"));
  assert.equal(en.products.tryFreeOnWeb.replace("{count}", "3"), "Try the 3 free mock exams on the web");
  assert.equal(ja.products.tryFreeOnWeb.replace("{count}", "3"), "無料の模擬試験3回をWebで試す");
});
