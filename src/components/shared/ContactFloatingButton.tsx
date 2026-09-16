"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { CONTACT_EMAIL } from "@/lib/utils";

export function ContactFloatingButton() {
  const t = useTranslations("floating");

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <Link
        href="/contact"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium tracking-wide text-white shadow-lift transition-all duration-300 hover:bg-navy-700 hover:shadow-soft"
        aria-label={t("label")}
      >
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">{t("label")}</span>
      </Link>
      <a href={`mailto:${CONTACT_EMAIL}`} className="sr-only">
        {t("email")}: {CONTACT_EMAIL}
      </a>
    </div>
  );
}
