"use client";

import { useState } from "react";
import type { ProductImage } from "@/types";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="mt-12">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.alt_text || productName}
          className="mx-auto max-h-[28rem] w-full object-contain"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border ${
                index === active ? "border-primary" : "border-slate-200"
              }`}
              aria-label={`${productName} ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
