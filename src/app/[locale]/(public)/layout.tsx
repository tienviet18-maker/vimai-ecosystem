import type { ReactNode } from "react";
import Script from "next/script";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ContactFloatingButton } from "@/components/shared/ContactFloatingButton";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";

export default async function PublicLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const beacon = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale as Locale} />
      <ContactFloatingButton />
      {beacon ? (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token: beacon })}
        />
      ) : null}
    </div>
  );
}
