import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";
import type { LocalizedProduct } from "@/types";

export function ProductGrid({ products }: { products: LocalizedProduct[] }) {
  const five = products.length === 5;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
      {products.map((product, index) => (
        <div
          key={product.slug}
          className={cn(
            "lg:col-span-2",
            five && index === 3 && "lg:col-start-2",
            five &&
              index === 4 &&
              "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-0.75rem)] lg:col-span-2 lg:mx-0 lg:max-w-none",
          )}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
