-- Add ViMai Menkyo (slug `menkyo`) to the product hub.
-- Generated from src/lib/seed.ts. Idempotent: INSERT OR IGNORE only, so
-- re-running it never overwrites edits made later in the admin CMS.
-- Translations and FAQs attach to whichever row owns slug 'menkyo'.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO products (
  id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
  logo_url, supported_languages, published, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000006', 'menkyo', 'beta',
  NULL, NULL, 'https://menkyo.vimai.jp',
  1, 6, '/images/products/vimai_menkyo.png',
  '["vi","en","ja"]', 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
);

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features
)
SELECT
  '00000000-0000-0000-0000-000000000006-ja', id, 'ja',
  'ViMai Menkyo（日本の運転免許・学科）',
  '日本の運転免許・学科試験の学習アプリ',
  '日本で運転免許の学科試験（仮免・本免）や外国免許からの切替に取り組む、ベトナム語・英語話者のための学習アプリ（スマートフォン・Web）です。30の単元、約2,350問の練習問題（イラスト付きの問題も多数）、ViMaiが描いた標識・標示209点、危険予測イラスト107点、模擬試験60回分を収録しています。模擬試験は仮免20回（50問・30分・45問以上で合格）、本免20回（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替20回（50問・30分・45問以上で合格）です。内容は最新の日本の交通法規（2026年の改正など）に合わせて更新します。アプリの表示言語はベトナム語と英語で、日本語表示はありません。',
  'ルールを理解し、合格し、自信を持って運転しよう。学習を支えるツールであり、試験の合格を保証するものではありません。',
  '日本で運転免許（仮免・本免）を教習所や試験場で取得する人、または外国免許を切り替える人のうち、ベトナム語・英語で学びたい在住者。雇用主や教習所の方が内容を把握する際にもご覧ください。',
  '["模擬試験60回（仮免・本免・外免切替 各20回）","最新の交通法規に対応（2026年の改正など）","約2,350問の練習問題（イラスト付き多数）","30の学習単元","ViMaiが描いた標識・標示209点","危険予測イラスト107点","すぐに解説が出る学習モードと、本番と同じ時間で解く試験モード","間違えた問題の間隔反復による復習と、分野別の練習"]'
FROM products WHERE slug = 'menkyo';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features
)
SELECT
  '00000000-0000-0000-0000-000000000006-vi', id, 'vi',
  'ViMai Menkyo – Bằng lái Nhật',
  'Thi lý thuyết Karimen, Honmen và đổi bằng lái Nhật',
  'Ứng dụng (điện thoại và web) giúp người Việt và người dùng tiếng Anh tại Nhật học và luyện thi lý thuyết bằng lái ô tô Nhật (学科試験). Có 30 bài học, khoảng 2.350 câu luyện tập (nhiều câu có hình), thư viện 209 biển báo và vạch kẻ đường do ViMai vẽ, 107 tranh tình huống nguy hiểm và 60 đề thi thử: 20 đề Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), 20 đề Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm), 20 đề đổi bằng (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Nội dung luôn cập nhật theo luật giao thông Nhật hiện hành, gồm các thay đổi năm 2026. Ngôn ngữ trong app: tiếng Việt và tiếng Anh.',
  'Hiểu luật. Đậu bằng. Tự tin cầm lái. Đây là công cụ học tập, không cam kết đậu kỳ thi.',
  'Người Việt và người dùng tiếng Anh sống tại Nhật đang lấy bằng lái ô tô (Karimen, Honmen ở trường lái hoặc trung tâm sát hạch) hoặc đổi bằng nước ngoài sang bằng Nhật.',
  '["60 đề thi thử Karimen, Honmen, đổi bằng","Cập nhật theo luật giao thông Nhật mới nhất (2026)","Khoảng 2.350 câu, nhiều câu có hình","30 bài học lý thuyết","209 biển báo và vạch kẻ đường do ViMai vẽ","107 tranh tình huống nguy hiểm","Chế độ học giải thích ngay, chế độ thi tính giờ như thi thật","Ôn câu sai theo lịch lặp lại ngắt quãng, luyện theo chủ đề"]'
FROM products WHERE slug = 'menkyo';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features
)
SELECT
  '00000000-0000-0000-0000-000000000006-en', id, 'en',
  'ViMai Menkyo: Japan License',
  'Japanese driving theory test practice: Karimen, Honmen, conversion',
  'An app (mobile and web) for Vietnamese and English speakers in Japan learning for the Japanese driving-licence theory test (学科試験). It includes 30 lesson units, about 2,350 practice questions (many with pictures), a library of 209 road signs and markings drawn by ViMai, 107 hazard-scene illustrations, and 60 mock exams: 20 Karimen (仮免, 50 questions, 30 minutes, pass at 45), 20 Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100), and 20 licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). Content is kept up to date with current Japanese traffic law, including the 2026 changes. The app is in Vietnamese and English.',
  'Know the rules. Pass the test. Drive with confidence. A study tool; it does not guarantee a passing result.',
  'Vietnamese and English-speaking residents in Japan getting a Japanese driving licence (Karimen and Honmen at a driving school or test centre) or converting a foreign licence.',
  '["60 mock exams: Karimen, Honmen, conversion","Updated to current Japanese traffic law (2026)","About 2,350 questions, many with pictures","30 lesson units","209 road signs and markings drawn by ViMai","107 hazard-scene illustrations","Learning mode with instant explanations; exam mode timed like the real test","Mistake review with spaced repetition, plus topic practice"]'
FROM products WHERE slug = 'menkyo';

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-menkyo-1', (SELECT id FROM products WHERE slug = 'menkyo'), 5, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-1-vi', 'faq-menkyo-1', 'vi', 'ViMai Menkyo luyện thi những kỳ thi nào?', 'Thi lý thuyết bằng lái ô tô Nhật (学科試験): Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm) và đổi bằng nước ngoài (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Mỗi loại có 20 đề, tổng cộng 60 đề.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-1-en', 'faq-menkyo-1', 'en', 'Which tests does ViMai Menkyo cover?', 'The Japanese driving-licence theory test (学科試験): Karimen (仮免, 50 questions, 30 minutes, pass at 45), Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100) and foreign licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). There are 20 mock exams of each type, 60 in total.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-1-ja', 'faq-menkyo-1', 'ja', 'ViMai Menkyoはどの試験に対応していますか？', '日本の運転免許の学科試験です。仮免（50問・30分・45問以上で合格）、本免（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替（50問・30分・45問以上で合格）の模擬試験を各20回、計60回収録しています。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-menkyo-2', (SELECT id FROM products WHERE slug = 'menkyo'), 6, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-2-vi', 'faq-menkyo-2', 'vi', 'App dùng ngôn ngữ nào?', 'App có tiếng Việt và tiếng Anh. Nội dung bám luật giao thông Nhật hiện hành và được giải thích bằng ngôn ngữ bạn chọn.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-2-en', 'faq-menkyo-2', 'en', 'Which languages does the app use?', 'The app is available in Vietnamese and English. It explains current Japanese traffic law in the language you choose.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-2-ja', 'faq-menkyo-2', 'ja', 'アプリは何語で使えますか？', 'アプリの表示言語はベトナム語と英語です。日本語の画面はありません。日本の交通法規の内容を、ベトナム語・英語話者向けに説明しています。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-menkyo-3', (SELECT id FROM products WHERE slug = 'menkyo'), 7, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-3-vi', 'faq-menkyo-3', 'vi', 'Dùng miễn phí được những gì?', 'Mỗi loại thi có 5 đề thi thử miễn phí. VIP mở toàn bộ 60 đề, cùng hệ thống giá với các app ViMai khác. Đăng nhập là tùy chọn; khi đăng nhập, tiến độ học được giữ trên mọi thiết bị.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-3-en', 'faq-menkyo-3', 'en', 'What can I use for free?', 'Five mock exams of each type are free. VIP unlocks all 60, on the same pricing system as the other ViMai apps. Sign-in is optional; signing in keeps your progress on all your devices.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-menkyo-3-ja', 'faq-menkyo-3', 'ja', '無料でどこまで使えますか？', '模擬試験は種類ごとに5回分が無料です。VIPで60回分すべてが使えます。料金体系は他のViMaiアプリと同じです。ログインは任意で、ログインすると学習の進み具合をすべての端末で引き継げます。');
