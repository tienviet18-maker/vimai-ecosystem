import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import {
  VICARE_GUIDE_SLUGS,
  VICARE_PATH,
  VICARE_PRIVACY_PATH,
  VICARE_SITEMAP_PATHS,
  getVicareGuide,
  getVicareGuides,
  getVicarePageCopy,
  getVicarePrivacy,
  toVicareLocale,
} from "../src/lib/vicare/index.ts";
import { PRODUCT_LOGOS, resolveProductLogo, resolveProductSite } from "../src/lib/product-sites.ts";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  freeMobileAppJsonLd,
  sitemapEntries,
} from "../src/lib/seo.ts";

const LOCALES = ["vi", "en", "ja"] as const;
const SITE = "https://vimai.jp";
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

/** Every string in the ViCare content for one locale, for wording checks. */
function allText(locale: string): string {
  return JSON.stringify([getVicarePageCopy(locale), getVicareGuides(locale), getVicarePrivacy(locale)]);
}

test("every locale has the same guides, in the same order", () => {
  assert.ok(VICARE_GUIDE_SLUGS.length >= 6 && VICARE_GUIDE_SLUGS.length <= 8);
  for (const locale of LOCALES) {
    assert.deepEqual(
      getVicareGuides(locale).map((guide) => guide.slug),
      [...VICARE_GUIDE_SLUGS],
      `${locale} guide slugs`,
    );
  }
  assert.equal(toVicareLocale("fr"), "vi");
  assert.equal(getVicareGuide("en", "nope"), null);
});

test("guides are substantial and their metadata fits search results", () => {
  for (const locale of LOCALES) {
    for (const guide of getVicareGuides(locale)) {
      const where = `${locale}/${guide.slug}`;
      assert.match(guide.slug, /^[a-z0-9-]+$/, where);
      assert.ok(guide.sections.length >= 4, `${where}: at least 4 sections`);
      assert.ok(guide.faqs.length >= 3, `${where}: at least 3 FAQs`);
      assert.ok(guide.seoTitle.length <= 70, `${where}: seoTitle too long (${guide.seoTitle.length})`);
      assert.ok(
        guide.description.length >= 60 && guide.description.length <= 180,
        `${where}: description length ${guide.description.length}`,
      );
      assert.ok(guide.appHelp.length > 40, `${where}: appHelp`);
      for (const slug of guide.related) {
        assert.ok(VICARE_GUIDE_SLUGS.includes(slug) && slug !== guide.slug, `${where}: related ${slug}`);
      }
      const ids = guide.sections.map((section) => section.id);
      assert.equal(new Set(ids).size, ids.length, `${where}: duplicate section id`);
      // A rough "not thin" check on the visible text (Japanese is denser per character).
      const chars = JSON.stringify([guide.lead, guide.sections, guide.faqs]).length;
      const minimum = locale === "ja" ? 1200 : 2500;
      assert.ok(chars > minimum, `${where}: guide looks thin (${chars} chars)`);
    }
  }
});

test("the product page copy is complete in every locale", () => {
  for (const locale of LOCALES) {
    const copy = getVicarePageCopy(locale);
    assert.equal(copy.name, "ViCare");
    assert.ok(copy.faqs.length >= 8 && copy.faqs.length <= 12, `${locale}: 8–12 FAQs`);
    assert.equal(copy.signature.length, 2);
    assert.ok(copy.features.length >= 6);
    assert.equal(copy.flow.length, 5);
    for (const row of copy.webAppRows) assert.equal(row.length, 3);
    assert.ok(copy.description.length <= 180, `${locale}: description ${copy.description.length}`);
  }
});

test("web vs app is stated: interpreter and camera reader are app-only", () => {
  const vi = getVicarePageCopy("vi").webAppRows;
  assert.match(vi.find(([feature]) => /micro/.test(feature))![1], /Chưa/);
  assert.match(vi.find(([feature]) => /camera/.test(feature))![1], /Không/);
  assert.match(vi.find(([feature]) => /nhật ký/.test(feature))![1], /trình duyệt/);
});

test("no store links, no invented phone numbers, no 'reviewed by doctors' claim", () => {
  for (const locale of LOCALES) {
    const text = allText(locale);
    assert.doesNotMatch(text, /apps\.apple\.com|play\.google\.com/, `${locale}: store URL`);
    // Only the national emergency numbers; no 0120-…, 03-… style numbers.
    assert.doesNotMatch(text, /\b0\d{1,4}-\d{1,4}-\d{3,4}\b/, `${locale}: phone number`);
    assert.doesNotMatch(text, /https?:\/\//, `${locale}: hard-coded external URL`);
    assert.doesNotMatch(
      text,
      /reviewed by (a )?doctors|đã được bác sĩ (kiểm )?duyệt(?! chưa)|医師が監修|医師監修済/i,
      `${locale}: must not claim medical review`,
    );
  }
  // #7119 is not nationwide: every locale says so.
  assert.match(allText("vi"), /không phải tỉnh nào cũng có/);
  assert.match(allText("en"), /not available in every prefecture/);
  assert.match(allText("ja"), /実施していない地域もあります/);
});

test("privacy policy matches the app: nothing collected, on-device, OS speech fallback", () => {
  const en = getVicarePrivacy("en");
  const text = JSON.stringify(en);
  assert.match(text, /does not collect your personal data/);
  assert.match(text, /no advertising, analytics/i);
  assert.match(text, /Apple's \(iOS\) or Google's \(Android\)/);
  assert.match(text, /does not request location access/);
  assert.match(text, /never records or stores audio/);
  for (const locale of LOCALES) {
    assert.equal(getVicarePrivacy(locale).sections.length, en.sections.length, `${locale}: sections`);
  }
});

test("sitemap lists the product page, every guide and the privacy policy", () => {
  assert.equal(VICARE_PATH, "/products/vicare");
  assert.equal(VICARE_PRIVACY_PATH, "/products/vicare/privacy");
  assert.ok(VICARE_SITEMAP_PATHS.includes(VICARE_PATH));
  assert.ok(VICARE_SITEMAP_PATHS.includes(VICARE_PRIVACY_PATH));
  assert.equal(VICARE_SITEMAP_PATHS.length, VICARE_GUIDE_SLUGS.length + 2);
  assert.ok(!VICARE_GUIDE_SLUGS.includes("privacy"), "a guide must not shadow the privacy route");
  const entries = sitemapEntries(SITE, "/products/vicare/goi-119-o-nhat", LOCALES);
  assert.deepEqual(
    entries.map((entry) => entry.url),
    [
      "https://vimai.jp/products/vicare/goi-119-o-nhat",
      "https://vimai.jp/en/products/vicare/goi-119-o-nhat",
      "https://vimai.jp/ja/products/vicare/goi-119-o-nhat",
    ],
  );
  const sitemap = read("src/app/sitemap.ts");
  assert.match(sitemap, /VICARE_SITEMAP_PATHS/);
});

test("ViCare routes exist and use self canonical metadata", () => {
  const base = "src/app/[locale]/(public)/products/vicare";
  for (const file of [`${base}/page.tsx`, `${base}/[topic]/page.tsx`, `${base}/privacy/page.tsx`]) {
    assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), file);
    const source = read(file);
    assert.match(source, /staticPageMetadata\(/, `${file}: canonical + hreflang`);
    assert.match(source, /export const runtime = "edge"/, `${file}: edge runtime`);
    assert.match(source, /breadcrumbJsonLd\(/, `${file}: breadcrumb JSON-LD`);
  }
  assert.match(read(`${base}/page.tsx`), /freeMobileAppJsonLd\(/);
  assert.match(read(`${base}/page.tsx`), /EcosystemLinks/);
  assert.match(read("src/app/[locale]/(public)/products/[slug]/page.tsx"), /EcosystemLinks/);
});

test("ViCare logo and record: web app on vicare.vimai.jp, optimized logo", () => {
  assert.equal(resolveProductSite("vicare"), "https://vicare.vimai.jp");
  const page = read("src/app/[locale]/(public)/products/vicare/page.tsx");
  assert.match(page, /copy\.webCta/);
  for (const locale of LOCALES) {
    assert.ok(getVicarePageCopy(locale).webCta && getVicarePageCopy(locale).webNote, `${locale}: web CTA copy`);
  }
  assert.equal(PRODUCT_LOGOS.vicare, "/images/products/vicare.v2.webp");
  assert.equal(resolveProductLogo("vicare", "/images/products/vicare.png"), "/images/products/vicare.v2.webp");

  const seed = read("src/lib/seed.ts");
  assert.match(seed, /slug: "vicare"/);
  const migration = read("d1/migrations/0012_add_vicare_product.sql");
  assert.doesNotMatch(migration, /\b(UPDATE|DELETE|DROP)\b/);
  assert.doesNotMatch(migration, /^\s*INSERT INTO/m, "every insert must be OR IGNORE");
  assert.match(migration, /'00000000-0000-0000-0000-000000000008', 'vicare', 'coming_soon', 'health'/);
  for (const locale of LOCALES) {
    assert.match(migration, new RegExp(`000000000008-${locale}', id, '${locale}'`));
  }
  assert.match(read("d1/seed.sql"), /'vicare', 'coming_soon'/);
});

test("JSON-LD: free app, FAQ, breadcrumbs and article", () => {
  const pageUrl = "https://vimai.jp/products/vicare";
  const app = freeMobileAppJsonLd({
    name: "ViCare",
    description: "d",
    image: "/images/products/vicare.png",
    siteUrl: SITE,
    pageUrl,
    locale: "vi",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    availableLanguage: ["vi", "ja", "en"],
    storeUrls: [null, undefined],
  });
  assert.deepEqual(app["@type"], ["MobileApplication", "SoftwareApplication"]);
  assert.deepEqual(app.offers, { "@type": "Offer", price: "0", priceCurrency: "JPY" });
  assert.equal(app.image, "https://vimai.jp/images/products/vicare.png");
  assert.equal(app.sameAs, undefined, "no store links until they exist");
  assert.equal(app.isAccessibleForFree, true);

  const faq = faqPageJsonLd(pageUrl, "vi", [{ question: "Q?", answer: "A." }]);
  assert.equal(faq["@type"], "FAQPage");
  assert.equal((faq.mainEntity as unknown[]).length, 1);

  const crumbs = breadcrumbJsonLd(pageUrl, [
    { name: "Trang chủ", url: "https://vimai.jp/" },
    { name: "ViCare", url: pageUrl },
  ]);
  assert.deepEqual(crumbs.itemListElement, [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://vimai.jp/" },
    { "@type": "ListItem", position: 2, name: "ViCare", item: pageUrl },
  ]);

  const article = articleJsonLd({
    headline: "H",
    description: "D",
    siteUrl: SITE,
    pageUrl: `${pageUrl}/goi-119-o-nhat`,
    locale: "ja",
    image: "/images/products/vicare.png",
    dateModified: "2026-10-12",
    about: `${pageUrl}#app`,
  });
  assert.equal(article["@type"], "Article");
  assert.deepEqual(article.about, { "@id": `${pageUrl}#app` });
});
