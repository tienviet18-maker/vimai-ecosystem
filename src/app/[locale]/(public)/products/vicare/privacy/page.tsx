import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/shared/JsonLd";
import { Breadcrumbs } from "@/components/vicare/Breadcrumbs";
import { ContentBlock } from "@/components/vicare/ContentBlocks";
import { Link } from "@/lib/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";
import { breadcrumbJsonLd, localizedUrl, staticPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import {
  VICARE_LOGO_PNG,
  VICARE_PATH,
  VICARE_PRIVACY_PATH,
  getVicarePageCopy,
  getVicarePrivacy,
} from "@/lib/vicare";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const policy = getVicarePrivacy(locale);
  return staticPageMetadata({
    siteUrl: SITE_URL,
    locale,
    path: VICARE_PRIVACY_PATH,
    title: policy.seoTitle,
    description: policy.description,
    ogImage: VICARE_LOGO_PNG,
  });
}

/** Privacy policy for the ViCare app (the URL given to App Store Connect and Google Play). */
export default async function VicarePrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const policy = getVicarePrivacy(locale);
  const copy = getVicarePageCopy(locale);
  const pageUrl = localizedUrl(SITE_URL, locale, VICARE_PRIVACY_PATH);
  const crumbs = [
    { name: copy.breadcrumbHome, href: "/" },
    { name: copy.breadcrumbProducts, href: "/products" },
    { name: copy.name, href: VICARE_PATH },
    { name: policy.title, href: VICARE_PRIVACY_PATH },
  ];

  return (
    <article className="container py-12 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbJsonLd(
              pageUrl,
              crumbs.map((item) => ({ name: item.name, url: localizedUrl(SITE_URL, locale, item.href) })),
            ),
          ],
        }}
      />
      <Breadcrumbs items={crumbs} label={copy.breadcrumbLabel} />

      <div className="mx-auto mt-10 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">{policy.title}</h1>
        <p className="mt-3 text-sm text-slate-500">{policy.updated}</p>
        <p className="mt-6 leading-8 text-slate-600">{policy.intro}</p>

        {policy.sections.map((section) => (
          <ContentBlock key={section.id} section={section} />
        ))}

        <p className="mt-12 text-sm leading-7 text-slate-500">
          {policy.contactLead}{" "}
          <a href={CONTACT_MAILTO} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          ·{" "}
          <Link href="/contact" className="text-primary hover:underline">
            vimai.jp/contact
          </Link>
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          <Link href={VICARE_PATH} className="text-primary hover:underline">
            ← {copy.name}
          </Link>
          {" · "}
          <Link href="/privacy" className="text-primary hover:underline">
            vimai.jp/privacy
          </Link>
        </p>
      </div>
    </article>
  );
}
