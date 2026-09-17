import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";
import { productStatuses, type ProductStatus } from "@/types";

export const runtime = "edge";

type TranslationInput = {
  name?: string;
  tagline?: string;
  description?: string;
  long_description?: string;
  features?: string[];
};

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "products", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    slug?: string;
    status?: ProductStatus;
    category?: string | null;
    app_store_url?: string | null;
    google_play_url?: string | null;
    website_url?: string | null;
    featured?: boolean;
    sort_order?: number;
    logo_url?: string | null;
    icon_url?: string | null;
    hero_image_url?: string | null;
    og_image_url?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    target_audience?: string | null;
    published?: boolean;
    translations?: Record<"ja" | "vi" | "en", TranslationInput>;
    screenshots?: string[];
  } | null;

  if (!body?.slug) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (body.status && !productStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const id = body.id || newId();
  const isUpdate = Boolean(body.id);
  const timestamp = nowIso();

  if (isUpdate) {
    await db
      .prepare(
        `UPDATE products SET
          slug=?, status=?, category=?, app_store_url=?, google_play_url=?, website_url=?,
          featured=?, sort_order=?, logo_url=?, icon_url=?, hero_image_url=?, og_image_url=?,
          seo_title=?, seo_description=?, target_audience=?, published=?, updated_at=?
         WHERE id=?`,
      )
      .bind(
        body.slug,
        body.status ?? "development",
        body.category ?? null,
        body.app_store_url ?? null,
        body.google_play_url ?? null,
        body.website_url ?? null,
        body.featured ? 1 : 0,
        Number(body.sort_order || 0),
        body.logo_url ?? null,
        body.icon_url ?? null,
        body.hero_image_url ?? null,
        body.og_image_url ?? null,
        body.seo_title ?? null,
        body.seo_description ?? null,
        body.target_audience ?? null,
        body.published ? 1 : 0,
        timestamp,
        id,
      )
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO products (
          id, slug, status, category, app_store_url, google_play_url, website_url,
          featured, sort_order, logo_url, icon_url, hero_image_url, og_image_url,
          seo_title, seo_description, target_audience, published, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        id,
        body.slug,
        body.status ?? "development",
        body.category ?? null,
        body.app_store_url ?? null,
        body.google_play_url ?? null,
        body.website_url ?? null,
        body.featured ? 1 : 0,
        Number(body.sort_order || 0),
        body.logo_url ?? null,
        body.icon_url ?? null,
        body.hero_image_url ?? null,
        body.og_image_url ?? null,
        body.seo_title ?? null,
        body.seo_description ?? null,
        body.target_audience ?? null,
        body.published ? 1 : 0,
        timestamp,
        timestamp,
      )
      .run();
  }

  for (const locale of ["ja", "vi", "en"] as const) {
    const draft = body.translations?.[locale] ?? {};
    const translationId = newId();
    await db
      .prepare(
        `INSERT INTO product_translations (
          id, product_id, locale, name, tagline, description, long_description, features
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(product_id, locale) DO UPDATE SET
          name=excluded.name,
          tagline=excluded.tagline,
          description=excluded.description,
          long_description=excluded.long_description,
          features=excluded.features`,
      )
      .bind(
        translationId,
        id,
        locale,
        draft.name ?? "",
        draft.tagline ?? "",
        draft.description ?? "",
        draft.long_description ?? "",
        JSON.stringify(draft.features ?? []),
      )
      .run();
  }

  await db.prepare("DELETE FROM product_images WHERE product_id = ?").bind(id).run();
  for (const [index, url] of (body.screenshots ?? []).entries()) {
    await db
      .prepare(
        `INSERT INTO product_images (id, product_id, url, kind, sort_order, created_at)
         VALUES (?, ?, ?, 'screenshot', ?, ?)`,
      )
      .bind(newId(), id, url, index, timestamp)
      .run();
  }

  await writeAudit(
    isUpdate ? "product updated" : "product created",
    "product",
    id,
    { status: body.status },
  );

  return NextResponse.json({ ok: true, id });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "products", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await db.prepare("DELETE FROM products WHERE id = ?").bind(body.id).run();
  await writeAudit("product deleted", "product", body.id);
  return NextResponse.json({ ok: true });
}
