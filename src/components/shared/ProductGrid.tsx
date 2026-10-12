import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";
import type { LocalizedProduct } from "@/types";

export function ProductGrid({ products }: { products: LocalizedProduct[] }) {
  // Three cards per row on large screens, two on small: centre an incomplete last row.
  const count = products.length;
  const lgRemainder = count % 3;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
      {products.map((product, index) => (
        <div
          key={product.slug}
          className={cn(
            "lg:col-span-2",
            lgRemainder === 2 && index === count - 2 && "lg:col-start-2",
            lgRemainder === 1 && index === count - 1 && "lg:col-start-3",
            count % 2 === 1 &&
              index === count - 1 &&
              "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-0.75rem)] lg:col-span-2 lg:mx-0 lg:max-w-none",
          )}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
