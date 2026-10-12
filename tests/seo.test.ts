import assert from "node:assert/strict";
import { test } from "node:test";
import {
  hreflangAlternates,
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

  const noFaq = productJsonLd({ product, siteUrl: SITE, pageUrl, locale: "en" });
  assert.equal((noFaq["@graph"] as unknown[]).length, 1);
});
