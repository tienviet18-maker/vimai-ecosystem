import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { leaderboard, partnerByToken } from "@/lib/ctv";
import { periodOf } from "@/lib/ctv-core";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

export default async function CtvPortalPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const data = await partnerByToken(token);
  if (!data) notFound();
  const { partner, referrals } = data;
  const t = await getTranslations("ctvPortal");
  const period = periodOf(new Date());
  const board = await leaderboard(period.key, 500);
  const rank = board.findIndex((row) => row.public_no === partner.public_no) + 1;
  const thisPeriod = referrals.filter((r) => r.period_key === period.key && r.status !== "void").length;
  const unpaid = referrals
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.commission_vnd, 0);

  return (
    <div className="container mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-slate-500">{t("secret")}</p>
      </header>

      <dl className="grid gap-4 sm:grid-cols-2">
        <Stat label={t("hello")} value={partner.public_no} />
        <Stat label={t("yourCode")} value={partner.code} mono />
        <Stat label={t("thisPeriod")} value={String(thisPeriod)} />
        <Stat label={t("rank")} value={rank > 0 ? `#${rank}` : "-"} />
        <Stat label={t("unpaid")} value={vnd(unpaid)} />
      </dl>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("history")}</h2>
        {referrals.length === 0 ? (
          <p className="rounded-2xl border bg-white p-6 text-center text-slate-500">{t("empty")}</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border bg-white">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b bg-navy-50/80 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("date")}</th>
                  <th className="px-4 py-3 font-medium">{t("app")}</th>
                  <th className="px-4 py-3 font-medium">{t("commission")}</th>
                  <th className="px-4 py-3 font-medium">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-4 py-3">{r.created_at.slice(0, 10)}</td>
                    <td className="px-4 py-3">{r.product}</td>
                    <td className="px-4 py-3">{vnd(r.commission_vnd)}</td>
                    <td className="px-4 py-3">{t(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className={`mt-1 text-2xl font-semibold ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}
