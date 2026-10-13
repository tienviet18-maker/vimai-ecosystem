-- Transport (tokutei-transport) and Taxi (tokutei-taxi) go to 'launched'
-- ("Đã phát hành"), and Transport gets its real hub page: vi/en/ja texts,
-- SEO title/description and FAQs. Owner approved 2026-10-12.
-- Idempotent and safe to re-run:
--   * status changes only while a product is still 'coming_soon';
--   * translation rows are overwritten only while they still hold the old
--     placeholder text from 0002 / seed.sql, so admin CMS edits are kept;
--   * FAQs use INSERT OR IGNORE.
-- en/ja texts never quote VND or VietQR: EN/JA readers buy VIP in the iOS app
-- (src/lib/store-policy.ts). Mirrors src/lib/seed.ts and d1/seed.sql.
PRAGMA foreign_keys = ON;

UPDATE products
SET status = 'launched',
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE slug IN ('tokutei-taxi', 'tokutei-transport')
  AND status = 'coming_soon';

UPDATE product_translations
SET name = 'ViMai Tokutei Transport（特定技能1号・トラック）',
    tagline = '特定技能1号 自動車運送業分野（トラック）の試験対策アプリ',
    description = 'ClassNK（一般財団法人日本海事協会）が実施する「自動車運送業分野特定技能1号評価試験」のトラック区分に向けた試験対策アプリです。CBT形式の模擬試験を20回分収録しています。1回分は50問（学科の○×問題30問と、実技の3択問題20問）、試験時間は80分で、学科・実技それぞれ60%以上の正答で合格という本番と同じ基準で採点します。実技は運転の判断、荷の積み付け・固縛、危険予知（KYT）などで、図を使った問題も多くあります。問題は「トラック運転者をめざす人のための学習用テキスト」に沿って作っています。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を切り替えて表示できます。試験によく出る用語510語の単語帳も付いています。',
    long_description = '問題は学習用テキストをもとにViMaiが作成したもので、実際の試験問題ではありません。ClassNKの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。',
    target_audience = '日本でトラック運転者として働くために、特定技能1号（自動車運送業分野・トラック）の評価試験を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ企業や登録支援機関が学習内容を確認する際にもご覧ください。',
    features = '["CBT形式の模擬試験20回・1,000問","1回分：学科○×30問＋実技3択20問、80分、各60%以上で合格","実技は運転の判断、積み付け・固縛、危険予知（KYT）。図の問題も多数","日本語の問題に振り仮名、ベトナム語・英語の訳を表示可能","間違えるとその場で止まって解説を表示（VIPはAIが解説）","トラック用語510語の単語帳（最初の100語は無料）","VIP向け：問題ごとの解き方のヒントと試験のコツ","第1〜3回は無料"]',
    seo_title = '特定技能1号 トラック 試験対策｜模擬試験20回・振り仮名付き',
    seo_description = '自動車運送業分野特定技能1号評価試験（トラック）の対策アプリ。CBT形式の模擬試験20回（各50問・80分）、振り仮名、ベトナム語・英語訳、用語510語。第1〜3回は無料。'
WHERE locale = 'ja'
  AND product_id = (SELECT id FROM products WHERE slug = 'tokutei-transport')
  AND instr(description, '対象者、学習の目的、模擬試験、日本語サポート') > 0;

UPDATE product_translations
SET name = 'ViMai Tokutei Transport – Tokutei xe tải',
    tagline = 'Luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục xe tải (特定技能1号 トラック)',
    description = 'Ứng dụng web luyện thi Tokutei Ginou 1 ngành vận tải ô tô, hạng mục xe tải (自動車運送業分野特定技能1号評価試験 トラック), kỳ thi do ClassNK (日本海事協会) tổ chức. Có 20 đề thi thử dạng CBT, mỗi đề 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành chọn 1 trong 3, làm trong 80 phút, đậu khi mỗi phần đúng từ 60%, giống cách chấm của kỳ thi thật. Phần thực hành gồm phán đoán khi lái xe, xếp và chằng buộc hàng, dự đoán nguy hiểm (KYT), nhiều câu có hình. Câu hỏi bám giáo trình 「トラック運転者をめざす人のための学習用テキスト」. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm sổ từ vựng 510 từ hay gặp trong đề.',
    long_description = 'Câu hỏi do ViMai soạn dựa trên giáo trình; đây không phải đề thi thật và không được ClassNK bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.',
    target_audience = 'Người Việt và người nước ngoài muốn làm tài xế xe tải tại Nhật, đang chuẩn bị thi kỹ năng đặc định 1 (Tokutei Ginou 1) ngành vận tải ô tô hạng mục xe tải, muốn làm quen đề tiếng Nhật có furigana và đọc giải thích bằng tiếng Việt.',
    features = '["20 đề thi thử dạng CBT, 1.000 câu","Mỗi đề: 30 câu ○× lý thuyết + 20 câu thực hành chọn 1 trong 3, 80 phút, mỗi phần từ 60% là đậu","Thực hành: phán đoán khi lái, xếp và chằng buộc hàng, dự đoán nguy hiểm (KYT), nhiều câu có hình","Tiếng Nhật có furigana, bật dịch tiếng Việt hoặc tiếng Anh","Chọn sai là dừng lại và giải thích ngay; VIP có thêm AI giải thích","Sổ từ vựng xe tải 510 từ (100 từ đầu miễn phí)","VIP: mẹo nhận ra đáp án cho từng câu và cẩm nang mẹo thi","Đề 1–3 miễn phí; VIP 3 tháng 500.000đ, thanh toán VietQR"]',
    seo_title = 'Luyện thi Tokutei xe tải (vận tải) – 20 đề thi thử CBT',
    seo_description = 'Đề thi Tokutei Ginou 1 xe tải (特定技能1号 トラック): 20 đề thi thử CBT 50 câu, 80 phút, có furigana, dịch tiếng Việt và 510 từ vựng. Đề 1–3 miễn phí.'
WHERE locale = 'vi'
  AND product_id = (SELECT id FROM products WHERE slug = 'tokutei-transport')
  AND instr(description, 'Nêu rõ đối tượng, mục đích học, đề thi thử') > 0;

UPDATE product_translations
SET name = 'ViMai Tokutei Transport: Truck Driver',
    tagline = 'Tokutei Ginou (SSW i) automobile transport test practice, truck category',
    description = 'A study app for the Tokutei Ginou automobile transport test, truck category (自動車運送業分野特定技能1号評価試験 トラック, Specified Skilled Worker (i)), which is run by ClassNK (Nippon Kaiji Kyokai). It has 20 CBT-style mock exams of 50 questions each: 30 true/false (○×) theory questions and 20 three-choice practical questions, 80 minutes, and you pass with at least 60% in each part, the same rule as the real test. Practical questions cover driving judgement, loading and securing cargo and hazard prediction (KYT), many of them with pictures. Questions follow the truck driver study textbook (トラック運転者をめざす人のための学習用テキスト). Japanese questions have furigana, and Vietnamese and English translations can be turned on. A trucking vocabulary book of 510 words is included.',
    long_description = 'Questions are written by ViMai, based on the study textbook. They are not real exam questions, and the app is not endorsed by ClassNK. A study tool; it does not guarantee a passing result.',
    target_audience = 'Foreign learners who want to work as truck drivers in Japan and are preparing for the Specified Skilled Worker (i) automobile transport test (truck), especially those who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.',
    features = '["20 CBT-style mock exams, 1,000 questions","Each exam: 30 true/false theory + 20 three-choice practical questions, 80 minutes, pass with 60% in each part","Practical: driving judgement, loading and securing cargo, hazard prediction (KYT), many with pictures","Furigana on Japanese text; Vietnamese or English translation on demand","A wrong answer stops and shows the explanation; VIP adds AI explanations","Trucking vocabulary book of 510 words (first 100 free)","For VIP: a tip for spotting the answer on every question, plus an exam tips guide","Exams 1–3 are free"]',
    seo_title = 'Tokutei Ginou Truck Driver Practice Tests (SSW i)',
    seo_description = 'Practise for the Tokutei Ginou truck test (ClassNK): 20 CBT mock exams of 50 questions, furigana, Vietnamese and English translations. Exams 1–3 are free.'
WHERE locale = 'en'
  AND product_id = (SELECT id FROM products WHERE slug = 'tokutei-transport')
  AND instr(description, 'It highlights the audience, study purpose, practice exams') > 0;

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-1', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 14, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-1-vi', 'faq-transport-1', 'vi', 'ViMai Tokutei Transport luyện thi kỳ thi nào?', 'App luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục xe tải (自動車運送業分野特定技能1号評価試験 トラック), thường gọi là thi Tokutei xe tải hay Tokutei vận tải. Kỳ thi do ClassNK (日本海事協会) tổ chức, thi trên máy tính (CBT) bằng tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-1-en', 'faq-transport-1', 'en', 'Which exam does ViMai Tokutei Transport prepare for?', 'The Tokutei Ginou (Specified Skilled Worker (i)) skills test for automobile transport, truck category (自動車運送業分野特定技能1号評価試験 トラック). The test is run by ClassNK (Nippon Kaiji Kyokai) as a computer-based test (CBT) in Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-1-ja', 'faq-transport-1', 'ja', 'ViMai Tokutei Transportはどの試験の対策アプリですか？', '「自動車運送業分野特定技能1号評価試験」のトラック区分の対策アプリです。試験はClassNK（一般財団法人日本海事協会）が実施し、CBT方式で行われます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-2', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 15, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-2-vi', 'faq-transport-2', 'vi', 'Đề thi gồm những phần nào, bao nhiêu điểm thì đậu?', 'Mỗi đề có 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành chọn 1 trong 3, làm trong 80 phút. Phải đúng từ 60% ở CẢ HAI phần (từ 18/30 câu lý thuyết và từ 12/20 câu thực hành); tổng điểm cao mà một phần dưới 60% vẫn trượt. Đề thi thử trong app có cùng cấu trúc và cách chấm này.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-2-en', 'faq-transport-2', 'en', 'What is the test format and the pass mark?', 'Each test has 50 questions: 30 true/false theory questions and 20 three-choice practical questions, in 80 minutes. You need at least 60% in BOTH parts (18 of 30 theory and 12 of 20 practical); a high total with one part under 60% is still a fail. The app''s mock exams use the same structure and scoring.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-2-ja', 'faq-transport-2', 'ja', '試験の形式と合格基準は？', '全50問で、学科の○×問題30問と実技の3択問題20問を80分で解きます。学科・実技それぞれ60%以上（学科18問以上、実技12問以上）の正答で合格です。合計点が高くても、どちらかが60%未満なら不合格です。アプリの模擬試験も同じ構成と採点方法です。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-3', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 16, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-3-vi', 'faq-transport-3', 'vi', 'Dùng miễn phí được những gì?', 'Đề 1–3 miễn phí, có furigana và bản dịch, không cần tài khoản. Sổ từ vựng mở miễn phí 100 từ đầu, hướng dẫn kỳ thi và đăng ký thi ClassNK cũng miễn phí. VIP mở đề 4–20, đủ 510 từ vựng, mẹo nhận ra đáp án cho từng câu, cẩm nang mẹo thi và AI giải thích câu sai.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-3-en', 'faq-transport-3', 'en', 'What can I use for free?', 'Mock exams 1–3 are free, with furigana and translations, and need no account. The first 100 words of the vocabulary book and the exam and ClassNK registration guides are free too. VIP unlocks exams 4–20, all 510 words, a tip for spotting the answer on every question, the exam tips guide and AI explanations of wrong answers.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-3-ja', 'faq-transport-3', 'ja', '無料でどこまで使えますか？', '模擬試験の第1〜3回は無料で、振り仮名と翻訳も使え、アカウント登録は不要です。単語帳の最初の100語、試験の案内とClassNKの申込ガイドも無料です。第4〜20回、単語帳の全510語、問題ごとの解き方のヒント、試験のコツ、AIによる誤答の解説はVIPで使えます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-4', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 17, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-4-vi', 'faq-transport-4', 'vi', 'VIP giá bao nhiêu?', 'Trên web, VIP 3 tháng giá 500.000đ, thanh toán bằng chuyển khoản VietQR, VIP tự mở sau khi chuyển khoản. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20% (còn 450.000đ, 425.000đ hoặc 400.000đ). Mỗi gói VIP dùng tối đa 2 thiết bị.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-4-en', 'faq-transport-4', 'en', 'How do I buy VIP?', 'VIP is bought inside the iOS app with Apple payment, and Apple shows the price. The App Store version is coming soon; the free exams can be tried on the web now.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-4-ja', 'faq-transport-4', 'ja', 'VIPはどこで購入できますか？', 'VIPはiOSアプリ内でAppleの決済により購入します。価格はAppleの画面に表示されます。App Store版は近日公開予定で、無料の模擬試験は今すぐWebで試せます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-5', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 18, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-5-vi', 'faq-transport-5', 'vi', 'Dùng trên thiết bị nào, ngôn ngữ gì?', 'App chạy trên trình duyệt: mở tokutei-transport.vimai.jp trên điện thoại (iPhone, Android) hoặc máy tính là làm được ngay, và có thể thêm ra màn hình chính như một ứng dụng. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-5-en', 'faq-transport-5', 'en', 'Which devices and languages are supported?', 'The free exams run in the browser on iPhone, Android or a computer, and the web app can be added to the home screen. An iOS app is coming to the App Store. The app interface is available in Vietnamese, English and Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-5-ja', 'faq-transport-5', 'ja', 'どの端末・言語で使えますか？', '無料の模擬試験は、iPhone・Android・パソコンのブラウザで使え、ホーム画面に追加することもできます。iOSアプリはApp Storeで近日公開予定です。アプリの表示言語はベトナム語・英語・日本語です。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-6', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 19, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-6-vi', 'faq-transport-6', 'vi', 'Câu hỏi trong app có phải đề thi thật không?', 'Không. Đề thi thử mô phỏng cấu trúc của kỳ thi (50 câu, 80 phút, mỗi phần từ 60%), còn câu hỏi do ViMai soạn bám giáo trình 「トラック運転者をめざす人のための学習用テキスト」, mỗi câu có giải thích. App không được ClassNK bảo trợ.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-6-en', 'faq-transport-6', 'en', 'Are these real exam questions?', 'No. The mock exams follow the structure of the test (50 questions, 80 minutes, 60% in each part), and the questions are written by ViMai from the truck driver study textbook, each with an explanation. The app is not endorsed by ClassNK.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-6-ja', 'faq-transport-6', 'ja', '実際の試験問題ですか？', 'いいえ。模擬試験は本番の構成（50問・80分・各60%以上で合格）に合わせていますが、問題は「トラック運転者をめざす人のための学習用テキスト」をもとにViMaiが作成したもので、すべてに解説が付いています。ClassNKの公認・監修を受けたものではありません。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-transport-7', (SELECT id FROM products WHERE slug = 'tokutei-transport'), 20, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-7-vi', 'faq-transport-7', 'vi', 'Tôi thi ngành Taxi thì dùng app nào?', 'Đề xe tải khác đề taxi. Nếu thi hạng mục taxi, hãy dùng ViMai Tokutei Taxi (tokutei-taxi.vimai.jp).');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-7-en', 'faq-transport-7', 'en', 'I am taking the taxi test. Which app should I use?', 'The truck test is different from the taxi test. For the taxi category, use ViMai Tokutei Taxi.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-transport-7-ja', 'faq-transport-7', 'ja', 'タクシーの試験を受ける場合は？', 'トラックとタクシーは別の試験です。タクシー区分を受ける場合は、ViMai Tokutei Taxiをご利用ください。');
