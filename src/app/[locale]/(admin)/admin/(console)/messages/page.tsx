import { getTranslations, setRequestLocale } from "next-intl/server";
import { requirePagePermission } from "@/lib/admin-guard";
import { AdminTable } from "@/components/admin/AdminTable";
import { MessageActions } from "@/components/admin/MessageActions";
import { listContactMessages } from "@/lib/contact-messages";

export const runtime = "edge";

export default async function MessagesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  await requirePagePermission("messages", locale);
  const t = await getTranslations("admin");
  const q = (query.q ?? "").trim().toLowerCase();
  const status = (query.status ?? "").trim();
  const data = (await listContactMessages()).filter((item) => {
    if (status && String(item.status ?? "") !== status) return false;
    if (!q) return true;
    return [item.name, item.email, item.subject, item.message]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("messages")}</h1>
      <form className="flex flex-col gap-3 rounded-2xl border bg-white p-4 sm:flex-row">
        <input
          name="q"
          defaultValue={query.q}
          placeholder="Search name / email / subject"
          className="min-h-11 flex-1 rounded-xl border px-3 text-sm"
        />
        <select name="status" defaultValue={query.status ?? ""} className="min-h-11 rounded-xl border px-3 text-sm">
          <option value="">All</option>
          <option value="new">new</option>
          <option value="unread">unread</option>
          <option value="read">read</option>
          <option value="archived">archived</option>
        </select>
        <button type="submit" className="min-h-11 rounded-xl bg-primary px-4 text-sm text-white">
          Filter
        </button>
      </form>
      <AdminTable
        columns={[t("colTime"), t("fieldName"), t("email"), t("colSubject"), t("colMessage"), t("status"), ""]}
        empty={t("empty")}
        rows={data.map((item) => [
          String(item.created_at ?? "—"),
          String(item.name),
          String(item.email),
          String(item.subject ?? "—"),
          String(item.message),
          String(item.status),
          item.id ? <MessageActions key={item.id} id={item.id} status={String(item.status ?? "new")} /> : "",
        ])}
      />
    </div>
  );
}
