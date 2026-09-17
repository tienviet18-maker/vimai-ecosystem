import { getDb } from "@/lib/cloudflare";

export async function getAdminCounts() {
  const empty = {
    products: 0,
    articles: 0,
    faqs: 0,
    media: 0,
    messages: 0,
    users: 0,
    pages: 0,
    categories: 0,
  };
  const db = getDb();
  if (!db) return empty;
  const tables = [
    ["products", "products"],
    ["articles", "articles"],
    ["faqs", "faqs"],
    ["media", "media"],
    ["contact_messages", "messages"],
    ["admin_users", "users"],
    ["cms_pages", "pages"],
    ["categories", "categories"],
  ] as const;
  const counts = { ...empty };
  for (const [table, key] of tables) {
    try {
      const row = await db.prepare(`SELECT COUNT(*) as n FROM ${table}`).first<{ n: number }>();
      counts[key] = row?.n ?? 0;
    } catch {
      counts[key] = 0;
    }
  }
  return counts;
}
