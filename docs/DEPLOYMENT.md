# Deployment

Cloudflare Pages project: `vimai-ecosystem`  
Production branch: `main`  
Canonical: `https://vimai.jp`

Build command: `npx @cloudflare/next-on-pages`  
Output: `.vercel/output/static`  
Compatibility flag: `nodejs_compat`

Do not create another Pages project. Do not change DNS blindly.

## Production resources

- D1: `vimai-cms` (binding `DB`). Database ID is in `wrangler.toml`.
- R2: `vimai-media` (binding `MEDIA`) — **enable R2 in Cloudflare Dashboard first**, then `npx wrangler r2 bucket create vimai-media`.

Schema: `npx wrangler d1 execute vimai-cms --remote --file=d1/schema.sql`  
Idempotent product seed: `npx wrangler d1 execute vimai-cms --remote --file=d1/seed.sql`
Migrations: `npx wrangler d1 migrations apply vimai-cms --remote` (e.g. `0017_rate_limits.sql`, the shared rate-limit table for contact, feedback and admin login; until it is applied the limiter fails open and login falls back to the old `auth_events` check).
`0018_add_kaigo_product.sql` adds ViMai Tokutei Kaigo (`tokutei-kaigo`, kaigo.vimai.jp). Until it is applied, public pages show Kaigo from `src/lib/seed.ts` (`SEED_FALLBACK_SLUGS` in `src/lib/product-sites.ts`); it only appears in the admin CMS after the migration.

## Security headers

`public/_headers` (static assets) and `headers()` in `next.config.mjs` (SSR pages and API routes) send the same baseline set: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, HSTS (1 year, includeSubDomains) and a minimal `Permissions-Policy`. There is no CSP yet; add one only after testing JSON-LD, the Cloudflare beacon and admin pages.

## Secrets / env vars (Pages Settings)

- `NEXT_PUBLIC_SITE_URL=https://vimai.jp` (also in wrangler `[vars]`)
- `AUTH_SECRET` (secret, ≥32 characters)
- `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` (first admin only; delete after first successful login)
- `SUPER_ADMIN_EMAIL` (protected emergency SUPER_ADMIN: cannot be demoted, disabled or deleted; only protects, never grants a role; unset = no account protected)
- Optional: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CF_BEACON_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`, `PUBLIC_MEDIA_BASE_URL`

www → apex: middleware 301.

Never set canonical to localhost, `*.pages.dev`, or Vercel URLs.

Default language is Vietnamese (`/`) with `localeDetection: false`. English is `/en`. Japanese is `/ja`.

## Rollback

Cloudflare Dashboard → Pages → `vimai-ecosystem` → Deployments → Retry / Rollback to the previous successful production deployment.

## Backup

`npx wrangler d1 export vimai-cms --remote --output=backup.sql`  
R2 objects are not in Git; copy the bucket after R2 is enabled.
