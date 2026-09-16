import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAnalyticsSnapshot } from "@/lib/analytics";

export const runtime = "edge";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const analytics = await getAnalyticsSnapshot();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("analytics")}</h1>
      {analytics ? (
        <div className="rounded-2xl border bg-white p-6">
          <p>Range: {analytics.range}</p>
          <p className="mt-2">Page views: {analytics.totals.pageViews ?? "—"}</p>
          <p>Approximate uniques: {analytics.totals.uniqueVisitors ?? "—"}</p>
          <p className="mt-4 text-sm text-slate-500">{analytics.note}</p>
        </div>
      ) : (
        <p className="max-w-xl text-sm leading-7 text-slate-600">
          Analytics are not fabricated. Add Cloudflare Web Analytics
          (`NEXT_PUBLIC_CF_BEACON_TOKEN`) for public measurement, and
          `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ZONE_ID` to display zone totals here.
        </p>
      )}
    </div>
  );
}
