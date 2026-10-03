"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, X } from "lucide-react";

const IN_APP_UA = /FBAN|FBAV|FB_IAB|Instagram|Zalo|Line\/|TikTok|musical_ly|BytedanceWebview/i;
const DISMISS_KEY = "vimai:inapp-notice-dismissed";

function readDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Warns visitors who opened the site inside Zalo/Facebook/etc. that "Add to Home
 * Screen" and payment work properly only in Safari/Chrome. Fixed overlay, so it
 * never shifts page layout.
 */
export function InAppBrowserNotice() {
  const t = useTranslations("products");
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (IN_APP_UA.test(navigator.userAgent) && !readDismissed()) setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage may be blocked */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  }

  const isAndroid = /Android/i.test(navigator.userAgent);
  const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;

  return (
    <div
      role="status"
      className="fixed inset-x-3 top-3 z-[70] mx-auto max-w-xl rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-slate-800 shadow-lg"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("inAppClose")}
        className="absolute right-2 top-2 rounded-md p-1 text-slate-600 hover:bg-amber-100"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="pr-6 font-semibold">{t("inAppTitle")}</p>
      <p className="mt-1 leading-6">{t("inAppBody")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-amber-400 bg-white px-3 font-medium"
        >
          <Copy className="h-4 w-4" aria-hidden="true" />
          {copied ? t("inAppCopied") : t("inAppCopy")}
        </button>
        {isAndroid ? (
          <a
            href={intentUrl}
            className="inline-flex min-h-9 items-center rounded-lg bg-slate-900 px-3 font-medium text-white"
          >
            Chrome
          </a>
        ) : null}
      </div>
    </div>
  );
}
