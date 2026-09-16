import type { ReactNode } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ContactFloatingButton } from "@/components/shared/ContactFloatingButton";
import type { Locale } from "@/types";

export default async function PublicLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
      <ContactFloatingButton />
    </div>
  );
}
