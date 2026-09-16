import { asBool, getDb, newId, nowIso } from "@/lib/cloudflare";
import type { Locale, Review } from "@/types";

function mapReview(row: Record<string, unknown>): Review {
  return {
    id: String(row.id),
    product_id: (row.product_id as string) ?? null,
    display_name: String(row.display_name),
    avatar_url: (row.avatar_url as string) ?? null,
    rating: row.rating == null ? null : Number(row.rating),
    body: String(row.body),
    locale: (row.locale as Locale) ?? null,
    country: (row.country as string) ?? null,
    consent: asBool(row.consent),
    status: row.status as Review["status"],
    featured: asBool(row.featured),
    created_at: String(row.created_at),
  };
}

export async function getApprovedReviews(locale?: Locale, productId?: string | null) {
  const db = getDb();
  if (!db) return [] as Review[];

  let sql = `SELECT * FROM reviews WHERE status = 'approved'`;
  const binds: unknown[] = [];
  if (productId) {
    sql += ` AND product_id = ?`;
    binds.push(productId);
  }
  if (locale) {
    sql += ` AND (locale = ? OR locale IS NULL)`;
    binds.push(locale);
  }
  sql += ` ORDER BY featured DESC, created_at DESC`;

  const { results } = await db
    .prepare(sql)
    .bind(...binds)
    .all();
  return (results ?? []).map(mapReview);
}

export async function getAllReviews() {
  const db = getDb();
  if (!db) return [] as Review[];
  const { results } = await db
    .prepare("SELECT * FROM reviews ORDER BY created_at DESC")
    .all();
  return (results ?? []).map(mapReview);
}

export async function insertReview(input: {
  display_name: string;
  body: string;
  product_id?: string | null;
  rating?: number | null;
  locale?: Locale | null;
  country?: string | null;
}) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const timestamp = nowIso();
  await db
    .prepare(
      `INSERT INTO reviews (
        id, product_id, display_name, rating, body, locale, country, consent, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'pending', ?, ?)`,
    )
    .bind(
      newId(),
      input.product_id ?? null,
      input.display_name,
      input.rating ?? null,
      input.body,
      input.locale ?? null,
      input.country ?? null,
      timestamp,
      timestamp,
    )
    .run();
  return { error: null };
}

export async function updateReview(input: {
  id: string;
  status?: Review["status"];
  featured?: boolean;
  body?: string;
  moderated_by?: string;
}) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const current = await db.prepare("SELECT * FROM reviews WHERE id = ?").bind(input.id).first();
  if (!current) return { error: "not_found" as const };
  const timestamp = nowIso();
  await db
    .prepare(
      `UPDATE reviews SET
        status = ?,
        featured = ?,
        body = ?,
        moderated_at = ?,
        moderated_by = ?,
        updated_at = ?
       WHERE id = ?`,
    )
    .bind(
      input.status ?? current.status,
      typeof input.featured === "boolean" ? (input.featured ? 1 : 0) : current.featured,
      input.body ?? current.body,
      timestamp,
      input.moderated_by ?? null,
      timestamp,
      input.id,
    )
    .run();
  return { error: null };
}
