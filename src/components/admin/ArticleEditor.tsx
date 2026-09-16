"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useUnsavedChanges } from "@/components/admin/useUnsavedChanges";

type TranslationDraft = {
  title: string;
  excerpt: string;
  content: string;
  seo_title: string;
  seo_description: string;
};

const emptyTranslation = (): TranslationDraft => ({
  title: "",
  excerpt: "",
  content: "",
  seo_title: "",
  seo_description: "",
});

export function ArticleEditor({
  article,
}: {
  article?: {
    id: string;
    slug: string;
    status: string;
    cover_image_url: string | null;
    og_image_url?: string | null;
    category: string | null;
    tags: string;
    author_name: string | null;
    publish_at: string | null;
    translations: Record<"vi" | "en" | "ja", TranslationDraft>;
  };
}) {
  const t = useTranslations("admin");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [cover, setCover] = useState(article?.cover_image_url ?? "");
  const [og, setOg] = useState(article?.og_image_url ?? "");
  const [translations, setTranslations] = useState<Record<"vi" | "en" | "ja", TranslationDraft>>(
    article?.translations ?? { vi: emptyTranslation(), en: emptyTranslation(), ja: emptyTranslation() },
  );
  useUnsavedChanges(dirty && !saving);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: article?.id,
        slug: String(form.get("slug")),
        status: String(form.get("status") || "draft"),
        cover_image_url: cover || null,
        og_image_url: og || null,
        category: String(form.get("category") || "") || null,
        tags: String(form.get("tags") || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        author_name: String(form.get("author_name") || "") || null,
        publish_at: String(form.get("publish_at") || "") || null,
        translations,
      }),
    });
    if (!response.ok) {
      toast.error(t("couldNotSave"));
      setSaving(false);
      return;
    }
    toast.success(t("saved"));
    setDirty(false);
    setSaving(false);
    if (!article) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="slug" label="Slug" defaultValue={article?.slug} required />
        <Field name="author_name" label={t("author")} defaultValue={article?.author_name ?? ""} />
        <Field name="category" label={t("category")} defaultValue={article?.category ?? ""} />
        <Field name="tags" label={t("tags")} defaultValue={article?.tags ?? ""} />
        <Field
          name="publish_at"
          label={t("publishAt")}
          type="datetime-local"
          defaultValue={article?.publish_at?.slice(0, 16) ?? ""}
        />
        <div className="space-y-2">
          <Label htmlFor="status">{t("status")}</Label>
          <select
            id="status"
            name="status"
            defaultValue={article?.status ?? "draft"}
            className="min-h-11 w-full rounded-xl border px-3 text-sm"
            onChange={() => setDirty(true)}
          >
            <option value="draft">{t("draft")}</option>
            <option value="scheduled">{t("scheduled")}</option>
            <option value="published">{t("published")}</option>
            <option value="archived">{t("archived")}</option>
          </select>
        </div>
      </div>
      <div className="space-y-2 rounded-2xl border p-4">
        <Label>{t("cover")}</Label>
        <Input value={cover} onChange={(event) => { setCover(event.target.value); setDirty(true); }} />
        <MediaUploader folder="article" onUploaded={(url) => { setCover(url); setDirty(true); }} />
      </div>
      <div className="space-y-2 rounded-2xl border p-4">
        <Label>OG</Label>
        <Input value={og} onChange={(event) => { setOg(event.target.value); setDirty(true); }} />
        <MediaUploader folder="og" onUploaded={(url) => { setOg(url); setDirty(true); }} />
      </div>
      <Tabs defaultValue="vi">
        <TabsList>
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ja">日本語</TabsTrigger>
        </TabsList>
        {(["vi", "en", "ja"] as const).map((locale) => (
          <TabsContent key={locale} value={locale} className="space-y-3">
            <FieldInput
              label={t("title")}
              value={translations[locale].title}
              required={locale === "vi"}
              onChange={(value) => {
                setTranslations((current) => ({ ...current, [locale]: { ...current[locale], title: value } }));
                setDirty(true);
              }}
            />
            <FieldInput
              label={t("excerpt")}
              value={translations[locale].excerpt}
              onChange={(value) => {
                setTranslations((current) => ({ ...current, [locale]: { ...current[locale], excerpt: value } }));
                setDirty(true);
              }}
            />
            <div className="space-y-2">
              <Label>{t("content")}</Label>
              <textarea
                value={translations[locale].content}
                onChange={(event) => {
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], content: event.target.value },
                  }));
                  setDirty(true);
                }}
                className="min-h-40 w-full rounded-xl border p-3 text-sm"
              />
            </div>
            <FieldInput
              label={t("seoTitle")}
              value={translations[locale].seo_title}
              onChange={(value) => {
                setTranslations((current) => ({ ...current, [locale]: { ...current[locale], seo_title: value } }));
                setDirty(true);
              }}
            />
            <FieldInput
              label={t("seoDescription")}
              value={translations[locale].seo_description}
              onChange={(value) => {
                setTranslations((current) => ({
                  ...current,
                  [locale]: { ...current[locale], seo_description: value },
                }));
                setDirty(true);
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
      <Button type="submit" className="min-h-11" disabled={saving}>
        {saving ? t("saving") : t("save")}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} defaultValue={defaultValue} className="min-h-11" />
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} required={required} onChange={(event) => onChange(event.target.value)} className="min-h-11" />
    </div>
  );
}
