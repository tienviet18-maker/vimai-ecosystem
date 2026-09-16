"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Option = { id: string; label: string };

export function MediaRowActions({
  id,
  url,
  filename,
  folder,
  alt,
  caption,
  sortOrder,
  featured,
  productId,
  articleId,
  products,
  articles,
}: {
  id: string;
  url: string;
  filename: string;
  folder: string;
  alt: string;
  caption: string;
  sortOrder: number;
  featured: boolean;
  productId: string;
  articleId: string;
  products: Option[];
  articles: Option[];
}) {
  const [name, setName] = useState(filename);
  const [folderValue, setFolderValue] = useState(folder);
  const [altText, setAltText] = useState(alt);
  const [captionText, setCaptionText] = useState(caption);
  const [order, setOrder] = useState(String(sortOrder));
  const [isFeatured, setIsFeatured] = useState(featured);
  const [product, setProduct] = useState(productId);
  const [article, setArticle] = useState(articleId);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    const response = await fetch("/api/admin/media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        filename: name,
        folder: folderValue,
        alt_text: altText,
        caption: captionText,
        sort_order: Number(order || 0),
        featured: isFeatured,
        product_id: product || null,
        article_id: article || null,
      }),
    });
    setBusy(false);
    if (!response.ok) {
      toast.error("Could not save");
      return;
    }
    toast.success("Saved");
  }

  async function replace(file: File) {
    setBusy(true);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folderValue);
    body.append("alt_text", altText || file.name);
    body.append("caption", captionText);
    body.append("replace_id", id);
    if (product) body.append("product_id", product);
    if (article) body.append("article_id", article);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    setBusy(false);
    if (!response.ok) {
      toast.error("Replace failed");
      return;
    }
    toast.success("Replaced");
    window.location.reload();
  }

  async function remove() {
    if (!window.confirm("Delete this file?")) return;
    setBusy(true);
    const response = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusy(false);
    if (!response.ok) {
      toast.error("Could not delete");
      return;
    }
    toast.success("Deleted");
    window.location.reload();
  }

  return (
    <div className="flex min-w-56 max-w-xs flex-col gap-2">
      <a href={url} className="truncate text-primary" target="_blank" rel="noreferrer">
        Open
      </a>
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Filename" />
      <select
        value={folderValue}
        onChange={(event) => setFolderValue(event.target.value)}
        className="h-10 rounded-xl border px-3 text-sm"
      >
        {["product", "article", "brand", "hero", "og", "general"].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Input value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="Alt" />
      <Input
        value={captionText}
        onChange={(event) => setCaptionText(event.target.value)}
        placeholder="Caption"
      />
      <Input
        type="number"
        value={order}
        onChange={(event) => setOrder(event.target.value)}
        placeholder="Order"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(event) => setIsFeatured(event.target.checked)}
        />
        Hero / featured
      </label>
      <select
        value={product}
        onChange={(event) => setProduct(event.target.value)}
        className="h-10 rounded-xl border px-3 text-sm"
      >
        <option value="">No product</option>
        {products.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <select
        value={article}
        onChange={(event) => setArticle(event.target.value)}
        className="h-10 rounded-xl border px-3 text-sm"
      >
        <option value="">No article</option>
        {articles.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <Input
        type="file"
        accept="image/*"
        capture="environment"
        disabled={busy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void replace(file);
        }}
      />
      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={() => void save()} disabled={busy}>
          Save
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => void remove()} disabled={busy}>
          Delete
        </Button>
      </div>
    </div>
  );
}
