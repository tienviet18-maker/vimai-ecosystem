-- ViCare web app is live at https://vicare.vimai.jp (owner, 2026-10-13):
-- status 'coming_soon' -> 'available' ("Đã phát hành"), website_url set, and
-- the long description drops "awaiting expert review": content is checked by
-- the ViCare team and is reference-only (never claims doctor review).
-- Idempotent and safe to re-run:
--   * status/website_url change only while still 'coming_soon' / NULL;
--   * long_description is replaced only while it still holds the 0012 text,
--     so admin CMS edits are kept.
-- Mirrors src/lib/seed.ts and d1/seed.sql.
PRAGMA foreign_keys = ON;

UPDATE products
SET status = 'available',
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE slug = 'vicare'
  AND status = 'coming_soon';

UPDATE products
SET website_url = 'https://vicare.vimai.jp',
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE slug = 'vicare'
  AND (website_url IS NULL OR website_url = '');

UPDATE product_translations
SET long_description = '受診時のコミュニケーションを助ける参考情報のアプリで、医師の助言に代わるものではありません。内容はViCareチームが作成・確認しています。アカウント不要で、個人のデータは端末内だけに保存されます。'
WHERE locale = 'ja'
  AND product_id = (SELECT id FROM products WHERE slug = 'vicare')
  AND instr(long_description, '専門家の確認待ち') > 0;

UPDATE product_translations
SET long_description = 'Thông tin tham khảo và công cụ hỗ trợ giao tiếp khi đi khám, không thay thế lời khuyên của bác sĩ. Nội dung do đội ViCare biên soạn và kiểm tra. Không cần tài khoản; dữ liệu cá nhân chỉ lưu trên điện thoại.'
WHERE locale = 'vi'
  AND product_id = (SELECT id FROM products WHERE slug = 'vicare')
  AND instr(long_description, 'đang chờ chuyên gia duyệt') > 0;

UPDATE product_translations
SET long_description = 'Reference information and a communication aid for doctor visits; it does not replace a doctor''s advice. Content is written and checked by the ViCare team. No account; personal data stays on your phone.'
WHERE locale = 'en'
  AND product_id = (SELECT id FROM products WHERE slug = 'vicare')
  AND instr(long_description, 'awaiting expert review') > 0;
