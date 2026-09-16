"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";

export function FaqEditor() {
  const [published, setPublished] = useState(true);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const { data, error } = await supabase
      .from("faqs")
      .insert({
        product_id: emptyToNull(form.get("product_id")),
        sort_order: Number(form.get("sort_order") || 0),
        published,
      })
      .select("id")
      .single();

    if (error || !data) {
      toast.error(error?.message ?? "Could not create FAQ");
      return;
    }

    for (const locale of ["ja", "vi", "en"] as const) {
      await supabase.from("faq_translations").insert({
        faq_id: data.id,
        locale,
        question: String(form.get(`question_${locale}`) ?? ""),
        answer: String(form.get(`answer_${locale}`) ?? ""),
      });
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
          <Label htmlFor="sort_order">Sort order</Label>
          <Input id="sort_order" name="sort_order" type="number" defaultValue="0" />
        </div>
      </div>
      {(["ja", "vi", "en"] as const).map((locale) => (
        <div key={locale} className="space-y-2">
          <Label>
            {locale.toUpperCase()} question
          </Label>
          <Input name={`question_${locale}`} required={locale === "ja"} />
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
