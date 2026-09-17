import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminTable } from "@/components/admin/AdminTable";
import { listContactMessages } from "@/lib/contact-messages";

export const runtime = "edge";

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const data = await listContactMessages();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("messages")}</h1>
      <AdminTable
        columns={["Name", "Email", "Subject", "Message", "Status"]}
        empty={t("empty")}
        rows={data.map((item) => [
          String(item.name),
          String(item.email),
          String(item.subject ?? "—"),
          String(item.message),
          String(item.status),
        ])}
      />
    </div>
  );
}
