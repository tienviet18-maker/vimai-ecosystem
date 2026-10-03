import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PRODUCT_LOGOS,
  resolveProductOgImage,
  toOptimizedImage,
  PRODUCT_SITES,
  resolveProductLogo,
  resolveProductSite,
  resolveTrialUrl,
} from "../src/lib/product-sites.ts";

test("each ViMai product has its own canonical site", () => {
  assert.equal(PRODUCT_SITES["tokutei-taxi"], "https://tokutei-taxi.vimai.jp");
  assert.equal(PRODUCT_SITES["tokutei-transport"], "https://tokutei-truck.vimai.jp");
  assert.equal(PRODUCT_SITES.seibi, "https://seibi.vimai.jp");
  assert.equal(PRODUCT_SITES.kids, "https://kids.vimai.jp");
  assert.equal(PRODUCT_SITES.maimai, "https://maimai.vimai.jp");
  assert.equal(resolveProductSite("tokutei-taxi"), "https://tokutei-taxi.vimai.jp");
  assert.notEqual(resolveProductSite("tokutei-taxi"), "https://vimai.jp");
});

test("ViMai Transport always uses the clean tokutei_vantai logo (optimized WebP)", () => {
  assert.equal(
    PRODUCT_LOGOS["tokutei-transport"],
    "/images/products/tokutei_vantai.v2.webp",
  );
  assert.equal(
    resolveProductLogo("tokutei-transport"),
    "/images/products/tokutei_vantai.v2.webp",
  );
  assert.equal(
    resolveProductLogo("tokutei-transport", "/images/products/transport.png"),
    "/images/products/tokutei_vantai.v2.webp",
  );
});

test("legacy PNG logo paths from D1 are mapped to optimized WebP", () => {
  assert.equal(toOptimizedImage("/images/products/tokutei_taxi.png"), "/images/products/tokutei_taxi.v2.webp");
  assert.equal(resolveProductLogo("kids", "/images/products/vimai_kids.png"), "/images/products/vimai_kids.v2.webp");
  assert.equal(toOptimizedImage("https://cdn.example.com/x.png"), "https://cdn.example.com/x.png");
  assert.equal(toOptimizedImage(null), null);
});

test("free trial link only for released products with a website", () => {
  const site = "https://seibi.vimai.jp";
  assert.equal(resolveTrialUrl("available", site), site);
  assert.equal(resolveTrialUrl("launched", site), site);
  assert.equal(resolveTrialUrl("coming_soon", site), null);
  assert.equal(resolveTrialUrl("development", site), null);
  assert.equal(resolveTrialUrl("available", null), null);
  assert.equal(resolveTrialUrl("launched", "  "), null);
});

test("Open Graph image keeps the original PNG", () => {
  assert.equal(resolveProductOgImage("tokutei-taxi"), "/images/products/tokutei_taxi.png");
  assert.equal(resolveProductOgImage("kids", "/custom/og.jpg"), "/custom/og.jpg");
});
