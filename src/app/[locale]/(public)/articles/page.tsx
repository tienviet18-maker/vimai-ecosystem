import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { getPublishedArticles } from "@/lib/articles";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articles");
  const articles = await getPublishedArticles(locale as Locale);

  return (
    <section className="container py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-500">{t("lead")}</p>
      {articles.length === 0 ? (
        <p className="mt-12 text-slate-500">{t("empty")}</p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 no-underline transition-colors hover:border-navy-200"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                {article.category ?? t("title")}
              </p>
              <h2 className="mt-3 text-xl font-semibold">{article.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
