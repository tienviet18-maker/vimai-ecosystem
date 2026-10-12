import type { VicareGuide } from "./types.ts";

/**
 * Vietnamese guides for /products/vicare/<slug>. Only general facts that are
 * stable nationwide; no phone numbers except the national emergency numbers,
 * no prices that change. Medical content is reference only.
 */
export const GUIDES_VI: VicareGuide[] = [
  {
    slug: "di-kham-benh-o-nhat",
    title: "Đi khám bệnh ở Nhật: hướng dẫn từng bước cho người Việt",
    seoTitle: "Đi khám bệnh ở Nhật: cần mang gì, quy trình từng bước",
    description:
      "Hướng dẫn đi khám bệnh ở Nhật cho người Việt: chọn phòng khám hay bệnh viện, cần mang gì, quy trình từ lễ tân, phiếu khai bệnh, khám, thanh toán đến nhà thuốc.",
    summary: "Chọn nơi khám, giấy tờ cần mang và quy trình từ lễ tân đến nhà thuốc.",
    lead:
      "Lần đầu đi khám ở Nhật thường khó vì không biết đi đâu, mang gì và nói thế nào. Bài này đi qua từng bước của một lần khám thông thường ở phòng khám (クリニック) để bạn chuẩn bị trước.",
    sections: [
      {
        id: "chon-noi-kham",
        heading: "Phòng khám nhỏ hay bệnh viện lớn?",
        paragraphs: [
          "Ở Nhật, bệnh thông thường như cảm, sốt, đau bụng, mẩn ngứa nên đi phòng khám gần nhà (クリニック, 診療所 hoặc 医院). Phòng khám thường chia theo khoa: nội khoa (内科), nhi (小児科), tai mũi họng (耳鼻咽喉科), da liễu (皮膚科)…",
          "Bệnh viện lớn (大学病院, 総合病院) dành cho bệnh nặng hoặc cần xét nghiệm chuyên sâu. Nếu đến bệnh viện lớn mà không có giấy giới thiệu (紹介状) của phòng khám, bạn có thể phải trả thêm một khoản phí riêng ngoài tiền khám. Vì vậy, nên bắt đầu từ phòng khám; khi cần, bác sĩ sẽ viết giấy giới thiệu.",
          "Nên có một phòng khám quen (かかりつけ医) gần nhà. Bác sĩ quen biết tiền sử của bạn và sẽ giới thiệu đi nơi khác khi cần.",
        ],
      },
      {
        id: "mang-gi",
        heading: "Cần mang gì khi đi khám?",
        bullets: [
          "Giấy tờ bảo hiểm y tế: thẻ My Number đã đăng ký dùng làm thẻ bảo hiểm (マイナ保険証), hoặc 資格確認書 / thẻ bảo hiểm còn hiệu lực. Không mang thì có thể phải trả toàn bộ chi phí trước.",
          "Thẻ cư trú (在留カード).",
          "Sổ tay thuốc (お薬手帳) nếu có, hoặc ảnh chụp các thuốc đang uống.",
          "Tiền mặt: nhiều phòng khám nhỏ chỉ nhận tiền mặt.",
          "Ghi chú triệu chứng: bắt đầu từ khi nào, sốt bao nhiêu độ, đã uống thuốc gì.",
          "Trẻ em: thêm thẻ trợ cấp y tế trẻ em của địa phương (nếu có) và sổ tay mẹ con (母子手帳).",
        ],
      },
      {
        id: "quy-trinh",
        heading: "Quy trình một lần khám",
        steps: [
          {
            title: "Lễ tân (受付)",
            body: "Nói “初診です” (しょしんです – tôi đến khám lần đầu) và đưa giấy tờ bảo hiểm. Nhiều nơi cần đặt hẹn trước (予約制); hãy gọi điện hoặc xem trang web của phòng khám.",
          },
          {
            title: "Phiếu khai bệnh (問診票)",
            body: "Điền triệu chứng, tiền sử bệnh, dị ứng, thuốc đang uống, có thai hay không. Không đọc được thì nhờ lễ tân: “書き方を教えてください” (かきかたをおしえてください).",
          },
          {
            title: "Chờ và đo cơ bản",
            body: "Có thể được đo nhiệt độ, huyết áp. Khi nghe gọi tên thì vào phòng khám.",
          },
          {
            title: "Khám (診察)",
            body: "Bác sĩ hỏi triệu chứng, khám và giải thích. Chỗ nào chưa hiểu, hãy nhờ nói chậm hoặc viết ra giấy. Hỏi rõ: tên bệnh, có cần tái khám không, khi nào phải quay lại ngay.",
          },
          {
            title: "Thanh toán (会計)",
            body: "Trả phần mình chịu (thường 30% với người có bảo hiểm). Nhận hoá đơn (領収書) và giữ lại để khai giảm thuế cuối năm.",
          },
          {
            title: "Nhà thuốc (薬局)",
            body: "Nếu được kê thuốc, bạn nhận đơn thuốc (処方箋) và mang tới nhà thuốc. Đơn thuốc chỉ dùng được trong 4 ngày kể cả ngày cấp. Dược sĩ giải thích cách dùng và đưa túi thuốc (薬袋).",
          },
        ],
      },
      {
        id: "gio-kham",
        heading: "Giờ khám và ngày nghỉ",
        paragraphs: [
          "Nhiều phòng khám nghỉ trưa, nghỉ Chủ nhật, ngày lễ và có buổi chiều nghỉ trong tuần. Hãy xem giờ khám (診療時間) trước khi đi. Ngoài giờ, địa phương thường có phòng khám trực đêm hoặc ngày lễ (休日夜間急患センター); thông tin có trên trang web của thành phố.",
          "Trường hợp nguy cấp như khó thở, đau ngực dữ dội, bất tỉnh: không chờ phòng khám mở, hãy gọi 119.",
        ],
      },
    ],
    faqs: [
      {
        question: "Không có bảo hiểm thì có được khám không?",
        answer:
          "Có, nhưng phải trả toàn bộ chi phí. Người nước ngoài cư trú ở Nhật quá 3 tháng thường phải tham gia bảo hiểm y tế công. Nếu quên mang giấy tờ bảo hiểm, có nơi cho trả trước rồi hoàn lại khi bạn mang đến sau; hãy hỏi lễ tân.",
      },
      {
        question: "Tôi không nói được tiếng Nhật, có nên đưa người đi cùng?",
        answer:
          "Nếu được thì nên, nhất là với bệnh nặng hoặc khi phải ký giấy đồng ý. Khi đi một mình, hãy chuẩn bị ghi chú triệu chứng bằng tiếng Nhật và dùng công cụ hỗ trợ như ViCare.",
      },
      {
        question: "Đơn thuốc để lâu có dùng được không?",
        answer: "Không. Đơn thuốc ngoài viện (処方箋) có hạn 4 ngày kể cả ngày cấp. Quá hạn phải xin bác sĩ cấp lại.",
      },
    ],
    appHelp:
      "Với ViCare, bạn biết nên khám khoa nào từ triệu chứng, tìm phòng khám khoa đó gần nhà trên Google Maps, đưa thông tin khẩn cấp bằng tiếng Nhật cho lễ tân, dùng phiên dịch trong phòng khám và đọc túi thuốc bằng camera.",
    related: ["tim-phong-kham-o-nhat", "phien-dich-kham-benh-tieng-nhat", "bao-hiem-y-te-nhat"],
  },
  {
    slug: "phien-dich-kham-benh-tieng-nhat",
    title: "Phiên dịch khi đi khám bệnh bằng tiếng Nhật: cách nói và câu mẫu",
    seoTitle: "Phiên dịch khi đi khám bệnh tiếng Nhật: câu mẫu, mẹo",
    description:
      "Không giỏi tiếng Nhật khi đi khám bệnh? Các cách có người phiên dịch, câu tiếng Nhật thường dùng để nói triệu chứng, câu bác sĩ hay hỏi và mẹo để hiểu đúng.",
    summary: "Các cách có phiên dịch, câu nói triệu chứng và câu bác sĩ hay hỏi.",
    lead:
      "Hiểu sai lời bác sĩ có thể dẫn đến uống thuốc sai hoặc bỏ lỡ lần tái khám. Bài này tổng hợp các cách có người hỗ trợ ngôn ngữ, những câu tiếng Nhật cần biết và mẹo để trao đổi chính xác.",
    sections: [
      {
        id: "cach-co-phien-dich",
        heading: "Những cách để có hỗ trợ ngôn ngữ",
        bullets: [
          "Hỏi trước bệnh viện có phiên dịch y tế (医療通訳) hoặc dịch vụ phiên dịch qua điện thoại/video không. Một số bệnh viện tiếp nhận bệnh nhân nước ngoài có dịch vụ này.",
          "Đi cùng người thân, bạn bè hoặc người của công ty, nghiệp đoàn giỏi tiếng Nhật, nhất là khi khám bệnh nặng, sinh con, phẫu thuật.",
          "Trung tâm thông tin y tế quốc tế AMDA (AMDA国際医療情報センター) tư vấn qua điện thoại bằng nhiều ngôn ngữ về nơi khám và cách dùng dịch vụ y tế. Ngôn ngữ và giờ làm việc xem trên trang chính thức.",
          "Hiệp hội giao lưu quốc tế của tỉnh, thành phố (国際交流協会) thường có tư vấn đa ngôn ngữ và có thể giới thiệu phiên dịch.",
          "Dùng app hỗ trợ như ViCare cho các câu thường gặp, và luôn xác nhận lại với bác sĩ những gì quan trọng.",
        ],
      },
      {
        id: "cau-noi-trieu-chung",
        heading: "Câu tiếng Nhật để nói triệu chứng",
        table: {
          head: ["Tiếng Nhật", "Cách đọc", "Nghĩa"],
          rows: [
            ["熱があります。", "ねつがあります。", "Tôi bị sốt."],
            ["頭が痛いです。", "あたまがいたいです。", "Tôi bị đau đầu."],
            ["お腹が痛いです。", "おなかがいたいです。", "Tôi bị đau bụng."],
            ["咳が出ます。", "せきがでます。", "Tôi bị ho."],
            ["吐き気がします。", "はきけがします。", "Tôi buồn nôn."],
            ["3日前からです。", "みっかまえからです。", "Bị từ 3 ngày trước."],
            ["薬のアレルギーがあります。", "くすりのアレルギーがあります。", "Tôi bị dị ứng thuốc."],
            ["今、飲んでいる薬があります。", "いま、のんでいるくすりがあります。", "Tôi đang uống thuốc."],
            ["妊娠しています。", "にんしんしています。", "Tôi đang mang thai."],
          ],
        },
      },
      {
        id: "cau-nho-giup",
        heading: "Câu để nhờ bác sĩ giúp bạn hiểu",
        table: {
          head: ["Tiếng Nhật", "Cách đọc", "Nghĩa"],
          rows: [
            ["日本語が少ししかわかりません。", "にほんごがすこししかわかりません。", "Tôi chỉ hiểu một chút tiếng Nhật."],
            ["ゆっくり話してください。", "ゆっくりはなしてください。", "Xin hãy nói chậm."],
            ["紙に書いてください。", "かみにかいてください。", "Xin hãy viết ra giấy."],
            ["もう一度お願いします。", "もういちどおねがいします。", "Xin nói lại một lần nữa."],
            ["やさしい日本語でお願いします。", "やさしいにほんごでおねがいします。", "Xin nói bằng tiếng Nhật dễ hiểu."],
          ],
        },
      },
      {
        id: "cau-bac-si-hoi",
        heading: "Câu bác sĩ hay hỏi",
        table: {
          head: ["Tiếng Nhật", "Cách đọc", "Nghĩa"],
          rows: [
            ["どうしましたか。", "どうしましたか。", "Bạn bị làm sao?"],
            ["いつからですか。", "いつからですか。", "Bị từ khi nào?"],
            ["どこが痛いですか。", "どこがいたいですか。", "Đau ở đâu?"],
            ["熱は何度ですか。", "ねつはなんどですか。", "Sốt bao nhiêu độ?"],
            ["アレルギーはありますか。", "アレルギーはありますか。", "Bạn có bị dị ứng không?"],
            ["様子を見てください。", "ようすをみてください。", "Hãy theo dõi thêm."],
          ],
        },
      },
      {
        id: "meo",
        heading: "Mẹo để trao đổi chính xác",
        bullets: [
          "Viết sẵn triệu chứng, thời điểm bắt đầu, nhiệt độ, thuốc đã uống ra giấy hoặc điện thoại trước khi đi.",
          "Con số luôn hỏi lại: số viên, số lần mỗi ngày, số ngày uống, ngày tái khám.",
          "Trước khi về, hỏi: tên bệnh là gì, khi nào cần quay lại ngay, có cần nghỉ làm/nghỉ học không.",
          "Đừng gật đầu khi chưa hiểu. Nói “わかりません” (tôi không hiểu) là bình thường.",
        ],
        note: "Với phẫu thuật, sinh con hoặc giấy đồng ý quan trọng, hãy có phiên dịch viên y tế hoặc người giỏi tiếng Nhật đi cùng.",
      },
    ],
    faqs: [
      {
        question: "Có thể dùng Google Dịch khi khám bệnh không?",
        answer:
          "Có thể dùng cho câu đơn giản, nhưng dịch máy có thể sai với thuật ngữ y khoa và con số. Hãy xác nhận lại điều quan trọng với bác sĩ, ví dụ nhờ viết ra giấy.",
      },
      {
        question: "Phiên dịch y tế có mất phí không?",
        answer: "Tuỳ bệnh viện và dịch vụ: có nơi miễn phí, có nơi tính phí. Hãy hỏi khi đặt hẹn.",
      },
      {
        question: "ViCare có dịch tự do mọi câu không?",
        answer:
          "Không. ViCare so lời bác sĩ với kho hàng nghìn câu thường gặp khi khám. Câu không có trong kho sẽ được báo rõ để bạn nhờ bác sĩ nói lại hoặc viết ra giấy.",
      },
    ],
    appHelp:
      "Phiên dịch của ViCare nghe bác sĩ qua micro và hiện nghĩa tiếng Việt từ kho hàng nghìn câu khám bệnh, nhắc bạn kiểm tra con số và có sẵn các nút “Nhờ nói chậm”, “Nhờ viết ra giấy”. Bác sĩ thấy lời xin phép bằng tiếng Nhật trước khi bắt đầu; app không ghi âm.",
    related: ["di-kham-benh-o-nhat", "doc-tui-thuoc-nhat", "goi-119-o-nhat"],
  },
  {
    slug: "goi-119-o-nhat",
    title: "Cách gọi 119 ở Nhật: gọi xe cấp cứu và các số khẩn cấp",
    seoTitle: "Cách gọi 119 ở Nhật: câu nói, #7119, #8000, 110",
    description:
      "Cách gọi xe cấp cứu 119 ở Nhật cho người Việt: nói gì bằng tiếng Nhật, khi nào gọi 119, khi nào gọi #7119, #8000 hoặc 110, và cần chuẩn bị gì khi xe đến.",
    summary: "Nói gì khi gọi 119, khi nào dùng #7119, #8000 và 110.",
    lead:
      "Khi nguy cấp, vài câu tiếng Nhật đơn giản và địa chỉ viết sẵn có thể giúp xe cấp cứu đến nhanh hơn. Bài này tổng hợp các số khẩn cấp toàn quốc và cách nói khi gọi.",
    sections: [
      {
        id: "cac-so",
        heading: "Các số khẩn cấp cần nhớ",
        table: {
          head: ["Số", "Dùng khi", "Ghi chú"],
          rows: [
            ["119", "Cấp cứu (xe cứu thương) và cháy", "Gọi miễn phí, 24 giờ, từ điện thoại di động hoặc cố định."],
            ["110", "Cảnh sát: tai nạn giao thông, trộm cắp, bị đe doạ", "Gọi miễn phí, 24 giờ."],
            ["#7119", "Không chắc có cần xe cấp cứu hay nên đi viện ngay không", "Tư vấn cấp cứu; không phải tỉnh nào cũng có. Nếu không gọi được và tình trạng nguy cấp, gọi 119."],
            ["#8000", "Trẻ em ốm vào buổi tối, ngày nghỉ", "Tư vấn y tế trẻ em qua điện thoại của tỉnh; giờ làm việc tuỳ nơi."],
          ],
        },
      },
      {
        id: "khi-nao-goi-119",
        heading: "Khi nào nên gọi 119 ngay?",
        bullets: [
          "Bất tỉnh, gọi không tỉnh, co giật không dừng.",
          "Khó thở, đau ngực hoặc lưng dữ dội đột ngột.",
          "Méo miệng, yếu hoặc tê nửa người, nói khó đột ngột.",
          "Đau đầu dữ dội đột ngột như chưa từng bị.",
          "Chảy máu nhiều không cầm được, bỏng rộng, tai nạn nặng.",
          "Phản ứng dị ứng nặng: sưng mặt, khó thở sau khi ăn hoặc uống thuốc.",
        ],
        note: "Nếu thấy nguy hiểm, đừng ngại: gọi 119. Bản thân xe cấp cứu không thu tiền; chi phí khám ở bệnh viện vẫn tính như bình thường.",
      },
      {
        id: "noi-gi",
        heading: "Nói gì khi gọi 119",
        steps: [
          {
            title: "Tổng đài hỏi: 「火事ですか、救急ですか」",
            body: "(かじですか、きゅうきゅうですか – Cháy hay cấp cứu?) Trả lời: 「救急です」(きゅうきゅうです – Cấp cứu).",
          },
          {
            title: "Địa chỉ: 「住所は〇〇です」",
            body: "(じゅうしょは〇〇です). Đọc địa chỉ tiếng Nhật đã viết sẵn. Nếu ở ngoài đường, nói tên toà nhà, cửa hàng hoặc giao lộ gần nhất.",
          },
          {
            title: "Chuyện gì xảy ra",
            body: "Ví dụ: 「30歳の男性が倒れて、意識がありません」(さんじゅっさいのだんせいがたおれて、いしきがありません – Một người đàn ông 30 tuổi ngã xuống, không còn ý thức).",
          },
          {
            title: "Tên và số điện thoại của bạn",
            body: "Giữ máy để tổng đài gọi lại khi cần. Nếu không nói được tiếng Nhật, nói 「ベトナム語」(ベトナムご – tiếng Việt): nhiều sở cứu hoả có dịch vụ phiên dịch ba bên qua điện thoại.",
          },
        ],
      },
      {
        id: "tu-khoa",
        heading: "Từ khoá tiếng Nhật khi gọi cấp cứu",
        paragraphs: [
          "Nếu không nói được câu dài, hãy nói từng từ khoá thật rõ, rồi đọc địa chỉ. Đừng cúp máy trước khi tổng đài bảo.",
        ],
        table: {
          head: ["Tiếng Nhật", "Cách đọc", "Nghĩa"],
          rows: [
            ["救急車をお願いします", "きゅうきゅうしゃをおねがいします", "Xin gửi xe cấp cứu"],
            ["意識がありません", "いしきがありません", "Không còn ý thức"],
            ["息ができません", "いきができません", "Không thở được"],
            ["胸が痛いです", "むねがいたいです", "Đau ngực"],
            ["血が止まりません", "ちがとまりません", "Máu chảy không cầm được"],
            ["子どもがけいれんしています", "こどもがけいれんしています", "Trẻ đang co giật"],
            ["日本語がわかりません", "にほんごがわかりません", "Tôi không hiểu tiếng Nhật"],
          ],
        },
      },
      {
        id: "chuan-bi",
        heading: "Chuẩn bị khi chờ xe cấp cứu",
        bullets: [
          "Giấy tờ bảo hiểm, thẻ cư trú, sổ tay thuốc (お薬手帳) hoặc thuốc đang uống, tiền, giày dép.",
          "Mở khoá cửa, bật đèn; nếu có người khác, nhờ ra đón xe ở đường.",
          "Ghi lại thời điểm xảy ra và những gì đã làm (đã uống thuốc gì, đã sơ cứu gì).",
          "Viết sẵn địa chỉ nhà bằng tiếng Nhật và dán ở chỗ dễ thấy, ví dụ cạnh tủ lạnh.",
        ],
      },
    ],
    faqs: [
      {
        question: "Gọi 119 có mất tiền không?",
        answer: "Cuộc gọi và xe cấp cứu công không thu tiền. Chi phí khám, xét nghiệm, điều trị ở bệnh viện vẫn tính theo bảo hiểm như bình thường.",
      },
      {
        question: "#7119 có dùng được ở mọi nơi không?",
        answer:
          "Không. #7119 chỉ có ở những tỉnh, thành phố đã triển khai. Nơi chưa có thì có thể có số tư vấn khác; khi nguy cấp thì gọi thẳng 119.",
      },
      {
        question: "Gọi #8000 lúc nào?",
        answer:
          "Khi con bạn ốm vào buổi tối hoặc ngày nghỉ và bạn không biết nên đưa đi khám ngay hay chờ đến sáng. Giờ tiếp nhận do từng tỉnh quy định. Nếu trẻ khó thở, co giật hoặc lả đi, gọi 119.",
      },
    ],
    appHelp:
      "Màn Khẩn cấp của ViCare có câu nói khi gọi 119 bằng tiếng Nhật, tự điền địa chỉ bạn đã lưu, cùng các số 110, #7119, #8000. Thông tin khẩn cấp (dị ứng, bệnh nền, người liên hệ) hiện bằng tiếng Nhật để đưa cho nhân viên cấp cứu xem.",
    related: ["di-kham-benh-o-nhat", "tim-phong-kham-o-nhat", "phien-dich-kham-benh-tieng-nhat"],
  },
  {
    slug: "doc-tui-thuoc-nhat",
    title: "Cách đọc túi thuốc Nhật (薬袋): 食前, 食後, 食間, 頓服 là gì?",
    seoTitle: "Đọc túi thuốc Nhật: 食前, 食後, 食間, 頓服 nghĩa là gì",
    description:
      "Giải thích từ hay gặp trên túi thuốc Nhật (薬袋): 食前, 食後, 食間, 頓服, 1日3回, 1回1錠, 日分… kèm cách đọc, nghĩa tiếng Việt và mẹo uống thuốc đúng.",
    summary: "Nghĩa các từ trên túi thuốc và mẹo uống thuốc đúng cách.",
    lead:
      "Túi thuốc ở Nhật ghi cách dùng bằng tiếng Nhật, nhiều chữ Hán. Hiểu sai một từ như 食間 có thể khiến bạn uống thuốc sai thời điểm. Dưới đây là các từ hay gặp nhất.",
    sections: [
      {
        id: "thoi-diem",
        heading: "Thời điểm uống thuốc",
        table: {
          head: ["Chữ trên túi", "Cách đọc", "Nghĩa"],
          rows: [
            ["食前", "しょくぜん", "Trước bữa ăn, thường khoảng 30 phút"],
            ["食後", "しょくご", "Sau bữa ăn, thường trong khoảng 30 phút"],
            ["食間", "しょっかん", "Giữa hai bữa ăn (khoảng 2 tiếng sau khi ăn), không phải trong lúc ăn"],
            ["食直前 / 食直後", "しょくちょくぜん / しょくちょくご", "Ngay trước / ngay sau khi ăn"],
            ["起床時", "きしょうじ", "Lúc vừa thức dậy"],
            ["就寝前", "しゅうしんまえ", "Trước khi đi ngủ"],
            ["頓服", "とんぷく", "Chỉ uống khi cần (khi đau, khi sốt…), không uống theo giờ cố định"],
            ["〇時間ごと", "〇じかんごと", "Cứ mỗi 〇 tiếng"],
          ],
        },
      },
      {
        id: "lieu-luong",
        heading: "Số lần, số lượng, số ngày",
        table: {
          head: ["Chữ trên túi", "Cách đọc", "Nghĩa"],
          rows: [
            ["1日3回", "いちにちさんかい", "Ngày 3 lần"],
            ["毎食後", "まいしょくご", "Sau mỗi bữa ăn (sáng, trưa, tối)"],
            ["朝・昼・夕", "あさ・ひる・ゆう", "Sáng · trưa · tối"],
            ["1回1錠", "いっかいいちじょう", "Mỗi lần 1 viên"],
            ["錠 / カプセル / 包", "じょう / カプセル / ほう", "Viên nén / viên nang / gói (thuốc bột)"],
            ["〇日分", "〇にちぶん", "Đủ dùng trong 〇 ngày"],
            ["飲み切ってください", "のみきってください", "Hãy uống hết đợt thuốc, kể cả khi đã đỡ"],
          ],
        },
      },
      {
        id: "loai-thuoc",
        heading: "Loại thuốc",
        table: {
          head: ["Chữ trên túi", "Cách đọc", "Nghĩa"],
          rows: [
            ["内服薬", "ないふくやく", "Thuốc uống"],
            ["外用薬", "がいようやく", "Thuốc dùng ngoài (bôi, dán, nhỏ)"],
            ["塗り薬", "ぬりぐすり", "Thuốc bôi"],
            ["貼り薬 / 湿布", "はりぐすり / しっぷ", "Miếng dán"],
            ["点眼薬 / 目薬", "てんがんやく / めぐすり", "Thuốc nhỏ mắt"],
            ["坐薬", "ざやく", "Thuốc đặt (hậu môn)"],
          ],
        },
      },
      {
        id: "meo",
        heading: "Mẹo dùng thuốc an toàn",
        bullets: [
          "Đọc thêm tờ thông tin thuốc (薬剤情報提供書) nhà thuốc đưa kèm: thường có ảnh viên thuốc và tác dụng chính.",
          "Mang sổ tay thuốc (お薬手帳) mỗi lần khám và mua thuốc để bác sĩ, dược sĩ biết bạn đang dùng gì.",
          "Không tự ý chia thuốc cho người khác, không tự ngừng thuốc kháng sinh khi chưa hết đợt.",
          "Quên một lần: không uống gấp đôi. Hỏi dược sĩ nên làm gì.",
          "Đang mang thai, cho con bú, hoặc đang uống thuốc khác (kể cả thuốc mang từ Việt Nam): hãy nói với bác sĩ và dược sĩ.",
        ],
        note: "Chỗ nào không chắc, hãy hỏi dược sĩ: “飲み方をもう一度教えてください” (のみかたをもういちどおしえてください – Xin hướng dẫn lại cách uống).",
      },
    ],
    faqs: [
      {
        question: "食間 có phải là uống trong bữa ăn không?",
        answer: "Không. 食間 là giữa hai bữa ăn, thường khoảng 2 tiếng sau khi ăn, lúc bụng tương đối rỗng.",
      },
      {
        question: "Túi ghi 1日3回 nhưng không ghi trước hay sau ăn thì sao?",
        answer: "Đừng tự đoán. Hãy hỏi dược sĩ nên uống vào những giờ nào.",
      },
      {
        question: "Thuốc 頓服 uống mấy lần một ngày?",
        answer:
          "Chỉ uống khi có triệu chứng ghi trên túi (ví dụ khi sốt trên 38,5 độ). Túi thường ghi khoảng cách tối thiểu giữa hai lần và số lần tối đa trong ngày; nếu không thấy, hãy hỏi dược sĩ.",
      },
    ],
    appHelp:
      "Chụp túi thuốc bằng camera, ViCare đọc chữ tiếng Nhật ngay trên điện thoại và đổi ra lịch uống sáng – trưa – tối – trước ngủ bằng tiếng Việt. Phần chưa chắc được giữ nguyên chữ gốc và nhắc bạn hỏi dược sĩ. App không tra tên thuốc hay công dụng.",
    related: ["phien-dich-kham-benh-tieng-nhat", "di-kham-benh-o-nhat", "khai-giam-thue-chi-phi-y-te"],
  },
  {
    slug: "bao-hiem-y-te-nhat",
    title: "Bảo hiểm y tế Nhật: tự trả 3 割, 高額療養費 và 労災",
    seoTitle: "Bảo hiểm y tế Nhật: 3 割, 高額療養費, 労災 cho người Việt",
    description:
      "Bảo hiểm y tế ở Nhật cho người Việt: 国民健康保険 và 社会保険, mức tự trả 3 割 theo độ tuổi, trần chi phí 高額療養費, 労災 khi bị thương lúc làm việc và 傷病手当金.",
    summary: "Ai phải tham gia, mức tự trả 3 割, trần chi phí và tai nạn lao động.",
    lead:
      "Nhờ bảo hiểm y tế công, ở Nhật bạn thường chỉ trả một phần chi phí khám chữa bệnh. Bài này giải thích các loại bảo hiểm, mức tự trả, chế độ trần chi phí theo tháng và trường hợp bị thương khi làm việc.",
    sections: [
      {
        id: "loai-bao-hiem",
        heading: "Hai loại bảo hiểm chính",
        bullets: [
          "Bảo hiểm của công ty (健康保険, thường gọi 社会保険): người làm việc toàn thời gian, công ty đóng một nửa phí. Đăng ký qua công ty.",
          "Bảo hiểm quốc dân (国民健康保険): du học sinh, người tự kinh doanh, người không thuộc bảo hiểm công ty. Đăng ký ở toà thị chính nơi bạn sống.",
          "Người nước ngoài có thẻ cư trú và ở Nhật quá 3 tháng thường phải tham gia một trong hai loại.",
        ],
      },
      {
        id: "muc-tu-tra",
        heading: "Mức tự trả (自己負担) theo độ tuổi",
        table: {
          head: ["Độ tuổi", "Mức tự trả", "Ghi chú"],
          rows: [
            ["Trước khi vào tiểu học", "2 割 (20%)", "Nhiều địa phương còn hỗ trợ thêm, có nơi trẻ em khám miễn phí."],
            ["Từ khi vào tiểu học đến 69 tuổi", "3 割 (30%)", "Mức thông thường của người đi làm, du học sinh."],
            ["70–74 tuổi", "2 割 (20%)", "Người có thu nhập ngang người đi làm: 3 割."],
            ["Từ 75 tuổi", "1 割 (10%)", "Tuỳ thu nhập có thể là 2 割 hoặc 3 割."],
          ],
        },
        paragraphs: [
          "Ví dụ: tổng chi phí khám là 5.000 yên thì người tự trả 3 割 trả 1.500 yên tại quầy. Phần còn lại do bảo hiểm chi trả.",
          "Không được bảo hiểm chi trả: khám sức khoẻ tổng quát, phần lớn tiêm chủng tự nguyện, thẩm mỹ, một số dịch vụ theo yêu cầu như phòng riêng.",
        ],
      },
      {
        id: "kogaku",
        heading: "Trần chi phí theo tháng: 高額療養費",
        paragraphs: [
          "Nếu tiền tự trả trong một tháng (từ ngày 1 đến cuối tháng) vượt mức trần, phần vượt được bảo hiểm hoàn lại. Mức trần khác nhau theo tuổi và thu nhập.",
          "Khi dùng マイナ保険証 hoặc giấy chứng nhận mức trần (限度額適用認定証), bạn chỉ phải trả tới mức trần ngay tại quầy, không cần ứng trước số lớn. Nếu đã trả nhiều hơn, hãy làm thủ tục hoàn lại với nơi quản lý bảo hiểm của bạn (công ty bảo hiểm của công ty hoặc toà thị chính).",
        ],
        note: "Sắp nhập viện hay phẫu thuật? Hãy hỏi trước về 高額療養費 để không phải ứng trước số tiền lớn.",
      },
      {
        id: "rosai",
        heading: "Bị thương khi làm việc: 労災",
        paragraphs: [
          "Bị thương hoặc mắc bệnh do công việc, hoặc gặp tai nạn trên đường đi làm và về, được chi trả bởi bảo hiểm tai nạn lao động (労災保険), không dùng bảo hiểm y tế thông thường. Người làm thêm, người nước ngoài cũng được áp dụng.",
          "Hãy báo ngay cho công ty và nói với bệnh viện rằng đây là 労災. Ở bệnh viện được chỉ định cho 労災, người lao động thường không phải trả tiền khám.",
        ],
      },
      {
        id: "shobyo",
        heading: "Nghỉ làm vì ốm: 傷病手当金",
        paragraphs: [
          "Người tham gia bảo hiểm của công ty (健康保険) phải nghỉ làm vì ốm hoặc bị thương ngoài công việc có thể nhận trợ cấp: từ ngày nghỉ thứ 4 (sau 3 ngày nghỉ liên tiếp), khoảng 2/3 mức lương ngày tiêu chuẩn, tổng thời gian tối đa 1 năm 6 tháng. Bảo hiểm quốc dân thường không có khoản này.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tôi là du học sinh, tự trả bao nhiêu?",
        answer: "Du học sinh tham gia 国民健康保険 và thường tự trả 3 割 (30%) chi phí khám chữa bệnh được bảo hiểm.",
      },
      {
        question: "Bị thương ở chỗ làm có nên dùng thẻ bảo hiểm y tế không?",
        answer:
          "Không. Tai nạn lao động dùng 労災保険. Nếu lỡ dùng thẻ bảo hiểm y tế, hãy báo bệnh viện và công ty sớm để chuyển sang 労災.",
      },
      {
        question: "高額療養費 tính theo năm hay theo tháng?",
        answer: "Theo tháng dương lịch, từ ngày 1 đến cuối tháng. Tiền khám cuối năm còn có thể khai giảm thuế qua 医療費控除.",
      },
    ],
    appHelp:
      "Phần Thủ tục & bảo hiểm của ViCare có hơn 40 bài: bảo hiểm, tiền khám và hoàn phí, gia đình, công việc, khẩn cấp, mỗi bài có các bước, giấy tờ cần mang và nguồn chính thức. Nhật ký khám ghi lại chi phí để bạn theo dõi theo tháng và theo năm.",
    related: ["khai-giam-thue-chi-phi-y-te", "di-kham-benh-o-nhat", "tim-phong-kham-o-nhat"],
  },
  {
    slug: "tim-phong-kham-o-nhat",
    title: "Tìm phòng khám ở Nhật: khám khoa nào, nơi nói tiếng Việt, tiếng Anh",
    seoTitle: "Tìm phòng khám ở Nhật nói tiếng Việt, tiếng Anh; khám khoa nào",
    description:
      "Triệu chứng nào khám khoa nào ở Nhật, cách tìm phòng khám gần nhà trên Google Maps, cách tìm nơi hỗ trợ tiếng Việt hoặc tiếng Anh và câu nói khi gọi điện đặt hẹn.",
    summary: "Bảng triệu chứng – khoa, cách tìm nơi khám và nơi hỗ trợ ngoại ngữ.",
    lead:
      "Ở Nhật, người bệnh thường tự chọn khoa và tự đến phòng khám. Chọn đúng khoa từ đầu giúp bạn đỡ mất thời gian. Bài này giúp bạn chọn khoa và tìm nơi khám phù hợp.",
    sections: [
      {
        id: "khoa-nao",
        heading: "Triệu chứng nào, khám khoa nào?",
        table: {
          head: ["Triệu chứng", "Khoa", "Cách đọc"],
          rows: [
            ["Sốt, ho, cảm, đau bụng, tiêu chảy (người lớn)", "内科", "ないか"],
            ["Trẻ em ốm", "小児科", "しょうにか"],
            ["Đau tai, nghẹt mũi, viêm xoang, đau họng, chóng mặt", "耳鼻咽喉科 (耳鼻科)", "じびいんこうか (じびか)"],
            ["Đỏ mắt, ngứa mắt, nhìn mờ", "眼科", "がんか"],
            ["Mẩn ngứa, mề đay, mụn, bỏng nhẹ", "皮膚科", "ひふか"],
            ["Đau lưng, đau khớp, bong gân, nghi gãy xương", "整形外科", "せいけいげか"],
            ["Kinh nguyệt, khám phụ khoa, mang thai", "産婦人科 / 婦人科", "さんふじんか / ふじんか"],
            ["Đau răng, chảy máu chân răng", "歯科", "しか"],
            ["Tiểu buốt, tiểu ra máu", "泌尿器科", "ひにょうきか"],
            ["Mất ngủ, lo âu, buồn chán kéo dài", "心療内科 / 精神科", "しんりょうないか / せいしんか"],
            ["Vết thương cần khâu", "外科", "げか"],
          ],
        },
        note: "Bảng chỉ để tham khảo. Không chắc thì đến nội khoa (内科), hoặc gọi điện hỏi phòng khám. Dấu hiệu nguy hiểm: gọi 119.",
      },
      {
        id: "tim-gan-nha",
        heading: "Tìm phòng khám gần nhà",
        bullets: [
          "Google Maps: gõ tên khoa bằng tiếng Nhật kèm 近く, ví dụ 「内科 近く」, 「小児科 近く」. Xem giờ khám, ngày nghỉ và đánh giá.",
          "医療情報ネット (ナビイ) của Bộ Y tế Nhật: tìm cơ sở y tế trên toàn quốc theo khu vực, khoa, giờ khám và ngôn ngữ hỗ trợ.",
          "Trang web của thành phố: danh sách phòng khám trực đêm, ngày lễ (休日夜間急患センター).",
          "Hỏi đồng nghiệp, công ty, trường học hoặc nghiệp đoàn về nơi họ hay khám.",
        ],
      },
      {
        id: "ngoai-ngu",
        heading: "Tìm nơi hỗ trợ tiếng Việt hoặc tiếng Anh",
        paragraphs: [
          "Phòng khám có nhân viên nói tiếng Việt không nhiều; nơi hỗ trợ tiếng Anh dễ tìm hơn, nhất là ở thành phố lớn. Các nguồn sau giúp bạn tìm:",
        ],
        bullets: [
          "医療情報ネット (ナビイ): có mục tìm theo ngoại ngữ cơ sở y tế đã khai báo.",
          "Danh sách cơ sở y tế tiếp nhận bệnh nhân nước ngoài của Tổng cục Du lịch Nhật Bản (JNTO).",
          "Trung tâm thông tin y tế quốc tế AMDA: tư vấn qua điện thoại bằng nhiều ngôn ngữ về nơi khám.",
          "Hiệp hội giao lưu quốc tế của tỉnh, thành phố (国際交流協会).",
        ],
        note: "Thông tin ngôn ngữ do cơ sở y tế tự khai báo và có thể thay đổi; hãy gọi điện xác nhận trước khi đi.",
      },
      {
        id: "goi-dat-hen",
        heading: "Câu nói khi gọi điện đặt hẹn",
        table: {
          head: ["Tiếng Nhật", "Cách đọc", "Nghĩa"],
          rows: [
            ["診察の予約をしたいです。", "しんさつのよやくをしたいです。", "Tôi muốn đặt lịch khám."],
            ["初めてです。", "はじめてです。", "Tôi khám lần đầu."],
            ["今日、診てもらえますか。", "きょう、みてもらえますか。", "Hôm nay có khám cho tôi được không?"],
            ["予約なしで行ってもいいですか。", "よやくなしでいってもいいですか。", "Tôi đến không hẹn trước có được không?"],
            ["ベトナム語か英語は大丈夫ですか。", "ベトナムごかえいごはだいじょうぶですか。", "Có dùng được tiếng Việt hoặc tiếng Anh không?"],
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Có danh sách phòng khám nói tiếng Việt không?",
        answer:
          "Chưa có danh sách chính thức đầy đủ. Hãy dùng mục tìm theo ngoại ngữ của 医療情報ネット, hỏi AMDA hoặc hiệp hội giao lưu quốc tế, và gọi điện xác nhận trước.",
      },
      {
        question: "Không có hẹn có được khám không?",
        answer: "Nhiều phòng khám nhận khám không cần hẹn, nhưng có nơi chỉ khám theo hẹn (予約制). Hãy xem trang web hoặc gọi điện trước.",
      },
      {
        question: "Ban đêm con tôi sốt thì đi đâu?",
        answer:
          "Gọi #8000 để được tư vấn, hoặc đến phòng khám trực đêm của địa phương. Nếu trẻ khó thở, co giật hoặc lả đi, gọi 119.",
      },
    ],
    appHelp:
      "Trong ViCare, “Tôi bị ốm” gợi ý khoa từ triệu chứng. “Phòng khám gần đây” cho chọn 14 khoa, mở Google Maps tìm khoa đó gần vị trí của bạn, kèm tên khoa tiếng Nhật trên biển hiệu và câu nói khi gọi điện.",
    related: ["di-kham-benh-o-nhat", "goi-119-o-nhat", "phien-dich-kham-benh-tieng-nhat"],
  },
  {
    slug: "khai-giam-thue-chi-phi-y-te",
    title: "医療費控除: khai giảm thuế chi phí y tế ở Nhật cho người Việt",
    seoTitle: "医療費控除 là gì? Khai giảm thuế tiền khám bệnh ở Nhật",
    description:
      "医療費控除 cho người Việt ở Nhật: khi nào được khai, cách tính, khoản nào được tính, giấy tờ cần chuẩn bị và cách nộp qua 確定申告 để được hoàn thuế.",
    summary: "Điều kiện, cách tính, khoản được tính và cách nộp 確定申告.",
    lead:
      "Nếu bạn và gia đình chi nhiều tiền khám chữa bệnh trong một năm, bạn có thể được giảm thuế thu nhập qua 医療費控除. Người đi làm có 年末調整 vẫn phải tự khai khoản này.",
    sections: [
      {
        id: "dieu-kien",
        heading: "Khi nào được khai?",
        paragraphs: [
          "Tính theo năm dương lịch (1/1 – 31/12). Nếu tổng tiền khám chữa bệnh bạn đã trả cho bản thân và người thân sống chung kinh tế (生計を一にする) vượt 10 vạn yên, bạn có thể khai. Nếu tổng thu nhập dưới 200 vạn yên, mốc này là 5% tổng thu nhập.",
        ],
      },
      {
        id: "cach-tinh",
        heading: "Cách tính",
        paragraphs: [
          "Số được khấu trừ = (tổng tiền đã trả − tiền được bù từ bảo hiểm, 高額療養費…) − 10 vạn yên (hoặc 5% thu nhập). Tối đa 200 vạn yên.",
          "Ví dụ: cả nhà trả 25 vạn yên trong năm, không được bù khoản nào: 25 − 10 = 15 vạn yên được trừ vào thu nhập chịu thuế. Số thuế được hoàn phụ thuộc vào thuế suất của bạn; thuế cư trú năm sau cũng giảm theo.",
        ],
      },
      {
        id: "khoan-tinh",
        heading: "Khoản nào được tính, khoản nào không?",
        table: {
          head: ["Được tính", "Không được tính"],
          rows: [
            ["Tiền khám, điều trị, nhập viện", "Khám sức khoẻ tổng quát (trừ khi phát hiện bệnh và điều trị tiếp)"],
            ["Thuốc kê đơn ở nhà thuốc", "Thực phẩm chức năng, vitamin để phòng bệnh"],
            ["Thuốc mua ngoài dùng để chữa bệnh", "Phẫu thuật thẩm mỹ"],
            ["Tiền tàu, xe buýt đi khám", "Xăng, phí đỗ xe khi tự lái"],
            ["Taxi khi không thể đi phương tiện công cộng", "Taxi khi có thể đi tàu, xe buýt"],
            ["Nha khoa điều trị thông thường", "Chỉnh răng chỉ vì thẩm mỹ"],
          ],
        },
      },
      {
        id: "cach-nop",
        heading: "Chuẩn bị và cách nộp",
        steps: [
          {
            title: "Giữ hoá đơn cả năm",
            body: "Giữ mọi hoá đơn (領収書) của phòng khám và nhà thuốc, ghi lại tiền tàu xe đi khám.",
          },
          {
            title: "Lập bảng kê (医療費控除の明細書)",
            body: "Ghi theo từng người được khám và từng nơi khám. Không cần nộp kèm hoá đơn, nhưng phải giữ hoá đơn 5 năm vì cơ quan thuế có thể yêu cầu xem.",
          },
          {
            title: "Nộp 確定申告",
            body: "Thời gian thông thường khoảng giữa tháng 2 đến giữa tháng 3 năm sau. Nếu chỉ để xin hoàn thuế, có thể nộp từ tháng 1 và trong vòng 5 năm. Nộp qua e-Tax, gửi bưu điện hoặc trực tiếp ở sở thuế (税務署).",
          },
        ],
        note: "Có chế độ thay thế cho thuốc mua ngoài (セルフメディケーション税制). Hai chế độ không dùng cùng lúc; hãy chọn cái có lợi hơn.",
      },
    ],
    faqs: [
      {
        question: "Tôi đi làm, công ty đã làm 年末調整 rồi, có cần tự khai không?",
        answer: "Có. 年末調整 không bao gồm 医療費控除, bạn phải tự nộp 確定申告 để được trừ.",
      },
      {
        question: "Tiền khám của vợ, con có gộp được không?",
        answer: "Được, nếu sống chung kinh tế (生計を一にする) với bạn. Thường người có thu nhập cao hơn khai sẽ có lợi hơn.",
      },
      {
        question: "Quên khai năm trước thì sao?",
        answer: "Có thể nộp khai xin hoàn thuế (還付申告) trong vòng 5 năm kể từ ngày 1/1 của năm sau năm phát sinh chi phí.",
      },
    ],
    appHelp:
      "Nhật ký khám của ViCare ghi tiền trả ở phòng khám và nhà thuốc cho mỗi lần khám (chụp hoá đơn là app mở sẵn mẫu có ngày và số tiền), tự cộng tổng theo năm, và cho sao chép ra văn bản hoặc CSV để lập bảng kê 医療費控除.",
    related: ["bao-hiem-y-te-nhat", "di-kham-benh-o-nhat", "doc-tui-thuoc-nhat"],
  },
];
