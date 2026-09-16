"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  FileQuestion,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
} from "lucide-react";

const items = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/products", key: "products", icon: Package },
  { href: "/admin/media", key: "media", icon: ImageIcon },
  { href: "/admin/faq", key: "faq", icon: FileQuestion },
  { href: "/admin/messages", key: "messages", icon: Mail },
] as const;

export function AdminSidebar() {
  const t = useTranslations("admin");
  const pathname = usePathname();

  async function logout() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <aside className="flex w-full flex-col border-b bg-white md:h-screen md:w-60 md:border-b-0 md:border-r">
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
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm",
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
