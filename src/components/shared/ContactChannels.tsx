"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_ZALO_URL,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

function ZaloMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="#0068FF" />
      <path
        d="M8.1 8.2h2.15c1.86 0 3.05 1.08 3.05 2.78 0 1.74-1.24 2.82-3.18 2.82H9.55V15.8H8.1V8.2Zm1.45 1.22v3.02h.86c1.08 0 1.72-.58 1.72-1.52 0-.92-.64-1.5-1.7-1.5H9.55Z"
        fill="white"
      />
    </svg>
  );
}

function MessengerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#0084FF"
        d="M12 3.2c-5.1 0-8.8 3.7-8.8 8.5 0 2.52 1.04 4.72 2.73 6.2V21l2.5-1.37c.99.27 2.04.42 3.17.42 5.1 0 8.8-3.7 8.8-8.55C20.4 6.9 16.7 3.2 12 3.2Z"
      />
      <path
        fill="white"
        d="m7.4 13.55 2.72-4.32 2.77 2.16 2.7-2.16 2.72 4.32-2.72-2.15-2.7 2.15-2.77-2.15z"
      />
    </svg>
  );
}

const iconButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function ContactChannels({
  variant = "footer",
  className,
}: {
  variant?: "footer" | "floating" | "page";
  className?: string;
}) {
  const t = useTranslations("contact");
  
  // Link Messenger đã được gán trực tiếp
  const messengerHref = "https://m.me/vietosaka";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        variant === "floating" && "flex-col",
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
        href={messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label={t("messengerAria")}
      >
        <MessengerMark className="h-6 w-6" />
      </a>

      {variant === "page" ? (
        <a
          href={CONTACT_MAILTO}
          className="inline-flex min-h-11 items-center rounded-full border border-slate-200/90 bg-white px-4 text-sm font-medium text-slate-700 shadow-soft transition-colors hover:border-navy-200 hover:text-primary"
        >
          {CONTACT_EMAIL}
        </a>
      ) : (
        <a href={CONTACT_MAILTO} className={iconButtonClass} aria-label={t("emailAria")}>
          <Mail className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}