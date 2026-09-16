import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminTable } from "@/components/admin/AdminTable";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("messages")}</h1>
      <AdminTable
        columns={["Name", "Email", "Subject", "Message", "Status"]}
        empty={t("empty")}
        rows={(data ?? []).map((item) => [
          item.name,
          item.email,
          item.subject ?? "—",
          item.message,
          item.status,
        ])}
      />
    </div>
  );
}
