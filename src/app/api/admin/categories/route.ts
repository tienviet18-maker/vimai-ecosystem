import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "categories");
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const categories = await db.prepare("SELECT * FROM categories ORDER BY sort_order ASC").all();
  const translations = await db.prepare("SELECT * FROM category_translations").all();
  return NextResponse.json({
    categories: categories.results ?? [],
    translations: translations.results ?? [],
  });
}

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "categories", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    slug?: string;
    sort_order?: number;
    translations?: Record<string, { name?: string }>;
  } | null;
  const slug = String(body?.slug ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!slug) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const id = body?.id || newId();
  const timestamp = nowIso();
  if (body?.id) {
    await db
      .prepare("UPDATE categories SET slug = ?, sort_order = ?, updated_at = ? WHERE id = ?")
      .bind(slug, Number(body.sort_order || 0), timestamp, id)
      .run();
  } else {
    await db
      .prepare(
        "INSERT INTO categories (id, slug, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      )
      .bind(id, slug, Number(body?.sort_order || 0), timestamp, timestamp)
      .run();
  }
  for (const locale of ["vi", "en", "ja"] as const) {
    const name = body?.translations?.[locale]?.name ?? slug;
    await db
      .prepare(
        `INSERT INTO category_translations (id, category_id, locale, name)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(category_id, locale) DO UPDATE SET name=excluded.name`,
      )
      .bind(newId(), id, locale, name)
      .run();
  }
  await writeAudit(body?.id ? "category updated" : "category created", "category", id, { slug }, auth.user.id);
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "categories", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await db.prepare("DELETE FROM categories WHERE id = ?").bind(body.id).run();
  await writeAudit("category deleted", "category", body.id, {}, auth.user.id);
  return NextResponse.json({ ok: true });
}
