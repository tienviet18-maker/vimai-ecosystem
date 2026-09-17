import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { LocalizedProduct } from "@/types";
import { ProductMark } from "@/components/shared/ProductMark";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ProductCard({ product }: { product: LocalizedProduct }) {
  const t = useTranslations("common");

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full no-underline">
      <article className="flex h-full flex-col border-t border-slate-200 pt-6 transition-colors duration-300 group-hover:border-primary">
        <ProductMark src={product.logo_url} alt={product.name} />
        <div className="mt-5 flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-medium leading-snug tracking-tight">{product.name}</h3>
            <span className="shrink-0 pt-0.5">
              <StatusBadge status={product.status} />
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.tagline}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary">
            {t("learnMore")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
