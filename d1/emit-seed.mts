import { writeFileSync } from "node:fs";
import { seedFaqs, seedProducts } from "../src/lib/seed.ts";

function esc(value: unknown) {
  if (value == null) return "NULL";
  if (typeof value === "number" || typeof value === "boolean") return String(Number(value));
  return `'${String(value).replace(/'/g, "''")}'`;
}

const lines: string[] = [
  "-- Idempotent seed from src/lib/seed.ts. Safe to re-run.",
  "PRAGMA foreign_keys = ON;",
];

for (const product of seedProducts) {
  lines.push(
    `INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      ${esc(product.id)}, ${esc(product.slug)}, ${esc(product.status)},
      ${esc(product.app_store_url)}, ${esc(product.google_play_url)}, ${esc(product.website_url)},
      ${product.featured ? 1 : 0}, ${product.sort_order}, ${esc(product.logo_url)},
      ${product.published ? 1 : 0}, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );`,
  );
  for (const translation of product.translations) {
    lines.push(
      `INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features
      ) VALUES (
        ${esc(`${product.id}-${translation.locale}`)}, ${esc(product.id)}, ${esc(translation.locale)},
        ${esc(translation.name)}, ${esc(translation.tagline)}, ${esc(translation.description)},
        ${esc(translation.long_description)}, ${esc(translation.target_audience)},
        ${esc(JSON.stringify(translation.features))}
      );`,
    );
  }
}

for (const faq of seedFaqs) {
  lines.push(
    `INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES (${esc(faq.id)}, ${esc(faq.product_id)}, ${faq.sort_order}, ${faq.published ? 1 : 0},
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));`,
  );
  for (const locale of ["vi", "en", "ja"] as const) {
    const draft = faq.translations[locale];
    lines.push(
      `INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES (${esc(`${faq.id}-${locale}`)}, ${esc(faq.id)}, ${esc(locale)},
       ${esc(draft.question)}, ${esc(draft.answer)});`,
    );
  }
}

writeFileSync(new URL("./seed.sql", import.meta.url), `${lines.join("\n")}\n`);
console.log("wrote d1/seed.sql");
