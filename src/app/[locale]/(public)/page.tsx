import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, HeartPulse, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { FeedbackForm } from "@/components/shared/FeedbackForm";
import { JsonLd } from "@/components/shared/JsonLd";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedProducts } from "@/lib/products";
import { getApprovedReviews } from "@/lib/reviews";
import { CONTACT_EMAIL, CONTACT_FACEBOOK_URL } from "@/lib/contact";
import { SITE_URL } from "@/lib/utils";
import { localizedUrl } from "@/lib/seo";
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
  const principles = [
    { title: t("pillar1Title"), body: t("pillar1Body") },
    { title: t("pillar2Title"), body: t("pillar2Body") },
    { title: t("pillar3Title"), body: t("pillar3Body") },
  ];
  const reviews = await getApprovedReviews(locale as Locale);
  const heroFacts = [
    { value: String(products.length), label: t("factApps") },
    { value: "3", label: t("factLanguages") },
    { value: t("factPlatformsValue"), label: t("factPlatforms") },
  ];
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
            "Japanese driving licence theory test",
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
              url: localizedUrl(SITE_URL, locale, `/products/${product.slug}`),
            })),
          },
        }}
      />
      <section aria-labelledby="hero-heading" className="border-b border-slate-200/80 bg-white">
        <div className="container grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {t("heroEyebrow")}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-[34rem] text-[2rem] [word-break:auto-phrase] font-semibold leading-[1.2] tracking-tight text-slate-900 sm:text-[2.5rem] lg:text-[2.75rem]"
            >
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-slate-600 sm:text-[1.0625rem]">
              {t("heroLead")}
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
            <dl className="mt-10 grid max-w-[34rem] grid-cols-3 divide-x divide-slate-200/80 border-y border-slate-200/80 py-4">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="px-3 first:pl-0 sm:px-4">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="whitespace-nowrap text-base font-semibold tracking-tight text-slate-900 sm:text-lg">{fact.value}</dd>
                  <dd className="mt-0.5 text-[13px] leading-5 text-slate-500">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <nav aria-label={t("ecosystemTitle")}>
            <ul className="grid grid-cols-3 gap-3 sm:gap-4">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-navy-50/50 p-3 text-center no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.logo_url}
                      alt=""
                      width={64}
                      height={64}
                      decoding="async"
                      className="h-12 w-12 rounded-xl object-contain sm:h-16 sm:w-16"
                    />
                    <span className="line-clamp-2 text-[12px] font-medium leading-4 text-slate-700 sm:text-[13px]">
                      {product.name.split(/\s*[（(]| [–-] /)[0]}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 p-3 text-center text-[13px] font-medium text-primary no-underline transition-colors hover:bg-navy-50/50"
                >
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  {t("viewAll")}
                </Link>
              </li>
            </ul>
          </nav>
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

      <section id="about" aria-labelledby="about-heading" className="container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="about-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {about("title")}
            </h2>
            <p className="mt-5 leading-8 text-slate-600">{t("aboutLead")}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              {t("aboutMore")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              {t("pillarsTitle")}
            </h3>
            <dl className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
              {principles.map((item) => (
                <div key={item.title} className="py-5 sm:grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-semibold text-slate-900">{item.title}</dt>
                  <dd className="mt-1 leading-7 text-slate-600 sm:mt-0">{item.body}</dd>
                </div>
              ))}
            </dl>
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
