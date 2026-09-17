import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { LocalizedProduct } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductMark } from "@/components/shared/ProductMark";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ProductCard({ product }: { product: LocalizedProduct }) {
  const t = useTranslations("products");
  const highlights = product.features.slice(0, 3);

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full no-underline">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-navy-200 group-hover:shadow-lift">
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
          <span className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-2 text-sm font-medium text-primary">
            {t("explore")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
