import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { AdminTable } from "@/components/admin/AdminTable";
import { getAllArticles } from "@/lib/articles";
import { Link } from "@/lib/i18n/navigation";

export const runtime = "edge";

export default async function AdminArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const articles = await getAllArticles();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("articles")}</h1>
      <ArticleEditor />
      <AdminTable
        columns={["Slug", "Status", "Preview"]}
        empty={t("empty")}
        rows={articles.map((article) => [
          article.slug,
          article.status,
          <Link
            key={article.id}
            href={`/admin/preview/article/${article.id}`}
            className="text-primary"
          >
            Preview
          </Link>,
        ])}
      />
    </div>
  );
}
