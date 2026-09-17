import { getTranslations, setRequestLocale } from "next-intl/server";
import { requirePagePermission } from "@/lib/admin-guard";
import { getDb } from "@/lib/cloudflare";
import { Link } from "@/lib/i18n/navigation";

export const runtime = "edge";

type Gap = { id: string; slug?: string; missing: string[] };

export default async function TranslationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePagePermission("translations", locale);
  const t = await getTranslations("admin");
  const db = getDb();

  const products: Gap[] = [];
  const articles: Gap[] = [];
  const faqs: Gap[] = [];
  const pages: Gap[] = [];

  if (db) {
    try {
      const productRows = await db.prepare("SELECT id, slug FROM products").all<{ id: string; slug: string }>();
      const productTr = await db
        .prepare("SELECT product_id, locale, name FROM product_translations")
        .all<{ product_id: string; locale: string; name: string }>();
      for (const row of productRows.results ?? []) {
        const missing = ["vi", "en", "ja"].filter((code) => {
          const tr = productTr.results?.find((item) => item.product_id === row.id && item.locale === code);
          return !tr || !tr.name.trim();
        });
        if (missing.length) products.push({ id: row.id, slug: row.slug, missing });
      }
    } catch {
      /* table missing */
    }
    try {
      const articleRows = await db.prepare("SELECT id, slug FROM articles").all<{ id: string; slug: string }>();
      const articleTr = await db
        .prepare("SELECT article_id, locale, title FROM article_translations")
        .all<{ article_id: string; locale: string; title: string }>();
      for (const row of articleRows.results ?? []) {
        const missing = ["vi", "en", "ja"].filter((code) => {
          const tr = articleTr.results?.find((item) => item.article_id === row.id && item.locale === code);
          return !tr || !String(tr.title ?? "").trim();
        });
        if (missing.length) articles.push({ id: row.id, slug: row.slug, missing });
      }
    } catch {
      /* table missing */
    }
    try {
      const faqRows = await db.prepare("SELECT id FROM faqs").all<{ id: string }>();
      const faqTr = await db
        .prepare("SELECT faq_id, locale, question FROM faq_translations")
        .all<{ faq_id: string; locale: string; question: string }>();
      for (const row of faqRows.results ?? []) {
        const missing = ["vi", "en", "ja"].filter((code) => {
          const tr = faqTr.results?.find((item) => item.faq_id === row.id && item.locale === code);
          return !tr || !String(tr.question ?? "").trim();
        });
        if (missing.length) faqs.push({ id: row.id, missing });
      }
    } catch {
      /* table missing */
    }
    try {
      const pageRows = await db.prepare("SELECT id, slug FROM cms_pages").all<{ id: string; slug: string }>();
      const pageTr = await db
        .prepare("SELECT page_id, locale, title FROM cms_page_translations")
        .all<{ page_id: string; locale: string; title: string }>();
      for (const row of pageRows.results ?? []) {
        const missing = ["vi", "en", "ja"].filter((code) => {
          const tr = pageTr.results?.find((item) => item.page_id === row.id && item.locale === code);
          return !tr || !String(tr.title ?? "").trim();
        });
        if (missing.length) pages.push({ id: row.id, slug: row.slug, missing });
      }
    } catch {
      /* table missing */
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("translations")}</h1>
        <p className="text-sm text-muted-foreground">
          Missing VI / EN / JA translations. Existing valid copy is not overwritten here.
        </p>
      </div>
      <GapTable title={t("products")} rows={products} href={(id) => `/admin/products/${id}`} empty={t("empty")} />
      <GapTable title={t("articles")} rows={articles} href={(id) => `/admin/articles?edit=${id}`} empty={t("empty")} />
      <GapTable title={t("faq")} rows={faqs} href={() => "/admin/faq"} empty={t("empty")} />
      <GapTable title={t("pages")} rows={pages} href={() => "/admin/pages"} empty={t("empty")} />
    </div>
  );
}

function GapTable({
  title,
  rows,
  href,
  empty,
}: {
  title: string;
  rows: Gap[];
  href: (id: string) => string;
  empty: string;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-2">
              <span>
                {row.slug ?? row.id} — missing {row.missing.join(", ").toUpperCase()}
              </span>
              <Link href={href(row.id)} className="text-primary">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
