import { getTranslations, setRequestLocale } from "next-intl/server";
import { requirePagePermission } from "@/lib/admin-guard";
import { getSiteSettings } from "@/lib/settings";
import { SITE_URL } from "@/lib/utils";
import { SeoForm } from "@/components/admin/SeoForm";

export const runtime = "edge";

export default async function SeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePagePermission("seo", locale);
  const t = await getTranslations("admin");
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("seo")}</h1>
      <div className="rounded-2xl border bg-white p-6 text-sm leading-7">
        <p>Sitemap: {SITE_URL}/sitemap.xml</p>
        <p>Robots: admin routes are disallowed.</p>
        <p>
          Product canonicals are per-product (https://tokutei-taxi.vimai.jp,
          https://tokutei-truck.vimai.jp, https://seibi.vimai.jp, https://kids.vimai.jp,
          https://maimai.vimai.jp) and never inherit the homepage canonical.
        </p>
      </div>
      <SeoForm
        seoTitle={settings.seo_title ?? ""}
        seoDescription={settings.seo_description ?? ""}
        seoCanonical={settings.seo_canonical ?? SITE_URL}
        ogTitle={settings.og_title ?? ""}
        ogDescription={settings.og_description ?? ""}
        ogImageUrl={settings.og_image_url ?? ""}
        robots={settings.robots ?? "index,follow"}
      />
    </div>
  );
}
