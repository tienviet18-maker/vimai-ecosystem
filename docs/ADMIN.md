# Admin CMS

URL: `https://vimai.jp/admin` (later `https://admin.vimai.jp`)

Admin UI is English-first. Public content is JA / VI / EN.

1. Create a Supabase Auth user (email + password). Do not put credentials in source.
2. Run `supabase/schema.sql` then `supabase/migrations/002_cms_platform.sql`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` on Cloudflare Pages.
4. Create a public Storage bucket named `media` (or the name in `MEDIA_BUCKET`).
5. Sign in at `/admin/login`.

## Phone workflow — product screenshot

1. Open `https://vimai.jp/admin` (or `https://admin.vimai.jp` when DNS is attached).
2. Login.
3. Products → select product.
4. Media / Screenshots → Upload from this device.
5. Choose an image from the camera roll (JPEG/PNG/WebP/AVIF/SVG, max 8MB).
6. Add or keep the URL, optionally Set as hero, add alt later in Media.
7. Save.
8. The public website reads storage + database. No GitHub commit is required.

## Sections

- Dashboard, Products, Articles, Media, Reviews, Analytics, SEO, Settings, Messages
- Reviews stay pending until approved, rejected, archived, or featured
- Article drafts and scheduled posts are not public until publish time
- Preview routes are under `/admin/preview/*` and send `noindex`
- Logout and session handling use Supabase Auth cookies

## Authentication notes

Supabase Auth provides hashed passwords and session cookies. There is no fake login and no `AUTH_SECRET` in this stack; session security is handled by Supabase plus HTTPS on Cloudflare.
