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
  assert.equal(PRODUCT_SITES.seibi, "https://seibishi3.vimai.jp");
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

test("gino1 dictionary count update only rewrites the 800 phrase on gino1 rows", () => {
  const migration = read("d1/migrations/0011_gino1_dictionary_2500.sql");
  assert.doesNotMatch(migration, /\b(DELETE|DROP|INSERT)\b/);
  for (const m of migration.matchAll(/^UPDATE[\s\S]*?;$/gm)) {
    assert.match(m[0], /slug = 'gino1-seibi'/, "every UPDATE must be scoped to gino1-seibi");
  }
  for (const phrase of ["2500語以上", "hơn 2.500 mục", "over 2,500 entries"]) {
    assert.match(migration, new RegExp(phrase));
    assert.match(read("src/lib/seed.ts"), new RegExp(phrase));
  }
  for (const file of ["src/lib/seed.ts", "d1/seed.sql", "d1/migrations/0010_add_gino1_product.sql"]) {
    assert.doesNotMatch(read(file), /800語以上|hơn 800 mục|over 800 entries/, file);
  }
});

test("product ids, slugs and sort orders are unique across seed and migrations", () => {
  const sql = [
    read("d1/seed.sql"),
    read("d1/migrations/0005_add_menkyo_product.sql"),
    read("d1/migrations/0010_add_gino1_product.sql"),
    read("d1/migrations/0012_add_vicare_product.sql"),
  ].join("\n");
  const rows = [
    ...sql.matchAll(/'(00000000-0000-0000-0000-0000000000\d\d)', '([a-z0-9-]+)', '[a-z_]+',(?: '[a-z]+',)?\s*\S+, \S+, \S+,\s*[01], (\d+),/g),
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
  assert.ok(bySlug.has("vicare"));
  const ids = [...bySlug.values()].map((item) => item.id);
  const sorts = [...bySlug.values()].map((item) => item.sort);
  assert.equal(new Set(ids).size, ids.length, "duplicate product id");
  assert.equal(new Set(sorts).size, sorts.length, "duplicate sort order");
});

test("Transport launch: migration 0013 matches the seed and only rewrites placeholder rows", () => {
  const migration = read("d1/migrations/0013_transport_launch.sql");
  const seed = read("src/lib/seed.ts");
  const seedSql = read("d1/seed.sql");

  assert.doesNotMatch(migration, /\b(DELETE|DROP)\b/);
  assert.doesNotMatch(migration, /^\s*INSERT INTO/m, "every insert must be OR IGNORE");
  // Status: Taxi and Transport only, and only while still coming_soon. Gino 1 stays beta.
  assert.match(
    migration,
    /UPDATE products\nSET status = 'launched',[\s\S]*?WHERE slug IN \('tokutei-taxi', 'tokutei-transport'\)\n {2}AND status = 'coming_soon';/,
  );
  assert.doesNotMatch(migration, /gino1-seibi/);
  for (const slug of ["tokutei-taxi", "tokutei-transport"]) {
    assert.match(seed, new RegExp(`slug: "${slug}",\\n    status: "launched",`));
    assert.match(seedSql, new RegExp(`'${slug}', 'launched'`));
  }
  assert.match(seed, /slug: "gino1-seibi",\n    status: "beta",/);

  // Every translation UPDATE is scoped to Transport and to the old placeholder text.
  const updates = migration
    .split(/;\n/)
    .map((sql) => `${sql.trim()};`)
    .filter((sql) => sql.startsWith("UPDATE product_translations"));
  assert.equal(updates.length, 3);
  for (const sql of updates) {
    assert.match(sql, /product_id = \(SELECT id FROM products WHERE slug = 'tokutei-transport'\)/);
    assert.match(sql, /AND instr\(description, '[^']+'\) > 0;$/);
  }
  // D1 rejects LIKE/GLOB patterns over 50 bytes ("pattern too complex").
  for (const m of migration.matchAll(/(?:LIKE|GLOB)\s+'([^']*)'/g)) {
    assert.ok(Buffer.byteLength(m[1]) <= 50, `pattern too long for D1: ${m[1]}`);
  }

  for (const locale of ["vi", "en", "ja"]) {
    for (let n = 1; n <= 7; n += 1) {
      const id = `faq-transport-${n}-${locale}`;
      assert.match(migration, new RegExp(`'${id}'`));
      assert.match(seedSql, new RegExp(`'${id}'`));
    }
  }
  for (let n = 1; n <= 7; n += 1) assert.match(seed, new RegExp(`id: "faq-transport-${n}"`));

  // The same SEO texts in the migration, the seed fallback and seed.sql.
  const titles = [...migration.matchAll(/seo_title = '([^']+)'/g)].map((m) => m[1]);
  const descriptions = [...migration.matchAll(/seo_description = '([^']+)'/g)].map((m) => m[1]);
  assert.equal(titles.length, 3);
  assert.equal(descriptions.length, 3);
  for (const title of titles) {
    assert.ok([...title].length <= 60, `seo_title too long: ${title}`);
    assert.ok(seed.includes(`seo_title: "${title}"`), `seed.ts lacks ${title}`);
    assert.ok(seedSql.includes(`'${title}'`), `seed.sql lacks ${title}`);
  }
  for (const description of descriptions) {
    assert.ok([...description].length <= 160, `seo_description too long: ${description}`);
    assert.ok(seed.includes(`"${description}"`), `seed.ts lacks ${description}`);
    assert.ok(seedSql.includes(`'${description}'`), `seed.sql lacks ${description}`);
  }

  // Facts: 20 exams x 50 questions, 80 minutes, 60% per part, exams 1-3 free, 510 words.
  for (const phrase of ["20 đề thi thử", "80 phút", "60%", "Đề 1–3 miễn phí", "510 từ", "không phải đề thi thật"]) {
    assert.match(migration, new RegExp(phrase));
  }
  // VND price (from ctv-core: 500,000 and 10/15/20% off) only in Vietnamese rows.
  assert.match(migration, /500\.000đ/);
  assert.match(migration, /450\.000đ, 425\.000đ hoặc 400\.000đ/);
  // Statements end with ";" at the end of a line (texts may contain "; ").
  const statements = migration.split(/;\n/);
  const enJaBlocks = statements.filter(
    (sql) =>
      /^UPDATE product_translations[\s\S]*WHERE locale = '(en|ja)'/.test(sql.trim()) ||
      /^INSERT OR IGNORE INTO faq_translations[\s\S]*VALUES \('[^']+-(en|ja)',/.test(sql.trim()),
  );
  assert.equal(enJaBlocks.length, 2 + 7 * 2);
  for (const block of enJaBlocks) {
    assert.doesNotMatch(block, /VND|ドン|₫|VietQR|500[.,]000/, block.slice(0, 120));
  }
});

test("Seibishi 3kyu: migration 0015 matches the seed and only rewrites placeholder rows", () => {
  const migration = read("d1/migrations/0015_seibishi3_content.sql");
  const seed = read("src/lib/seed.ts");
  const seedSql = read("d1/seed.sql");

  // Slug stays `seibi` (vimai.jp/products/seibi keeps its URL); new canonical site.
  assert.equal(resolveProductSite("seibi"), "https://seibishi3.vimai.jp");
  assert.equal(resolveProductLogo("seibi"), "/images/products/sebishi_3kyu.v2.webp");
  assert.match(seed, /slug: "seibi",\n    status: "development",\n[\s\S]*?website_url: "https:\/\/seibishi3\.vimai\.jp",/);
  assert.match(seedSql, /'seibi', 'development',\s*NULL, NULL, 'https:\/\/seibishi3\.vimai\.jp'/);
  for (const file of ["src/lib/seed.ts", "d1/seed.sql", "src/lib/product-sites.ts"]) {
    assert.doesNotMatch(read(file), /\/\/seibi\.vimai\.jp/, file);
  }

  assert.doesNotMatch(migration, /\b(DELETE|DROP)\b/);
  assert.doesNotMatch(migration, /^\s*INSERT INTO/m, "every insert must be OR IGNORE");
  // Status is not touched (owner has not launched; payment not set up yet).
  assert.doesNotMatch(migration, /\bstatus\b\s*=/);
  // website_url changes only for slug seibi and only from empty / the old host.
  const productUpdates = [...migration.matchAll(/^UPDATE products\n[\s\S]*?;$/gm)].map((m) => m[0]);
  assert.equal(productUpdates.length, 1);
  assert.match(productUpdates[0], /SET website_url = 'https:\/\/seibishi3\.vimai\.jp',/);
  assert.match(
    productUpdates[0],
    /WHERE slug = 'seibi'\n {2}AND \(website_url IS NULL OR website_url = '' OR website_url = 'https:\/\/seibi\.vimai\.jp'\);$/,
  );

  // Every translation UPDATE is scoped to seibi and to the old placeholder
  // description (not the name, so rows renamed in admin are still filled).
  const updates = migration
    .split(/;\n/)
    .map((sql) => `${sql.trim()};`)
    .filter((sql) => sql.startsWith("UPDATE product_translations"));
  assert.equal(updates.length, 3);
  const placeholders = {
    ja: "外国人学習者への配慮、段階的な学習",
    vi: "Nêu rõ đối tượng, phạm vi học",
    en: "It highlights the audience, curriculum scope",
  };
  for (const [locale, placeholder] of Object.entries(placeholders)) {
    const sql = updates.find((item) => item.includes(`WHERE locale = '${locale}'`));
    assert.ok(sql, `missing ${locale} update`);
    assert.match(sql, /product_id = \(SELECT id FROM products WHERE slug = 'seibi'\)/);
    assert.ok(sql.endsWith(`AND instr(description, '${placeholder}') > 0;`), sql.slice(-120));
    assert.doesNotMatch(sql, /WHERE[\s\S]*\bname\b/);
    // The placeholder really is the old seed text, and is gone from the new seed.
    assert.ok(read("d1/migrations/0002_product_hub_content.sql").includes(placeholder));
    assert.ok(!seed.includes(placeholder), `seed.ts still has placeholder ${placeholder}`);
    assert.ok(!seedSql.includes(placeholder), `seed.sql still has placeholder ${placeholder}`);
  }
  for (const m of migration.matchAll(/(?:LIKE|GLOB)\s+'([^']*)'/g)) {
    assert.ok(Buffer.byteLength(m[1]) <= 50, `pattern too long for D1: ${m[1]}`);
  }

  // Same names in all three places.
  for (const name of [
    "ViMai Seibishi 3kyu – Luyện thi 3級 自動車整備士",
    "ViMai Seibishi 3kyu",
  ]) {
    assert.ok(seed.includes(`name: "${name}"`), `seed.ts lacks ${name}`);
    assert.ok(migration.includes(`name = '${name}'`), `migration lacks ${name}`);
    assert.ok(seedSql.includes(`'${name}'`), `seed.sql lacks ${name}`);
  }

  for (const locale of ["vi", "en", "ja"]) {
    for (let n = 1; n <= 6; n += 1) {
      const id = `faq-seibi3-${n}-${locale}`;
      assert.match(migration, new RegExp(`'${id}'`));
      assert.match(seedSql, new RegExp(`'${id}'`));
    }
  }
  for (let n = 1; n <= 6; n += 1) {
    assert.match(seed, new RegExp(`id: "faq-seibi3-${n}",\\n    product_id: "00000000-0000-0000-0000-000000000003",\\n    product_slug: "seibi",`));
  }

  // The same SEO texts in the migration, the seed fallback and seed.sql.
  const titles = [...migration.matchAll(/seo_title = '([^']+)'/g)].map((m) => m[1]);
  const descriptions = [...migration.matchAll(/seo_description = '([^']+)'/g)].map((m) => m[1]);
  assert.equal(titles.length, 3);
  assert.equal(descriptions.length, 3);
  for (const title of titles) {
    assert.ok([...title].length <= 60, `seo_title too long: ${title}`);
    assert.ok(seed.includes(`seo_title: "${title}"`), `seed.ts lacks ${title}`);
    assert.ok(seedSql.includes(`'${title}'`), `seed.sql lacks ${title}`);
  }
  for (const description of descriptions) {
    assert.ok([...description].length <= 160, `seo_description too long: ${description}`);
    assert.ok(seed.includes(`"${description}"`), `seed.ts lacks ${description}`);
    assert.ok(seedSql.includes(`'${description}'`), `seed.sql lacks ${description}`);
  }

  // Facts: 3 subjects x 20 papers, 1,800 four-choice questions, 60 minutes,
  // 70% (21/30), papers 1-3 of each subject free, 2,520-entry dictionary,
  // not real exam questions, 2027 三級（総合） change, web app only.
  for (const phrase of [
    "60 đề thi thử", "1.800 câu", "60 phút", "70%", "21/30", "Đề 1–3 của mỗi môn miễn phí",
    "2.520 mục", "không phải đề thi thật", "không được JASPA bảo trợ", "三級（総合）",
    "seibishi3.vimai.jp", "1,800 questions", "not real exam questions", "not endorsed by JASPA",
    "実際の試験問題ではなく", "2,520語",
  ]) {
    assert.ok(migration.includes(phrase), `migration lacks ${phrase}`);
  }
  for (const phrase of ["合格を保証するものではありません", "không cam kết đậu kỳ thi", "does not guarantee a passing result"]) {
    assert.ok(migration.includes(phrase), `migration lacks disclaimer ${phrase}`);
  }
  // VND price (from the owner: VIP 3 months 700,000đ) only in Vietnamese rows.
  assert.match(migration, /700\.000đ/);
  const statements = migration.split(/;\n/);
  const enJaBlocks = statements.filter(
    (sql) =>
      /^UPDATE product_translations[\s\S]*WHERE locale = '(en|ja)'/.test(sql.trim()) ||
      /^INSERT OR IGNORE INTO faq_translations[\s\S]*VALUES \('[^']+-(en|ja)',/.test(sql.trim()),
  );
  assert.equal(enJaBlocks.length, 2 + 6 * 2);
  for (const block of enJaBlocks) {
    assert.doesNotMatch(block, /VND|ドン|₫|VietQR|700[.,]000/, block.slice(0, 120));
  }
});
