import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/articles";
import { SITE_URL } from "@/lib/utils";
import type { Locale } from "@/types";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale as Locale);
  if (!article) return {};
  const path = locale === "ja" ? `/articles/${slug}` : `/${locale}/articles/${slug}`;
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt,
      images: article.cover_image_url ? [article.cover_image_url] : ["/brand/og/og-default.jpg"],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articles");
  const article = await getArticleBySlug(slug, locale as Locale);
  if (!article) notFound();

  return (
    <article className="container max-w-3xl py-16 lg:py-24">
      <p className="text-sm text-slate-400">{article.author_name}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
      <p className="mt-6 text-lg leading-8 text-slate-500">{article.excerpt}</p>
      {article.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="mt-10 w-full rounded-2xl object-cover"
        />
      ) : null}
      <div className="mt-10 whitespace-pre-wrap leading-8 text-slate-700">{article.content}</div>
      <p className="sr-only">{t("title")}</p>
    </article>
  );
}
