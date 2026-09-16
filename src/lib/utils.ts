import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vimai.jp"
).replace(/\/$/, "");

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@vimai.jp";

export function publicUrl(locale: string, path = "") {
  const suffix = !path || path === "/" ? "" : path;
  if (locale === "vi") return `${SITE_URL}${suffix || "/"}`;
  return `${SITE_URL}/${locale}${suffix}`;
}

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];
