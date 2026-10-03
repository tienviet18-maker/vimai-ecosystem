import { MoreVertical, SquareArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function PwaInstallGuide() {
  const t = await getTranslations("products");

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">{t("installTitle")}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-800">{t("installIosLabel")}</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            <span className="mr-1">1.</span>
            {t("installIosTap")}{" "}
            <span className="mx-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-slate-50 align-middle text-slate-800">
              <SquareArrowUp className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t("installShare")}</span>
            </span>{" "}
            {t("installIosWhere")}
            <span className="mx-1.5 text-slate-400">→</span>
            <span className="mr-1">2.</span>
            {t("installChoose")}{" "}
            <strong className="font-bold text-slate-900">{t("installIosAction")}</strong>
            {t("installIosHint")}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-800">{t("installAndroidLabel")}</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            <span className="mr-1">1.</span>
            {t("installAndroidTap")}{" "}
            <span className="mx-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-slate-50 align-middle text-slate-800">
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t("installMenu")}</span>
            </span>{" "}
            {t("installAndroidWhere")}
            <span className="mx-1.5 text-slate-400">→</span>
            <span className="mr-1">2.</span>
            {t("installChoose")}{" "}
            <strong className="font-bold text-slate-900">{t("installAndroidAction")}</strong>
            {t("installAndroidHint")}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">
        <span className="mr-1 font-semibold">3.</span>
        {t("installStep3")}
      </p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{t("installNote")}</p>
    </section>
  );
}
