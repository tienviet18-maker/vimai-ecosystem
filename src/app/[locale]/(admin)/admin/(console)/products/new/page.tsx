import { setRequestLocale } from "next-intl/server";
import { ProductEditor } from "@/components/admin/ProductEditor";

export const runtime = "edge";

export default async function NewProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">New product</h1>
      <ProductEditor />
    </div>
  );
}
