import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactChannels } from "@/components/shared/ContactChannels";
import { ContactForm } from "@/components/shared/ContactForm";

export const runtime = "edge";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-500">{t("lead")}</p>
      <ContactChannels variant="page" className="mt-6 flex-wrap" />
      <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft sm:p-10">
        <ContactForm />
      </div>
    </section>
  );
}
