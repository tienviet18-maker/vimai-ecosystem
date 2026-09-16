"use client";

import { useId, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MediaUploader({
  onUploaded,
  folder = "general",
}: {
  onUploaded?: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputId = useId();

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const json = (await response.json()) as { error?: string; url?: string };
    if (!response.ok) {
      toast.error(json.error ?? "Upload failed");
      setUploading(false);
      return;
    }
    toast.success("Uploaded");
    if (json.url) onUploaded?.(json.url);
    setUploading(false);
    event.target.value = "";
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>Upload from this device</Label>
      <Input
        id={inputId}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onChange}
        disabled={uploading}
      />
      <p className="text-xs text-muted-foreground">
        JPEG, PNG, WebP, AVIF, SVG. Max 8MB. Stored outside Git.
      </p>
    </div>
  );
}
