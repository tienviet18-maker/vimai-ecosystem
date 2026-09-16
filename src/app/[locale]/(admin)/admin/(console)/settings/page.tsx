import { getTranslations, setRequestLocale } from "next-intl/server";
import { isSupabaseConfigured, SITE_URL } from "@/lib/utils";

export const runtime = "edge";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("settings")}</h1>
      <div className="rounded-2xl border bg-white p-6 text-sm leading-7">
        <p>Site: {SITE_URL}</p>
        <p>Supabase: {isSupabaseConfigured() ? "connected" : "not configured"}</p>
        <p>Admin host (later): https://admin.vimai.jp — same app, `/admin` routes.</p>
        <p>Media bucket: {process.env.MEDIA_BUCKET ?? "media"}</p>
      </div>
    </div>
  );
}
