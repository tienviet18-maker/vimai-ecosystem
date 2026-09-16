# ViMai architecture

Production domain: `https://vimai.jp`  
Code: GitHub `tienviet18-maker/vimai-ecosystem` → Cloudflare Pages project `vimai-ecosystem`  
CMS database: Cloudflare D1 (`DB` binding, database name `vimai-cms`)  
Media: Cloudflare R2 (`MEDIA` binding, bucket `vimai-media`)

## Stack

- Next.js 15.5.2 App Router (`src/app/[locale]`)
- next-intl (`vi` default, `en`, `ja`, `localePrefix: as-needed`, `localeDetection: false`)
- Tailwind + shadcn/ui
- HMAC admin sessions (`AUTH_SECRET`, min 32 chars) + `admin_users` in D1
- `@cloudflare/next-on-pages` (edge)

Public and admin share one Next.js app. Admin lives at `/admin`. Do not create another Pages project.

## Data

- Public pages read D1. If D1 is unbound or empty, `src/lib/seed.ts` is used so the site is not blank.
- Images uploaded in admin go to R2 and are served at `/api/media/...` (or `PUBLIC_MEDIA_BASE_URL`).
- GitHub stores application code only.
- `wrangler.toml` bindings are local/code configuration. Production bindings must also be set in Cloudflare Dashboard.

## Auth

`POST /api/admin/login` verifies PBKDF2 password hashes in D1 and sets an HttpOnly HMAC cookie `vimai_session`. Sessions are rejected if the admin row is deleted. Mutating admin APIs require same-origin. All `/api/admin/*` routes call `requireAdmin()`. No Supabase Auth.

Bootstrap (`ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD`) works only when `admin_users` is empty. Remove those secrets after the first login.

## Analytics

Optional Cloudflare Web Analytics beacon + optional GraphQL zone totals. Numbers are not invented.

## Backup

Export D1 (`wrangler d1 export`) and enable R2 object-versioning or periodic copies. Media is not in Git.
