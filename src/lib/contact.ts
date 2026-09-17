/** Canonical public contact. Do not duplicate these values in components. */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "vimai.support@gmail.com";

/** Official Zalo destination. Never render the phone number in the UI. */
export const CONTACT_ZALO_URL =
  process.env.NEXT_PUBLIC_ZALO_URL ?? "https://zalo.me/817026716597";

/**
 * Optional Messenger destination.
 * REQUIRED_CONFIGURATION: Insert Messenger VietOsaka URL here
 * (or set NEXT_PUBLIC_MESSENGER_URL). Do not invent a URL.
 */
export const CONTACT_MESSENGER_URL = (
  process.env.NEXT_PUBLIC_MESSENGER_URL ?? ""
).trim();

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
