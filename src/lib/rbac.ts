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

export const PROTECTED_SUPER_ADMIN_EMAIL = "vimai.support@gmail.com";
