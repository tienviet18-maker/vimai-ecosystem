export const locales = ["ja", "vi", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export type ProductStatus =
  | "development"
  | "coming_soon"
  | "available"
  | "maintenance"
  | "archived";

export type ProductTranslation = {
  locale: Locale;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export type Product = {
  id: string;
  slug: string;
  status: ProductStatus;
  app_store_url: string | null;
  google_play_url: string | null;
  website_url: string | null;
  featured: boolean;
  sort_order: number;
  logo_url: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
  translations: ProductTranslation[];
};

export type LocalizedProduct = Omit<Product, "translations"> & {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export type Faq = {
  id: string;
  product_id: string | null;
  sort_order: number;
  published: boolean;
  question: string;
  answer: string;
};

export type MediaAsset = {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  locale: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};
