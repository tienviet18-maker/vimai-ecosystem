import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AdminTable } from "@/components/admin/AdminTable";
import { MediaRowActions } from "@/components/admin/MediaRowActions";
import { listMedia } from "@/lib/storage";
import { getProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { asBool } from "@/lib/cloudflare";

export const runtime = "edge";

export default async function MediaPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; folder?: string; product_id?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const [assets, products, articles] = await Promise.all([
    listMedia({ q: query.q, folder: query.folder, productId: query.product_id }),
    getProducts({ publishedOnly: false }),
    getAllArticles(),
  ]);
  const productOptions = products.map((item) => ({ id: item.id, label: item.slug }));
  const articleOptions = articles.map((item) => ({ id: item.id, label: item.slug }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("media")}</h1>
      <form className="flex flex-col gap-3 rounded-lg border bg-white p-4 sm:flex-row sm:flex-wrap">
        <input
          name="q"
          defaultValue={query.q}
          placeholder="Search filename / alt / caption"
          className="h-10 min-w-40 flex-1 rounded-xl border px-3 text-sm"
        />
        <select name="folder" defaultValue={query.folder ?? ""} className="h-10 rounded-xl border px-3 text-sm">
          <option value="">All folders</option>
          {["product", "article", "brand", "hero", "og", "general"].map((folder) => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))}
        </select>
        <select
          name="product_id"
          defaultValue={query.product_id ?? ""}
          className="h-10 rounded-xl border px-3 text-sm"
        >
          <option value="">All products</option>
          {productOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <button type="submit" className="h-10 rounded-xl bg-primary px-4 text-sm text-white">
          Filter
        </button>
      </form>
      <div className="rounded-lg border bg-white p-6">
        <MediaUploader />
      </div>
      <AdminTable
        columns={["File", "Folder", "Assigned", ""]}
        empty={t("empty")}
        rows={assets.map((item) => [
          String(item.filename),
          String(item.folder ?? "general"),
          [item.product_id ? "product" : null, item.article_id ? "article" : null]
            .filter(Boolean)
            .join(" / ") || "—",
          <MediaRowActions
            key={String(item.id)}
            id={String(item.id)}
            url={String(item.url)}
            filename={String(item.filename)}
            folder={String(item.folder ?? "general")}
            alt={String(item.alt_text ?? "")}
            caption={String(item.caption ?? "")}
            sortOrder={Number(item.sort_order ?? 0)}
            featured={asBool(item.featured)}
            productId={String(item.product_id ?? "")}
            articleId={String(item.article_id ?? "")}
            products={productOptions}
            articles={articleOptions}
          />,
        ])}
      />
    </div>
  );
}
