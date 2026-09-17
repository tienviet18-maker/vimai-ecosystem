"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SeoForm({
  seoTitle,
  seoDescription,
  seoCanonical,
  ogTitle,
  ogDescription,
  ogImageUrl,
  robots,
}: {
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  robots: string;
}) {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seo_title: String(form.get("seo_title") ?? ""),
        seo_description: String(form.get("seo_description") ?? ""),
        seo_canonical: String(form.get("seo_canonical") ?? ""),
        og_title: String(form.get("og_title") ?? ""),
        og_description: String(form.get("og_description") ?? ""),
        og_image_url: String(form.get("og_image_url") ?? ""),
        robots: String(form.get("robots") ?? ""),
      }),
    });
    if (!response.ok) {
      toast.error("Could not save SEO settings");
      return;
    }
    toast.success("SEO settings saved");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-6">
      <div className="space-y-2">
        <Label htmlFor="seo_title">Page title</Label>
        <Input id="seo_title" name="seo_title" defaultValue={seoTitle} className="min-h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seo_description">Meta description</Label>
        <Textarea id="seo_description" name="seo_description" defaultValue={seoDescription} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seo_canonical">Homepage canonical URL</Label>
        <Input
          id="seo_canonical"
          name="seo_canonical"
          defaultValue={seoCanonical}
          placeholder="https://vimai.jp"
          className="min-h-11"
        />
        <p className="text-xs text-muted-foreground">
          Product pages use their own canonical URLs (tokutei-taxi.vimai.jp, tokutei-truck.vimai.jp,
          seibi.vimai.jp, kids.vimai.jp, maimai.vimai.jp) and do not inherit this value.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="og_title">Open Graph title</Label>
        <Input id="og_title" name="og_title" defaultValue={ogTitle} className="min-h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="og_description">Open Graph description</Label>
        <Textarea id="og_description" name="og_description" defaultValue={ogDescription} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="og_image_url">OG image URL</Label>
        <Input id="og_image_url" name="og_image_url" defaultValue={ogImageUrl} className="min-h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="robots">Robots</Label>
        <Input id="robots" name="robots" defaultValue={robots} placeholder="index,follow" className="min-h-11" />
      </div>
      <Button type="submit" className="min-h-11">
        Save SEO
      </Button>
    </form>
  );
}
