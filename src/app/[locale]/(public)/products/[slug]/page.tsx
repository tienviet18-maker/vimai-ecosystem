import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { AppStoreButton } from "@/components/shared/AppStoreButton";
import { PlayStoreButton } from "@/components/shared/PlayStoreButton";
import { ProductGallery } from "@/components/shared/ProductGallery";
import { PwaInstallGuide } from "@/components/shared/PwaInstallGuide";
import { FeatureList } from "@/components/shared/FeatureList";
import { EcosystemLinks } from "@/components/shared/EcosystemLinks";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProductMark } from "@/components/shared/ProductMark";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { getFaqs } from "@/lib/faqs";
import { getLocalizedProducts, getProductBySlug } from "@/lib/products";
import { ctvProductForSlug, priceSummary } from "@/lib/product-pricing";
import { PRODUCT_LOGOS_PNG } from "@/lib/product-sites";
import {
  appStoreUrl,
  freeWebExamCount,
  stripWebPaymentFeatures,
  usesAppStoreOnly,
  webTrialUrl,
} from "@/lib/store-policy";
import { publicUrl, SITE_URL } from "@/lib/utils";
import { hreflangAlternates, openGraphLocale, productJsonLd } from "@/lib/seo";
import type { Locale } from "@/types";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale as Locale);
  if (!product) return {};
  const title = product.seo_title || product.name;
  const description = product.seo_description || product.description;
  // This page is the canonical, indexable description of the product in each
  // locale. The product's own site (often a Flutter web app) is linked from it.
  const path = `/products/${slug}`;
  const canonical = publicUrl(locale, path);
  // Original PNG for crawlers, also when the page renders from the seed fallback.
  const ogImage =
    product.og_image_url ||
    PRODUCT_LOGOS_PNG[product.slug] ||
    product.logo_url ||
    "/brand/og/og-default.jpg";
  return {
    title,
    description,
    alternates: { canonical, languages: hreflangAlternates(SITE_URL, path) },
    openGraph: {
      title: `${title} | ViMai`,
      description,
      url: canonical,
      siteName: "ViMai",
      locale: openGraphLocale(locale),
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ViMai`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(slug, locale as Locale);
  if (!product) notFound();

  const t = await getTranslations("products");
  const faqs = await getFaqs(locale as Locale, product.id);
  // Every other ViMai app, so each product page links to the whole ecosystem.
  const ecosystem = (await getLocalizedProducts(locale as Locale)).filter((item) => item.slug !== slug);
  const siteUrl = product.website_url;
  const pageUrl = publicUrl(locale, `/products/${slug}`);
  // EN/JA readers buy through Apple in the app, never on the web (see store-policy.ts).
  const appStoreOnly = usesAppStoreOnly(slug, locale);
  const features = appStoreOnly ? stripWebPaymentFeatures(product.features) : product.features;
  // Until the App Store listing is live, EN/JA readers can still try the free
  // exams on the product site. The link never mentions price, payment or VIP.
  const trialUrl = webTrialUrl(slug, locale, siteUrl);
  const freeExams = freeWebExamCount(slug);
  // Known web price (single source: ctv-core). VND is never quoted where the page sends readers to Apple.
  const ctvProduct = ctvProductForSlug(slug);
  const pricing = ctvProduct
    ? { vipVnd: priceSummary(ctvProduct).listVnd, showVnd: !appStoreOnly }
    : null;

  return (
    <article className="container py-16 lg:py-24">
      <JsonLd
        data={productJsonLd({
          product,
          siteUrl: SITE_URL,
          pageUrl,
          locale,
          iosUrl: appStoreUrl(slug),
          faqs,
          pricing,
        })}
      />

      <Button asChild variant="ghost" className="mb-10 -ml-2 min-h-11 px-2">
        <Link href="/products">← {t("back")}</Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
        <div className="flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft">
          <ProductMark src={product.logo_url} alt={product.name} size="lg" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-500">{product.tagline}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{product.description}</p>
          {appStoreOnly ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">{t("appStoreNote")}</p>
          ) : product.long_description ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
              {product.long_description}
            </p>
          ) : null}

          {product.target_audience ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold tracking-tight">{t("audience")}</h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                {product.target_audience}
              </p>
            </div>
          ) : null}

          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">{t("features")}</h2>
            <div className="mt-5">
              <FeatureList features={features} />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">{t("howToStart")}</h2>
            <ol className="mt-5 max-w-3xl list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600 sm:text-[0.95rem]">
              <li>{t("howToStartStep1")}</li>
              <li>{t(appStoreOnly ? "appStoreStep2" : "howToStartStep2")}</li>
              <li>{t(appStoreOnly ? "appStoreStep3" : "howToStartStep3")}</li>
            </ol>
            {appStoreOnly ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <AppStoreButton
                  href={appStoreUrl(slug)}
                  label={t("comingSoon")}
                  linkLabel={t("downloadOnAppStore")}
                  className="min-h-11"
                />
                {trialUrl ? (
                  <Button asChild className="min-h-11">
                    <a href={trialUrl} target="_blank" rel="noopener noreferrer">
                      {freeExams
                        ? t("tryFreeOnWeb", { count: freeExams })
                        : t("tryFreeOnWebGeneric")}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
            ) : siteUrl ? (
              <Button asChild className="mt-6 min-h-11">
                <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                  {t("openSite")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{t("download")}</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <AppStoreButton
                  href={appStoreOnly ? appStoreUrl(slug) : product.app_store_url}
                  label={t(appStoreOnly ? "comingSoon" : "storeSoon")}
                  linkLabel={appStoreOnly ? t("downloadOnAppStore") : undefined}
                />
                <PlayStoreButton href={product.google_play_url} label={t("storeSoon")} />
              </div>
            </div>
            {appStoreOnly ? null : <PwaInstallGuide />}
          </div>
        </div>
      </div>

      <ProductGallery images={product.screenshots ?? []} productName={product.name} />

      {faqs.length > 0 ? (
        <section className="mt-20 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">{t("relatedFaq")}</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}

      <EcosystemLinks products={ecosystem} title={t("ecosystemTitle")} lead={t("ecosystemLead")} />
    </article>
  );
}
