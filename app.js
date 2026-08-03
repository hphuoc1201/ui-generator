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
  // ----- Auth -----
  { id: "login", group: "Xác thực", name: "Đăng nhập (Login)", desc: "Email/mật khẩu, nút đăng nhập, social login",
    base: "a Login screen with a logo/app name at top, email and password input fields, a 'forgot password' link, a primary Sign In button, social login buttons (Google, Apple), and a 'sign up' link at the bottom." },
  { id: "signup", group: "Xác thực", name: "Đăng ký (Sign up)", desc: "Form tạo tài khoản",
    base: "a Sign Up / registration screen with full name, email, password and confirm-password fields, a terms-of-service checkbox, a primary Create Account button, and a link to log in." },
  { id: "forgot", group: "Xác thực", name: "Quên mật khẩu", desc: "Nhập email để đặt lại",
    base: "a Forgot Password screen with an illustration, a short instruction text, a single email input field, and a Send Reset Link button." },
  { id: "otp", group: "Xác thực", name: "Xác thực OTP", desc: "6 ô nhập mã",
    base: "an OTP verification screen with a title, a subtitle showing where the code was sent, six single-digit code input boxes, a resend-code countdown, and a Verify button." },

  // ----- Onboarding -----
  { id: "welcome", group: "Onboarding", name: "Welcome / Giới thiệu", desc: "Slide onboarding có minh hoạ",
    base: "an onboarding welcome screen with a large friendly illustration, a headline, a short descriptive paragraph, page-indicator dots, a Skip button, and a Next / Get Started button." },
  { id: "permission", group: "Onboarding", name: "Xin quyền", desc: "Yêu cầu quyền thông báo/vị trí",
    base: "a permission request screen with an icon, a title explaining why the permission is needed, a short description, an Allow button and a 'Maybe later' text button." },

  // ----- Core -----
  { id: "home", group: "Màn chính", name: "Trang chủ / Dashboard", desc: "Header, search, cards, bottom nav",
    base: "a Home / dashboard screen with a top greeting header and avatar, a search bar, horizontally scrollable category chips, a grid or list of content cards, and a bottom tab navigation bar." },
  { id: "feed", group: "Màn chính", name: "Feed / Danh sách", desc: "Danh sách bài viết cuộn dọc",
    base: "a scrollable feed/list screen with a top bar, a vertical list of content cards each with thumbnail, title, subtitle and metadata, pull-to-refresh, and a bottom navigation bar." },
  { id: "detail", group: "Màn chính", name: "Màn chi tiết", desc: "Ảnh lớn, tiêu đề, mô tả, CTA",
    base: "a detail screen with a large hero image at top, a back button, a title, rating/metadata row, a description section, and a fixed primary action button at the bottom." },
  { id: "search", group: "Màn chính", name: "Tìm kiếm + kết quả", desc: "Search bar, filter, kết quả",
    base: "a search screen with an active search bar at top, recent-search chips, filter and sort controls, and a list/grid of search results below." },
  { id: "empty", group: "Màn chính", name: "Trạng thái rỗng (Empty)", desc: "Chưa có dữ liệu",
    base: "an empty-state screen with a centered illustration, a friendly headline, a short helpful sentence, and a primary call-to-action button to add the first item." },

  // ----- User -----
  { id: "profile", group: "Người dùng", name: "Hồ sơ (Profile)", desc: "Avatar, thông tin, thống kê",
    base: "a user profile screen with a large avatar, name and username, a stats row (followers, following, posts), an Edit Profile button, and a list of menu options below." },
  { id: "editprofile", group: "Người dùng", name: "Sửa hồ sơ", desc: "Form chỉnh sửa thông tin",
    base: "an edit-profile screen with an editable avatar with a camera icon, labeled input fields for name, bio, email and phone, and a Save button in the top bar." },
  { id: "settings", group: "Người dùng", name: "Cài đặt (Settings)", desc: "Danh sách nhóm cài đặt, toggle",
    base: "a settings screen with grouped list sections (Account, Notifications, Privacy, About), each row with an icon, label, and a chevron or a toggle switch." },
  { id: "notifications", group: "Người dùng", name: "Thông báo", desc: "Danh sách thông báo",
    base: "a notifications screen with a title, a segmented tab (All / Unread), and a vertical list of notification items each with an icon/avatar, text, and timestamp." },

  // ----- Commerce -----
  { id: "productlist", group: "Bán hàng", name: "Danh sách sản phẩm", desc: "Lưới sản phẩm, filter",
    base: "a product listing screen with a search bar, category filter chips, and a two-column grid of product cards each showing image, name, price, and a small add-to-cart icon." },
  { id: "productdetail", group: "Bán hàng", name: "Chi tiết sản phẩm", desc: "Ảnh, giá, size, mua",
    base: "a product detail screen with a large product image carousel, product title, price, rating, color/size selectors, a quantity stepper, a description, and Add to Cart / Buy Now buttons at the bottom." },
  { id: "cart", group: "Bán hàng", name: "Giỏ hàng", desc: "Danh sách món + tổng tiền",
    base: "a shopping cart screen with a list of cart items (thumbnail, name, price, quantity stepper, remove), a promo-code field, an order summary with subtotal and total, and a Checkout button." },
  { id: "checkout", group: "Bán hàng", name: "Thanh toán", desc: "Địa chỉ, phương thức, xác nhận",
    base: "a checkout screen with a shipping address card, a delivery-method selector, a payment-method section (cards, e-wallet), an order summary, and a Place Order button." },
  { id: "paysuccess", group: "Bán hàng", name: "Thanh toán thành công", desc: "Xác nhận đơn hàng",
    base: "an order-success screen with a large green checkmark animation illustration, a 'Payment Successful' headline, order number and summary, and View Order / Continue Shopping buttons." },

  // ----- Khác -----
  { id: "chat", group: "Khác", name: "Chat / Nhắn tin", desc: "Bong bóng chat, ô nhập",
    base: "a chat conversation screen with a top bar showing the contact avatar and name, alternating incoming and outgoing message bubbles with timestamps, and a bottom input bar with attachment and send buttons." },
  { id: "chatlist", group: "Khác", name: "Danh sách trò chuyện", desc: "List các cuộc chat",
    base: "a messaging inbox screen with a search bar and a vertical list of conversations, each row with an avatar, name, last message preview, timestamp, and unread badge." },
  { id: "map", group: "Khác", name: "Bản đồ", desc: "Map + pin + thẻ địa điểm",
    base: "a map screen with a full-screen map background, location pins, a floating search bar at top, and a draggable bottom sheet card showing a selected place's details." },
  { id: "error404", group: "Khác", name: "Lỗi / 404", desc: "Màn báo lỗi",
    base: "an error / 404 screen with a playful illustration, a headline like 'Something went wrong', a short message, and a Try Again / Go Home button." },
];

/* ---------- State ---------- */
const LS_KEY = "ui-prompt-studio-v1";
let state = {
  style: { platform: "ios", design: "minimal", mode: "light", fidelity: "high", aspect: "phone", textlang: "vi", color: "#2F80ED", extra: "" },
  selected: {},   // id -> true
  notes: {},      // id -> string
  custom: [],     // {id, name, base, group:"Tuỳ chỉnh"}
};

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      state = Object.assign(state, saved);
      state.style = Object.assign({ platform: "ios", design: "minimal", mode: "light", fidelity: "high", aspect: "phone", textlang: "vi", color: "#2F80ED", extra: "" }, saved.style || {});
    }
  } catch (e) { /* ignore corrupted storage */ }
}
function save() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
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

function buildPrompt(screen) {
  const note = (state.notes[screen.id] || "").trim();
  let p = stylePreamble() + " " + screen.base;
  p += " " + styleSuffix();
  if (note) p += " Additional requirements: " + note + ".";
  return p.replace(/\s+/g, " ").trim();
}

/* ---------- All screens (built-in + custom) ---------- */
function allScreens() { return SCREENS.concat(state.custom); }

/* ---------- Rendering ---------- */
const $ = sel => document.querySelector(sel);

function fillSelect(id, kind) {
  const el = document.getElementById(id);
  el.innerHTML = OPTIONS[kind].map(o => `<option value="${o.v}">${o.label}</option>`).join("");
}

function initStylePanel() {
  fillSelect("s_platform", "platform");
  fillSelect("s_design", "design");
  fillSelect("s_mode", "mode");
  fillSelect("s_fidelity", "fidelity");
  fillSelect("s_aspect", "aspect");
  fillSelect("s_textlang", "textlang");

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

  const bind = (id, key) => document.getElementById(id).addEventListener("change", e => {
    state.style[key] = e.target.value; save(); renderLibrary();
  });
  bind("s_platform", "platform");
  bind("s_design", "design");
  bind("s_mode", "mode");
  bind("s_fidelity", "fidelity");
  bind("s_aspect", "aspect");
  bind("s_textlang", "textlang");

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
    state.style = { platform: "ios", design: "minimal", mode: "light", fidelity: "high", aspect: "phone", textlang: "vi", color: "#2F80ED", extra: "" };
    save(); initStylePanel(); renderLibrary();
  });
}

function renderLibrary() {
  const q = ($("#search").value || "").toLowerCase().trim();
  const screens = allScreens().filter(s =>
    !q || s.name.toLowerCase().includes(q) || (s.desc || "").toLowerCase().includes(q) || s.id.includes(q)
  );

  // group order
  const groups = [];
  screens.forEach(s => { if (!groups.includes(s.group)) groups.push(s.group); });

  const container = $("#library");
  container.innerHTML = groups.map(g => {
    const items = screens.filter(s => s.group === g);
    return `<div class="group">
      <h3>${g} <span class="count">(${items.length})</span></h3>
      <div class="cards">
        ${items.map(cardHTML).join("")}
      </div>
    </div>`;
  }).join("") || `<p style="color:var(--muted)">Không tìm thấy màn hình nào.</p>`;

  // wire up card events
  screens.forEach(s => {
    const root = document.getElementById("card-" + s.id);
    if (!root) return;
    root.querySelector(".chk").addEventListener("change", e => {
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
  });
  updateCount();
}

function cardHTML(s) {
  const checked = state.selected[s.id] ? "checked" : "";
  const selCls = state.selected[s.id] ? "selected" : "";
  const note = state.notes[s.id] || "";
  return `<div class="card ${selCls}" id="card-${s.id}">
    <div class="card-head">
      <input type="checkbox" class="chk" ${checked} />
      <div>
        <div class="card-title">${escapeHtml(s.name)}</div>
        <div class="card-desc">${escapeHtml(s.desc || "")}</div>
      </div>
    </div>
    <div class="preview">${escapeHtml(buildPrompt(s))}</div>
    <textarea class="note" placeholder="Ghi chú riêng cho màn này (tuỳ chọn)...">${escapeHtml(note)}</textarea>
    <div class="card-actions">
      <button class="btn-primary btn-sm copy-one">📋 Copy prompt</button>
    </div>
  </div>`;
}

function selectedScreens() {
  return allScreens().filter(s => state.selected[s.id]);
}

function updateCount() {
  $("#sel_count").textContent = selectedScreens().length;
}

function buildAllText() {
  const sel = selectedScreens();
  return sel.map((s, i) => `### ${i + 1}. ${s.name}\n${buildPrompt(s)}`).join("\n\n");
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

/* ---------- Toolbar & actions ---------- */
function initActions() {
  $("#search").addEventListener("input", renderLibrary);

  $("#select_all").addEventListener("click", () => {
    // select only currently visible (filtered) screens
    const q = ($("#search").value || "").toLowerCase().trim();
    allScreens().forEach(s => {
      const match = !q || s.name.toLowerCase().includes(q) || (s.desc || "").toLowerCase().includes(q) || s.id.includes(q);
      if (match) state.selected[s.id] = true;
    });
    save(); renderLibrary();
  });
  $("#clear_all").addEventListener("click", () => { state.selected = {}; save(); renderLibrary(); });

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
}

/* ---------- Service worker (offline + install) ---------- */
/* Chỉ chạy khi phục vụ qua http/https (không chạy khi mở file:// trực tiếp) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline vẫn dùng bản cache cũ */ });
  });
}

/* ---------- Boot ---------- */
load();
initStylePanel();
initActions();
renderLibrary();
