import { getDb, isAuthConfigured, isCmsConfigured, newId, nowIso } from "@/lib/cloudflare";
import { getSessionFromCookies, type SessionUser } from "@/lib/session";
import { isAdminRole, type AdminRole, type AdminStatus } from "@/lib/rbac";

export type AdminUser = SessionUser & {
  role: AdminRole;
  status: AdminStatus;
};

export type AdminContext = {
  configured: boolean;
  user: AdminUser | null;
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
    .prepare("SELECT id, email, role, status FROM admin_users WHERE id = ?")
    .bind(session.id)
    .first<{ id: string; email: string; role?: string | null; status?: string | null }>();
  if (!row) return { configured: true, user: null };
  const status: AdminStatus = row.status === "DISABLED" ? "DISABLED" : "ACTIVE";
  if (status !== "ACTIVE") return { configured: true, user: null };
  const role: AdminRole = isAdminRole(row.role) ? row.role : "EDITOR";
  return { configured: true, user: { id: row.id, email: row.email, role, status } };
}

export async function writeAudit(
  action: string,
  entity?: string,
  entityId?: string | null,
  metadata?: Record<string, unknown>,
  actorId?: string | null,
) {
  try {
    const db = getDb();
    if (!db) return;
    let actor = actorId ?? null;
    if (actor === undefined || actor === null) {
      const { user } = await requireAdmin();
      actor = user?.id ?? null;
    }
    const safeMeta = { ...(metadata ?? {}) };
    delete safeMeta.password;
    delete safeMeta.password_hash;
    delete safeMeta.secret;
    await db
      .prepare(
        `INSERT INTO audit_logs (id, actor_id, action, entity, entity_id, metadata, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        newId(),
        actor,
        action,
        entity ?? null,
        entityId ?? null,
        JSON.stringify(safeMeta),
        nowIso(),
      )
      .run();
  } catch {
    /* never block the primary action on audit failure */
  }
}

export async function getAuditLogs(limit = 50) {
  const db = getDb();
  if (!db) return [];
  const { results } = await db
    .prepare(
      `SELECT l.id, l.actor_id, u.email as actor_email, l.action, l.entity, l.entity_id, l.metadata, l.created_at
       FROM audit_logs l
       LEFT JOIN admin_users u ON u.id = l.actor_id
       ORDER BY l.created_at DESC LIMIT ?`,
    )
    .bind(limit)
    .all<{
      id: string;
      actor_id: string | null;
      actor_email: string | null;
      action: string;
      entity: string | null;
      entity_id: string | null;
      metadata: string;
      created_at: string;
    }>();
  return results ?? [];
}
