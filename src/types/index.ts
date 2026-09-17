export const locales = ["vi", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export type ProductStatus =
  | "idea"
  | "development"
  | "beta"
  | "coming_soon"
  | "available"
  | "launched"
  | "paused"
  | "maintenance"
  | "discontinued"
  | "archived";

export const productStatuses: ProductStatus[] = [
  "idea",
  "development",
  "beta",
  "coming_soon",
  "available",
  "launched",
  "paused",
  "maintenance",
  "discontinued",
  "archived",
];

export type ProductTranslation = {
  locale: Locale;
  name: string;
  tagline: string;
  description: string;
  long_description?: string;
  features: string[];
  seo_title?: string;
  seo_description?: string;
  target_audience?: string;
};

export type ProductImage = {
  id?: string;
  url: string;
  alt_text?: string | null;
  kind?: "logo" | "icon" | "hero" | "screenshot" | "gallery" | "og";
  sort_order?: number;
};

export type Product = {
  id: string;
  slug: string;
  status: ProductStatus;
  category?: string | null;
  app_store_url: string | null;
  google_play_url: string | null;
  website_url: string | null;
  featured: boolean;
  sort_order: number;
  logo_url: string;
  icon_url?: string | null;
  hero_image_url?: string | null;
  og_image_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  target_audience?: string | null;
  supported_languages?: Locale[];
  screenshots?: ProductImage[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
  translations: ProductTranslation[];
};

export type LocalizedProduct = Omit<Product, "translations"> & {
  name: string;
  tagline: string;
  description: string;
  long_description?: string;
  features: string[];
  target_audience?: string | null;
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
  caption?: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  folder?: string | null;
  product_id?: string | null;
  article_id?: string | null;
  featured?: boolean;
  sort_order?: number;
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

export type ArticleStatus = "draft" | "scheduled" | "published" | "archived";

export type Article = {
  id: string;
  slug: string;
  status: ArticleStatus;
  cover_image_url: string | null;
  og_image_url?: string | null;
  category: string | null;
  tags: string[];
  author_name: string | null;
  publish_at: string | null;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  translations: Array<{
    locale: Locale;
    title: string;
    excerpt: string;
    content: string;
    seo_title?: string;
    seo_description?: string;
  }>;
};

export type LocalizedArticle = {
  id: string;
  slug: string;
  status: ArticleStatus;
  cover_image_url: string | null;
  category: string | null;
  tags: string[];
  author_name: string | null;
  publish_at: string | null;
  updated_at?: string;
  title: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
};

export type ReviewStatus = "pending" | "approved" | "rejected" | "archived";

export type Review = {
  id: string;
  product_id: string | null;
  display_name: string;
  avatar_url: string | null;
  rating: number | null;
  body: string;
  locale: Locale | null;
  country: string | null;
  consent: boolean;
  status: ReviewStatus;
  featured: boolean;
  created_at: string;
};

export type AuditLog = {
  id: string;
  actor_id: string | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
};
