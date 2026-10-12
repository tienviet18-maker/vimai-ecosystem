-- Add ViMai Gino 1 Seibi (slug `gino1-seibi`) to the product hub.
-- Generated from src/lib/seed.ts. Idempotent: INSERT OR IGNORE only, so
-- re-running it never overwrites edits made later in the admin CMS.
-- Translations and FAQs attach to whichever row owns slug 'gino1-seibi'.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO products (
  id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
  logo_url, supported_languages, published, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000007', 'gino1-seibi', 'beta',
  NULL, NULL, 'https://gino1-seibi.vimai.jp',
  1, 7, '/images/products/gino1_seibi.png',
  '["vi","en","ja"]', 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
);

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000007-ja', id, 'ja',
  'ViMai Gino 1 Seibi（特定技能1号・自動車整備）',
  '特定技能1号 自動車整備分野の試験対策アプリ',
  'JASPA（日本自動車整備振興会連合会）が実施する「特定技能1号評価試験 自動車整備分野」の試験対策Webアプリです。JASPAのサンプル問題と同じ形式の模擬試験を20回分収録しています。1回分は学科の○×問題30問と、実技の課題3つ（各課題は2択の問題3問）で、全部で780問です。アプリでは1回分を80分で通して解きます。実技ではマイクロメータやダイヤルゲージなどの読み取り、図を使った問題を練習できます。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を表示できます。部品・用語辞典（2500語以上）は無料で引けます。',
  '問題はJASPAのサンプル問題と過去の3級自動車整備士試験の出題分野をもとにViMaiが書き直したもので、実際の試験問題ではありません。JASPAの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。',
  '特定技能1号（自動車整備分野）の評価試験を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ企業や登録支援機関が学習内容を確認する際にもご覧ください。',
  '["JASPAサンプル問題の形式に沿った模擬試験20回・780問","1回分：学科○×30問＋実技3課題（2択）、80分で通して解答","マイクロメータ・ダイヤルゲージなどの読み取りと図の問題","日本語の問題に振り仮名、ベトナム語・英語の訳を表示可能","間違えるとその場で止まって解説を表示（VIPはAIチューター付き）","部品・用語辞典 2500語以上（検索は無料）","VIP向けの試験のコツ","第1〜3回は無料"]',
  '特定技能1号 自動車整備 試験対策｜模擬試験20回・振り仮名付き',
  '特定技能1号評価試験（自動車整備分野）の試験対策アプリ。JASPAサンプル問題の形式に沿った模擬試験20回・780問（学科○×と実技2択）、振り仮名、ベトナム語・英語訳、部品・用語辞典。第1〜3回は無料。'
FROM products WHERE slug = 'gino1-seibi';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000007-vi', id, 'vi',
  'ViMai Gino 1 Seibi – Tokutei bảo dưỡng ô tô',
  'Luyện thi kỹ năng đặc định 1 ngành bảo dưỡng ô tô (特定技能1号 自動車整備)',
  'Ứng dụng web luyện thi Tokutei Gino 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), kỳ thi do JASPA tổ chức. Có 20 đề thi thử theo đúng dạng đề mẫu của JASPA: mỗi đề gồm 30 câu lý thuyết ○× (学科) và 3 bài thực hành (実技), mỗi bài 3 câu chọn 1 trong 2, tổng cộng 780 câu. Trong app, mỗi đề làm liền một lượt 80 phút. Phần thực hành luyện đọc hình vẽ và đọc số đo trên panme (micrometer), đồng hồ so (dial gauge) và các dụng cụ tương tự. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm từ điển phụ tùng và thuật ngữ hơn 2.500 mục, tra cứu miễn phí.',
  'Câu hỏi do ViMai viết lại dựa trên đề mẫu của JASPA và các chủ đề từng ra trong kỳ thi 3級 整備士; đây không phải đề thi thật và không được JASPA bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.',
  'Người Việt và người nước ngoài đang chuẩn bị thi kỹ năng đặc định 1 (Tokutei Gino 1) ngành bảo dưỡng ô tô, muốn làm quen đề tiếng Nhật có furigana và đọc giải thích bằng tiếng Việt.',
  '["20 đề thi thử theo dạng đề mẫu JASPA, 780 câu","Mỗi đề: 30 câu ○× lý thuyết + 3 bài thực hành chọn 1 trong 2, làm liền 80 phút","Câu thực hành có hình, đọc số đo panme, đồng hồ so","Tiếng Nhật có furigana, bật dịch tiếng Việt hoặc tiếng Anh","Chọn sai là dừng lại và giải thích ngay; VIP có thêm gia sư AI","Từ điển phụ tùng và thuật ngữ hơn 2.500 mục, tra cứu miễn phí","Mẹo làm bài dành cho VIP","Đề 1–3 miễn phí; VIP 3 tháng 700.000đ, thanh toán VietQR"]',
  'Luyện thi Tokutei bảo dưỡng ô tô – 20 đề kỹ năng đặc định 1',
  'Đề thi tokutei bảo dưỡng ô tô (特定技能1号 自動車整備): 20 đề thi thử theo dạng đề mẫu JASPA, 780 câu ○× và thực hành, có furigana và dịch tiếng Việt. Đề 1–3 miễn phí.'
FROM products WHERE slug = 'gino1-seibi';

INSERT OR IGNORE INTO product_translations (
  id, product_id, locale, name, tagline, description, long_description, target_audience, features,
  seo_title, seo_description
)
SELECT
  '00000000-0000-0000-0000-000000000007-en', id, 'en',
  'ViMai Gino 1 Seibi: Automobile Maintenance',
  'Tokutei Ginou (SSW i) automobile maintenance test practice',
  'A web app for practising the Tokutei Ginou automobile maintenance test (特定技能1号評価試験 自動車整備分野, Specified Skilled Worker (i)), which is run by JASPA. It has 20 mock exams in the JASPA sample format: each has 30 true/false (○×) theory questions (学科) and 3 practical tasks (実技) of 3 two-choice questions, 780 questions in total. In the app, each exam is taken in one 80-minute sitting. Practical questions use figures and gauge readings such as micrometers and dial gauges. Japanese questions have furigana, and Vietnamese and English translations can be turned on. A parts and terms dictionary with over 2,500 entries is free to search.',
  'Questions are written by ViMai, based on the JASPA sample exam and topics from past Class 3 mechanic (3級 整備士) exams. They are not real exam questions, and the app is not endorsed by JASPA. A study tool; it does not guarantee a passing result.',
  'Foreign learners preparing for the Specified Skilled Worker (i) automobile maintenance test who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.',
  '["20 mock exams in the JASPA sample format, 780 questions","Each exam: 30 true/false theory questions + 3 two-choice practical tasks, one 80-minute sitting","Practical questions with figures and micrometer and dial-gauge readings","Furigana on Japanese text; Vietnamese or English translation on demand","A wrong answer stops and shows the explanation; VIP adds an AI tutor","Parts and terms dictionary with over 2,500 entries, free to search","Exam tips for VIP members","Exams 1–3 are free"]',
  'Tokutei Ginou Automobile Maintenance Practice Tests (SSW i)',
  'Practise for the Tokutei Ginou automobile maintenance test (JASPA): 20 mock exams, 780 true/false and practical questions, furigana, Vietnamese and English translations. Exams 1–3 are free.'
FROM products WHERE slug = 'gino1-seibi';

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-gino1-1', (SELECT id FROM products WHERE slug = 'gino1-seibi'), 8, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-1-vi', 'faq-gino1-1', 'vi', 'ViMai Gino 1 Seibi luyện thi kỳ thi nào?', 'App luyện thi kỹ năng đặc định 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), thường gọi là thi Tokutei bảo dưỡng ô tô hay Tokutei Seibi. Kỳ thi do JASPA tổ chức, thi trên máy tính (CBT) bằng tiếng Nhật có furigana.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-1-en', 'faq-gino1-1', 'en', 'Which exam does ViMai Gino 1 Seibi prepare for?', 'The Tokutei Ginou (Specified Skilled Worker (i)) skills test for automobile maintenance (特定技能1号評価試験 自動車整備分野). The test is run by JASPA as a computer-based test (CBT) in Japanese, with furigana.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-1-ja', 'faq-gino1-1', 'ja', 'ViMai Gino 1 Seibiはどの試験の対策アプリですか？', '「特定技能1号評価試験 自動車整備分野」の対策アプリです。試験はJASPA（日本自動車整備振興会連合会）が実施し、CBT方式で、日本語の問題には振り仮名が付きます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-gino1-2', (SELECT id FROM products WHERE slug = 'gino1-seibi'), 9, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-2-vi', 'faq-gino1-2', 'vi', 'Đề thi gồm những phần nào, bao nhiêu điểm thì đậu?', 'Phần lý thuyết (学科) có 30 câu ○×, làm trong 60 phút, đậu khi đúng từ 65%. Phần thực hành (実技) có 3 bài (課題) gồm các câu chọn 1 trong 2, làm trong 20 phút, đậu khi đúng từ 60%. Phải đậu cả hai phần. Trong app, mỗi đề thi thử gồm 30 câu lý thuyết và 3 bài thực hành (mỗi bài 3 câu), làm liền một lượt 80 phút.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-2-en', 'faq-gino1-2', 'en', 'What is the test format and the pass mark?', 'The theory part (学科) has 30 true/false questions in 60 minutes; you pass with 65% correct. The practical part (実技) has 3 tasks of two-choice questions in 20 minutes; you pass with 60% correct. You must pass both parts. In the app, each mock exam has the 30 theory questions and 3 practical tasks (3 questions each), taken in one 80-minute sitting.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-2-ja', 'faq-gino1-2', 'ja', '試験の形式と合格基準は？', '学科は○×問題30問・60分で、65%以上の正答で合格です。実技は3つの課題（2択の問題）・20分で、60%以上の正答で合格です。学科と実技の両方に合格する必要があります。アプリの模擬試験は、学科30問と実技3課題（各3問）を1回80分で通して解く形式です。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-gino1-3', (SELECT id FROM products WHERE slug = 'gino1-seibi'), 10, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-3-vi', 'faq-gino1-3', 'vi', 'Dùng miễn phí được những gì?', 'Đề 1–3 miễn phí. Từ điển phụ tùng và thuật ngữ (hơn 2.500 mục) tra cứu miễn phí: từ tiếng Nhật, cách đọc và nghĩa ngắn. VIP mở đề 4–20, giải thích chi tiết, hình và flashcard trong từ điển, mẹo làm bài và gia sư AI giải thích câu sai.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-3-en', 'faq-gino1-3', 'en', 'What can I use for free?', 'Mock exams 1–3 are free. The parts and terms dictionary (over 2,500 entries) is free to search: the Japanese term, its reading and a short meaning. VIP unlocks exams 4–20, the dictionary''s detailed explanations, figures and flashcards, the exam tips and the AI tutor.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-3-ja', 'faq-gino1-3', 'ja', '無料でどこまで使えますか？', '模擬試験の第1〜3回は無料です。部品・用語辞典（2500語以上）は、単語・読み方・短い意味の検索が無料です。第4〜20回、辞典の詳しい解説・図・フラッシュカード、試験のコツ、AIチューターはVIPで使えます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-gino1-4', (SELECT id FROM products WHERE slug = 'gino1-seibi'), 11, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-4-vi', 'faq-gino1-4', 'vi', 'VIP giá bao nhiêu?', 'Trên web, VIP 3 tháng giá 700.000đ, thanh toán bằng chuyển khoản VietQR. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20%.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-4-en', 'faq-gino1-4', 'en', 'How much is VIP?', 'On the web, 3 months of VIP costs 700,000 VND, paid by VietQR bank transfer. A ViMai collaborator (CTV) referral code gives 10%, 15% or 20% off.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-4-ja', 'faq-gino1-4', 'ja', 'VIPの料金はいくらですか？', 'Webでは3か月のVIPが700,000ドンで、VietQR（ベトナムの銀行振込）で支払います。ViMaiの紹介者（CTV）のコードを使うと10%・15%・20%の割引になります。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-gino1-5', (SELECT id FROM products WHERE slug = 'gino1-seibi'), 12, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-5-vi', 'faq-gino1-5', 'vi', 'Dùng trên thiết bị nào, ngôn ngữ gì?', 'Hiện app đang ở bản beta trên web: mở gino1-seibi.vimai.jp bằng trình duyệt trên điện thoại hoặc máy tính là dùng được, chưa có bản trên App Store hay Google Play. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-5-en', 'faq-gino1-5', 'en', 'Which devices and languages are supported?', 'The app is a web app in beta: open gino1-seibi.vimai.jp in the browser on your phone or computer. There is no App Store or Google Play version yet. The app interface is available in Vietnamese, English and Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-5-ja', 'faq-gino1-5', 'ja', 'どの端末・言語で使えますか？', '現在はベータ版のWebアプリで、スマートフォンやパソコンのブラウザから gino1-seibi.vimai.jp を開いて使います。App Store・Google Play版はまだありません。アプリの表示言語はベトナム語・英語・日本語です。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-gino1-6', (SELECT id FROM products WHERE slug = 'gino1-seibi'), 13, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-6-vi', 'faq-gino1-6', 'vi', 'Khác gì so với kỳ thi 3級 整備士 (thợ bảo dưỡng ô tô cấp 3)?', 'Đây là hai kỳ thi khác nhau. App này bám dạng đề của kỳ thi Tokutei Gino 1 ngành bảo dưỡng ô tô (lý thuyết ○× và thực hành chọn 1 trong 2). Câu hỏi có tham khảo các chủ đề từng ra trong kỳ thi 3級 整備士 nhưng app không phải để luyện riêng kỳ thi 3級, và câu hỏi không phải đề thi thật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-6-en', 'faq-gino1-6', 'en', 'How is this different from the Class 3 mechanic (3級 整備士) exam?', 'They are different exams. This app follows the format of the Tokutei Ginou automobile maintenance test (true/false theory and two-choice practical questions). Its questions draw on topics from past 3級 整備士 exams, but it is not a prep app for the 3級 exam itself, and the questions are not real past questions.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-gino1-6-ja', 'faq-gino1-6', 'ja', '3級自動車整備士試験とは何が違いますか？', '別の試験です。このアプリは特定技能1号評価試験（自動車整備分野）の形式（学科○×と実技2択）に合わせて作られています。問題は過去の3級自動車整備士試験の出題分野も参考にしていますが、3級整備士試験そのものの対策アプリではなく、実際の過去問でもありません。');
