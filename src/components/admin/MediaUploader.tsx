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
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const inputId = useId();
  const altId = useId();
  const captionId = useId();

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);
    body.append("alt_text", altText || file.name);
    body.append("caption", caption);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const json = (await response.json()) as { error?: string; url?: string };
    if (!response.ok) {
      toast.error(
        response.status === 503
          ? "R2 is not enabled on this Cloudflare account yet (API 10042). Enable R2 in Dashboard, create bucket vimai-media, bind MEDIA."
          : (json.error ?? "Upload failed"),
      );
      setUploading(false);
      return;
    }
    toast.success("Uploaded");
    if (json.url) onUploaded?.(json.url);
    setUploading(false);
    event.target.value = "";
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={altId}>Alt text</Label>
          <Input id={altId} value={altText} onChange={(event) => setAltText(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={captionId}>Caption</Label>
          <Input id={captionId} value={caption} onChange={(event) => setCaption(event.target.value)} />
        </div>
      </div>
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
          JPEG, PNG, WebP, AVIF, GIF. Max 8MB. R2, not Git.
        </p>
      </div>
    </div>
  );
}
