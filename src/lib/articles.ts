import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";
import type { Locale, LocalizedArticle } from "@/types";

function isPublic(status: string, publishAt: string | null) {
  if (status !== "published") return false;
  if (!publishAt) return true;
  return new Date(publishAt).getTime() <= Date.now();
}

export async function getPublishedArticles(locale: Locale): Promise<LocalizedArticle[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select("*, article_translations(*)")
    .order("publish_at", { ascending: false, nullsFirst: false });

  if (error || !data) return [];

  return data
    .filter((row) => isPublic(row.status, row.publish_at))
    .map((row) => localize(row, locale))
    .filter(Boolean) as LocalizedArticle[];
}

export async function getArticleBySlug(slug: string, locale: Locale, options?: { preview?: boolean }) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("articles")
    .select("*, article_translations(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return null;
  if (!options?.preview && !isPublic(data.status, data.publish_at)) return null;
  return localize(data, locale);
}

export async function getAllArticles(): Promise<
  Array<{
    id: string;
    slug: string;
    status: string;
    article_translations?: Array<{
      locale: string;
      title: string;
      excerpt: string;
      content: string;
    }>;
  }>
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("articles")
    .select("*, article_translations(*)")
    .order("updated_at", { ascending: false });
  return (data ?? []) as Array<{ id: string; slug: string; status: string }>;
}

function localize(row: Record<string, unknown>, locale: Locale): LocalizedArticle | null {
  const translations = (row.article_translations as Array<Record<string, string>>) ?? [];
  const translation =
    translations.find((item) => item.locale === locale) ??
    translations.find((item) => item.locale === "ja") ??
    translations[0];
  if (!translation) return null;
  return {
    id: String(row.id),
    slug: String(row.slug),
    status: row.status as LocalizedArticle["status"],
    cover_image_url: (row.cover_image_url as string) ?? null,
    category: (row.category as string) ?? null,
    tags: (row.tags as string[]) ?? [],
    author_name: (row.author_name as string) ?? null,
    publish_at: (row.publish_at as string) ?? null,
    updated_at: (row.updated_at as string) ?? undefined,
    title: translation.title,
    excerpt: translation.excerpt ?? "",
    content: translation.content ?? "",
    seo_title: translation.seo_title,
    seo_description: translation.seo_description,
  };
}
