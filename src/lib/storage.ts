import { requireAdmin, writeAudit } from "@/lib/auth";
import { getDb, getR2, newId, nowIso } from "@/lib/cloudflare";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES, SITE_URL } from "@/lib/utils";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
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
  if (bytes.length >= 3 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return "image/gif";
  }
  if (
    bytes.length >= 12 &&
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    return "image/avif";
  }
  return fallback;
}

export function mediaPublicUrl(key: string) {
  const base = (process.env.PUBLIC_MEDIA_BASE_URL || "").replace(/\/$/, "");
  if (base) return `${base}/${key}`;
  return `${SITE_URL}/api/media/${key}`;
}

export async function uploadMediaFile(
  file: File,
  options: {
    folder?: string;
    altText?: string;
    caption?: string;
    productId?: string | null;
    articleId?: string | null;
    replaceId?: string | null;
  } = {},
) {
  const { user, configured } = await requireAdmin();
  const db = getDb();
  const bucket = getR2();
  if (!configured || !user) {
    return { error: "unauthorized" as const, status: 401 };
  }
  if (!db) {
    return { error: "unconfigured" as const, status: 503 };
  }
  if (!bucket) {
    return { error: "r2_unconfigured" as const, status: 503 };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "file_too_large" as const, status: 413 };
  }

  const buffer = new Uint8Array(await file.arrayBuffer());
  const mime = sniffMime(buffer, file.type);
  if (!ALLOWED_IMAGE_TYPES.includes(mime)) {
    return { error: "invalid_type" as const, status: 415 };
  }

  const folder = sanitizeFolder(options.folder ?? "general");
  const ext = EXT_BY_MIME[mime] ?? "bin";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/^\.+/, "").slice(0, 80);
  const key = `${folder}/${Date.now()}-${safeName || `upload.${ext}`}`;
  const url = mediaPublicUrl(key);

  await bucket.put(key, buffer, {
    httpMetadata: { contentType: mime, cacheControl: "public, max-age=31536000, immutable" },
  });

  if (options.replaceId) {
    const current = await db
      .prepare("SELECT id, key FROM media WHERE id = ?")
      .bind(options.replaceId)
      .first<{ id: string; key: string }>();
    if (!current) {
      await bucket.delete(key);
      return { error: "not_found" as const, status: 404 };
    }
    if (current.key && current.key !== key) {
      await bucket.delete(current.key);
    }
    await db
      .prepare(
        `UPDATE media SET
          filename = ?, key = ?, url = ?, alt_text = ?, caption = ?, mime_type = ?, size_bytes = ?, folder = ?,
          product_id = COALESCE(?, product_id), article_id = COALESCE(?, article_id)
         WHERE id = ?`,
      )
      .bind(
        file.name,
        key,
        url,
        options.altText || file.name,
        options.caption || null,
        mime,
        file.size,
        folder,
        options.productId || null,
        options.articleId || null,
        current.id,
      )
      .run();
    await writeAudit("image replaced", "media", current.id, { folder, key });
    return {
      error: null,
      status: 200,
      asset: { id: current.id, filename: file.name, key, url, mime_type: mime, size_bytes: file.size, folder },
      url,
    };
  }

  const id = newId();
  const row = {
    id,
    filename: file.name,
    key,
    url,
    mime_type: mime,
    size_bytes: file.size,
    folder,
    alt_text: options.altText || file.name,
    caption: options.caption || null,
    product_id: options.productId || null,
    article_id: options.articleId || null,
    created_at: nowIso(),
  };

  await db
    .prepare(
      `INSERT INTO media (
        id, filename, key, url, alt_text, caption, mime_type, size_bytes, folder, product_id, article_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      row.id,
      row.filename,
      row.key,
      row.url,
      row.alt_text,
      row.caption,
      row.mime_type,
      row.size_bytes,
      row.folder,
      row.product_id,
      row.article_id,
      row.created_at,
    )
    .run();

  await writeAudit("image uploaded", "media", id, { folder, key });
  return { error: null, status: 200, asset: row, url };
}

function sanitizeFolder(folder: string) {
  const allowed = ["product", "article", "brand", "hero", "og", "general"];
  return allowed.includes(folder) ? folder : "general";
}

export async function listMedia(filters?: { q?: string; folder?: string; productId?: string }) {
  const db = getDb();
  if (!db) return [];
  let sql = "SELECT * FROM media WHERE 1=1";
  const binds: unknown[] = [];
  if (filters?.folder) {
    sql += " AND folder = ?";
    binds.push(filters.folder);
  }
  if (filters?.productId) {
    sql += " AND product_id = ?";
    binds.push(filters.productId);
  }
  if (filters?.q) {
    sql += " AND (filename LIKE ? OR alt_text LIKE ? OR caption LIKE ?)";
    const like = `%${filters.q}%`;
    binds.push(like, like, like);
  }
  sql += " ORDER BY created_at DESC";
  const { results } = await db.prepare(sql).bind(...binds).all();
  return results ?? [];
}

export async function updateMedia(input: {
  id: string;
  filename?: string;
  alt_text?: string;
  caption?: string;
  folder?: string;
  product_id?: string | null;
  article_id?: string | null;
  featured?: boolean;
  sort_order?: number;
}) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const current = await db.prepare("SELECT * FROM media WHERE id = ?").bind(input.id).first();
  if (!current) return { error: "not_found" as const };
  await db
    .prepare(
      `UPDATE media SET
        filename = ?, alt_text = ?, caption = ?, folder = ?, product_id = ?, article_id = ?, featured = ?, sort_order = ?
       WHERE id = ?`,
    )
    .bind(
      input.filename ?? current.filename,
      input.alt_text ?? current.alt_text,
      input.caption ?? current.caption,
      input.folder ? sanitizeFolder(input.folder) : current.folder,
      input.product_id === undefined ? current.product_id : input.product_id,
      input.article_id === undefined ? current.article_id : input.article_id,
      typeof input.featured === "boolean" ? (input.featured ? 1 : 0) : current.featured,
      input.sort_order ?? current.sort_order,
      input.id,
    )
    .run();
  return { error: null };
}

export async function deleteMedia(id: string) {
  const db = getDb();
  const bucket = getR2();
  if (!db) return { error: "unconfigured" as const };
  const row = await db
    .prepare("SELECT key FROM media WHERE id = ?")
    .bind(id)
    .first<{ key: string }>();
  if (row?.key && bucket) {
    await bucket.delete(row.key);
  }
  await db.prepare("DELETE FROM media WHERE id = ?").bind(id).run();
  return { error: null };
}

export async function getMediaObject(key: string) {
  if (!key || key.includes("..") || key.includes("\\") || key.startsWith("/")) return null;
  const bucket = getR2();
  if (!bucket) return null;
  return bucket.get(key);
}
