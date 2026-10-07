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
};

export function usesAppStoreOnly(slug: string, locale: string): boolean {
  return locale !== "vi" && Object.prototype.hasOwnProperty.call(APP_STORE_URLS, slug);
}

export function appStoreUrl(slug: string): string | null {
  return APP_STORE_URLS[slug] ?? null;
}

const WEB_PAYMENT_WORDING = /VND|ドン|₫|VietQR|vimai\.jp/i;

/** Drops feature lines that quote VND prices or the VietQR web payment. */
export function stripWebPaymentFeatures(features: string[]): string[] {
  return features.filter((line) => !WEB_PAYMENT_WORDING.test(line));
}
