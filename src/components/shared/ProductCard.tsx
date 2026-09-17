import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { LocalizedProduct } from "@/types";
import { Card } from "@/components/ui/card";
import { ProductMark } from "@/components/shared/ProductMark";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ProductCard({ product }: { product: LocalizedProduct }) {
  const t = useTranslations("common");

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full no-underline">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-navy-200 group-hover:shadow-lift">
        <div className="flex items-center justify-center bg-navy-50/90 px-6 py-7">
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
          <p className="text-sm font-medium leading-6 text-primary/85">{product.tagline}</p>
          <p className="line-clamp-3 text-sm leading-7 text-slate-500">{product.description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary">
            {t("learnMore")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
