-- Add ViMai Tokutei Kaigo (slug `tokutei-kaigo`, site kaigo.vimai.jp) to the product hub.
-- Generated from src/lib/seed.ts. Idempotent: INSERT OR IGNORE only, so
-- re-running it never overwrites edits made later in the admin CMS.
-- Translations and FAQs attach to whichever row owns slug 'tokutei-kaigo'.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO products (
  id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
  logo_url, supported_languages, published, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000009', 'tokutei-kaigo', 'beta',
  NULL, NULL, 'https://kaigo.vimai.jp',
  1, 9, '/images/products/tokutei_kaigo.png',
  '["vi","en","ja"]', 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
);

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000009-ja', id, 'ja',
  'ViMai Tokutei Kaigo（特定技能1号・介護）',
  '特定技能1号「介護」の介護技能評価試験・介護日本語評価試験の対策アプリ',
  '特定技能1号「介護」の2つの試験、介護技能評価試験と介護日本語評価試験を練習するWebアプリです。公式の出題構成に合わせて、45問の技能試験20回分と15問の日本語試験30回分、合わせて1,350問を収録しています。本番と同じ60分・30分の時間配分で解き、正解するとすぐ次へ進み、間違えると止まって解説を表示します。漢字にはふりがなが付き、ベトナム語・英語の訳を表示できます。37の介護場面の声かけフレーズ（日本語の読み上げ付き）、記録・申し送りのページ、介護の単語帳500語、無料の試験ガイドも使えます。',
  '問題は公式の出題構成に合わせてViMaiが練習用に作成したもので、実際の試験問題ではありません。厚生労働省やプロメトリックの公認・監修を受けたものではありません。試験の日程・受験料・ルールは変わることがあるため、申し込む前に必ず公式ページを確認してください。学習を支えるツールであり、合格を保証するものではありません。',
  '日本で介護の仕事を目指し、特定技能1号「介護」の試験を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ施設や登録支援機関が学習内容を確認する際にもご覧ください。',
  '["介護技能評価試験の模擬試験20回（各45問・60分）","介護日本語評価試験の模擬試験30回（各15問・30分）","正解すると次へ、間違えると止まって解説（VIPはAI解説付き）","漢字にふりがな、ベトナム語・英語の訳を表示可能","37の介護場面の声かけフレーズ（日本語の読み上げ付き）と記録・申し送り（無料）","介護の単語帳500語（最初の100語は無料）","構成・合格基準・申し込み方法をまとめた無料の試験ガイド","技能・日本語とも最初の3回は無料、アカウント登録不要"]',
  '特定技能 介護 試験対策アプリ｜介護技能評価試験・日本語評価試験の模擬試験',
  '特定技能1号「介護」の試験対策アプリ。介護技能評価試験（45問・60分）20回分と介護日本語評価試験（15問・30分）30回分、ふりがな、ベトナム語・英語訳、37場面の声かけフレーズ、単語帳500語。最初の3回は無料。'
FROM products WHERE slug = 'tokutei-kaigo';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000009-vi', id, 'vi',
  'ViMai Tokutei Kaigo – Luyện thi kỹ năng đặc định ngành điều dưỡng',
  'Luyện thi Tokutei Ginou 1 ngành Kaigo (特定技能1号 介護): đề kỹ năng và đề tiếng Nhật',
  'Ứng dụng web luyện hai bài thi Tokutei Ginou 1 ngành chăm sóc điều dưỡng (Kaigo): 介護技能評価試験 (kỹ năng) và 介護日本語評価試験 (tiếng Nhật Kaigo). Có 20 đề kỹ năng 45 câu và 30 đề tiếng Nhật 15 câu theo đúng cấu trúc chính thức, tổng cộng 1.350 câu. Làm bài bấm giờ 60 phút và 30 phút như thi thật: chọn đúng tự sang câu sau, chọn sai thì dừng lại giải thích ngay. Chữ Hán có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm câu giao tiếp cho 37 bối cảnh chăm sóc (có giọng đọc tiếng Nhật), phần ghi chép và giao ca, sổ 500 từ vựng Kaigo và hướng dẫn thi miễn phí.',
  'Đề do ViMai biên soạn theo cấu trúc chính thức để luyện tập; đây không phải đề thi thật và không được Bộ Y tế, Lao động và Phúc lợi Nhật Bản hay Prometric bảo trợ. Lịch thi, lệ phí và quy định có thể thay đổi, hãy kiểm tra trang chính thức trước khi đăng ký. Công cụ học tập, không cam kết đậu kỳ thi.',
  'Người Việt và người nước ngoài muốn làm ngành chăm sóc điều dưỡng (介護) tại Nhật, đang chuẩn bị thi Tokutei Ginou 1 ngành Kaigo và muốn làm quen đề tiếng Nhật có furigana, đọc giải thích bằng tiếng Việt.',
  '["20 đề kỹ năng 介護技能評価試験, mỗi đề 45 câu, bấm giờ 60 phút","30 đề tiếng Nhật 介護日本語評価試験, mỗi đề 15 câu, bấm giờ 30 phút","Chọn đúng tự sang câu sau; chọn sai dừng lại giải thích, VIP có thêm AI giải thích","Chữ Hán có furigana, bật dịch tiếng Việt hoặc tiếng Anh","Câu giao tiếp 37 bối cảnh chăm sóc có giọng đọc tiếng Nhật, kèm ghi chép và giao ca, miễn phí","Sổ 500 từ vựng Kaigo, 100 từ đầu miễn phí","Hướng dẫn thi miễn phí: cấu trúc đề, điểm đỗ, cách đăng ký, link chính thức","Mỗi phần 3 đề đầu miễn phí, không cần tạo tài khoản; VIP 3 tháng 700.000đ, 1 tháng 450.000đ, thanh toán VietQR"]',
  'Luyện thi Tokutei Kaigo – 20 đề kỹ năng, 30 đề tiếng Nhật Kaigo',
  'Đề thi Tokutei Kaigo (特定技能 介護): 20 đề kỹ năng 45 câu, 30 đề tiếng Nhật 15 câu, bấm giờ như thật, furigana, dịch tiếng Việt, câu giao tiếp 37 bối cảnh. Mỗi phần 3 đề đầu miễn phí.'
FROM products WHERE slug = 'tokutei-kaigo';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000009-en', id, 'en',
  'ViMai Tokutei Kaigo: Care Worker Exam Practice',
  'Tokutei Ginou (SSW i) care worker (介護) skills and Japanese test practice',
  'A web app for practising the two Specified Skilled Worker (i) care exams, the care skills test (介護技能評価試験) and the care Japanese test (介護日本語評価試験). It has 20 skills tests of 45 questions and 30 Japanese tests of 15 questions that follow the official test structure, 1,350 questions in total. Tests are timed at 60 and 30 minutes like the real ones: a correct answer moves on by itself, and a wrong answer stops to show the explanation. Kanji have furigana, and Vietnamese and English translations can be turned on. It also has care phrases for 37 care situations with Japanese audio, a records and shift handover section, a 500-word care vocabulary book and a free exam guide.',
  'Questions are written by ViMai to follow the official structure for practice. They are not real exam questions, and the app is not endorsed by the Ministry of Health, Labour and Welfare or Prometric. Dates, fees and rules can change, so always check the official page before you apply. A study tool; it does not guarantee a passing result.',
  'Foreign learners who want to work in care (介護) in Japan and are preparing for the Specified Skilled Worker (i) care exams, especially those who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.',
  '["20 care skills mock tests (介護技能評価試験), 45 questions in 60 minutes each","30 care Japanese mock tests (介護日本語評価試験), 15 questions in 30 minutes each","A correct answer moves on; a wrong answer stops for the explanation, and VIP adds AI explanations","Furigana on kanji; Vietnamese or English translation on demand","Care phrases for 37 situations with Japanese audio, plus records and shift handovers, free","Care vocabulary book of 500 words, the first 100 free","Free exam guide: structure, pass marks, registration and official links","The first 3 tests of each part are free, no account needed"]',
  'Tokutei Kaigo Practice Tests: Care Skills and Japanese (SSW i)',
  'Practise for the Tokutei Ginou care exams: 20 care skills tests (45 questions, 60 min) and 30 care Japanese tests (15 questions, 30 min), furigana, Vietnamese and English translations, care phrases for 37 situations. The first 3 tests of each part are free.'
FROM products WHERE slug = 'tokutei-kaigo';

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-kaigo-1', (SELECT id FROM products WHERE slug = 'tokutei-kaigo'), 31, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-1-vi', 'faq-kaigo-1', 'vi', 'ViMai Tokutei Kaigo luyện thi kỳ thi nào?', 'App luyện hai bài thi Tokutei Ginou 1 ngành chăm sóc điều dưỡng (特定技能1号 介護): 介護技能評価試験 (bài kỹ năng) và 介護日本語評価試験 (bài tiếng Nhật Kaigo). Cả hai đều thi trên máy (CBT) tại Prometric, tổ chức gần như hằng tháng ở Nhật và ở nước ngoài. Muốn làm Tokutei ngành Kaigo thì phải đỗ cả hai bài.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-1-en', 'faq-kaigo-1', 'en', 'Which exams does ViMai Tokutei Kaigo prepare for?', 'The two Specified Skilled Worker (i) care exams: the care skills test (介護技能評価試験) and the care Japanese test (介護日本語評価試験). Both are computer-based tests (CBT) at Prometric, held almost every month in Japan and overseas. You must pass both to work in care under Tokutei Ginou.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-1-ja', 'faq-kaigo-1', 'ja', 'ViMai Tokutei Kaigoはどの試験の対策アプリですか？', '特定技能1号「介護」の2つの試験、介護技能評価試験と介護日本語評価試験の対策アプリです。どちらもプロメトリックのコンピューター試験（CBT）で、国内・海外でほぼ毎月実施されています。特定技能「介護」で働くには、両方の合格が必要です。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-kaigo-2', (SELECT id FROM products WHERE slug = 'tokutei-kaigo'), 32, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-2-vi', 'faq-kaigo-2', 'vi', 'Đề thi gồm những gì, bao nhiêu điểm thì đỗ?', 'Bài kỹ năng (介護技能評価試験) có 45 câu, làm trong 60 phút, đỗ khi đúng từ 60%. Bài tiếng Nhật Kaigo (介護日本語評価試験) có 15 câu, làm trong 30 phút, đỗ khi đúng từ 73%. Phải đỗ cả hai bài, và cần thêm JFT-Basic hoặc JLPT N4 trở lên. Quy định có thể thay đổi, hãy kiểm tra trang chính thức của Bộ Y tế, Lao động và Phúc lợi Nhật Bản trước khi đăng ký.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-2-en', 'faq-kaigo-2', 'en', 'What is the test format and the pass mark?', 'The care skills test has 45 questions in 60 minutes; you pass with 60% correct. The care Japanese test has 15 questions in 30 minutes; you pass with 73% correct. You must pass both, and you also need JFT-Basic or JLPT N4 or higher. Rules can change, so check the Ministry of Health, Labour and Welfare page before you apply.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-2-ja', 'faq-kaigo-2', 'ja', '試験の形式と合格基準は？', '介護技能評価試験は45問・60分で、60％以上の正答で合格です。介護日本語評価試験は15問・30分で、73％以上の正答で合格です。両方の試験に合格し、さらにJFT-BasicかJLPT N4以上の日本語能力が必要です。基準は変わることがあるため、申し込む前に厚生労働省の公式ページを確認してください。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-kaigo-3', (SELECT id FROM products WHERE slug = 'tokutei-kaigo'), 33, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-3-vi', 'faq-kaigo-3', 'vi', 'Dùng miễn phí được những gì?', 'Mỗi phần 3 đề đầu miễn phí (3 đề kỹ năng và 3 đề tiếng Nhật, tổng 6 đề), có furigana. Hướng dẫn thi, câu giao tiếp 37 bối cảnh, phần ghi chép và giao ca, 100 từ vựng đầu cũng miễn phí. VIP mở các đề còn lại, toàn bộ 500 từ vựng, mẹo thi VIP và AI giải thích câu sai.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-3-en', 'faq-kaigo-3', 'en', 'What can I use for free?', 'The first 3 tests of each part are free (3 skills and 3 Japanese tests, 6 in total), with furigana. The exam guide, care phrases for 37 situations, the records and shift handover section and the first 100 vocabulary words are free too. VIP unlocks the remaining tests, all 500 words, VIP exam tips and AI explanations of wrong answers.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-3-ja', 'faq-kaigo-3', 'ja', '無料でどこまで使えますか？', '技能試験・日本語試験とも最初の3回の模擬試験（合計6回）が無料です。試験ガイド、37場面の声かけフレーズ、記録・申し送りのページ、単語帳の最初の100語も無料です。VIPでは残りの模擬試験、残りの単語、VIP向けの試験のコツ、間違えた問題のAI解説が使えます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-kaigo-4', (SELECT id FROM products WHERE slug = 'tokutei-kaigo'), 34, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-4-vi', 'faq-kaigo-4', 'vi', 'VIP giá bao nhiêu?', 'Trên web, VIP 3 tháng giá 700.000đ và VIP 1 tháng giá 450.000đ, thanh toán bằng chuyển khoản VietQR, tự kích hoạt sau 1–2 phút. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20%.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-4-en', 'faq-kaigo-4', 'en', 'How much is VIP?', 'On the web, 3 months of VIP costs 700,000 VND and 1 month costs 450,000 VND, paid by VietQR bank transfer. A ViMai collaborator (CTV) referral code gives 10%, 15% or 20% off.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-4-ja', 'faq-kaigo-4', 'ja', 'VIPの料金はいくらですか？', 'Webでは3か月のVIPが700,000ドン、1か月のVIPが450,000ドンで、VietQR（ベトナムの銀行振込）で支払います。ViMaiの紹介者（CTV）のコードを使うと10%・15%・20%の割引になります。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-kaigo-5', (SELECT id FROM products WHERE slug = 'tokutei-kaigo'), 35, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-5-vi', 'faq-kaigo-5', 'vi', 'Dùng trên thiết bị nào, ngôn ngữ gì, có cần tài khoản không?', 'App chạy trên trình duyệt (web app): mở kaigo.vimai.jp trên điện thoại hoặc máy tính là dùng được ngay, có thể thêm ra màn hình chính như một ứng dụng. Không cần tạo tài khoản; khi mua VIP, app cấp mã khôi phục để dùng trên máy thứ hai. Giao diện app có tiếng Việt, tiếng Nhật và tiếng Anh.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-5-en', 'faq-kaigo-5', 'en', 'Which devices and languages are supported? Do I need an account?', 'It is a web app: open kaigo.vimai.jp in the browser on your phone or computer, and you can add it to the home screen. No account is needed. The app interface is available in Vietnamese, Japanese and English.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-5-ja', 'faq-kaigo-5', 'ja', 'どの端末・言語で使えますか？アカウントは必要ですか？', 'Webアプリです。スマートフォンやパソコンのブラウザで kaigo.vimai.jp を開けばすぐに使え、ホーム画面に追加することもできます。アカウント登録は不要です。アプリの表示言語はベトナム語・日本語・英語です。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-kaigo-6', (SELECT id FROM products WHERE slug = 'tokutei-kaigo'), 36, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-6-vi', 'faq-kaigo-6', 'vi', 'Đề trong app có phải đề thi thật không?', 'Không. Đề do ViMai biên soạn theo cấu trúc chính thức để luyện tập, không phải đề thi thật và không được Bộ Y tế, Lao động và Phúc lợi Nhật Bản hay Prometric bảo trợ. App không cam kết kết quả thi.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-6-en', 'faq-kaigo-6', 'en', 'Are the app''s questions the real exam?', 'No. ViMai writes them to follow the official structure for practice. They are not real exam questions, and the app is not endorsed by the Ministry of Health, Labour and Welfare or Prometric. The app does not promise a result.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-kaigo-6-ja', 'faq-kaigo-6', 'ja', 'アプリの問題は本番の試験問題ですか？', 'いいえ。公式の出題構成に合わせてViMaiが練習用に作成した問題で、本番の試験問題ではありません。厚生労働省やプロメトリックの公認・監修も受けていません。合格を保証するものではありません。');
