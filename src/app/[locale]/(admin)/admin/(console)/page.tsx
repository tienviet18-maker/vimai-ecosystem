import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { getAllReviews } from "@/lib/reviews";
import { getAnalyticsSnapshot } from "@/lib/analytics";
import { requireAdmin } from "@/lib/auth";

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
  const { supabase } = await requireAdmin();
  const { data: logs } = supabase
    ? await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(8)
    : { data: [] };

  const launched = products.filter((item) =>
    ["launched", "available"].includes(item.status),
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("dashboard")}</h1>
        <p className="text-sm text-muted-foreground">{t("overview")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Products" value={products.length} />
        <Stat title="Launched" value={launched} />
        <Stat
          title="Development"
          value={products.filter((item) => item.status === "development").length}
        />
        <Stat
          title="Coming soon"
          value={products.filter((item) => item.status === "coming_soon").length}
        />
        <Stat
          title="Article drafts"
          value={articles.filter((item) => item.status === "draft").length}
        />
        <Stat
          title="Scheduled"
          value={articles.filter((item) => item.status === "scheduled").length}
        />
        <Stat
          title="Published articles"
          value={articles.filter((item) => item.status === "published").length}
        />
        <Stat
          title="Pending reviews"
          value={reviews.filter((item) => item.status === "pending").length}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Analytics (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics ? (
              <div className="space-y-2 text-sm">
                <p>Page views: {analytics.totals.pageViews ?? "—"}</p>
                <p>Approximate uniques: {analytics.totals.uniqueVisitors ?? "—"}</p>
                <p className="text-muted-foreground">{analytics.note}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Connect CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID to load zone analytics.
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {(logs ?? []).length === 0 ? (
              <p className="text-muted-foreground">{t("empty")}</p>
            ) : (
              (logs ?? []).map((log) => (
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
