import { setRequestLocale } from "next-intl/server";
import { CtvManager } from "@/components/admin/CtvManager";
import { requirePagePermission } from "@/lib/admin-guard";
import { listPartners, listReferrals, payoutRows } from "@/lib/ctv";
import { periodFromKey, periodOf, previousPeriod } from "@/lib/ctv-core";

export const runtime = "edge";

export default async function CtvPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ period?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePagePermission("ctv", locale);
  const { period: requested } = await searchParams;
  const current = periodOf(new Date());
  const period = (requested && periodFromKey(requested)) || current;
  const [partners, referrals, payout] = await Promise.all([
    listPartners(period.key),
    listReferrals(period.key),
    payoutRows(period.key),
  ]);
  const previous = previousPeriod(period).key;
  // Kỳ sau chỉ có khi kỳ đang xem còn nằm trước kỳ hiện tại.
  const next = period.key < current.key ? nextKey(period.key) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cộng tác viên (CTV)</h1>
      <CtvManager
        partners={partners}
        referrals={referrals}
        payout={payout}
        period={period}
        previous={previous}
        next={next}
      />
    </div>
  );
}

function nextKey(key: string): string {
  const [year, month, half] = key.split("-").map(Number);
  if (half === 1) return `${year}-${String(month).padStart(2, "0")}-2`;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return `${nextYear}-${String(nextMonth).padStart(2, "0")}-1`;
}
