import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { getLocalizedProducts } from "@/lib/products";
import { publicUrl } from "@/lib/utils";
import type { Locale } from "@/types";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("indexTitle"),
    description: t("indexLead"),
    alternates: { canonical: publicUrl(locale, "/products") },
  };
}

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
      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
