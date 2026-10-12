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
  assert.equal(PRODUCT_SITES["gino1-seibi"], "https://gino1-seibi.vimai.jp");
  assert.equal(PRODUCT_LOGOS["gino1-seibi"], "/images/products/gino1_seibi.v2.webp");
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

test("Gino 1 Seibi resolves to its subdomain and logo", () => {
  assert.equal(resolveProductSite("gino1-seibi"), "https://gino1-seibi.vimai.jp");
  assert.equal(resolveProductLogo("gino1-seibi"), "/images/products/gino1_seibi.v2.webp");
  assert.equal(
    resolveProductLogo("gino1-seibi", "/images/products/gino1_seibi.png"),
    "/images/products/gino1_seibi.v2.webp",
  );
  assert.equal(resolveProductOgImage("gino1-seibi"), "/images/products/gino1_seibi.png");
});

test("Gino 1 Seibi is in the seed fallback and in the D1 SQL for all three locales", () => {
  const seed = read("src/lib/seed.ts");
  assert.match(seed, /slug: "gino1-seibi"/);
  assert.match(seed, /name: "ViMai Gino 1 Seibi – Tokutei bảo dưỡng ô tô"/);
  assert.match(seed, /name: "ViMai Gino 1 Seibi: Automobile Maintenance"/);
  assert.match(seed, /name: "ViMai Gino 1 Seibi（特定技能1号・自動車整備）"/);

  const migration = read("d1/migrations/0010_add_gino1_product.sql");
  assert.match(migration, /INSERT OR IGNORE INTO products/);
  assert.doesNotMatch(migration, /\b(UPDATE|DELETE|DROP)\b/);
  assert.doesNotMatch(migration, /^\s*INSERT INTO/m, "every insert must be OR IGNORE");
  assert.match(migration, /'00000000-0000-0000-0000-000000000007', 'gino1-seibi', 'beta'/);
  assert.match(migration, /'https:\/\/gino1-seibi\.vimai\.jp'/);
  assert.match(migration, /'\/images\/products\/gino1_seibi\.png'/);
  for (const locale of ["vi", "en", "ja"]) {
    assert.match(migration, new RegExp(`000000000007-${locale}', id, '${locale}'`));
    for (let n = 1; n <= 6; n += 1) {
      assert.match(migration, new RegExp(`'faq-gino1-${n}-${locale}'`));
    }
  }
  // Facts that must stay true: free exams, price, no "real past questions" claim.
  assert.match(migration, /700\.000đ/);
  assert.match(migration, /không phải đề thi thật/);
  assert.match(migration, /not real exam questions/);

  assert.match(read("d1/seed.sql"), /'gino1-seibi', 'beta'/);
});

test("product ids, slugs and sort orders are unique across seed and migrations", () => {
  const sql = [
    read("d1/seed.sql"),
    read("d1/migrations/0005_add_menkyo_product.sql"),
    read("d1/migrations/0010_add_gino1_product.sql"),
  ].join("\n");
  const rows = [
    ...sql.matchAll(/'(00000000-0000-0000-0000-0000000000\d\d)', '([a-z0-9-]+)', '[a-z_]+',\s*\S+, \S+, \S+,\s*[01], (\d+),/g),
  ];
  const bySlug = new Map<string, { id: string; sort: string }>();
  for (const [, id, slug, sort] of rows) {
    const seen = bySlug.get(slug);
    if (seen) {
      assert.deepEqual(seen, { id, sort }, `${slug} defined twice with different id/sort`);
    }
    bySlug.set(slug, { id, sort });
  }
  assert.ok(bySlug.has("gino1-seibi"));
  const ids = [...bySlug.values()].map((item) => item.id);
  const sorts = [...bySlug.values()].map((item) => item.sort);
  assert.equal(new Set(ids).size, ids.length, "duplicate product id");
  assert.equal(new Set(sorts).size, sorts.length, "duplicate sort order");
});
