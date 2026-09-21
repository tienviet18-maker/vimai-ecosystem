import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/shared/BrandMark";
import { ContactChannels } from "@/components/shared/ContactChannels";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedProducts } from "@/lib/products";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";
import type { Locale } from "@/types";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const products = await getLocalizedProducts(locale);

  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16 lg:py-16">
        <div className="lg:col-span-2">
          <BrandMark compact />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
            {tBrand("tagline")}
          </p>
          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t("contact")}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <span className="text-slate-400">{t("emailLabel")}: </span>
                <a href={CONTACT_MAILTO} className="hover:text-primary">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <span className="text-slate-400">{t("addressLabel")}: </span>
                {t("address")}
              </li>
            </ul>
            <ContactChannels className="mt-4" />
          </div>
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
        <div className="container flex flex-col items-center gap-1 py-6 text-center">
          <p className="text-xs tracking-wide text-slate-400">{t("legal")}</p>
          <p className="text-xs tracking-wide text-slate-400">{tBrand("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
