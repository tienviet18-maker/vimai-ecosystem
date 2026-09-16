-- ViMai ecosystem schema for Supabase (PostgreSQL)
-- Run in the SQL editor, then create a public storage bucket named `media`.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  status text not null check (status in ('development', 'coming_soon', 'available', 'maintenance', 'archived')),
  app_store_url text,
  google_play_url text,
  website_url text,
  featured boolean default false,
  sort_order integer default 0,
  logo_url text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.product_translations (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  locale text not null check (locale in ('ja', 'vi', 'en')),
  name text not null,
  tagline text,
  description text,
  features jsonb default '[]'::jsonb,
  unique (product_id, locale)
);

create table if not exists public.faqs (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete set null,
  sort_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.faq_translations (
  id uuid primary key default uuid_generate_v4(),
  faq_id uuid not null references public.faqs(id) on delete cascade,
  locale text not null check (locale in ('ja', 'vi', 'en')),
  question text not null,
  answer text not null,
  unique (faq_id, locale)
);

create table if not exists public.media (
  id uuid primary key default uuid_generate_v4(),
  filename text not null,
  url text not null,
  alt_text text,
  mime_type text,
  size_bytes integer,
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  locale text,
  subject text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'editor', 'viewer')),
  full_name text,
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.product_translations enable row level security;
alter table public.faqs enable row level security;
alter table public.faq_translations enable row level security;
alter table public.media enable row level security;
alter table public.contact_messages enable row level security;
alter table public.profiles enable row level security;

create policy "public read published products"
on public.products for select
using (published = true or auth.role() = 'authenticated');

create policy "auth manage products"
on public.products for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "public read product translations"
on public.product_translations for select
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and (p.published = true or auth.role() = 'authenticated')
  )
);

create policy "auth manage product translations"
on public.product_translations for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "public read published faqs"
on public.faqs for select
using (published = true or auth.role() = 'authenticated');

create policy "auth manage faqs"
on public.faqs for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "public read faq translations"
on public.faq_translations for select
using (true);

create policy "auth manage faq translations"
on public.faq_translations for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "public read media"
on public.media for select
using (true);

create policy "auth manage media"
on public.media for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "anyone insert contact"
on public.contact_messages for insert
with check (true);

create policy "auth read contact"
on public.contact_messages for select
using (auth.role() = 'authenticated');

-- Platform CMS tables live in supabase/migrations/002_cms_platform.sql
