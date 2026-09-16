import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedProducts } from "@/lib/products";
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

  const pillars = [
    { icon: BookOpen, title: t("pillar1Title"), body: t("pillar1Body") },
    { icon: Sparkles, title: t("pillar2Title"), body: t("pillar2Body") },
    { icon: ShieldCheck, title: t("pillar3Title"), body: t("pillar3Body") },
  ];

  return (
    <>
      <section className="border-b border-slate-200/80 bg-white">
        <div className="container grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.25] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg sm:leading-8">
              {t("lead")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
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
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-2xl border border-slate-200/80 bg-navy-50/70 p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.logo_url}
                  alt={product.name}
                  className="mx-auto h-20 w-20 rounded-2xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.03] sm:h-24 sm:w-24"
                />
                <p className="mt-4 text-sm font-medium tracking-tight text-slate-800">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 lg:py-24">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
              {t("productsTitle")}
            </h2>
            <p className="mt-3 leading-7 text-slate-500">{t("productsLead")}</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/products">
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white">
        <div className="container py-20 lg:py-24">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
            {t("pillarsTitle")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-200/80 bg-navy-50/40 p-7 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-white px-8 py-14 text-center shadow-soft sm:px-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">{t("ctaBody")}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">{t("ctaContact")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
