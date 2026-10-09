/** Canonical product subdomains on vimai.jp. Do not rename these hosts. */
export const PRODUCT_SITES: Record<string, string> = {
  "tokutei-taxi": "https://tokutei-taxi.vimai.jp",
  "tokutei-transport": "https://tokutei-transport.vimai.jp",
  seibi: "https://seibi.vimai.jp",
  kids: "https://kids.vimai.jp",
  maimai: "https://maimai.vimai.jp",
  menkyo: "https://menkyo.vimai.jp",
  "gino1-seibi": "https://gino1-seibi.vimai.jp",
};

/** Original full-size PNG logos (kept for Open Graph images). */
export const PRODUCT_LOGOS_PNG: Record<string, string> = {
  "tokutei-taxi": "/images/products/tokutei_taxi.png",
  "tokutei-transport": "/images/products/tokutei_vantai.png",
  seibi: "/images/products/sebishi_3kyu.png",
  kids: "/images/products/vimai_kids.png",
  maimai: "/images/products/maimai.png",
  menkyo: "/images/products/vimai_menkyo.png",
  "gino1-seibi": "/images/products/gino1_seibi.png",
};

/** Canonical product logos served from /public/images/products (640px WebP, ~40 KB). */
export const PRODUCT_LOGOS: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCT_LOGOS_PNG).map(([slug, png]) => [slug, toOptimizedImage(png)]),
);

/**
 * Maps a legacy `/images/products/<name>.png` path (still stored in D1) to its
 * optimized `<name>.v2.webp`. Any other URL is returned unchanged.
 */
export function toOptimizedImage(url: string): string;
export function toOptimizedImage(url: string | null | undefined): string | null;
export function toOptimizedImage(url: string | null | undefined): string | null {
  if (!url) return url ?? null;
  return url.replace(/^(\/images\/products\/[a-z0-9_]+)\.png$/, "$1.v2.webp");
}

export function resolveProductSite(
  slug: string,
  websiteUrl?: string | null,
): string | null {
  const fromRecord = websiteUrl?.trim();
  if (fromRecord) return fromRecord;
  return PRODUCT_SITES[slug] ?? null;
}

export function resolveProductLogo(
  slug: string,
  logoUrl?: string | null,
): string {
  const canonical = PRODUCT_LOGOS[slug];
  if (slug === "tokutei-transport") {
    return PRODUCT_LOGOS["tokutei-transport"];
  }
  const fromRecord = logoUrl?.trim();
  if (fromRecord) return toOptimizedImage(fromRecord);
  return canonical ?? PRODUCT_LOGOS["tokutei-taxi"];
}

/** Open Graph image: keep the original PNG (broadest crawler support). */
export function resolveProductOgImage(slug: string, ogUrl?: string | null): string {
  const fromRecord = ogUrl?.trim();
  if (fromRecord) return fromRecord;
  return PRODUCT_LOGOS_PNG[slug] ?? PRODUCT_LOGOS_PNG["tokutei-taxi"];
}
