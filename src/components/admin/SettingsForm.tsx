"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SettingsForm({
  seoTitle,
  seoDescription,
  ogImageUrl,
  contactEmail,
}: {
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  contactEmail: string;
}) {
  const t = useTranslations("admin");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seo_title: String(form.get("seo_title") ?? ""),
        seo_description: String(form.get("seo_description") ?? ""),
        og_image_url: String(form.get("og_image_url") ?? ""),
        contact_email: String(form.get("contact_email") ?? ""),
      }),
    });
    setSaving(false);
    if (!response.ok) {
      toast.error(t("couldNotSave"));
      return;
    }
    toast.success(t("saved"));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-6">
      <div className="space-y-2">
        <Label htmlFor="seo_title">{t("seoTitle")}</Label>
        <Input id="seo_title" name="seo_title" defaultValue={seoTitle} className="min-h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seo_description">{t("seoDescription")}</Label>
        <Textarea id="seo_description" name="seo_description" defaultValue={seoDescription} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="og_image_url">OG</Label>
        <Input id="og_image_url" name="og_image_url" defaultValue={ogImageUrl} className="min-h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact_email">{t("email")}</Label>
        <Input
          id="contact_email"
          name="contact_email"
          type="email"
          defaultValue={contactEmail}
          className="min-h-11"
        />
      </div>
      <Button type="submit" className="min-h-11" disabled={saving}>
        {saving ? t("saving") : t("save")}
      </Button>
    </form>
  );
}
