import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { markPeriodPaid, payoutRows } from "@/lib/ctv";
import { periodFromKey, toCsv } from "@/lib/ctv-core";

export const runtime = "edge";

/** GET ?period=2026-10-1 trả JSON, thêm &format=csv để tải file chuyển khoản. */
export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "ctv");
  if ("response" in auth) return auth.response;
  const key = request.nextUrl.searchParams.get("period") ?? "";
  const period = periodFromKey(key);
  if (!period) return NextResponse.json({ error: "bad_period" }, { status: 400 });
  const rows = await payoutRows(period.key);

  if (request.nextUrl.searchParams.get("format") === "csv") {
    const csv = toCsv([
      ["Ngân hàng", "Tên tài khoản", "Số tài khoản", "Số tiền (VND)", "Nội dung", "Số hiển thị", "Số đơn"],
      ...rows.map((row) => [
        row.bank_name ?? "",
        row.bank_account_name ?? "",
        row.bank_account_no ?? "",
        row.amount_vnd,
        `ViMai hoa hong ${period.key}`,
        row.public_no,
        row.count,
      ]),
    ]);
    await writeAudit("ctv payout exported", "ctv_period", period.key, { rows: rows.length });
    return new NextResponse(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="ctv-payout-${period.key}.csv"`,
        "cache-control": "no-store",
      },
    });
  }
  return NextResponse.json({ period, rows });
}

/** Đánh dấu đã chuyển tiền cho một CTV trong một kỳ. */
export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "ctv", { mutate: true });
  if ("response" in auth) return auth.response;
  const body = (await request.json().catch(() => ({}))) as {
    partner_id?: string;
    period?: string;
    pay_ref?: string;
  };
  if (!body.partner_id || !periodFromKey(body.period ?? "")) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const result = await markPeriodPaid(body.partner_id, body.period!, body.pay_ref ?? null);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 503 });
  await writeAudit("ctv period paid", "ctv_partner", body.partner_id, { period: body.period });
  return NextResponse.json({ ok: true });
}
