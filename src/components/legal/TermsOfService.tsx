import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

const SECTIONS = ["scope", "useOfSite", "products", "liability", "law"] as const;

export async function TermsOfService() {
  const t = await getTranslations("legal");

  return (
    <article className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t("termsTitle")}</h1>
      <p className="mt-3 text-sm text-slate-500">{t("termsUpdated")}</p>
      <p className="mt-6 leading-8 text-slate-600">{t("termsIntro")}</p>

      {SECTIONS.map((key) => (
        <section key={key} className="mt-10" aria-labelledby={`terms-${key}`}>
          <h2 id={`terms-${key}`} className="text-xl font-semibold tracking-tight">
            {t(`terms${capitalize(key)}Title`)}
          </h2>
          <p className="mt-3 leading-8 text-slate-600">{t(`terms${capitalize(key)}Body`)}</p>
        </section>
      ))}

      <p className="mt-10 text-sm leading-7 text-slate-500">
        <Link href="/privacy" className="text-primary hover:underline">
          {t("privacyTitle")}
        </Link>
      </p>
    </article>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
