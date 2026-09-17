/** Canonical product subdomains on vimai.jp. Do not rename these hosts. */
export const PRODUCT_SITES: Record<string, string> = {
  "tokutei-taxi": "https://tokutei-taxi.vimai.jp",
  "tokutei-transport": "https://tokutei-truck.vimai.jp",
  seibi: "https://seibi.vimai.jp",
  kids: "https://kids.vimai.jp",
  maimai: "https://maimai.vimai.jp",
};

export function resolveProductSite(
  slug: string,
  websiteUrl?: string | null,
): string | null {
  const fromRecord = websiteUrl?.trim();
  if (fromRecord) return fromRecord;
  return PRODUCT_SITES[slug] ?? null;
}
