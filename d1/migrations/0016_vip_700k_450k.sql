-- Chủ dự án chốt 2026-10-19: mọi app VIP 3 tháng 700.000đ, 1 tháng 450.000đ.
-- Chỉ thay đúng các câu giá trong bản tiếng Việt; câu đã có giá 1 tháng thì bỏ qua (chạy lại an toàn).

UPDATE product_translations
   SET features = REPLACE(features, 'VIP 3 tháng 500.000đ, thanh toán VietQR', 'VIP 3 tháng 700.000đ, 1 tháng 450.000đ, thanh toán VietQR')
 WHERE locale = 'vi' AND features LIKE '%VIP 3 tháng 500.000đ, thanh toán VietQR%';

UPDATE product_translations
   SET features = REPLACE(features, 'VIP 3 tháng 700.000đ, thanh toán VietQR', 'VIP 3 tháng 700.000đ, 1 tháng 450.000đ, thanh toán VietQR')
 WHERE locale = 'vi' AND features LIKE '%VIP 3 tháng 700.000đ, thanh toán VietQR%';

UPDATE faq_translations
   SET answer = REPLACE(answer, 'VIP 3 tháng giá 500.000đ, thanh toán', 'VIP 3 tháng giá 700.000đ, 1 tháng giá 450.000đ, thanh toán')
 WHERE locale = 'vi' AND answer LIKE '%VIP 3 tháng giá 500.000đ, thanh toán%';

UPDATE faq_translations
   SET answer = REPLACE(answer, 'VIP 3 tháng giá 700.000đ, thanh toán', 'VIP 3 tháng giá 700.000đ, 1 tháng giá 450.000đ, thanh toán')
 WHERE locale = 'vi' AND answer LIKE '%VIP 3 tháng giá 700.000đ, thanh toán%';

UPDATE faq_translations
   SET answer = REPLACE(answer, '(còn 450.000đ, 425.000đ hoặc 400.000đ)', '(gói 3 tháng còn 630.000đ, 595.000đ hoặc 560.000đ)')
 WHERE locale = 'vi' AND answer LIKE '%(còn 450.000đ, 425.000đ hoặc 400.000đ)%';
