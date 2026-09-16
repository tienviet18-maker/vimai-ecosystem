"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  Search,
  Settings,
} from "lucide-react";

const items = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/products", key: "products", icon: Package },
  { href: "/admin/articles", key: "articles", icon: FileText },
  { href: "/admin/media", key: "media", icon: ImageIcon },
  { href: "/admin/reviews", key: "reviews", icon: MessageSquare },
  { href: "/admin/analytics", key: "analytics", icon: BarChart3 },
  { href: "/admin/seo", key: "seo", icon: Search },
  { href: "/admin/settings", key: "settings", icon: Settings },
  { href: "/admin/messages", key: "messages", icon: Mail },
] as const;

export function AdminSidebar() {
  const t = useTranslations("admin");
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    window.location.href = "/admin/login";
  }

  return (
    <aside className="flex w-full flex-col border-b bg-white md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b px-4 py-4">
        <p className="text-sm font-semibold text-primary">ViMai</p>
        <p className="text-xs text-muted-foreground">{t("title")}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm",
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
