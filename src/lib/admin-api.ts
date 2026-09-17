import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, type AdminUser } from "@/lib/auth";
import { can, type Permission } from "@/lib/rbac";
import { assertSameOrigin } from "@/lib/origin";

export async function authorizeAdmin(
  request: NextRequest,
  permission: Permission,
  options?: { mutate?: boolean },
): Promise<{ user: AdminUser } | { response: NextResponse }> {
  if (options?.mutate !== false && request.method !== "GET" && !assertSameOrigin(request)) {
    return { response: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  }
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return { response: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  }
  if (!can(user.role, permission)) {
    return { response: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  }
  return { user };
}
