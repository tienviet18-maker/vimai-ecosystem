import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactChannels } from "@/components/shared/ContactChannels";
import { EcosystemStage } from "@/components/shared/EcosystemStage";
import { FeedbackForm } from "@/components/shared/FeedbackForm";
import { ProductCatalog } from "@/components/shared/ProductCatalog";
import { ProductMark } from "@/components/shared/ProductMark";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedProducts } from "@/lib/products";
import { getApprovedReviews } from "@/lib/reviews";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const products = await getLocalizedProducts(locale as Locale);
  const featured = products.find((item) => item.featured) ?? products[0];
  const reviews = await getApprovedReviews(locale as Locale);
  const purposes = [
    { index: "01", title: t("learnTitle"), body: t("learnBody") },
    { index: "02", title: t("workTitle"), body: t("workBody") },
    { index: "03", title: t("liveTitle"), body: t("liveBody") },
  ];
  const principles = [
    { title: t("pillar1Title"), body: t("pillar1Body") },
    { title: t("pillar2Title"), body: t("pillar2Body") },
    { title: t("pillar3Title"), body: t("pillar3Body") },
  ];

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="container grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:py-20 xl:gap-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 text-[1.85rem] font-semibold leading-[1.28] text-slate-900 sm:text-[2.35rem] lg:text-[2.6rem]">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-[34rem] text-base leading-8 text-slate-500 sm:text-[1.05rem]">
              {t("lead")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  {t("ctaProducts")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{t("ctaContact")}</Link>
              </Button>
            </div>
          </div>
          <EcosystemStage products={products} label={t("ecosystemTitle")} />
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-[1.8rem]">
              {t("ecosystemTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-slate-500">
              {t("productsLead")}
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center text-sm font-medium text-primary"
          >
            {t("viewAll")}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductCatalog products={products} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container py-16 lg:py-20">
          <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-[1.8rem]">
            {t("lwlTitle")}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {purposes.map((item) => (
              <li key={item.index}>
                <p className="text-[11px] font-medium tracking-[0.2em] text-slate-400">
                  {item.index}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-[1.8rem]">
            {t("pillarsTitle")}
          </h2>
          <ul className="space-y-10">
            {principles.map((item) => (
              <li key={item.title} className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {featured ? (
        <section className="border-y border-slate-200 bg-white">
          <div className="container grid items-center gap-10 py-16 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16 lg:py-20">
            <ProductMark src={featured.logo_url} alt={featured.name} size="lg" />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                {t("showcaseEyebrow")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
                {featured.name}
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-8 text-slate-500">
                {featured.description}
              </p>
              <Button asChild className="mt-8">
                <Link href={`/products/${featured.slug}`}>
                  {t("ctaProducts")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div>
            <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-[1.8rem]">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-slate-500">
              {t("ctaBody")}
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">{t("ctaContact")}</Link>
              </Button>
            </div>
            <div className="mt-8">
              <ContactChannels />
            </div>
          </div>
          <div>
            <h2 className="text-[1.65rem] font-semibold tracking-tight sm:text-[1.8rem]">
              {t("feedbackTitle")}
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-slate-500">
              {t("feedbackLead")}
            </p>
            {reviews.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">{t("feedbackEmpty")}</p>
            ) : (
              <div className="mt-8 space-y-8">
                {reviews.slice(0, 2).map((review) => (
                  <blockquote key={review.id} className="border-l border-slate-200 pl-5">
                    <p className="text-sm leading-7 text-slate-700">“{review.body}”</p>
                    <footer className="mt-3 text-sm font-medium text-slate-500">
                      {review.display_name}
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}
            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-base font-medium">{t("feedbackCta")}</h3>
              <div className="mt-5">
                <FeedbackForm products={products} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
