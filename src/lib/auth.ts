import { getDb, isAuthConfigured, isCmsConfigured, newId, nowIso } from "@/lib/cloudflare";
import { getSessionFromCookies, type SessionUser } from "@/lib/session";

export type AdminContext = {
  configured: boolean;
  user: SessionUser | null;
};

export async function requireAdmin(): Promise<AdminContext> {
  if (!isAuthConfigured() || !isCmsConfigured()) {
    return { configured: false, user: null };
  }
  const session = await getSessionFromCookies();
  if (!session) return { configured: true, user: null };

  const db = getDb();
  if (!db) return { configured: false, user: null };
  const row = await db
    .prepare("SELECT id, email FROM admin_users WHERE id = ?")
    .bind(session.id)
    .first<{ id: string; email: string }>();
  if (!row) return { configured: true, user: null };
  return { configured: true, user: { id: row.id, email: row.email } };
}

export async function writeAudit(
  action: string,
  entity?: string,
  entityId?: string,
  metadata?: Record<string, unknown>,
) {
  try {
    const db = getDb();
    const { user } = await requireAdmin();
    if (!db) return;
    await db
      .prepare(
        `INSERT INTO audit_logs (id, actor_id, action, entity, entity_id, metadata, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        newId(),
        user?.id ?? null,
        action,
        entity ?? null,
        entityId ?? null,
        JSON.stringify(metadata ?? {}),
        nowIso(),
      )
      .run();
  } catch {
    /* never block the primary action on audit failure */
  }
}

export async function getAuditLogs(limit = 8) {
  const db = getDb();
  if (!db) return [];
  const { results } = await db
    .prepare(
      `SELECT id, actor_id, action, entity, entity_id, metadata, created_at
       FROM audit_logs ORDER BY created_at DESC LIMIT ?`,
    )
    .bind(limit)
    .all<{
      id: string;
      actor_id: string | null;
      action: string;
      entity: string | null;
      entity_id: string | null;
      metadata: string;
      created_at: string;
    }>();
  return results ?? [];
}
