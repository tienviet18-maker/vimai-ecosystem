import { getTranslations, setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/admin/LoginForm";

export const runtime = "edge";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">{t("login")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">ViMai CMS</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
