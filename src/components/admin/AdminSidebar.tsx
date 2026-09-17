"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { can, type AdminRole, type Permission } from "@/lib/rbac";
import {
  BarChart3,
  FileText,
  FolderTree,
  HelpCircle,
  ImageIcon,
  Languages,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  ScrollText,
  Search,
  Settings,
  Users,
} from "lucide-react";

const items: Array<{ href: string; key: string; icon: typeof LayoutDashboard; permission: Permission }> = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard, permission: "dashboard" },
  { href: "/admin/products", key: "products", icon: Package, permission: "products" },
  { href: "/admin/categories", key: "categories", icon: FolderTree, permission: "categories" },
  { href: "/admin/media", key: "media", icon: ImageIcon, permission: "media" },
  { href: "/admin/articles", key: "articles", icon: FileText, permission: "articles" },
  { href: "/admin/faq", key: "faq", icon: HelpCircle, permission: "faqs" },
  { href: "/admin/pages", key: "pages", icon: LayoutTemplate, permission: "pages" },
  { href: "/admin/translations", key: "translations", icon: Languages, permission: "translations" },
  { href: "/admin/seo", key: "seo", icon: Search, permission: "seo" },
  { href: "/admin/messages", key: "messages", icon: Mail, permission: "messages" },
  { href: "/admin/reviews", key: "reviews", icon: MessageSquare, permission: "reviews" },
  { href: "/admin/users", key: "users", icon: Users, permission: "users" },
  { href: "/admin/audit", key: "audit", icon: ScrollText, permission: "audit" },
  { href: "/admin/analytics", key: "analytics", icon: BarChart3, permission: "analytics" },
  { href: "/admin/settings", key: "settings", icon: Settings, permission: "settings" },
];

export function AdminSidebar({ role }: { role: AdminRole }) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const visible = items.filter((item) => can(role, item.permission));

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" }).catch(() => undefined);
    window.location.href = "/admin/login";
  }

  return (
    <aside className="flex w-full flex-col border-b bg-white md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b px-4 py-4">
        <p className="text-sm font-semibold text-primary">ViMai</p>
        <p className="text-xs text-muted-foreground">{t("title")}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">{role}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col">
        {visible.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm",
                active ? "bg-navy-50 font-medium text-primary" : "text-slate-600 hover:bg-secondary",
              )}
            >
              <Icon className="h-4 w-4" />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
      <div className="p-3">
        <Button variant="outline" className="w-full justify-start" onClick={logout}>
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </Button>
      </div>
    </aside>
  );
}
