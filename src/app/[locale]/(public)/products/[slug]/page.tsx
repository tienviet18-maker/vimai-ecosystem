import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { AppStoreButton } from "@/components/shared/AppStoreButton";
import { PlayStoreButton } from "@/components/shared/PlayStoreButton";
import { ProductGallery } from "@/components/shared/ProductGallery";
import { PwaInstallGuide } from "@/components/shared/PwaInstallGuide";
import { FeatureList } from "@/components/shared/FeatureList";
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
import { getProductBySlug } from "@/lib/products";
import { appStoreUrl, stripWebPaymentFeatures, usesAppStoreOnly } from "@/lib/store-policy";
import { publicUrl, SITE_URL } from "@/lib/utils";
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
  const canonical = product.website_url || publicUrl(locale, `/products/${slug}`);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ViMai`,
      description,
      url: canonical,
      siteName: "ViMai",
      type: "website",
      images: [product.og_image_url || product.logo_url || "/brand/og/og-default.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ViMai`,
      description,
      images: [product.og_image_url || product.logo_url || "/brand/og/og-default.jpg"],
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
  const siteUrl = product.website_url;
  const pageUrl = publicUrl(locale, `/products/${slug}`);
  // EN/JA readers buy through Apple in the app, never on the web (see store-policy.ts).
  const appStoreOnly = usesAppStoreOnly(slug, locale);
  const features = appStoreOnly ? stripWebPaymentFeatures(product.features) : product.features;

  return (
    <article className="container py-16 lg:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          applicationCategory: "EducationalApplication",
          operatingSystem: "iOS, Android, Web",
          description: product.description,
          image: `${SITE_URL}${product.logo_url}`,
          url: pageUrl,
          sameAs: siteUrl ? [siteUrl] : undefined,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/PreOrder",
            price: "0",
            priceCurrency: "JPY",
          },
          isPartOf: {
            "@type": "WebSite",
            name: "ViMai",
            url: SITE_URL,
          },
        }}
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
              <AppStoreButton
                href={appStoreUrl(slug)}
                label={t("comingSoon")}
                linkLabel={t("downloadOnAppStore")}
                className="mt-6 min-h-11"
              />
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
    </article>
  );
}
