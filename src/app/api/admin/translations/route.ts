import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { getDb } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "translations");
  if ("response" in auth) return auth.response;
  const db = getDb();
  if (!db) return NextResponse.json({ error: "unconfigured" }, { status: 503 });

  const products = await db.prepare("SELECT id, slug FROM products ORDER BY sort_order").all<{ id: string; slug: string }>();
  const productTr = await db
    .prepare("SELECT product_id, locale, name FROM product_translations")
    .all<{ product_id: string; locale: string; name: string }>();
  const articles = await db.prepare("SELECT id, slug FROM articles ORDER BY created_at DESC").all<{ id: string; slug: string }>();
  const articleTr = await db
    .prepare("SELECT article_id, locale, title FROM article_translations")
    .all<{ article_id: string; locale: string; title: string }>();
  const faqs = await db.prepare("SELECT id FROM faqs ORDER BY sort_order").all<{ id: string }>();
  const faqTr = await db
    .prepare("SELECT faq_id, locale, question FROM faq_translations")
    .all<{ faq_id: string; locale: string; question: string }>();
  const pages = await db.prepare("SELECT id, slug FROM cms_pages ORDER BY slug").all<{ id: string; slug: string }>();
  const pageTr = await db
    .prepare("SELECT page_id, locale, title FROM cms_page_translations")
    .all<{ page_id: string; locale: string; title: string }>();

  function missing(
    ids: string[],
    rows: Array<{ locale: string; value?: string } & Record<string, string>>,
    idKey: string,
    valueKey: string,
  ) {
    return ids.map((id) => {
      const locales = ["vi", "en", "ja"].filter((locale) => {
        const row = rows.find((item) => item[idKey] === id && item.locale === locale);
        return !row || !String(row[valueKey] ?? "").trim();
      });
      return { id, missing: locales };
    }).filter((item) => item.missing.length > 0);
  }

  return NextResponse.json({
    products: missing(
      (products.results ?? []).map((item) => item.id),
      (productTr.results ?? []) as never,
      "product_id",
      "name",
    ).map((item) => ({
      ...item,
      slug: products.results?.find((row) => row.id === item.id)?.slug,
    })),
    articles: missing(
      (articles.results ?? []).map((item) => item.id),
      (articleTr.results ?? []) as never,
      "article_id",
      "title",
    ).map((item) => ({
      ...item,
      slug: articles.results?.find((row) => row.id === item.id)?.slug,
    })),
    faqs: missing(
      (faqs.results ?? []).map((item) => item.id),
      (faqTr.results ?? []) as never,
      "faq_id",
      "question",
    ),
    pages: missing(
      (pages.results ?? []).map((item) => item.id),
      (pageTr.results ?? []) as never,
      "page_id",
      "title",
    ).map((item) => ({
      ...item,
      slug: pages.results?.find((row) => row.id === item.id)?.slug,
    })),
  });
}
