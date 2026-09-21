import { getTranslations, setRequestLocale } from "next-intl/server";

export const runtime = "edge";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const scopes = [t("scope1"), t("scope2"), t("scope3"), t("scope4")];

  return (
    <section className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-500">{t("lead")}</p>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">{t("storyTitle")}</h2>
      <p className="mt-4 leading-8 text-slate-600">{t("storyBody")}</p>
      <p className="mt-5 leading-8 text-slate-600">{t("missionP1")}</p>
      <p className="mt-5 leading-8 text-slate-600">{t("missionP2")}</p>
      <p className="mt-5 leading-8 text-slate-600">{t("missionP3")}</p>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">{t("scopeTitle")}</h2>
      <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-600">
        {scopes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">{t("qualityTitle")}</h2>
      <p className="mt-4 leading-8 text-slate-600">{t("qualityBody")}</p>
    </section>
  );
}
