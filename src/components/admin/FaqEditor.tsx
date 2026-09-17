"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function FaqEditor() {
  const [published, setPublished] = useState(true);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: emptyToNull(form.get("product_id")),
        category: emptyToNull(form.get("category")),
        sort_order: Number(form.get("sort_order") || 0),
        published,
        translations: {
          ja: {
            question: String(form.get("question_ja") ?? ""),
            answer: String(form.get("answer_ja") ?? ""),
          },
          vi: {
            question: String(form.get("question_vi") ?? ""),
            answer: String(form.get("answer_vi") ?? ""),
          },
          en: {
            question: String(form.get("question_en") ?? ""),
            answer: String(form.get("answer_en") ?? ""),
          },
        },
      }),
    });
    const json = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      toast.error(json.error ?? "Could not create FAQ");
      return;
    }
    toast.success("FAQ saved");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product_id">Product ID (optional)</Label>
          <Input id="product_id" name="product_id" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input id="sort_order" name="sort_order" type="number" defaultValue="0" />
        </div>
      </div>
      {(["vi", "en", "ja"] as const).map((locale) => (
        <div key={locale} className="space-y-2">
          <Label>{locale.toUpperCase()} question</Label>
          <Input name={`question_${locale}`} required={locale === "vi"} />
          <Textarea name={`answer_${locale}`} />
        </div>
      ))}
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={published} onCheckedChange={(value) => setPublished(Boolean(value))} />
        Published
      </label>
      <Button type="submit">Save FAQ</Button>
    </form>
  );
}

function emptyToNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? text : null;
}
