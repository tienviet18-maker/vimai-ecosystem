import { createClient } from "@/lib/supabase/server";
import { localizeProduct, seedProducts } from "@/lib/seed";
import { isSupabaseConfigured } from "@/lib/utils";
import type { Locale, LocalizedProduct, Product, ProductStatus } from "@/types";

type ProductRow = {
  id: string;
  slug: string;
  status: ProductStatus;
  app_store_url: string | null;
  google_play_url: string | null;
  website_url: string | null;
  featured: boolean;
  sort_order: number;
  logo_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  product_translations: Array<{
    locale: Locale;
    name: string;
    tagline: string | null;
    description: string | null;
    features: string[] | null;
  }>;
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    app_store_url: row.app_store_url,
    google_play_url: row.google_play_url,
    website_url: row.website_url,
    featured: row.featured,
    sort_order: row.sort_order,
    logo_url: row.logo_url ?? "/images/products/tokutei_taxi.png",
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
    translations: (row.product_translations ?? []).map((item) => ({
      locale: item.locale,
      name: item.name,
      tagline: item.tagline ?? "",
      description: item.description ?? "",
      features: item.features ?? [],
    })),
  };
}

async function fetchFromSupabase() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*, product_translations(*)")
    .order("sort_order", { ascending: true });

  if (error || !data) return null;
  return (data as ProductRow[]).map(toProduct);
}

export async function getProducts(options?: {
  publishedOnly?: boolean;
}): Promise<Product[]> {
  const publishedOnly = options?.publishedOnly ?? true;

  try {
    const remote = await fetchFromSupabase();
    if (remote && remote.length > 0) {
      return publishedOnly ? remote.filter((item) => item.published) : remote;
    }
  } catch {
    /* fall back to seed data */
  }

  const local = seedProducts;
  return publishedOnly ? local.filter((item) => item.published) : local;
}

export async function getLocalizedProducts(
  locale: Locale,
  options?: { publishedOnly?: boolean; featuredOnly?: boolean },
): Promise<LocalizedProduct[]> {
  let products = await getProducts(options);
  if (options?.featuredOnly) {
    products = products.filter((item) => item.featured);
  }
  return products
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => localizeProduct(item, locale));
}

export async function getProductBySlug(
  slug: string,
  locale: Locale,
): Promise<LocalizedProduct | null> {
  const products = await getProducts({ publishedOnly: true });
  const match = products.find((item) => item.slug === slug);
  return match ? localizeProduct(match, locale) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts({ publishedOnly: false });
  return products.find((item) => item.id === id) ?? null;
}
