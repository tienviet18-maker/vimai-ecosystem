import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/utils";

export const runtime = "edge";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const products = await getProducts({ publishedOnly: false });
  const published = products.filter((item) => item.published).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("dashboard")}</h1>
        <p className="text-sm text-muted-foreground">{t("overview")}</p>
      </div>
      {!isSupabaseConfigured() ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {t("needSetup")} Seed content is shown until Supabase is connected.
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Products
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{products.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("published")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{published}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("draft")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {products.length - published}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
