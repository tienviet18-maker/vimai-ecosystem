import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppStoreButton } from "@/components/shared/AppStoreButton";
import { PlayStoreButton } from "@/components/shared/PlayStoreButton";
import { ProductGallery } from "@/components/shared/ProductGallery";
import { FeatureList } from "@/components/shared/FeatureList";
import { StatusBadge } from "@/components/shared/StatusBadge";
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
import type { Locale } from "@/types";

export const runtime = "edge";

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

  return (
    <article className="container py-16 lg:py-24">
      <Button asChild variant="ghost" className="mb-10 -ml-2 px-2">
        <Link href="/products">← {t("back")}</Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft">
          <Image
            src={product.logo_url}
            alt={product.name}
            width={320}
            height={320}
            className="mx-auto h-44 w-44 rounded-3xl object-cover shadow-soft"
            priority
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-500">{product.tagline}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{product.description}</p>

          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">{t("features")}</h2>
            <div className="mt-5">
              <FeatureList features={product.features} />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">{t("download")}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <AppStoreButton href={product.app_store_url} label={t("storeSoon")} />
              <PlayStoreButton href={product.google_play_url} label={t("storeSoon")} />
              {product.website_url ? (
                <Button asChild variant="outline">
                  <a href={product.website_url} target="_blank" rel="noopener noreferrer">
                    {t("website")}
                  </a>
                </Button>
              ) : null}
            </div>
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
