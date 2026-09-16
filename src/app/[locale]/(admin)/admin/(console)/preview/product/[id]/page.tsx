import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { localizeProduct } from "@/lib/seed";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function ProductPreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  const localized = localizeProduct(product, locale as Locale);

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <p className="text-xs uppercase tracking-widest text-amber-700">Preview · not indexed</p>
      <h1 className="text-3xl font-semibold">{localized.name}</h1>
      <p className="text-slate-500">{localized.tagline}</p>
      <p className="leading-8">{localized.description}</p>
    </article>
  );
}
