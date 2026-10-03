"use client";

import { useRef, useState } from "react";
import type { ProductImage } from "@/types";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const startX = useRef<number | null>(null);
  if (!images.length) return null;
  const currentIndex = Math.min(active, images.length - 1);
  const current = images[currentIndex];

  function go(delta: number) {
    setActive((index) => (index + delta + images.length) % images.length);
  }

  return (
    <div className="mt-12">
      <div
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"
        onTouchStart={(event) => {
          startX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (startX.current == null) return;
          const dx = (event.changedTouches[0]?.clientX ?? 0) - startX.current;
          startX.current = null;
          if (dx > 40) go(-1);
          if (dx < -40) go(1);
        }}
      >
        {broken[currentIndex] ? (
          <div className="flex h-64 items-center justify-center text-sm text-slate-500">{productName}</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.url}
            alt={current.alt_text || productName}
            loading="lazy"
            className="mx-auto max-h-[28rem] w-full cursor-zoom-in object-contain"
            onClick={() => setLightbox(true)}
            onError={() => setBroken((currentMap) => ({ ...currentMap, [currentIndex]: true }))}
          />
        )}
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
              <img src={image.url} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
      {lightbox && !broken[currentIndex] ? (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(false)}
          aria-label="Close"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.url} alt={current.alt_text || productName} className="max-h-full max-w-full object-contain" />
        </button>
      ) : null}
    </div>
  );
}
