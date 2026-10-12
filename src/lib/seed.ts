import type { Faq, Locale, Product } from "@/types";
import { resolveProductSite, toOptimizedImage } from "@/lib/product-sites";

export const seedProducts: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "tokutei-taxi",
    status: "coming_soon",
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
        tagline: "特定技能1号（タクシー）の学習アプリ",
        description:
          "外国人が日本の特定技能1号・タクシー分野の試験勉強と演習を行うためのアプリです。CBT形式の練習、模擬問題、誤答の見直し、学習のヒント、日本語とベトナム語、振り仮名、解説を備えています。",
        long_description:
          "試験の合格を保証するものではありません。出題形式に慣れることと、間違えた箇所を見直すことを目的とした学習ツールです。",
        target_audience:
          "日本でタクシー分野の特定技能1号を目指す外国人学習者。",
        features: [
          "CBT形式の練習",
          "模擬問題",
          "誤答の見直し",
          "学習のヒント",
          "日本語・ベトナム語",
          "振り仮名",
          "わかりやすい解説",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Tokutei Taxi",
        tagline: "Ứng dụng luyện thi 特定技能1号 – Taxi",
        description:
          "Ứng dụng dành cho người nước ngoài học và luyện thi 特定技能1号 ngành Taxi tại Nhật. Có luyện CBT, câu hỏi mô phỏng, ôn lại câu sai, mẹo làm bài, hỗ trợ tiếng Nhật và tiếng Việt, Furigana và phần giải thích.",
        long_description:
          "Công cụ học tập để làm quen dạng đề và rà soát chỗ sai. Không cam kết đậu kỳ thi.",
        target_audience:
          "Người nước ngoài tại Nhật đang chuẩn bị thi 特定技能1号 ngành Taxi.",
        features: [
          "Luyện dạng CBT",
          "Câu hỏi thi thử",
          "Ôn lại câu sai",
          "Mẹo làm bài",
          "Hỗ trợ tiếng Nhật và tiếng Việt",
          "Furigana",
          "Giải thích rõ ràng",
        ],
      },
      {
        locale: "en",
        name: "ViMai Tokutei Taxi",
        tagline: "Study app for Specified Skilled Worker (i) Taxi",
        description:
          "An app for foreigners studying and practicing for Japan’s Specified Skilled Worker (i) Taxi field. It includes CBT-style practice, mock questions, mistake review, study tips, Japanese and Vietnamese support, furigana, and explanations.",
        long_description:
          "A study tool for exam format and review. It does not guarantee a passing result.",
        target_audience:
          "Foreign residents in Japan preparing for Specified Skilled Worker (i) Taxi.",
        features: [
          "CBT-style practice",
          "Mock questions",
          "Mistake review",
          "Study tips",
          "Japanese and Vietnamese support",
          "Furigana",
          "Clear explanations",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "tokutei-transport",
    status: "coming_soon",
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
        name: "ViMai Transport",
        tagline: "特定技能（自動車運送・トラック）の学習アプリ",
        description:
          "特定技能の運送・トラック分野に取り組む外国人向けの学習アプリです。対象者、学習の目的、模擬試験、日本語サポート、振り仮名、わかりやすい解説、日本での就労の方向性を整理して学べます。",
        long_description:
          "試験や就労の結果を保証するものではありません。学習範囲と出題形式を把握するためのツールです。",
        target_audience:
          "日本の特定技能・自動車運送業（トラック等）を目指す外国人学習者。",
        features: [
          "運送分野の学習目的が明確",
          "模擬試験",
          "日本語サポート",
          "振り仮名",
          "わかりやすい解説",
          "日本での就労に向けた方向づけ",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Transport",
        tagline: "Ứng dụng luyện thi 特定技能 ngành vận tải / xe tải",
        description:
          "Ứng dụng cho người học lĩnh vực 特定技能 vận tải / xe tải. Nêu rõ đối tượng, mục đích học, đề thi thử, hỗ trợ tiếng Nhật, Furigana, giải thích dễ hiểu và định hướng nghề nghiệp tại Nhật.",
        long_description:
          "Công cụ nắm phạm vi học và dạng đề. Không cam kết kết quả thi hay việc làm.",
        target_audience:
          "Người nước ngoài chuẩn bị thi và làm việc trong ngành vận tải / xe tải tại Nhật.",
        features: [
          "Mục tiêu học rõ ràng theo ngành vận tải",
          "Đề thi thử",
          "Hỗ trợ tiếng Nhật",
          "Furigana",
          "Giải thích dễ hiểu",
          "Định hướng nghề nghiệp tại Nhật",
        ],
      },
      {
        locale: "en",
        name: "ViMai Transport",
        tagline: "Study app for Specified Skilled Worker transport / trucking",
        description:
          "An app for foreigners studying the Specified Skilled Worker transport and trucking field. It highlights the audience, study purpose, practice exams, Japanese support, furigana, clear explanations, and career orientation in Japan.",
        long_description:
          "A tool for understanding the study scope and exam format. It does not guarantee exam or employment outcomes.",
        target_audience:
          "Foreign learners preparing for Specified Skilled Worker automobile transport / trucking in Japan.",
        features: [
          "Clear study purpose for transport work",
          "Practice exams",
          "Japanese-language support",
          "Furigana",
          "Clear explanations",
          "Career orientation in Japan",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "seibi",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://seibi.vimai.jp",
    featured: true,
    sort_order: 3,
    logo_url: "/images/products/sebishi_3kyu.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Seibi",
        tagline: "3級自動車整備士の学習アプリ",
        description:
          "3級自動車整備士（Seibi 3kyu）を学ぶ人のためのアプリです。対象者、学習範囲、外国人学習者への配慮、段階的な学習、わかりやすい構成を中心に設計しています。",
        long_description:
          "学科試験の学習を整理するためのツールです。合格を保証するものではありません。",
        target_audience:
          "3級自動車整備士の学科を学ぶ外国人および日本語学習者。",
        features: [
          "3級整備士の学習範囲に沿った構成",
          "外国人学習者への配慮",
          "段階的に進められる学習",
          "学科の基礎を整理",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Seibi",
        tagline: "Ứng dụng học Seibi 3kyu (3級自動車整備士)",
        description:
          "Ứng dụng học chứng chỉ Seibi 3kyu. Nêu rõ đối tượng, phạm vi học, hỗ trợ người nước ngoài, lộ trình có cấu trúc và điểm mạnh của sản phẩm.",
        long_description:
          "Công cụ sắp xếp kiến thức thi lý thuyết. Không cam kết đậu kỳ thi.",
        target_audience:
          "Người nước ngoài và người học tiếng Nhật đang ôn thi 3級自動車整備士.",
        features: [
          "Bám phạm vi Seibi 3kyu",
          "Hỗ trợ người học nước ngoài",
          "Học theo lộ trình có cấu trúc",
          "Hệ thống kiến thức lý thuyết",
        ],
      },
      {
        locale: "en",
        name: "ViMai Seibi",
        tagline: "Study app for Seibi 3kyu (Class 3 automobile mechanic)",
        description:
          "An app for studying Seibi 3kyu. It highlights the audience, curriculum scope, support for foreign learners, structured study, and the product’s strengths.",
        long_description:
          "A tool for organizing written-exam study. It does not guarantee a passing result.",
        target_audience:
          "Foreign learners and Japanese-language learners studying Class 3 automobile mechanic theory.",
        features: [
          "Curriculum aligned with Seibi 3kyu",
          "Support for foreign learners",
          "Structured learning path",
          "Written-exam knowledge organized clearly",
        ],
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
        tagline: "保護者向けに設計した子どもの学びアプリ",
        description:
          "子どもが文字、ひらがな、カタカナ、ベトナム語に触れ、練習モードで学べる教育アプリです。Apple Pencilに対応し、就学前の準備にも使えます。保護者が内容を把握しやすい設計です。",
        long_description:
          "家庭での学習を補助するアプリです。学校の成績や発達を保証するものではありません。",
        target_audience:
          "就学前〜小学校低学年のお子さまを持つ保護者。",
        features: [
          "文字の練習",
          "ひらがな・カタカナ",
          "ベトナム語",
          "練習モード",
          "Apple Pencil対応",
          "インタラクティブな学習",
          "就学前の準備",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Kids",
        tagline: "Ứng dụng học cho trẻ, thiết kế cho phụ huynh",
        description:
          "Ứng dụng giáo dục cho trẻ: chữ cái, Hiragana, Katakana, tiếng Việt, chế độ luyện tập, hỗ trợ Apple Pencil, học tương tác và chuẩn bị vào lớp. Giọng điệu dành cho phụ huynh theo dõi nội dung học của con.",
        long_description:
          "Hỗ trợ học tại nhà. Không cam kết kết quả học đường hay phát triển.",
        target_audience:
          "Phụ huynh có con ở độ tuổi mầm non đến đầu tiểu học.",
        features: [
          "Luyện chữ cái",
          "Hiragana và Katakana",
          "Tiếng Việt",
          "Chế độ luyện tập",
          "Hỗ trợ Apple Pencil",
          "Học tương tác",
          "Chuẩn bị vào lớp",
        ],
      },
      {
        locale: "en",
        name: "ViMai Kids",
        tagline: "A children’s learning app designed for parents",
        description:
          "An educational app for children covering letters, hiragana, katakana, Vietnamese, practice modes, Apple Pencil support, interactive learning, and preschool preparation. Written for parents who want to see what their child is practicing.",
        long_description:
          "A home-learning aid. It does not promise school results or developmental outcomes.",
        target_audience:
          "Parents of children in preschool through early elementary years.",
        features: [
          "Letter practice",
          "Hiragana and katakana",
          "Vietnamese",
          "Practice modes",
          "Apple Pencil support",
          "Interactive learning",
          "Preschool preparation",
        ],
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
        tagline: "自分の生活指標を記録するアプリ",
        description:
          "体重、水分、睡眠、栄養、活動、周期、その他の個人指標を記録するヘルスケア／ライフスタイル記録アプリです。医療行為ではなく、日々の記録のためのツールです。",
        long_description:
          "診断・治療・予防の効果を示すものではありません。体調や健康の結果を保証しません。必要に応じて専門家に相談してください。",
        target_audience:
          "体重、睡眠、水分、栄養、活動、周期などを自分で記録したい人。",
        features: [
          "体重の記録",
          "水分摂取の記録",
          "睡眠の記録",
          "栄養の記録",
          "活動の記録",
          "周期の記録",
          "個人指標のカスタム",
        ],
      },
      {
        locale: "vi",
        name: "Maimai",
        tagline: "Ghi nhận chỉ số sinh hoạt cá nhân",
        description:
          "Ứng dụng theo dõi lối sống: cân nặng, nước, ngủ, dinh dưỡng, hoạt động, chu kỳ và các chỉ số cá nhân. Không phải công cụ y tế; chỉ dùng để ghi nhận hằng ngày.",
        long_description:
          "Không chẩn đoán, điều trị hay cam kết kết quả sức khỏe. Khi cần, hãy hỏi chuyên gia.",
        target_audience:
          "Người muốn tự ghi nhận cân nặng, giấc ngủ, nước, dinh dưỡng, hoạt động và chu kỳ.",
        features: [
          "Ghi nhận cân nặng",
          "Ghi nhận lượng nước",
          "Ghi nhận giấc ngủ",
          "Ghi nhận dinh dưỡng",
          "Ghi nhận hoạt động",
          "Ghi nhận chu kỳ",
          "Chỉ số cá nhân tùy chỉnh",
        ],
      },
      {
        locale: "en",
        name: "Maimai",
        tagline: "A personal health and lifestyle tracker",
        description:
          "A lifestyle tracker for weight, water intake, sleep, nutrition, activity, cycle tracking, and other personal metrics. It is a daily log, not a medical device.",
        long_description:
          "It does not diagnose, treat, or promise health outcomes. Consult a professional when you need medical advice.",
        target_audience:
          "People who want to log weight, sleep, water, nutrition, activity, and cycle data themselves.",
        features: [
          "Weight logging",
          "Water-intake logging",
          "Sleep logging",
          "Nutrition logging",
          "Activity logging",
          "Cycle tracking",
          "Custom personal metrics",
        ],
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
        tagline: "日本の運転免許・学科試験の学習アプリ",
        description:
          "日本で運転免許の学科試験（仮免・本免）や外国免許からの切替に取り組む、ベトナム語・英語話者のための学習アプリ（スマートフォンアプリ）です。30の単元、約2,350問の練習問題（イラスト付きの問題も多数）、ViMaiが描いた標識・標示209点、危険予測イラスト107点、模擬試験60回分を収録しています。模擬試験は仮免20回（50問・30分・45問以上で合格）、本免20回（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替20回（50問・30分・45問以上で合格）です。内容は最新の日本の交通法規（2026年の改正など）に合わせて更新します。アプリの表示言語はベトナム語と英語で、日本語表示はありません。",
        long_description:
          "ルールを理解し、合格し、自信を持って運転しよう。学習を支えるツールであり、試験の合格を保証するものではありません。",
        target_audience:
          "日本で運転免許（仮免・本免）を教習所や試験場で取得する人、または外国免許を切り替える人のうち、ベトナム語・英語で学びたい在住者。雇用主や教習所の方が内容を把握する際にもご覧ください。",
        features: [
          "模擬試験60回（仮免・本免・外免切替 各20回）",
          "最新の交通法規に対応（2026年の改正など）",
          "約2,350問の練習問題（イラスト付き多数）",
          "30の学習単元",
          "ViMaiが描いた標識・標示209点",
          "危険予測イラスト107点",
          "すぐに解説が出る学習モードと、本番と同じ時間で解く試験モード",
          "間違えた問題の間隔反復による復習と、分野別の練習",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Menkyo – Bằng lái Nhật",
        tagline: "Thi lý thuyết Karimen, Honmen và đổi bằng lái Nhật",
        description:
          "Ứng dụng (điện thoại và web) giúp người Việt và người dùng tiếng Anh tại Nhật học và luyện thi lý thuyết bằng lái ô tô Nhật (学科試験). Có 30 bài học, khoảng 2.350 câu luyện tập (nhiều câu có hình), thư viện 209 biển báo và vạch kẻ đường do ViMai vẽ, 107 tranh tình huống nguy hiểm và 60 đề thi thử: 20 đề Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), 20 đề Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm), 20 đề đổi bằng (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Nội dung luôn cập nhật theo luật giao thông Nhật hiện hành, gồm các thay đổi năm 2026. Ngôn ngữ trong app: tiếng Việt và tiếng Anh.",
        long_description:
          "Hiểu luật. Đậu bằng. Tự tin cầm lái. Đây là công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người dùng tiếng Anh sống tại Nhật đang lấy bằng lái ô tô (Karimen, Honmen ở trường lái hoặc trung tâm sát hạch) hoặc đổi bằng nước ngoài sang bằng Nhật.",
        features: [
          "60 đề thi thử Karimen, Honmen, đổi bằng",
          "Cập nhật theo luật giao thông Nhật mới nhất (2026)",
          "Khoảng 2.350 câu, nhiều câu có hình",
          "30 bài học lý thuyết",
          "209 biển báo và vạch kẻ đường do ViMai vẽ",
          "107 tranh tình huống nguy hiểm",
          "Chế độ học giải thích ngay, chế độ thi tính giờ như thi thật",
          "Ôn câu sai theo lịch lặp lại ngắt quãng, luyện theo chủ đề",
        ],
      },
      {
        locale: "en",
        name: "ViMai Menkyo: Japan License",
        tagline: "Japanese driving theory test practice: Karimen, Honmen, conversion",
        description:
          "A mobile app for Vietnamese and English speakers in Japan learning for the Japanese driving-licence theory test (学科試験). It includes 30 lesson units, about 2,350 practice questions (many with pictures), a library of 209 road signs and markings drawn by ViMai, 107 hazard-scene illustrations, and 60 mock exams: 20 Karimen (仮免, 50 questions, 30 minutes, pass at 45), 20 Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100), and 20 licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). Content is kept up to date with current Japanese traffic law, including the 2026 changes. The app is in Vietnamese and English.",
        long_description:
          "Know the rules. Pass the test. Drive with confidence. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Vietnamese and English-speaking residents in Japan getting a Japanese driving licence (Karimen and Honmen at a driving school or test centre) or converting a foreign licence.",
        features: [
          "60 mock exams: Karimen, Honmen, conversion",
          "Updated to current Japanese traffic law (2026)",
          "About 2,350 questions, many with pictures",
          "30 lesson units",
          "209 road signs and markings drawn by ViMai",
          "107 hazard-scene illustrations",
          "Learning mode with instant explanations; exam mode timed like the real test",
          "Mistake review with spaced repetition, plus topic practice",
        ],
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
        tagline: "特定技能1号 自動車整備分野の試験対策アプリ",
        description:
          "JASPA（日本自動車整備振興会連合会）が実施する「特定技能1号評価試験 自動車整備分野」の試験対策Webアプリです。JASPAのサンプル問題と同じ形式の模擬試験を20回分収録しています。1回分は学科の○×問題30問と、実技の課題3つ（各課題は2択の問題3問）で、全部で780問です。アプリでは1回分を80分で通して解きます。実技ではマイクロメータやダイヤルゲージなどの読み取り、図を使った問題を練習できます。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を表示できます。部品・用語辞典（2500語以上）は無料で引けます。",
        long_description:
          "問題はJASPAのサンプル問題と過去の3級自動車整備士試験の出題分野をもとにViMaiが書き直したもので、実際の試験問題ではありません。JASPAの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。",
        target_audience:
          "特定技能1号（自動車整備分野）の評価試験を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ企業や登録支援機関が学習内容を確認する際にもご覧ください。",
        features: [
          "JASPAサンプル問題の形式に沿った模擬試験20回・780問",
          "1回分：学科○×30問＋実技3課題（2択）、80分で通して解答",
          "マイクロメータ・ダイヤルゲージなどの読み取りと図の問題",
          "日本語の問題に振り仮名、ベトナム語・英語の訳を表示可能",
          "間違えるとその場で止まって解説を表示（VIPはAIチューター付き）",
          "部品・用語辞典 2500語以上（検索は無料）",
          "VIP向けの試験のコツ",
          "第1〜3回は無料",
        ],
        seo_title: "特定技能1号 自動車整備 試験対策｜模擬試験20回・振り仮名付き",
        seo_description:
          "特定技能1号評価試験（自動車整備分野）の試験対策アプリ。JASPAサンプル問題の形式に沿った模擬試験20回・780問（学科○×と実技2択）、振り仮名、ベトナム語・英語訳、部品・用語辞典。第1〜3回は無料。",
      },
      {
        locale: "vi",
        name: "ViMai Gino 1 Seibi – Tokutei bảo dưỡng ô tô",
        tagline: "Luyện thi kỹ năng đặc định 1 ngành bảo dưỡng ô tô (特定技能1号 自動車整備)",
        description:
          "Ứng dụng web luyện thi Tokutei Gino 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), kỳ thi do JASPA tổ chức. Có 20 đề thi thử theo đúng dạng đề mẫu của JASPA: mỗi đề gồm 30 câu lý thuyết ○× (学科) và 3 bài thực hành (実技), mỗi bài 3 câu chọn 1 trong 2, tổng cộng 780 câu. Trong app, mỗi đề làm liền một lượt 80 phút. Phần thực hành luyện đọc hình vẽ và đọc số đo trên panme (micrometer), đồng hồ so (dial gauge) và các dụng cụ tương tự. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm từ điển phụ tùng và thuật ngữ hơn 2.500 mục, tra cứu miễn phí.",
        long_description:
          "Câu hỏi do ViMai viết lại dựa trên đề mẫu của JASPA và các chủ đề từng ra trong kỳ thi 3級 整備士; đây không phải đề thi thật và không được JASPA bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người nước ngoài đang chuẩn bị thi kỹ năng đặc định 1 (Tokutei Gino 1) ngành bảo dưỡng ô tô, muốn làm quen đề tiếng Nhật có furigana và đọc giải thích bằng tiếng Việt.",
        features: [
          "20 đề thi thử theo dạng đề mẫu JASPA, 780 câu",
          "Mỗi đề: 30 câu ○× lý thuyết + 3 bài thực hành chọn 1 trong 2, làm liền 80 phút",
          "Câu thực hành có hình, đọc số đo panme, đồng hồ so",
          "Tiếng Nhật có furigana, bật dịch tiếng Việt hoặc tiếng Anh",
          "Chọn sai là dừng lại và giải thích ngay; VIP có thêm gia sư AI",
          "Từ điển phụ tùng và thuật ngữ hơn 2.500 mục, tra cứu miễn phí",
          "Mẹo làm bài dành cho VIP",
          "Đề 1–3 miễn phí; VIP 3 tháng 700.000đ, thanh toán VietQR",
        ],
        seo_title: "Luyện thi Tokutei bảo dưỡng ô tô – 20 đề kỹ năng đặc định 1",
        seo_description:
          "Đề thi tokutei bảo dưỡng ô tô (特定技能1号 自動車整備): 20 đề thi thử theo dạng đề mẫu JASPA, 780 câu ○× và thực hành, có furigana và dịch tiếng Việt. Đề 1–3 miễn phí.",
      },
      {
        locale: "en",
        name: "ViMai Gino 1 Seibi: Automobile Maintenance",
        tagline: "Tokutei Ginou (SSW i) automobile maintenance test practice",
        description:
          "A web app for practising the Tokutei Ginou automobile maintenance test (特定技能1号評価試験 自動車整備分野, Specified Skilled Worker (i)), which is run by JASPA. It has 20 mock exams in the JASPA sample format: each has 30 true/false (○×) theory questions (学科) and 3 practical tasks (実技) of 3 two-choice questions, 780 questions in total. In the app, each exam is taken in one 80-minute sitting. Practical questions use figures and gauge readings such as micrometers and dial gauges. Japanese questions have furigana, and Vietnamese and English translations can be turned on. A parts and terms dictionary with over 2,500 entries is free to search.",
        long_description:
          "Questions are written by ViMai, based on the JASPA sample exam and topics from past Class 3 mechanic (3級 整備士) exams. They are not real exam questions, and the app is not endorsed by JASPA. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Foreign learners preparing for the Specified Skilled Worker (i) automobile maintenance test who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.",
        features: [
          "20 mock exams in the JASPA sample format, 780 questions",
          "Each exam: 30 true/false theory questions + 3 two-choice practical tasks, one 80-minute sitting",
          "Practical questions with figures and micrometer and dial-gauge readings",
          "Furigana on Japanese text; Vietnamese or English translation on demand",
          "A wrong answer stops and shows the explanation; VIP adds an AI tutor",
          "Parts and terms dictionary with over 2,500 entries, free to search",
          "Exam tips for VIP members",
          "Exams 1–3 are free",
        ],
        seo_title: "Tokutei Ginou Automobile Maintenance Practice Tests (SSW i)",
        seo_description:
          "Practise for the Tokutei Ginou automobile maintenance test (JASPA): 20 mock exams, 780 true/false and practical questions, furigana, Vietnamese and English translations. Exams 1–3 are free.",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000008",
    slug: "vicare",
    status: "coming_soon",
    category: "health",
    app_store_url: null,
    google_play_url: null,
    website_url: null,
    featured: true,
    sort_order: 8,
    logo_url: "/images/products/vicare.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViCare（日本での受診サポート）",
        tagline: "日本で病院にかかるベトナム人のための無料アプリ",
        description:
          "日本に住むベトナム人が安心して受診できるよう支える、ViMaiの無料・非営利アプリです。診察時の通訳（マイク、端末内の音声認識を優先）、病院の書類や薬袋のカメラ読み取り（端末内で処理）、症状から診療科を選ぶガイドと危険なサイン、診療科別にGoogleマップで医療機関を探す機能、119・110・#7119・#8000の伝え方、緊急医療情報・受診記録・服用中の薬を備えています。",
        long_description:
          "参考情報とコミュニケーション支援のためのアプリで、診断ではありません。医療情報は専門家の確認待ちです。アカウント不要で、個人のデータは端末内だけに保存されます。",
        target_audience:
          "日本で病院・クリニックを受診するベトナム人と、その受診を支える家族、会社、学校、支援機関の方。",
        features: [
          "診察通訳（マイク・数千の診察会話の例文）",
          "書類・薬袋をカメラで読み取り（端末内）",
          "症状から診療科の目安と危険なサイン",
          "診療科別にGoogleマップで医療機関を検索",
          "119・110・#7119・#8000の伝え方（住所を自動入力）",
          "緊急医療情報・受診記録（医療費控除の集計）・服用中の薬",
          "会話フレーズ、病気ガイド、手続き、医療用語辞典",
          "無料・非営利、アカウント不要、データは端末内のみ",
        ],
        seo_title: "ViCare｜ベトナム人の日本での受診をサポートする無料アプリ",
        seo_description:
          "ViCareは日本で病院にかかるベトナム人のための無料・非営利アプリ。診察時の通訳、書類・薬袋のカメラ読み取り、症状から診療科の案内、119番の伝え方。アカウント不要。",
      },
      {
        locale: "vi",
        name: "ViCare – Đi khám bệnh ở Nhật",
        tagline: "App miễn phí giúp người Việt đi khám bệnh ở Nhật",
        description:
          "ViCare là app miễn phí, phi lợi nhuận của ViMai, giúp người Việt tại Nhật đi khám bệnh: phiên dịch khi khám (micro, ưu tiên nhận dạng giọng nói trên máy), đọc giấy tờ bệnh viện và túi thuốc bằng camera (xử lý ngay trên điện thoại), “Tôi bị ốm” chọn đúng khoa kèm dấu hiệu nguy hiểm, tìm phòng khám theo khoa trên Google Maps, câu nói khi gọi 119, 110, #7119, #8000 và hồ sơ sức khoẻ (thông tin khẩn cấp, nhật ký khám, thuốc đang uống).",
        long_description:
          "Thông tin tham khảo và công cụ hỗ trợ giao tiếp, không phải chẩn đoán. Nội dung y khoa đang chờ chuyên gia duyệt. Không cần tài khoản; dữ liệu cá nhân chỉ lưu trên điện thoại.",
        target_audience:
          "Người Việt sống tại Nhật cần đi khám bệnh, và gia đình, công ty, trường học, nghiệp đoàn hỗ trợ họ.",
        features: [
          "Phiên dịch khi khám (micro, hàng nghìn câu bác sĩ – bệnh nhân)",
          "Đọc giấy tờ và túi thuốc bằng camera, ngay trên máy",
          "Tôi bị ốm: triệu chứng → khoa, dấu hiệu nguy hiểm",
          "Tìm phòng khám theo khoa trên Google Maps",
          "Gọi 119, 110, #7119, #8000: câu nói, tự điền địa chỉ",
          "Thông tin khẩn cấp, nhật ký khám (tổng cho 医療費控除), thuốc đang uống",
          "Câu giao tiếp, cẩm nang bệnh, thủ tục, từ điển y khoa",
          "Miễn phí, phi lợi nhuận, không cần tài khoản",
        ],
        seo_title: "ViCare – App đi khám bệnh ở Nhật cho người Việt (miễn phí)",
        seo_description:
          "ViCare giúp người Việt đi khám bệnh ở Nhật: phiên dịch khi khám, đọc giấy tờ và túi thuốc bằng camera, triệu chứng nên khám khoa nào, gọi 119. Miễn phí, không cần tài khoản.",
      },
      {
        locale: "en",
        name: "ViCare: See a Doctor in Japan",
        tagline: "A free app helping Vietnamese people see a doctor in Japan",
        description:
          "ViCare is a free, non-profit ViMai app that helps Vietnamese people in Japan see a doctor: a doctor-visit interpreter (microphone, on-device speech recognition first), camera reading of hospital papers and medicine bags (processed on the phone), an “I feel sick” symptom-to-department guide with warning signs, clinic search by department on Google Maps, scripts for 119, 110, #7119 and #8000, and health records (emergency info, visit diary, current medicines).",
        long_description:
          "Reference information and a communication aid, not a diagnosis. Medical content is awaiting expert review. No account; personal data stays on your phone.",
        target_audience:
          "Vietnamese people living in Japan who need to see a doctor, and the family, employers, schools and support organisations who help them.",
        features: [
          "Doctor-visit interpreter (microphone, thousands of doctor–patient sentences)",
          "Camera reading of papers and medicine bags, on the phone",
          "I feel sick: symptoms → department, warning signs",
          "Clinic search by department on Google Maps",
          "119, 110, #7119, #8000 scripts with your address filled in",
          "Emergency info, visit diary (totals for 医療費控除), current medicines",
          "Phrasebook, illness guide, procedures, medical dictionary",
          "Free, non-profit, no account",
        ],
        seo_title: "ViCare – See a Doctor in Japan, Free App for Vietnamese",
        seo_description:
          "ViCare helps Vietnamese people see a doctor in Japan: a visit interpreter, camera reading of papers and medicine bags, which department to visit, 119 scripts. Free, no account.",
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
          "本サイトは日本語・ベトナム語・英語に対応しています。各アプリの対応言語は製品によって異なります（CMS更新予定）。",
      },
      vi: {
        question: "Hệ sinh thái hỗ trợ ngôn ngữ nào?",
        answer:
          "Website hỗ trợ tiếng Nhật, tiếng Việt và tiếng Anh. Ngôn ngữ trong từng ứng dụng có thể khác nhau (cần cập nhật CMS).",
      },
      en: {
        question: "Which languages are supported?",
        answer:
          "This website is available in Japanese, Vietnamese, and English. In-app language support varies by product [CMS update].",
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
          "保護者がお子さまの学習時間や利用内容を把握・管理できる仕組みです。詳細な項目は公開時に製品ページで案内します。",
      },
      vi: {
        question: "Kiểm soát phụ huynh trên ViMai Kids là gì?",
        answer:
          "Phụ huynh có thể theo dõi và giới hạn thời gian cũng như nội dung học của trẻ. Chi tiết sẽ được cập nhật khi ứng dụng phát hành.",
      },
      en: {
        question: "What parent controls does ViMai Kids include?",
        answer:
          "Parents can monitor and manage study time and content. Detailed controls will be listed on the product page at launch.",
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
        question: "VIPの料金はいくらですか？",
        answer:
          "Webでは3か月のVIPが700,000ドンで、VietQR（ベトナムの銀行振込）で支払います。ViMaiの紹介者（CTV）のコードを使うと10%・15%・20%の割引になります。",
      },
      vi: {
        question: "VIP giá bao nhiêu?",
        answer:
          "Trên web, VIP 3 tháng giá 700.000đ, thanh toán bằng chuyển khoản VietQR. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20%.",
      },
      en: {
        question: "How much is VIP?",
        answer:
          "On the web, 3 months of VIP costs 700,000 VND, paid by VietQR bank transfer. A ViMai collaborator (CTV) referral code gives 10%, 15% or 20% off.",
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
