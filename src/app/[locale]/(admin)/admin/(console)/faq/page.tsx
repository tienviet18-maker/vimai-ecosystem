import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { AdminTable } from "@/components/admin/AdminTable";
import { getSupportFaqs } from "@/lib/faqs";
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
  const faqs = await getSupportFaqs(locale as Locale);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("faq")}</h1>
      <FaqEditor />
      <AdminTable
        columns={["Question", "Answer"]}
        empty={t("empty")}
        rows={faqs.map((faq) => [faq.question, faq.answer])}
      />
    </div>
  );
}
