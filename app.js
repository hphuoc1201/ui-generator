/* ============================================================
   UI Prompt Studio — vanilla JS, no dependencies, no API.
   Tạo prompt chuẩn để dán vào ChatGPT sinh ảnh UI.
   ============================================================ */

/* ---------- Style option definitions ---------- */
const OPTIONS = {
  platform: [
    { v: "ios", label: "iOS (iPhone)", text: "an iOS iPhone app" },
    { v: "android", label: "Android", text: "an Android app (Material)" },
    { v: "web", label: "Web app (desktop)", text: "a responsive web app (desktop browser)" },
    { v: "web-mobile", label: "Web app (mobile)", text: "a mobile web app" },
  ],
  design: [
    { v: "minimal", label: "Minimal", text: "clean minimalist design, generous whitespace" },
    { v: "flat", label: "Flat", text: "flat modern design" },
    { v: "material", label: "Material Design", text: "Google Material Design 3, elevation and ripples" },
    { v: "glass", label: "Glassmorphism", text: "glassmorphism, frosted translucent panels, soft blur" },
    { v: "neu", label: "Neumorphism", text: "neumorphism, soft shadows, subtle embossed elements" },
    { v: "bold", label: "Bold & colorful", text: "bold, colorful, playful design with strong typography" },
    { v: "corporate", label: "Corporate / SaaS", text: "professional corporate SaaS dashboard style" },
  ],
  mode: [
    { v: "light", label: "Sáng (Light)", text: "light mode" },
    { v: "dark", label: "Tối (Dark)", text: "dark mode" },
  ],
  fidelity: [
    { v: "high", label: "High-fidelity (ảnh thật)", text: "a high-fidelity, pixel-perfect, realistic" },
    { v: "wire", label: "Wireframe (phác thảo)", text: "a low-fidelity grayscale wireframe of" },
  ],
  aspect: [
    { v: "phone", label: "Điện thoại dọc (9:19.5)", text: "phone portrait aspect ratio 9:19.5, single screen" },
    { v: "phone-frame", label: "Điện thoại + khung máy", text: "shown inside a realistic phone device mockup frame, portrait" },
    { v: "tablet", label: "Tablet ngang", text: "tablet landscape layout" },
    { v: "desktop", label: "Desktop (16:9)", text: "desktop browser window, 16:9 layout" },
  ],
  textlang: [
    { v: "vi", label: "Tiếng Việt", text: "All UI text and labels must be in Vietnamese, natural and realistic" },
    { v: "en", label: "Tiếng Anh", text: "All UI text and labels in English" },
  ],
};

/* ---------- Screen template library ---------- */
/* Mỗi màn: id, name (vi), group, desc (vi ngắn), base (en, mô tả bố cục) */
const SCREENS = [
  // ----- Auth ----- (base trung tính; chi tiết do câu hỏi bên dưới quyết định)
  { id: "login", group: "Xác thực", name: "Đăng nhập (Login)", desc: "Tuỳ chọn phương thức đăng nhập",
    base: "a Login screen with the app logo/name at the top and a clear primary sign-in button." },
  { id: "signup", group: "Xác thực", name: "Đăng ký (Sign up)", desc: "Tuỳ chọn các trường form",
    base: "a Sign Up / registration screen with a clear primary create-account button." },
  { id: "forgot", group: "Xác thực", name: "Quên mật khẩu", desc: "Tuỳ chọn kênh đặt lại",
    base: "a Forgot Password screen with a short instruction and a submit button." },
  { id: "otp", group: "Xác thực", name: "Xác thực OTP", desc: "Chọn số chữ số & kênh gửi",
    base: "an OTP verification screen with a title, a subtitle showing where the code was sent, and a Verify button." },

  // ----- Onboarding -----
  { id: "welcome", group: "Onboarding", name: "Welcome / Giới thiệu", desc: "Chọn số slide & nút",
    base: "an onboarding welcome screen with a large friendly illustration, a headline and a short descriptive paragraph." },
  { id: "permission", group: "Onboarding", name: "Xin quyền", desc: "Yêu cầu quyền thông báo/vị trí",
    base: "a permission request screen with an icon, a title explaining why the permission is needed, a short description, an Allow button and a 'Maybe later' text button." },

  // ----- Core -----
  { id: "home", group: "Màn chính", name: "Trang chủ / Dashboard", desc: "Chọn kiểu, các phần & nav",
    base: "a Home screen for the app." },
  { id: "feed", group: "Màn chính", name: "Feed / Danh sách", desc: "Chọn loại nội dung & tương tác",
    base: "a scrollable feed/list screen with a top bar." },
  { id: "detail", group: "Màn chính", name: "Màn chi tiết", desc: "Chọn thành phần & CTA",
    base: "a detail screen with a back button at the top." },
  { id: "search", group: "Màn chính", name: "Tìm kiếm + kết quả", desc: "Chọn bộ lọc & thành phần",
    base: "a search screen with an active search bar at the top and a list/grid of results below." },
  { id: "empty", group: "Màn chính", name: "Trạng thái rỗng (Empty)", desc: "Chưa có dữ liệu",
    base: "an empty-state screen with a centered illustration, a friendly headline, a short helpful sentence, and a primary call-to-action button to add the first item." },

  // ----- User -----
  { id: "profile", group: "Người dùng", name: "Hồ sơ (Profile)", desc: "Chọn các mục hiển thị",
    base: "a user profile screen." },
  { id: "editprofile", group: "Người dùng", name: "Sửa hồ sơ", desc: "Form chỉnh sửa thông tin",
    base: "an edit-profile screen with an editable avatar with a camera icon, labeled input fields for name, bio, email and phone, and a Save button in the top bar." },
  { id: "settings", group: "Người dùng", name: "Cài đặt (Settings)", desc: "Chọn nhóm cài đặt",
    base: "a settings screen organized into grouped list sections, each row with an icon, label, and a chevron or a toggle switch." },
  { id: "notifications", group: "Người dùng", name: "Thông báo", desc: "Chọn bộ lọc & loại thông báo",
    base: "a notifications screen with a title and a vertical list of notification items, each with an icon/avatar, text and timestamp." },

  // ----- Commerce -----
  { id: "productlist", group: "Bán hàng", name: "Danh sách sản phẩm", desc: "Chọn bố cục & nội dung thẻ",
    base: "a product listing screen." },
  { id: "productdetail", group: "Bán hàng", name: "Chi tiết sản phẩm", desc: "Chọn tuỳ chọn & nút",
    base: "a product detail screen." },
  { id: "cart", group: "Bán hàng", name: "Giỏ hàng", desc: "Chọn tính năng",
    base: "a shopping cart screen with a list of cart items and a Checkout button at the bottom." },
  { id: "checkout", group: "Bán hàng", name: "Thanh toán", desc: "Chọn các phần & phương thức",
    base: "a checkout screen with a Place Order button at the bottom." },
  { id: "paysuccess", group: "Bán hàng", name: "Thanh toán thành công", desc: "Xác nhận đơn hàng",
    base: "an order-success screen with a large green checkmark illustration, a 'Payment Successful' headline, order number and summary, and View Order / Continue Shopping buttons." },

  // ----- Khác -----
  { id: "chat", group: "Khác", name: "Chat / Nhắn tin", desc: "Chọn tính năng & header",
    base: "a chat conversation screen with alternating incoming and outgoing message bubbles with timestamps, and a bottom input bar with attachment and send buttons." },
  { id: "chatlist", group: "Khác", name: "Danh sách trò chuyện", desc: "Chọn nội dung mỗi dòng",
    base: "a messaging inbox screen with a vertical list of conversations." },
  { id: "map", group: "Khác", name: "Bản đồ", desc: "Chọn tính năng bản đồ",
    base: "a map screen with a full-screen map background." },
  { id: "error404", group: "Khác", name: "Lỗi / 404", desc: "Màn báo lỗi",
    base: "an error / 404 screen with a playful illustration, a headline like 'Something went wrong', a short message, and a Try Again / Go Home button." },
];

/* ---------- Hệ thống câu hỏi cho từng màn ---------- */
/* Mỗi field: {key, label, type: multi|single|select|text, options?, default, compile(value)->string} */
function optEn(options, v) { const o = options.find(x => x.v === v); return o ? (o.en != null ? o.en : o.label) : v; }
const F = {
  // multi: chọn nhiều -> "lead a, b, c." (có ô "Khác")
  multi: (key, label, lead, options, def) => ({ key, label, type: "multi", kind: "list", lead, allowOther: true, options, default: def || [],
    compile: v => (v && v.length) ? lead + " " + v.map(x => optEn(options, x)).join(", ") + "." : "" }),
  // single (list): chọn 1 -> "lead en."
  single: (key, label, lead, options, def) => ({ key, label, type: "single", allowOther: false, options, default: def,
    compile: v => v ? lead + " " + optEn(options, v) + "." : "" }),
  // clauses (chọn nhiều, mỗi option là 1 câu hoàn chỉnh) -> nối các câu (có ô "Khác")
  clauses: (key, label, options, def) => ({ key, label, type: "multi", kind: "clauses", allowOther: true, options, default: def || [],
    compile: v => (v || []).map(x => optEn(options, x)).filter(Boolean).join(" ") }),
  // choice (chọn 1, option là câu hoàn chỉnh, "" = bỏ qua)
  choice: (key, label, options, def) => ({ key, label, type: "single", allowOther: false, options, default: def,
    compile: v => optEn(options, v) || "" }),
  select: (key, label, options, def, tpl) => ({ key, label, type: "select", allowOther: false, options, default: def,
    compile: v => v ? tpl.replace(/\{v\}/g, v) : "" }),
  text: (key, label, lead, ph) => ({ key, label, type: "text", allowOther: false, placeholder: ph || "", default: "",
    compile: v => (v && ("" + v).trim()) ? lead + " " + ("" + v).trim() + "." : "" }),
};

const SCREEN_FIELDS = {
  login: [
    F.multi("methods", "Phương thức đăng nhập", "Support login via", [
      { v: "email", label: "Email + mật khẩu", en: "email and password" },
      { v: "phonepw", label: "SĐT + mật khẩu", en: "phone number and password" },
      { v: "phoneotp", label: "SĐT + OTP", en: "phone number with OTP" },
      { v: "google", label: "Google", en: "Google" },
      { v: "apple", label: "Apple", en: "Apple" },
      { v: "facebook", label: "Facebook", en: "Facebook" },
      { v: "sso", label: "SSO công ty", en: "corporate SSO" },
    ], ["email", "google", "apple"]),
    F.clauses("extras", "Thành phần thêm", [
      { v: "remember", label: "Ghi nhớ đăng nhập", en: "Include a 'remember me' checkbox." },
      { v: "forgot", label: "Quên mật khẩu", en: "Include a 'forgot password' link." },
      { v: "signup", label: "Link sang đăng ký", en: "Include a link to the sign-up screen." },
    ], ["remember", "forgot", "signup"]),
  ],
  signup: [
    F.multi("formfields", "Các trường trong form", "Form fields:", [
      { v: "name", label: "Họ tên", en: "full name" },
      { v: "email", label: "Email", en: "email" },
      { v: "phone", label: "Số điện thoại", en: "phone number" },
      { v: "password", label: "Mật khẩu", en: "password" },
      { v: "confirm", label: "Xác nhận MK", en: "confirm password" },
      { v: "dob", label: "Ngày sinh", en: "date of birth" },
      { v: "gender", label: "Giới tính", en: "gender" },
      { v: "referral", label: "Mã giới thiệu", en: "referral code" },
    ], ["name", "email", "password", "confirm"]),
    F.choice("social", "Đăng ký bằng mạng xã hội?", [
      { v: "yes", label: "Có", en: "Also offer social sign-up with Google and Apple." },
      { v: "no", label: "Không", en: "" },
    ], "yes"),
    F.choice("terms", "Ô đồng ý điều khoản?", [
      { v: "yes", label: "Có", en: "Include a terms-of-service agreement checkbox." },
      { v: "no", label: "Không", en: "" },
    ], "yes"),
  ],
  forgot: [
    F.single("method", "Đặt lại mật khẩu qua", "Reset the password", [
      { v: "email", label: "Email", en: "via email" },
      { v: "sms", label: "SMS", en: "via SMS" },
      { v: "both", label: "Email hoặc SMS", en: "via email or SMS" },
    ], "email"),
  ],
  otp: [
    F.select("digits", "Số chữ số OTP", [{ v: "4" }, { v: "5" }, { v: "6" }, { v: "8" }], "6",
      "Use a {v}-digit OTP code, shown as {v} separate input boxes."),
    F.single("channel", "Mã gửi qua", "The code is sent", [
      { v: "sms", label: "SMS", en: "via SMS" },
      { v: "email", label: "Email", en: "via email" },
      { v: "app", label: "App xác thực", en: "via an authenticator app" },
    ], "sms"),
    F.choice("resend", "Đếm ngược gửi lại?", [
      { v: "yes", label: "Có", en: "Include a resend-code countdown timer." },
      { v: "no", label: "Không", en: "" },
    ], "yes"),
  ],
  welcome: [
    F.select("slides", "Số slide onboarding", [{ v: "3" }, { v: "4" }, { v: "5" }], "3",
      "Design it as the first slide of a {v}-slide onboarding carousel with page-indicator dots."),
    F.clauses("buttons", "Nút", [
      { v: "skip", label: "Skip", en: "Include a Skip button." },
      { v: "next", label: "Next", en: "Include a Next button." },
      { v: "get", label: "Get Started", en: "Include a Get Started button." },
    ], ["skip", "next"]),
  ],
  home: [
    F.single("kind", "Kiểu trang chủ", "Design it as", [
      { v: "dashboard", label: "Dashboard (widget)", en: "a data dashboard with summary widgets" },
      { v: "feed", label: "Feed nội dung", en: "a content home with a scrollable feed" },
      { v: "shop", label: "Cửa hàng", en: "a shopping home with categories and products" },
      { v: "launcher", label: "Tổng quan/menu", en: "an app overview / launcher home" },
    ], "dashboard"),
    F.multi("sections", "Các phần cần có", "Include these sections:", [
      { v: "search", label: "Thanh tìm kiếm", en: "a search bar" },
      { v: "kpi", label: "Thống kê/KPI", en: "KPI stat cards" },
      { v: "chart", label: "Biểu đồ", en: "charts" },
      { v: "recent", label: "Hoạt động gần đây", en: "a recent-activity list" },
      { v: "quick", label: "Thao tác nhanh", en: "quick-action buttons" },
      { v: "banner", label: "Banner khuyến mãi", en: "a promo banner" },
      { v: "categories", label: "Danh mục", en: "category shortcuts" },
      { v: "featured", label: "Nổi bật", en: "a featured/highlights section" },
    ], ["kpi", "chart", "recent", "quick"]),
    F.single("nav", "Điều hướng", "Navigation:", [
      { v: "bottom", label: "Tab dưới", en: "a bottom tab bar" },
      { v: "sidebar", label: "Sidebar", en: "a side drawer" },
      { v: "top", label: "Tab trên", en: "top tabs" },
      { v: "none", label: "Không", en: "no persistent navigation" },
    ], "bottom"),
  ],
  feed: [
    F.single("item", "Loại nội dung", "A feed of", [
      { v: "social", label: "Bài mạng xã hội", en: "social posts" },
      { v: "news", label: "Tin tức", en: "news articles" },
      { v: "video", label: "Video", en: "videos" },
      { v: "product", label: "Sản phẩm", en: "products" },
    ], "social"),
    F.clauses("actions", "Tương tác", [
      { v: "like", label: "Like", en: "Each item has a like action." },
      { v: "comment", label: "Comment", en: "Each item has a comment action." },
      { v: "share", label: "Share", en: "Each item has a share action." },
      { v: "save", label: "Save", en: "Each item has a save/bookmark action." },
      { v: "story", label: "Story trên cùng", en: "Show a stories bar at the top." },
    ], ["like", "comment", "share"]),
  ],
  detail: [
    F.multi("sections", "Thành phần", "Include:", [
      { v: "gallery", label: "Ảnh lớn/gallery", en: "a large image or gallery" },
      { v: "title", label: "Tiêu đề", en: "a title" },
      { v: "rating", label: "Đánh giá sao", en: "a star rating" },
      { v: "desc", label: "Mô tả", en: "a description" },
      { v: "specs", label: "Thông số", en: "a specs/attributes section" },
      { v: "related", label: "Liên quan", en: "a related-items section" },
      { v: "comments", label: "Bình luận", en: "a comments/reviews section" },
    ], ["gallery", "title", "rating", "desc"]),
    F.text("cta", "Nút hành động chính", "Primary action button labeled:", "vd: Đặt ngay, Thêm giỏ, Liên hệ..."),
  ],
  search: [
    F.multi("filters", "Bộ lọc", "Provide filters for", [
      { v: "price", label: "Giá", en: "price" },
      { v: "category", label: "Danh mục", en: "category" },
      { v: "rating", label: "Đánh giá", en: "rating" },
      { v: "distance", label: "Khoảng cách", en: "distance" },
      { v: "sort", label: "Sắp xếp", en: "sorting" },
    ], ["category", "price", "sort"]),
    F.clauses("extras", "Thành phần thêm", [
      { v: "recent", label: "Tìm gần đây", en: "Show recent searches." },
      { v: "suggest", label: "Gợi ý", en: "Show search suggestions." },
      { v: "voice", label: "Giọng nói", en: "Include a voice-search button." },
    ], ["recent", "suggest"]),
  ],
  profile: [
    F.multi("sections", "Hiển thị", "Include:", [
      { v: "avatar", label: "Avatar + tên", en: "a large avatar and name" },
      { v: "stats", label: "Thống kê", en: "a stats row" },
      { v: "edit", label: "Nút sửa hồ sơ", en: "an edit-profile button" },
      { v: "menu", label: "Menu chức năng", en: "a list of menu options" },
      { v: "orders", label: "Đơn hàng", en: "an orders shortcut" },
      { v: "wallet", label: "Ví/điểm", en: "a wallet/points section" },
      { v: "badges", label: "Huy hiệu", en: "achievement badges" },
    ], ["avatar", "stats", "edit", "menu"]),
  ],
  settings: [
    F.multi("groups", "Nhóm cài đặt", "Include setting groups:", [
      { v: "account", label: "Tài khoản", en: "Account" },
      { v: "notif", label: "Thông báo", en: "Notifications" },
      { v: "privacy", label: "Quyền riêng tư", en: "Privacy" },
      { v: "appearance", label: "Giao diện", en: "Appearance (light/dark)" },
      { v: "language", label: "Ngôn ngữ", en: "Language" },
      { v: "security", label: "Bảo mật", en: "Security" },
      { v: "help", label: "Trợ giúp", en: "Help & Support" },
      { v: "logout", label: "Đăng xuất", en: "Log out" },
    ], ["account", "notif", "privacy", "appearance", "logout"]),
  ],
  notifications: [
    F.clauses("layout", "Bố cục", [
      { v: "tabs", label: "Tab Tất cả/Chưa đọc", en: "Show an All / Unread segmented tab." },
      { v: "group", label: "Nhóm theo ngày", en: "Group notifications by day." },
    ], ["tabs"]),
    F.multi("types", "Loại thông báo", "Notification types:", [
      { v: "order", label: "Đơn hàng", en: "order updates" },
      { v: "promo", label: "Khuyến mãi", en: "promotions" },
      { v: "system", label: "Hệ thống", en: "system alerts" },
      { v: "social", label: "Tương tác", en: "social interactions" },
    ], ["order", "promo", "system"]),
  ],
  productlist: [
    F.single("layout", "Bố cục", "Layout:", [
      { v: "grid2", label: "Lưới 2 cột", en: "a two-column product grid" },
      { v: "list", label: "Danh sách", en: "a single-column list" },
      { v: "grid1", label: "Lưới 1 cột lớn", en: "a large single-column grid" },
    ], "grid2"),
    F.multi("card", "Trên mỗi thẻ SP", "Each product card shows", [
      { v: "image", label: "Ảnh", en: "image" },
      { v: "name", label: "Tên", en: "name" },
      { v: "price", label: "Giá", en: "price" },
      { v: "discount", label: "Giảm giá", en: "a discount badge" },
      { v: "rating", label: "Đánh giá", en: "rating" },
      { v: "fav", label: "Yêu thích", en: "a favorite icon" },
      { v: "add", label: "Thêm giỏ", en: "an add-to-cart button" },
    ], ["image", "name", "price", "rating", "add"]),
    F.clauses("top", "Trên cùng", [
      { v: "chips", label: "Chips danh mục", en: "Show category filter chips at the top." },
      { v: "sort", label: "Sắp xếp", en: "Show a sort control." },
      { v: "search", label: "Tìm kiếm", en: "Show a search bar." },
    ], ["chips", "search"]),
  ],
  productdetail: [
    F.multi("options", "Tuỳ chọn / nội dung", "Include:", [
      { v: "gallery", label: "Ảnh gallery", en: "an image gallery" },
      { v: "size", label: "Chọn size", en: "a size selector" },
      { v: "color", label: "Chọn màu", en: "a color selector" },
      { v: "qty", label: "Số lượng", en: "a quantity stepper" },
      { v: "rating", label: "Đánh giá", en: "ratings and reviews" },
      { v: "desc", label: "Mô tả", en: "a description" },
      { v: "specs", label: "Thông số", en: "specifications" },
      { v: "related", label: "Mua kèm", en: "related products" },
    ], ["gallery", "size", "color", "qty", "desc"]),
    F.multi("cta", "Nút hành động", "Action buttons:", [
      { v: "cart", label: "Thêm giỏ", en: "Add to Cart" },
      { v: "buy", label: "Mua ngay", en: "Buy Now" },
      { v: "fav", label: "Yêu thích", en: "Favorite" },
    ], ["cart", "buy"]),
  ],
  cart: [
    F.multi("features", "Tính năng", "Include:", [
      { v: "qty", label: "Sửa số lượng", en: "quantity steppers" },
      { v: "remove", label: "Xoá món", en: "remove buttons" },
      { v: "select", label: "Chọn từng món", en: "per-item checkboxes" },
      { v: "promo", label: "Mã giảm giá", en: "a promo-code field" },
      { v: "ship", label: "Ước tính ship", en: "a shipping estimate" },
      { v: "upsell", label: "Mua kèm", en: "a 'you may also like' section" },
      { v: "summary", label: "Tổng tiền", en: "an order summary with total" },
    ], ["qty", "remove", "promo", "summary"]),
  ],
  checkout: [
    F.multi("steps", "Các phần", "Include:", [
      { v: "address", label: "Địa chỉ", en: "a shipping address" },
      { v: "shipping", label: "Vận chuyển", en: "a delivery-method selector" },
      { v: "payment", label: "Thanh toán", en: "a payment-method section" },
      { v: "review", label: "Xem lại đơn", en: "an order review/summary" },
    ], ["address", "shipping", "payment", "review"]),
    F.multi("pay", "Phương thức thanh toán", "Payment methods:", [
      { v: "card", label: "Thẻ", en: "credit/debit card" },
      { v: "wallet", label: "Ví điện tử", en: "e-wallet" },
      { v: "cod", label: "COD", en: "cash on delivery" },
      { v: "bank", label: "Chuyển khoản", en: "bank transfer" },
      { v: "installment", label: "Trả góp", en: "installment" },
    ], ["card", "wallet", "cod"]),
  ],
  chat: [
    F.multi("features", "Tính năng", "Support:", [
      { v: "image", label: "Gửi ảnh", en: "image messages" },
      { v: "voice", label: "Voice", en: "voice messages" },
      { v: "emoji", label: "Emoji", en: "emoji reactions" },
      { v: "seen", label: "Đã xem", en: "read receipts" },
      { v: "typing", label: "Đang nhập", en: "a typing indicator" },
      { v: "reply", label: "Trả lời", en: "reply-to-message" },
    ], ["image", "seen", "typing"]),
    F.clauses("header", "Trên đầu", [
      { v: "avatar", label: "Avatar + tên", en: "Show the contact avatar and name in the top bar." },
      { v: "online", label: "Trạng thái online", en: "Show an online status." },
      { v: "call", label: "Nút gọi/video", en: "Show call and video-call buttons." },
    ], ["avatar", "online", "call"]),
  ],
  chatlist: [
    F.multi("row", "Mỗi dòng chat", "Each row shows", [
      { v: "avatar", label: "Avatar", en: "an avatar" },
      { v: "name", label: "Tên", en: "a name" },
      { v: "last", label: "Tin cuối", en: "the last message" },
      { v: "time", label: "Thời gian", en: "a timestamp" },
      { v: "badge", label: "Badge chưa đọc", en: "an unread badge" },
      { v: "online", label: "Chấm online", en: "an online dot" },
    ], ["avatar", "name", "last", "time", "badge"]),
    F.clauses("extras", "Thành phần thêm", [
      { v: "search", label: "Tìm kiếm", en: "Show a search bar." },
      { v: "stories", label: "Story trên cùng", en: "Show a stories/active-users row on top." },
    ], ["search"]),
  ],
  map: [
    F.clauses("features", "Tính năng", [
      { v: "pins", label: "Pin địa điểm", en: "Show location pins on the map." },
      { v: "search", label: "Thanh tìm kiếm", en: "Show a floating search bar on top." },
      { v: "sheet", label: "Thẻ chi tiết", en: "Show a bottom-sheet card with place details." },
      { v: "directions", label: "Chỉ đường", en: "Include a directions button." },
      { v: "filter", label: "Lọc", en: "Include category filters." },
      { v: "myloc", label: "Vị trí của tôi", en: "Include a 'my location' button." },
    ], ["pins", "search", "sheet"]),
  ],
};

/* ---------- Gợi ý nội dung riêng cho từng màn (placeholder ô ghi chú) ---------- */
const HINTS = {
  login: "vd: thêm đăng nhập bằng số điện thoại, nút 'ghi nhớ đăng nhập'...",
  signup: "vd: thêm trường ngày sinh, mã giới thiệu, chọn vai trò...",
  home: "vd: các widget/thẻ cần có: doanh thu, biểu đồ, KPI, đơn gần đây, thao tác nhanh...",
  feed: "vd: mỗi bài có like/comment/share, thanh story trên cùng, quảng cáo xen kẽ...",
  detail: "vd: thông tin cần hiển thị, tab đánh giá, sản phẩm liên quan, nút hành động...",
  search: "vd: bộ lọc theo giá/danh mục/đánh giá, gợi ý tìm kiếm, lịch sử...",
  profile: "vd: các mục: đơn hàng, ví, yêu thích, huy hiệu, mời bạn bè...",
  settings: "vd: nhóm cài đặt cần có, đổi ngôn ngữ, chủ đề sáng/tối, bảo mật 2 lớp...",
  notifications: "vd: nhóm theo ngày, loại thông báo (đơn hàng, khuyến mãi, hệ thống)...",
  productlist: "vd: kiểu thẻ sản phẩm, nhãn giảm giá, nút yêu thích, sắp xếp...",
  productdetail: "vd: chọn size/màu, đánh giá sao, ảnh 360, thông số kỹ thuật...",
  cart: "vd: mã giảm giá, chọn từng món, ước tính phí ship, gợi ý mua kèm...",
  checkout: "vd: các bước thanh toán, phương thức (thẻ, ví, COD), điểm tích luỹ...",
  chat: "vd: gửi ảnh/voice, trạng thái đã xem, biểu tượng cảm xúc, ghim tin nhắn...",
  chatlist: "vd: nhóm chat, trạng thái online, tin nhắn nháp, lọc chưa đọc...",
  map: "vd: các loại pin, lọc theo khoảng cách, chỉ đường, đánh giá địa điểm...",
};
const HINT_DEFAULT = "vd: các thành phần / nội dung cụ thể bạn muốn có trên màn này...";

/* ---------- State: dự án ---------- */
const LS_KEY = "ui-prompt-studio-v1";              // key cũ (để migrate)
const OLD_PROJ_KEY = "ui-prompt-studio-projects-v1"; // key cũ (để migrate)
const PROJ_KEY = "ups-projects-v2";
const ACTIVE_KEY = "ups-active-project";
const MAX_SELECT = 3;

const DEFAULT_STYLE = {
  platform: "ios", design: "minimal", mode: "light", fidelity: "high",
  aspect: "phone", textlang: "vi", color: "#2F80ED", extra: "",
  appContext: "", refMode: false, refFollow: "style",
};

let projects = {};   // id -> project
let state = null;    // = project đang mở (chứa style/selected/notes/fields/custom/features + meta)

function blankProject(name) {
  return {
    id: "p" + Date.now() + Math.floor(Math.random() * 1000),
    name: name || "Dự án mới",
    createdAt: Date.now(), updatedAt: Date.now(),
    style: Object.assign({}, DEFAULT_STYLE),
    selected: {}, notes: {}, fields: {}, custom: [],
    flagged: {},  // màn thuộc dự án (từ feature list) -> hiện nhóm riêng trên đầu
    features: [], // các dòng CSV đã import: {feature, screen, note, matchedId}
  };
}

/* Lấy/đặt giá trị câu trả lời cho 1 field của 1 màn */
function fieldVal(screen, f) {
  const s = state.fields[screen.id];
  return (s && (f.key in s)) ? s[f.key] : f.default;
}
function setFieldVal(screen, f, val) {
  if (!state.fields[screen.id]) state.fields[screen.id] = {};
  state.fields[screen.id][f.key] = val; save();
}
/* Ghép tất cả câu trả lời của 1 màn thành chuỗi mô tả (gồm cả ô "Khác") */
function compileFields(screen) {
  const defs = SCREEN_FIELDS[screen.id];
  if (!defs) return "";
  const store = state.fields[screen.id] || {};
  return defs.map(f => {
    let out = f.compile(fieldVal(screen, f));
    if (f.allowOther) {
      const other = (store[f.key + "__other"] || "").trim();
      const items = other ? other.split(",").map(x => x.trim()).filter(Boolean) : [];
      if (items.length) {
        if (f.kind === "list") {
          out = out ? out.replace(/\.\s*$/, "") + ", " + items.join(", ") + "."
                    : f.lead + " " + items.join(", ") + ".";
        } else {
          out = (out ? out + " " : "") + "Also include: " + items.join(", ") + ".";
        }
      }
    }
    return out;
  }).filter(Boolean).join(" ");
}
/* Nội dung màn = base + câu trả lời (dùng cho cả 2 chế độ xuất) */
function screenContent(screen) {
  const fc = compileFields(screen);
  return screen.base + (fc ? " " + fc : "");
}

/* Tỉ lệ rút gọn của từng màn (dùng cho chế độ gộp) */
const ASPECT_SHORT = {
  phone: "9:19.5 portrait",
  "phone-frame": "9:19.5 portrait (inside a phone frame)",
  tablet: "4:3 landscape",
  desktop: "16:9 landscape",
};

function loadAll() {
  try { projects = JSON.parse(localStorage.getItem(PROJ_KEY) || "{}"); } catch (e) { projects = {}; }
  // Migration từ bản cũ (working state + snapshots) -> dự án v2
  try {
    if (!Object.keys(projects).length) {
      const oldRaw = localStorage.getItem(LS_KEY);
      if (oldRaw) {
        const old = JSON.parse(oldRaw);
        const p = blankProject("Dự án đầu tiên");
        p.style = Object.assign({}, DEFAULT_STYLE, old.style || {});
        p.selected = old.selected || {}; p.notes = old.notes || {};
        p.fields = old.fields || {}; p.custom = old.custom || [];
        projects[p.id] = p;
      }
      const oldProjRaw = localStorage.getItem(OLD_PROJ_KEY);
      if (oldProjRaw) {
        const oldProjs = JSON.parse(oldProjRaw);
        Object.keys(oldProjs).forEach(name => {
          const s = oldProjs[name];
          const p = blankProject(name);
          p.style = Object.assign({}, DEFAULT_STYLE, s.style || {});
          p.selected = s.selected || {}; p.notes = s.notes || {};
          p.fields = s.fields || {}; p.custom = s.custom || [];
          projects[p.id] = p;
        });
      }
      if (Object.keys(projects).length) saveAll();
      localStorage.removeItem(LS_KEY); localStorage.removeItem(OLD_PROJ_KEY);
    }
  } catch (e) { /* migration best-effort */ }
}
function saveAll() {
  try { localStorage.setItem(PROJ_KEY, JSON.stringify(projects)); } catch (e) {}
}
function save() {
  if (state) state.updatedAt = Date.now();
  saveAll();
}

/* ---------- Prompt building ---------- */
function opt(kind, v) { return (OPTIONS[kind].find(o => o.v === v) || OPTIONS[kind][0]).text; }

function stylePreamble() {
  const s = state.style;
  const parts = [
    opt("fidelity", s.fidelity),           // "a high-fidelity, ... realistic"
    "UI mockup of",
    opt("platform", s.platform) + ",",     // "an iOS iPhone app,"
  ];
  return parts.join(" ");
}

function appCtx() {
  const c = (state.style.appContext || "").trim();
  return c ? " Product context: " + c + "." : "";
}

/* Suffix khi KHÔNG dùng ảnh mẫu — mô tả style bằng chữ */
function styleSuffix() {
  const s = state.style;
  const bits = [
    "Design style: " + opt("design", s.design) + ".",
    "Color scheme: " + opt("mode", s.mode) + " with primary/accent color " + s.color + ".",
    opt("aspect", s.aspect) + ".",
    opt("textlang", s.textlang) + ".",
  ];
  if (s.extra && s.extra.trim()) bits.push(s.extra.trim() + ".");
  bits.push("Realistic placeholder content, consistent spacing, crisp icons, no lorem ipsum. Render as a polished single-screen mockup.");
  return bits.join(" ");
}

/* Suffix khi DÙNG ảnh mẫu — bắt model bám theo style của ảnh đính kèm */
function refSuffix() {
  const s = state.style;
  const follow = s.refFollow === "layout"
    ? "Also follow a layout and composition similar to the reference image."
    : "Use a layout appropriate for this screen — only the visual style must match the reference.";
  const bits = [
    "STYLE REFERENCE: I am attaching a reference image. Replicate its exact visual style — color palette, typography and font weights, iconography, corner radius, shadows, borders, spacing, and overall design language — so the result looks like it belongs to the same product.",
    follow,
    "Do NOT copy the reference's own text or screen content; create new, realistic content appropriate for this screen.",
    opt("aspect", s.aspect) + ".",
    opt("textlang", s.textlang) + ".",
  ];
  if (s.extra && s.extra.trim()) bits.push(s.extra.trim() + ".");
  bits.push("Render as a polished single-screen mockup. IMPORTANT: attach the style reference image to this message.");
  return bits.join(" ");
}

function buildPrompt(screen) {
  const note = (state.notes[screen.id] || "").trim();
  let p = "Create an image: " + stylePreamble() + " " + screenContent(screen) + appCtx();
  p += " " + (state.style.refMode ? refSuffix() : styleSuffix());
  if (note) p += " Additional requirements: " + note + ".";
  return p.replace(/\s+/g, " ").trim();
}

/* Chế độ gộp: 1 prompt yêu cầu vẽ nhiều màn trong CÙNG một ảnh.
   Tỉ lệ ảnh tổng theo số màn: 2 màn -> 1:1, 3 màn -> 16:9.
   Nội dung từng màn giữ CHI TIẾT đầy đủ như prompt đơn. */
function buildComposite(screens) {
  const s = state.style;
  const n = screens.length;
  const per = ASPECT_SHORT[s.aspect] || "9:19.5 portrait";
  const platformTxt = opt("platform", s.platform);
  const overall = n === 2
    ? "exactly 1:1 (a perfect square)"
    : "exactly 16:9 (wide landscape)";
  const lines = [];
  lines.push(
    "Create an image: ONE single image with an overall aspect ratio of " + overall +
    ", containing " + n + " different UI screens of " + platformTxt +
    " placed side by side in a single horizontal row, evenly spaced on a clean neutral background."
  );
  lines.push(
    "Each screen is " + opt("fidelity", s.fidelity) + " UI mockup with a " + per +
    " aspect ratio and a short title label above it."
  );
  if (s.refMode) {
    const follow = s.refFollow === "layout"
      ? "Also mirror the reference's layout/composition where appropriate."
      : "Match only the visual style of the reference; use a layout suited to each screen.";
    lines.push(
      "STYLE: Apply the EXACT visual style of the attached reference image to ALL screens — same color palette, " +
      "typography, iconography, corner radius, shadows and spacing — so every screen looks like the same product. " +
      follow + " Do NOT copy the reference's own content. (Attach the reference image to this message.)"
    );
  } else {
    lines.push(
      "STYLE (identical across all screens): " + opt("design", s.design) + "; " +
      opt("mode", s.mode) + " with primary/accent color " + s.color + "."
    );
  }
  if (s.appContext && s.appContext.trim()) lines.push("Product context: " + s.appContext.trim() + ".");
  lines.push(opt("textlang", s.textlang) + ". Realistic content, consistent spacing, crisp icons, no lorem ipsum.");
  if (s.extra && s.extra.trim()) lines.push(s.extra.trim() + ".");
  lines.push(
    "IMPORTANT: Render EVERY screen fully detailed, as if each were a standalone high-fidelity mockup. " +
    "Do NOT simplify, crop, or omit any of the components listed for each screen below."
  );
  lines.push("The " + n + " screens, in order:");
  screens.forEach((sc, i) => {
    const note = (state.notes[sc.id] || "").trim();
    lines.push((i + 1) + ") " + sc.name + " — " + screenContent(sc) +
      (note ? " Additional requirements: " + note + "." : ""));
  });
  return lines.join("\n");
}

/* ---------- All screens (built-in + custom) ---------- */
function allScreens() { return SCREENS.concat(state.custom); }

/* ---------- Rendering ---------- */
const $ = sel => document.querySelector(sel);

function fillSelect(id, kind) {
  const el = document.getElementById(id);
  el.innerHTML = OPTIONS[kind].map(o => `<option value="${o.v}">${o.label}</option>`).join("");
}

/* Đồng bộ giá trị từ state -> các ô nhập (không gắn listener) */
function syncStyleInputs() {
  if (!state) return;
  const s = state.style;
  $("#s_platform").value = s.platform;
  $("#s_design").value = s.design;
  $("#s_mode").value = s.mode;
  $("#s_fidelity").value = s.fidelity;
  $("#s_aspect").value = s.aspect;
  $("#s_textlang").value = s.textlang;
  $("#s_color").value = s.color;
  $("#s_color_hex").value = s.color;
  $("#s_extra").value = s.extra;
  $("#s_appctx").value = s.appContext;
  $("#s_refmode").checked = !!s.refMode;
  $("#s_reffollow").value = s.refFollow;
}

/* Bật/tắt hiển thị các trường tuỳ theo chế độ ảnh mẫu */
function updateRefUI() {
  if (!state) return;
  const on = !!state.style.refMode;
  $("#ref_opts").style.display = on ? "block" : "none";
  // Khi bám theo ảnh mẫu: ẩn các trường style-bằng-chữ để tránh xung đột
  ["field-design", "field-mode", "field-color"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = on ? "none" : "";
  });
}

function initStylePanel() {
  fillSelect("s_platform", "platform");
  fillSelect("s_design", "design");
  fillSelect("s_mode", "mode");
  fillSelect("s_fidelity", "fidelity");
  fillSelect("s_aspect", "aspect");
  fillSelect("s_textlang", "textlang");

  syncStyleInputs();

  const bind = (id, key) => document.getElementById(id).addEventListener("change", e => {
    state.style[key] = e.target.value; save(); renderLibrary();
  });
  bind("s_platform", "platform");
  bind("s_design", "design");
  bind("s_mode", "mode");
  bind("s_fidelity", "fidelity");
  bind("s_aspect", "aspect");
  bind("s_textlang", "textlang");
  bind("s_reffollow", "refFollow");

  $("#s_appctx").addEventListener("input", e => { state.style.appContext = e.target.value; save(); renderLibrary(); });
  $("#s_refmode").addEventListener("change", e => {
    state.style.refMode = e.target.checked; save(); updateRefUI(); renderLibrary();
  });

  $("#s_color").addEventListener("input", e => {
    state.style.color = e.target.value; $("#s_color_hex").value = e.target.value; save(); renderLibrary();
  });
  $("#s_color_hex").addEventListener("change", e => {
    const v = e.target.value.trim();
    if (/^#?[0-9a-fA-F]{6}$/.test(v)) {
      state.style.color = v.startsWith("#") ? v : "#" + v;
      $("#s_color").value = state.style.color;
    }
    e.target.value = state.style.color; save(); renderLibrary();
  });
  $("#s_extra").addEventListener("input", e => { state.style.extra = e.target.value; save(); renderLibrary(); });

  $("#reset_style").addEventListener("click", () => {
    state.style = Object.assign({}, DEFAULT_STYLE);
    save(); syncStyleInputs(); updateRefUI(); renderLibrary();
  });

  updateRefUI();
}

function renderLibrary() {
  if (!state) return;
  const q = ($("#search").value || "").toLowerCase().trim();
  const screens = allScreens().filter(s =>
    !q || s.name.toLowerCase().includes(q) || (s.desc || "").toLowerCase().includes(q) || s.id.includes(q)
  );

  const groupHTML = (title, items) => `<div class="group">
      <h3>${title} <span class="count">(${items.length})</span></h3>
      <div class="cards">
        ${items.map(cardHTML).join("")}
      </div>
    </div>`;

  // Màn thuộc dự án (từ feature list) hiện nhóm riêng trên đầu
  const flagged = screens.filter(s => state.flagged && state.flagged[s.id]);
  const rest = screens.filter(s => !(state.flagged && state.flagged[s.id]));
  const groups = [];
  rest.forEach(s => { if (!groups.includes(s.group)) groups.push(s.group); });

  const container = $("#library");
  container.innerHTML =
    ((flagged.length ? groupHTML("📌 Màn hình của dự án", flagged) : "") +
     groups.map(g => groupHTML(g, rest.filter(s => s.group === g))).join(""))
    || `<p style="color:var(--muted)">Không tìm thấy màn hình nào.</p>`;

  // wire up card events
  screens.forEach(s => {
    const root = document.getElementById("card-" + s.id);
    if (!root) return;
    root.querySelector(".chk").addEventListener("change", e => {
      if (e.target.checked && selectedScreens().length >= MAX_SELECT) {
        e.target.checked = false;
        alert("Tối đa " + MAX_SELECT + " màn mỗi lần tạo ảnh (để ảnh đủ chi tiết). Hãy bỏ chọn bớt hoặc tạo theo đợt.");
        return;
      }
      if (e.target.checked) state.selected[s.id] = true; else delete state.selected[s.id];
      root.classList.toggle("selected", !!state.selected[s.id]);
      save(); updateCount();
    });
    const noteEl = root.querySelector(".note");
    if (noteEl) noteEl.addEventListener("input", e => {
      state.notes[s.id] = e.target.value; save();
      root.querySelector(".preview").textContent = buildPrompt(s);
    });
    root.querySelector(".copy-one").addEventListener("click", e => {
      copyText(buildPrompt(s), e.target);
    });
    const rm = root.querySelector(".card-remove");
    if (rm) rm.addEventListener("click", () => {
      state.custom = state.custom.filter(c => c.id !== s.id);
      delete state.selected[s.id]; delete state.notes[s.id]; delete state.fields[s.id];
      if (state.flagged) delete state.flagged[s.id];
      save(); renderLibrary();
    });
    wireFields(root, s);
  });
  updateCount();
}

/* HTML các câu hỏi (chips / dropdown / ô nhập) cho 1 màn */
function renderFieldsHTML(screen) {
  const defs = SCREEN_FIELDS[screen.id];
  if (!defs) return "";
  const store = state.fields[screen.id] || {};
  const groups = defs.map(f => {
    const val = fieldVal(screen, f);
    let inner = "";
    if (f.type === "multi" || f.type === "single") {
      inner = `<div class="chips" data-key="${f.key}" data-multi="${f.type === "multi"}">` +
        f.options.map(o => {
          const active = f.type === "multi" ? (val || []).includes(o.v) : val === o.v;
          return `<button type="button" class="chip${active ? " active" : ""}" data-v="${escapeHtml(o.v)}">${escapeHtml(o.label || o.v)}</button>`;
        }).join("") + `</div>`;
    } else if (f.type === "select") {
      inner = `<select class="mini-select" data-key="${f.key}">` +
        f.options.map(o => `<option value="${escapeHtml(o.v)}"${val === o.v ? " selected" : ""}>${escapeHtml(o.label || o.v)}</option>`).join("") + `</select>`;
    } else if (f.type === "text") {
      inner = `<input type="text" class="mini-input" data-key="${f.key}" value="${escapeHtml(val || "")}" placeholder="${escapeHtml(f.placeholder || "")}" />`;
    }
    // Ô "Khác" cho các field cho phép tự điền
    let other = "";
    if (f.allowOther) {
      const ov = store[f.key + "__other"] || "";
      other = `<input type="text" class="other-input" data-key="${f.key}" value="${escapeHtml(ov)}" placeholder="＋ Khác (tự điền, cách nhau dấu phẩy)" />`;
    }
    return `<div class="fgroup"><div class="flabel">${escapeHtml(f.label)}</div>${inner}${other}</div>`;
  }).join("");
  return `<div class="fields">${groups}</div>`;
}

/* Gắn sự kiện cho các câu hỏi trong 1 thẻ */
function wireFields(root, screen) {
  const defs = SCREEN_FIELDS[screen.id];
  if (!defs) return;
  const refresh = () => { root.querySelector(".preview").textContent = buildPrompt(screen); };
  root.querySelectorAll(".chips").forEach(group => {
    const f = defs.find(d => d.key === group.getAttribute("data-key"));
    const multi = group.getAttribute("data-multi") === "true";
    group.querySelectorAll(".chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const v = btn.getAttribute("data-v");
        if (multi) {
          let cur = (fieldVal(screen, f) || []).slice();
          if (cur.includes(v)) cur = cur.filter(x => x !== v); else cur.push(v);
          setFieldVal(screen, f, cur);
          btn.classList.toggle("active");
        } else {
          setFieldVal(screen, f, v);
          group.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        }
        refresh();
      });
    });
  });
  root.querySelectorAll(".mini-select").forEach(sel => {
    const f = defs.find(d => d.key === sel.getAttribute("data-key"));
    sel.addEventListener("change", () => { setFieldVal(screen, f, sel.value); refresh(); });
  });
  root.querySelectorAll(".mini-input").forEach(inp => {
    const f = defs.find(d => d.key === inp.getAttribute("data-key"));
    inp.addEventListener("input", () => { setFieldVal(screen, f, inp.value); refresh(); });
  });
  root.querySelectorAll(".other-input").forEach(inp => {
    inp.addEventListener("input", () => {
      if (!state.fields[screen.id]) state.fields[screen.id] = {};
      state.fields[screen.id][inp.getAttribute("data-key") + "__other"] = inp.value;
      save(); refresh();
    });
  });
}

function cardHTML(s) {
  const checked = state.selected[s.id] ? "checked" : "";
  const selCls = state.selected[s.id] ? "selected" : "";
  const note = state.notes[s.id] || "";
  const hasFields = !!SCREEN_FIELDS[s.id];
  const noteLabel = hasFields ? "✏️ Yêu cầu thêm (ngoài các lựa chọn trên)" : "✏️ Nội dung riêng cho màn này (tuỳ chọn)";
  const notePh = hasFields ? "vd: điều gì đó chưa có trong các lựa chọn trên..." : (HINTS[s.id] || HINT_DEFAULT);
  const isCustom = ("" + s.id).startsWith("custom-");
  const removeBtn = isCustom ? `<button class="card-remove" title="Xoá màn này">✕</button>` : "";
  return `<div class="card ${selCls}" id="card-${s.id}">
    ${removeBtn}
    <div class="card-head">
      <input type="checkbox" class="chk" ${checked} />
      <div>
        <div class="card-title">${escapeHtml(s.name)}</div>
        <div class="card-desc">${escapeHtml(s.desc || "")}</div>
      </div>
    </div>
    ${renderFieldsHTML(s)}
    <div class="preview">${escapeHtml(buildPrompt(s))}</div>
    <span class="note-label">${noteLabel}</span>
    <textarea class="note" placeholder="${escapeHtml(notePh)}">${escapeHtml(note)}</textarea>
    <div class="card-actions">
      <button class="btn-primary btn-sm copy-one">📋 Copy prompt</button>
    </div>
  </div>`;
}

function selectedScreens() {
  return allScreens().filter(s => state.selected[s.id]);
}

function updateCount() {
  const n = selectedScreens().length;
  const info = $("#sel_info");
  if (n === 0) info.textContent = "Chưa chọn màn nào (tối đa " + MAX_SELECT + ")";
  else if (n === 1) info.innerHTML = "Đã chọn <b>1/" + MAX_SELECT + "</b> màn → ảnh dọc 9:19.5";
  else if (n === 2) info.innerHTML = "Đã chọn <b>2/" + MAX_SELECT + "</b> màn → 1 ảnh vuông 1:1";
  else info.innerHTML = "Đã chọn <b>3/" + MAX_SELECT + "</b> màn → 1 ảnh ngang 16:9";
}

/* Tự động: 1 màn -> prompt đơn (9:19.5); 2 màn -> gộp ảnh 1:1; 3 màn -> gộp ảnh 16:9 */
function buildAllText() {
  const sel = selectedScreens();
  if (sel.length <= 1) return sel.map(s => buildPrompt(s)).join("\n\n");
  return buildComposite(sel);
}

/* ---------- Clipboard ---------- */
function copyText(text, btn) {
  const done = () => {
    if (btn) {
      const old = btn.textContent;
      btn.textContent = "✓ Đã copy";
      btn.classList.add("btn-copied");
      setTimeout(() => { btn.textContent = old; btn.classList.remove("btn-copied"); }, 1400);
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta); if (cb) cb();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- Import feature list ---------- */
const KEYWORDS = {
  login: ["login", "log in", "sign in", "signin", "đăng nhập", "dang nhap"],
  signup: ["sign up", "signup", "register", "registration", "đăng ký", "dang ky", "tạo tài khoản"],
  forgot: ["forgot", "reset password", "quên mật khẩu", "quen mat khau"],
  otp: ["otp", "verification", "verify", "xác thực", "xac thuc", "mã xác nhận", "2fa"],
  welcome: ["onboarding", "welcome", "intro", "giới thiệu", "gioi thieu"],
  permission: ["permission", "quyền", "cấp quyền"],
  home: ["home", "dashboard", "trang chủ", "trang chu", "tổng quan", "bảng điều khiển"],
  feed: ["feed", "timeline", "news", "bảng tin", "danh sách bài", "tin tức"],
  detail: ["detail", "chi tiết", "chi tiet"],
  search: ["search", "tìm kiếm", "tim kiem", "lọc"],
  empty: ["empty state", "trạng thái rỗng"],
  profile: ["profile", "hồ sơ", "ho so", "tài khoản cá nhân"],
  editprofile: ["edit profile", "sửa hồ sơ", "chỉnh sửa thông tin"],
  settings: ["setting", "settings", "cài đặt", "cai dat", "tuỳ chọn"],
  notifications: ["notification", "thông báo", "thong bao"],
  productlist: ["product list", "products", "danh sách sản phẩm", "cửa hàng", "shop", "catalog", "sản phẩm"],
  productdetail: ["product detail", "chi tiết sản phẩm"],
  cart: ["cart", "giỏ hàng", "gio hang", "basket"],
  checkout: ["checkout", "payment", "thanh toán", "thanh toan", "đặt hàng"],
  paysuccess: ["order success", "payment success", "thành công", "đặt hàng thành công"],
  chat: ["chat", "message", "messaging", "nhắn tin", "tin nhắn"],
  chatlist: ["conversation list", "inbox", "danh sách chat", "hộp thư", "cuộc trò chuyện"],
  map: ["map", "bản đồ", "ban do", "location", "vị trí"],
};

/* ---------- CSV: template, parser, phân tích ---------- */
const CSV_TEMPLATE_ROWS = [
  ["Tính năng", "Màn hình", "Ghi chú"],
  ["Đăng nhập", "Login", "Chỉ đăng nhập bằng Google và Apple"],
  ["Đăng ký tài khoản", "Sign up", "Có mã giới thiệu"],
  ["Trang chủ", "Dashboard", "Hiện doanh thu, biểu đồ, KPI"],
  ["Giỏ hàng", "Cart", ""],
  ["Thanh toán", "Checkout", "Hỗ trợ COD và ví điện tử"],
  ["Chat với người bán", "Chat", ""],
  ["Đặt lịch hẹn", "Booking", "Chọn ngày giờ, xác nhận lịch"],
];
function downloadTemplate() {
  const csv = "\uFEFF" + CSV_TEMPLATE_ROWS.map(r =>
    r.map(c => /[",\n;]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c).join(",")
  ).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "feature-list-template.csv";
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* Parser CSV viết tay: hỗ trợ ngoặc kép, phẩy/; trong ô, xuống dòng trong ô, BOM */
function parseCSV(text) {
  text = ("" + text).replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // đoán dấu phân cách từ dòng đầu (Excel VN thường xuất ";")
  const firstLine = text.split("\n")[0] || "";
  const delim = (firstLine.split(";").length > firstLine.split(",").length) ? ";" : ",";
  const rows = []; let cur = [""], inQ = false, ci = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cur[ci] += '"'; i++; } else inQ = false;
      } else cur[ci] += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === delim) { cur.push(""); ci++; }
    else if (ch === "\n") { rows.push(cur); cur = [""]; ci = 0; }
    else cur[ci] += ch;
  }
  if (cur.length > 1 || cur[0].trim()) rows.push(cur);
  return rows.map(r => r.map(c => c.trim())).filter(r => r.some(c => c));
}

/* Nhận diện 1 chuỗi -> id màn template (ưu tiên cột Màn hình) */
function matchScreenId(screenName, featureName) {
  const tryMatch = txt => {
    if (!txt) return null;
    const low = txt.toLowerCase();
    for (const id in KEYWORDS) {
      if (KEYWORDS[id].some(k => low.includes(k))) return id;
    }
    return null;
  };
  return tryMatch(screenName) || tryMatch(featureName) || tryMatch((featureName || "") + " " + (screenName || ""));
}

/* Phân tích các dòng CSV -> [{feature, screen, note, matchedId}] */
function analyzeCSV(text) {
  const rows = parseCSV(text);
  if (!rows.length) return [];
  // xác định cột qua header (không phụ thuộc thứ tự); không có header -> 0,1,2
  let fi = 0, si = 1, ni = 2, start = 0;
  const head = rows[0].map(c => c.toLowerCase());
  const findCol = pats => head.findIndex(h => pats.some(p => h.includes(p)));
  const f = findCol(["tính năng", "tinh nang", "feature"]);
  const s = findCol(["màn hình", "man hinh", "screen"]);
  const n = findCol(["ghi chú", "ghi chu", "note", "mô tả", "mo ta"]);
  if (f >= 0 || s >= 0) { fi = f >= 0 ? f : 0; si = s >= 0 ? s : 1; ni = n >= 0 ? n : 2; start = 1; }
  const out = [];
  for (let i = start; i < rows.length; i++) {
    const r = rows[i];
    const feature = r[fi] || "", screen = r[si] || "", note = r[ni] || "";
    if (!feature && !screen) continue;
    out.push({ feature, screen, note, matchedId: matchScreenId(screen, feature) });
  }
  return out;
}

/* Áp kết quả phân tích vào dự án: đánh dấu màn thuộc dự án (flagged),
   tạo màn mới cho dòng lạ, điền ghi chú. KHÔNG tự tick chọn (giới hạn 3 màn/lần). */
function applyAnalysis(project, analysis) {
  if (!project.flagged) project.flagged = {};
  analysis.forEach((row, i) => {
    if (row.matchedId) {
      project.flagged[row.matchedId] = true;
      if (row.note) {
        const prev = (project.notes[row.matchedId] || "").trim();
        project.notes[row.matchedId] = prev ? (prev.replace(/\.?$/, "") + ". " + row.note) : row.note;
      }
    } else {
      // tên hiển thị ưu tiên cột Tính năng (thường là tiếng Việt, dễ hiểu hơn)
      const name = row.feature || row.screen;
      const screenEn = row.screen || row.feature;
      const id = "custom-csv-" + Date.now() + "-" + i;
      project.custom.push({ id, name, base: "a \"" + screenEn + "\" screen for this app.", group: "Tuỳ chỉnh", desc: "Từ feature list" });
      project.flagged[id] = true;
      if (row.note) project.notes[id] = row.note;
    }
  });
  project.features = (project.features || []).concat(analysis);
}

/* ---------- View router & Dashboard ---------- */
function showView(v) {
  $("#view_dashboard").style.display = v === "dashboard" ? "" : "none";
  $("#view_workspace").style.display = v === "workspace" ? "" : "none";
  $("#back_dash").style.display = v === "workspace" ? "" : "none";
  $("#proj_title").textContent = (v === "workspace" && state) ? "· " + state.name : "";
  $("#head_sub").textContent = v === "workspace"
    ? "Tinh chỉnh từng màn hình rồi Copy prompt dán vào ChatGPT."
    : "Thiết kế UI bằng prompt — quản lý theo dự án, miễn phí, không cần API.";
  if (v === "dashboard") renderDashboard();
}

function openProject(id) {
  if (!projects[id]) return;
  state = projects[id];
  if (!state.flagged) state.flagged = {};
  try { localStorage.setItem(ACTIVE_KEY, id); } catch (e) {}
  syncStyleInputs(); updateRefUI(); renderLibrary();
  showView("workspace");
}

function fmtDate(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleDateString("vi-VN") + " " + d.toTimeString().slice(0, 5);
}

function renderDashboard() {
  const grid = $("#proj_grid");
  const list = Object.values(projects).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  let lastId = null;
  try { lastId = localStorage.getItem(ACTIVE_KEY); } catch (e) {}
  const cards = list.map(p => {
    const nScr = Object.keys(p.flagged || {}).length || Object.keys(p.selected || {}).length;
    const recent = p.id === lastId ? ` <span style="color:var(--ok);font-size:11px;">· mở gần đây</span>` : "";
    return `<div class="pcard" data-id="${p.id}">
      <div class="pc-name">${escapeHtml(p.name)}${recent}</div>
      <div class="pc-meta">${nScr} màn hình · sửa ${fmtDate(p.updatedAt)}</div>
      <div class="pc-actions">
        <button class="btn-primary btn-sm p-open">Mở</button>
        <button class="btn-ghost btn-sm p-rename" title="Đổi tên">✎</button>
        <button class="btn-ghost btn-sm p-dup" title="Nhân bản">⧉</button>
        <button class="btn-ghost btn-sm p-del" title="Xoá">🗑</button>
      </div>
    </div>`;
  }).join("");
  grid.innerHTML = cards +
    `<div class="pcard pcard-new" id="pcard_new">＋ Tạo dự án mới</div>` +
    (list.length ? "" : `<div class="dash-empty">Chưa có dự án nào — bấm "＋ Tạo dự án mới" để bắt đầu, hoặc tải CSV template để điền feature list trước.</div>`);

  grid.querySelectorAll(".pcard[data-id]").forEach(card => {
    const id = card.getAttribute("data-id");
    card.querySelector(".p-open").addEventListener("click", () => openProject(id));
    card.querySelector(".p-rename").addEventListener("click", () => {
      const name = prompt("Tên mới cho dự án:", projects[id].name);
      if (name && name.trim()) { projects[id].name = name.trim(); projects[id].updatedAt = Date.now(); saveAll(); renderDashboard(); }
    });
    card.querySelector(".p-dup").addEventListener("click", () => {
      const src = projects[id];
      const copy = JSON.parse(JSON.stringify(src));
      copy.id = "p" + Date.now() + Math.floor(Math.random() * 1000);
      copy.name = src.name + " (bản sao)";
      copy.createdAt = copy.updatedAt = Date.now();
      projects[copy.id] = copy; saveAll(); renderDashboard();
    });
    card.querySelector(".p-del").addEventListener("click", () => {
      if (!confirm("Xoá dự án \"" + projects[id].name + "\"? Hành động này không hoàn tác được.")) return;
      delete projects[id]; saveAll(); renderDashboard();
    });
  });
  const newCard = $("#pcard_new");
  if (newCard) newCard.addEventListener("click", () => openCsvDialog("create"));
}

/* ---------- Dialog CSV (tạo dự án / import vào dự án đang mở) ---------- */
let csvMode = "create"; // "create" | "import"
let csvAnalysis = null;

function openCsvDialog(mode) {
  csvMode = mode; csvAnalysis = null;
  $("#csv_title").textContent = mode === "create" ? "＋ Tạo dự án mới" : "📥 Import CSV vào dự án";
  $("#csv_name_field").style.display = mode === "create" ? "" : "none";
  $("#csv_apply").textContent = mode === "create" ? "Tạo dự án" : "Áp dụng vào dự án";
  $("#csv_proj_name").value = "";
  $("#csv_file").value = "";
  $("#csv_text").value = "";
  $("#csv_preview").innerHTML = "";
  $("#dlg_csv").showModal();
}

function renderCsvPreview(analysis) {
  const nameOf = id => { const sc = allScreensStatic().find(s => s.id === id); return sc ? sc.name : id; };
  if (!analysis.length) {
    $("#csv_preview").innerHTML = `<div class="csv-summary">Không đọc được dòng nào — kiểm tra lại nội dung/định dạng CSV.</div>`;
    return;
  }
  const rows = analysis.map(r => `<tr>
    <td>${escapeHtml(r.feature || "")}</td>
    <td>${escapeHtml(r.screen || "")}</td>
    <td>${r.matchedId ? `<span class="map-ok">✓ ${escapeHtml(nameOf(r.matchedId))}</span>` : `<span class="map-new">＋ Màn mới</span>`}</td>
    <td>${escapeHtml(r.note || "")}</td>
  </tr>`).join("");
  const matched = analysis.filter(r => r.matchedId).length;
  $("#csv_preview").innerHTML =
    `<table><thead><tr><th>Tính năng</th><th>Màn hình</th><th>Map thành</th><th>Ghi chú</th></tr></thead><tbody>${rows}</tbody></table>` +
    `<div class="csv-summary">✅ ${matched} màn nhận diện được · ➕ ${analysis.length - matched} màn mới sẽ được tạo. Ghi chú sẽ tự điền vào ô "Yêu cầu thêm" của màn tương ứng.</div>`;
}

/* Danh sách template gốc (không phụ thuộc dự án đang mở — dùng cho preview) */
function allScreensStatic() { return SCREENS; }

/* ---------- Toolbar & actions ---------- */
function initTheme() {
  const btn = $("#theme_toggle");
  const cur = () => document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  const upd = () => { btn.textContent = cur() === "light" ? "🌙 Tối" : "☀️ Sáng"; };
  upd();
  btn.addEventListener("click", () => {
    const next = cur() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("ui-theme", next); } catch (e) {}
    upd();
  });
}

function initActions() {
  $("#search").addEventListener("input", renderLibrary);

  $("#clear_all").addEventListener("click", () => { if (!state) return; state.selected = {}; save(); renderLibrary(); });

  $("#copy_all").addEventListener("click", e => {
    if (selectedScreens().length === 0) { alert("Hãy chọn ít nhất 1 màn hình."); return; }
    copyText(buildAllText(), e.target);
  });

  const dlgP = $("#dlg_preview");
  $("#preview_all").addEventListener("click", () => {
    if (selectedScreens().length === 0) { alert("Hãy chọn ít nhất 1 màn hình."); return; }
    $("#preview_content").textContent = buildAllText();
    dlgP.showModal();
  });
  $("#close_preview").addEventListener("click", () => dlgP.close());
  $("#copy_from_preview").addEventListener("click", e => copyText(buildAllText(), e.target));

  // add custom
  const dlgA = $("#dlg_add");
  $("#add_custom").addEventListener("click", () => { $("#c_name").value = ""; $("#c_desc").value = ""; dlgA.showModal(); });
  $("#close_add").addEventListener("click", () => dlgA.close());
  $("#save_add").addEventListener("click", () => {
    const name = $("#c_name").value.trim();
    const desc = $("#c_desc").value.trim();
    if (!name || !desc) { alert("Nhập cả tên và mô tả bố cục."); return; }
    const id = "custom-" + Date.now();
    state.custom.push({ id, name, base: desc, group: "Tuỳ chỉnh", desc: "Màn tự định nghĩa" });
    state.selected[id] = true;
    save(); dlgA.close(); renderLibrary();
  });

  // dashboard & điều hướng
  $("#back_dash").addEventListener("click", () => showView("dashboard"));
  $("#new_project").addEventListener("click", () => openCsvDialog("create"));
  $("#dl_template").addEventListener("click", downloadTemplate);
  $("#dl_template2").addEventListener("click", e => { e.preventDefault(); downloadTemplate(); });

  // dialog CSV (tạo dự án / import)
  const dlgCsv = $("#dlg_csv");
  $("#import_features").addEventListener("click", () => openCsvDialog("import"));
  $("#csv_close").addEventListener("click", () => dlgCsv.close());

  const getCsvText = cb => {
    const file = $("#csv_file").files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => cb("" + reader.result);
      reader.onerror = () => cb("");
      reader.readAsText(file, "utf-8");
    } else cb($("#csv_text").value || "");
  };

  $("#csv_analyze").addEventListener("click", () => {
    getCsvText(text => {
      if (!text.trim()) { alert("Chọn file CSV hoặc dán nội dung trước."); return; }
      csvAnalysis = analyzeCSV(text);
      renderCsvPreview(csvAnalysis);
    });
  });

  $("#csv_apply").addEventListener("click", () => {
    const finish = analysis => {
      if (csvMode === "create") {
        const name = $("#csv_proj_name").value.trim();
        if (!name) { alert("Nhập tên dự án."); return; }
        const p = blankProject(name);
        if (analysis && analysis.length) applyAnalysis(p, analysis);
        projects[p.id] = p; saveAll();
        dlgCsv.close();
        openProject(p.id);
      } else {
        if (!analysis || !analysis.length) { alert("Chưa có dữ liệu — bấm Phân tích trước, hoặc chọn file/dán nội dung."); return; }
        applyAnalysis(state, analysis); save();
        dlgCsv.close();
        renderLibrary();
      }
    };
    // nếu người dùng chưa bấm Phân tích nhưng có nội dung -> tự phân tích
    if (csvAnalysis) finish(csvAnalysis);
    else getCsvText(text => finish(text.trim() ? analyzeCSV(text) : []));
  });
}

/* ---------- Service worker (offline + install) ---------- */
/* Chỉ chạy khi phục vụ qua http/https (không chạy khi mở file:// trực tiếp) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline vẫn dùng bản cache cũ */ });
  });
}

/* ---------- Boot ---------- */
loadAll();
initTheme();
initStylePanel();
initActions();
showView("dashboard");
