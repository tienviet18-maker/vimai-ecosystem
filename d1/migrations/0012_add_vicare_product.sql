-- Add ViCare (slug `vicare`) to the product hub: free, non-profit app that
-- helps Vietnamese people in Japan see a doctor. Generated from src/lib/seed.ts.
-- Idempotent: INSERT OR IGNORE only, so re-running it never overwrites edits
-- made later in the admin CMS. Translations attach to whichever row owns slug
-- 'vicare'. The /products/vicare page itself is a code page and does not need
-- this row; the row adds ViCare to the home page, product list, footer, the
-- ecosystem block on other product pages and the admin CMS.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO products (
  id, slug, status, category, app_store_url, google_play_url, website_url, featured, sort_order,
  logo_url, supported_languages, published, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000008', 'vicare', 'coming_soon', 'health',
  NULL, NULL, NULL,
  1, 8, '/images/products/vicare.png',
  '["vi","en","ja"]', 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
);

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000008-ja', id, 'ja',
  'ViCare（日本での受診サポート）',
  '日本で病院にかかるベトナム人のための無料アプリ',
  '日本に住むベトナム人が安心して受診できるよう支える、ViMaiの無料・非営利アプリです。診察時の通訳（マイク、端末内の音声認識を優先）、病院の書類や薬袋のカメラ読み取り（端末内で処理）、症状から診療科を選ぶガイドと危険なサイン、診療科別にGoogleマップで医療機関を探す機能、119・110・#7119・#8000の伝え方、緊急医療情報・受診記録・服用中の薬を備えています。',
  '参考情報とコミュニケーション支援のためのアプリで、診断ではありません。医療情報は専門家の確認待ちです。アカウント不要で、個人のデータは端末内だけに保存されます。',
  '日本で病院・クリニックを受診するベトナム人と、その受診を支える家族、会社、学校、支援機関の方。',
  '["診察通訳（マイク・数千の診察会話の例文）","書類・薬袋をカメラで読み取り（端末内）","症状から診療科の目安と危険なサイン","診療科別にGoogleマップで医療機関を検索","119・110・#7119・#8000の伝え方（住所を自動入力）","緊急医療情報・受診記録（医療費控除の集計）・服用中の薬","会話フレーズ、病気ガイド、手続き、医療用語辞典","無料・非営利、アカウント不要、データは端末内のみ"]',
  'ViCare｜ベトナム人の日本での受診をサポートする無料アプリ',
  'ViCareは日本で病院にかかるベトナム人のための無料・非営利アプリ。診察時の通訳、書類・薬袋のカメラ読み取り、症状から診療科の案内、119番の伝え方。アカウント不要。'
FROM products WHERE slug = 'vicare';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000008-vi', id, 'vi',
  'ViCare – Đi khám bệnh ở Nhật',
  'App miễn phí giúp người Việt đi khám bệnh ở Nhật',
  'ViCare là app miễn phí, phi lợi nhuận của ViMai, giúp người Việt tại Nhật đi khám bệnh: phiên dịch khi khám (micro, ưu tiên nhận dạng giọng nói trên máy), đọc giấy tờ bệnh viện và túi thuốc bằng camera (xử lý ngay trên điện thoại), “Tôi bị ốm” chọn đúng khoa kèm dấu hiệu nguy hiểm, tìm phòng khám theo khoa trên Google Maps, câu nói khi gọi 119, 110, #7119, #8000 và hồ sơ sức khoẻ (thông tin khẩn cấp, nhật ký khám, thuốc đang uống).',
  'Thông tin tham khảo và công cụ hỗ trợ giao tiếp, không phải chẩn đoán. Nội dung y khoa đang chờ chuyên gia duyệt. Không cần tài khoản; dữ liệu cá nhân chỉ lưu trên điện thoại.',
  'Người Việt sống tại Nhật cần đi khám bệnh, và gia đình, công ty, trường học, nghiệp đoàn hỗ trợ họ.',
  '["Phiên dịch khi khám (micro, hàng nghìn câu bác sĩ – bệnh nhân)","Đọc giấy tờ và túi thuốc bằng camera, ngay trên máy","Tôi bị ốm: triệu chứng → khoa, dấu hiệu nguy hiểm","Tìm phòng khám theo khoa trên Google Maps","Gọi 119, 110, #7119, #8000: câu nói, tự điền địa chỉ","Thông tin khẩn cấp, nhật ký khám (tổng cho 医療費控除), thuốc đang uống","Câu giao tiếp, cẩm nang bệnh, thủ tục, từ điển y khoa","Miễn phí, phi lợi nhuận, không cần tài khoản"]',
  'ViCare – App đi khám bệnh ở Nhật cho người Việt (miễn phí)',
  'ViCare giúp người Việt đi khám bệnh ở Nhật: phiên dịch khi khám, đọc giấy tờ và túi thuốc bằng camera, triệu chứng nên khám khoa nào, gọi 119. Miễn phí, không cần tài khoản.'
FROM products WHERE slug = 'vicare';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000008-en', id, 'en',
  'ViCare: See a Doctor in Japan',
  'A free app helping Vietnamese people see a doctor in Japan',
  'ViCare is a free, non-profit ViMai app that helps Vietnamese people in Japan see a doctor: a doctor-visit interpreter (microphone, on-device speech recognition first), camera reading of hospital papers and medicine bags (processed on the phone), an “I feel sick” symptom-to-department guide with warning signs, clinic search by department on Google Maps, scripts for 119, 110, #7119 and #8000, and health records (emergency info, visit diary, current medicines).',
  'Reference information and a communication aid, not a diagnosis. Medical content is awaiting expert review. No account; personal data stays on your phone.',
  'Vietnamese people living in Japan who need to see a doctor, and the family, employers, schools and support organisations who help them.',
  '["Doctor-visit interpreter (microphone, thousands of doctor–patient sentences)","Camera reading of papers and medicine bags, on the phone","I feel sick: symptoms → department, warning signs","Clinic search by department on Google Maps","119, 110, #7119, #8000 scripts with your address filled in","Emergency info, visit diary (totals for 医療費控除), current medicines","Phrasebook, illness guide, procedures, medical dictionary","Free, non-profit, no account"]',
  'ViCare – See a Doctor in Japan, Free App for Vietnamese',
  'ViCare helps Vietnamese people see a doctor in Japan: a visit interpreter, camera reading of papers and medicine bags, which department to visit, 119 scripts. Free, no account.'
FROM products WHERE slug = 'vicare';
