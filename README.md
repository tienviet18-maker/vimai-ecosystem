# ViMai Ecosystem

Production website for [https://vimai.jp](https://vimai.jp) — education and technology products for Tokutei certification, auto mechanic exam prep, children's learning, and health tracking.

## Stack

- Next.js App Router (pinned to 15.5.2 for `@cloudflare/next-on-pages`)
- Cloudflare Pages via `@cloudflare/next-on-pages`
- Supabase (PostgreSQL, Auth, Storage)
- Tailwind CSS + shadcn/ui
- next-intl: Japanese (default), Vietnamese, English

The public site works without Supabase by falling back to `src/lib/seed.ts`. Connect Supabase to enable CMS writes, contact intake, and media uploads.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Japanese is the default locale (`/`). Vietnamese is `/vi`, English is `/en`.

Admin: `/admin` (or `/vi/admin`, `/en/admin`). Until Supabase env vars are set, the dashboard shows seed data.

## Supabase

1. Create a project.
2. Run `supabase/schema.sql`, then optionally `supabase/seed.sql`.
3. Create a public storage bucket named `media`.
4. Create an Auth user for CMS access.
5. Put URL and anon key in `.env.local`. Service role is only needed for server-side admin tooling.

## Cloudflare Pages

Do **not** deploy to Vercel or Netlify.

Dashboard settings:

- Framework preset: None
- Build command: `npx @cloudflare/next-on-pages`
- Build output directory: `.vercel/output/static`
- Compatibility flags: `nodejs_compat`
- Node version: 18 or 20

Environment variables (Production):

- `NEXT_PUBLIC_SITE_URL=https://vimai.jp`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional)
- `NEXT_PUBLIC_CONTACT_EMAIL`

Custom domain: `vimai.jp` (canonical).

CLI:

```bash
npm run pages:build
npm run preview
npm run deploy
```

`@cloudflare/next-on-pages` currently requires Next.js `<= 15.5.2`. Do not bump Next past that without switching adapters.

## Assets

Product logos live in `/logo các app/` and are copied to `public/images/products/`. Do not replace them with generated artwork.

## Footer

The legal line at the bottom of every public page is:

`© 2026 ViMai. All Rights Reserved.`
