import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/cloudflare";
import { assertSameOrigin } from "@/lib/session";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const { user, configured } = await requireAdmin();
  const db = getDb();
  if (!configured || !user || !db) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    product_id?: string | null;
    sort_order?: number;
    published?: boolean;
    translations?: Record<"ja" | "vi" | "en", { question?: string; answer?: string }>;
  } | null;

  const id = newId();
  const timestamp = nowIso();
  await db
    .prepare(
      `INSERT INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      body?.product_id || null,
      Number(body?.sort_order || 0),
      body?.published ? 1 : 0,
      timestamp,
      timestamp,
    )
    .run();

  for (const locale of ["ja", "vi", "en"] as const) {
    const draft = body?.translations?.[locale] ?? {};
    await db
      .prepare(
        `INSERT INTO faq_translations (id, faq_id, locale, question, answer)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(newId(), id, locale, draft.question ?? "", draft.answer ?? "")
      .run();
  }

  await writeAudit("faq created", "faq", id);
  return NextResponse.json({ ok: true, id });
}
