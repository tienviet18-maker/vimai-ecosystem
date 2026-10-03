import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { resolveTrialUrl } from "@/lib/product-sites";
import type { LocalizedProduct } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductMark } from "@/components/shared/ProductMark";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ProductCard({ product }: { product: LocalizedProduct }) {
  const t = useTranslations("products");
  const highlights = product.features.slice(0, 3);
  const trialUrl = resolveTrialUrl(product.status, product.website_url);

  return (
    <div className="group h-full">
      <Card className="relative flex h-full flex-col overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-navy-200 group-hover:shadow-lift">
        <div className="flex items-center justify-center bg-navy-50/70 px-6 py-6">
          <ProductMark src={product.logo_url} alt={product.name} />
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6 py-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-snug tracking-tight sm:text-[1.05rem]">
              {product.name}
            </h3>
            <span className="shrink-0 pt-0.5">
              <StatusBadge status={product.status} />
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">{product.tagline}</p>
          {product.target_audience ? (
            <p className="text-sm leading-6 text-slate-500">
              <span className="font-medium text-slate-700">{t("audience")}: </span>
              {product.target_audience}
            </p>
          ) : null}
          {highlights.length > 0 ? (
            <ul className="space-y-1.5 text-sm leading-6 text-slate-500">
              {highlights.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary no-underline after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
            >
              {t("explore")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            {trialUrl ? (
              <a
                href={trialUrl}
                target="_blank"
                rel="noopener"
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-xl border border-primary bg-white px-3.5 text-sm font-medium text-primary no-underline hover:bg-primary hover:text-primary-foreground"
              >
                {t("tryFree")}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}
