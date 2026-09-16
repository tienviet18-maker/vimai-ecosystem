"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { BrandMark } from "@/components/shared/BrandMark";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/products", key: "products" },
  { href: "/about", key: "about" },
  { href: "/support", key: "support" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navLinkClass = (href: string) =>
    cn(
      "relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
      isActive(href)
        ? "text-primary"
        : "text-slate-500 hover:bg-navy-50 hover:text-primary",
      isActive(href) &&
        "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:bg-primary",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_1px_0_rgba(18,58,111,0.04)]">
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <BrandMark />

        <nav
          className="hidden items-center justify-center gap-1 md:flex"
          aria-label="Primary"
        >
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">{t("contact")}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label={t("openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-10 flex flex-col gap-1.5">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 hover:bg-navy-50 hover:text-primary",
                      isActive(item.href) ? "bg-navy-50 text-primary" : "text-slate-700",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="mt-2 rounded-xl bg-primary px-3 py-3 text-center text-base font-medium text-white transition-colors duration-300 hover:bg-navy-700"
                  onClick={() => setOpen(false)}
                >
                  {t("contact")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
