import type { VicareLocale, VicarePageCopy } from "./types.ts";

/**
 * Copy for the ViCare product page (/products/vicare) in three languages.
 *
 * Facts follow the app (vimai-health/apps/vicare) and the App Store review
 * notes. Content counts keep growing, so they are rounded down ("more than").
 * Never claim that a doctor reviewed the content: it is a draft awaiting
 * expert review. No store links until the apps are live.
 */
export const VICARE_PAGE_COPY: Record<VicareLocale, VicarePageCopy> = {
  vi: {
    seoTitle: "ViCare – App đi khám bệnh ở Nhật cho người Việt (miễn phí)",
    description:
      "ViCare giúp người Việt đi khám bệnh ở Nhật: phiên dịch khi khám, đọc giấy tờ và túi thuốc bằng camera, triệu chứng nên khám khoa nào, gọi 119. Miễn phí, không cần tài khoản.",
    name: "ViCare",
    tagline: "Người bạn đồng hành khi đi khám bệnh ở Nhật",
    lead:
      "ViCare là app miễn phí, phi lợi nhuận của ViMai, giúp người Việt tại Nhật đi khám bệnh tự tin hơn: hiểu bác sĩ nói gì, đọc được giấy tờ bệnh viện và túi thuốc, biết nên khám khoa nào, và biết gọi cấp cứu thế nào. Không quảng cáo, không cần tài khoản; dữ liệu cá nhân chỉ nằm trên điện thoại của bạn.",
    badges: ["Miễn phí", "Phi lợi nhuận", "Không cần tài khoản", "Dữ liệu chỉ trên điện thoại", "Tiếng Việt · 日本語 · English"],
    webCta: "Dùng thử bản web ngay",
    webNote: "Mở trên trình duyệt, không cần cài đặt. Phiên dịch bằng micro và đọc giấy tờ bằng camera chỉ có trong app điện thoại.",
    storeTitle: "Tải ViCare",
    appStoreSoon: "Sắp có trên App Store",
    googlePlaySoon: "Sắp có trên Google Play",
    storeNote:
      "ViCare đang chuẩn bị phát hành trên App Store và Google Play. Nút tải sẽ được mở trên trang này ngay khi app được duyệt.",
    guidesCta: "Đọc cẩm nang khám bệnh",
    signatureEyebrow: "Chỉ có trên ViCare",
    signatureTitle: "Hai tính năng chính",
    signature: [
      {
        key: "interpreter",
        title: "Phiên dịch khi khám bệnh",
        body:
          "Đặt điện thoại lên bàn giữa bạn và bác sĩ. Bác sĩ thấy lời xin phép bằng tiếng Nhật trước khi bắt đầu. App nghe qua micro bằng bộ nhận dạng giọng nói của điện thoại (ưu tiên chạy ngay trên máy), so với kho hơn 3.700 mẫu câu bác sĩ – bệnh nhân và hiện nghĩa tiếng Việt. Con số (liều thuốc, số ngày) luôn được nhắc kiểm tra lại. Không ghi âm. Có thể lưu buổi khám vào nhật ký.",
      },
      {
        key: "scanner",
        title: "Đọc giấy tờ bệnh viện và túi thuốc",
        body:
          "Chụp bằng camera hoặc chọn ảnh có sẵn, app đọc chữ tiếng Nhật ngay trên điện thoại, không gửi ảnh đi đâu. Đọc túi thuốc (薬袋) ra lịch uống sáng – trưa – tối – trước ngủ; đọc phiếu hẹn (予約票), hoá đơn (領収書, lưu chi phí vào nhật ký), kết quả xét nghiệm, phiếu khai bệnh (問診票) và giấy đồng ý. Chỗ nào chưa chắc, app để nguyên chữ gốc và nhắc bạn hỏi dược sĩ, không tự đoán.",
      },
    ],
    featuresTitle: "Mọi thứ cần cho một lần đi khám",
    featuresLead: "Từ lúc thấy trong người không ổn đến lúc cầm túi thuốc về nhà.",
    features: [
      {
        key: "sick",
        title: "Tôi bị ốm",
        body: "Chọn triệu chứng, app gợi ý nên khám khoa nào và cảnh báo dấu hiệu nguy hiểm cần gọi 119 ngay.",
      },
      {
        key: "clinics",
        title: "Phòng khám gần đây",
        body: "Chọn khoa, xem danh sách hơn 140.000 cơ sở y tế ở 47 tỉnh từ dữ liệu mở của Bộ Y tế Nhật (ưu tiên nơi đang mở), hoặc mở Google Maps tìm phòng khám khoa đó gần bạn. Kèm tên khoa tiếng Nhật trên biển hiệu và câu nói khi gọi điện đặt hẹn.",
      },
      {
        key: "emergency",
        title: "Khẩn cấp 119 · 110 · #7119 · #8000",
        body: "Câu nói khi gọi 119 bằng tiếng Nhật, tự điền địa chỉ bạn đã lưu. Đưa màn hình thông tin khẩn cấp cho nhân viên y tế.",
      },
      {
        key: "health",
        title: "Sức khoẻ của tôi",
        body: "Thông tin khẩn cấp hiện bằng tiếng Nhật (dị ứng, bệnh nền, phòng khám quen, người liên hệ), nhật ký khám kèm chi phí phòng khám và nhà thuốc, tổng theo năm cho 医療費控除, thuốc đang uống.",
      },
      {
        key: "phrasebook",
        title: "Câu giao tiếp",
        body: "Hơn 2.000 câu theo tình huống: lễ tân, khai triệu chứng, nhà thuốc, gọi điện. Phóng to cho nhân viên xem, có furigana.",
      },
      {
        key: "diseases",
        title: "Cẩm nang bệnh",
        body: "Hơn 170 bệnh thường gặp: dấu hiệu nguy hiểm, khám khoa nào, tự chăm sóc, câu nói ở phòng khám.",
      },
      {
        key: "procedures",
        title: "Thủ tục & bảo hiểm",
        body: "70 bài: bảo hiểm y tế, tiền khám, 高額療養費, 労災, gia đình và công việc, kèm nguồn chính thức.",
      },
      {
        key: "dictionary",
        title: "Từ điển y khoa",
        body: "Hơn 2.500 từ, tìm bằng kanji, kana, romaji, tiếng Việt có hoặc không dấu, tiếng Anh.",
      },
    ],
    flowTitle: "Một lần đi khám với ViCare",
    flowLead: "Năm bước, từ ở nhà đến nhà thuốc.",
    flow: [
      {
        title: "Ở nhà: biết nên khám khoa nào",
        body: "Mở “Tôi bị ốm”, chọn triệu chứng. Nếu có dấu hiệu nguy hiểm, app nhắc gọi 119. Nếu không, app gợi ý khoa và mở Google Maps tìm phòng khám khoa đó gần bạn.",
      },
      {
        title: "Ở quầy lễ tân (受付)",
        body: "Đưa thẻ bảo hiểm và màn hình Thông tin khẩn cấp bằng tiếng Nhật. Dùng câu giao tiếp và từ điển để điền phiếu khai bệnh (問診票).",
      },
      {
        title: "Trong phòng khám (診察)",
        body: "Mở Phiên dịch, đặt điện thoại lên bàn. Bác sĩ đồng ý thì bắt đầu. Bạn đọc nghĩa tiếng Việt; chỗ chưa rõ có nút “Nhờ nói chậm”, “Nhờ viết ra giấy”.",
      },
      {
        title: "Thanh toán và nhà thuốc (会計・薬局)",
        body: "Chụp hoá đơn để lưu chi phí. Ở nhà thuốc, chụp túi thuốc để xem lịch uống và lưu vào “Thuốc đang uống”.",
      },
      {
        title: "Sau khi khám",
        body: "Buổi khám nằm trong nhật ký cùng ngày hẹn tái khám. Cuối năm xem tổng chi phí để khai 医療費控除.",
      },
    ],
    webAppTitle: "Bản web và app điện thoại khác nhau thế nào?",
    webAppLead:
      "Phần lớn nội dung dùng được trên trình duyệt, nhưng hai tính năng chính của ViCare cần app cài trên điện thoại.",
    webAppHead: ["Chức năng", "Bản web", "App điện thoại"],
    webAppRows: [
      ["Câu giao tiếp, cẩm nang bệnh, thủ tục, từ điển, tìm kiếm", "Có", "Có"],
      [
        "Thông tin khẩn cấp, nhật ký khám, thuốc đang uống",
        "Có, lưu trong trình duyệt (mất nếu xoá dữ liệu trình duyệt)",
        "Có, lưu trên điện thoại",
      ],
      [
        "Tìm phòng khám theo khoa trên Google Maps, màn Khẩn cấp",
        "Có (gọi điện tuỳ trình duyệt; có nút sao chép số)",
        "Có, mở thẳng Điện thoại và Bản đồ",
      ],
      ["Phiên dịch bằng micro", "Chưa (chỉ xem câu mẫu)", "Có"],
      ["Đọc giấy tờ, túi thuốc bằng camera", "Không (chỉ xem ví dụ)", "Có, đọc ngay trên máy"],
      ["Nhắc uống thuốc, nhắc tái khám", "Không", "Có, thông báo ngay trên điện thoại"],
    ],
    webAppNote:
      "Bản web của ViCare đang được chuẩn bị; đường dẫn sẽ được thêm vào trang này khi mở. Với phiên dịch và đọc giấy tờ, hãy dùng app trên điện thoại.",
    privacyTitle: "Dữ liệu của bạn ở lại trên điện thoại",
    privacyPoints: [
      "Không cần tài khoản. ViCare không có máy chủ và không tải dữ liệu của bạn lên đâu cả.",
      "Thông tin khẩn cấp, nhật ký khám, thuốc và cài đặt chỉ lưu trên điện thoại của bạn.",
      "Ảnh giấy tờ được đọc ngay trên máy và không gửi đi.",
      "Micro dùng bộ nhận dạng giọng nói của điện thoại, ưu tiên chạy trên máy. ViCare không ghi âm.",
      "Không quảng cáo, không công cụ thống kê, không theo dõi.",
    ],
    privacyLink: "Đọc chính sách quyền riêng tư của ViCare",
    guidesTitle: "Cẩm nang đi khám bệnh ở Nhật",
    guidesLead: "Bài viết miễn phí, đọc được ngay không cần cài app.",
    faqTitle: "Câu hỏi thường gặp về ViCare",
    faqs: [
      {
        question: "ViCare có mất phí không?",
        answer:
          "Không. ViCare là app miễn phí, phi lợi nhuận của ViMai. Không có gói VIP, không quảng cáo, không bán dữ liệu.",
      },
      {
        question: "Có cần tạo tài khoản không?",
        answer: "Không. Mở app là dùng được ngay. ViCare không có đăng nhập và không có máy chủ lưu dữ liệu người dùng.",
      },
      {
        question: "Thông tin sức khoẻ của tôi được lưu ở đâu?",
        answer:
          "Chỉ trên điện thoại của bạn. Khi đổi máy, bạn tự sao chép bản sao lưu trong Cài đặt, dán vào ghi chú hoặc email của chính mình, rồi dán lại vào ViCare ở máy mới. Bạn có thể xoá toàn bộ dữ liệu bất cứ lúc nào.",
      },
      {
        question: "Phiên dịch khi khám bệnh hoạt động thế nào?",
        answer:
          "App nghe bác sĩ qua micro bằng bộ nhận dạng giọng nói của điện thoại, rồi so với kho hơn 3.700 mẫu câu thường gặp khi khám để hiện nghĩa tiếng Việt. Câu không có trong kho: app iPhone/Android dịch đúng lời bác sĩ ngay trên máy, không cần mạng sau khi tải gói ngôn ngữ lần đầu, ghi rõ “Dịch máy” và kèm câu dịch ngược để kiểm tra; trên bản web, câu đó được báo rõ để bạn nhờ bác sĩ nói lại hoặc viết ra giấy. Con số luôn được nhắc kiểm tra lại. Âm thanh không được ghi lại.",
      },
      {
        question: "ViCare có thay được phiên dịch viên y tế không?",
        answer:
          "Không. ViCare là công cụ hỗ trợ giao tiếp. Với phẫu thuật, sinh con, bệnh nặng hoặc giấy đồng ý quan trọng, hãy nhờ phiên dịch viên y tế hoặc người thân giỏi tiếng Nhật, và luôn hỏi lại bác sĩ khi chưa chắc.",
      },
      {
        question: "Đọc túi thuốc có cho biết thuốc chữa bệnh gì không?",
        answer:
          "Không. ViCare chỉ dịch cách dùng in trên túi (mấy lần một ngày, trước hay sau ăn, mấy viên). App không tra tên thuốc hay công dụng, và không tự đoán những chỗ ghi chưa rõ: khi đó hãy hỏi dược sĩ.",
      },
      {
        question: "Dùng ViCare trên web được không?",
        answer:
          "Phần đọc (câu giao tiếp, cẩm nang bệnh, thủ tục, từ điển), thông tin khẩn cấp và tìm phòng khám dùng được trong trình duyệt. Phiên dịch bằng micro và đọc giấy tờ bằng camera chỉ có trong app điện thoại. Dữ liệu trên web nằm trong trình duyệt và sẽ mất nếu bạn xoá dữ liệu trình duyệt.",
      },
      {
        question: "Khi nào ViCare có trên App Store và Google Play?",
        answer:
          "ViCare đang chuẩn bị gửi duyệt. Nút tải trên trang này sẽ được mở ngay khi app có mặt trên cửa hàng. Bạn có thể theo dõi Facebook hoặc Zalo của ViMai để biết tin.",
      },
      {
        question: "ViCare có những ngôn ngữ nào?",
        answer:
          "Giao diện có tiếng Việt, tiếng Nhật và tiếng Anh. Chữ Hán trong app có furigana (cách đọc nhỏ phía trên), có thể bật hoặc tắt.",
      },
      {
        question: "Nội dung y khoa trong ViCare đã được bác sĩ duyệt chưa?",
        answer:
          "Chưa có bác sĩ duyệt. Nội dung do đội ngũ ViCare biên soạn từ nguồn y tế công khai của Nhật và đã được rà soát, chỉ mang tính tham khảo, không phải chẩn đoán. Điều quan trọng như thuốc, liều dùng, dị ứng, hãy hỏi lại bác sĩ hoặc dược sĩ. Nếu thấy sai, hãy liên hệ ViMai.",
      },
      {
        question: "Khi nguy cấp tôi nên làm gì?",
        answer:
          "Gọi 119 (cấp cứu, cứu hoả) ngay. Màn Khẩn cấp của ViCare có câu nói bằng tiếng Nhật và địa chỉ bạn đã lưu để đọc cho tổng đài. Không chắc có cần xe cấp cứu không thì có thể gọi #7119 ở những nơi có dịch vụ này; trẻ em ốm vào buổi tối thì gọi #8000.",
      },
    ],
    disclaimerTitle: "Lưu ý y tế",
    disclaimer:
      "ViCare là thông tin tham khảo và công cụ hỗ trợ giao tiếp, không phải chẩn đoán hay lời khuyên điều trị. Bản dịch và nội dung y khoa do ViCare biên soạn để tham khảo, không thay thế lời khuyên của bác sĩ. Luôn làm theo bác sĩ và dược sĩ. Khi nguy cấp, gọi 119.",
    ecosystemTitle: "Hệ sinh thái ViMai",
    ecosystemLead: "ViCare là một phần của ViMai. Các ứng dụng khác cho người Việt sống và làm việc tại Nhật:",
    breadcrumbLabel: "Đường dẫn",
    breadcrumbHome: "Trang chủ",
    breadcrumbProducts: "Sản phẩm",
    guideCtaTitle: "ViCare giúp bạn thế nào",
    guideCtaButton: "Xem ứng dụng ViCare",
    relatedTitle: "Bài liên quan",
    tocTitle: "Nội dung bài viết",
    guideFaqTitle: "Hỏi đáp nhanh",
    guideDisclaimer:
      "Bài viết là thông tin tham khảo chung, không thay thế lời khuyên của bác sĩ, dược sĩ hay cơ quan chức năng. Quy định có thể khác theo địa phương và thay đổi theo thời gian; hãy kiểm tra với nơi bạn khám hoặc toà thị chính.",
    updatedLabel: "Cập nhật: tháng 10 năm 2026",
  },

  en: {
    seoTitle: "ViCare – See a Doctor in Japan, Free App for Vietnamese",
    description:
      "ViCare helps Vietnamese people see a doctor in Japan: a visit interpreter, camera reading of papers and medicine bags, which department to visit, 119 scripts. Free, no account.",
    name: "ViCare",
    tagline: "Your companion for seeing a doctor in Japan",
    lead:
      "ViCare is a free, non-profit ViMai app that helps Vietnamese people in Japan see a doctor with confidence: understand what the doctor says, read hospital papers and medicine bags, find the right department and know how to call an ambulance. No ads and no account; your personal data stays on your phone.",
    badges: ["Free", "Non-profit", "No account", "Data stays on your phone", "Tiếng Việt · 日本語 · English"],
    webCta: "Try the web app now",
    webNote: "Opens in your browser, nothing to install. Listening through the microphone and reading papers with the camera are in the phone app only.",
    storeTitle: "Get ViCare",
    appStoreSoon: "Coming soon to the App Store",
    googlePlaySoon: "Coming soon to Google Play",
    storeNote:
      "ViCare is being prepared for the App Store and Google Play. The download buttons on this page will go live as soon as the app is approved.",
    guidesCta: "Read the guides",
    signatureEyebrow: "Only on ViCare",
    signatureTitle: "Two signature features",
    signature: [
      {
        key: "interpreter",
        title: "Doctor-visit interpreter",
        body:
          "Lay the phone on the desk between you and the doctor. The doctor first sees a consent request in Japanese. The app listens through the microphone using the phone's own speech recogniser (on-device when available), matches what it hears against over 3,700 doctor–patient sentences and shows the meaning in Vietnamese. Numbers such as doses and days are always flagged for you to double-check. Audio is never recorded. You can save the visit to your diary.",
      },
      {
        key: "scanner",
        title: "Read hospital papers and medicine bags",
        body:
          "Take a photo or pick one from your gallery; the Japanese text is read on the phone and never uploaded. A medicine bag (薬袋) becomes a morning–noon–evening–bedtime schedule. It also reads appointment slips (予約票), receipts (領収書, saved to your diary), test results, questionnaires (問診票) and consent forms. Anything uncertain is left as the original text with a prompt to ask the pharmacist; the app never guesses.",
      },
    ],
    featuresTitle: "Everything for one visit",
    featuresLead: "From the moment you feel unwell to taking your medicine home.",
    features: [
      {
        key: "sick",
        title: "I feel sick",
        body: "Pick your symptoms to see which department to visit, with warning signs that mean you should call 119 now.",
      },
      {
        key: "clinics",
        title: "Nearby clinics",
        body: "Choose a department, browse over 140,000 medical facilities in 47 prefectures from the Ministry of Health's open data (open ones first), or open Google Maps to find one near you, with the Japanese name on the signboard and phrases for booking by phone.",
      },
      {
        key: "emergency",
        title: "Emergency 119 · 110 · #7119 · #8000",
        body: "What to say on 119 in Japanese, with your saved address filled in. Show your emergency info screen to staff.",
      },
      {
        key: "health",
        title: "My health",
        body: "Emergency medical info shown in Japanese (allergies, conditions, regular clinic, contact), a visit diary with clinic and pharmacy costs, yearly totals for 医療費控除, and current medicines.",
      },
      {
        key: "phrasebook",
        title: "Phrasebook",
        body: "More than 2,000 phrases by situation: reception, symptoms, pharmacy, phone calls. Enlarge them for staff; furigana included.",
      },
      {
        key: "diseases",
        title: "Illness guide",
        body: "More than 170 common illnesses: warning signs, which department, self-care and what to say at the clinic.",
      },
      {
        key: "procedures",
        title: "Insurance & procedures",
        body: "70 articles on health insurance, costs, 高額療養費, 労災, family and work, with official sources.",
      },
      {
        key: "dictionary",
        title: "Medical dictionary",
        body: "More than 2,500 terms. Search by kanji, kana, romaji, Vietnamese with or without accents, or English.",
      },
    ],
    flowTitle: "A clinic visit with ViCare",
    flowLead: "Five steps, from home to the pharmacy.",
    flow: [
      {
        title: "At home: find the right department",
        body: "Open “I feel sick” and pick your symptoms. Warning signs prompt you to call 119; otherwise the app suggests a department and opens Google Maps for clinics near you.",
      },
      {
        title: "At reception (受付)",
        body: "Hand over your insurance card and show your emergency info in Japanese. Use the phrasebook and dictionary to fill in the questionnaire (問診票).",
      },
      {
        title: "In the consultation (診察)",
        body: "Open the interpreter and lay the phone on the desk. Once the doctor agrees, read the Vietnamese meaning; buttons ask the doctor to slow down or write it down.",
      },
      {
        title: "Payment and pharmacy (会計・薬局)",
        body: "Photograph the receipt to save the cost. At the pharmacy, photograph the medicine bag to see the schedule and save it to your medicines.",
      },
      {
        title: "After the visit",
        body: "The visit and your next appointment are in your diary. At the end of the year, see your total costs for 医療費控除.",
      },
    ],
    webAppTitle: "Web version or phone app?",
    webAppLead: "Most content works in a browser, but ViCare's two signature features need the app on your phone.",
    webAppHead: ["Feature", "Web", "Phone app"],
    webAppRows: [
      ["Phrasebook, illness guide, procedures, dictionary, search", "Yes", "Yes"],
      [
        "Emergency info, visit diary, current medicines",
        "Yes, stored in the browser (lost if browser data is cleared)",
        "Yes, stored on the phone",
      ],
      [
        "Clinic search by department on Google Maps, Emergency screen",
        "Yes (calling depends on the browser; a copy button is provided)",
        "Yes, opens Phone and Maps directly",
      ],
      ["Microphone interpreter", "Not yet (sample phrases only)", "Yes"],
      ["Camera reading of papers and medicine bags", "No (examples only)", "Yes, read on the phone"],
      ["Medicine and follow-up visit reminders", "No", "Yes, notifications on the phone"],
    ],
    webAppNote:
      "The ViCare web version is being prepared; its link will be added here when it opens. For the interpreter and document reader, use the phone app.",
    privacyTitle: "Your data stays on your phone",
    privacyPoints: [
      "No account. ViCare has no server and uploads none of your data.",
      "Emergency info, visit diary, medicines and settings are stored only on your phone.",
      "Photos of papers are read on the phone and never sent anywhere.",
      "The microphone uses the phone's speech recogniser, on-device when possible. ViCare never records audio.",
      "No ads, no analytics, no tracking.",
    ],
    privacyLink: "Read the ViCare privacy policy",
    guidesTitle: "Guides: seeing a doctor in Japan",
    guidesLead: "Free articles you can read now, no app needed.",
    faqTitle: "ViCare FAQ",
    faqs: [
      {
        question: "Is ViCare free?",
        answer: "Yes. ViCare is a free, non-profit ViMai app. There is no VIP plan, no advertising and no selling of data.",
      },
      {
        question: "Do I need an account?",
        answer: "No. Open the app and start. ViCare has no sign-in and no server that stores user data.",
      },
      {
        question: "Where is my health information stored?",
        answer:
          "Only on your phone. When you change phones, copy the backup in Settings, paste it into your own notes or email, then paste it into ViCare on the new phone. You can delete all data at any time.",
      },
      {
        question: "How does the doctor-visit interpreter work?",
        answer:
          "It listens through the microphone with the phone's speech recogniser and matches what it hears against over 3,700 sentences used at clinics to show the Vietnamese meaning. A sentence that is not in the phrase bank is translated on the phone by the iPhone/Android app, offline after a one-time language download, labelled “machine translation” with a back-translation to check; on the web version it is clearly marked so you can ask the doctor to repeat it or write it down. Numbers are always flagged for checking. Audio is never recorded.",
      },
      {
        question: "Does ViCare replace a medical interpreter?",
        answer:
          "No. ViCare is a communication aid. For surgery, childbirth, serious illness or important consent forms, ask for a medical interpreter or a family member fluent in Japanese, and always check with the doctor when unsure.",
      },
      {
        question: "Does the medicine-bag reader tell me what the medicine is for?",
        answer:
          "No. ViCare only translates the directions printed on the bag (how many times a day, before or after meals, how many tablets). It does not look up drug names or effects, and it never guesses unclear directions: ask the pharmacist instead.",
      },
      {
        question: "Can I use ViCare on the web?",
        answer:
          "The reading content (phrasebook, illness guide, procedures, dictionary), emergency info and clinic search work in a browser. The microphone interpreter and camera reader are phone-app only. Web data lives in the browser and is lost if you clear browser data.",
      },
      {
        question: "When will ViCare be on the App Store and Google Play?",
        answer:
          "ViCare is being prepared for review. The download buttons on this page will go live as soon as the app is in the stores. Follow ViMai on Facebook or Zalo for news.",
      },
      {
        question: "Which languages does ViCare support?",
        answer:
          "The interface is in Vietnamese, Japanese and English. Kanji in the app carry furigana (small readings above), which you can turn on or off.",
      },
      {
        question: "Has a doctor reviewed the medical content?",
        answer:
          "No doctor has reviewed it. The ViCare team wrote the content from public Japanese health sources and checked it; it is for reference only, not a diagnosis. For anything important (medicines, doses, allergies), ask your doctor or pharmacist. If you find a mistake, contact ViMai.",
      },
      {
        question: "What should I do in an emergency?",
        answer:
          "Call 119 (ambulance and fire) at once. ViCare's Emergency screen has Japanese phrases and your saved address to read out. If you are unsure whether you need an ambulance, call #7119 where the service exists; for a sick child in the evening, call #8000.",
      },
    ],
    disclaimerTitle: "Medical disclaimer",
    disclaimer:
      "ViCare is reference information and a communication aid, not a diagnosis or treatment advice. Translations and medical content are written by ViCare for reference and do not replace medical advice. Always follow your doctor and pharmacist. In an emergency, call 119.",
    ecosystemTitle: "The ViMai ecosystem",
    ecosystemLead: "ViCare is part of ViMai. More apps for Vietnamese people living and working in Japan:",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbProducts: "Products",
    guideCtaTitle: "How ViCare helps",
    guideCtaButton: "See the ViCare app",
    relatedTitle: "Related guides",
    tocTitle: "In this guide",
    guideFaqTitle: "Quick answers",
    guideDisclaimer:
      "This article is general reference information and does not replace advice from a doctor, pharmacist or public office. Rules can differ by municipality and change over time; check with your clinic or city office.",
    updatedLabel: "Updated: October 2026",
  },

  ja: {
    seoTitle: "ViCare｜ベトナム人の日本での受診をサポートする無料アプリ",
    description:
      "ViCareは日本で病院にかかるベトナム人のための無料・非営利アプリ。診察時の通訳、書類・薬袋のカメラ読み取り、症状から診療科の案内、119番の伝え方。アカウント不要。",
    name: "ViCare",
    tagline: "日本での受診に寄り添うアプリ",
    lead:
      "ViCareは、日本に住むベトナム人が安心して病院・クリニックを受診できるよう支える、ViMaiの無料・非営利アプリです。医師の説明を理解する、病院の書類や薬袋を読む、受診する診療科を選ぶ、救急車を呼ぶ。広告もアカウントもなく、個人のデータは利用者のスマートフォンの中だけに保存されます。",
    badges: ["無料", "非営利", "アカウント不要", "データは端末内のみ", "Tiếng Việt · 日本語 · English"],
    webCta: "Web版を今すぐ使う",
    webNote: "ブラウザで開くだけ、インストール不要です。マイクでの通訳とカメラでの書類読み取りはスマホアプリのみの機能です。",
    storeTitle: "ViCareを入手",
    appStoreSoon: "App Storeで近日公開",
    googlePlaySoon: "Google Playで近日公開",
    storeNote: "App Store・Google Playでの公開を準備中です。公開され次第、このページのボタンからダウンロードできるようになります。",
    guidesCta: "受診ガイドを読む",
    signatureEyebrow: "ViCareだけの機能",
    signatureTitle: "2つの中心機能",
    signature: [
      {
        key: "interpreter",
        title: "診察通訳",
        body:
          "患者さんと医師の間の机にスマートフォンを置いて使います。最初に、医師には日本語で利用の許可をお願いする画面が表示されます。端末の音声認識（可能な限り端末内で処理）で医師の言葉を聞き取り、3,700以上の診察会話の例文と照合してベトナム語の意味を表示します。薬の量や日数などの数字は必ず確認を促します。録音はしません。診察の内容は受診記録に保存できます。",
      },
      {
        key: "scanner",
        title: "病院の書類・薬袋を読む",
        body:
          "カメラで撮影するか写真を選ぶと、日本語の文字を端末内で読み取ります。画像は外部に送信しません。薬袋は朝・昼・夕・寝る前の飲み方の表になります。予約票、領収書（受診記録に費用を保存）、検査結果、問診票、同意書にも対応しています。読み取りが確実でない部分は原文のまま残し、薬剤師への確認を促します。推測はしません。",
      },
    ],
    featuresTitle: "受診に必要なものをひとつに",
    featuresLead: "体調が悪いと感じたときから、薬を受け取って帰るまで。",
    features: [
      {
        key: "sick",
        title: "体調が悪い",
        body: "症状を選ぶと受診する診療科の目安を表示し、すぐに119番が必要な危険なサインも知らせます。",
      },
      {
        key: "clinics",
        title: "近くのクリニック",
        body: "診療科を選び、厚生労働省のオープンデータによる47都道府県・14万以上の医療機関の一覧（診療中の施設を優先）か、Googleマップで近くの医療機関を探します。看板の表記と、電話で予約するときのフレーズ付きです。",
      },
      {
        key: "emergency",
        title: "緊急 119・110・#7119・#8000",
        body: "119番で話す日本語を、保存した住所を入れた形で表示します。緊急医療情報の画面をそのまま救急隊員に見せられます。",
      },
      {
        key: "health",
        title: "わたしの健康",
        body: "日本語で表示する緊急医療情報（アレルギー、持病、かかりつけ医、緊急連絡先）、医療機関と薬局の支払額付きの受診記録、医療費控除のための年間合計、服用中の薬。",
      },
      {
        key: "phrasebook",
        title: "会話フレーズ",
        body: "受付、症状、薬局、電話など場面別に2,000以上のフレーズ。拡大してスタッフに見せられ、ふりがな付きです。",
      },
      {
        key: "diseases",
        title: "病気ガイド",
        body: "よくある病気170以上について、危険なサイン、受診する科、セルフケア、診察で使う言葉をまとめています。",
      },
      {
        key: "procedures",
        title: "手続き・保険",
        body: "健康保険、医療費、高額療養費、労災、家族や仕事に関する70本の記事。公的な情報源へのリンク付き。",
      },
      {
        key: "dictionary",
        title: "医療用語辞典",
        body: "2,500語以上。漢字、かな、ローマ字、ベトナム語（声調記号の有無を問わず）、英語で検索できます。",
      },
    ],
    flowTitle: "ViCareを使った受診の流れ",
    flowLead: "自宅から薬局まで、5つのステップ。",
    flow: [
      {
        title: "自宅で：診療科を選ぶ",
        body: "「体調が悪い」で症状を選びます。危険なサインがあれば119番を促し、そうでなければ診療科の目安を示してGoogleマップで近くの医療機関を探します。",
      },
      {
        title: "受付で",
        body: "保険証などと一緒に、日本語の緊急医療情報を見せます。問診票は会話フレーズと辞典を使って記入します。",
      },
      {
        title: "診察室で",
        body: "通訳を開いてスマートフォンを机に置き、医師の了承を得てから始めます。分かりにくいときは「ゆっくり話して」「書いてください」のボタンで伝えます。",
      },
      {
        title: "会計・薬局で",
        body: "領収書を撮影して費用を記録します。薬局では薬袋を撮影して飲み方を確認し、「服用中の薬」に保存します。",
      },
      {
        title: "受診の後",
        body: "受診記録に診察の内容と次回の予約が残ります。年末には医療費控除のための合計額を確認できます。",
      },
    ],
    webAppTitle: "Web版とスマートフォンアプリの違い",
    webAppLead: "多くの内容はブラウザで使えますが、ViCareの2つの中心機能にはスマートフォンのアプリが必要です。",
    webAppHead: ["機能", "Web版", "アプリ"],
    webAppRows: [
      ["会話フレーズ、病気ガイド、手続き、辞典、検索", "○", "○"],
      [
        "緊急医療情報、受診記録、服用中の薬",
        "○（ブラウザに保存。ブラウザのデータを消すと失われます）",
        "○（端末に保存）",
      ],
      [
        "診療科別のGoogleマップ検索、緊急画面",
        "○（電話の発信はブラウザによる。番号のコピーボタンあり）",
        "○（電話・地図アプリを直接開く）",
      ],
      ["マイクによる診察通訳", "未対応（例文のみ）", "○"],
      ["カメラによる書類・薬袋の読み取り", "×（例のみ）", "○（端末内で読み取り）"],
      ["服薬・再診のリマインダー", "×", "○（端末内の通知）"],
    ],
    webAppNote: "ViCareのWeb版は準備中です。公開したらこのページにリンクを追加します。通訳と書類の読み取りはスマートフォンのアプリをお使いください。",
    privacyTitle: "データは端末の中だけに",
    privacyPoints: [
      "アカウントは不要です。ViCareにはサーバーがなく、データをアップロードしません。",
      "緊急医療情報、受診記録、薬、設定はスマートフォンの中だけに保存されます。",
      "書類の画像は端末内で読み取り、送信しません。",
      "マイクは端末の音声認識を使い、可能な限り端末内で処理します。録音は保存しません。",
      "広告、解析ツール、トラッキングはありません。",
    ],
    privacyLink: "ViCareのプライバシーポリシーを読む",
    guidesTitle: "外国人のための受診ガイド",
    guidesLead: "アプリがなくても読める無料の記事です。",
    faqTitle: "ViCareについてよくある質問",
    faqs: [
      {
        question: "ViCareは無料ですか？",
        answer: "はい。ViMaiの無料・非営利アプリです。有料プラン、広告、データの販売はありません。",
      },
      {
        question: "アカウント登録は必要ですか？",
        answer: "不要です。アプリを開けばすぐに使えます。ログインも、利用者のデータを保存するサーバーもありません。",
      },
      {
        question: "健康に関する情報はどこに保存されますか？",
        answer:
          "利用者のスマートフォンの中だけです。機種変更の際は、設定でバックアップをコピーして自分のメモやメールに保存し、新しい端末のViCareに貼り付けます。すべてのデータはいつでも削除できます。",
      },
      {
        question: "診察通訳はどのように動きますか？",
        answer:
          "端末の音声認識で医師の言葉を聞き取り、受診でよく使う3,700以上の例文と照合してベトナム語の意味を表示します。例文にない文は、iPhone/Androidアプリでは端末内で翻訳し（初回に言語データをダウンロードすればオフライン可、「機械翻訳」と表示し逆翻訳付き）、Web版ではその旨をはっきり表示するので、言い直しや筆談をお願いできます。数字は必ず確認を促します。録音はしません。",
      },
      {
        question: "医療通訳者の代わりになりますか？",
        answer:
          "なりません。ViCareはコミュニケーションの補助ツールです。手術、出産、重い病気、重要な同意書などの場面では、医療通訳者や日本語のできる家族の同席をおすすめします。不明な点は必ず医師に確認してください。",
      },
      {
        question: "薬袋を読むと、薬の効能もわかりますか？",
        answer:
          "わかりません。ViCareは薬袋に印刷された用法（1日の回数、食前・食後、錠数など）だけを訳します。薬の名前や効能は調べず、はっきりしない記載は推測しません。その場合は薬剤師に確認してください。",
      },
      {
        question: "Webでも使えますか？",
        answer:
          "会話フレーズ、病気ガイド、手続き、辞典などの読み物、緊急医療情報、医療機関の検索はブラウザで使えます。マイクの通訳とカメラの読み取りはアプリのみです。Web版のデータはブラウザに保存され、ブラウザのデータを消去すると失われます。",
      },
      {
        question: "App Store・Google Playにはいつ公開されますか？",
        answer: "審査に向けて準備中です。ストアで公開され次第、このページのボタンを有効にします。最新情報はViMaiのFacebookやZaloでお知らせします。",
      },
      {
        question: "対応言語は？",
        answer: "画面はベトナム語・日本語・英語に対応しています。アプリ内の漢字にはふりがなを表示でき、オン・オフを切り替えられます。",
      },
      {
        question: "医療の内容は医師が確認していますか？",
        answer:
          "医師の確認は受けていません。日本の公的な医療情報をもとにViCareチームが作成・確認した参考情報で、診断ではありません。薬・用量・アレルギーなど大切なことは医師・薬剤師に確認してください。誤りを見つけた場合はViMaiまでお知らせください。",
      },
      {
        question: "緊急のときはどうすればいいですか？",
        answer:
          "すぐに119番（救急・消防）に電話してください。ViCareの緊急画面には、保存した住所を入れた日本語の伝え方があります。救急車を呼ぶべきか迷うときは、実施している地域では#7119、夜間の子どもの急病は#8000に相談できます。",
      },
    ],
    disclaimerTitle: "医療に関する注意",
    disclaimer:
      "ViCareは参考情報とコミュニケーションの支援を目的としたもので、診断や治療の助言ではありません。翻訳と医療情報はViCareが参考用に作成したもので、医師の判断に代わるものではありません。医師・薬剤師の指示に従ってください。緊急時は119番へ。",
    ecosystemTitle: "ViMaiのエコシステム",
    ecosystemLead: "ViCareはViMaiのアプリのひとつです。日本で暮らし、働く人のためのほかのアプリ：",
    breadcrumbLabel: "パンくずリスト",
    breadcrumbHome: "ホーム",
    breadcrumbProducts: "製品",
    guideCtaTitle: "ViCareでできること",
    guideCtaButton: "ViCareアプリを見る",
    relatedTitle: "関連ガイド",
    tocTitle: "この記事の内容",
    guideFaqTitle: "よくある質問",
    guideDisclaimer:
      "この記事は一般的な参考情報であり、医師・薬剤師・行政機関の助言に代わるものではありません。制度は自治体によって異なり、変更されることがあります。受診先や市区町村の窓口でご確認ください。",
    updatedLabel: "更新：2026年10月",
  },
};
