import type { Faq, Locale, Product } from "@/types";
import { resolveProductSite } from "@/lib/product-sites";

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
    website_url: "https://tokutei-truck.vimai.jp",
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
];

export function localizeProduct(product: Product, locale: Locale) {
  const translation =
    product.translations.find((item) => item.locale === locale) ??
    product.translations.find((item) => item.locale === "vi") ??
    product.translations[0];

  return {
    ...product,
    website_url: resolveProductSite(product.slug, product.website_url),
    name: translation?.name ?? product.slug,
    tagline: translation?.tagline ?? "",
    description: translation?.description ?? "",
    long_description: translation?.long_description,
    features: translation?.features ?? [],
    target_audience: translation?.target_audience ?? product.target_audience,
  };
}
