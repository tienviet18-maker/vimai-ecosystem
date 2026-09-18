import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PRODUCT_LOGOS,
  PRODUCT_SITES,
  resolveProductLogo,
  resolveProductSite,
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

test("ViMai Transport always uses the clean tokutei_vantai logo", () => {
  assert.equal(
    PRODUCT_LOGOS["tokutei-transport"],
    "/images/products/tokutei_vantai.png",
  );
  assert.equal(
    resolveProductLogo("tokutei-transport"),
    "/images/products/tokutei_vantai.png",
  );
  assert.equal(
    resolveProductLogo("tokutei-transport", "/images/products/transport.png"),
    "/images/products/tokutei_vantai.png",
  );
});
