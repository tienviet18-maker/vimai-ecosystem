"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales, type Locale } from "@/types";

const labels: Record<Locale, string> = {
  ja: "日本語",
  vi: "Tiếng Việt",
  en: "English",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-xl text-slate-600" aria-label={t("language")}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{labels[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => router.replace(pathname, { locale: code })}
          >
            <span className="flex w-full items-center justify-between gap-4">
              {labels[code]}
              {locale === code ? <Check className="h-4 w-4" /> : null}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
