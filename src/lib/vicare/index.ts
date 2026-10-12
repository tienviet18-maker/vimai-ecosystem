/**
 * ViCare pages: paths and content lookup. Pure TypeScript (no `@/` imports)
 * so tests can load it with Node.
 *
 * Layout:
 *   /products/vicare            product page (static route, wins over [slug])
 *   /products/vicare/<guide>    SEO guides, one per topic, in vi / en / ja
 *   /products/vicare/privacy    privacy policy (App Store Connect URL)
 */
import { GUIDES_EN } from "./guides-en.ts";
import { GUIDES_JA } from "./guides-ja.ts";
import { GUIDES_VI } from "./guides-vi.ts";
import { VICARE_PAGE_COPY } from "./page-copy.ts";
import { VICARE_PRIVACY } from "./privacy.ts";
import type { VicareGuide, VicareLocale } from "./types.ts";

export type { VicareGuide, VicareLocale } from "./types.ts";

export const VICARE_SLUG = "vicare";
export const VICARE_PATH = "/products/vicare";
export const VICARE_PRIVACY_PATH = `${VICARE_PATH}/privacy`;
/** Original PNG (Open Graph) and the optimized WebP used on the page. */
export const VICARE_LOGO_PNG = "/images/products/vicare.png";
export const VICARE_LOGO = "/images/products/vicare.v2.webp";

const GUIDES: Record<VicareLocale, VicareGuide[]> = {
  vi: GUIDES_VI,
  en: GUIDES_EN,
  ja: GUIDES_JA,
};

export function toVicareLocale(locale: string): VicareLocale {
  return locale === "en" || locale === "ja" ? locale : "vi";
}

/** Guide slugs in display order (the Vietnamese list is the reference). */
export const VICARE_GUIDE_SLUGS: readonly string[] = GUIDES_VI.map((guide) => guide.slug);

export function vicareGuidePath(slug: string): string {
  return `${VICARE_PATH}/${slug}`;
}

export function getVicareGuides(locale: string): VicareGuide[] {
  return GUIDES[toVicareLocale(locale)];
}

export function getVicareGuide(locale: string, slug: string): VicareGuide | null {
  return getVicareGuides(locale).find((guide) => guide.slug === slug) ?? null;
}

export function getVicarePageCopy(locale: string) {
  return VICARE_PAGE_COPY[toVicareLocale(locale)];
}

export function getVicarePrivacy(locale: string) {
  return VICARE_PRIVACY[toVicareLocale(locale)];
}

/** Every ViCare path, for the sitemap. Each one exists in all three locales. */
export const VICARE_SITEMAP_PATHS: readonly string[] = [
  VICARE_PATH,
  ...VICARE_GUIDE_SLUGS.map(vicareGuidePath),
  VICARE_PRIVACY_PATH,
];
