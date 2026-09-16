import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/shared/ProductCard";
import { getLocalizedProducts } from "@/lib/products";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const products = await getLocalizedProducts(locale as Locale);

  return (
    <section className="container py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("indexTitle")}</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-500">{t("indexLead")}</p>
      <div className="mt-12 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
