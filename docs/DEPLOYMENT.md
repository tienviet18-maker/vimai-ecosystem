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

## Secrets / env vars (Pages Settings)

- `NEXT_PUBLIC_SITE_URL=https://vimai.jp` (also in wrangler `[vars]`)
- `AUTH_SECRET` (secret, ≥32 characters)
- `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` (first admin only; delete after first successful login)
- Optional: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CF_BEACON_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`, `PUBLIC_MEDIA_BASE_URL`

www → apex: middleware 301.

Never set canonical to localhost, `*.pages.dev`, or Vercel URLs.

Default language is Vietnamese (`/`) with `localeDetection: false`. English is `/en`. Japanese is `/ja`.

## Rollback

Cloudflare Dashboard → Pages → `vimai-ecosystem` → Deployments → Retry / Rollback to the previous successful production deployment.

## Backup

`npx wrangler d1 export vimai-cms --remote --output=backup.sql`  
R2 objects are not in Git; copy the bucket after R2 is enabled.
