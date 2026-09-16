import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { getAllReviews } from "@/lib/reviews";
import { getAnalyticsSnapshot } from "@/lib/analytics";
import { getAuditLogs } from "@/lib/auth";
import { listMedia } from "@/lib/storage";

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
  const articles = await getAllArticles();
  const reviews = await getAllReviews();
  const analytics = await getAnalyticsSnapshot();
  const logs = await getAuditLogs(8);
  const media = await listMedia();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("dashboard")}</h1>
        <p className="text-sm text-muted-foreground">{t("overview")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title={t("products")} value={products.length} />
        <Stat title={t("mediaCount")} value={media.length} />
        <Stat
          title={t("published")}
          value={articles.filter((item) => item.status === "published").length}
        />
        <Stat
          title={t("draft")}
          value={articles.filter((item) => item.status === "draft").length}
        />
        <Stat
          title={t("scheduled")}
          value={articles.filter((item) => item.status === "scheduled").length}
        />
        <Stat
          title={t("reviews")}
          value={reviews.filter((item) => item.status === "pending").length}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("analytics")}</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics ? (
              <div className="space-y-2 text-sm">
                <p>Page views: {analytics.totals.pageViews ?? "—"}</p>
                <p>Approximate uniques: {analytics.totals.uniqueVisitors ?? "—"}</p>
                <p className="text-muted-foreground">{analytics.note}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t("analyticsUnavailable")}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("overview")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">{t("empty")}</p>
            ) : (
              logs.map((log) => (
                <p key={log.id}>
                  {log.action}
                  {log.entity ? ` · ${log.entity}` : ""}
                </p>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-semibold">{value}</CardContent>
    </Card>
  );
}
