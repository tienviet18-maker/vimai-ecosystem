import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const SLUGS = [
  "tokutei-taxi",
  "tokutei-transport",
  "seibi",
  "kids",
  "maimai",
  "menkyo",
  "gino1-seibi",
  "vicare",
  "tokutei-kaigo",
];
const LOCALES = ["vi", "en", "ja"] as const;

/** UPDATE product_translations statements of 0019, keyed "slug/locale". */
function productUpdates(migration: string) {
  const rows = new Map<string, string>();
  for (const sql of migration.split(/;\n/)) {
    const body = sql.trim();
    if (!body.startsWith("UPDATE product_translations")) continue;
    const locale = body.match(/WHERE locale = '([a-z]+)'/)?.[1];
    const slug = body.match(/WHERE slug = '([a-z0-9-]+)'\)$/)?.[1];
    assert.ok(locale && slug, body.slice(-160));
    rows.set(`${slug}/${locale}`, body);
  }
  return rows;
}

const field = (sql: string, name: string) => {
  const m = sql.match(new RegExp(`\\b${name} = '((?:[^']|'')*)'`));
  assert.ok(m, `missing ${name}`);
  return m[1].replace(/''/g, "'");
};

test("0019 rewrites every product in every locale, and nothing else", () => {
  const migration = read("d1/migrations/0019_product_content_refresh.sql");
  assert.doesNotMatch(migration, /\b(DELETE|DROP|INSERT)\b/);
  assert.doesNotMatch(migration, /^UPDATE products\b/m, "status, URLs and logos stay as they are");
  assert.doesNotMatch(migration, /\bstatus\s*=/);
  const rows = productUpdates(migration);
  assert.equal(rows.size, SLUGS.length * LOCALES.length);
  for (const slug of SLUGS) for (const locale of LOCALES) assert.ok(rows.has(`${slug}/${locale}`), `${slug}/${locale}`);
  for (const m of migration.matchAll(/^UPDATE faq_translations[\s\S]*?WHERE id = '([^']+)';$/gm)) {
    assert.match(m[1], /^faq-[a-z0-9-]+-(vi|en|ja)$/);
  }
});

test("0019 texts are the seed fallback texts, with concrete features first", () => {
  const migration = read("d1/migrations/0019_product_content_refresh.sql");
  const seed = read("src/lib/seed.ts");
  const seedSql = read("d1/seed.sql");
  for (const [key, sql] of productUpdates(migration)) {
    for (const name of ["name", "tagline", "description", "long_description", "target_audience", "seo_title", "seo_description"]) {
      const value = field(sql, name);
      assert.ok(seed.includes(JSON.stringify(value)), `${key}: seed.ts lacks ${name}`);
      assert.ok(seedSql.includes(`'${value.replace(/'/g, "''")}'`), `${key}: seed.sql lacks ${name}`);
    }
    const features = JSON.parse(field(sql, "features")) as string[];
    assert.ok(features.length >= 6 && features.length <= 10, `${key}: 6–10 features`);
    for (const feature of features) assert.ok(seed.includes(JSON.stringify(feature)), `${key}: seed.ts lacks ${feature}`);
    // The home card shows the first 3 features: content, never prices.
    for (const feature of features.slice(0, 3)) {
      assert.doesNotMatch(feature, /VIP|VND|\d{3}[.,]000|VietQR|App Store|Apple/, `${key}: price in top 3: ${feature}`);
    }
    assert.ok([...field(sql, "seo_title")].length <= 60, `${key}: seo_title too long`);
    assert.ok([...field(sql, "seo_description")].length <= 160, `${key}: seo_description too long`);
  }
});

test("0019 keeps the honest wording and the payment rules", () => {
  const migration = read("d1/migrations/0019_product_content_refresh.sql");
  const rows = productUpdates(migration);
  for (const [key, sql] of rows) {
    if (key.endsWith("/en") || key.endsWith("/ja")) {
      assert.doesNotMatch(sql, /VND|ドン|₫|VietQR|\d{3}[.,]000\s*(đ|VND)/, `${key}: no web price in en/ja`);
    }
  }
  // Exam apps: not real exam questions, no pass guarantee.
  for (const slug of ["tokutei-taxi", "tokutei-transport", "seibi", "gino1-seibi", "tokutei-kaigo"]) {
    assert.match(field(rows.get(`${slug}/vi`)!, "long_description"), /không phải đề thi thật[\s\S]*không cam kết đậu kỳ thi/);
    assert.match(field(rows.get(`${slug}/en`)!, "long_description"), /not real exam questions[\s\S]*does not guarantee a passing result/);
    assert.match(field(rows.get(`${slug}/ja`)!, "long_description"), /実際の試験問題では[\s\S]*合格を保証するものではありません/);
  }
  // ViCare: reference only, never "reviewed by a doctor"; on-device translation is not live yet.
  for (const locale of LOCALES) {
    const sql = rows.get(`vicare/${locale}`)!;
    assert.doesNotMatch(sql, /bác sĩ đã duyệt|doctor-reviewed|reviewed by a doctor|医師が監修|確認待ち|awaiting expert review/);
  }
  assert.match(field(rows.get("vicare/vi")!, "features"), /Dịch đúng lời người nói, kể cả câu không có trong kho mẫu/);
  assert.match(field(rows.get("vicare/en")!, "features"), /Translates what was actually said/);
  assert.match(field(rows.get("vicare/ja")!, "features"), /話した言葉をそのまま翻訳/);
  assert.match(field(rows.get("vicare/vi")!, "features"), /hơn 3\.700 mẫu câu/);
  // Only Taxi and Transport are on the App Store.
  for (const slug of ["seibi", "kids", "maimai", "menkyo", "gino1-seibi", "vicare", "tokutei-kaigo"]) {
    for (const locale of LOCALES) {
      assert.doesNotMatch(rows.get(`${slug}/${locale}`)!, /\(App Store\)|on the App Store|App Store）/, `${slug}/${locale}`);
    }
  }
  // Web VIP prices (migration 0016) in Vietnamese only.
  for (const slug of ["tokutei-taxi", "tokutei-transport", "seibi", "menkyo", "gino1-seibi", "tokutei-kaigo"]) {
    assert.match(field(rows.get(`${slug}/vi`)!, "features"), /1 tháng 450\.000đ, 3 tháng 700\.000đ/);
  }
});
