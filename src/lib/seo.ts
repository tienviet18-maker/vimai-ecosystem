/**
 * Pure SEO helpers for public pages. No `@/` imports so tests can load this
 * file directly with Node.
 */

const LOCALES = ["vi", "en", "ja"] as const;

/** Absolute URL of `path` in one locale (Vietnamese has no prefix). */
export function localizedUrl(siteUrl: string, locale: string, path = ""): string {
  const suffix = !path || path === "/" ? "" : path;
  if (locale === "vi") return `${siteUrl}${suffix || "/"}`;
  return `${siteUrl}/${locale}${suffix}`;
}

/** hreflang map for a page that exists in every locale (same shape as the root layout). */
export function hreflangAlternates(siteUrl: string, path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[locale] = localizedUrl(siteUrl, locale, path);
  languages["vi-VN"] = languages.vi;
  languages["x-default"] = languages.vi;
  return languages;
}

export function openGraphLocale(locale: string): string {
  return locale === "ja" ? "ja_JP" : locale === "en" ? "en_US" : "vi_VN";
}

type JsonLdProduct = {
  name: string;
  description: string;
  logo_url: string;
  website_url: string | null;
  app_store_url: string | null;
  google_play_url: string | null;
};

/**
 * Platforms a product really runs on: Web when it has a site, iOS / Android only
 * once a store link exists. Never claims a store that has no listing yet.
 */
export function productOperatingSystems(
  product: Pick<JsonLdProduct, "website_url" | "app_store_url" | "google_play_url">,
  iosUrl?: string | null,
): string {
  const systems: string[] = [];
  if (product.app_store_url || iosUrl) systems.push("iOS");
  if (product.google_play_url) systems.push("Android");
  if (product.website_url) systems.push("Web");
  return systems.length ? systems.join(", ") : "Web";
}

/** SoftwareApplication (+ FAQPage when the page shows FAQs) as one JSON-LD graph. */
export function productJsonLd(options: {
  product: JsonLdProduct;
  siteUrl: string;
  pageUrl: string;
  locale: string;
  iosUrl?: string | null;
  faqs?: Array<{ question: string; answer: string }>;
}): Record<string, unknown> {
  const { product, siteUrl, pageUrl, locale, iosUrl, faqs = [] } = options;
  const image = /^https?:\/\//.test(product.logo_url)
    ? product.logo_url
    : `${siteUrl}${product.logo_url}`;
  const app = {
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#app`,
    name: product.name,
    applicationCategory: "EducationalApplication",
    operatingSystem: productOperatingSystems(product, iosUrl),
    description: product.description,
    image,
    url: pageUrl,
    inLanguage: locale,
    sameAs: product.website_url ? [product.website_url] : undefined,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "JPY",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "ViMai",
      url: siteUrl,
    },
  };
  const graph: Record<string, unknown>[] = [app];
  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: locale,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
