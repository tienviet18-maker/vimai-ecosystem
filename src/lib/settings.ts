import { getDb, nowIso } from "@/lib/cloudflare";

const ALLOWED_KEYS = [
  "seo_title",
  "seo_description",
  "seo_canonical",
  "og_title",
  "og_description",
  "og_image_url",
  "robots",
  "contact_email",
] as const;

export type SiteSettingKey = (typeof ALLOWED_KEYS)[number];

export async function getSiteSettings(): Promise<Record<string, string>> {
  const db = getDb();
  if (!db) return {};
  const { results } = await db
    .prepare("SELECT key, value FROM site_settings")
    .all<{ key: string; value: string | null }>();
  const settings: Record<string, string> = {};
  for (const row of results ?? []) {
    settings[row.key] = row.value ?? "";
  }
  return settings;
}

export async function upsertSiteSettings(input: Record<string, string>) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const timestamp = nowIso();
  for (const key of ALLOWED_KEYS) {
    if (!(key in input)) continue;
    const value = String(input[key] ?? "").slice(0, 2000);
    await db
      .prepare(
        `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at`,
      )
      .bind(key, value, timestamp)
      .run();
  }
  return { error: null };
}
