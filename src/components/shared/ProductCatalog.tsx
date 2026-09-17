import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { LocalizedProduct } from "@/types";
import { ProductMark } from "@/components/shared/ProductMark";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ProductCatalog({ products }: { products: LocalizedProduct[] }) {
  const t = useTranslations("common");

  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200">
      {products.map((product) => (
        <li key={product.slug}>
          <Link
            href={`/products/${product.slug}`}
            className="group grid grid-cols-[auto_1fr] items-center gap-4 py-5 no-underline sm:grid-cols-[auto_1fr_auto] sm:gap-6 sm:py-6"
          >
            <ProductMark src={product.logo_url} alt="" size="sm" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h3 className="text-[1.05rem] font-medium tracking-tight text-slate-900">
                  {product.name}
                </h3>
                <StatusBadge status={product.status} />
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500 sm:line-clamp-1">
                {product.tagline}
              </p>
            </div>
            <span className="col-span-2 mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary sm:col-span-1 sm:mt-0 sm:justify-self-end">
              {t("learnMore")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
