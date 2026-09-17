import { getTranslations, setRequestLocale } from "next-intl/server";
import { requirePagePermission } from "@/lib/admin-guard";
import { getDb } from "@/lib/cloudflare";
import { CategoryForm } from "@/components/admin/CmsEditors";
import { RecordDelete } from "@/components/admin/RecordDelete";

export const runtime = "edge";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePagePermission("categories", locale);
  const t = await getTranslations("admin");
  const db = getDb();
  let rows: Array<{ id: string; slug: string; sort_order: number }> = [];
  try {
    if (db) {
      const result = await db
        .prepare("SELECT id, slug, sort_order FROM categories ORDER BY sort_order ASC")
        .all<{ id: string; slug: string; sort_order: number }>();
      rows = result.results ?? [];
    }
  } catch {
    rows = [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("categories")}</h1>
      <CategoryForm />
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b bg-navy-50/80 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={3}>
                  {t("empty")}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-4 py-3">{row.slug}</td>
                  <td className="px-4 py-3">{row.sort_order}</td>
                  <td className="px-4 py-3">
                    <RecordDelete endpoint="/api/admin/categories" id={row.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
