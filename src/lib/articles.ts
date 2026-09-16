import { getDb, parseJson } from "@/lib/cloudflare";
import type { Locale, LocalizedArticle } from "@/types";

function isPublic(status: string, publishAt: string | null) {
  if (status !== "published") return false;
  if (!publishAt) return true;
  return new Date(publishAt).getTime() <= Date.now();
}

type ArticleRow = {
  id: string;
  slug: string;
  status: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string | null;
  author_name: string | null;
  publish_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type TranslationRow = {
  article_id: string;
  locale: Locale;
  title: string;
  excerpt: string | null;
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

function localize(
  row: ArticleRow,
  translations: TranslationRow[],
  locale: Locale,
): LocalizedArticle | null {
  const translation =
    translations.find((item) => item.locale === locale) ??
    translations.find((item) => item.locale === "vi") ??
    translations[0];
  if (!translation) return null;
  return {
    id: row.id,
    slug: row.slug,
    status: row.status as LocalizedArticle["status"],
    cover_image_url: row.cover_image_url,
    category: row.category,
    tags: parseJson<string[]>(row.tags, []),
    author_name: row.author_name,
    publish_at: row.publish_at,
    updated_at: row.updated_at,
    title: translation.title,
    excerpt: translation.excerpt ?? "",
    content: translation.content ?? "",
    seo_title: translation.seo_title ?? undefined,
    seo_description: translation.seo_description ?? undefined,
  };
}

async function loadArticles() {
  const db = getDb();
  if (!db) return { rows: [] as ArticleRow[], translations: [] as TranslationRow[] };
  const rows = await db
    .prepare("SELECT * FROM articles ORDER BY updated_at DESC")
    .all<ArticleRow>();
  const translations = await db.prepare("SELECT * FROM article_translations").all<TranslationRow>();
  return { rows: rows.results ?? [], translations: translations.results ?? [] };
}

export async function getPublishedArticles(locale: Locale): Promise<LocalizedArticle[]> {
  try {
    const { rows, translations } = await loadArticles();
    return rows
      .filter((row) => isPublic(row.status, row.publish_at))
      .map((row) =>
        localize(
          row,
          translations.filter((item) => item.article_id === row.id),
          locale,
        ),
      )
      .filter(Boolean) as LocalizedArticle[];
  } catch {
    return [];
  }
}

export async function getArticleBySlug(
  slug: string,
  locale: Locale,
  options?: { preview?: boolean },
) {
  try {
    const { rows, translations } = await loadArticles();
    const row = rows.find((item) => item.slug === slug);
    if (!row) return null;
    if (!options?.preview && !isPublic(row.status, row.publish_at)) return null;
    return localize(
      row,
      translations.filter((item) => item.article_id === row.id),
      locale,
    );
  } catch {
    return null;
  }
}

export async function getAllArticles(): Promise<
  Array<ArticleRow & { article_translations: TranslationRow[] }>
> {
  try {
    const { rows, translations } = await loadArticles();
    return rows.map((row) => ({
      ...row,
      article_translations: translations.filter((item) => item.article_id === row.id),
    }));
  } catch {
    return [];
  }
}
