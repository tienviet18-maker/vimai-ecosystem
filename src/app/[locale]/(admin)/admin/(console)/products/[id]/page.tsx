import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { getProductById } from "@/lib/products";

export const runtime = "edge";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t("editProduct")}</h1>
        <Link
          href={`/products/${product.slug}`}
          target="_blank"
          className="inline-flex min-h-11 items-center text-sm text-primary"
        >
          {t("viewPublic")}
        </Link>
      </div>
      <ProductEditor product={product} />
    </div>
  );
}
