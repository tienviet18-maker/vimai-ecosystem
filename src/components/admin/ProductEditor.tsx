"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
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
import { useUnsavedChanges } from "@/components/admin/useUnsavedChanges";
import { applyPriceLines, ctvProductForSlug, formatVnd, priceSummary } from "@/lib/product-pricing";
import type { Product, ProductStatus } from "@/types";
import { productStatuses } from "@/types";

const statuses: ProductStatus[] = productStatuses;

type TranslationDraft = {
  name: string;
  tagline: string;
  description: string;
  long_description: string;
  features: string;
};

export function ProductEditor({ product }: { product?: Product }) {
  const t = useTranslations("admin");
  const tStatus = useTranslations("products.status");
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  useUnsavedChanges(dirty && !saving);
  const [logoUrl, setLogoUrl] = useState(product?.logo_url ?? "");
  const [iconUrl, setIconUrl] = useState(product?.icon_url ?? "");
  const [heroUrl, setHeroUrl] = useState(product?.hero_image_url ?? "");
  const [ogUrl, setOgUrl] = useState(product?.og_image_url ?? "");
  const [screenshots, setScreenshots] = useState<string[]>(
    product?.screenshots?.map((item) => item.url) ?? [],
  );
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "development");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [published, setPublished] = useState(product?.published ?? false);
  const ctvProduct = product ? ctvProductForSlug(product.slug) : null;
  const prices = ctvProduct ? priceSummary(ctvProduct) : null;
  const [translations, setTranslations] = useState<Record<"ja" | "vi" | "en", TranslationDraft>>(
    {
      ja: fromProduct(product, "ja"),
      vi: fromProduct(product, "vi"),
      en: fromProduct(product, "en"),
    },
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      id: product?.id,
      slug: String(form.get("slug")),
      status,
      category: emptyToNull(form.get("category")),
      app_store_url: emptyToNull(form.get("app_store_url")),
      google_play_url: emptyToNull(form.get("google_play_url")),
      website_url: emptyToNull(form.get("website_url")),
      featured,
      sort_order: Number(form.get("sort_order") || 0),
      logo_url: logoUrl || null,
      icon_url: iconUrl || null,
      hero_image_url: heroUrl || null,
      og_image_url: ogUrl || null,
      seo_title: emptyToNull(form.get("seo_title")),
      seo_description: emptyToNull(form.get("seo_description")),
      target_audience: emptyToNull(form.get("target_audience")),
      published,
      translations: Object.fromEntries(
        (["ja", "vi", "en"] as const).map((locale) => [
          locale,
          {
            ...translations[locale],
            features: translations[locale].features
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          },
        ]),
      ),
      screenshots,
    };

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      toast.error(t("couldNotSave"));
      setSaving(false);
      return;
    }

    toast.success(t("saved"));
    setDirty(false);
    setSaving(false);
    if (product?.id) {
      router.refresh();
    } else {
      router.push("/admin/products");
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("fieldSlug")} name="slug" defaultValue={product?.slug} required />
        <Field label={t("fieldCategory")} name="category" defaultValue={product?.category ?? ""} />
        <div className="space-y-2">
          <Label>{t("status")}</Label>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value as ProductStatus);
              setDirty(true);
            }}
          >
            <SelectTrigger className="min-h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((item) => (
                <SelectItem key={item} value={item}>
                  {tStatus(item)}
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
          label={t("fieldSortOrder")}
          name="sort_order"
          type="number"
          defaultValue={String(product?.sort_order ?? 0)}
        />
        <Field label={t("seoTitle")} name="seo_title" defaultValue={product?.seo_title ?? ""} />
        <Field
          label={t("seoDescription")}
          name="seo_description"
          defaultValue={product?.seo_description ?? ""}
        />
        <Field
          label={t("fieldAudience")}
          name="target_audience"
          defaultValue={product?.target_audience ?? ""}
        />
      </div>

      <AssetField label={t("fieldLogo")} value={logoUrl} onChange={setLogoUrl} folder="product" />
      <AssetField label={t("fieldIcon")} value={iconUrl} onChange={setIconUrl} folder="product" />
      <AssetField label={t("fieldHero")} value={heroUrl} onChange={setHeroUrl} folder="hero" />
      <AssetField label={t("fieldOg")} value={ogUrl} onChange={setOgUrl} folder="og" />

      <div className="space-y-3 rounded-2xl border bg-white p-4">
        <Label>{t("screenshots")}</Label>
        <MediaUploader
          folder="product"
          onUploaded={(url) => {
            setScreenshots((current) => [...current, url]);
            setDirty(true);
          }}
        />
        {screenshots.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        ) : (
          <ol className="grid gap-3 sm:grid-cols-2">
            {screenshots.map((url, index) => (
              <li key={`${url}-${index}`} className="rounded-xl border p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-28 w-full rounded-lg object-cover" />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="min-h-11"
                    disabled={index === 0}
                    onClick={() => {
                      setScreenshots((current) => {
                        const next = [...current];
                        [next[index - 1], next[index]] = [next[index], next[index - 1]];
                        return next;
                      });
                      setDirty(true);
                    }}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="min-h-11"
                    disabled={index === screenshots.length - 1}
                    onClick={() => {
                      setScreenshots((current) => {
                        const next = [...current];
                        [next[index + 1], next[index]] = [next[index], next[index + 1]];
                        return next;
                      });
                      setDirty(true);
                    }}
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="min-h-11"
                    onClick={() => {
                      setHeroUrl(url);
                      setDirty(true);
                    }}
                  >
                    {t("setHero")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="min-h-11"
                    onClick={() => {
                      if (!window.confirm(t("confirmDelete"))) return;
                      setScreenshots((current) => current.filter((_, item) => item !== index));
                      setDirty(true);
                    }}
                  >
                    {t("remove")}
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={featured}
            onCheckedChange={(value) => {
              setFeatured(Boolean(value));
              setDirty(true);
            }}
          />
          {t("featured")}
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <Checkbox
            checked={published}
            onCheckedChange={(value) => {
              setPublished(Boolean(value));
              setDirty(true);
            }}
          />
          {t("published")}
        </label>
      </div>

      {ctvProduct ? (
        <div className="space-y-3 rounded-2xl border bg-white p-4" data-testid="price-block">
          <Label>{t("priceTitle")}</Label>
          <p className="text-sm text-muted-foreground">{t("priceHelp")}</p>
          <ul className="space-y-1 text-sm">
            <li>
              {t("priceList")}: <strong>{formatVnd(prices!.listVnd)}</strong>
            </li>
            {prices!.referral.map((row) => (
              <li key={row.percent}>
                {t("priceReferral", { percent: row.percent })}:{" "}
                <strong>{formatVnd(row.payVnd)}</strong>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => {
              setTranslations((current) => ({
                ...current,
                vi: {
                  ...current.vi,
                  features: applyPriceLines(
                    current.vi.features.split("\n"),
                    ctvProduct,
                  ).join("\n"),
                },
              }));
              setDirty(true);
              toast.success(t("priceInserted"));
            }}
          >
            {t("priceInsert")}
          </Button>
        </div>
      ) : null}

      <Tabs defaultValue="vi">
        <TabsList>
          <TabsTrigger value="ja">日本語</TabsTrigger>
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        {(["ja", "vi", "en"] as const).map((locale) => (
          <TabsContent key={locale} value={locale} className="space-y-4">
            <div className="space-y-2">
              <Label>{t("fieldName")}</Label>
              <Input
                value={translations[locale].name}
                onChange={(event) =>
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], name: event.target.value },
                  }))
                }
                required={locale === "vi"}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("fieldTagline")}</Label>
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
              <Label>{t("fieldDescription")}</Label>
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
              <Label>{t("fieldLongDescription")}</Label>
              <Textarea
                value={translations[locale].long_description}
                onChange={(event) =>
                  setTranslations((current) => ({
                    ...current,
                    [locale]: { ...current[locale], long_description: event.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{t("fieldFeatures")}</Label>
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

      <Button type="submit" className="min-h-11" disabled={saving}>
        {saving ? t("saving") : t("save")}
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
    long_description: translation?.long_description ?? "",
    features: (translation?.features ?? []).join("\n"),
  };
}

function AssetField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
}) {
  return (
    <div className="space-y-2 rounded-2xl border bg-white p-4">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
      <MediaUploader folder={folder} onUploaded={onChange} />
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-20 w-20 rounded-xl object-cover" />
      ) : null}
    </div>
  );
}

function emptyToNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? text : null;
}
