import type { ReactNode } from "react";
import { redirect } from "@/lib/i18n/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/auth";

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
  const { user, configured } = await requireAdmin();

  if (!configured || !user) {
    redirect({ href: "/admin/login", locale });
    throw new Error("unauthorized");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] md:flex-row">
      <AdminSidebar role={user.role} />
      <div className="min-w-0 flex-1 p-4 sm:p-8">{children}</div>
    </div>
  );
}
