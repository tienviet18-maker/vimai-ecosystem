import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AdminTable } from "@/components/admin/AdminTable";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("media").select("*").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("media")}</h1>
      <div className="rounded-lg border bg-white p-6">
        <MediaUploader />
      </div>
      <AdminTable
        columns={["File", "URL", "Type"]}
        empty={t("empty")}
        rows={(data ?? []).map((item) => [
          item.filename,
          <a key={item.id} href={item.url} className="text-primary" target="_blank" rel="noreferrer">
            Open
          </a>,
          item.mime_type ?? "—",
        ])}
      />
    </div>
  );
}
