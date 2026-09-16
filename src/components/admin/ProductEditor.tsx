"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { createClient } from "@/lib/supabase/client";
import type { Product, ProductStatus } from "@/types";

const statuses: ProductStatus[] = [
  "development",
  "coming_soon",
  "available",
  "maintenance",
  "archived",
];

type TranslationDraft = {
  name: string;
  tagline: string;
  description: string;
  features: string;
};

export function ProductEditor({ product }: { product?: Product }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState(product?.logo_url ?? "");
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "development");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [published, setPublished] = useState(product?.published ?? false);
  const [translations, setTranslations] = useState<Record<"ja" | "vi" | "en", TranslationDraft>>(
    {
      ja: fromProduct(product, "ja"),
      vi: fromProduct(product, "vi"),
      en: fromProduct(product, "en"),
    },
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      slug: String(form.get("slug")),
      status,
      app_store_url: emptyToNull(form.get("app_store_url")),
      google_play_url: emptyToNull(form.get("google_play_url")),
      website_url: emptyToNull(form.get("website_url")),
      featured,
      sort_order: Number(form.get("sort_order") || 0),
      logo_url: logoUrl || null,
      published,
      updated_at: new Date().toISOString(),
    };

    let productId = product?.id;
    if (productId) {
      const { error } = await supabase.from("products").update(payload).eq("id", productId);
      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase.from("products").insert(payload).select("id").single();
      if (error || !data) {
        toast.error(error?.message ?? "Could not create product");
        setSaving(false);
        return;
      }
      productId = data.id;
    }

    for (const locale of ["ja", "vi", "en"] as const) {
      const draft = translations[locale];
      const translation = {
        product_id: productId,
        locale,
        name: draft.name,
        tagline: draft.tagline,
        description: draft.description,
        features: draft.features
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      const { error } = await supabase
        .from("product_translations")
        .upsert(translation, { onConflict: "product_id,locale" });
      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }
    }

    toast.success("Saved");
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={product?.slug} required />
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as ProductStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Field label="App Store URL" name="app_store_url" defaultValue={product?.app_store_url ?? ""} />
        <Field
          label="Google Play URL"
          name="google_play_url"
          defaultValue={product?.google_play_url ?? ""}
        />
        <Field label="Website URL" name="website_url" defaultValue={product?.website_url ?? ""} />
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(product?.sort_order ?? 0)}
        />
      </div>

      <div className="space-y-2">
        <Label>Logo URL</Label>
        <Input value={logoUrl} onChange={(event) => setLogoUrl(event.target.value)} />
        <MediaUploader onUploaded={setLogoUrl} />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={featured} onCheckedChange={(value) => setFeatured(Boolean(value))} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={published} onCheckedChange={(value) => setPublished(Boolean(value))} />
          Published
        </label>
      </div>

      <Tabs defaultValue="ja">
        <TabsList>
          <TabsTrigger value="ja">日本語</TabsTrigger>
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        {(["ja", "vi", "en"] as const).map((locale) => (
          <TabsContent key={locale} value={locale} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={translations[locale].name}
                onChange={(event) =>
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], name: event.target.value },
                  }))
                }
                required={locale === "ja"}
              />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input
                value={translations[locale].tagline}
                onChange={(event) =>
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], tagline: event.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={translations[locale].description}
                onChange={(event) =>
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], description: event.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Features (one per line)</Label>
              <Textarea
                value={translations[locale].features}
                onChange={(event) =>
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], features: event.target.value },
                  }))
                }
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} required={required} />
    </div>
  );
}

function fromProduct(product: Product | undefined, locale: "ja" | "vi" | "en"): TranslationDraft {
  const translation = product?.translations.find((item) => item.locale === locale);
  return {
    name: translation?.name ?? "",
    tagline: translation?.tagline ?? "",
    description: translation?.description ?? "",
    features: (translation?.features ?? []).join("\n"),
  };
}

function emptyToNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? text : null;
}
