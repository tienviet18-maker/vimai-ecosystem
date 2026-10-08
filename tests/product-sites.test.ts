import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { test } from "node:test";
import {
  PRODUCT_LOGOS,
  resolveProductOgImage,
  toOptimizedImage,
  PRODUCT_SITES,
  resolveProductLogo,
  resolveProductSite,
} from "../src/lib/product-sites.ts";

test("each ViMai product has its own canonical site", () => {
  assert.equal(PRODUCT_SITES["tokutei-taxi"], "https://tokutei-taxi.vimai.jp");
  assert.equal(PRODUCT_SITES["tokutei-transport"], "https://tokutei-transport.vimai.jp");
  assert.equal(PRODUCT_SITES.seibi, "https://seibi.vimai.jp");
  assert.equal(PRODUCT_SITES.kids, "https://kids.vimai.jp");
  assert.equal(PRODUCT_SITES.maimai, "https://maimai.vimai.jp");
  assert.equal(PRODUCT_SITES.menkyo, "https://menkyo.vimai.jp");
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

test("Open Graph image keeps the original PNG", () => {
  assert.equal(resolveProductOgImage("tokutei-taxi"), "/images/products/tokutei_taxi.png");
  assert.equal(resolveProductOgImage("kids", "/custom/og.jpg"), "/custom/og.jpg");
});

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("ViMai Menkyo resolves to its subdomain and app-icon logo", () => {
  assert.equal(resolveProductSite("menkyo"), "https://menkyo.vimai.jp");
  assert.notEqual(resolveProductSite("menkyo"), "https://vimai-menkyo.pages.dev");
  assert.equal(PRODUCT_LOGOS.menkyo, "/images/products/vimai_menkyo.v2.webp");
  assert.equal(resolveProductLogo("menkyo"), "/images/products/vimai_menkyo.v2.webp");
  assert.equal(
    resolveProductLogo("menkyo", "/images/products/vimai_menkyo.png"),
    "/images/products/vimai_menkyo.v2.webp",
  );
  assert.equal(resolveProductOgImage("menkyo"), "/images/products/vimai_menkyo.png");
});

test("every product logo exists in public/ and the WebP stays within budget", () => {
  for (const [slug, webp] of Object.entries(PRODUCT_LOGOS)) {
    const file = new URL(`../public${webp}`, import.meta.url);
    assert.ok(existsSync(file), `${slug}: missing ${webp}`);
    assert.ok(statSync(file).size <= 70 * 1024, `${slug}: ${webp} is over 70 KB`);
    const png = new URL(`../public${webp.replace(/\.v2\.webp$/, ".png")}`, import.meta.url);
    assert.ok(existsSync(png), `${slug}: missing original PNG`);
  }
});

test("Menkyo is in the seed fallback and in the D1 SQL for all three locales", () => {
  const seed = read("src/lib/seed.ts");
  assert.match(seed, /slug: "menkyo"/);
  assert.match(seed, /name: "ViMai Menkyo – Bằng lái Nhật"/);
  assert.match(seed, /name: "ViMai Menkyo: Japan License"/);
  assert.match(seed, /name: "ViMai Menkyo（日本の運転免許・学科）"/);

  const migration = read("d1/migrations/0005_add_menkyo_product.sql");
  assert.match(migration, /INSERT OR IGNORE INTO products/);
  assert.doesNotMatch(migration, /\b(UPDATE|DELETE|DROP)\b/);
  assert.match(migration, /'menkyo', 'beta'/);
  assert.match(migration, /'https:\/\/menkyo\.vimai\.jp'/);
  assert.match(migration, /'\/images\/products\/vimai_menkyo\.png'/);
  for (const locale of ["vi", "en", "ja"]) {
    assert.match(migration, new RegExp(`000000000006-${locale}', id, '${locale}'`));
    assert.match(migration, new RegExp(`'faq-menkyo-1-${locale}'`));
  }

  assert.match(read("d1/seed.sql"), /'menkyo', 'beta'/);
});
