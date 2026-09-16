# Media

GitHub stores code only.

Uploads go:

Phone → Admin CMS → `POST /api/admin/media` (authenticated) → Supabase Storage bucket `media` → `media` table metadata → public URLs on vimai.jp.

R2 can replace Storage later using `R2_*` env vars; the upload API is the seam. Do not commit product screenshots to Git.

## HOW TO UPLOAD A NEW PRODUCT SCREENSHOT FROM A PHONE

1. Open admin.vimai.jp (or https://vimai.jp/admin)
2. Login
3. Products
4. Select product
5. Media / Screenshots
6. Upload
7. Choose image
8. Add alt text / set as hero if needed
9. Save
10. Website updates without GitHub deployment

## Validation

- size ≤ 8MB
- sniffed JPEG/PNG/WebP/SVG signatures (not client MIME alone)
- sanitized filenames
- admin session required for upload and delete
- folders: `product`, `article`, `brand`, `hero`, `og`, `general`
