"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function ArticleEditor() {
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const { data, error } = await supabase
      .from("articles")
      .insert({
        slug: String(form.get("slug")),
        status: String(form.get("status") || "draft"),
        cover_image_url: String(form.get("cover_image_url") || "") || null,
        category: String(form.get("category") || "") || null,
        tags: String(form.get("tags") || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        author_name: String(form.get("author_name") || "") || null,
        publish_at: String(form.get("publish_at") || "") || null,
        published_at:
          String(form.get("status")) === "published" ? new Date().toISOString() : null,
      })
      .select("id")
      .single();
    if (error || !data) {
      toast.error(error?.message ?? "Could not save");
      setSaving(false);
      return;
    }
    await supabase.from("article_translations").insert({
      article_id: data.id,
      locale: String(form.get("locale") || "ja"),
      title: String(form.get("title")),
      excerpt: String(form.get("excerpt") || ""),
      content: String(form.get("content") || ""),
      seo_title: String(form.get("seo_title") || ""),
      seo_description: String(form.get("seo_description") || ""),
    });
    await supabase.from("audit_logs").insert({
      action: String(form.get("status")) === "published" ? "article published" : "article created",
      entity: "article",
      entity_id: data.id,
    });
    toast.success("Saved as draft/publish per status");
    event.currentTarget.reset();
    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="title" label="Title" required />
        <Field name="slug" label="Slug" required />
        <Field name="author_name" label="Display author" />
        <Field name="category" label="Category" />
        <Field name="cover_image_url" label="Cover image URL" />
        <Field name="tags" label="Tags (comma separated)" />
        <Field name="publish_at" label="Publish at" type="datetime-local" />
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select id="status" name="status" className="h-10 w-full rounded-xl border px-3 text-sm">
            <option value="draft">draft</option>
            <option value="scheduled">scheduled</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="locale">Language</Label>
          <select id="locale" name="locale" className="h-10 w-full rounded-xl border px-3 text-sm">
            <option value="ja">日本語</option>
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
        <Field name="seo_title" label="SEO title" />
      </div>
      <Field name="excerpt" label="Excerpt" />
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <textarea
          id="content"
          name="content"
          className="min-h-40 w-full rounded-xl border p-3 text-sm"
        />
      </div>
      <Field name="seo_description" label="SEO description" />
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
