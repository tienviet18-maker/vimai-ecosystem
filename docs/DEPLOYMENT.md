# Deployment

Cloudflare Pages project: `vimai-ecosystem`  
Production branch: `main`  
Canonical: `https://vimai.jp`

Build command: `npx @cloudflare/next-on-pages`  
Output: `.vercel/output/static`  
Compatibility flag: `nodejs_compat`

`package-lock.json` is not in Git so Pages uses `npm install` instead of strict `npm ci`.

www → apex: middleware 301 from `www.vimai.jp` to `https://vimai.jp`.

Admin subdomain: point `admin.vimai.jp` at the **same** Pages project when ready. Middleware rewrites `/` to `/admin`. Do not create another Pages project. Do not change DNS blindly.

Never set canonical to localhost, `*.pages.dev`, or Vercel URLs.

## Required Pages environment variables

- `NEXT_PUBLIC_SITE_URL=https://vimai.jp`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional: `MEDIA_BUCKET`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CF_BEACON_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`, R2 placeholders.

## Manual steps after deploy

1. Apply SQL in Supabase.
2. Create the `media` bucket and an Auth user.
3. Optionally attach `admin.vimai.jp` to this Pages project.
4. Optionally enable Cloudflare Web Analytics and paste the beacon token.
