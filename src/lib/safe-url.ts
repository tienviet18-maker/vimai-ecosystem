/**
 * URL guards for admin-entered links that end up in public `href`s.
 * Writes accept only https:; rendering accepts http(s) so a legacy row can never become a
 * `javascript:` or `data:` link.
 */

/** Empty → null (clear the field). Valid https URL → normalised string. Anything else → "invalid". */
export function parseHttpsUrl(value: unknown): string | null | "invalid" {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return "invalid";
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" || !url.hostname || url.username || url.password) return "invalid";
    return url.toString();
  } catch {
    return "invalid";
  }
}

/** Return the URL only if it is an absolute http(s) URL; otherwise null (render nothing). */
export function safeHref(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}
