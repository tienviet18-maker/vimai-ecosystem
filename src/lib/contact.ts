/** Canonical public contact. Do not duplicate these values in components. */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@vimai.jp";

export const CONTACT_SITE_URL = "https://vimai.jp/";

export const CONTACT_FACEBOOK_URL = "https://www.facebook.com/vimai.jp";

/** Official Zalo destination. Never render the phone number in the UI. */
export const CONTACT_ZALO_URL =
  process.env.NEXT_PUBLIC_ZALO_URL ?? "https://zalo.me/817026716597";

/**
 * Optional Messenger destination. Only use a verified URL from env.
 * If unset, Facebook messaging CTA opens the official Page instead.
 */
export const CONTACT_MESSENGER_URL = (
  process.env.NEXT_PUBLIC_MESSENGER_URL ?? ""
).trim();

export const CONTACT_FACEBOOK_MESSAGE_URL =
  CONTACT_MESSENGER_URL || CONTACT_FACEBOOK_URL;

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
