import { getDb, newId, nowIso } from "@/lib/cloudflare";

export async function insertContactMessage(input: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  locale?: string | null;
}) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  await db
    .prepare(
      `INSERT INTO contact_messages (id, name, email, locale, subject, message, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'new', ?)`,
    )
    .bind(
      newId(),
      input.name,
      input.email,
      input.locale ?? null,
      input.subject ?? null,
      input.message,
      nowIso(),
    )
    .run();
  return { error: null };
}

export async function listContactMessages() {
  const db = getDb();
  if (!db) return [];
  const { results } = await db
    .prepare("SELECT * FROM contact_messages ORDER BY created_at DESC")
    .all();
  return results ?? [];
}
