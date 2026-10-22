/**
 * Payment/channel rule for the public site.
 *
 * Vietnamese readers pay in VND by bank transfer on the product website.
 * English and Japanese readers never pay on the web: they install the app from
 * the App Store and buy VIP with Apple payment, where Apple shows the price.
 * So for these products, on EN/JA pages we drop VND/VietQR wording and replace
 * the "open product site" button with an App Store button.
 *
 * Display only. Real prices and the Vietnamese payment flow do not change.
 */

/** App Store links. `null` = not published yet (button shows "Coming soon"). */
export const APP_STORE_URLS: Record<string, string | null> = {
  "tokutei-taxi": "https://apps.apple.com/app/id6819012544",
  // TODO(owner): set the real link once Apple approves the app (submitted 2026-10-07).
  "tokutei-transport": null,
  // TODO(owner): set the real link once the ViMai Menkyo app is on the App Store.
  menkyo: null,
};

export function usesAppStoreOnly(slug: string, locale: string): boolean {
  return locale !== "vi" && Object.prototype.hasOwnProperty.call(APP_STORE_URLS, slug);
}

export function appStoreUrl(slug: string): string | null {
  return APP_STORE_URLS[slug] ?? null;
}

/**
 * Language landing pages each product site really serves (`/en/`, `/ja/`).
 * A product that is missing here, or a locale it does not list, links to the
 * site root instead. Never list a page the site does not have.
 */
export const PRODUCT_SITE_LOCALES: Record<string, readonly string[]> = {
  "tokutei-taxi": ["vi", "en", "ja"],
  "tokutei-transport": ["vi", "en", "ja"],
  menkyo: ["vi", "en"],
  "gino1-seibi": ["vi", "en", "ja"],
  "tokutei-kaigo": ["vi", "en", "ja"],
  seibi: ["vi", "en", "ja"],
};

/**
 * Free mock exams a product lets anyone try on the web, when the number is the
 * same as in the app's own access policy. Products not listed get a label
 * without a number.
 */
export const FREE_WEB_EXAMS: Record<string, number> = {
  "tokutei-taxi": 3,
  "tokutei-transport": 3,
};

/**
 * Link for "try the free mock exams on the web" on EN/JA pages of an App
 * Store-only product whose App Store listing is not live yet. The link only
 * opens the free exams on the product site: it never mentions price, payment
 * or VIP, and buying stays inside the iOS app (Apple payment).
 * Returns null on VI (the page already opens the product site), once the App
 * Store link exists, or when the product has no website.
 */
export function webTrialUrl(
  slug: string,
  locale: string,
  websiteUrl: string | null | undefined,
): string | null {
  if (!usesAppStoreOnly(slug, locale) || appStoreUrl(slug) || !websiteUrl) return null;
  let url: URL;
  try {
    url = new URL(websiteUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const hasLocalePage = PRODUCT_SITE_LOCALES[slug]?.includes(locale) ?? false;
  return `${url.origin}/${hasLocalePage ? `${locale}/` : ""}`;
}

/** Number of free web exams for the button label, or null when not known. */
export function freeWebExamCount(slug: string): number | null {
  return FREE_WEB_EXAMS[slug] ?? null;
}

const WEB_PAYMENT_WORDING = /VND|ドン|₫|VietQR|vimai\.jp/i;

/** Drops feature lines that quote VND prices or the VietQR web payment. */
export function stripWebPaymentFeatures(features: string[]): string[] {
  return features.filter((line) => !WEB_PAYMENT_WORDING.test(line));
}
