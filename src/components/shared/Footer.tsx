import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/shared/BrandMark";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedProducts } from "@/lib/products";
import type { Locale } from "@/types";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const products = await getLocalizedProducts(locale);

  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="container grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16 lg:py-20">
        <div className="lg:col-span-2">
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
            {tBrand("tagline")}
          </p>
        </div>
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t("products")}
          </h2>
          <ul className="mt-5 space-y-3">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-sm text-slate-600 transition-colors duration-300 hover:text-primary"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t("company")}
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href="/articles" className="text-sm text-slate-600 hover:text-primary">
                {tNav("articles")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-slate-600 hover:text-primary">
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-sm text-slate-600 hover:text-primary">
                {tNav("support")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-slate-600 hover:text-primary">
                {tNav("contact")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-primary">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-primary">
                {t("terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/80">
        <p className="container py-5 text-center text-xs tracking-wide text-slate-400">
          {t("legal")}
        </p>
      </div>
    </footer>
  );
}
