import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { leaderboard } from "@/lib/ctv";
import { periodOf, previousPeriod } from "@/lib/ctv-core";

export const runtime = "edge";
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "duatop" });
  return { title: t("title"), description: t("intro"), robots: { index: false, follow: false } };
}

export default async function DuaTopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("duatop");
  const current = periodOf(new Date());
  const previous = previousPeriod(current);
  const [now, before] = await Promise.all([leaderboard(current.key), leaderboard(previous.key, 10)]);

  return (
    <div className="container mx-auto max-w-3xl space-y-10 px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="text-slate-600">{t("intro")}</p>
        <p className="text-sm text-slate-500">{t("cycle")}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          {t("period")}: {current.start} – {current.end}
        </h2>
        <Board rows={now} empty={t("empty")} labels={{ rank: t("rank"), number: t("number"), orders: t("orders") }} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("previousTitle")}</h2>
        <p className="text-sm text-slate-600">{t("previousIntro", { period: `${previous.start} – ${previous.end}` })}</p>
        <Board
          rows={before}
          empty={t("previousEmpty")}
          labels={{ rank: t("rank"), number: t("number"), orders: t("orders") }}
        />
      </section>
    </div>
  );
}

function Board({
  rows,
  empty,
  labels,
}: {
  rows: { public_no: string; count: number }[];
  empty: string;
  labels: { rank: string; number: string; orders: string };
}) {
  if (rows.length === 0) {
    return <p className="rounded-2xl border bg-white p-6 text-center text-slate-500">{empty}</p>;
  }
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-navy-50/80 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">{labels.rank}</th>
            <th className="px-4 py-3 font-medium">{labels.number}</th>
            <th className="px-4 py-3 text-right font-medium">{labels.orders}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.public_no} className="border-b last:border-0">
              <td className="px-4 py-3 font-semibold">{index + 1}</td>
              <td className="px-4 py-3 font-mono">{row.public_no}</td>
              <td className="px-4 py-3 text-right">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
