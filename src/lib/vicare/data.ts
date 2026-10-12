import { getLocalizedProducts } from "@/lib/products";
import { localizeProduct, seedProducts } from "@/lib/seed";
import type { Locale, LocalizedProduct } from "@/types";
import { VICARE_SLUG } from "./index.ts";

/**
 * ViCare's product record plus every other ViMai product (for the ecosystem
 * block). The record comes from D1 when it has a ViCare row; otherwise from
 * the seed, so the ViCare pages render before the D1 migration is applied.
 */
export async function getVicareContext(
  locale: Locale,
): Promise<{ vicare: LocalizedProduct; others: LocalizedProduct[] }> {
  const products = await getLocalizedProducts(locale);
  const seed = seedProducts.find((item) => item.slug === VICARE_SLUG);
  const vicare = products.find((item) => item.slug === VICARE_SLUG) ?? localizeProduct(seed!, locale);
  return { vicare, others: products.filter((item) => item.slug !== VICARE_SLUG) };
}
