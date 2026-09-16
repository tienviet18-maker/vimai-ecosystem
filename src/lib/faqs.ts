import { seedFaqs } from "@/lib/seed";
import { asBool, getDb } from "@/lib/cloudflare";
import type { Faq, Locale } from "@/types";

type FaqRow = {
  id: string;
  product_id: string | null;
  sort_order: number;
  published: number;
};

type TranslationRow = {
  faq_id: string;
  locale: Locale;
  question: string;
  answer: string;
};

async function fetchFromD1(locale: Locale, productId?: string | null): Promise<Faq[] | null> {
  const db = getDb();
  if (!db) return null;

  const faqs = await db
    .prepare(
      `SELECT * FROM faqs WHERE published = 1
       ${productId ? "AND product_id = ?" : "AND product_id IS NULL"}
       ORDER BY sort_order ASC`,
    )
    .bind(...(productId ? [productId] : []))
    .all<FaqRow>();

  if (!faqs.results?.length) return [];

  const translations = await db.prepare("SELECT * FROM faq_translations").all<TranslationRow>();

  return faqs.results
    .map((row) => {
      const list = (translations.results ?? []).filter((item) => item.faq_id === row.id);
      const translation =
        list.find((item) => item.locale === locale) ?? list.find((item) => item.locale === "vi");
      if (!translation) return null;
      return {
        id: row.id,
        product_id: row.product_id,
        sort_order: row.sort_order,
        published: asBool(row.published),
        question: translation.question,
        answer: translation.answer,
      } satisfies Faq;
    })
    .filter(Boolean) as Faq[];
}

export async function getFaqs(locale: Locale, productId?: string | null) {
  try {
    const remote = await fetchFromD1(locale, productId);
    if (remote && remote.length > 0) return remote;
  } catch {
    /* fall back to seed FAQs */
  }

  return seedFaqs
    .filter((item) => item.published)
    .filter((item) =>
      productId ? item.product_id === productId : item.product_id === null,
    )
    .map((item) => ({
      id: item.id,
      product_id: item.product_id,
      sort_order: item.sort_order,
      published: item.published,
      question: item.translations[locale]?.question ?? item.translations.vi.question,
      answer: item.translations[locale]?.answer ?? item.translations.vi.answer,
    }));
}

export async function getSupportFaqs(locale: Locale) {
  const general = await getFaqs(locale, null);
  if (general.length > 0) return general;

  return seedFaqs
    .filter((item) => item.published)
    .map((item) => ({
      id: item.id,
      product_id: item.product_id,
      sort_order: item.sort_order,
      published: item.published,
      question: item.translations[locale]?.question ?? item.translations.vi.question,
      answer: item.translations[locale]?.answer ?? item.translations.vi.answer,
    }));
}
