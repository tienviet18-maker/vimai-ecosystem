import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

export async function requireAdmin(): Promise<{
  configured: boolean;
  user: User | null;
  supabase: Awaited<ReturnType<typeof createClient>>;
}> {
  if (!isSupabaseConfigured()) {
    return { configured: false, user: null, supabase: null };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { configured: false, user: null, supabase: null };
  }

  const { data } = await supabase.auth.getUser();
  return { configured: true, user: data.user ?? null, supabase };
}

export async function writeAudit(
  action: string,
  entity?: string,
  entityId?: string,
  metadata?: Record<string, unknown>,
) {
  try {
    const { user, supabase } = await requireAdmin();
    if (!supabase || !user) return;
    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action,
      entity: entity ?? null,
      entity_id: entityId ?? null,
      metadata: metadata ?? {},
    });
  } catch {
    /* never block the primary action on audit failure */
  }
}
