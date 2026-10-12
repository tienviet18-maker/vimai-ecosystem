import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";

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
      path: "/privacy",
      title: t("privacyTitle"),
      description: t("privacyIntro"),
    }),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPolicy />;
}
