import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { ContactChannels } from "@/components/shared/ContactChannels";
import { ContactForm } from "@/components/shared/ContactForm";
import { Link } from "@/lib/i18n/navigation";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ctvJoin" });
  return {
    ...staticPageMetadata({
      siteUrl: SITE_URL,
      locale,
      path: "/ctv",
      title: t("title"),
      description: t("lead"),
    }),
  };
}

export default async function CtvJoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ctvJoin");

  const steps = [1, 2, 3, 4].map((n) => ({ title: t(`step${n}Title`), body: t(`step${n}Body`) }));
  const perks = [1, 3, 5, 2, 4].map((n) => ({ title: t(`perk${n}Title`), body: t(`perk${n}Body`) }));
  const fits = [t("fit1"), t("fit2"), t("fit3"), t("fit4")];
  const rules = [t("rule1"), t("rule2"), t("rule3"), t("rule4")];

  return (
    <>
      <section className="border-b border-slate-200/80 bg-white">
        <div className="container max-w-4xl py-14 sm:py-16 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{t("eyebrow")}</p>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.2] tracking-tight text-slate-900 sm:text-[2.5rem]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.0625rem]">{t("lead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apply"
              className="inline-flex h-12 items-center rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground no-underline shadow-sm transition-colors hover:bg-navy-700"
            >
              {t("ctaApply")}
            </a>
            <Link
              href="/duatop"
              className="inline-flex h-12 items-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-medium text-slate-700 no-underline shadow-sm transition-colors hover:bg-navy-50 hover:text-primary"
            >
              {t("ctaBoard")}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="ctv-steps" className="container max-w-4xl py-14 lg:py-16">
        <h2 id="ctv-steps" className="text-2xl font-semibold tracking-tight">{t("stepsTitle")}</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-200/80 bg-white p-6">
              <span className="text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ctv-perks" className="border-y border-slate-200/80 bg-white">
        <div className="container max-w-4xl py-14 lg:py-16">
          <h2 id="ctv-perks" className="text-2xl font-semibold tracking-tight">{t("perksTitle")}</h2>
          <dl className="mt-6 divide-y divide-slate-200/80 border-y border-slate-200/80">
            {perks.map((perk) => (
              <div key={perk.title} className="py-5 sm:grid sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-semibold text-slate-900">{perk.title}</dt>
                <dd className="mt-1 leading-7 text-slate-600 sm:mt-0">{perk.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container grid max-w-4xl gap-10 py-14 md:grid-cols-2 lg:py-16">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{t("fitTitle")}</h2>
          <ul className="mt-4 space-y-3 leading-7 text-slate-600">
            {fits.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{t("rulesTitle")}</h2>
          <ul className="mt-4 space-y-3 leading-7 text-slate-600">
            {rules.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" aria-labelledby="ctv-apply" className="border-t border-slate-200/80 bg-white">
        <div className="container max-w-3xl scroll-mt-24 py-14 lg:py-16">
          <h2 id="ctv-apply" className="text-2xl font-semibold tracking-tight">{t("applyTitle")}</h2>
          <p className="mt-3 leading-7 text-slate-600">{t("applyLead")}</p>
          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
            <ContactForm defaultSubject={t("applySubject")} messagePlaceholder={t("applyPlaceholder")} />
          </div>
          <p className="mt-8 text-sm font-medium text-slate-700">{t("applyChannels")}</p>
          <ContactChannels variant="page" className="mt-4" />
        </div>
      </section>
    </>
  );
}
