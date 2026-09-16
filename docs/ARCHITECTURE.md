# ViMai architecture

Production domain: `https://vimai.jp`  
Code: GitHub `tienviet18-maker/vimai-ecosystem` → Cloudflare Pages project `vimai-ecosystem`  
CMS data and media: Supabase (PostgreSQL, Auth, Storage)

## Stack

- Next.js 15.5.2 App Router (`src/app/[locale]`)
- next-intl (`ja` default, `vi`, `en`, `localePrefix: as-needed`)
- Tailwind + shadcn/ui
- Supabase Auth for admin (no hardcoded credentials)
- `@cloudflare/next-on-pages` (edge runtime)

Public and admin share one Next.js app. Admin lives at `/[locale]/admin` and can later be served on `https://admin.vimai.jp` via the host rewrite in `src/middleware.ts`. Do not create a second Pages project.

## Data

Conceptual entities:

- `products` + `product_translations` + `product_images`
- `articles` + `article_translations`
- `media`
- `reviews`
- `audit_logs`
- `site_settings`
- `faqs` / `contact_messages` (existing)

Public pages fall back to `src/lib/seed.ts` if Supabase is unavailable so the site is not blank. Seed products are real ViMai apps, not fabricated testimonials.

Images live in the Supabase `media` bucket, not in Git. R2 env vars are reserved as a future storage seam.

## Auth

Admin console layout redirects unless a Supabase session exists. `/api/admin/*` calls `requireAdmin()`. Reviews are inserted as `pending` and are only public when `approved`.

## Analytics

Optional Cloudflare Web Analytics beacon (`NEXT_PUBLIC_CF_BEACON_TOKEN`) plus optional GraphQL zone totals (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`). Metrics are approximate; unique-user counts are never invented.

## Environment variables

See `.env.example`. Never commit real secrets. Canonical URL must remain `https://vimai.jp`.
