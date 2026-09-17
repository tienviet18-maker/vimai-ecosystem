import { Link } from "@/lib/i18n/navigation";
import type { LocalizedProduct } from "@/types";
import { ProductMark } from "@/components/shared/ProductMark";
import { cn } from "@/lib/utils";

function ProductNode({
  product,
  size,
  className,
}: {
  product: LocalizedProduct;
  size: "sm" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative z-10 flex flex-col items-center gap-2.5 text-center no-underline",
        className,
      )}
    >
      <span className="transition-transform duration-300 group-hover:scale-[1.02]">
        <ProductMark
          src={product.logo_url}
          alt={product.name}
          size={size}
          priority={size === "lg"}
        />
      </span>
      <span
        className={cn(
          "max-w-[7.5rem] text-[12px] font-medium leading-snug tracking-tight text-slate-800 sm:max-w-[9rem]",
          size === "lg" && "text-[13px] sm:text-sm",
        )}
      >
        {product.name}
      </span>
    </Link>
  );
}

export function EcosystemStage({
  products,
  label,
}: {
  products: LocalizedProduct[];
  label: string;
}) {
  const center = products.find((item) => item.featured) ?? products[0];
  if (!center) return null;

  const satellites = products.filter((item) => item.id !== center.id);
  const [top, left, right, bottom] = [
    satellites[0],
    satellites[1],
    satellites[2],
    satellites[3],
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
      aria-label={label}
    >
      <div className="relative hidden aspect-square lg:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-200/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[16%] h-[68%] w-px -translate-x-1/2 bg-navy-200/80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[16%] top-1/2 h-px w-[68%] -translate-y-1/2 bg-navy-200/80"
        />

        <div className="relative grid h-full grid-cols-3 grid-rows-3 items-center justify-items-center">
          <div />
          {top ? <ProductNode product={top} size="sm" /> : <div />}
          <div />
          {left ? <ProductNode product={left} size="sm" /> : <div />}
          <ProductNode product={center} size="lg" />
          {right ? <ProductNode product={right} size="sm" /> : <div />}
          <div />
          {bottom ? <ProductNode product={bottom} size="sm" /> : <div />}
          <div />
        </div>
      </div>

      <div className="lg:hidden">
        <ProductNode product={center} size="lg" className="mx-auto" />
        {satellites.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {satellites.map((product) => (
              <li key={product.slug} className="flex justify-center">
                <ProductNode product={product} size="sm" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
