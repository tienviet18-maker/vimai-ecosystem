import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getPublishedArticles } from "@/lib/articles";
import { routing } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/utils";
import { sitemapEntries } from "@/lib/seo";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const articles = await getPublishedArticles("vi");
  const staticPaths = ["", "/products", "/about", "/support", "/contact", "/articles", "/privacy", "/terms"];
  const locales = routing.locales;

  return [
    ...staticPaths.flatMap((path) => sitemapEntries(SITE_URL, path, locales)),
    ...products.flatMap((product) =>
      sitemapEntries(SITE_URL, `/products/${product.slug}`, locales, product.updated_at),
    ),
    // Only the locales an article is really translated into (no fallback copies).
    ...articles.flatMap((article) =>
      sitemapEntries(SITE_URL, `/articles/${article.slug}`, article.locales ?? ["vi"], article.updated_at),
    ),
  ];
}
