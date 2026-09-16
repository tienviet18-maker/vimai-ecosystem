import { getTranslations, setRequestLocale } from "next-intl/server";

export const runtime = "edge";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <section className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t("privacyTitle")}</h1>
      <p className="mt-6 leading-8 text-slate-600">{t("privacyBody")}</p>
      <h2 className="mt-10 text-xl font-semibold">{t("analyticsTitle")}</h2>
      <p className="mt-3 leading-8 text-slate-600">{t("analyticsBody")}</p>
      <h2 className="mt-10 text-xl font-semibold">{t("feedbackTitle")}</h2>
      <p className="mt-3 leading-8 text-slate-600">{t("feedbackBody")}</p>
    </section>
  );
}
