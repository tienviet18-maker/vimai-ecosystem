import { getTranslations, setRequestLocale } from "next-intl/server";

export const runtime = "edge";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <section className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t("termsTitle")}</h1>
      <p className="mt-6 leading-8 text-slate-600">{t("termsBody")}</p>
    </section>
  );
}
