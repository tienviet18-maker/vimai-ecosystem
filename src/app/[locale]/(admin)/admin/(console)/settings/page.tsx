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
  const r2Bound = Boolean(getR2());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("settings")}</h1>
      <div className="rounded-2xl border bg-white p-6 text-sm leading-7">
        <h2 className="mb-2 font-semibold">{t("sysTitle")}</h2>
        <StatusRow label={t("sysSite")} ok text={SITE_URL} />
        <StatusRow label={t("sysDb")} ok={isCmsConfigured()} text={isCmsConfigured() ? t("bound") : t("notBound")} />
        <StatusRow label={t("sysAuth")} ok={isAuthConfigured()} text={isAuthConfigured() ? t("bound") : t("notBound")} />
        <StatusRow label={t("sysMedia")} ok={r2Bound} text={r2Bound ? t("bound") : t("notBound")} />
        {!r2Bound ? (
          <p className="mt-2 rounded-lg bg-muted p-3 text-muted-foreground">{t("r2Help")}</p>
        ) : null}
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

function StatusRow({ label, ok, text }: { label: string; ok: boolean; text: string }) {
  return (
    <p className="flex flex-wrap items-center justify-between gap-2">
      <span>{label}</span>
      <span className={ok ? "font-medium text-emerald-700" : "font-medium text-amber-700"}>{text}</span>
    </p>
  );
}
