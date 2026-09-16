import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
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
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Edit product</h1>
      <ProductEditor product={product} />
    </div>
  );
}
