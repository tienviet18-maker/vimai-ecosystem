import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { AdminTable } from "@/components/admin/AdminTable";
import { getAllArticles } from "@/lib/articles";
import { Link } from "@/lib/i18n/navigation";
import { RecordDelete } from "@/components/admin/RecordDelete";

export const runtime = "edge";

export default async function AdminArticlesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const articles = await getAllArticles();
  const editing = articles.find((item) => item.id === query.edit);

  const editorArticle = editing
    ? {
        id: editing.id,
        slug: editing.slug,
        status: editing.status,
        cover_image_url: editing.cover_image_url,
        og_image_url: (editing as { og_image_url?: string | null }).og_image_url ?? null,
        category: editing.category,
        tags: tagsToString(editing.tags),
        author_name: editing.author_name,
        publish_at: editing.publish_at,
        translations: {
          vi: fromLocale(editing.article_translations, "vi"),
          en: fromLocale(editing.article_translations, "en"),
          ja: fromLocale(editing.article_translations, "ja"),
        },
      }
    : undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("articles")}</h1>
      <ArticleEditor article={editorArticle} />
      <AdminTable
        columns={["Slug", t("status"), ""]}
        empty={t("empty")}
        rows={articles.map((article) => [
          article.slug,
          article.status,
          <span key={article.id} className="flex flex-wrap gap-3">
            <Link href={`/admin/articles?edit=${article.id}`} className="min-h-11 text-primary">
              {t("edit")}
            </Link>
            <Link href={`/admin/preview/article/${article.id}`} className="min-h-11 text-primary">
              {t("preview")}
            </Link>
            <RecordDelete endpoint="/api/admin/articles" id={article.id} />
          </span>,
        ])}
      />
    </div>
  );
}

function tagsToString(tags: unknown) {
  if (Array.isArray(tags)) return tags.join(", ");
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags) as unknown;
      if (Array.isArray(parsed)) return parsed.join(", ");
    } catch {
      /* raw string */
    }
    return tags;
  }
  return "";
}

function fromLocale(
  translations: Array<{
    locale: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
  }>,
  locale: "vi" | "en" | "ja",
) {
  const row = translations.find((item) => item.locale === locale);
  return {
    title: row?.title ?? "",
    excerpt: row?.excerpt ?? "",
    content: row?.content ?? "",
    seo_title: row?.seo_title ?? "",
    seo_description: row?.seo_description ?? "",
  };
}
