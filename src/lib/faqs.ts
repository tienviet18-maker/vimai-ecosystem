import { createClient } from "@/lib/supabase/server";
import { seedFaqs } from "@/lib/seed";
import { isSupabaseConfigured } from "@/lib/utils";
import type { Faq, Locale } from "@/types";

export async function getFaqs(locale: Locale, productId?: string | null) {
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      if (supabase) {
        let query = supabase
          .from("faqs")
          .select("*, faq_translations(*)")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (productId) {
          query = query.eq("product_id", productId);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data
            .map((row) => {
              const translation =
                row.faq_translations?.find(
                  (item: { locale: string }) => item.locale === locale,
                ) ??
                row.faq_translations?.find(
                  (item: { locale: string }) => item.locale === "ja",
                );
              if (!translation) return null;
              return {
                id: row.id,
                product_id: row.product_id,
                sort_order: row.sort_order,
                published: row.published,
                question: translation.question,
                answer: translation.answer,
              } satisfies Faq;
            })
            .filter(Boolean) as Faq[];
        }
      }
    }
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
      question: item.translations[locale]?.question ?? item.translations.ja.question,
      answer: item.translations[locale]?.answer ?? item.translations.ja.answer,
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
      question: item.translations[locale]?.question ?? item.translations.ja.question,
      answer: item.translations[locale]?.answer ?? item.translations.ja.answer,
    }));
}
