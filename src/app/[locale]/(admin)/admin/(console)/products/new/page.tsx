import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductEditor } from "@/components/admin/ProductEditor";

export const runtime = "edge";

export default async function NewProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">{t("newProduct")}</h1>
      <ProductEditor />
    </div>
  );
}
