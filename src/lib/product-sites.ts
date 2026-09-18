/** Canonical product subdomains on vimai.jp. Do not rename these hosts. */
export const PRODUCT_SITES: Record<string, string> = {
  "tokutei-taxi": "https://tokutei-taxi.vimai.jp",
  "tokutei-transport": "https://tokutei-truck.vimai.jp",
  seibi: "https://seibi.vimai.jp",
  kids: "https://kids.vimai.jp",
  maimai: "https://maimai.vimai.jp",
};

/** Canonical product logos served from /public/images/products. */
export const PRODUCT_LOGOS: Record<string, string> = {
  "tokutei-taxi": "/images/products/tokutei_taxi.png",
  "tokutei-transport": "/images/products/tokutei_vantai.png",
  seibi: "/images/products/sebishi_3kyu.png",
  kids: "/images/products/vimai_kids.png",
  maimai: "/images/products/maimai.png",
};

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
  if (fromRecord) return fromRecord;
  return canonical ?? PRODUCT_LOGOS["tokutei-taxi"];
}
