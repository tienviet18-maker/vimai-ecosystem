import { getProducts } from "@/lib/products";
import { getPublishedArticles } from "@/lib/articles";
import { routing } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/utils";

export const runtime = "edge";

export default async function sitemap() {
  const products = await getProducts();
  const articles = await getPublishedArticles("vi");
  const staticPaths = ["", "/products", "/about", "/support", "/contact", "/articles", "/privacy", "/terms"];

  const entries = routing.locales.flatMap((locale) => {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    const pages = staticPaths.map((path) => ({
      url: `${SITE_URL}${prefix}${path || "/"}`,
    }));
    const productPages = products.map((product) => ({
      url: `${SITE_URL}${prefix}/products/${product.slug}`,
      ...(product.updated_at ? { lastModified: new Date(product.updated_at) } : {}),
    }));
    const articlePages = articles.map((article) => ({
      url: `${SITE_URL}${prefix}/articles/${article.slug}`,
      ...(article.updated_at ? { lastModified: new Date(article.updated_at) } : {}),
    }));
    return [...pages, ...productPages, ...articlePages];
  });

  return entries;
}
