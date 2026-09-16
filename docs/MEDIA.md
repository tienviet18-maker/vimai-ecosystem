# Media

GitHub stores code only.

Phone → Admin CMS → `POST /api/admin/media` (authenticated) → R2 `MEDIA` binding → `media` table in D1 → `/api/media/<key>` on vimai.jp.

Folders: `product`, `article`, `brand`, `hero`, `og`, `general`.

## HOW TO UPLOAD A NEW PRODUCT SCREENSHOT FROM A PHONE

1. Open https://vimai.jp/admin
2. Login
3. Products
4. Select product
5. Screenshots
6. Upload
7. Choose image
8. Add alt text
9. Save
10. Website updates without GitHub deployment

## Validation

- size ≤ 8MB
- sniffed JPEG/PNG/WebP/AVIF/GIF (SVG rejected; client MIME is not trusted)
- sanitized filenames
- admin session required for upload, replace, metadata edit, and delete
