import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { AdminTable } from "@/components/admin/AdminTable";
import { RecordDelete } from "@/components/admin/RecordDelete";
import { getAllFaqsForAdmin } from "@/lib/faqs";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const faqs = await getAllFaqsForAdmin(locale as Locale);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("faq")}</h1>
      <FaqEditor />
      <AdminTable
        columns={["Question", "Category", t("status"), "Order", ""]}
        empty={t("empty")}
        rows={faqs.map((faq) => [
          faq.question,
          faq.category ?? "—",
          faq.published ? t("published") : t("draft"),
          String(faq.sort_order),
          <RecordDelete key={faq.id} endpoint="/api/admin/faqs" id={faq.id} />,
        ])}
      />
    </div>
  );
}
