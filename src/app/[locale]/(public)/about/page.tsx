import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PRODUCT_SITES } from "@/lib/product-sites";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    ...staticPageMetadata({
      siteUrl: SITE_URL,
      locale,
      path: "/about",
      title: t("title"),
      description: t("lead"),
    }),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const scopes = [t("scope1"), t("scope2"), t("scope3"), t("scope4"), t("scope5")];
  const vicarePoints = [t("vicarePoint1"), t("vicarePoint2"), t("vicarePoint3"), t("vicarePoint4")];

  return (
    <section className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-500">{t("lead")}</p>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">{t("storyTitle")}</h2>
      <p className="mt-4 leading-8 text-slate-600">{t("storyBody")}</p>
      <p className="mt-5 leading-8 text-slate-600">{t("missionP1")}</p>
      <p className="mt-5 leading-8 text-slate-600">{t("missionP2")}</p>
      <p className="mt-5 leading-8 text-slate-600">{t("missionP3")}</p>

      <div
        aria-labelledby="vicare-heading"
        className="mt-14 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {t("vicareEyebrow")}
        </p>
        <h2 id="vicare-heading" className="mt-3 text-xl font-semibold tracking-tight">
          {t("vicareTitle")}
        </h2>
        <p className="mt-4 leading-8 text-slate-600">{t("vicareBody")}</p>
        <ul className="mt-5 space-y-3 leading-7 text-slate-700">
          {vicarePoints.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <a href={PRODUCT_SITES.vicare} target="_blank" rel="noopener noreferrer">
              {t("vicareWebCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products/vicare">{t("vicareMore")}</Link>
          </Button>
        </div>
      </div>

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
