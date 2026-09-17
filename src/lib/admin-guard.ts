import { redirect } from "@/lib/i18n/navigation";
import { requireAdmin } from "@/lib/auth";
import { can, type Permission } from "@/lib/rbac";

export async function requirePagePermission(permission: Permission, locale: string) {
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    redirect({ href: "/admin/login", locale });
    throw new Error("unauthorized");
  }
  if (!can(user.role, permission)) {
    redirect({ href: "/admin", locale });
    throw new Error("forbidden");
  }
  return user;
}
