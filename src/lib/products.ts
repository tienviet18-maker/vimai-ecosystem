import { localizeProduct, seedProducts } from "@/lib/seed";
import { asBool, getDb, parseJson } from "@/lib/cloudflare";
import { resolveProductLogo, resolveProductSite } from "@/lib/product-sites";
import type {
  Locale,
  LocalizedProduct,
  Product,
  ProductImage,
  ProductStatus,
} from "@/types";

type ProductRow = {
  id: string;
  slug: string;
  status: ProductStatus;
  category: string | null;
  app_store_url: string | null;
  google_play_url: string | null;
  website_url: string | null;
  featured: number;
  sort_order: number;
  logo_url: string | null;
  icon_url: string | null;
  hero_image_url: string | null;
  og_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  target_audience: string | null;
  supported_languages: string | null;
  published: number;
  created_at: string;
  updated_at: string;
};

type TranslationRow = {
  product_id: string;
  locale: Locale;
  name: string;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  features: string | null;
  seo_title: string | null;
  seo_description: string | null;
  target_audience: string | null;
};

type ImageRow = ProductImage & { product_id: string };

function toProduct(
  row: ProductRow,
  translations: TranslationRow[],
  images: ImageRow[],
): Product {
  const screenshots = images
    .filter((item) => item.kind === "screenshot" || item.kind === "gallery" || !item.kind)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    category: row.category,
    app_store_url: row.app_store_url,
    google_play_url: row.google_play_url,
    featured: asBool(row.featured),
    sort_order: row.sort_order,
    logo_url: resolveProductLogo(row.slug, row.logo_url),
    icon_url: row.icon_url ?? resolveProductLogo(row.slug, row.logo_url),
    hero_image_url: row.hero_image_url ?? resolveProductLogo(row.slug, row.logo_url),
    og_image_url: row.og_image_url ?? resolveProductLogo(row.slug, row.logo_url),
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    target_audience: row.target_audience,
    supported_languages: parseJson<Locale[]>(row.supported_languages, ["vi", "en", "ja"]),
    screenshots,
    published: asBool(row.published),
    created_at: row.created_at,
    updated_at: row.updated_at,
    website_url: resolveProductSite(row.slug, row.website_url),
    translations: translations.map((item) => ({
      locale: item.locale,
      name: item.name,
      tagline: item.tagline ?? "",
      description: item.description ?? "",
      long_description: item.long_description ?? undefined,
      features: parseJson<string[]>(item.features, []),
      seo_title: item.seo_title ?? undefined,
      seo_description: item.seo_description ?? undefined,
      target_audience: item.target_audience ?? undefined,
    })),
  };
}

async function fetchFromD1(): Promise<Product[] | null> {
  const db = getDb();
  if (!db) return null;

  const products = await db.prepare("SELECT * FROM products ORDER BY sort_order ASC").all<ProductRow>();
  if (!products.results?.length) return [];

  const translations = await db.prepare("SELECT * FROM product_translations").all<TranslationRow>();
  const images = await db.prepare("SELECT * FROM product_images ORDER BY sort_order ASC").all<ImageRow>();

  return products.results.map((row) =>
    toProduct(
      row,
      (translations.results ?? []).filter((item) => item.product_id === row.id),
      (images.results ?? []).filter((item) => item.product_id === row.id),
    ),
  );
}

export async function getProducts(options?: {
  publishedOnly?: boolean;
}): Promise<Product[]> {
  const publishedOnly = options?.publishedOnly ?? true;

  try {
    const remote = await fetchFromD1();
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
  options?: { preview?: boolean },
): Promise<LocalizedProduct | null> {
  const products = await getProducts({ publishedOnly: !options?.preview });
  const match = products.find((item) => item.slug === slug);
  return match ? localizeProduct(match, locale) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts({ publishedOnly: false });
  return products.find((item) => item.id === id) ?? null;
}
