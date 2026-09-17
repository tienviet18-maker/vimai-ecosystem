import { getTranslations, setRequestLocale } from "next-intl/server";
import { requirePagePermission } from "@/lib/admin-guard";
import { isAuthConfigured, isCmsConfigured, getR2 } from "@/lib/cloudflare";
import { getSiteSettings } from "@/lib/settings";
import { SITE_URL } from "@/lib/utils";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PasswordForm } from "@/components/admin/PasswordForm";

export const runtime = "edge";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePagePermission("settings", locale);
  const t = await getTranslations("admin");
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("settings")}</h1>
      <div className="rounded-2xl border bg-white p-6 text-sm leading-7">
        <p>Site: {SITE_URL}</p>
        <p>D1 CMS: {isCmsConfigured() ? t("bound") : t("notBound")}</p>
        <p>R2 media: {getR2() ? t("bound") : t("notBound")}</p>
        <p>Auth secret: {isAuthConfigured() ? t("bound") : t("notBound")}</p>
        <p>Default language: Vietnamese (`/`). `/en` and `/ja` are prefixed.</p>
      </div>
      <SettingsForm
        seoTitle={settings.seo_title ?? ""}
        seoDescription={settings.seo_description ?? ""}
        ogImageUrl={settings.og_image_url ?? ""}
        contactEmail={settings.contact_email ?? ""}
      />
      <PasswordForm />
    </div>
  );
}
