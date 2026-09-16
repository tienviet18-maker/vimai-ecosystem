import { getProducts } from "@/lib/products";
import { routing } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/utils";

export const runtime = "edge";

export default async function sitemap() {
  const products = await getProducts();
  const staticPaths = ["", "/products", "/about", "/support", "/contact"];

  const entries = routing.locales.flatMap((locale) => {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    const pages = staticPaths.map((path) => ({
      url: `${SITE_URL}${prefix}${path || "/"}`,
      lastModified: new Date(),
    }));
    const productPages = products.map((product) => ({
      url: `${SITE_URL}${prefix}/products/${product.slug}`,
      lastModified: new Date(),
    }));
    return [...pages, ...productPages];
  });

  return entries;
}
