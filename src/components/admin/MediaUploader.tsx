"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function MediaUploader({
  onUploaded,
  bucket = "media",
}: {
  onUploaded?: (url: string) => void;
  bucket?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }

    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: false,
    });

    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    await supabase.from("media").insert({
      filename: file.name,
      url: data.publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: file.name,
    });
    toast.success("Uploaded");
    onUploaded?.(data.publicUrl);
    setUploading(false);
    event.target.value = "";
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="media-file">Upload</Label>
      <div className="flex items-center gap-3">
        <Input id="media-file" type="file" onChange={onChange} disabled={uploading} />
        <Button type="button" variant="outline" disabled>
          {uploading ? "Uploading…" : "Choose file"}
        </Button>
      </div>
    </div>
  );
}
