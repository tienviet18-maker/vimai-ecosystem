import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "faqs");
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const faqs = await db.prepare("SELECT * FROM faqs ORDER BY sort_order ASC").all();
  const translations = await db.prepare("SELECT * FROM faq_translations").all();
  return NextResponse.json({ faqs: faqs.results ?? [], translations: translations.results ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "faqs", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    product_id?: string | null;
    category?: string | null;
    sort_order?: number;
    published?: boolean;
    translations?: Record<"ja" | "vi" | "en", { question?: string; answer?: string }>;
  } | null;

  const timestamp = nowIso();
  const id = body?.id || newId();
  const isUpdate = Boolean(body?.id);

  if (isUpdate) {
    await db
      .prepare(
        `UPDATE faqs SET product_id=?, category=?, sort_order=?, published=?, updated_at=? WHERE id=?`,
      )
      .bind(
        body?.product_id || null,
        body?.category || null,
        Number(body?.sort_order || 0),
        body?.published ? 1 : 0,
        timestamp,
        id,
      )
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO faqs (id, product_id, category, sort_order, published, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        id,
        body?.product_id || null,
        body?.category || null,
        Number(body?.sort_order || 0),
        body?.published ? 1 : 0,
        timestamp,
        timestamp,
      )
      .run();
  }

  for (const locale of ["ja", "vi", "en"] as const) {
    const draft = body?.translations?.[locale] ?? {};
    await db
      .prepare(
        `INSERT INTO faq_translations (id, faq_id, locale, question, answer)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(faq_id, locale) DO UPDATE SET question=excluded.question, answer=excluded.answer`,
      )
      .bind(newId(), id, locale, draft.question ?? "", draft.answer ?? "")
      .run();
  }

  await writeAudit(isUpdate ? "faq updated" : "faq created", "faq", id, {}, auth.user.id);
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "faqs", { mutate: true });
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await db.prepare("DELETE FROM faqs WHERE id = ?").bind(body.id).run();
  await writeAudit("faq deleted", "faq", body.id, {}, auth.user.id);
  return NextResponse.json({ ok: true });
}
