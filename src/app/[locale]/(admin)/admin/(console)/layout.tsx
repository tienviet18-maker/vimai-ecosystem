import type { ReactNode } from "react";
import { redirect } from "@/lib/i18n/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const user = supabase ? (await supabase.auth.getUser()).data.user : null;
    if (!user) {
      redirect({ href: "/admin/login", locale });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-50 md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4 sm:p-8">{children}</div>
    </div>
  );
}
