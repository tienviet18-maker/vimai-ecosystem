import { requireAdmin } from "@/lib/auth";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES, MEDIA_BUCKET } from "@/lib/utils";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "image/gif": "gif",
};

function sniffMime(bytes: Uint8Array, fallback: string) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  const head = new TextDecoder().decode(bytes.slice(0, 64)).trim().toLowerCase();
  if (head.startsWith("<svg") || head.includes("<svg")) return "image/svg+xml";
  return fallback;
}

export async function uploadMediaFile(file: File, folder = "general") {
  const { user, supabase, configured } = await requireAdmin();
  if (!configured || !supabase || !user) {
    return { error: "unauthorized" as const, status: 401 };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "file_too_large" as const, status: 413 };
  }

  const buffer = new Uint8Array(await file.arrayBuffer());
  const mime = sniffMime(buffer, file.type);
  if (!ALLOWED_IMAGE_TYPES.includes(mime)) {
    return { error: "invalid_type" as const, status: 415 };
  }

  const ext = EXT_BY_MIME[mime] ?? "bin";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
  const path = `${folder}/${Date.now()}-${safeName || `upload.${ext}`}`;

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, buffer, { contentType: mime, upsert: false });

  if (uploadError) {
    return { error: uploadError.message, status: 500 };
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  const row = {
    filename: file.name,
    url: data.publicUrl,
    mime_type: mime,
    size_bytes: file.size,
    folder,
    alt_text: file.name,
  };
  const { data: inserted, error: insertError } = await supabase
    .from("media")
    .insert(row)
    .select("*")
    .single();

  if (insertError) {
    return { error: insertError.message, status: 500, url: data.publicUrl };
  }

  return { error: null, status: 200, asset: inserted, url: data.publicUrl };
}
