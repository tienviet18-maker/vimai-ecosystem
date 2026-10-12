import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";
import type { LocalizedProduct } from "@/types";
import { ProductMark } from "@/components/shared/ProductMark";

export function ProductEcosystemStrip({
  products,
  label,
}: {
  products: LocalizedProduct[];
  label: string;
}) {
  // Three per row on large screens, two on small: centre an incomplete last row.
  const count = products.length;
  const lgRemainder = count % 3;

  return (
    <div
      className="rounded-[1.75rem] border border-slate-200/80 bg-navy-50/80 p-3 sm:p-5"
      aria-label={label}
    >
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4">
        {products.map((product, index) => (
          <li
            key={product.slug}
            className={cn(
              "lg:col-span-2",
              lgRemainder === 2 && index === count - 2 && "lg:col-start-2",
              lgRemainder === 1 && index === count - 1 && "lg:col-start-3",
              count % 2 === 1 &&
                index === count - 1 &&
                "col-span-2 max-w-[12rem] justify-self-center sm:col-span-1 sm:max-w-none sm:justify-self-stretch lg:col-span-2",
            )}
          >
            <Link
              href={`/products/${product.slug}`}
              className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-white px-3 py-4 text-center no-underline shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <ProductMark src={product.logo_url} alt={product.name} size="sm" />
              <span className="text-[13px] font-medium leading-snug tracking-tight text-slate-800">
                {product.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
