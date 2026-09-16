import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";
import { assertSameOrigin } from "@/lib/session";
import { locales } from "@/types";

export const runtime = "edge";

const ARTICLE_STATUSES = ["draft", "scheduled", "published", "archived"] as const;

type TranslationInput = {
  title?: string;
  excerpt?: string;
  content?: string;
  seo_title?: string;
  seo_description?: string;
};

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const { user, configured } = await requireAdmin();
  const db = getDb();
  if (!configured || !user || !db) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    slug?: string;
    status?: string;
    cover_image_url?: string | null;
    og_image_url?: string | null;
    category?: string | null;
    tags?: string[];
    author_name?: string | null;
    publish_at?: string | null;
    locale?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    seo_title?: string;
    seo_description?: string;
    translations?: Record<"vi" | "en" | "ja", TranslationInput>;
  } | null;

  if (!body?.slug) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const status = ARTICLE_STATUSES.includes(body.status as (typeof ARTICLE_STATUSES)[number])
    ? body.status!
    : "draft";
  const slug = body.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
  if (!slug) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const id = body.id || newId();
  const isUpdate = Boolean(body.id);
  const timestamp = nowIso();
  const publishedAt = status === "published" ? timestamp : null;

  if (isUpdate) {
    await db
      .prepare(
        `UPDATE articles SET
          slug=?, status=?, cover_image_url=?, og_image_url=?, category=?, tags=?, author_name=?,
          publish_at=?, published_at=?, updated_at=?
         WHERE id=?`,
      )
      .bind(
        slug,
        status,
        body.cover_image_url || null,
        body.og_image_url || null,
        body.category || null,
        JSON.stringify(body.tags ?? []),
        body.author_name || null,
        body.publish_at || null,
        publishedAt,
        timestamp,
        id,
      )
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO articles (
          id, slug, status, cover_image_url, og_image_url, category, tags, author_name,
          publish_at, published_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        id,
        slug,
        status,
        body.cover_image_url || null,
        body.og_image_url || null,
        body.category || null,
        JSON.stringify(body.tags ?? []),
        body.author_name || null,
        body.publish_at || null,
        publishedAt,
        timestamp,
        timestamp,
      )
      .run();
  }

  const translationMap: Record<"vi" | "en" | "ja", TranslationInput> = {
    vi: body.translations?.vi ?? {},
    en: body.translations?.en ?? {},
    ja: body.translations?.ja ?? {},
  };
  if (body.title) {
    const locale = locales.includes(body.locale as (typeof locales)[number])
      ? (body.locale as "vi" | "en" | "ja")
      : "vi";
    translationMap[locale] = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
    };
  }

  for (const locale of ["vi", "en", "ja"] as const) {
    const draft = translationMap[locale];
    if (!draft.title && !isUpdate) continue;
    if (!draft.title && isUpdate) continue;
    await db
      .prepare(
        `INSERT INTO article_translations (
          id, article_id, locale, title, excerpt, content, seo_title, seo_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(article_id, locale) DO UPDATE SET
          title=excluded.title,
          excerpt=excluded.excerpt,
          content=excluded.content,
          seo_title=excluded.seo_title,
          seo_description=excluded.seo_description`,
      )
      .bind(
        newId(),
        id,
        locale,
        draft.title ?? "",
        draft.excerpt ?? "",
        draft.content ?? "",
        draft.seo_title ?? "",
        draft.seo_description ?? "",
      )
      .run();
  }

  await writeAudit(
    status === "published"
      ? "article published"
      : status === "archived"
        ? "article archived"
        : isUpdate
          ? "article updated"
          : "article created",
    "article",
    id,
    { status },
  );
  return NextResponse.json({ ok: true, id });
}
