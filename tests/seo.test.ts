import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import {
  hreflangAlternates,
  partialLocaleAlternates,
  productOffers,
  sitemapEntries,
  staticPageMetadata,
  localizedUrl,
  openGraphLocale,
  productJsonLd,
  productOperatingSystems,
} from "../src/lib/seo.ts";

const SITE = "https://vimai.jp";

test("product pages get self canonical URLs and hreflang for every locale", () => {
  assert.equal(localizedUrl(SITE, "vi", "/products/gino1-seibi"), "https://vimai.jp/products/gino1-seibi");
  assert.equal(localizedUrl(SITE, "en", "/products/gino1-seibi"), "https://vimai.jp/en/products/gino1-seibi");
  assert.equal(localizedUrl(SITE, "ja", ""), "https://vimai.jp/ja");
  assert.equal(localizedUrl(SITE, "vi", ""), "https://vimai.jp/");
  assert.deepEqual(hreflangAlternates(SITE, "/products/gino1-seibi"), {
    vi: "https://vimai.jp/products/gino1-seibi",
    "vi-VN": "https://vimai.jp/products/gino1-seibi",
    en: "https://vimai.jp/en/products/gino1-seibi",
    ja: "https://vimai.jp/ja/products/gino1-seibi",
    "x-default": "https://vimai.jp/products/gino1-seibi",
  });
  assert.equal(openGraphLocale("ja"), "ja_JP");
  assert.equal(openGraphLocale("vi"), "vi_VN");
});

test("operating systems never claim a store without a listing", () => {
  const web = { website_url: "https://gino1-seibi.vimai.jp", app_store_url: null, google_play_url: null };
  assert.equal(productOperatingSystems(web), "Web");
  assert.equal(productOperatingSystems(web, null), "Web");
  assert.equal(productOperatingSystems(web, "https://apps.apple.com/app/id1"), "iOS, Web");
  assert.equal(
    productOperatingSystems({ ...web, google_play_url: "https://play.google.com/x" }),
    "Android, Web",
  );
});

test("product JSON-LD includes the app and, when shown, the FAQ", () => {
  const product = {
    name: "ViMai Gino 1 Seibi",
    description: "desc",
    logo_url: "/images/products/gino1_seibi.v2.webp",
    website_url: "https://gino1-seibi.vimai.jp",
    app_store_url: null,
    google_play_url: null,
  };
  const pageUrl = "https://vimai.jp/products/gino1-seibi";
  const data = productJsonLd({
    product,
    siteUrl: SITE,
    pageUrl,
    locale: "vi",
    faqs: [{ question: "Q?", answer: "A." }],
  });
  const graph = data["@graph"] as Array<Record<string, unknown>>;
  assert.equal(data["@context"], "https://schema.org");
  assert.equal(graph[0]["@type"], "SoftwareApplication");
  assert.equal(graph[0].url, pageUrl);
  assert.equal(graph[0].image, "https://vimai.jp/images/products/gino1_seibi.v2.webp");
  assert.equal(graph[0].operatingSystem, "Web");
  assert.deepEqual(graph[0].sameAs, ["https://gino1-seibi.vimai.jp"]);
  assert.equal(graph[1]["@type"], "FAQPage");
  assert.deepEqual(graph[1].mainEntity, [
    { "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A." } },
  ]);

  assert.equal(graph[0].offers, undefined, "no offers when the price is unknown");
  assert.doesNotMatch(JSON.stringify(data), /PreOrder/);

  const noFaq = productJsonLd({ product, siteUrl: SITE, pageUrl, locale: "en" });
  assert.equal((noFaq["@graph"] as unknown[]).length, 1);

  const priced = productJsonLd({
    product,
    siteUrl: SITE,
    pageUrl,
    locale: "vi",
    pricing: { vipVnd: 700000, showVnd: true },
  });
  const offers = (priced["@graph"] as Array<Record<string, unknown>>)[0].offers;
  assert.deepEqual(offers, [
    { "@type": "Offer", name: "Gói miễn phí", price: "0", priceCurrency: "VND", url: "https://gino1-seibi.vimai.jp" },
    { "@type": "Offer", name: "VIP 3 tháng", price: "700000", priceCurrency: "VND", url: "https://gino1-seibi.vimai.jp" },
  ]);
});

test("offers: none when unknown, never VND where the page sends readers to Apple", () => {
  assert.equal(productOffers("vi", null, null), undefined);
  const appStore = productOffers("en", { vipVnd: 500000, showVnd: false }, null)!;
  assert.equal(appStore.length, 1);
  assert.equal(appStore[0].price, "0");
  assert.doesNotMatch(JSON.stringify(appStore), /VND/);
  for (const offer of productOffers("ja", { vipVnd: 700000, showVnd: true }, null)!) {
    assert.ok(offer.price !== undefined && offer.priceCurrency, "Google needs price and currency");
  }
});

test("articles list hreflang only for existing translations", () => {
  const both = partialLocaleAlternates(SITE, "/articles/a", "en", ["vi", "en"]);
  assert.equal(both.canonical, "https://vimai.jp/en/articles/a");
  assert.deepEqual(both.languages, {
    vi: "https://vimai.jp/articles/a",
    en: "https://vimai.jp/en/articles/a",
    "vi-VN": "https://vimai.jp/articles/a",
    "x-default": "https://vimai.jp/articles/a",
  });
  // /ja shows the Vietnamese fallback: canonical points to the original.
  const fallback = partialLocaleAlternates(SITE, "/articles/a", "ja", ["vi", "en"]);
  assert.equal(fallback.canonical, "https://vimai.jp/articles/a");
  assert.equal(fallback.languages.ja, undefined);
  const enOnly = partialLocaleAlternates(SITE, "/articles/b", "vi", ["en"]);
  assert.equal(enOnly.canonical, "https://vimai.jp/en/articles/b");
  assert.equal(enOnly.languages["x-default"], "https://vimai.jp/en/articles/b");
});

test("static pages get their own canonical, hreflang and og:url", () => {
  const meta = staticPageMetadata({ siteUrl: SITE, locale: "ja", path: "/about", title: "T", description: "D" });
  assert.equal(meta.alternates.canonical, "https://vimai.jp/ja/about");
  assert.equal(meta.alternates.languages.en, "https://vimai.jp/en/about");
  assert.equal(meta.openGraph.url, "https://vimai.jp/ja/about");
  assert.equal(meta.openGraph.locale, "ja_JP");

  const pages: Record<string, string> = {
    about: "/about",
    support: "/support",
    contact: "/contact",
    privacy: "/privacy",
    terms: "/terms",
    duatop: "/duatop",
    articles: "/articles",
  };
  for (const [dir, path] of Object.entries(pages)) {
    const source = readFileSync(new URL(`../src/app/[locale]/(public)/${dir}/page.tsx`, import.meta.url), "utf8");
    assert.match(source, /staticPageMetadata\(/, `${dir} must use staticPageMetadata`);
    assert.ok(source.includes(`path: "${path}"`), `${dir} must declare its own path`);
  }
});

test("sitemap entries carry hreflang alternates", () => {
  const entries = sitemapEntries(SITE, "/products/gino1-seibi", ["vi", "en", "ja"], "2026-10-12T00:00:00Z");
  assert.deepEqual(entries.map((entry) => entry.url), [
    "https://vimai.jp/products/gino1-seibi",
    "https://vimai.jp/en/products/gino1-seibi",
    "https://vimai.jp/ja/products/gino1-seibi",
  ]);
  assert.equal(entries[1].alternates.languages.ja, "https://vimai.jp/ja/products/gino1-seibi");
  assert.equal(entries[1].alternates.languages["x-default"], "https://vimai.jp/products/gino1-seibi");
  assert.ok(entries[0].lastModified instanceof Date);
  assert.deepEqual(sitemapEntries(SITE, "", ["vi", "en"]).map((entry) => entry.url), [
    "https://vimai.jp/",
    "https://vimai.jp/en",
  ]);
  assert.equal(sitemapEntries(SITE, "/articles/x", ["en"]).length, 1);
  assert.equal(sitemapEntries(SITE, "/x", [], "not a date").length, 0);
});
