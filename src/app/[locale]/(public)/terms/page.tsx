import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { TermsOfService } from "@/components/legal/TermsOfService";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    ...staticPageMetadata({
      siteUrl: SITE_URL,
      locale,
      path: "/terms",
      title: t("termsTitle"),
      description: t("termsIntro"),
    }),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsOfService />;
}
