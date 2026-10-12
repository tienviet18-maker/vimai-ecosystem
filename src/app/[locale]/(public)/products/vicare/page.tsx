import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BookOpen,
  FileText,
  HeartPulse,
  Languages,
  MapPin,
  MessagesSquare,
  Mic,
  PhoneCall,
  ScanText,
  Search,
  ShieldCheck,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { AppStoreButton } from "@/components/shared/AppStoreButton";
import { PlayStoreButton } from "@/components/shared/PlayStoreButton";
import { EcosystemLinks } from "@/components/shared/EcosystemLinks";
import { JsonLd } from "@/components/shared/JsonLd";
import { ProductMark } from "@/components/shared/ProductMark";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Breadcrumbs } from "@/components/vicare/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  freeMobileAppJsonLd,
  localizedUrl,
  staticPageMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import {
  VICARE_LOGO,
  VICARE_LOGO_PNG,
  VICARE_PATH,
  VICARE_PRIVACY_PATH,
  getVicareGuides,
  getVicarePageCopy,
  vicareGuidePath,
} from "@/lib/vicare";
import { getVicareContext } from "@/lib/vicare/data";
import type { VicareFeature } from "@/lib/vicare/types";
import type { Locale } from "@/types";

export const runtime = "edge";

const ICONS: Record<VicareFeature["key"], LucideIcon> = {
  interpreter: Mic,
  scanner: ScanText,
  sick: Thermometer,
  clinics: MapPin,
  emergency: PhoneCall,
  health: HeartPulse,
  phrasebook: MessagesSquare,
  diseases: BookOpen,
  procedures: FileText,
  dictionary: Languages,
  search: Search,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getVicarePageCopy(locale);
  return staticPageMetadata({
    siteUrl: SITE_URL,
    locale,
    path: VICARE_PATH,
    title: copy.seoTitle,
    description: copy.description,
    ogImage: VICARE_LOGO_PNG,
  });
}

export default async function VicarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getVicarePageCopy(locale);
  const guides = getVicareGuides(locale);
  const { vicare, others } = await getVicareContext(locale as Locale);
  const pageUrl = localizedUrl(SITE_URL, locale, VICARE_PATH);
  const crumbs = [
    { name: copy.breadcrumbHome, href: "/" },
    { name: copy.breadcrumbProducts, href: "/products" },
    { name: copy.name, href: VICARE_PATH },
  ];

  return (
    <article className="container py-12 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            freeMobileAppJsonLd({
              name: copy.name,
              description: copy.description,
              image: VICARE_LOGO_PNG,
              siteUrl: SITE_URL,
              pageUrl,
              locale,
              operatingSystem: "iOS, Android",
              applicationCategory: "HealthApplication",
              availableLanguage: ["vi", "ja", "en"],
              storeUrls: [vicare.app_store_url, vicare.google_play_url],
            }),
            faqPageJsonLd(pageUrl, locale, copy.faqs),
            breadcrumbJsonLd(
              pageUrl,
              crumbs.map((item) => ({ name: item.name, url: localizedUrl(SITE_URL, locale, item.href) })),
            ),
          ],
        }}
      />

      <Breadcrumbs items={crumbs} label={copy.breadcrumbLabel} />

      {/* Hero */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
        <div className="flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft">
          <ProductMark src={vicare.logo_url || VICARE_LOGO} alt={copy.name} size="lg" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.name}</h1>
            <StatusBadge status={vicare.status} />
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-500">{copy.tagline}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{copy.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={copy.tagline}>
            {copy.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-navy-100 bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700"
              >
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-lg font-semibold tracking-tight">{copy.storeTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <AppStoreButton href={vicare.app_store_url} label={copy.appStoreSoon} className="min-h-11" />
              <PlayStoreButton href={vicare.google_play_url} label={copy.googlePlaySoon} className="min-h-11" />
            </div>
            {vicare.app_store_url && vicare.google_play_url ? null : (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{copy.storeNote}</p>
            )}
            <Button asChild variant="ghost" className="mt-3 -ml-2 min-h-11 px-2">
              <a href="#guides">
                {copy.guidesCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Signature features */}
      <section aria-labelledby="signature-heading" className="mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{copy.signatureEyebrow}</p>
        <h2 id="signature-heading" className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {copy.signatureTitle}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {copy.signature.map((feature) => {
            const Icon = ICONS[feature.key];
            return (
              <div key={feature.key} className="rounded-[1.75rem] border border-slate-200/80 bg-navy-50/60 p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{feature.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* All features */}
      <section aria-labelledby="features-heading" className="mt-20">
        <h2 id="features-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {copy.featuresTitle}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">{copy.featuresLead}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.features.map((feature) => {
            const Icon = ICONS[feature.key];
            return (
              <li key={feature.key} className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{feature.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* How it works at the clinic */}
      <section aria-labelledby="flow-heading" className="mt-20">
        <h2 id="flow-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {copy.flowTitle}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">{copy.flowLead}</p>
        <ol className="mt-8 grid gap-4 lg:grid-cols-5">
          {copy.flow.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-slate-200/80 bg-white p-5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold leading-snug tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Web vs app */}
      <section aria-labelledby="webapp-heading" className="mt-20">
        <h2 id="webapp-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {copy.webAppTitle}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">{copy.webAppLead}</p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full min-w-[36rem] text-left text-sm leading-6">
            <thead className="border-b border-slate-200/80 bg-navy-50/80 text-slate-600">
              <tr>
                {copy.webAppHead.map((cell) => (
                  <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.webAppRows.map(([feature, web, app]) => (
                <tr key={feature} className="border-b border-slate-100 align-top last:border-0">
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    {feature}
                  </th>
                  <td className="px-4 py-3 text-slate-600">{web}</td>
                  <td className="px-4 py-3 text-slate-600">{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">{copy.webAppNote}</p>
      </section>

      {/* Privacy */}
      <section
        aria-labelledby="privacy-heading"
        className="mt-20 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 id="privacy-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            {copy.privacyTitle}
          </h2>
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {copy.privacyPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-7 text-slate-600">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link href={VICARE_PRIVACY_PATH} className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          {copy.privacyLink}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </section>

      {/* Guides */}
      <section id="guides" aria-labelledby="guides-heading" className="mt-20 scroll-mt-24">
        <h2 id="guides-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {copy.guidesTitle}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">{copy.guidesLead}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={vicareGuidePath(guide.slug)}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift"
              >
                <span className="font-semibold leading-snug tracking-tight text-slate-900">{guide.title}</span>
                <span className="mt-2 text-sm leading-6 text-slate-500">{guide.summary}</span>
                <span className="mt-auto pt-4">
                  <ArrowRight
                    className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mt-20 max-w-3xl">
        <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight">
          {copy.faqTitle}
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {copy.faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Disclaimer */}
      <aside
        aria-labelledby="disclaimer-heading"
        className="mt-16 max-w-3xl rounded-2xl border border-amber-200/80 bg-amber-50/70 px-6 py-5"
      >
        <h2 id="disclaimer-heading" className="text-base font-semibold text-amber-900">
          {copy.disclaimerTitle}
        </h2>
        <p className="mt-2 text-sm leading-7 text-amber-900">{copy.disclaimer}</p>
      </aside>

      <EcosystemLinks products={others} title={copy.ecosystemTitle} lead={copy.ecosystemLead} />
    </article>
  );
}
