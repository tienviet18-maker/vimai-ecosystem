import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { ProductMark } from "@/components/shared/ProductMark";
import type { LocalizedProduct } from "@/types";

/**
 * "ViMai ecosystem" block: every other ViMai product as a link card (logo,
 * name, tagline). Used at the end of product pages so each app links to the
 * whole ecosystem, not just its neighbours.
 */
export function EcosystemLinks({
  products,
  title,
  lead,
  headingId = "ecosystem-heading",
}: {
  products: LocalizedProduct[];
  title: string;
  lead?: string;
  headingId?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className="mt-20">
      <h2 id={headingId} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {lead ? <p className="mt-3 max-w-2xl leading-7 text-slate-500">{lead}</p> : null}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 no-underline shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift"
            >
              <ProductMark src={product.logo_url} alt="" size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug tracking-tight text-slate-900">
                  {product.name}
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-slate-500">{product.tagline}</span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
