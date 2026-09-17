import { setRequestLocale } from "next-intl/server";
import { requirePagePermission } from "@/lib/admin-guard";
import { getDb } from "@/lib/cloudflare";
import { UsersManager } from "@/components/admin/UsersManager";
import type { AdminRole, AdminStatus } from "@/lib/rbac";

export const runtime = "edge";

export default async function UsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePagePermission("users", locale);
  const db = getDb();
  const { results } = db
    ? await db
        .prepare("SELECT id, email, role, status, created_at FROM admin_users ORDER BY created_at")
        .all<{ id: string; email: string; role: AdminRole; status: AdminStatus; created_at: string }>()
    : { results: [] };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin users</h1>
      <UsersManager users={results ?? []} />
    </div>
  );
}
