"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CategoryForm() {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: form.get("slug"),
        sort_order: Number(form.get("sort_order") || 0),
        translations: {
          vi: { name: form.get("name_vi") },
          en: { name: form.get("name_en") },
          ja: { name: form.get("name_ja") },
        },
      }),
    });
    if (!response.ok) {
      toast.error("Could not save category");
      return;
    }
    toast.success("Category saved");
    window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border bg-white p-6 sm:grid-cols-2">
      <Input name="slug" placeholder="slug" required className="min-h-11" />
      <Input name="sort_order" type="number" defaultValue="0" className="min-h-11" />
      <Input name="name_vi" placeholder="Name VI" required className="min-h-11" />
      <Input name="name_en" placeholder="Name EN" className="min-h-11" />
      <Input name="name_ja" placeholder="Name JA" className="min-h-11 sm:col-span-2" />
      <Button type="submit" className="min-h-11 sm:col-span-2">
        Save category
      </Button>
    </form>
  );
}

export function PageContentForm() {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: form.get("slug"),
        published: form.get("published") === "on",
        translations: {
          vi: { title: form.get("title_vi"), body: form.get("body_vi") },
          en: { title: form.get("title_en"), body: form.get("body_en") },
          ja: { title: form.get("title_ja"), body: form.get("body_ja") },
        },
      }),
    });
    if (!response.ok) {
      toast.error("Could not save page");
      return;
    }
    toast.success("Page saved");
    window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input name="slug" placeholder="slug (about, privacy, terms, support)" required className="min-h-11" />
        <label className="inline-flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" name="published" /> Published
        </label>
      </div>
      {(["vi", "en", "ja"] as const).map((locale) => (
        <div key={locale} className="space-y-2">
          <Input name={`title_${locale}`} placeholder={`Title ${locale.toUpperCase()}`} className="min-h-11" />
          <Textarea name={`body_${locale}`} placeholder={`Body ${locale.toUpperCase()}`} rows={5} />
        </div>
      ))}
      <Button type="submit" className="min-h-11">
        Save page content
      </Button>
    </form>
  );
}
