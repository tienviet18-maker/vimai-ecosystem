/** Validation helpers for the public feedback form (POST /api/feedback). */

export const FEEDBACK_LIMITS = {
  displayName: 80,
  body: 2000,
  country: 80,
} as const;

/** Rating is optional; when present it must be an integer 1–5. */
export function parseRating(value: unknown): { ok: true; rating: number | null } | { ok: false } {
  if (value === null || value === undefined || value === "") return { ok: true, rating: null };
  const text = typeof value === "number" ? String(value) : typeof value === "string" ? value.trim() : "";
  if (!/^[1-5]$/.test(text)) return { ok: false };
  return { ok: true, rating: Number(text) };
}

/**
 * Product ids are UUIDs (seed data uses 00000000-…-000000000001 style ids) or short slugs.
 * Anything else is rejected before it reaches the database.
 */
const PRODUCT_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/i;

export function parseProductId(value: unknown): { ok: true; productId: string | null } | { ok: false } {
  if (value === null || value === undefined || value === "") return { ok: true, productId: null };
  if (typeof value !== "string" || !PRODUCT_ID_PATTERN.test(value)) return { ok: false };
  return { ok: true, productId: value };
}
