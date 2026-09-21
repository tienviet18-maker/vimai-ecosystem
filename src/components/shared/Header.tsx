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
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navLinkClass = (href: string) =>
    cn(
      "relative inline-flex min-h-11 items-center rounded-lg px-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
      isActive(href)
        ? "text-primary"
        : "text-slate-500 hover:bg-navy-50 hover:text-primary",
      isActive(href) &&
        "after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:bg-primary",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white">
      <div className="container grid min-h-[4.35rem] grid-cols-[auto_1fr_auto] items-center gap-3 py-2 sm:min-h-[4.85rem] lg:gap-8">
        <BrandMark tagline={tBrand("headerTagline")} />

        <nav
          className="hidden justify-self-center lg:flex lg:items-center lg:gap-1"
          aria-label="Primary"
        >
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-2.5">
          <LanguageSwitcher />
          <Button asChild className="hidden min-h-11 px-5 sm:inline-flex">
            <Link href="/contact">{t("contact")}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
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
                      "min-h-12 rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 hover:bg-navy-50 hover:text-primary",
                      isActive(item.href) ? "bg-navy-50 text-primary" : "text-slate-700",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="mt-2 min-h-12 rounded-xl bg-primary px-3 py-3 text-center text-base font-medium text-white transition-colors duration-300 hover:bg-navy-700"
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
