import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { EcosystemLinks } from "@/components/shared/EcosystemLinks";
import { JsonLd } from "@/components/shared/JsonLd";
import { ProductMark } from "@/components/shared/ProductMark";
import { Breadcrumbs } from "@/components/vicare/Breadcrumbs";
import { ContentBlock } from "@/components/vicare/ContentBlocks";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  localizedUrl,
  staticPageMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import {
  VICARE_LOGO,
  VICARE_LOGO_PNG,
  VICARE_PATH,
  getVicareGuide,
  getVicarePageCopy,
  vicareGuidePath,
} from "@/lib/vicare";
import { getVicareContext } from "@/lib/vicare/data";
import type { Locale } from "@/types";

export const runtime = "edge";

/** Date the guide content was last checked (shown and used as dateModified). */
const GUIDES_UPDATED = "2026-10-12";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const guide = getVicareGuide(locale, topic);
  if (!guide) return {};
  const meta = staticPageMetadata({
    siteUrl: SITE_URL,
    locale,
    path: vicareGuidePath(guide.slug),
    title: guide.seoTitle,
    description: guide.description,
    ogImage: VICARE_LOGO_PNG,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article" } };
}

export default async function VicareGuidePage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  setRequestLocale(locale);
  const guide = getVicareGuide(locale, topic);
  if (!guide) notFound();

  const copy = getVicarePageCopy(locale);
  const { vicare, others } = await getVicareContext(locale as Locale);
  const path = vicareGuidePath(guide.slug);
  const pageUrl = localizedUrl(SITE_URL, locale, path);
  const productUrl = localizedUrl(SITE_URL, locale, VICARE_PATH);
  const related = guide.related
    .map((slug) => getVicareGuide(locale, slug))
    .filter((item): item is NonNullable<typeof item> => item !== null);
  const crumbs = [
    { name: copy.breadcrumbHome, href: "/" },
    { name: copy.breadcrumbProducts, href: "/products" },
    { name: copy.name, href: VICARE_PATH },
    { name: guide.title, href: path },
  ];

  return (
    <article className="container py-12 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            articleJsonLd({
              headline: guide.title,
              description: guide.description,
              siteUrl: SITE_URL,
              pageUrl,
              locale,
              image: VICARE_LOGO_PNG,
              dateModified: GUIDES_UPDATED,
              about: `${productUrl}#app`,
            }),
            faqPageJsonLd(pageUrl, locale, guide.faqs),
            breadcrumbJsonLd(
              pageUrl,
              crumbs.map((item) => ({ name: item.name, url: localizedUrl(SITE_URL, locale, item.href) })),
            ),
          ],
        }}
      />

      <Breadcrumbs items={crumbs} label={copy.breadcrumbLabel} />

      <div className="mx-auto mt-10 max-w-3xl">
        <h1 className="text-[1.85rem] font-semibold leading-tight tracking-tight sm:text-4xl">{guide.title}</h1>
        <p className="mt-3 text-sm text-slate-500">{copy.updatedLabel}</p>
        <p className="mt-6 text-lg leading-8 text-slate-600">{guide.lead}</p>

        <nav aria-labelledby="toc-heading" className="mt-8 rounded-2xl border border-slate-200/80 bg-navy-50/60 px-5 py-4">
          <p id="toc-heading" className="text-sm font-semibold text-slate-900">
            {copy.tocTitle}
          </p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-slate-600">
            {guide.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-primary">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {guide.sections.map((section) => (
          <ContentBlock key={section.id} section={section} />
        ))}

        <section
          aria-labelledby="vicare-cta-heading"
          className="mt-14 flex flex-col gap-6 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:p-8"
        >
          <ProductMark src={vicare.logo_url || VICARE_LOGO} alt={copy.name} size="sm" />
          <div className="flex-1">
            <h2 id="vicare-cta-heading" className="text-lg font-semibold tracking-tight">
              {copy.guideCtaTitle}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{guide.appHelp}</p>
            {vicare.app_store_url || vicare.google_play_url ? null : (
              <p className="mt-2 text-sm leading-7 text-slate-500">
                {copy.appStoreSoon} · {copy.googlePlaySoon}
              </p>
            )}
            <Button asChild className="mt-4 min-h-11">
              <Link href={VICARE_PATH}>
                {copy.guideCtaButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="guide-faq-heading" className="mt-14">
          <h2 id="guide-faq-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            {copy.guideFaqTitle}
          </h2>
          <dl className="mt-6 space-y-6">
            {guide.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-slate-900">{faq.question}</dt>
                <dd className="mt-2 leading-7 text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 ? (
          <section aria-labelledby="related-heading" className="mt-14">
            <h2 id="related-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              {copy.relatedTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={vicareGuidePath(item.slug)}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 no-underline hover:border-navy-200"
                  >
                    <span className="flex-1">
                      <span className="block font-medium text-slate-900 group-hover:text-primary">{item.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">{item.summary}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-14 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-5 py-4 text-sm leading-7 text-amber-900">
          {copy.guideDisclaimer}
        </p>
      </div>

      <EcosystemLinks products={[vicare, ...others]} title={copy.ecosystemTitle} />
    </article>
  );
}
