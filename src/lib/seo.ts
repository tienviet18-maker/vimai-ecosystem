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

/**
 * hreflang + canonical for a page that exists only in some locales (articles).
 * A locale without its own translation canonicalises to the best existing one
 * (Vietnamese first), so fallback copies are not indexed as duplicates.
 */
export function partialLocaleAlternates(
  siteUrl: string,
  path: string,
  locale: string,
  available: readonly string[],
): { canonical: string; languages: Record<string, string> } {
  const existing = LOCALES.filter((item) => available.includes(item));
  const fallback = existing.includes("vi") ? "vi" : (existing[0] ?? "vi");
  const canonicalLocale = existing.includes(locale as (typeof LOCALES)[number]) ? locale : fallback;
  const languages: Record<string, string> = {};
  for (const item of existing) languages[item] = localizedUrl(siteUrl, item, path);
  if (languages.vi) languages["vi-VN"] = languages.vi;
  if (existing.length > 0) languages["x-default"] = localizedUrl(siteUrl, fallback, path);
  return { canonical: localizedUrl(siteUrl, canonicalLocale, path), languages };
}

/**
 * Metadata for a static page that exists in every locale: own title and
 * description, self canonical, hreflang, and Open Graph pointing at the page
 * (the layout default would otherwise point og:url and canonical at the home page).
 */
export function staticPageMetadata(options: {
  siteUrl: string;
  locale: string;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}) {
  const { siteUrl, locale, path, title, description } = options;
  const url = localizedUrl(siteUrl, locale, path);
  const image = options.ogImage ?? "/brand/og/og-default.jpg";
  return {
    title,
    description,
    alternates: { canonical: url, languages: hreflangAlternates(siteUrl, path) },
    openGraph: {
      title: `${title} | ViMai`,
      description,
      url,
      siteName: "ViMai",
      locale: openGraphLocale(locale),
      type: "website" as const,
      images: [{ url: image, alt: "ViMai" }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ViMai`,
      description,
      images: [image],
    },
  };
}

const VIP_OFFER_NAME: Record<string, string> = {
  vi: "VIP 3 tháng",
  en: "VIP, 3 months",
  ja: "VIP（3か月）",
};

const FREE_OFFER_NAME: Record<string, string> = {
  vi: "Gói miễn phí",
  en: "Free tier",
  ja: "無料プラン",
};

/**
 * Offers that match reality. `pricing` is null when we do not know the price:
 * then no offers are emitted at all. Otherwise there is a free tier (price 0)
 * and, where the page may quote VND (see store-policy.ts), the VIP web price.
 */
export function productOffers(
  locale: string,
  pricing: { vipVnd: number; showVnd: boolean } | null | undefined,
  url: string | null,
): Record<string, unknown>[] | undefined {
  if (!pricing) return undefined;
  const offers: Record<string, unknown>[] = [
    {
      "@type": "Offer",
      name: FREE_OFFER_NAME[locale] ?? FREE_OFFER_NAME.en,
      price: "0",
      priceCurrency: pricing.showVnd ? "VND" : "JPY",
      ...(url ? { url } : {}),
    },
  ];
  if (pricing.showVnd && pricing.vipVnd > 0) {
    offers.push({
      "@type": "Offer",
      name: VIP_OFFER_NAME[locale] ?? VIP_OFFER_NAME.en,
      price: String(pricing.vipVnd),
      priceCurrency: "VND",
      ...(url ? { url } : {}),
    });
  }
  return offers;
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
  pricing?: { vipVnd: number; showVnd: boolean } | null;
}): Record<string, unknown> {
  const { product, siteUrl, pageUrl, locale, iosUrl, faqs = [], pricing } = options;
  const offers = productOffers(locale, pricing, product.website_url);
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
    ...(offers ? { offers } : {}),
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

/**
 * Sitemap entries for one page: one URL per locale it exists in, each listing
 * the others as hreflang alternates (Google's sitemap hreflang format).
 */
export function sitemapEntries(
  siteUrl: string,
  path: string,
  locales: readonly string[],
  updatedAt?: string | null,
): Array<{ url: string; lastModified?: Date; alternates: { languages: Record<string, string> } }> {
  const existing = LOCALES.filter((item) => locales.includes(item));
  const languages: Record<string, string> = {};
  for (const item of existing) languages[item] = localizedUrl(siteUrl, item, path);
  if (existing.length > 0) {
    languages["x-default"] = languages.vi ?? languages[existing[0]];
  }
  const lastModified = updatedAt ? new Date(updatedAt) : undefined;
  const validDate = lastModified && !Number.isNaN(lastModified.getTime()) ? lastModified : undefined;
  return existing.map((item) => ({
    url: languages[item],
    ...(validDate ? { lastModified: validDate } : {}),
    alternates: { languages },
  }));
}
