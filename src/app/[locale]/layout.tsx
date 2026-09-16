import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/utils";
import type { Locale } from "@/types";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default as {
    meta: { title: string; description: string };
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: messages.meta.title,
      template: `%s | ViMai`,
    },
    description: messages.meta.description,
    alternates: {
      canonical: locale === "ja" ? SITE_URL : `${SITE_URL}/${locale}`,
      languages: {
        ja: SITE_URL,
        vi: `${SITE_URL}/vi`,
        en: `${SITE_URL}/en`,
      },
    },
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: SITE_URL,
      siteName: "ViMai",
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${notoSansJp.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
