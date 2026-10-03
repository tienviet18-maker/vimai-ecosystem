import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, HeartPulse, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductEcosystemStrip } from "@/components/shared/ProductEcosystemStrip";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { FeedbackForm } from "@/components/shared/FeedbackForm";
import { JsonLd } from "@/components/shared/JsonLd";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedProducts } from "@/lib/products";
import { getApprovedReviews } from "@/lib/reviews";
import { CONTACT_EMAIL, CONTACT_FACEBOOK_URL } from "@/lib/contact";
import { SITE_URL } from "@/lib/utils";
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
  const about = await getTranslations("about");
  const products = await getLocalizedProducts(locale as Locale);
  const featured = products.filter((item) => item.featured);
  const reviews = await getApprovedReviews(locale as Locale);
  const pillars = [
    { icon: BookOpen, title: t("learnTitle"), body: t("learnBody") },
    { icon: Briefcase, title: t("workTitle"), body: t("workBody") },
    { icon: HeartPulse, title: t("liveTitle"), body: t("liveBody") },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ViMai",
          url: SITE_URL,
          logo: `${SITE_URL}/brand/vimai-logo-trim.png`,
          description: t("lead"),
          email: CONTACT_EMAIL,
          sameAs: [CONTACT_FACEBOOK_URL],
          contactPoint: {
            "@type": "ContactPoint",
            email: CONTACT_EMAIL,
            contactType: "customer support",
            url: CONTACT_FACEBOOK_URL,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ninh Binh",
            addressCountry: "VN",
          },
          knowsAbout: [
            "Specified Skilled Worker",
            "Tokutei Gino",
            "education technology",
            "Japanese language study",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "ViMai product ecosystem",
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: `${SITE_URL}/products/${product.slug}`,
            })),
          },
        }}
      />
      <section aria-labelledby="hero-heading" className="border-b border-slate-200/80 bg-white">
        <div className="container py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="text-[1.85rem] font-semibold leading-[1.28] text-slate-900 sm:text-[2.25rem] lg:text-[2.5rem]"
            >
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              {t("lead")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
          <div className="mt-10 lg:mt-14">
            <ProductEcosystemStrip products={products} label={t("ecosystemTitle")} />
          </div>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-b border-slate-200/80 bg-white"
      >
        <div className="container max-w-3xl py-16 lg:py-20">
          <h2 id="about-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            {about("title")}
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">{about("missionP1")}</p>
          <p className="mt-5 text-base leading-8 text-slate-600">{about("missionP2")}</p>
          <p className="mt-5 text-base leading-8 text-slate-600">{about("missionP3")}</p>
        </div>
      </section>

      <section id="products" aria-labelledby="products-heading" className="container py-16 lg:py-20">
        <h2 id="products-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {t("ecosystemTitle")}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">{t("productsLead")}</p>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white">
        <div className="container py-16 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            {t("lwlTitle")}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-200/80 bg-navy-50/40 px-6 py-7"
              >
                <pillar.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {t("pillarsTitle")}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <h3 className="text-lg font-semibold">{t("pillar1Title")}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">{t("pillar1Body")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("pillar2Title")}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">{t("pillar2Body")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("pillar3Title")}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">{t("pillar3Body")}</p>
          </div>
        </div>
      </section>

      {featured[0] ? (
        <section className="border-y border-slate-200/80 bg-white">
          <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {t("showcaseEyebrow")}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                {featured[0].name}
              </h2>
              <p className="mt-4 leading-8 text-slate-500">{featured[0].description}</p>
              <Button asChild className="mt-8">
                <Link href={`/products/${featured[0].slug}`}>{t("ctaProducts")}</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center rounded-[1.75rem] border border-slate-200/80 bg-navy-50/80 p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured[0].hero_image_url || featured[0].logo_url}
                alt={featured[0].name}
                width={288}
                height={288}
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-72 w-auto object-contain"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="container py-16 lg:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {t("feedbackTitle")}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">{t("feedbackLead")}</p>
        {reviews.length === 0 ? (
          <p className="mt-8 text-slate-500">{t("feedbackEmpty")}</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reviews.slice(0, 4).map((review) => (
              <blockquote
                key={review.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-6"
              >
                <p className="leading-7 text-slate-700">“{review.body}”</p>
                <footer className="mt-4 text-sm font-medium text-slate-500">
                  {review.display_name}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
        <div className="mt-12 max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-semibold">{t("feedbackCta")}</h3>
          <div className="mt-6">
            <FeedbackForm products={products} />
          </div>
        </div>
      </section>
    </>
  );
}
