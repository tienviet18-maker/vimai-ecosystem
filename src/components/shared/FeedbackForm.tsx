"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LocalizedProduct } from "@/types";

export function FeedbackForm({ products }: { products: LocalizedProduct[] }) {
  const t = useTranslations("feedback");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "unconfigured">(
    "idle",
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: data.get("display_name"),
        product_id: data.get("product_id") || null,
        rating: data.get("rating") || null,
        body: data.get("body"),
        country: data.get("country"),
        consent: data.get("consent") === "on",
        locale,
      }),
    });
    if (response.status === 503) {
      setStatus("unconfigured");
      return;
    }
    if (!response.ok) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("success");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="display_name">{t("name")}</Label>
          <Input id="display_name" name="display_name" required maxLength={80} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product_id">{t("product")}</Label>
          <select
            id="product_id"
            name="product_id"
            className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm"
          >
            <option value="">{t("productAny")}</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rating">{t("rating")}</Label>
          <select
            id="rating"
            name="rating"
            className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm"
          >
            <option value="">{t("ratingOptional")}</option>
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">{t("country")}</Label>
          <Input id="country" name="country" maxLength={80} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">{t("message")}</Label>
        <Textarea id="body" name="body" required maxLength={2000} />
      </div>
      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" name="consent" required className="mt-1" />
        {t("consent")}
      </label>
      {status === "success" ? <p className="text-sm text-emerald-700">{t("success")}</p> : null}
      {status === "error" ? <p className="text-sm text-destructive">{t("error")}</p> : null}
      {status === "unconfigured" ? (
        <p className="text-sm text-amber-700">{t("unconfigured")}</p>
      ) : null}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
