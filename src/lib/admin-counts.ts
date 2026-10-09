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

export type AdminTodo = {
  unreadMessages: number;
  pendingOrders: number;
  pendingCommissionVnd: number;
  activePartners: number;
  recordFailures: number;
};

/** What needs the owner's attention today. Missing tables or DB count as zero. */
export async function getAdminTodo(): Promise<AdminTodo> {
  const todo: AdminTodo = {
    unreadMessages: 0,
    pendingOrders: 0,
    pendingCommissionVnd: 0,
    activePartners: 0,
    recordFailures: 0,
  };
  const db = getDb();
  if (!db) return todo;
  try {
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM contact_messages WHERE status = 'new'`)
      .first<{ n: number }>();
    todo.unreadMessages = row?.n ?? 0;
  } catch {}
  try {
    const row = await db
      .prepare(
        `SELECT COUNT(*) AS n, COALESCE(SUM(commission_vnd), 0) AS vnd
         FROM ctv_referrals WHERE status = 'pending'`,
      )
      .first<{ n: number; vnd: number }>();
    todo.pendingOrders = row?.n ?? 0;
    todo.pendingCommissionVnd = row?.vnd ?? 0;
  } catch {}
  try {
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM ctv_partners WHERE status = 'active'`)
      .first<{ n: number }>();
    todo.activePartners = row?.n ?? 0;
  } catch {}
  try {
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM ctv_record_failures`)
      .first<{ n: number }>();
    todo.recordFailures = row?.n ?? 0;
  } catch {}
  return todo;
}
