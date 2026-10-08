"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DISCOUNT_PERCENTS, type Period } from "@/lib/ctv-core";
import type { PartnerStats, PayoutRow, Referral } from "@/lib/ctv";

type ReferralRow = Referral & { nickname: string; public_no: string };

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

async function call(url: string, method: string, body?: Record<string, unknown>) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = (await response.json().catch(() => ({}))) as Record<string, unknown> & { error?: string };
  if (!response.ok) throw new Error(json.error ?? "Có lỗi, thử lại");
  return json;
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Đã copy");
  } catch {
    toast.error("Không copy được, hãy bôi đen và copy tay");
  }
}

export function CtvManager({
  partners,
  referrals,
  payout,
  period,
  previous,
  next,
}: {
  partners: PartnerStats[];
  referrals: ReferralRow[];
  payout: PayoutRow[];
  period: Period;
  previous: string;
  next: string | null;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [created, setCreated] = useState<{ code: string; public_no: string; link: string } | null>(null);

  async function run(key: string, task: () => Promise<void>, reload = true) {
    setBusy(key);
    try {
      await task();
      if (reload) window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Có lỗi");
    } finally {
      setBusy(null);
    }
  }

  function createPartner(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void run(
      "create",
      async () => {
        const json = await call("/api/admin/ctv", "POST", {
          nickname: form.get("nickname"),
          contact: form.get("contact"),
          bank_name: form.get("bank_name"),
          bank_account_name: form.get("bank_account_name"),
          bank_account_no: form.get("bank_account_no"),
          discount_percent: Number(form.get("discount_percent")),
          commission_vnd: Number(form.get("commission_vnd")),
          note: form.get("note"),
          terms_accepted: form.get("terms_accepted") === "on",
        });
        setCreated({ code: String(json.code), public_no: String(json.public_no), link: String(json.link) });
      },
      false,
    );
  }

  const patch = (id: string, body: Record<string, unknown>) =>
    run(id, async () => {
      await call("/api/admin/ctv", "PATCH", { id, ...body });
      toast.success("Đã lưu");
    });

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Thêm CTV</h2>
        {created ? (
          <div className="space-y-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
            <p className="font-medium">Đã tạo CTV. Link riêng chỉ hiện một lần này, hãy copy gửi cho CTV.</p>
            <p>
              Mã khách nhập: <b className="font-mono text-base">{created.code}</b> · Số trên /duatop:{" "}
              <b>{created.public_no}</b>
            </p>
            <p className="break-all font-mono text-xs">{created.link}</p>
            <div className="flex gap-2">
              <Button type="button" className="min-h-11" onClick={() => copy(created.link)}>
                Copy link riêng
              </Button>
              <Button type="button" variant="outline" className="min-h-11" onClick={() => window.location.reload()}>
                Xong
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={createPartner} className="grid gap-3 rounded-2xl border bg-white p-4 sm:grid-cols-3">
            <Input name="nickname" placeholder="Biệt danh (chỉ anh thấy)" required className="min-h-11" />
            <Input name="contact" placeholder="Liên lạc (Zalo, FB...)" className="min-h-11" />
            <Input name="note" placeholder="Ghi chú" className="min-h-11" />
            <Input name="bank_name" placeholder="Ngân hàng" className="min-h-11" />
            <Input name="bank_account_name" placeholder="Tên chủ tài khoản" className="min-h-11" />
            <Input name="bank_account_no" placeholder="Số tài khoản" inputMode="numeric" className="min-h-11" />
            <label className="flex items-center gap-2 text-sm">
              Giảm cho khách
              <select name="discount_percent" defaultValue={15} className="min-h-11 rounded-xl border px-3">
                {DISCOUNT_PERCENTS.map((p) => (
                  <option key={p} value={p}>
                    {p}%
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              Hoa hồng/đơn (đ)
              <Input
                name="commission_vnd"
                type="number"
                min={0}
                step={1000}
                defaultValue={100000}
                className="min-h-11 w-32"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="terms_accepted" className="h-5 w-5" /> CTV đã đồng ý điều khoản
            </label>
            <Button type="submit" disabled={busy === "create"} className="min-h-11 sm:col-span-3">
              Tạo CTV và sinh mã
            </Button>
          </form>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Danh sách CTV ({partners.length})</h2>
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b bg-navy-50/80 text-slate-500">
              <tr>
                {["Số", "Mã", "Biệt danh", "Trạng thái", "Giảm", "Hoa hồng", "Đơn kỳ này", "Chưa trả kỳ này", "Tổng đơn", "Tổng chưa trả", ""].map(
                  (head) => (
                    <th key={head} className="px-3 py-3 font-medium">
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-slate-500">
                    Chưa có CTV nào.
                  </td>
                </tr>
              ) : (
                partners.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="px-3 py-3 font-semibold">{p.public_no}</td>
                    <td className="px-3 py-3 font-mono">{p.code}</td>
                    <td className="px-3 py-3">
                      {p.nickname}
                      {p.contact ? <span className="block text-xs text-slate-500">{p.contact}</span> : null}
                    </td>
                    <td className="px-3 py-3">
                      <select
                        defaultValue={p.status}
                        disabled={busy === p.id}
                        className="min-h-11 rounded-xl border px-2"
                        onChange={(e) => patch(p.id, { status: e.target.value })}
                      >
                        <option value="active">Đang chạy</option>
                        <option value="paused">Tạm dừng</option>
                        <option value="ended">Kết thúc</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        defaultValue={p.discount_percent}
                        disabled={busy === p.id}
                        className="min-h-11 rounded-xl border px-2"
                        onChange={(e) => patch(p.id, { discount_percent: Number(e.target.value) })}
                      >
                        {DISCOUNT_PERCENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}%
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <Input
                        type="number"
                        min={0}
                        step={1000}
                        defaultValue={p.commission_vnd}
                        className="min-h-11 w-28"
                        onBlur={(e) => {
                          const value = Number(e.target.value);
                          if (value !== p.commission_vnd) void patch(p.id, { commission_vnd: value });
                        }}
                      />
                    </td>
                    <td className="px-3 py-3">{p.period_count}</td>
                    <td className="px-3 py-3">{vnd(p.period_unpaid_vnd)}</td>
                    <td className="px-3 py-3">{p.total_count}</td>
                    <td className="px-3 py-3">{vnd(p.total_unpaid_vnd)}</td>
                    <td className="px-3 py-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="min-h-11"
                        disabled={busy === p.id}
                        onClick={() => {
                          if (!confirm("Cấp lại link riêng? Link cũ sẽ hết hiệu lực ngay.")) return;
                          void run(
                            p.id,
                            async () => {
                              const json = await call("/api/admin/ctv", "PATCH", { id: p.id, regenerate_link: true });
                              setCreated({ code: p.code, public_no: p.public_no, link: String(json.link) });
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            },
                            false,
                          );
                        }}
                      >
                        Cấp lại link
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">
            Kỳ thanh toán {period.key} ({period.start} đến {period.end})
          </h2>
          <a className="text-sm text-primary underline" href={`?period=${previous}`}>
            Kỳ trước
          </a>
          {next ? (
            <a className="text-sm text-primary underline" href={`?period=${next}`}>
              Kỳ sau
            </a>
          ) : null}
          <a
            className="inline-flex min-h-11 items-center rounded-xl border px-3 text-sm"
            href={`/api/admin/ctv/payout?period=${period.key}&format=csv`}
          >
            Tải file chuyển khoản (CSV)
          </a>
        </div>
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b bg-navy-50/80 text-slate-500">
              <tr>
                {["Số", "Biệt danh", "Ngân hàng", "Số tài khoản", "Số đơn", "Cần trả", "Mã giao dịch", ""].map((head) => (
                  <th key={head} className="px-3 py-3 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payout.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    Kỳ này không còn khoản nào chưa trả.
                  </td>
                </tr>
              ) : (
                payout.map((row) => (
                  <PayoutLine key={row.partner_id} row={row} period={period.key} busy={busy} run={run} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Đơn có mã trong kỳ này ({referrals.length})</h2>
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b bg-navy-50/80 text-slate-500">
              <tr>
                {["Giờ", "Số CTV", "App", "Khách trả", "Hoa hồng", "Trạng thái", ""].map((head) => (
                  <th key={head} className="px-3 py-3 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {referrals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    Chưa có đơn nào.
                  </td>
                </tr>
              ) : (
                referrals.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-3 py-3">{new Date(r.created_at).toLocaleString("vi-VN")}</td>
                    <td className="px-3 py-3 font-semibold">{r.public_no}</td>
                    <td className="px-3 py-3">{r.product}</td>
                    <td className="px-3 py-3">{vnd(r.paid_vnd)}</td>
                    <td className="px-3 py-3">{vnd(r.commission_vnd)}</td>
                    <td className="px-3 py-3">
                      {r.status === "pending" ? "Chưa trả" : r.status === "paid" ? "Đã trả" : "Đã hủy (hoàn tiền)"}
                    </td>
                    <td className="px-3 py-3">
                      {r.status === "paid" ? null : (
                        <Button
                          type="button"
                          variant="outline"
                          className="min-h-11"
                          disabled={busy === r.id}
                          onClick={() => {
                            const makeVoid = r.status !== "void";
                            if (makeVoid && !confirm("Hủy hoa hồng của đơn này (khách hoàn tiền)?")) return;
                            void run(r.id, async () => {
                              await call("/api/admin/ctv/referral", "PATCH", { id: r.id, void: makeVoid });
                            });
                          }}
                        >
                          {r.status === "void" ? "Khôi phục" : "Hủy (hoàn tiền)"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function PayoutLine({
  row,
  period,
  busy,
  run,
}: {
  row: PayoutRow;
  period: string;
  busy: string | null;
  run: (key: string, task: () => Promise<void>, reload?: boolean) => Promise<void>;
}) {
  const [ref, setRef] = useState("");
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-3 font-semibold">{row.public_no}</td>
      <td className="px-3 py-3">
        {row.nickname}
        <span className="block text-xs text-slate-500">{row.bank_account_name}</span>
      </td>
      <td className="px-3 py-3">{row.bank_name}</td>
      <td className="px-3 py-3 font-mono">{row.bank_account_no}</td>
      <td className="px-3 py-3">{row.count}</td>
      <td className="px-3 py-3 font-semibold">{vnd(row.amount_vnd)}</td>
      <td className="px-3 py-3">
        <Input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="Mã giao dịch (tùy chọn)"
          className="min-h-11 w-44"
        />
      </td>
      <td className="px-3 py-3">
        <Button
          type="button"
          className="min-h-11"
          disabled={busy === row.partner_id}
          onClick={() => {
            if (!confirm(`Đánh dấu đã chuyển ${vnd(row.amount_vnd)} cho ${row.public_no}?`)) return;
            void run(row.partner_id, async () => {
              await call("/api/admin/ctv/payout", "POST", { partner_id: row.partner_id, period, pay_ref: ref });
            });
          }}
        >
          Đã trả
        </Button>
      </td>
    </tr>
  );
}
