-- Additive CMS platform migration. Safe to run after supabase/schema.sql.
-- Extends products, media, and adds articles, reviews, audit, product images.

alter table public.products
  add column if not exists category text,
  add column if not exists icon_url text,
  add column if not exists hero_image_url text,
  add column if not exists og_image_url text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists target_audience text,
  add column if not exists supported_languages jsonb default '["ja","vi","en"]'::jsonb;

alter table public.products drop constraint if exists products_status_check;
alter table public.products
  add constraint products_status_check
  check (status in (
    'idea',
    'development',
    'beta',
    'coming_soon',
    'available',
    'launched',
    'paused',
    'maintenance',
    'discontinued',
    'archived'
  ));

alter table public.product_translations
  add column if not exists long_description text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists target_audience text;

alter table public.media
  add column if not exists folder text default 'general',
  add column if not exists caption text,
  add column if not exists product_id uuid references public.products(id) on delete set null,
  add column if not exists article_id uuid,
  add column if not exists featured boolean default false,
  add column if not exists sort_order integer default 0,
  add column if not exists width integer,
  add column if not exists height integer;

create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  media_id uuid references public.media(id) on delete set null,
  url text not null,
  alt_text text,
  kind text not null default 'screenshot' check (kind in ('logo', 'icon', 'hero', 'screenshot', 'gallery', 'og')),
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'archived')),
  cover_image_url text,
  og_image_url text,
  category text,
  tags jsonb default '[]'::jsonb,
  author_name text,
  publish_at timestamptz,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.article_translations (
  id uuid primary key default uuid_generate_v4(),
  article_id uuid not null references public.articles(id) on delete cascade,
  locale text not null check (locale in ('ja', 'vi', 'en')),
  title text not null,
  excerpt text,
  content text,
  seo_title text,
  seo_description text,
  unique (article_id, locale)
);

alter table public.media
  drop constraint if exists media_article_id_fkey;
alter table public.media
  add constraint media_article_id_fkey
  foreign key (article_id) references public.articles(id) on delete set null;

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete set null,
  display_name text not null,
  avatar_url text,
  rating integer check (rating is null or (rating >= 1 and rating <= 5)),
  body text not null,
  locale text check (locale in ('ja', 'vi', 'en')),
  country text,
  consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'archived')),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  moderated_at timestamptz,
  moderated_by uuid
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid,
  action text not null,
  entity text,
  entity_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists reviews_updated_at on public.reviews;
create trigger reviews_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

alter table public.product_images enable row level security;
alter table public.articles enable row level security;
alter table public.article_translations enable row level security;
alter table public.reviews enable row level security;
alter table public.audit_logs enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "public read product images" on public.product_images;
create policy "public read product images"
on public.product_images for select using (true);

drop policy if exists "auth manage product images" on public.product_images;
create policy "auth manage product images"
on public.product_images for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
on public.articles for select
using (
  (status = 'published' and (publish_at is null or publish_at <= now()))
  or auth.role() = 'authenticated'
);

drop policy if exists "auth manage articles" on public.articles;
create policy "auth manage articles"
on public.articles for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "public read article translations" on public.article_translations;
create policy "public read article translations"
on public.article_translations for select
using (
  exists (
    select 1 from public.articles a
    where a.id = article_id
      and (
        (a.status = 'published' and (a.publish_at is null or a.publish_at <= now()))
        or auth.role() = 'authenticated'
      )
  )
);

drop policy if exists "auth manage article translations" on public.article_translations;
create policy "auth manage article translations"
on public.article_translations for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "public read approved reviews" on public.reviews;
create policy "public read approved reviews"
on public.reviews for select
using (status = 'approved' or auth.role() = 'authenticated');

drop policy if exists "anyone insert reviews" on public.reviews;
create policy "anyone insert reviews"
on public.reviews for insert
with check (consent = true and status = 'pending');

drop policy if exists "auth manage reviews" on public.reviews;
create policy "auth manage reviews"
on public.reviews for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "auth read audit" on public.audit_logs;
create policy "auth read audit"
on public.audit_logs for select
using (auth.role() = 'authenticated');

drop policy if exists "auth insert audit" on public.audit_logs;
create policy "auth insert audit"
on public.audit_logs for insert
with check (auth.role() = 'authenticated');

drop policy if exists "auth manage settings" on public.site_settings;
create policy "auth manage settings"
on public.site_settings for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
