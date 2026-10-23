import type { Faq, Locale, Product } from "@/types";
import { resolveProductSite, toOptimizedImage } from "@/lib/product-sites";

export const seedProducts: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "tokutei-taxi",
    status: "launched",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://tokutei-taxi.vimai.jp",
    featured: true,
    sort_order: 1,
    logo_url: "/images/products/tokutei_taxi.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Tokutei Taxi",
        tagline: "特定技能1号 自動車運送業分野（タクシー）の試験対策アプリ：CBT模擬試験20回・1,000問",
        description:
          "ClassNK（一般財団法人日本海事協会）がCBT方式で実施する「自動車運送業分野特定技能1号評価試験」のタクシー区分に向けた試験対策アプリです。模擬試験を20回分収録しています。1回分は50問（学科の○×問題30問と、実技（判断）の3択問題20問）、試験時間は80分で、学科・実技それぞれ60%以上の正答で合格という本番と同じ基準で採点します。合計1,000問すべてに解説が付き、実技のうち100問には場面のイラストがあります。出題範囲はタクシーの学習用テキストに沿い、点呼・飲酒、駐停車、交通法規、接客、乗車拒否、運賃、緊急時・事故、障害のある方への配慮、補助犬、忘れ物などを扱います。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を表示できます。単語帳500語（フラッシュカード付き）、試験ガイド、ClassNKの申込ガイドも備えています。iPhoneアプリ（App Store）とブラウザで使えます。",
        long_description:
          "問題は学習用テキストと公式の試験案内をもとにViMaiが作成したもので、実際の試験問題ではありません。ClassNKの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。",
        target_audience:
          "日本でタクシー運転者として働くために、特定技能1号（タクシー）の評価試験を受ける外国人。",
        features: [
          "CBT形式の模擬試験20回・1,000問（学科○×30問＋実技3択20問、80分）",
          "本番と同じ採点：学科・実技それぞれ60%以上（学科18問・実技12問以上）で合格",
          "漢字に振り仮名、すべての問題でベトナム語・英語の訳を表示可能",
          "正解すると次へ自動で進み、間違えるとその場で解説（VIPはAIの解説付き）",
          "実技100問に場面のイラスト（交差点、乗降、歩行者、追い越しなど）",
          "タクシー用語500語・14分野の単語帳（フラッシュカード、Web版は日本語音声付き、最初の100語は無料）",
          "誤答の復習、解答の見直し、成績の履歴、問題のマークとCBT風の問題一覧",
          "無料の試験ガイドとClassNK申込ガイド、VIPは問題ごとのヒントと試験のコツ",
          "スマートフォンアプリの学習リマインダー、解説画面から問題の誤りを報告",
          "第1〜3回は無料。iPhoneではアプリ内でApple決済によりVIPを購入",
        ],
        seo_title: "特定技能1号 タクシー 試験対策｜模擬試験20回・1,000問",
        seo_description:
          "自動車運送業分野特定技能1号評価試験（タクシー）の対策アプリ。CBT形式の模擬試験20回（各50問・80分）、振り仮名、ベトナム語・英語訳、用語500語。第1〜3回は無料。",
      },
      {
        locale: "vi",
        name: "ViMai Tokutei Taxi",
        tagline: "Luyện thi Tokutei Ginou 1 ngành vận tải ô tô, hạng mục taxi (特定技能1号 タクシー): 20 đề CBT, 1.000 câu",
        description:
          "Ứng dụng luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục taxi (自動車運送業分野特定技能1号評価試験 タクシー), kỳ thi do ClassNK (日本海事協会) tổ chức trên máy tính (CBT). App có 20 đề thi thử, mỗi đề 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành (phán đoán tình huống) chọn 1 trong 3, làm trong 80 phút, đậu khi mỗi phần đúng từ 60%, giống cách chấm thật. Tổng cộng 1.000 câu, câu nào cũng có giải thích; 100 câu thực hành có hình minh họa tình huống. Nội dung bám giáo trình taxi: điểm danh (点呼) và rượu bia, dừng đỗ xe, luật giao thông, phục vụ khách, từ chối chở khách, cước phí, khẩn cấp và tai nạn, hỗ trợ người khuyết tật, chó trợ giúp, đồ để quên. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm sổ 500 từ vựng taxi có flashcard, hướng dẫn kỳ thi và hướng dẫn đăng ký thi ClassNK. Dùng trên app iPhone (App Store) hoặc trình duyệt.",
        long_description:
          "Câu hỏi do ViMai soạn dựa trên giáo trình và hướng dẫn thi chính thức; đây không phải đề thi thật và không được ClassNK bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người nước ngoài muốn làm tài xế taxi tại Nhật, đang chuẩn bị thi Tokutei Ginou 1 hạng mục taxi.",
        features: [
          "20 đề thi thử CBT, 1.000 câu: mỗi đề 30 câu ○× + 20 câu thực hành chọn 1 trong 3, 80 phút",
          "Chấm như thi thật: mỗi phần phải đúng từ 60% (từ 18/30 lý thuyết và 12/20 thực hành)",
          "Furigana cho chữ Hán, bật dịch tiếng Việt hoặc tiếng Anh cho từng câu",
          "Chọn đúng tự sang câu sau; chọn sai dừng lại và giải thích ngay; VIP có thêm AI giải thích câu sai",
          "100 câu thực hành có hình minh họa tình huống: giao lộ, đón trả khách, người đi bộ, vượt xe…",
          "Sổ 500 từ vựng taxi theo 14 chủ đề, có flashcard và giọng đọc tiếng Nhật (bản web); 100 từ đầu miễn phí",
          "Ôn lại câu sai, xem lại bài làm, lịch sử kết quả, đánh dấu câu và lưới câu hỏi như phòng thi",
          "Hướng dẫn kỳ thi và hướng dẫn đăng ký thi ClassNK miễn phí; VIP có mẹo cho từng câu và cẩm nang mẹo thi",
          "Nhắc học theo lịch trên app điện thoại; nút báo lỗi câu hỏi ngay trong phần giải thích",
          "Đề 1–3 miễn phí; VIP trên web: 1 tháng 450.000đ, 3 tháng 700.000đ, thanh toán VietQR, tối đa 2 thiết bị (VIP mua trên App Store là gói riêng)",
        ],
        seo_title: "Luyện thi Tokutei Taxi – 20 đề thi thử CBT, 1.000 câu",
        seo_description:
          "Đề thi Tokutei Ginou 1 taxi (特定技能1号 タクシー): 20 đề thi thử CBT 50 câu, 80 phút, có furigana, dịch tiếng Việt, 500 từ vựng. Đề 1–3 miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Tokutei Taxi",
        tagline: "Tokutei Ginou (SSW i) automobile transport test practice, taxi category: 20 CBT mock exams, 1,000 questions",
        description:
          "A study app for the Tokutei Ginou automobile transport test, taxi category (自動車運送業分野特定技能1号評価試験 タクシー, Specified Skilled Worker (i)), a computer-based test (CBT) run by ClassNK (Nippon Kaiji Kyokai). It has 20 mock exams of 50 questions each: 30 true/false (○×) theory questions and 20 three-choice practical (judgement) questions, 80 minutes, and you pass with at least 60% in each part, the same rule as the real test. That is 1,000 questions, every one with an explanation; 100 practical questions come with a scene illustration. Topics follow the taxi textbook: roll call (点呼) and alcohol checks, stopping and parking, traffic rules, customer service, refusing passengers, fares, emergencies and accidents, accessibility, assistance dogs and lost items. Japanese questions have furigana, and Vietnamese and English translations can be turned on. A 500-word taxi vocabulary book with flashcards, an exam guide and a ClassNK registration guide are included. Available as an iPhone app on the App Store and in the browser.",
        long_description:
          "Questions are written by ViMai from the textbook and the official test guidance. They are not real exam questions, and the app is not endorsed by ClassNK. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Foreign learners who want to drive a taxi in Japan and are preparing for the Specified Skilled Worker (i) taxi test.",
        features: [
          "20 CBT mock exams, 1,000 questions: 30 true/false + 20 three-choice practical questions, 80 minutes",
          "Scored like the real test: at least 60% in each part (18 of 30 theory, 12 of 20 practical)",
          "Furigana on kanji; Vietnamese or English translation for every question",
          "A correct answer moves on by itself; a wrong answer stops and explains; VIP adds AI explanations",
          "100 practical questions with scene illustrations: junctions, pick-ups, pedestrians, overtaking and more",
          "500-word taxi vocabulary book in 14 topics, with flashcards and Japanese audio (web); first 100 words free",
          "Mistake review, answer review, result history, question flags and an exam-style question grid",
          "Free exam guide and ClassNK registration guide; VIP adds a tip for every question and an exam tips guide",
          "Study reminders in the phone app; report a problem with any question from its explanation",
          "Exams 1–3 are free; on iPhone, VIP is bought in the app with Apple payment",
        ],
        seo_title: "Tokutei Ginou Taxi Practice Tests (SSW i) – 1,000 Questions",
        seo_description:
          "Practise for the Tokutei Ginou taxi test (ClassNK): 20 CBT mock exams of 50 questions, furigana, Vietnamese and English translations, 500 words. Exams 1–3 free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "tokutei-transport",
    status: "launched",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://tokutei-transport.vimai.jp",
    featured: true,
    sort_order: 2,
    logo_url: "/images/products/tokutei_vantai.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Tokutei Transport（特定技能1号・トラック）",
        tagline: "特定技能1号 自動車運送業分野（トラック）の試験対策アプリ：CBT模擬試験20回・1,000問",
        description:
          "ClassNK（一般財団法人日本海事協会）がCBT方式で実施する「自動車運送業分野特定技能1号評価試験」のトラック区分に向けた試験対策アプリです。模擬試験を20回分収録しています。1回分は50問（学科の○×問題30問と、実技の3択問題20問）、試験時間は80分で、学科・実技それぞれ60%以上の正答で合格という本番と同じ基準で採点します。合計1,000問すべてに解説が付き、128問には図があります。実技は運転の判断、荷の積み付け・固縛、日常点検、危険予知（KYT）などです。問題は「トラック運転者をめざす人のための学習用テキスト」に沿って作っています。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を表示できます。単語帳510語（フラッシュカード付き）、試験ガイド、ClassNKの申込ガイドも備えています。iPhoneアプリ（App Store）とブラウザで使えます。",
        long_description:
          "問題は学習用テキストをもとにViMaiが作成したもので、実際の試験問題ではありません。ClassNKの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。",
        target_audience:
          "日本でトラック運転者として働くために、特定技能1号（トラック）の評価試験を受ける外国人。",
        features: [
          "CBT形式の模擬試験20回・1,000問（学科○×30問＋実技3択20問、80分）",
          "本番と同じ採点：学科・実技それぞれ60%以上（学科18問・実技12問以上）で合格",
          "実技は運転の判断、積み付け・固縛、日常点検、危険予知（KYT）。図の問題128問",
          "漢字に振り仮名、すべての問題でベトナム語・英語の訳を表示可能",
          "正解すると次へ自動で進み、間違えるとその場で解説（VIPはAIの解説付き）",
          "トラック用語510語・11分野の単語帳（フラッシュカード、Web版は日本語音声付き、最初の100語は無料）",
          "誤答の復習、解答の見直し、成績の履歴、問題のマークとCBT風の問題一覧",
          "無料の試験ガイドとClassNK申込ガイド、VIPは問題ごとの解き方のヒントと試験のコツ",
          "スマートフォンアプリの学習リマインダー、解説画面から問題の誤りを報告",
          "第1〜3回は無料。iPhoneではアプリ内でApple決済によりVIPを購入",
        ],
        seo_title: "特定技能1号 トラック 試験対策｜模擬試験20回・振り仮名付き",
        seo_description:
          "自動車運送業分野特定技能1号評価試験（トラック）の対策アプリ。CBT形式の模擬試験20回（各50問・80分）、振り仮名、ベトナム語・英語訳、用語510語。第1〜3回は無料。",
      },
      {
        locale: "vi",
        name: "ViMai Tokutei Transport – Tokutei xe tải",
        tagline: "Luyện thi Tokutei Ginou 1 ngành vận tải ô tô, hạng mục xe tải (特定技能1号 トラック): 20 đề CBT, 1.000 câu",
        description:
          "Ứng dụng luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục xe tải (自動車運送業分野特定技能1号評価試験 トラック), kỳ thi do ClassNK (日本海事協会) tổ chức trên máy tính (CBT). Có 20 đề thi thử, mỗi đề 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành chọn 1 trong 3, làm trong 80 phút, đậu khi mỗi phần đúng từ 60%, giống cách chấm của kỳ thi thật. Tổng cộng 1.000 câu, câu nào cũng có giải thích; 128 câu có hình. Phần thực hành gồm phán đoán khi lái xe, xếp và chằng buộc hàng, kiểm tra hằng ngày, dự đoán nguy hiểm (KYT). Câu hỏi bám giáo trình 「トラック運転者をめざす人のための学習用テキスト」. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm sổ 510 từ vựng xe tải có flashcard, hướng dẫn kỳ thi và hướng dẫn đăng ký thi ClassNK. Dùng trên app iPhone (App Store) hoặc trình duyệt.",
        long_description:
          "Câu hỏi do ViMai soạn dựa trên giáo trình; đây không phải đề thi thật và không được ClassNK bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người nước ngoài muốn làm tài xế xe tải tại Nhật, đang chuẩn bị thi Tokutei Ginou 1 hạng mục xe tải.",
        features: [
          "20 đề thi thử CBT, 1.000 câu: mỗi đề 30 câu ○× + 20 câu thực hành chọn 1 trong 3, 80 phút",
          "Chấm như thi thật: mỗi phần phải đúng từ 60% (từ 18/30 lý thuyết và 12/20 thực hành)",
          "Thực hành: phán đoán khi lái, xếp và chằng buộc hàng, kiểm tra hằng ngày, dự đoán nguy hiểm (KYT); 128 câu có hình",
          "Furigana cho chữ Hán, bật dịch tiếng Việt hoặc tiếng Anh cho từng câu",
          "Chọn đúng tự sang câu sau; chọn sai dừng lại và giải thích ngay; VIP có thêm AI giải thích câu sai",
          "Sổ 510 từ vựng xe tải theo 11 chủ đề, có flashcard và giọng đọc tiếng Nhật (bản web); 100 từ đầu miễn phí",
          "Ôn lại câu sai, xem lại bài làm, lịch sử kết quả, đánh dấu câu và lưới câu hỏi như phòng thi",
          "Hướng dẫn kỳ thi và hướng dẫn đăng ký thi ClassNK miễn phí; VIP có mẹo nhận ra đáp án cho từng câu và cẩm nang mẹo thi",
          "Nhắc học theo lịch trên app điện thoại; nút báo lỗi câu hỏi ngay trong phần giải thích",
          "Đề 1–3 miễn phí; VIP trên web: 1 tháng 450.000đ, 3 tháng 700.000đ, thanh toán VietQR, tối đa 2 thiết bị (VIP mua trên App Store là gói riêng)",
        ],
        seo_title: "Luyện thi Tokutei xe tải (vận tải) – 20 đề thi thử CBT",
        seo_description:
          "Đề thi Tokutei Ginou 1 xe tải (特定技能1号 トラック): 20 đề thi thử CBT 50 câu, 80 phút, có furigana, dịch tiếng Việt và 510 từ vựng. Đề 1–3 miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Tokutei Transport: Truck Driver",
        tagline: "Tokutei Ginou (SSW i) automobile transport test practice, truck category: 20 CBT mock exams, 1,000 questions",
        description:
          "A study app for the Tokutei Ginou automobile transport test, truck category (自動車運送業分野特定技能1号評価試験 トラック, Specified Skilled Worker (i)), a computer-based test (CBT) run by ClassNK (Nippon Kaiji Kyokai). It has 20 mock exams of 50 questions each: 30 true/false (○×) theory questions and 20 three-choice practical questions, 80 minutes, and you pass with at least 60% in each part, the same rule as the real test. That is 1,000 questions, every one with an explanation; 128 of them have a picture. Practical questions cover driving judgement, loading and securing cargo, daily checks and hazard prediction (KYT). Questions follow the truck driver study textbook (トラック運転者をめざす人のための学習用テキスト). Japanese questions have furigana, and Vietnamese and English translations can be turned on. A 510-word trucking vocabulary book with flashcards, an exam guide and a ClassNK registration guide are included. Available as an iPhone app on the App Store and in the browser.",
        long_description:
          "Questions are written by ViMai, based on the study textbook. They are not real exam questions, and the app is not endorsed by ClassNK. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Foreign learners who want to work as truck drivers in Japan and are preparing for the Specified Skilled Worker (i) truck test.",
        features: [
          "20 CBT mock exams, 1,000 questions: 30 true/false + 20 three-choice practical questions, 80 minutes",
          "Scored like the real test: at least 60% in each part (18 of 30 theory, 12 of 20 practical)",
          "Practical: driving judgement, loading and securing cargo, daily checks, hazard prediction (KYT); 128 questions with pictures",
          "Furigana on kanji; Vietnamese or English translation for every question",
          "A correct answer moves on by itself; a wrong answer stops and explains; VIP adds AI explanations",
          "510-word trucking vocabulary book in 11 topics, with flashcards and Japanese audio (web); first 100 words free",
          "Mistake review, answer review, result history, question flags and an exam-style question grid",
          "Free exam guide and ClassNK registration guide; VIP adds a tip for spotting the answer on every question and an exam tips guide",
          "Study reminders in the phone app; report a problem with any question from its explanation",
          "Exams 1–3 are free; on iPhone, VIP is bought in the app with Apple payment",
        ],
        seo_title: "Tokutei Ginou Truck Driver Practice Tests (SSW i)",
        seo_description:
          "Practise for the Tokutei Ginou truck test (ClassNK): 20 CBT mock exams of 50 questions, furigana, Vietnamese and English translations. Exams 1–3 are free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "seibi",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://seibishi3.vimai.jp",
    featured: true,
    sort_order: 3,
    logo_url: "/images/products/sebishi_3kyu.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Seibishi 3kyu",
        tagline: "3級自動車整備士 登録試験（学科）の対策アプリ：3種類・模擬試験60回・1,800問",
        description:
          "JASPA（日本自動車整備振興会連合会）が実施する3級自動車整備士 登録試験の学科対策Webアプリです。試験は3級シャシ、3級ガソリン・エンジン、3級ジーゼル・エンジンの3種類に分かれ、それぞれ別に受験します。どれも4択問題30問・60分で、70%（21問）以上の正答で合格です。アプリには3種類それぞれ20回分、合計60回・1,800問の模擬試験を収録し、すべての問題に解説が付いています。434問には描き直した図（構造、回路、測定器など）があります。日本語の問題には振り仮名が付き（表示の切り替え可）、必要なときにベトナム語・英語の訳を表示できます。部品・用語辞典（2,520語・9分野）は無料で引け、4択問題の読み方のコツも収録しています。",
        long_description:
          "問題は3級の出題範囲と過去の出題テーマをもとにViMaiが作成したもので、図も描き直しています。実際の試験問題ではなく、JASPAの公認・監修を受けたものでもありません。法令の問題は現行の保安基準・細目告示で確認しています。学習を支えるツールであり、合格を保証するものではありません。",
        target_audience:
          "日本で働きながら3級自動車整備士の登録試験（学科）を受ける外国人。",
        features: [
          "シャシ・ガソリン・ジーゼルの3種類×20回、模擬試験60回・1,800問",
          "1回分：4択30問・60分、70%（21問）以上で合格という本番と同じ基準",
          "振り仮名（表示切り替え可）、すべての問題でベトナム語・英語の訳を表示可能",
          "描き直した図の問題434問（エンジン・シャシの構造、回路、測定器）",
          "正解すると次の問題へ自動で進み、間違えるとその場で解説を表示（VIPはAIの解説付き）",
          "法令の問題は現行の保安基準・細目告示で確認",
          "部品・用語辞典2,520語・9分野（検索は無料、詳しい解説・図・フラッシュカードはVIP、Web版は日本語音声付き）",
          "「4択問題の読み方のコツ」：問題の種類の見分け方と一部の手がかりは無料、残りと問題ごとのヒントはVIP",
          "誤答の復習、解答の見直し、成績の履歴、アプリ内で問題の誤りを報告",
          "各科目の第1〜3回（計9回）は無料",
        ],
        seo_title: "3級自動車整備士 学科 対策｜模擬試験60回・1,800問・振り仮名付き",
        seo_description:
          "3級自動車整備士 登録試験（シャシ・ガソリン・ジーゼル）の学科対策アプリ。模擬試験60回・1,800問（4択30問・60分）、振り仮名、ベトナム語・英語訳、部品・用語辞典。各科目の第1〜3回は無料。",
      },
      {
        locale: "vi",
        name: "ViMai Seibishi 3kyu – Luyện thi 3級 自動車整備士",
        tagline: "Luyện thi lý thuyết thợ bảo dưỡng ô tô cấp 3 (3級自動車整備士): 60 đề, 1.800 câu, 3 môn",
        description:
          "Ứng dụng web luyện thi lý thuyết (学科) kỳ thi 3級自動車整備士 登録試験 (thợ bảo dưỡng ô tô cấp 3), kỳ thi do JASPA tổ chức. Kỳ thi chia thành 3 môn, thi riêng từng môn: 3級シャシ (khung gầm), 3級ガソリン・エンジン (động cơ xăng) và 3級ジーゼル・エンジン (động cơ diesel). Mỗi môn có 30 câu trắc nghiệm 4 lựa chọn, làm trong 60 phút, đậu khi đúng từ 70% (21/30 câu). App có 20 đề thi thử cho mỗi môn, tổng cộng 60 đề, 1.800 câu, câu nào cũng có giải thích; 434 câu có hình vẽ lại (cấu tạo, sơ đồ, dụng cụ đo). Câu hỏi tiếng Nhật có furigana (bật/tắt được), cần thì bật bản dịch tiếng Việt hoặc tiếng Anh. Kèm từ điển phụ tùng và thuật ngữ 2.520 mục chia 9 nhóm, tra cứu miễn phí, và bí kíp đọc đề 4 lựa chọn.",
        long_description:
          "Câu hỏi do ViMai soạn dựa trên phạm vi giáo trình 3級 và các chủ đề từng ra trong đề thi, hình được vẽ lại. Đây không phải đề thi thật và không được JASPA bảo trợ. Câu hỏi về luật đã được đối chiếu với 保安基準 và 細目告示 hiện hành. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt đang làm việc hoặc học nghề bảo dưỡng ô tô tại Nhật, chuẩn bị thi lý thuyết 3級自動車整備士.",
        features: [
          "3 môn (khung gầm, động cơ xăng, động cơ diesel) × 20 đề: 60 đề thi thử, 1.800 câu",
          "Mỗi đề: 30 câu 4 lựa chọn, 60 phút, đúng từ 70% (21/30) là đậu, giống kỳ thi thật",
          "Furigana (bật/tắt được), bật dịch tiếng Việt hoặc tiếng Anh cho từng câu",
          "434 câu có hình vẽ lại: cấu tạo động cơ, khung gầm, mạch điện, dụng cụ đo",
          "Chọn đúng là tự sang câu tiếp; chọn sai là dừng lại và giải thích ngay; VIP có thêm AI giải thích",
          "Câu hỏi về luật được đối chiếu với 保安基準 và 細目告示 hiện hành",
          "Từ điển phụ tùng và thuật ngữ 2.520 mục (9 nhóm), tra cứu miễn phí; giải thích chi tiết, hình và flashcard dành cho VIP; giọng đọc tiếng Nhật trên web",
          "Bí kíp đọc đề 4 lựa chọn: cách nhận kiểu câu và một số dấu hiệu miễn phí; phần còn lại và mẹo từng câu dành cho VIP",
          "Ôn lại câu sai, xem lại bài làm, lịch sử kết quả; báo lỗi câu hỏi ngay trong app",
          "Đề 1–3 của mỗi môn miễn phí (9 đề); VIP trên web: 1 tháng 450.000đ, 3 tháng 700.000đ, thanh toán VietQR, tối đa 2 thiết bị",
        ],
        seo_title: "Luyện thi 3級 自動車整備士 – 60 đề thi thử lý thuyết",
        seo_description:
          "Đề thi 3級自動車整備士 (bảo dưỡng ô tô cấp 3): 60 đề thi thử khung gầm, xăng, diesel, 1.800 câu 4 lựa chọn, có furigana, dịch tiếng Việt. Đề 1–3 mỗi môn miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Seibishi 3kyu",
        tagline: "Class 3 automobile mechanic (3級自動車整備士) written exam practice: 60 papers, 1,800 questions, 3 subjects",
        description:
          "A web app for practising the written part (学科) of the Class 3 automobile mechanic registration exam (3級自動車整備士 登録試験), which is run by JASPA. The exam has three subjects, each taken separately: 3級シャシ (chassis), 3級ガソリン・エンジン (gasoline engine) and 3級ジーゼル・エンジン (diesel engine). Each paper has 30 four-choice questions in 60 minutes, and you pass with 70% correct (21 of 30). The app has 20 mock papers for each subject: 60 papers and 1,800 questions in total, each with an explanation; 434 questions have redrawn figures (components, diagrams, measuring tools). Japanese questions have furigana, which you can turn on or off, and Vietnamese and English translations can be shown when you need them. A parts and terms dictionary with 2,520 entries in 9 groups is free to search, and a guide to reading four-choice questions is included.",
        long_description:
          "Questions are written by ViMai from the Class 3 syllabus and topics of past exams, and figures are redrawn. They are not real exam questions, and the app is not endorsed by JASPA. Law questions are checked against the current safety standards (保安基準 and 細目告示). A study tool; it does not guarantee a passing result.",
        target_audience:
          "Foreign workers and trainees in Japan preparing for the Class 3 automobile mechanic written exam.",
        features: [
          "Three subjects (chassis, gasoline engine, diesel engine) × 20 papers: 60 mock papers, 1,800 questions",
          "Each paper: 30 four-choice questions, 60 minutes, pass with 70% (21 of 30), as in the real exam",
          "Furigana (on/off); Vietnamese or English translation for every question",
          "434 questions with redrawn figures: engine and chassis parts, circuits, measuring tools",
          "A correct answer moves on by itself; a wrong answer stops and shows the explanation; VIP adds AI explanations",
          "Law questions checked against the current 保安基準 and 細目告示",
          "Parts and terms dictionary with 2,520 entries in 9 groups, free to search; details, figures and flashcards for VIP; Japanese audio on the web",
          "Tips for reading four-choice questions: question types and some cues are free; the rest and per-question tips are for VIP",
          "Mistake review, answer review and result history; report a problem with any question in the app",
          "Papers 1–3 of each subject are free (9 papers)",
        ],
        seo_title: "Class 3 Automobile Mechanic Exam Practice (3級整備士)",
        seo_description:
          "Class 3 automobile mechanic written exam (JASPA) practice: 60 mock papers, 1,800 four-choice questions (chassis, gasoline, diesel), furigana. Papers 1–3 free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    slug: "kids",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://kids.vimai.jp",
    featured: false,
    sort_order: 4,
    logo_url: "/images/products/vimai_kids.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Kids",
        tagline: "3〜7歳向けの学びアプリ：ベトナム語の文字、ひらがな、カタカナ、算数、考える力、ゲーム14種",
        description:
          "ViMai Kidsは3〜7歳の子ども向けの学習アプリです。日本に住むベトナム人家庭が、ベトナム語を保ちながら日本語にも親しめるように作りました。すべての活動に音声の案内があるので、まだ字が読めない子どもも一人で遊べます。ベトナム語は、音で覚える29文字、58の韻、239語、119の短い文で、つづり・単語・文を読む練習をします。日本語は、ひらがな114字とカタカナ130字（清音、濁音・半濁音、拗音、小さい字など）で、基本の92字は書き順を見て、なぞって、自分で書けます。算数は、数える、数字を読む、大小の比較、5と10までのたし算・ひき算、図形で、問題は毎回変わり、年齢に合わせて難しさが変わります。ほかに考える問題、お絵かき・ぬりえ、12テーマ・192枚の絵カードで世界を知るコーナー、ミニゲーム14種があります。広告なし、アプリ内課金なし、アカウント不要で、オフラインでも使えます。",
        long_description:
          "家庭での学習を補助するアプリで、学校の代わりにはならず、学習の成果や発達を保証するものではありません。データは収集せず、子どものプロフィールは端末内だけに保存されます。",
        target_audience:
          "3〜7歳の子どもを持つ保護者、特にベトナム語と日本語を並行して学ばせたい日本在住のベトナム人家庭。",
        features: [
          "ベトナム語：音で覚える29文字、58の韻、239語、119の短い文",
          "日本語：ひらがな114字・カタカナ130字、基本の92字は書き順を見て、なぞって、書く",
          "算数：数える、比べる、5と10までのたし算・ひき算、図形（年齢に合わせた難しさ）",
          "すべての活動に音声の案内。字が読めなくても一人で遊べる",
          "ゲーム14種：文字キャッチ、聞いて選ぶ、算数ロケット、数字の電車、動物にえさ、ふしぎなメロディ、太鼓を数えよう など",
          "世界を知る：12テーマ・192枚の絵カード（動物、果物、乗り物、仕事など）とクイズ",
          "考える問題、自由なお絵かきとぬりえ（指でもタッチペンでも）",
          "保護者ゲート付きの保護者エリア：スキル別の進み具合、1日の学習時間、複数の子どものプロフィール",
          "広告なし、アプリ内課金なし、データ収集なし、オフラインで使える",
        ],
        seo_title: "ViMai Kids｜ひらがな・カタカナ・ベトナム語・算数の学びアプリ",
        seo_description:
          "3〜7歳向けの学びアプリ。ベトナム語29文字、書き順付きのひらがな・カタカナ、算数、考える問題、音声付きゲーム14種。広告なし、オフライン対応。",
      },
      {
        locale: "vi",
        name: "ViMai Kids",
        tagline: "App học cho bé 3–7 tuổi: chữ tiếng Việt, Hiragana, Katakana, toán, tư duy và 14 trò chơi",
        description:
          "ViMai Kids là ứng dụng học tập cho bé 3–7 tuổi, dành cho các gia đình Việt ở Nhật muốn con vừa giữ tiếng Việt vừa làm quen tiếng Nhật. Mọi hoạt động đều có giọng đọc hướng dẫn nên bé chưa biết đọc vẫn tự chơi được. Tiếng Việt: đủ 29 chữ cái học theo âm, 58 vần, 239 từ và 119 câu ngắn để ghép vần, đọc từ, đọc câu. Tiếng Nhật: 114 chữ Hiragana và 130 chữ Katakana (chữ cơ bản, chữ có dấu, âm ghép, chữ nhỏ); 92 chữ cơ bản có thứ tự nét để bé xem, tô theo rồi tự viết. Toán: đếm, nhận biết số, so sánh, cộng trừ trong phạm vi 5 và 10, hình khối; câu hỏi đổi mới mỗi lần, độ khó theo tuổi. Kèm câu đố tư duy, góc vẽ và tô màu, 12 chủ đề khám phá thế giới với 192 thẻ hình và 14 trò chơi nhỏ. Không quảng cáo, không mua hàng trong ứng dụng, không cần tài khoản, dùng được khi không có mạng.",
        long_description:
          "Hỗ trợ học tại nhà, không thay thế lớp học và không cam kết kết quả học tập hay phát triển của trẻ. App không thu thập dữ liệu; hồ sơ của bé chỉ lưu trên máy.",
        target_audience:
          "Phụ huynh có con 3–7 tuổi, nhất là gia đình Việt ở Nhật muốn con học song song tiếng Việt và tiếng Nhật.",
        features: [
          "Tiếng Việt: 29 chữ cái học theo âm, 58 vần, 239 từ, 119 câu ngắn",
          "Tiếng Nhật: 114 Hiragana, 130 Katakana; 92 chữ cơ bản có thứ tự nét để xem, tô, tự viết",
          "Toán: đếm, so sánh, cộng trừ trong phạm vi 5 và 10, hình khối; độ khó theo tuổi",
          "Giọng đọc hướng dẫn mọi hoạt động: bé chưa biết đọc vẫn tự chơi được",
          "14 trò chơi: bắt chữ, nghe và chọn chữ, tên lửa toán, tàu số, cho thú ăn, giai điệu bí ẩn, đếm tiếng trống…",
          "Khám phá thế giới: 12 chủ đề, 192 thẻ hình (con vật, hoa quả, xe cộ, nghề nghiệp…) kèm câu đố",
          "Câu đố tư duy, góc vẽ tự do và tô màu; viết bằng ngón tay hoặc bút cảm ứng",
          "Khu phụ huynh có câu hỏi bảo vệ: xem tiến độ từng kỹ năng, đặt thời gian học mỗi ngày, nhiều hồ sơ bé",
          "Không quảng cáo, không mua hàng trong app, không thu thập dữ liệu, dùng được khi không có mạng",
        ],
        seo_title: "ViMai Kids – Bé học tiếng Việt, Hiragana, Katakana và toán",
        seo_description:
          "App học cho bé 3–7 tuổi: 29 chữ cái tiếng Việt, Hiragana và Katakana có thứ tự nét, toán, tư duy, 14 trò chơi có giọng đọc. Không quảng cáo, dùng offline.",
      },
      {
        locale: "en",
        name: "ViMai Kids",
        tagline: "A learning app for ages 3–7: Vietnamese letters, hiragana, katakana, maths, thinking and 14 games",
        description:
          "ViMai Kids is a learning app for children aged 3–7, made for Vietnamese families in Japan who want their child to keep Vietnamese and get used to Japanese. Every activity has voice guidance, so children who cannot read yet can play on their own. Vietnamese: all 29 letters taught by sound, 58 rhymes, 239 words and 119 short sentences for blending, word and sentence reading. Japanese: 114 hiragana and 130 katakana (basic, voiced, combined and small kana), with stroke order for the 92 basic characters so children can watch, trace and then write. Maths: counting, number recognition, comparing, addition and subtraction within 5 and 10, and shapes, with new questions every time and difficulty set by age. It also has thinking puzzles, a drawing and colouring corner, 12 topics with 192 picture cards to explore the world, and 14 mini games. No ads, no in-app purchases, no account, and it works offline.",
        long_description:
          "A home-learning aid; it does not replace school and does not promise learning or developmental outcomes. The app collects no data; the child's profile stays on the device.",
        target_audience:
          "Parents of children aged 3–7, especially Vietnamese families in Japan who want their child to learn Vietnamese and Japanese side by side.",
        features: [
          "Vietnamese: 29 letters taught by sound, 58 rhymes, 239 words, 119 short sentences",
          "Japanese: 114 hiragana, 130 katakana; stroke order for the 92 basic characters to watch, trace and write",
          "Maths: counting, comparing, addition and subtraction within 5 and 10, shapes; difficulty by age",
          "Voice guidance for every activity, so non-readers can play on their own",
          "14 games: catch the letter, listen and choose, maths rocket, number train, feed the animals, mystery melody, drum counting…",
          "Explore the world: 12 topics, 192 picture cards (animals, fruit, vehicles, jobs…) with quizzes",
          "Thinking puzzles, free drawing and colouring; finger or stylus",
          "Parent area behind a parental gate: progress per skill, daily learning time, several child profiles",
          "No ads, no in-app purchases, no data collection, works offline",
        ],
        seo_title: "ViMai Kids – Vietnamese, Hiragana, Katakana and Maths",
        seo_description:
          "Learning app for ages 3–7: 29 Vietnamese letters, hiragana and katakana with stroke order, maths, puzzles and 14 voiced games. No ads, works offline.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    slug: "maimai",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://maimai.vimai.jp",
    featured: false,
    sort_order: 5,
    logo_url: "/images/products/maimai.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "Maimai",
        tagline: "ベトナム料理でカロリー記録。水分・睡眠・体重・周期もまとめて記録",
        description:
          "MaiMaiはベトナム人のための食事と健康の記録アプリです。日本食品標準成分表（八訂）増補2023年とUSDA FoodData Centralの数値をもとにした1万件以上の料理・食材から、フォー、ブン、ご飯もの、バインミーなどのなじみのあるベトナム料理も含めてカロリーを調べられ、包装食品はバーコードでも読み取れます。朝・昼・夕・間食ごとに記録し、1日のたんぱく質・脂質・炭水化物・食物繊維・塩分を確認できます。身長・体重・年齢・活動量と、減量・維持・増量の目標から1日の目標カロリーを計算し、アジア基準のBMIと体重の推移グラフも表示します。水分はワンタップで記録でき、睡眠や月経周期（症状・気分）も記録でき、周期の時期に合わせた食事のヒントも表示します。パートナーのMaiが3つのスタイルで毎日応援します。表示言語はベトナム語・日本語・英語で、アカウントは不要です。",
        long_description:
          "MaiMaiは医療機器ではありません。カロリーや周期、排卵日は参考のための推定値で、診断・治療・避妊には使えません。必要なときは医師や管理栄養士に相談してください。",
        target_audience:
          "なじみのある料理で食事・体重・水分・睡眠・周期を記録したいベトナム人、特に日本に住む人。",
        features: [
          "1万件以上の料理・食材のカロリー（成分表・USDAの数値）、フォー・ブン・バインミーなどベトナム料理も",
          "1日4食の記録、たんぱく質・脂質・炭水化物・食物繊維・塩分を表示、自分の料理やお気に入りも登録",
          "身長・体重・年齢・活動量と目標（減量・維持・増量）から目標カロリーを計算",
          "包装食品のバーコード読み取り",
          "アジア基準のBMIと毎日の体重グラフ",
          "ワンタップの水分記録、睡眠の記録、1日のやさしいリマインダー",
          "月経周期：日付・症状・気分を記録、次の周期の予測と時期ごとの食事のヒント",
          "パートナーのMai：やさしい・栄養の専門家・元気な友だちの3スタイル",
          "アカウント不要。iPhoneではデータは端末内のみ、バックアップの書き出し・復元・全削除",
          "ベトナム語・日本語・英語の表示",
        ],
        seo_title: "MaiMai｜ベトナム料理のカロリー記録・体重・水分・周期",
        seo_description:
          "MaiMaiは1万件以上の料理・食材のカロリー（ベトナム料理を含む）、バーコード読み取り、体重・BMI・水分・睡眠・周期の記録ができるアプリ。アカウント不要。",
      },
      {
        locale: "vi",
        name: "Maimai",
        tagline: "Đếm calo bằng món Việt, theo dõi nước uống, giấc ngủ, cân nặng và chu kỳ",
        description:
          "MaiMai là cuốn nhật ký dinh dưỡng và sức khỏe cá nhân cho người Việt. Tra calo trong hơn 10.000 món ăn và nguyên liệu có số liệu từ bảng thành phần thực phẩm Nhật Bản (MEXT, bản 8 bổ sung 2023) và USDA FoodData Central, cùng các món Việt quen thuộc như phở, bún, cơm, bánh mì; quét mã vạch sản phẩm đóng gói. Ghi theo bữa sáng, trưa, tối và bữa phụ; xem đạm, chất béo, tinh bột, chất xơ và muối của cả ngày. App tính calo mục tiêu từ chiều cao, cân nặng, tuổi, mức vận động và mục tiêu giảm, giữ hay tăng cân; theo dõi BMI theo chuẩn châu Á và biểu đồ cân nặng. Ghi nước uống bằng một chạm, ghi giờ ngủ, ghi chu kỳ kinh nguyệt kèm triệu chứng, tâm trạng và gợi ý ăn uống theo từng giai đoạn. Bạn đồng hành Mai động viên mỗi ngày với 3 phong cách. Giao diện tiếng Việt, tiếng Nhật và tiếng Anh; không cần tài khoản.",
        long_description:
          "MaiMai không phải thiết bị y tế. Calo, chu kỳ và ngày rụng trứng chỉ là ước tính để tham khảo, không dùng để chẩn đoán, điều trị hay tránh thai. Khi cần, hãy hỏi bác sĩ hoặc chuyên gia dinh dưỡng.",
        target_audience:
          "Người Việt (nhất là người Việt ở Nhật) muốn tự theo dõi ăn uống, cân nặng, nước, giấc ngủ và chu kỳ bằng món ăn quen thuộc.",
        features: [
          "Tra calo hơn 10.000 món ăn và nguyên liệu (số liệu MEXT và USDA), có cả món Việt như phở, bún, cơm, bánh mì",
          "Ghi theo 4 bữa, xem đạm, chất béo, tinh bột, chất xơ, muối của cả ngày; tự nhập món và lưu món hay ăn",
          "Calo mục tiêu tính từ chiều cao, cân nặng, tuổi, mức vận động và mục tiêu giảm, giữ hay tăng cân",
          "Quét mã vạch sản phẩm đóng gói để lấy thông tin dinh dưỡng",
          "BMI theo chuẩn châu Á và biểu đồ cân nặng từng ngày",
          "Nước uống một chạm, ghi giờ ngủ, nhắc nhở nhẹ nhàng trong ngày",
          "Chu kỳ kinh nguyệt: ghi ngày, triệu chứng, tâm trạng; ước tính kỳ tiếp theo và gợi ý ăn uống theo giai đoạn",
          "Bạn đồng hành Mai với 3 phong cách: ấm áp, chuyên gia dinh dưỡng, bạn thân năng động",
          "Không cần tài khoản; trên iPhone dữ liệu chỉ lưu trên máy, xuất sao lưu, khôi phục hoặc xóa bất cứ lúc nào",
          "Giao diện tiếng Việt, tiếng Nhật, tiếng Anh",
        ],
        seo_title: "MaiMai – Đếm calo món Việt, cân nặng, nước, giấc ngủ, chu kỳ",
        seo_description:
          "MaiMai: tra calo hơn 10.000 món ăn và nguyên liệu, có món Việt, quét mã vạch, theo dõi cân nặng, BMI, nước, giấc ngủ, chu kỳ. Không cần tài khoản.",
      },
      {
        locale: "en",
        name: "Maimai",
        tagline: "Calorie counting with Vietnamese food, plus water, sleep, weight and cycle tracking",
        description:
          "MaiMai is a personal nutrition and wellness diary for Vietnamese people. Look up calories in over 10,000 foods and ingredients with figures from Japan's Standard Tables of Food Composition (MEXT, 8th edition, 2023 supplement) and USDA FoodData Central, including familiar Vietnamese dishes such as pho, bun, rice dishes and banh mi, or scan the barcode of a packaged product. Log breakfast, lunch, dinner and snacks, and see the day's protein, fat, carbohydrate, fibre and salt. The app works out a calorie target from your height, weight, age, activity level and goal (lose, keep or gain weight), and tracks BMI on the Asian scale with a daily weight chart. Log water with one tap, record your sleep, and log your period with symptoms and mood, with food tips for each phase. Mai, your companion, cheers you on in one of 3 styles. Available in Vietnamese, Japanese and English; no account needed.",
        long_description:
          "MaiMai is not a medical device. Calories, cycle and ovulation dates are estimates for reference only, not for diagnosis, treatment or contraception. Ask a doctor or dietitian when you need advice.",
        target_audience:
          "Vietnamese people, especially in Japan, who want to track food, weight, water, sleep and their cycle using familiar dishes.",
        features: [
          "Calories for over 10,000 foods and ingredients (MEXT and USDA data), including Vietnamese dishes such as pho, bun and banh mi",
          "Log 4 meals a day; see protein, fat, carbohydrate, fibre and salt; add your own foods and favourites",
          "Calorie target from height, weight, age, activity level and a lose, keep or gain goal",
          "Barcode scanning for packaged products",
          "BMI on the Asian scale and a daily weight chart",
          "One-tap water log, sleep log and gentle reminders during the day",
          "Cycle tracking: dates, symptoms and mood; next-period estimate and food tips for each phase",
          "Mai the companion, in 3 styles: warm, nutrition expert or energetic friend",
          "No account; on iPhone data stays on the device, with backup export, restore and delete-all",
          "Vietnamese, Japanese and English interface",
        ],
        seo_title: "MaiMai – Vietnamese Food Calorie, Weight and Cycle Tracker",
        seo_description:
          "MaiMai: calories for over 10,000 foods and ingredients including Vietnamese dishes, barcode scan, weight, BMI, water, sleep and cycle tracking. No account.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    slug: "menkyo",
    status: "beta",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://menkyo.vimai.jp",
    featured: true,
    sort_order: 6,
    logo_url: "/images/products/vimai_menkyo.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Menkyo（日本の運転免許・学科）",
        tagline: "日本の運転免許・学科試験の学習アプリ：仮免・本免・外免切替の模擬試験60回、約2,350問",
        description:
          "日本で運転免許の学科試験（仮免・本免）や外国免許からの切替に取り組む、ベトナム語・英語話者のための学習アプリです（Webとスマートフォン、1つのアカウントで利用）。31の単元・177の解説、約2,350問の練習問題（図付き245問）、ViMaiが描き直した標識・標示209点、危険予測イラスト107点、模擬試験60回分を収録しています。模擬試験は仮免20回（50問・30分・45問以上で合格）、本免20回（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替20回（50問・30分・45問以上で合格）です。標識には振り仮名付きの正式な日本語名を表示し、日本語の用語215語と、免許センターで使う日本語164文も収録しています。内容は最新の日本の交通法規（2026年の改正など）に合わせて更新します。アプリの表示言語はベトナム語と英語です。",
        long_description:
          "ルールを理解し、合格し、自信を持って運転しよう。問題は教本をもとにViMaiが書き直したもので、図も描き直しており、実際の試験問題ではありません。手続きは都道府県によって異なるため、お住まいの免許センターで確認してください。学習を支えるツールであり、試験の合格を保証するものではありません。",
        target_audience:
          "日本で運転免許（仮免・本免）を取得する人や外国免許を切り替える人のうち、ベトナム語・英語で学びたい在住者。",
        features: [
          "模擬試験60回（仮免20回・50問30分、本免20回・95問50分、外免切替20回・50問30分）",
          "31単元・約2,350問の練習問題（図付き245問）",
          "ViMaiが描き直した標識・標示209点（日本語名・振り仮名・標識クイズ）、まぎらわしい標識14組",
          "本免のイラスト問題に向けた危険予測イラスト107点",
          "すぐに解説が出る学習モードと、本番と同じ時間・採点の試験モード",
          "間違えた問題を間隔反復（1・3・7日後）で復習、分野別の練習",
          "免許センターで使う日本語164文（8場面）と用語215語、Web版は日本語音声付き",
          "最新の交通法規に対応（2026年の改正など）",
          "ログインは任意で、すべての端末で進み具合を引き継ぎ。各種類の最初の5回と、単元・標識の前半は無料",
          "VIPはアカウントに紐づき、同じアカウントでWebとiPhoneの両方で利用可能（最大2台）",
        ],
        seo_title: "日本の運転免許 学科試験 対策｜仮免・本免・外免切替の模擬試験60回",
        seo_description:
          "ViMai Menkyoはベトナム語・英語で学ぶ運転免許の学科対策アプリ。仮免・本免・外免切替の模擬試験60回、約2,350問、標識209点。各種類の最初の5回は無料。",
      },
      {
        locale: "vi",
        name: "ViMai Menkyo – Bằng lái Nhật",
        tagline: "Học và thi thử lý thuyết bằng lái ô tô Nhật: Karimen, Honmen, đổi bằng – 60 đề, khoảng 2.350 câu",
        description:
          "Ứng dụng (web và điện thoại, một tài khoản) giúp người Việt và người dùng tiếng Anh tại Nhật học và luyện thi lý thuyết bằng lái ô tô Nhật (学科試験). Có 31 bài học với 177 phần lý thuyết, khoảng 2.350 câu luyện tập (245 câu có hình), thư viện 209 biển báo và vạch kẻ đường do ViMai vẽ lại, 107 tranh tình huống nguy hiểm và 60 đề thi thử: 20 đề Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), 20 đề Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm), 20 đề đổi bằng (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Biển báo có tên chính thức tiếng Nhật kèm furigana; thêm 215 thuật ngữ tiếng Nhật và 164 câu tiếng Nhật dùng ở trung tâm cấp bằng. Nội dung cập nhật theo luật giao thông Nhật hiện hành, gồm các thay đổi năm 2026. Ngôn ngữ trong app: tiếng Việt và tiếng Anh.",
        long_description:
          "Hiểu luật. Đậu bằng. Tự tin cầm lái. Câu hỏi do ViMai viết lại từ giáo trình, hình được vẽ lại; đây không phải đề thi thật. Thủ tục khác nhau theo tỉnh, hãy kiểm tra với trung tâm cấp bằng nơi bạn ở. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người dùng tiếng Anh sống tại Nhật đang lấy bằng lái ô tô (Karimen, Honmen) hoặc đổi bằng nước ngoài sang bằng Nhật.",
        features: [
          "60 đề thi thử: 20 Karimen (50 câu, 30 phút), 20 Honmen (95 câu, 50 phút), 20 đổi bằng (50 câu, 30 phút)",
          "Khoảng 2.350 câu luyện tập theo 31 bài học, 245 câu có hình",
          "209 biển báo và vạch kẻ đường do ViMai vẽ lại, có tên tiếng Nhật, furigana và quiz biển báo; 14 nhóm biển dễ nhầm",
          "107 tranh tình huống nguy hiểm cho câu minh họa của Honmen",
          "Chế độ học giải thích ngay; chế độ thi tính giờ, chấm điểm như thi thật",
          "Ôn câu sai theo lịch lặp lại ngắt quãng (1, 3, 7 ngày) và luyện theo chủ đề",
          "164 câu tiếng Nhật ở trung tâm cấp bằng (8 tình huống) và 215 thuật ngữ tiếng Nhật, giọng đọc trên web",
          "Cập nhật theo luật giao thông Nhật hiện hành (gồm thay đổi năm 2026)",
          "Đăng nhập tùy chọn để lưu tiến độ trên mọi thiết bị; 5 đề đầu mỗi loại và nửa đầu bài học, biển báo miễn phí",
          "VIP theo tài khoản: 1 tháng 450.000đ, 3 tháng 700.000đ (VietQR trên web); đăng nhập cùng tài khoản là dùng được cả trên web và iPhone, tối đa 2 thiết bị",
        ],
        seo_title: "Lý thuyết bằng lái Nhật – 60 đề Karimen, Honmen, đổi bằng",
        seo_description:
          "Học lý thuyết bằng lái ô tô Nhật bằng tiếng Việt: 60 đề thi thử Karimen, Honmen, đổi bằng, khoảng 2.350 câu, 209 biển báo. 5 đề đầu mỗi loại miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Menkyo: Japan License",
        tagline: "Japanese driving theory: lessons and mock tests for Karimen, Honmen and licence conversion – 60 exams, about 2,350 questions",
        description:
          "An app (web and phone, one account) for Vietnamese and English speakers in Japan learning for the Japanese driving-licence theory test (学科試験). It includes 31 lesson units with 177 theory sections, about 2,350 practice questions (245 with pictures), a library of 209 road signs and markings redrawn by ViMai, 107 hazard-scene illustrations and 60 mock exams: 20 Karimen (仮免, 50 questions, 30 minutes, pass at 45), 20 Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100) and 20 licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). Signs show their official Japanese names with furigana, and there are 215 Japanese terms and 164 Japanese phrases for the licence centre. Content follows current Japanese traffic law, including the 2026 changes. The app is in Vietnamese and English.",
        long_description:
          "Know the rules. Pass the test. Drive with confidence. Questions are rewritten by ViMai from the textbook and figures are redrawn; they are not real exam questions. Procedures differ by prefecture, so check with your local licence centre. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Vietnamese and English-speaking residents in Japan getting a Japanese driving licence (Karimen, Honmen) or converting a foreign licence.",
        features: [
          "60 mock exams: 20 Karimen (50 questions, 30 min), 20 Honmen (95 questions, 50 min), 20 conversion (50 questions, 30 min)",
          "About 2,350 practice questions in 31 lesson units, 245 with pictures",
          "209 road signs and markings redrawn by ViMai, with Japanese names, furigana and sign quizzes; 14 groups of look-alike signs",
          "107 hazard-scene illustrations for the Honmen illustration questions",
          "Learning mode with instant explanations; timed exam mode scored like the real test",
          "Mistake review with spaced repetition (1, 3 and 7 days) and topic practice",
          "164 Japanese phrases for the licence centre (8 situations) and 215 Japanese terms, with audio on the web",
          "Updated to current Japanese traffic law (including the 2026 changes)",
          "Optional sign-in keeps your progress on all devices; the first 5 exams of each type and the first half of lessons and signs are free",
          "VIP belongs to your account: sign in with the same account and it works on the web and on iPhone, on up to 2 devices",
        ],
        seo_title: "Japan Driving Theory Test: Karimen, Honmen, Conversion",
        seo_description:
          "Japanese driving theory in Vietnamese and English: 60 mock exams (Karimen, Honmen, conversion), about 2,350 questions, 209 signs. First 5 of each type free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000007",
    slug: "gino1-seibi",
    status: "beta",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://gino1-seibi.vimai.jp",
    featured: true,
    sort_order: 7,
    logo_url: "/images/products/gino1_seibi.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Gino 1 Seibi（特定技能1号・自動車整備）",
        tagline: "特定技能1号 自動車整備分野の試験対策アプリ：JASPAサンプル問題の形式に沿った模擬試験20回・780問",
        description:
          "JASPA（日本自動車整備振興会連合会）がCBT方式で実施する「特定技能1号評価試験 自動車整備分野」の試験対策Webアプリです。JASPAのサンプル問題と同じ形式の模擬試験を20回分収録しています。1回分は学科の○×問題30問と、実技の課題3つ（各課題は2択の問題3問）で、学科600問・実技60課題、全部で780問すべてに解説が付いています。301問には描き直した図があり、マイクロメータ・ダイヤルゲージ・ノギスの読み取りや、部品・工具の見分け方を練習できます。アプリでは1回分を80分で通して解きます。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を表示できます。部品・用語辞典（2500語以上：2,520語・9分野）は無料で引けます。",
        long_description:
          "問題はJASPAのサンプル問題と過去の3級自動車整備士試験の出題分野をもとにViMaiが書き直したもので、図も描き直しています。実際の試験問題ではなく、JASPAの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。",
        target_audience:
          "特定技能1号（自動車整備分野）の評価試験を受ける外国人。",
        features: [
          "JASPAサンプル問題の形式に沿った模擬試験20回・780問（学科○×600問、実技60課題）",
          "1回分：学科○×30問＋実技3課題（2択）、80分で通して解答",
          "描き直した図の問題301問（マイクロメータ・ダイヤルゲージの読み取り、部品・工具）",
          "漢字に振り仮名、すべての問題でベトナム語・英語の訳を表示可能",
          "正解すると次へ自動で進み、間違えるとその場で解説（VIPはAIチューター付き）",
          "部品・用語辞典 2500語以上・9分野（検索は無料、詳しい解説・図・フラッシュカードはVIP、Web版は日本語音声付き）",
          "無料の試験・申込ガイド、VIP向けの試験のコツ",
          "誤答の復習、解答の見直し、成績の履歴、アプリ内で問題の誤りを報告",
          "第1〜3回は無料",
        ],
        seo_title: "特定技能1号 自動車整備 試験対策｜模擬試験20回・振り仮名付き",
        seo_description:
          "特定技能1号評価試験（自動車整備分野）の試験対策アプリ。JASPAサンプル問題の形式に沿った模擬試験20回・780問（学科○×と実技2択）、振り仮名、ベトナム語・英語訳、部品・用語辞典。第1〜3回は無料。",
      },
      {
        locale: "vi",
        name: "ViMai Gino 1 Seibi – Tokutei bảo dưỡng ô tô",
        tagline: "Luyện thi Tokutei Ginou 1 ngành bảo dưỡng ô tô (特定技能1号 自動車整備): 20 đề theo dạng đề mẫu JASPA, 780 câu",
        description:
          "Ứng dụng web luyện thi Tokutei Gino 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), kỳ thi do JASPA tổ chức trên máy tính (CBT). Có 20 đề thi thử theo đúng dạng đề mẫu của JASPA: mỗi đề gồm 30 câu lý thuyết ○× (学科) và 3 bài thực hành (実技), mỗi bài 3 câu chọn 1 trong 2; tổng cộng 600 câu lý thuyết và 60 bài thực hành, 780 câu, câu nào cũng có giải thích. 301 câu có hình vẽ lại: đọc số đo trên panme (micrometer), đồng hồ so (dial gauge), thước cặp, nhận biết phụ tùng và dụng cụ. Trong app, mỗi đề làm liền một lượt 80 phút. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm từ điển phụ tùng và thuật ngữ hơn 2.500 mục (2.520 mục, 9 nhóm), tra cứu miễn phí.",
        long_description:
          "Câu hỏi do ViMai viết lại dựa trên đề mẫu của JASPA và các chủ đề từng ra trong kỳ thi 3級 整備士, hình được vẽ lại; đây không phải đề thi thật và không được JASPA bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người nước ngoài đang chuẩn bị thi Tokutei Gino 1 ngành bảo dưỡng ô tô.",
        features: [
          "20 đề thi thử theo dạng đề mẫu JASPA, 780 câu: 600 câu ○× lý thuyết và 60 bài thực hành",
          "Mỗi đề: 30 câu ○× + 3 bài thực hành chọn 1 trong 2, làm liền 80 phút",
          "301 câu có hình vẽ lại: đọc số đo panme, đồng hồ so, nhận biết phụ tùng và dụng cụ",
          "Furigana cho chữ Hán, bật dịch tiếng Việt hoặc tiếng Anh cho từng câu",
          "Chọn đúng tự sang câu sau; chọn sai dừng lại và giải thích ngay; VIP có thêm gia sư AI",
          "Từ điển phụ tùng và thuật ngữ hơn 2.500 mục (9 nhóm), tra cứu miễn phí; giải thích chi tiết, hình, flashcard dành cho VIP; giọng đọc tiếng Nhật trên web",
          "Hướng dẫn kỳ thi và cách đăng ký miễn phí; mẹo làm bài dành cho VIP",
          "Ôn lại câu sai, xem lại bài làm, lịch sử kết quả; báo lỗi câu hỏi ngay trong app",
          "Đề 1–3 miễn phí; VIP trên web: 1 tháng 450.000đ, 3 tháng 700.000đ, thanh toán VietQR, tối đa 2 thiết bị",
        ],
        seo_title: "Luyện thi Tokutei bảo dưỡng ô tô – 20 đề kỹ năng đặc định 1",
        seo_description:
          "Đề thi tokutei bảo dưỡng ô tô (特定技能1号 自動車整備): 20 đề thi thử theo dạng đề mẫu JASPA, 780 câu ○× và thực hành, có furigana và dịch tiếng Việt. Đề 1–3 miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Gino 1 Seibi: Automobile Maintenance",
        tagline: "Tokutei Ginou (SSW i) automobile maintenance test practice: 20 mock exams in the JASPA sample format, 780 questions",
        description:
          "A web app for practising the Tokutei Ginou automobile maintenance test (特定技能1号評価試験 自動車整備分野, Specified Skilled Worker (i)), a computer-based test (CBT) run by JASPA. It has 20 mock exams in the JASPA sample format: each has 30 true/false (○×) theory questions (学科) and 3 practical tasks (実技) of 3 two-choice questions, so 600 theory questions and 60 practical tasks, 780 questions in total, each with an explanation. 301 questions have redrawn figures: micrometer, dial gauge and caliper readings, and identifying parts and tools. In the app, each exam is taken in one 80-minute sitting. Japanese questions have furigana, and Vietnamese and English translations can be turned on. A parts and terms dictionary with over 2,500 entries (2,520 in 9 groups) is free to search.",
        long_description:
          "Questions are written by ViMai, based on the JASPA sample exam and topics from past Class 3 mechanic (3級 整備士) exams, and figures are redrawn. They are not real exam questions, and the app is not endorsed by JASPA. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Foreign learners preparing for the Specified Skilled Worker (i) automobile maintenance test.",
        features: [
          "20 mock exams in the JASPA sample format, 780 questions: 600 true/false theory questions and 60 practical tasks",
          "Each exam: 30 true/false questions + 3 two-choice practical tasks, one 80-minute sitting",
          "301 questions with redrawn figures: micrometer and dial-gauge readings, parts and tools",
          "Furigana on kanji; Vietnamese or English translation for every question",
          "A correct answer moves on by itself; a wrong answer stops and explains; VIP adds an AI tutor",
          "Parts and terms dictionary with over 2,500 entries (9 groups), free to search; details, figures and flashcards for VIP; Japanese audio on the web",
          "Free exam and registration guide; exam tips for VIP members",
          "Mistake review, answer review and result history; report a problem with any question in the app",
          "Exams 1–3 are free",
        ],
        seo_title: "Tokutei Ginou Automobile Maintenance Practice Tests (SSW i)",
        seo_description:
          "Tokutei Ginou automobile maintenance test (JASPA) practice: 20 mock exams, 780 true/false and practical questions, furigana, translations. Exams 1–3 free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000008",
    slug: "vicare",
    status: "available",
    category: "health",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://vicare.vimai.jp",
    featured: true,
    sort_order: 8,
    logo_url: "/images/products/vicare.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViCare（日本での受診サポート）",
        tagline: "日本で病院にかかるベトナム人のための無料アプリ：診察時の通訳、健康記録、書類・薬袋の読み取り",
        description:
          "ViCareはViMaiの無料・非営利アプリで、日本に住むベトナム人が体調を崩してから薬を受け取って帰るまでを支えます。診察時の通訳には、医師・スタッフ・患者の例文3,700文以上を、内科、小児科、産婦人科、眼科、耳鼻咽喉科、歯科、皮膚科、薬局、救急など診療科・場面別の20パックに収録し、端末の音声認識でマイクから聞き取ります。健康記録は端末内に保存され、日本語で表示する緊急医療情報、費用付きの受診記録と医療費控除のための年間合計、服用中の薬、服薬・再診のリマインダーを備えています。薬袋、予約票、領収書、検査結果、健康診断結果、問診票、同意書はカメラで撮ると端末内で読み取ります。「具合が悪い」では100の症状と58の危険なサインから受診する診療科の目安を示し、厚生労働省のオープンデータによる全国47都道府県・14万以上の医療機関の一覧も使えます。ほかに会話フレーズ2,069文、病気ガイド174件、手続き・保険の記事70本、医療用語辞典2,669語があります。アカウント不要で、個人のデータは端末内だけに保存されます。",
        long_description:
          "受診時のコミュニケーションを助ける参考情報のアプリで、診断ではなく、医師や薬剤師の助言に代わるものではありません。内容は日本の公的な医療情報をもとにViCareチームが作成・確認しています。アカウント不要、広告なしで、個人のデータは端末内だけに保存されます。",
        target_audience:
          "日本で病院・クリニックを受診するベトナム人と、その受診を支える家族、会社、学校、支援機関の方。",
        features: [
          "診察通訳：診療科・場面別20パック・3,700文以上の例文、マイクで聞き取り。患者はベトナム語で話すか入力し、医師は日本語で読める",
          "健康記録：日本語で表示する緊急医療情報（アレルギー、持病、血液型、連絡先）、受診記録、服用中の薬",
          "カメラで端末内読み取り：薬袋から服用スケジュール、予約票、領収書、検査・健診結果、問診票",
          "話した言葉をそのまま翻訳：例文にない発言も無料で端末内翻訳、初回に言語データをダウンロードすればオフラインでも利用可（「機械翻訳」と表示し、確認用の逆翻訳付き。iPhone/Androidアプリ）",
          "具合が悪い：100の症状・15の部位・58の危険なサインから診療科の目安",
          "医療機関を探す：厚生労働省のオープンデータによる47都道府県・14万以上の医療機関、20の診療科、Googleマップ検索も",
          "119・110・#7119・#8000の伝え方（保存した住所を自動入力）",
          "受診記録（医療機関・薬局の費用、医療費控除のための年間合計）、服薬・再診のリマインダー、CSV書き出し・バックアップ",
          "会話フレーズ2,069文（19場面）、病気ガイド174件、手続き・保険70本、医療用語辞典2,669語（振り仮名付き）",
          "無料・非営利、広告なし、アカウント不要。ベトナム語・日本語・英語の表示",
        ],
        seo_title: "ViCare｜ベトナム人の日本での受診をサポートする無料アプリ",
        seo_description:
          "ViCareは日本で病院にかかるベトナム人のための無料アプリ。3,700文以上の診察通訳、健康記録、薬袋のカメラ読み取り、診療科の案内、119番の伝え方。",
      },
      {
        locale: "vi",
        name: "ViCare – Đi khám bệnh ở Nhật",
        tagline: "App miễn phí giúp người Việt đi khám bệnh ở Nhật: phiên dịch khi khám, hồ sơ y tế, đọc giấy tờ và túi thuốc",
        description:
          "ViCare là app miễn phí, phi lợi nhuận của ViMai, đồng hành cùng người Việt tại Nhật từ lúc thấy trong người không ổn đến lúc cầm túi thuốc về nhà. Phiên dịch khi khám với hơn 3.700 mẫu câu bác sĩ, nhân viên và bệnh nhân trong 20 gói theo khoa và tình huống (nội, nhi, sản phụ khoa, mắt, tai mũi họng, nha, da liễu, nhà thuốc, cấp cứu…), nghe qua micro bằng nhận dạng giọng nói của điện thoại. Hồ sơ y tế trên điện thoại: thông tin khẩn cấp hiện bằng tiếng Nhật, nhật ký khám kèm chi phí và tổng theo năm cho 医療費控除, thuốc đang uống, nhắc uống thuốc và tái khám. Chụp túi thuốc, phiếu hẹn, hoá đơn, kết quả xét nghiệm, kết quả khám sức khoẻ, phiếu khai bệnh và giấy đồng ý để đọc ngay trên máy. “Tôi bị ốm” gợi ý nên khám khoa nào từ 100 triệu chứng và 58 dấu hiệu nguy hiểm; danh sách hơn 140.000 cơ sở y tế ở 47 tỉnh từ dữ liệu mở của Bộ Y tế Nhật. Kèm 2.069 câu giao tiếp, cẩm nang 174 bệnh, 70 bài thủ tục và bảo hiểm, từ điển y khoa 2.669 từ. Không cần tài khoản; dữ liệu cá nhân chỉ lưu trên điện thoại.",
        long_description:
          "Thông tin tham khảo và công cụ hỗ trợ giao tiếp khi đi khám, không phải chẩn đoán và không thay thế lời khuyên của bác sĩ hay dược sĩ. Nội dung do đội ViCare biên soạn từ nguồn y tế công khai của Nhật và kiểm tra. Không cần tài khoản, không quảng cáo; dữ liệu cá nhân chỉ lưu trên điện thoại.",
        target_audience:
          "Người Việt sống tại Nhật cần đi khám bệnh, và gia đình, công ty, trường học, nghiệp đoàn hỗ trợ họ.",
        features: [
          "Phiên dịch khi khám: hơn 3.700 mẫu câu bác sĩ – bệnh nhân trong 20 gói theo khoa và tình huống, nghe qua micro; bệnh nhân nói hoặc gõ tiếng Việt, bác sĩ đọc tiếng Nhật",
          "Hồ sơ y tế: thông tin khẩn cấp bằng tiếng Nhật (dị ứng, bệnh nền, nhóm máu, người liên hệ), nhật ký khám, thuốc đang uống",
          "Đọc giấy tờ bằng camera ngay trên máy: túi thuốc ra lịch uống, phiếu hẹn, hoá đơn, xét nghiệm, khám sức khoẻ, phiếu khai bệnh",
          "Dịch đúng lời người nói, kể cả câu không có trong kho mẫu: miễn phí, chạy ngay trên điện thoại, dùng được khi không có mạng sau khi tải gói ngôn ngữ lần đầu (ghi rõ “Dịch máy”, kèm câu dịch ngược để kiểm tra; trên app iPhone/Android)",
          "Tôi bị ốm: 100 triệu chứng, 15 vùng cơ thể, 58 dấu hiệu nguy hiểm, gợi ý nên khám khoa nào",
          "Tìm nơi khám: hơn 140.000 cơ sở y tế ở 47 tỉnh (dữ liệu mở của Bộ Y tế Nhật), lọc theo 20 khoa, kèm tìm trên Google Maps",
          "Khẩn cấp 119 · 110 · #7119 · #8000: câu nói tiếng Nhật, tự điền địa chỉ đã lưu",
          "Nhật ký khám có chi phí phòng khám và nhà thuốc, tổng theo năm cho 医療費控除; nhắc uống thuốc, nhắc tái khám; xuất CSV, sao lưu",
          "2.069 câu giao tiếp (19 tình huống), cẩm nang 174 bệnh, 70 bài thủ tục và bảo hiểm, từ điển y khoa 2.669 từ, có furigana",
          "Miễn phí, phi lợi nhuận, không quảng cáo, không cần tài khoản; giao diện tiếng Việt, tiếng Nhật, tiếng Anh",
        ],
        seo_title: "ViCare – App đi khám bệnh ở Nhật cho người Việt (miễn phí)",
        seo_description:
          "ViCare giúp người Việt đi khám bệnh ở Nhật: phiên dịch khi khám hơn 3.700 mẫu câu, hồ sơ y tế, đọc túi thuốc bằng camera, nên khám khoa nào, gọi 119. Miễn phí.",
      },
      {
        locale: "en",
        name: "ViCare: See a Doctor in Japan",
        tagline: "A free app for Vietnamese people seeing a doctor in Japan: visit interpreter, health records, camera reading of papers and medicine bags",
        description:
          "ViCare is a free, non-profit ViMai app that supports Vietnamese people in Japan from the moment they feel unwell until they bring their medicine home. The doctor-visit interpreter has over 3,700 doctor, staff and patient sentences in 20 packs by department and situation (internal medicine, paediatrics, obstetrics and gynaecology, eyes, ENT, dentistry, dermatology, pharmacy, emergency and more) and listens through the phone's own speech recognition. Health records stay on the phone: emergency information shown in Japanese, a visit diary with costs and yearly totals for 医療費控除 (the medical expense deduction), current medicines, and medicine and follow-up reminders. Photograph a medicine bag, appointment slip, receipt, test result, health check result, questionnaire or consent form and it is read on the phone. “I feel sick” suggests a department from 100 symptoms and 58 warning signs, and a list of over 140,000 medical facilities in all 47 prefectures comes from the Ministry of Health's open data. It also has 2,069 phrases, a guide to 174 illnesses, 70 articles on procedures and insurance, and a 2,669-word medical dictionary. No account; personal data stays on your phone.",
        long_description:
          "Reference information and a communication aid for doctor visits; it is not a diagnosis and does not replace a doctor's or pharmacist's advice. Content is written by the ViCare team from public Japanese health sources and checked. No account and no ads; personal data stays on your phone.",
        target_audience:
          "Vietnamese people living in Japan who need to see a doctor, and the family, employers, schools and support organisations who help them.",
        features: [
          "Visit interpreter: over 3,700 doctor–patient sentences in 20 department and situation packs, by microphone; the patient speaks or types Vietnamese, the doctor reads Japanese",
          "Health records: emergency information in Japanese (allergies, conditions, blood type, contact), visit diary, current medicines",
          "Camera reading on the phone: medicine bags into a dosing schedule, appointment slips, receipts, test and health check results, questionnaires",
          "Translates what was actually said, even sentences that are not stored: free, on the phone, and offline after a one-time language download (labelled “machine translation”, with a back-translation to check; iPhone/Android app)",
          "I feel sick: 100 symptoms, 15 body areas, 58 warning signs, and which department to visit",
          "Find a clinic: over 140,000 medical facilities in 47 prefectures (Ministry of Health open data), 20 departments, plus Google Maps search",
          "Emergency 119 · 110 · #7119 · #8000: Japanese scripts with your saved address filled in",
          "Visit diary with clinic and pharmacy costs and yearly totals for 医療費控除; medicine and follow-up reminders; CSV export and backup",
          "2,069 phrases (19 situations), 174 illness guides, 70 procedure and insurance articles, a 2,669-word medical dictionary, with furigana",
          "Free, non-profit, no ads, no account; Vietnamese, Japanese and English interface",
        ],
        seo_title: "ViCare – See a Doctor in Japan, Free App for Vietnamese",
        seo_description:
          "ViCare helps Vietnamese people see a doctor in Japan: a 3,700-sentence visit interpreter, health records, camera reading of medicine bags, 119 scripts. Free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000009",
    slug: "tokutei-kaigo",
    status: "beta",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://kaigo.vimai.jp",
    featured: true,
    sort_order: 9,
    logo_url: "/images/products/tokutei_kaigo.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Tokutei Kaigo（特定技能1号・介護）",
        tagline: "特定技能1号「介護」の試験対策アプリ：介護技能評価試験20回・介護日本語評価試験30回、1,350問",
        description:
          "特定技能1号「介護」の2つの試験（どちらもプロメトリックのCBT）、介護技能評価試験（45問・60分・60%以上で合格）と介護日本語評価試験（15問・30分・73%以上で合格）を練習するWebアプリです。公式の出題構成に合わせて、技能試験20回分と日本語試験30回分、合わせて1,350問を収録し、すべての問題に解説が付いています。本番と同じ時間で解き、正解するとすぐ次へ進み、間違えると止まって解説を表示します。漢字にはふりがなが付き、ベトナム語・英語の訳を表示できます。37の介護場面の声かけフレーズ3,164文（Web版は日本語の読み上げ付き）、記録・申し送りのページ、介護の単語帳500語、無料の試験ガイド（構成、合格基準、受験料、日本・ベトナムでの申し込み方法）も使えます。",
        long_description:
          "問題は公式の出題構成に合わせてViMaiが練習用に作成したもので、実際の試験問題ではありません。厚生労働省やプロメトリックの公認・監修を受けたものではありません。試験の日程・受験料・ルールは変わることがあるため、申し込む前に必ず公式ページを確認してください。学習を支えるツールであり、合格を保証するものではありません。",
        target_audience:
          "日本で介護の仕事を目指し、特定技能1号「介護」の試験を受ける外国人。",
        features: [
          "介護技能評価試験の模擬試験20回（各45問・60分・60%以上で合格）",
          "介護日本語評価試験の模擬試験30回（各15問・30分・73%以上で合格）",
          "37の介護場面の声かけフレーズ3,164文（ベトナム語・日本語・英語、ふりがな付き）と記録・申し送り（無料）",
          "正解すると次へ、間違えると止まって解説（VIPはAI解説付き）",
          "漢字にふりがな、すべての問題でベトナム語・英語の訳を表示可能",
          "介護の単語帳500語（フラッシュカード、最初の100語は無料、Web版は日本語音声付き）",
          "無料の試験ガイド：構成・合格基準・受験料・日本とベトナムでの申し込み方法・公式リンク",
          "誤答の復習、解答の見直し、成績の履歴、VIP向けの試験のコツ",
          "技能・日本語とも最初の3回は無料、アカウント登録不要",
        ],
        seo_title: "特定技能 介護 試験対策アプリ｜介護技能評価試験・日本語評価試験の模擬試験",
        seo_description:
          "特定技能1号「介護」の試験対策アプリ。介護技能評価試験（45問・60分）20回分と介護日本語評価試験（15問・30分）30回分、ふりがな、ベトナム語・英語訳、37場面の声かけフレーズ。",
      },
      {
        locale: "vi",
        name: "ViMai Tokutei Kaigo – Luyện thi kỹ năng đặc định ngành điều dưỡng",
        tagline: "Luyện thi Tokutei Ginou 1 ngành Kaigo (特定技能1号 介護): 20 đề kỹ năng, 30 đề tiếng Nhật, 1.350 câu",
        description:
          "Ứng dụng web luyện hai bài thi Tokutei Ginou 1 ngành chăm sóc điều dưỡng (Kaigo), thi trên máy (CBT) tại Prometric: 介護技能評価試験 (kỹ năng, 45 câu, 60 phút, đỗ từ 60%) và 介護日本語評価試験 (tiếng Nhật Kaigo, 15 câu, 30 phút, đỗ từ 73%). Có 20 đề kỹ năng và 30 đề tiếng Nhật theo đúng cấu trúc chính thức, tổng cộng 1.350 câu, câu nào cũng có giải thích. Làm bài bấm giờ như thi thật: chọn đúng tự sang câu sau, chọn sai thì dừng lại giải thích ngay. Chữ Hán có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm bộ câu giao tiếp cho 37 bối cảnh chăm sóc với 3.164 câu (có giọng đọc tiếng Nhật trên web), phần ghi chép và giao ca, sổ 500 từ vựng Kaigo và hướng dẫn thi miễn phí (cấu trúc đề, điểm đỗ, lệ phí, cách đăng ký ở Nhật và Việt Nam).",
        long_description:
          "Đề do ViMai biên soạn theo cấu trúc chính thức để luyện tập; đây không phải đề thi thật và không được Bộ Y tế, Lao động và Phúc lợi Nhật Bản hay Prometric bảo trợ. Lịch thi, lệ phí và quy định có thể thay đổi, hãy kiểm tra trang chính thức trước khi đăng ký. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người nước ngoài muốn làm ngành chăm sóc điều dưỡng (介護) tại Nhật, đang chuẩn bị thi Tokutei Ginou 1 ngành Kaigo.",
        features: [
          "20 đề kỹ năng 介護技能評価試験, mỗi đề 45 câu, bấm giờ 60 phút, đỗ từ 60%",
          "30 đề tiếng Nhật 介護日本語評価試験, mỗi đề 15 câu, bấm giờ 30 phút, đỗ từ 73%",
          "Câu giao tiếp 37 bối cảnh chăm sóc, 3.164 câu Việt – Nhật – Anh có furigana, kèm ghi chép và giao ca, miễn phí",
          "Chọn đúng tự sang câu sau; chọn sai dừng lại giải thích, VIP có thêm AI giải thích",
          "Chữ Hán có furigana, bật dịch tiếng Việt hoặc tiếng Anh cho từng câu",
          "Sổ 500 từ vựng Kaigo có flashcard, 100 từ đầu miễn phí; giọng đọc tiếng Nhật trên web",
          "Hướng dẫn thi miễn phí: cấu trúc đề, điểm đỗ, lệ phí, cách đăng ký ở Nhật và Việt Nam, link chính thức",
          "Ôn lại câu sai, xem lại bài làm, lịch sử kết quả; mẹo thi dành cho VIP",
          "Mỗi phần 3 đề đầu miễn phí, không cần tạo tài khoản; VIP trên web: 1 tháng 450.000đ, 3 tháng 700.000đ, thanh toán VietQR, tối đa 2 thiết bị",
        ],
        seo_title: "Luyện thi Tokutei Kaigo – 20 đề kỹ năng, 30 đề tiếng Nhật",
        seo_description:
          "Đề thi Tokutei Kaigo (特定技能 介護): 20 đề kỹ năng 45 câu, 30 đề tiếng Nhật 15 câu, furigana, dịch tiếng Việt, câu giao tiếp 37 bối cảnh. 3 đề đầu miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Tokutei Kaigo: Care Worker Exam Practice",
        tagline: "Tokutei Ginou (SSW i) care worker (介護) test practice: 20 skills tests, 30 Japanese tests, 1,350 questions",
        description:
          "A web app for practising the two Specified Skilled Worker (i) care exams, both computer-based tests (CBT) at Prometric: the care skills test (介護技能評価試験, 45 questions, 60 minutes, pass with 60%) and the care Japanese test (介護日本語評価試験, 15 questions, 30 minutes, pass with 73%). It has 20 skills tests and 30 Japanese tests that follow the official structure, 1,350 questions in total, each with an explanation. Tests are timed like the real ones: a correct answer moves on by itself, and a wrong answer stops to show the explanation. Kanji have furigana, and Vietnamese and English translations can be turned on. It also has 3,164 care phrases for 37 care situations (with Japanese audio on the web), a records and shift handover section, a 500-word care vocabulary book and a free exam guide (structure, pass marks, fees and how to register in Japan and Vietnam).",
        long_description:
          "Questions are written by ViMai to follow the official structure for practice. They are not real exam questions, and the app is not endorsed by the Ministry of Health, Labour and Welfare or Prometric. Dates, fees and rules can change, so always check the official page before you apply. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Foreign learners who want to work in care (介護) in Japan and are preparing for the Specified Skilled Worker (i) care exams.",
        features: [
          "20 care skills mock tests (介護技能評価試験), 45 questions in 60 minutes each, pass with 60%",
          "30 care Japanese mock tests (介護日本語評価試験), 15 questions in 30 minutes each, pass with 73%",
          "3,164 care phrases for 37 situations in Vietnamese, Japanese and English with furigana, plus records and shift handovers, free",
          "A correct answer moves on; a wrong answer stops for the explanation, and VIP adds AI explanations",
          "Furigana on kanji; Vietnamese or English translation for every question",
          "500-word care vocabulary book with flashcards, the first 100 free; Japanese audio on the web",
          "Free exam guide: structure, pass marks, fees, registration in Japan and Vietnam, official links",
          "Mistake review, answer review and result history; exam tips for VIP",
          "The first 3 tests of each part are free, no account needed",
        ],
        seo_title: "Tokutei Kaigo Practice Tests: Care Skills and Japanese",
        seo_description:
          "Tokutei Ginou care exam practice: 20 skills tests (45 questions, 60 min), 30 care Japanese tests (15 questions, 30 min), furigana, phrases for 37 situations.",
      },
    ],
  },
];

export const seedFaqs: Array<
  Omit<Faq, "question" | "answer"> & {
    product_slug: string | null;
    translations: Record<Locale, { question: string; answer: string }>;
  }
> = [
  {
    id: "faq-1",
    product_id: "00000000-0000-0000-0000-000000000001",
    product_slug: "tokutei-taxi",
    sort_order: 1,
    published: true,
    translations: {
      ja: {
        question: "Tokutei Taxiはどのような試験に対応していますか？",
        answer:
          "日本の特定技能「自動車運送業（タクシー）」分野の試験対策を目的としています。模擬試験を中心に学習できます。",
      },
      vi: {
        question: "ViMai Tokutei Taxi ôn thi chứng chỉ nào?",
        answer:
          "Ứng dụng phục vụ luyện thi chứng chỉ kỹ năng đặc định (Tokutei Gino) lĩnh vực vận tải / taxi tại Nhật Bản, với các đề thi thử.",
      },
      en: {
        question: "Which exam does Tokutei Taxi cover?",
        answer:
          "It is built for Japan's Specified Skilled Worker (Tokutei Gino) taxi / automobile transport certification, with mock exams.",
      },
    },
  },
  {
    id: "faq-2",
    product_id: null,
    product_slug: null,
    sort_order: 2,
    published: true,
    translations: {
      ja: {
        question: "アプリはどこからダウンロードできますか？",
        answer:
          "公開中のアプリは各製品ページのApp Store / Google Playボタンから案内します。準備中の製品は「近日公開」と表示されます。",
      },
      vi: {
        question: "Tải ứng dụng ở đâu?",
        answer:
          "Ứng dụng đã phát hành sẽ có nút App Store / Google Play trên trang sản phẩm. Sản phẩm chưa ra mắt được đánh dấu sắp ra mắt.",
      },
      en: {
        question: "Where can I download the apps?",
        answer:
          "Released apps are linked from each product page via App Store / Google Play. Products still in preparation are labeled coming soon.",
      },
    },
  },
  {
    id: "faq-3",
    product_id: null,
    product_slug: null,
    sort_order: 3,
    published: true,
    translations: {
      ja: {
        question: "対応言語は何ですか？",
        answer:
          "本サイトはベトナム語・英語・日本語に対応しています。Tokutei Taxi、Tokutei Transport、Tokutei Kaigo、Gino 1 Seibi、Seibishi 3kyu、ViCare、ViMai Kids、MaiMaiの表示言語はベトナム語・英語・日本語、ViMai Menkyoはベトナム語・英語です。試験対策アプリの日本語の問題には振り仮名が付き、訳を表示できます。",
      },
      vi: {
        question: "Hệ sinh thái hỗ trợ ngôn ngữ nào?",
        answer:
          "Website vimai.jp có tiếng Việt, tiếng Anh và tiếng Nhật. Các app Tokutei Taxi, Tokutei Transport, Tokutei Kaigo, Gino 1 Seibi, Seibishi 3kyu, ViCare, ViMai Kids và MaiMai có giao diện tiếng Việt, tiếng Anh và tiếng Nhật; ViMai Menkyo có tiếng Việt và tiếng Anh. Câu hỏi tiếng Nhật trong các app luyện thi đều có furigana và bật được bản dịch.",
      },
      en: {
        question: "Which languages are supported?",
        answer:
          "This website is available in Vietnamese, English and Japanese. Tokutei Taxi, Tokutei Transport, Tokutei Kaigo, Gino 1 Seibi, Seibishi 3kyu, ViCare, ViMai Kids and MaiMai have Vietnamese, English and Japanese interfaces; ViMai Menkyo is in Vietnamese and English. Japanese questions in the exam apps have furigana, and translations can be turned on.",
      },
    },
  },
  {
    id: "faq-4",
    product_id: "00000000-0000-0000-0000-000000000004",
    product_slug: "kids",
    sort_order: 4,
    published: true,
    translations: {
      ja: {
        question: "ViMai Kidsの保護者管理とは何ですか？",
        answer:
          "保護者エリア（ホーム画面上部の鍵アイコンを3秒長押し）は、大人向けのランダムなかけ算の問題で保護されています。保護者はスキルごとの進み具合の確認、1日の学習時間の設定、音声・BGMの音量、表示言語の変更、複数の子どものプロフィールの管理ができます。広告やアプリ内課金はなく、データも収集しません。",
      },
      vi: {
        question: "Kiểm soát phụ huynh trên ViMai Kids là gì?",
        answer:
          "Khu phụ huynh (biểu tượng ổ khóa ở góc trên màn hình chính, giữ 3 giây) được bảo vệ bằng một phép nhân ngẫu nhiên dành cho người lớn. Trong đó phụ huynh xem tiến độ từng kỹ năng của bé, đặt thời gian học mỗi ngày, chỉnh âm lượng giọng đọc và nhạc nền, đổi ngôn ngữ giao diện và quản lý nhiều hồ sơ bé. App không có quảng cáo, không mua hàng trong ứng dụng và không thu thập dữ liệu.",
      },
      en: {
        question: "What parent controls does ViMai Kids include?",
        answer:
          "The parent area (the lock icon at the top of the home screen, held for 3 seconds) is protected by a random multiplication question for adults. There, parents see progress per skill, set a daily learning time, adjust voice and music volume, change the interface language and manage several child profiles. The app has no ads, no in-app purchases and collects no data.",
      },
    },
  },
  {
    id: "faq-menkyo-1",
    product_id: "00000000-0000-0000-0000-000000000006",
    product_slug: "menkyo",
    sort_order: 5,
    published: true,
    translations: {
      ja: {
        question: "ViMai Menkyoはどの試験に対応していますか？",
        answer:
          "日本の運転免許の学科試験です。仮免（50問・30分・45問以上で合格）、本免（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替（50問・30分・45問以上で合格）の模擬試験を各20回、計60回収録しています。",
      },
      vi: {
        question: "ViMai Menkyo luyện thi những kỳ thi nào?",
        answer:
          "Thi lý thuyết bằng lái ô tô Nhật (学科試験): Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm) và đổi bằng nước ngoài (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Mỗi loại có 20 đề, tổng cộng 60 đề.",
      },
      en: {
        question: "Which tests does ViMai Menkyo cover?",
        answer:
          "The Japanese driving-licence theory test (学科試験): Karimen (仮免, 50 questions, 30 minutes, pass at 45), Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100) and foreign licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). There are 20 mock exams of each type, 60 in total.",
      },
    },
  },
  {
    id: "faq-menkyo-2",
    product_id: "00000000-0000-0000-0000-000000000006",
    product_slug: "menkyo",
    sort_order: 6,
    published: true,
    translations: {
      ja: {
        question: "アプリは何語で使えますか？",
        answer:
          "アプリの表示言語はベトナム語と英語です。日本語の画面はありません。日本の交通法規の内容を、ベトナム語・英語話者向けに説明しています。",
      },
      vi: {
        question: "App dùng ngôn ngữ nào?",
        answer:
          "App có tiếng Việt và tiếng Anh. Nội dung bám luật giao thông Nhật hiện hành và được giải thích bằng ngôn ngữ bạn chọn.",
      },
      en: {
        question: "Which languages does the app use?",
        answer:
          "The app is available in Vietnamese and English. It explains current Japanese traffic law in the language you choose.",
      },
    },
  },
  {
    id: "faq-menkyo-3",
    product_id: "00000000-0000-0000-0000-000000000006",
    product_slug: "menkyo",
    sort_order: 7,
    published: true,
    translations: {
      ja: {
        question: "無料でどこまで使えますか？",
        answer:
          "模擬試験は種類ごとに5回分が無料です。VIPで60回分すべてが使えます。VIPはApp Storeのアプリ内でApple決済により購入し、価格はAppleが表示します。ログインは任意で、ログインすると学習の進み具合をすべての端末で引き継げます。",
      },
      vi: {
        question: "Dùng miễn phí được những gì?",
        answer:
          "Mỗi loại thi có 5 đề thi thử miễn phí. VIP mở toàn bộ 60 đề, cùng hệ thống giá với các app ViMai khác. Đăng nhập là tùy chọn; khi đăng nhập, tiến độ học được giữ trên mọi thiết bị.",
      },
      en: {
        question: "What can I use for free?",
        answer:
          "Five mock exams of each type are free. VIP unlocks all 60 and is bought inside the app with Apple payment, where Apple shows the price. Sign-in is optional; signing in keeps your progress on all your devices.",
      },
    },
  },
  {
    id: "faq-gino1-1",
    product_id: "00000000-0000-0000-0000-000000000007",
    product_slug: "gino1-seibi",
    sort_order: 8,
    published: true,
    translations: {
      ja: {
        question: "ViMai Gino 1 Seibiはどの試験の対策アプリですか？",
        answer:
          "「特定技能1号評価試験 自動車整備分野」の対策アプリです。試験はJASPA（日本自動車整備振興会連合会）が実施し、CBT方式で、日本語の問題には振り仮名が付きます。",
      },
      vi: {
        question: "ViMai Gino 1 Seibi luyện thi kỳ thi nào?",
        answer:
          "App luyện thi kỹ năng đặc định 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), thường gọi là thi Tokutei bảo dưỡng ô tô hay Tokutei Seibi. Kỳ thi do JASPA tổ chức, thi trên máy tính (CBT) bằng tiếng Nhật có furigana.",
      },
      en: {
        question: "Which exam does ViMai Gino 1 Seibi prepare for?",
        answer:
          "The Tokutei Ginou (Specified Skilled Worker (i)) skills test for automobile maintenance (特定技能1号評価試験 自動車整備分野). The test is run by JASPA as a computer-based test (CBT) in Japanese, with furigana.",
      },
    },
  },
  {
    id: "faq-gino1-2",
    product_id: "00000000-0000-0000-0000-000000000007",
    product_slug: "gino1-seibi",
    sort_order: 9,
    published: true,
    translations: {
      ja: {
        question: "試験の形式と合格基準は？",
        answer:
          "学科は○×問題30問・60分で、65%以上の正答で合格です。実技は3つの課題（2択の問題）・20分で、60%以上の正答で合格です。学科と実技の両方に合格する必要があります。アプリの模擬試験は、学科30問と実技3課題（各3問）を1回80分で通して解く形式です。",
      },
      vi: {
        question: "Đề thi gồm những phần nào, bao nhiêu điểm thì đậu?",
        answer:
          "Phần lý thuyết (学科) có 30 câu ○×, làm trong 60 phút, đậu khi đúng từ 65%. Phần thực hành (実技) có 3 bài (課題) gồm các câu chọn 1 trong 2, làm trong 20 phút, đậu khi đúng từ 60%. Phải đậu cả hai phần. Trong app, mỗi đề thi thử gồm 30 câu lý thuyết và 3 bài thực hành (mỗi bài 3 câu), làm liền một lượt 80 phút.",
      },
      en: {
        question: "What is the test format and the pass mark?",
        answer:
          "The theory part (学科) has 30 true/false questions in 60 minutes; you pass with 65% correct. The practical part (実技) has 3 tasks of two-choice questions in 20 minutes; you pass with 60% correct. You must pass both parts. In the app, each mock exam has the 30 theory questions and 3 practical tasks (3 questions each), taken in one 80-minute sitting.",
      },
    },
  },
  {
    id: "faq-gino1-3",
    product_id: "00000000-0000-0000-0000-000000000007",
    product_slug: "gino1-seibi",
    sort_order: 10,
    published: true,
    translations: {
      ja: {
        question: "無料でどこまで使えますか？",
        answer:
          "模擬試験の第1〜3回は無料です。部品・用語辞典（2500語以上）は、単語・読み方・短い意味の検索が無料です。第4〜20回、辞典の詳しい解説・図・フラッシュカード、試験のコツ、AIチューターはVIPで使えます。",
      },
      vi: {
        question: "Dùng miễn phí được những gì?",
        answer:
          "Đề 1–3 miễn phí. Từ điển phụ tùng và thuật ngữ (hơn 2.500 mục) tra cứu miễn phí: từ tiếng Nhật, cách đọc và nghĩa ngắn. VIP mở đề 4–20, giải thích chi tiết, hình và flashcard trong từ điển, mẹo làm bài và gia sư AI giải thích câu sai.",
      },
      en: {
        question: "What can I use for free?",
        answer:
          "Mock exams 1–3 are free. The parts and terms dictionary (over 2,500 entries) is free to search: the Japanese term, its reading and a short meaning. VIP unlocks exams 4–20, the dictionary's detailed explanations, figures and flashcards, the exam tips and the AI tutor.",
      },
    },
  },
  {
    id: "faq-gino1-4",
    product_id: "00000000-0000-0000-0000-000000000007",
    product_slug: "gino1-seibi",
    sort_order: 11,
    published: true,
    translations: {
      ja: {
        question: "VIPはどうすれば使えますか？",
        answer:
          "VIPでは第4〜20回、辞典の詳しい解説、試験のコツ、AIチューターが使えます。iPhoneアプリはApp Storeでの公開に向けて準備中で、公開後はアプリ内でApple決済により購入でき、価格はAppleの画面に表示されます。Webで購入したVIPとApp Storeで購入したVIPは別のものです。",
      },
      vi: {
        question: "VIP giá bao nhiêu?",
        answer:
          "Trên web, VIP 3 tháng giá 700.000đ, 1 tháng giá 450.000đ, thanh toán bằng chuyển khoản VietQR. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20%.",
      },
      en: {
        question: "How do I get VIP?",
        answer:
          "VIP unlocks exams 4–20, the dictionary details, the exam tips and the AI tutor. The iPhone app is being prepared for the App Store; there, VIP will be bought inside the app with Apple payment, at the price Apple shows. VIP bought on the web and VIP bought in the App Store are separate.",
      },
    },
  },
  {
    id: "faq-gino1-5",
    product_id: "00000000-0000-0000-0000-000000000007",
    product_slug: "gino1-seibi",
    sort_order: 12,
    published: true,
    translations: {
      ja: {
        question: "どの端末・言語で使えますか？",
        answer:
          "現在はベータ版のWebアプリで、スマートフォンやパソコンのブラウザから gino1-seibi.vimai.jp を開いて使います。App Store・Google Play版はまだありません。アプリの表示言語はベトナム語・英語・日本語です。",
      },
      vi: {
        question: "Dùng trên thiết bị nào, ngôn ngữ gì?",
        answer:
          "Hiện app đang ở bản beta trên web: mở gino1-seibi.vimai.jp bằng trình duyệt trên điện thoại hoặc máy tính là dùng được, chưa có bản trên App Store hay Google Play. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.",
      },
      en: {
        question: "Which devices and languages are supported?",
        answer:
          "The app is a web app in beta: open gino1-seibi.vimai.jp in the browser on your phone or computer. There is no App Store or Google Play version yet. The app interface is available in Vietnamese, English and Japanese.",
      },
    },
  },
  {
    id: "faq-gino1-6",
    product_id: "00000000-0000-0000-0000-000000000007",
    product_slug: "gino1-seibi",
    sort_order: 13,
    published: true,
    translations: {
      ja: {
        question: "3級自動車整備士試験とは何が違いますか？",
        answer:
          "別の試験です。このアプリは特定技能1号評価試験（自動車整備分野）の形式（学科○×と実技2択）に合わせて作られています。問題は過去の3級自動車整備士試験の出題分野も参考にしていますが、3級整備士試験そのものの対策アプリではなく、実際の過去問でもありません。",
      },
      vi: {
        question: "Khác gì so với kỳ thi 3級 整備士 (thợ bảo dưỡng ô tô cấp 3)?",
        answer:
          "Đây là hai kỳ thi khác nhau. App này bám dạng đề của kỳ thi Tokutei Gino 1 ngành bảo dưỡng ô tô (lý thuyết ○× và thực hành chọn 1 trong 2). Câu hỏi có tham khảo các chủ đề từng ra trong kỳ thi 3級 整備士 nhưng app không phải để luyện riêng kỳ thi 3級, và câu hỏi không phải đề thi thật.",
      },
      en: {
        question: "How is this different from the Class 3 mechanic (3級 整備士) exam?",
        answer:
          "They are different exams. This app follows the format of the Tokutei Ginou automobile maintenance test (true/false theory and two-choice practical questions). Its questions draw on topics from past 3級 整備士 exams, but it is not a prep app for the 3級 exam itself, and the questions are not real past questions.",
      },
    },
  },
  {
    id: "faq-transport-1",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 14,
    published: true,
    translations: {
      ja: {
        question: "ViMai Tokutei Transportはどの試験の対策アプリですか？",
        answer:
          "「自動車運送業分野特定技能1号評価試験」のトラック区分の対策アプリです。試験はClassNK（一般財団法人日本海事協会）が実施し、CBT方式で行われます。",
      },
      vi: {
        question: "ViMai Tokutei Transport luyện thi kỳ thi nào?",
        answer:
          "App luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục xe tải (自動車運送業分野特定技能1号評価試験 トラック), thường gọi là thi Tokutei xe tải hay Tokutei vận tải. Kỳ thi do ClassNK (日本海事協会) tổ chức, thi trên máy tính (CBT) bằng tiếng Nhật.",
      },
      en: {
        question: "Which exam does ViMai Tokutei Transport prepare for?",
        answer:
          "The Tokutei Ginou (Specified Skilled Worker (i)) skills test for automobile transport, truck category (自動車運送業分野特定技能1号評価試験 トラック). The test is run by ClassNK (Nippon Kaiji Kyokai) as a computer-based test (CBT) in Japanese.",
      },
    },
  },
  {
    id: "faq-transport-2",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 15,
    published: true,
    translations: {
      ja: {
        question: "試験の形式と合格基準は？",
        answer:
          "全50問で、学科の○×問題30問と実技の3択問題20問を80分で解きます。学科・実技それぞれ60%以上（学科18問以上、実技12問以上）の正答で合格です。合計点が高くても、どちらかが60%未満なら不合格です。アプリの模擬試験も同じ構成と採点方法です。",
      },
      vi: {
        question: "Đề thi gồm những phần nào, bao nhiêu điểm thì đậu?",
        answer:
          "Mỗi đề có 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành chọn 1 trong 3, làm trong 80 phút. Phải đúng từ 60% ở CẢ HAI phần (từ 18/30 câu lý thuyết và từ 12/20 câu thực hành); tổng điểm cao mà một phần dưới 60% vẫn trượt. Đề thi thử trong app có cùng cấu trúc và cách chấm này.",
      },
      en: {
        question: "What is the test format and the pass mark?",
        answer:
          "Each test has 50 questions: 30 true/false theory questions and 20 three-choice practical questions, in 80 minutes. You need at least 60% in BOTH parts (18 of 30 theory and 12 of 20 practical); a high total with one part under 60% is still a fail. The app's mock exams use the same structure and scoring.",
      },
    },
  },
  {
    id: "faq-transport-3",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 16,
    published: true,
    translations: {
      ja: {
        question: "無料でどこまで使えますか？",
        answer:
          "模擬試験の第1〜3回は無料で、振り仮名と翻訳も使え、アカウント登録は不要です。単語帳の最初の100語、試験の案内とClassNKの申込ガイドも無料です。第4〜20回、単語帳の全510語、問題ごとの解き方のヒント、試験のコツ、AIによる誤答の解説はVIPで使えます。",
      },
      vi: {
        question: "Dùng miễn phí được những gì?",
        answer:
          "Đề 1–3 miễn phí, có furigana và bản dịch, không cần tài khoản. Sổ từ vựng mở miễn phí 100 từ đầu, hướng dẫn kỳ thi và đăng ký thi ClassNK cũng miễn phí. VIP mở đề 4–20, đủ 510 từ vựng, mẹo nhận ra đáp án cho từng câu, cẩm nang mẹo thi và AI giải thích câu sai.",
      },
      en: {
        question: "What can I use for free?",
        answer:
          "Mock exams 1–3 are free, with furigana and translations, and need no account. The first 100 words of the vocabulary book and the exam and ClassNK registration guides are free too. VIP unlocks exams 4–20, all 510 words, a tip for spotting the answer on every question, the exam tips guide and AI explanations of wrong answers.",
      },
    },
  },
  {
    id: "faq-transport-4",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 17,
    published: true,
    translations: {
      ja: {
        question: "VIPはどこで購入できますか？",
        answer:
          "VIPはApp StoreのiPhoneアプリ内でAppleの決済により購入します。価格はAppleの画面に表示されます。App Storeで購入したVIPとWebで購入したVIPは別のものです。無料の模擬試験はブラウザでも試せます。",
      },
      vi: {
        question: "VIP giá bao nhiêu?",
        answer:
          "Trên web, VIP 3 tháng giá 700.000đ, 1 tháng giá 450.000đ, thanh toán bằng chuyển khoản VietQR, VIP tự mở sau khi chuyển khoản. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20% (gói 3 tháng còn 630.000đ, 595.000đ hoặc 560.000đ). Mỗi gói VIP dùng tối đa 2 thiết bị.",
      },
      en: {
        question: "How do I buy VIP?",
        answer:
          "VIP is bought inside the iPhone app on the App Store with Apple payment, and Apple shows the price. VIP bought in the App Store and VIP bought on the web are separate. The free exams can also be tried in the browser.",
      },
    },
  },
  {
    id: "faq-transport-5",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 18,
    published: true,
    translations: {
      ja: {
        question: "どの端末・言語で使えますか？",
        answer:
          "iPhoneアプリはApp Storeで公開中です。無料の模擬試験はiPhone・Android・パソコンのブラウザでも使え、ホーム画面に追加することもできます。アプリの表示言語はベトナム語・英語・日本語です。",
      },
      vi: {
        question: "Dùng trên thiết bị nào, ngôn ngữ gì?",
        answer:
          "App chạy trên trình duyệt: mở tokutei-transport.vimai.jp trên điện thoại (iPhone, Android) hoặc máy tính là làm được ngay, và có thể thêm ra màn hình chính như một ứng dụng. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.",
      },
      en: {
        question: "Which devices and languages are supported?",
        answer:
          "The iPhone app is available on the App Store. The free exams also run in the browser on iPhone, Android or a computer, and the web app can be added to the home screen. The app interface is available in Vietnamese, English and Japanese.",
      },
    },
  },
  {
    id: "faq-transport-6",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 19,
    published: true,
    translations: {
      ja: {
        question: "実際の試験問題ですか？",
        answer:
          "いいえ。模擬試験は本番の構成（50問・80分・各60%以上で合格）に合わせていますが、問題は「トラック運転者をめざす人のための学習用テキスト」をもとにViMaiが作成したもので、すべてに解説が付いています。ClassNKの公認・監修を受けたものではありません。",
      },
      vi: {
        question: "Câu hỏi trong app có phải đề thi thật không?",
        answer:
          "Không. Đề thi thử mô phỏng cấu trúc của kỳ thi (50 câu, 80 phút, mỗi phần từ 60%), còn câu hỏi do ViMai soạn bám giáo trình 「トラック運転者をめざす人のための学習用テキスト」, mỗi câu có giải thích. App không được ClassNK bảo trợ.",
      },
      en: {
        question: "Are these real exam questions?",
        answer:
          "No. The mock exams follow the structure of the test (50 questions, 80 minutes, 60% in each part), and the questions are written by ViMai from the truck driver study textbook, each with an explanation. The app is not endorsed by ClassNK.",
      },
    },
  },
  {
    id: "faq-transport-7",
    product_id: "00000000-0000-0000-0000-000000000002",
    product_slug: "tokutei-transport",
    sort_order: 20,
    published: true,
    translations: {
      ja: {
        question: "タクシーの試験を受ける場合は？",
        answer:
          "トラックとタクシーは別の試験です。タクシー区分を受ける場合は、ViMai Tokutei Taxiをご利用ください。",
      },
      vi: {
        question: "Tôi thi ngành Taxi thì dùng app nào?",
        answer:
          "Đề xe tải khác đề taxi. Nếu thi hạng mục taxi, hãy dùng ViMai Tokutei Taxi (tokutei-taxi.vimai.jp).",
      },
      en: {
        question: "I am taking the taxi test. Which app should I use?",
        answer:
          "The truck test is different from the taxi test. For the taxi category, use ViMai Tokutei Taxi.",
      },
    },
  },
  {
    id: "faq-seibi3-1",
    product_id: "00000000-0000-0000-0000-000000000003",
    product_slug: "seibi",
    sort_order: 21,
    published: true,
    translations: {
      ja: {
        question: "ViMai Seibishi 3kyuはどの試験の対策アプリですか？",
        answer:
          "JASPA（日本自動車整備振興会連合会）が実施する3級自動車整備士 登録試験の学科（筆記）の対策アプリです。試験は3級シャシ、3級ガソリン・エンジン、3級ジーゼル・エンジンの3種類で、アプリには3種類すべての模擬試験があります。特定技能1号評価試験（自動車整備分野）とは別の試験で、そちらを受ける場合はViMai Gino 1 Seibiをご利用ください。",
      },
      vi: {
        question: "ViMai Seibishi 3kyu luyện thi kỳ thi nào?",
        answer:
          "App luyện phần thi lý thuyết (学科) của kỳ thi 3級自動車整備士 登録試験 (thợ bảo dưỡng ô tô cấp 3), kỳ thi do JASPA tổ chức. Kỳ thi có 3 môn: 3級シャシ (khung gầm), 3級ガソリン・エンジン (động cơ xăng) và 3級ジーゼル・エンジン (động cơ diesel); app có đề cho cả 3 môn. Đây là kỳ thi khác với kỳ thi Tokutei Gino 1 ngành bảo dưỡng ô tô; nếu thi Tokutei, hãy dùng ViMai Gino 1 Seibi.",
      },
      en: {
        question: "Which exam does ViMai Seibishi 3kyu prepare for?",
        answer:
          "The written part (学科) of the Class 3 automobile mechanic registration exam (3級自動車整備士 登録試験), run by JASPA. The exam has three subjects: 3級シャシ (chassis), 3級ガソリン・エンジン (gasoline engine) and 3級ジーゼル・エンジン (diesel engine), and the app has mock papers for all three. It is a different exam from the Tokutei Ginou automobile maintenance test; for that test, use ViMai Gino 1 Seibi.",
      },
    },
  },
  {
    id: "faq-seibi3-2",
    product_id: "00000000-0000-0000-0000-000000000003",
    product_slug: "seibi",
    sort_order: 22,
    published: true,
    translations: {
      ja: {
        question: "試験の形式と合格基準は？",
        answer:
          "3種類の試験はそれぞれ別に受験します。どれも4択問題30問・60分で、70%（21問）以上の正答で合格です。アプリの模擬試験も同じ問題数・時間・合格基準で採点します。",
      },
      vi: {
        question: "Đề thi gồm bao nhiêu câu, bao nhiêu điểm thì đậu?",
        answer:
          "Mỗi môn thi riêng. Mỗi môn có 30 câu trắc nghiệm 4 lựa chọn, làm trong 60 phút, đậu khi đúng từ 70% (từ 21/30 câu). Đề thi thử trong app có cùng số câu, thời gian và cách chấm này.",
      },
      en: {
        question: "What is the exam format and the pass mark?",
        answer:
          "Each of the three subjects is taken separately. Each paper has 30 four-choice questions in 60 minutes, and you pass with 70% correct (21 of 30). The app's mock papers use the same number of questions, time and pass mark.",
      },
    },
  },
  {
    id: "faq-seibi3-3",
    product_id: "00000000-0000-0000-0000-000000000003",
    product_slug: "seibi",
    sort_order: 23,
    published: true,
    translations: {
      ja: {
        question: "無料でどこまで使えますか？",
        answer:
          "各科目の第1〜3回（計9回）の模擬試験は無料で、振り仮名と翻訳も使えます。部品・用語辞典（2,520語）の検索も無料です。「4択問題の読み方のコツ」は、問題の種類の見分け方と一部の手がかり（文章のみ）が無料です。各科目の第4〜20回、辞典の詳しい解説とフラッシュカード、コツの残りの部分、問題ごとのヒント、AIによる誤答の解説はVIPで使えます。",
      },
      vi: {
        question: "Dùng miễn phí được những gì?",
        answer:
          "Đề 1–3 của mỗi môn miễn phí (tổng 9 đề), có furigana và bản dịch. Từ điển phụ tùng và thuật ngữ 2.520 mục tra cứu miễn phí. Bí kíp đọc đề 4 lựa chọn có phần miễn phí: cách nhận ra kiểu câu và một số dấu hiệu (chỉ phần chữ). VIP mở đề 4–20 của mỗi môn, giải thích chi tiết và flashcard trong từ điển, phần còn lại của bí kíp, mẹo cho từng câu và AI giải thích câu sai. VIP 3 tháng giá 700.000đ, 1 tháng giá 450.000đ, thanh toán bằng chuyển khoản VietQR.",
      },
      en: {
        question: "What can I use for free?",
        answer:
          "Papers 1–3 of each subject (9 papers in all) are free, with furigana and translations. The parts and terms dictionary (2,520 entries) is free to search. In the tips for reading four-choice questions, the question types and some cues are free (text only). VIP unlocks papers 4–20 of each subject, the dictionary's detailed explanations and flashcards, the rest of the tips, a tip on every question and AI explanations of wrong answers.",
      },
    },
  },
  {
    id: "faq-seibi3-4",
    product_id: "00000000-0000-0000-0000-000000000003",
    product_slug: "seibi",
    sort_order: 24,
    published: true,
    translations: {
      ja: {
        question: "実際の試験問題ですか？",
        answer:
          "いいえ。模擬試験は本番の形式（4択30問・60分・70%以上で合格）に合わせていますが、問題は3級の出題範囲と過去の出題テーマをもとにViMaiが作成したもので、図も描き直しています。法令の問題は現行の保安基準・細目告示で確認しています。JASPAの公認・監修を受けたものではなく、合格を保証するものでもありません。",
      },
      vi: {
        question: "Câu hỏi trong app có phải đề thi thật không?",
        answer:
          "Không. Đề thi thử mô phỏng dạng đề thật (30 câu 4 lựa chọn, 60 phút, đúng từ 70% là đậu), còn câu hỏi do ViMai soạn dựa trên phạm vi giáo trình 3級 và các chủ đề từng ra trong đề thi; hình được vẽ lại. Câu hỏi về luật được đối chiếu với 保安基準 và 細目告示 hiện hành. App không được JASPA bảo trợ và không cam kết đậu kỳ thi.",
      },
      en: {
        question: "Are these real exam questions?",
        answer:
          "No. The mock papers follow the real format (30 four-choice questions, 60 minutes, pass with 70%), but the questions are written by ViMai from the Class 3 syllabus and topics of past exams, and figures are redrawn. Law questions are checked against the current 保安基準 and 細目告示. The app is not endorsed by JASPA and does not guarantee a pass.",
      },
    },
  },
  {
    id: "faq-seibi3-5",
    product_id: "00000000-0000-0000-0000-000000000003",
    product_slug: "seibi",
    sort_order: 25,
    published: true,
    translations: {
      ja: {
        question: "2027年からの三級（総合）の試験でも使えますか？",
        answer:
          "2027年から新しい「三級（総合）」の試験が始まる予定で、最初の学科試験は2027年3月からとされています。現在の3種類の試験も、しばらく（約2年）は続く予定です。基本となる知識は同じなので、このアプリでの学習は役に立ちますが、出題の形式や日程は変わる可能性があります。受験の前に、必ずJASPAの最新のお知らせを確認してください。",
      },
      vi: {
        question: "Từ năm 2027 có kỳ thi mới 三級（総合）, app còn dùng được không?",
        answer:
          "Dự kiến từ năm 2027 sẽ có kỳ thi mới 三級（総合）, kỳ thi lý thuyết đầu tiên từ tháng 3/2027. Các kỳ thi 3 môn hiện tại vẫn tiếp tục thêm khoảng 2 năm. Kiến thức cốt lõi về cơ bản giống nhau nên ôn bằng app vẫn có ích, nhưng dạng đề và lịch thi có thể thay đổi. Trước khi đăng ký thi, hãy xem thông báo mới nhất của JASPA.",
      },
      en: {
        question: "Can I use the app for the new 三級（総合） exam from 2027?",
        answer:
          "A new 三級（総合） (Class 3, general) exam is planned from 2027, with the first written exam from March 2027. The current three-subject exams are expected to continue for about two more years. The core knowledge is the same, so studying with the app still helps, but the format and dates may change. Always check the latest JASPA notices before you apply.",
      },
    },
  },
  {
    id: "faq-seibi3-6",
    product_id: "00000000-0000-0000-0000-000000000003",
    product_slug: "seibi",
    sort_order: 26,
    published: true,
    translations: {
      ja: {
        question: "どの端末・言語で使えますか？",
        answer:
          "Webアプリです。スマートフォンやパソコンのブラウザで seibishi3.vimai.jp を開けばすぐに使え、ホーム画面に追加することもできます。App Store・Google Play版はまだありません。アプリの表示言語はベトナム語・英語・日本語です。",
      },
      vi: {
        question: "Dùng trên thiết bị nào, ngôn ngữ gì?",
        answer:
          "App chạy trên trình duyệt (web app): mở seibishi3.vimai.jp trên điện thoại hoặc máy tính là dùng được ngay, có thể thêm ra màn hình chính như một ứng dụng. Hiện chưa có bản trên App Store hay Google Play. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.",
      },
      en: {
        question: "Which devices and languages are supported?",
        answer:
          "It is a web app: open seibishi3.vimai.jp in the browser on your phone or computer, and you can add it to the home screen. There is no App Store or Google Play version yet. The app interface is available in Vietnamese, English and Japanese.",
      },
    },
  },
  {
    id: "faq-kaigo-1",
    product_id: "00000000-0000-0000-0000-000000000009",
    product_slug: "tokutei-kaigo",
    sort_order: 31,
    published: true,
    translations: {
      ja: {
        question: "ViMai Tokutei Kaigoはどの試験の対策アプリですか？",
        answer:
          "特定技能1号「介護」の2つの試験、介護技能評価試験と介護日本語評価試験の対策アプリです。どちらもプロメトリックのコンピューター試験（CBT）で、国内・海外でほぼ毎月実施されています。特定技能「介護」で働くには、両方の合格が必要です。",
      },
      vi: {
        question: "ViMai Tokutei Kaigo luyện thi kỳ thi nào?",
        answer:
          "App luyện hai bài thi Tokutei Ginou 1 ngành chăm sóc điều dưỡng (特定技能1号 介護): 介護技能評価試験 (bài kỹ năng) và 介護日本語評価試験 (bài tiếng Nhật Kaigo). Cả hai đều thi trên máy (CBT) tại Prometric, tổ chức gần như hằng tháng ở Nhật và ở nước ngoài. Muốn làm Tokutei ngành Kaigo thì phải đỗ cả hai bài.",
      },
      en: {
        question: "Which exams does ViMai Tokutei Kaigo prepare for?",
        answer:
          "The two Specified Skilled Worker (i) care exams: the care skills test (介護技能評価試験) and the care Japanese test (介護日本語評価試験). Both are computer-based tests (CBT) at Prometric, held almost every month in Japan and overseas. You must pass both to work in care under Tokutei Ginou.",
      },
    },
  },
  {
    id: "faq-kaigo-2",
    product_id: "00000000-0000-0000-0000-000000000009",
    product_slug: "tokutei-kaigo",
    sort_order: 32,
    published: true,
    translations: {
      ja: {
        question: "試験の形式と合格基準は？",
        answer:
          "介護技能評価試験は45問・60分で、60％以上の正答で合格です。介護日本語評価試験は15問・30分で、73％以上の正答で合格です。両方の試験に合格し、さらにJFT-BasicかJLPT N4以上の日本語能力が必要です。基準は変わることがあるため、申し込む前に厚生労働省の公式ページを確認してください。",
      },
      vi: {
        question: "Đề thi gồm những gì, bao nhiêu điểm thì đỗ?",
        answer:
          "Bài kỹ năng (介護技能評価試験) có 45 câu, làm trong 60 phút, đỗ khi đúng từ 60%. Bài tiếng Nhật Kaigo (介護日本語評価試験) có 15 câu, làm trong 30 phút, đỗ khi đúng từ 73%. Phải đỗ cả hai bài, và cần thêm JFT-Basic hoặc JLPT N4 trở lên. Quy định có thể thay đổi, hãy kiểm tra trang chính thức của Bộ Y tế, Lao động và Phúc lợi Nhật Bản trước khi đăng ký.",
      },
      en: {
        question: "What is the test format and the pass mark?",
        answer:
          "The care skills test has 45 questions in 60 minutes; you pass with 60% correct. The care Japanese test has 15 questions in 30 minutes; you pass with 73% correct. You must pass both, and you also need JFT-Basic or JLPT N4 or higher. Rules can change, so check the Ministry of Health, Labour and Welfare page before you apply.",
      },
    },
  },
  {
    id: "faq-kaigo-3",
    product_id: "00000000-0000-0000-0000-000000000009",
    product_slug: "tokutei-kaigo",
    sort_order: 33,
    published: true,
    translations: {
      ja: {
        question: "無料でどこまで使えますか？",
        answer:
          "技能試験・日本語試験とも最初の3回の模擬試験（合計6回）が無料です。試験ガイド、37場面の声かけフレーズ、記録・申し送りのページ、単語帳の最初の100語も無料です。VIPでは残りの模擬試験、残りの単語、VIP向けの試験のコツ、間違えた問題のAI解説が使えます。",
      },
      vi: {
        question: "Dùng miễn phí được những gì?",
        answer:
          "Mỗi phần 3 đề đầu miễn phí (3 đề kỹ năng và 3 đề tiếng Nhật, tổng 6 đề), có furigana. Hướng dẫn thi, câu giao tiếp 37 bối cảnh, phần ghi chép và giao ca, 100 từ vựng đầu cũng miễn phí. VIP mở các đề còn lại, toàn bộ 500 từ vựng, mẹo thi VIP và AI giải thích câu sai.",
      },
      en: {
        question: "What can I use for free?",
        answer:
          "The first 3 tests of each part are free (3 skills and 3 Japanese tests, 6 in total), with furigana. The exam guide, care phrases for 37 situations, the records and shift handover section and the first 100 vocabulary words are free too. VIP unlocks the remaining tests, all 500 words, VIP exam tips and AI explanations of wrong answers.",
      },
    },
  },
  {
    id: "faq-kaigo-4",
    product_id: "00000000-0000-0000-0000-000000000009",
    product_slug: "tokutei-kaigo",
    sort_order: 34,
    published: true,
    translations: {
      ja: {
        question: "VIPはどうすれば使えますか？",
        answer:
          "VIPでは残りの模擬試験、単語帳の全500語、VIP向けの試験のコツ、AIによる解説が使えます。iPhoneアプリはApp Storeでの公開に向けて準備中で、公開後はアプリ内でApple決済により購入でき、価格はAppleの画面に表示されます。Webで購入したVIPとApp Storeで購入したVIPは別のものです。",
      },
      vi: {
        question: "VIP giá bao nhiêu?",
        answer:
          "Trên web, VIP 3 tháng giá 700.000đ và VIP 1 tháng giá 450.000đ, thanh toán bằng chuyển khoản VietQR, tự kích hoạt sau 1–2 phút. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20%.",
      },
      en: {
        question: "How do I get VIP?",
        answer:
          "VIP unlocks the remaining tests, all 500 words, the VIP exam tips and AI explanations. The iPhone app is being prepared for the App Store; there, VIP will be bought inside the app with Apple payment, at the price Apple shows. VIP bought on the web and VIP bought in the App Store are separate.",
      },
    },
  },
  {
    id: "faq-kaigo-5",
    product_id: "00000000-0000-0000-0000-000000000009",
    product_slug: "tokutei-kaigo",
    sort_order: 35,
    published: true,
    translations: {
      ja: {
        question: "どの端末・言語で使えますか？アカウントは必要ですか？",
        answer:
          "Webアプリです。スマートフォンやパソコンのブラウザで kaigo.vimai.jp を開けばすぐに使え、ホーム画面に追加することもできます。アカウント登録は不要です。アプリの表示言語はベトナム語・日本語・英語です。",
      },
      vi: {
        question: "Dùng trên thiết bị nào, ngôn ngữ gì, có cần tài khoản không?",
        answer:
          "App chạy trên trình duyệt (web app): mở kaigo.vimai.jp trên điện thoại hoặc máy tính là dùng được ngay, có thể thêm ra màn hình chính như một ứng dụng. Không cần tạo tài khoản; khi mua VIP, app cấp mã khôi phục để dùng trên máy thứ hai. Giao diện app có tiếng Việt, tiếng Nhật và tiếng Anh.",
      },
      en: {
        question: "Which devices and languages are supported? Do I need an account?",
        answer:
          "It is a web app: open kaigo.vimai.jp in the browser on your phone or computer, and you can add it to the home screen. No account is needed. The app interface is available in Vietnamese, Japanese and English.",
      },
    },
  },
  {
    id: "faq-kaigo-6",
    product_id: "00000000-0000-0000-0000-000000000009",
    product_slug: "tokutei-kaigo",
    sort_order: 36,
    published: true,
    translations: {
      ja: {
        question: "アプリの問題は本番の試験問題ですか？",
        answer:
          "いいえ。公式の出題構成に合わせてViMaiが練習用に作成した問題で、本番の試験問題ではありません。厚生労働省やプロメトリックの公認・監修も受けていません。合格を保証するものではありません。",
      },
      vi: {
        question: "Đề trong app có phải đề thi thật không?",
        answer:
          "Không. Đề do ViMai biên soạn theo cấu trúc chính thức để luyện tập, không phải đề thi thật và không được Bộ Y tế, Lao động và Phúc lợi Nhật Bản hay Prometric bảo trợ. App không cam kết kết quả thi.",
      },
      en: {
        question: "Are the app's questions the real exam?",
        answer:
          "No. ViMai writes them to follow the official structure for practice. They are not real exam questions, and the app is not endorsed by the Ministry of Health, Labour and Welfare or Prometric. The app does not promise a result.",
      },
    },
  },
];

export function localizeProduct(product: Product, locale: Locale) {
  const translation =
    product.translations.find((item) => item.locale === locale) ??
    product.translations.find((item) => item.locale === "vi") ??
    product.translations[0];

  return {
    ...product,
    website_url: resolveProductSite(product.slug, product.website_url),
    logo_url: toOptimizedImage(product.logo_url),
    icon_url: toOptimizedImage(product.icon_url),
    hero_image_url: toOptimizedImage(product.hero_image_url),
    name: translation?.name ?? product.slug,
    tagline: translation?.tagline ?? "",
    description: translation?.description ?? "",
    long_description: translation?.long_description,
    features: translation?.features ?? [],
    target_audience: translation?.target_audience ?? product.target_audience,
    // A CMS-wide SEO override on the product row wins; otherwise use the
    // per-locale SEO text stored with the translation.
    seo_title: product.seo_title || translation?.seo_title || null,
    seo_description: product.seo_description || translation?.seo_description || null,
  };
}
