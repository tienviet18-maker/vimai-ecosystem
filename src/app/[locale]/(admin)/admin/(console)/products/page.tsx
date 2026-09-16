import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { getProducts } from "@/lib/products";
import { localizeProduct } from "@/lib/seed";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const products = await getProducts({ publishedOnly: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t("products")}</h1>
        <Button asChild>
          <Link href="/admin/products/new">{t("newProduct")}</Link>
        </Button>
      </div>
      <AdminTable
        columns={["Name", "Slug", "Status", "Published", ""]}
        empty={t("empty")}
        rows={products.map((product) => {
          const localized = localizeProduct(product, locale as Locale);
          return [
            localized.name,
            product.slug,
            product.status,
            product.published ? t("published") : t("draft"),
            <Link key={product.id} href={`/admin/products/${product.id}`} className="text-primary">
              Edit
            </Link>,
          ];
        })}
      />
    </div>
  );
}
