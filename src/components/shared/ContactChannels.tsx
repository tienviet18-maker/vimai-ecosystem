"use client";

import { Facebook, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  CONTACT_EMAIL,
  CONTACT_FACEBOOK_MESSAGE_URL,
  CONTACT_FACEBOOK_URL,
  CONTACT_MAILTO,
  CONTACT_ZALO_URL,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

function ZaloMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
      alt="Zalo"
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

const iconButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const textButtonClass =
  "inline-flex min-h-11 items-center rounded-full border border-slate-200/90 bg-white px-4 text-sm font-medium text-slate-700 shadow-soft transition-colors hover:border-navy-200 hover:text-primary";

export function ContactChannels({
  variant = "footer",
  className,
}: {
  variant?: "footer" | "floating" | "page";
  className?: string;
}) {
  const t = useTranslations("contact");

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        variant === "floating" && "flex-col",
        variant === "page" && "flex-wrap",
        className,
      )}
    >
      <a
        href={CONTACT_ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label={t("zaloAria")}
      >
        <ZaloMark className="h-6 w-6" />
      </a>

      <a
        href={CONTACT_FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label={t("facebookAria")}
      >
        <Facebook className="h-5 w-5" />
      </a>

      {variant === "page" ? (
        <>
          <a
            href={CONTACT_FACEBOOK_MESSAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={textButtonClass}
          >
            {t("facebookMessage")}
          </a>
          <a href={CONTACT_MAILTO} className={textButtonClass}>
            {CONTACT_EMAIL}
          </a>
        </>
      ) : (
        <a href={CONTACT_MAILTO} className={iconButtonClass} aria-label={t("emailAria")}>
          <Mail className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
