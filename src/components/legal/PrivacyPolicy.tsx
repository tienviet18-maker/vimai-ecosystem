import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

const SECTIONS = [
  "who",
  "collect",
  "use",
  "legalBasis",
  "share",
  "cookies",
  "ads",
  "retention",
  "security",
  "children",
  "transfer",
  "rights",
  "contactUs",
  "changes",
] as const;

export async function PrivacyPolicy() {
  const t = await getTranslations("legal");

  return (
    <article className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t("privacyTitle")}</h1>
      <p className="mt-3 text-sm text-slate-500">{t("privacyUpdated")}</p>
      <p className="mt-6 leading-8 text-slate-600">{t("privacyIntro")}</p>

      {SECTIONS.map((key) => (
        <section key={key} className="mt-10" aria-labelledby={`privacy-${key}`}>
          <h2 id={`privacy-${key}`} className="text-xl font-semibold tracking-tight">
            {t(`${key}Title`)}
          </h2>
          <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">{t(`${key}Body`)}</p>
        </section>
      ))}

      <p className="mt-10 text-sm leading-7 text-slate-500">
        {t("privacyContactLead")}{" "}
        <a href={CONTACT_MAILTO} className="text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        .{" "}
        <Link href="/terms" className="text-primary hover:underline">
          {t("termsTitle")}
        </Link>
      </p>
    </article>
  );
}
