import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminCounts } from "@/lib/admin-counts";
import { getAuditLogs } from "@/lib/auth";
import { getAnalyticsSnapshot } from "@/lib/analytics";
import { PasswordForm } from "@/components/admin/PasswordForm";

export const runtime = "edge";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const counts = await getAdminCounts();
  const analytics = await getAnalyticsSnapshot();
  const logs = await getAuditLogs(8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("dashboard")}</h1>
        <p className="text-sm text-muted-foreground">{t("overview")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title={t("products")} value={counts.products} />
        <Stat title={t("articles")} value={counts.articles} />
        <Stat title={t("faq")} value={counts.faqs} />
        <Stat title={t("media")} value={counts.media} />
        <Stat title={t("messages")} value={counts.messages} />
        <Stat title={t("users")} value={counts.users} />
        <Stat title={t("pages")} value={counts.pages} />
        <Stat title={t("categories")} value={counts.categories} />
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
            <CardTitle className="text-sm">{t("audit")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">{t("empty")}</p>
            ) : (
              logs.map((log) => (
                <p key={log.id}>
                  {log.created_at} · {log.actor_email ?? "system"} · {log.action}
                  {log.entity ? ` · ${log.entity}` : ""}
                </p>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <PasswordForm />
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
