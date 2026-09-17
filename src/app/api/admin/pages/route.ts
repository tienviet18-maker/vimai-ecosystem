import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "pages");
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const pages = await db.prepare("SELECT * FROM cms_pages ORDER BY slug ASC").all();
  const translations = await db.prepare("SELECT * FROM cms_page_translations").all();
  return NextResponse.json({
    pages: pages.results ?? [],
    translations: translations.results ?? [],
  });
}

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "pages", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    slug?: string;
    published?: boolean;
    translations?: Record<string, { title?: string; body?: string; seo_title?: string; seo_description?: string }>;
  } | null;
  const slug = String(body?.slug ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  if (!slug) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const id = body?.id || newId();
  const timestamp = nowIso();
  const isUpdate = Boolean(body?.id);
  if (isUpdate) {
    await db
      .prepare("UPDATE cms_pages SET slug = ?, published = ?, updated_at = ? WHERE id = ?")
      .bind(slug, body?.published ? 1 : 0, timestamp, id)
      .run();
  } else {
    await db
      .prepare(
        "INSERT INTO cms_pages (id, slug, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      )
      .bind(id, slug, body?.published ? 1 : 0, timestamp, timestamp)
      .run();
  }
  for (const locale of ["vi", "en", "ja"] as const) {
    const draft = body?.translations?.[locale] ?? {};
    await db
      .prepare(
        `INSERT INTO cms_page_translations (id, page_id, locale, title, body, seo_title, seo_description)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(page_id, locale) DO UPDATE SET
           title=excluded.title, body=excluded.body, seo_title=excluded.seo_title, seo_description=excluded.seo_description`,
      )
      .bind(
        newId(),
        id,
        locale,
        draft.title ?? "",
        draft.body ?? "",
        draft.seo_title ?? "",
        draft.seo_description ?? "",
      )
      .run();
  }
  await writeAudit(isUpdate ? "page updated" : "page created", "cms_page", id, { slug }, auth.user.id);
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "pages", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await db.prepare("DELETE FROM cms_pages WHERE id = ?").bind(body.id).run();
  await writeAudit("page deleted", "cms_page", body.id, {}, auth.user.id);
  return NextResponse.json({ ok: true });
}
