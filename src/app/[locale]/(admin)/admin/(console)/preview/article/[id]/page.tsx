import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/articles";

export const runtime = "edge";

export default async function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const articles = await getAllArticles();
  const row = articles.find((item) => item.id === id);
  if (!row) notFound();
  const translations = row.article_translations as Array<{
    locale: string;
    title: string;
    excerpt: string;
    content: string;
  }>;
  const translation =
    translations?.find((item) => item.locale === locale) ?? translations?.[0];

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <p className="text-xs uppercase tracking-widest text-amber-700">Preview · not indexed</p>
      <h1 className="text-3xl font-semibold">{translation?.title ?? row.slug}</h1>
      <p className="text-slate-500">{translation?.excerpt}</p>
      <div className="whitespace-pre-wrap leading-8">{translation?.content}</div>
    </article>
  );
}
