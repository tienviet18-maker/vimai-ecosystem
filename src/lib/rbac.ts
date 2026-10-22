export const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ADMIN_STATUSES = ["ACTIVE", "DISABLED"] as const;
export type AdminStatus = (typeof ADMIN_STATUSES)[number];

export const PERMISSIONS = [
  "dashboard",
  "products",
  "articles",
  "faqs",
  "media",
  "pages",
  "translations",
  "reviews",
  "categories",
  "messages",
  "seo",
  "analytics",
  "settings",
  "users",
  "audit",
  "ctv",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ROLE_PERMISSIONS: Record<AdminRole, readonly Permission[]> = {
  SUPER_ADMIN: PERMISSIONS,
  ADMIN: [
    "dashboard",
    "products",
    "articles",
    "faqs",
    "media",
    "pages",
    "translations",
    "reviews",
    "categories",
    "messages",
    "seo",
    "analytics",
  ],
  EDITOR: [
    "dashboard",
    "products",
    "articles",
    "faqs",
    "media",
    "pages",
    "translations",
    "reviews",
  ],
};

export function isAdminRole(value: unknown): value is AdminRole {
  return ADMIN_ROLES.includes(value as AdminRole);
}

export function can(role: AdminRole | null | undefined, permission: Permission) {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * The emergency SUPER_ADMIN account that can never be demoted, disabled or deleted.
 * Its email comes from the SUPER_ADMIN_EMAIL env var (see getProtectedSuperAdminEmail in
 * cloudflare.ts), never from source. This only *protects* an existing account; it never
 * grants a role. Unset or blank means no account is protected.
 */
export function normalizeProtectedEmail(value: string | null | undefined) {
  const email = String(value ?? "")
    .trim()
    .toLowerCase();
  return email.includes("@") ? email : "";
}

export function isProtectedSuperAdmin(
  email: string | null | undefined,
  protectedEmail: string | null | undefined,
) {
  const target = normalizeProtectedEmail(protectedEmail);
  if (!target) return false;
  return String(email ?? "")
    .trim()
    .toLowerCase() === target;
}
