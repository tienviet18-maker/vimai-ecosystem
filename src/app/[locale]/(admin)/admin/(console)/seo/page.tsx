import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_URL } from "@/lib/utils";

export const runtime = "edge";

export default async function SeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("seo")}</h1>
      <div className="rounded-2xl border bg-white p-6 text-sm leading-7">
        <p>Canonical: {SITE_URL}</p>
        <p>Sitemap: {SITE_URL}/sitemap.xml</p>
        <p>Robots: admin routes are disallowed.</p>
        <p>Product and article SEO title/description are edited on each record.</p>
        <p>Do not set localhost, pages.dev, or preview URLs as canonical.</p>
      </div>
    </div>
  );
}
