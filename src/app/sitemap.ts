import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getPublishedArticles } from "@/lib/articles";
import { routing } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/utils";
import { sitemapEntries } from "@/lib/seo";
import { VICARE_SITEMAP_PATHS, VICARE_SLUG } from "@/lib/vicare";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const articles = await getPublishedArticles("vi");
  const staticPaths = ["", "/products", "/about", "/support", "/contact", "/articles", "/privacy", "/terms"];
  const locales = routing.locales;

  return [
    ...staticPaths.flatMap((path) => sitemapEntries(SITE_URL, path, locales)),
    ...products
      .filter((product) => product.slug !== VICARE_SLUG)
      .flatMap((product) =>
        sitemapEntries(SITE_URL, `/products/${product.slug}`, locales, product.updated_at),
      ),
    // ViCare: product page, guides and privacy policy are code pages, listed
    // even before its D1 row exists.
    ...VICARE_SITEMAP_PATHS.flatMap((path) => sitemapEntries(SITE_URL, path, locales)),
    // Only the locales an article is really translated into (no fallback copies).
    ...articles.flatMap((article) =>
      sitemapEntries(SITE_URL, `/articles/${article.slug}`, article.locales ?? ["vi"], article.updated_at),
    ),
  ];
}
