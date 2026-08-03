# 🎨 UI Prompt Studio

Công cụ **tạo hàng loạt prompt chuẩn** để dán vào ChatGPT sinh ảnh giao diện UI
(mobile app / web app). **Miễn phí, không cần API, không cần cài đặt** — chỉ là
một file HTML mở bằng trình duyệt.

## Vì sao có tool này?

Khi dùng web ChatGPT, mỗi lần chỉ tạo được 1 ảnh và phải đợi xong mới tạo ảnh
tiếp theo. Tool này giúp bạn:

1. Cấu hình **style một lần** (nền tảng, phong cách, màu, sáng/tối, tỉ lệ...).
2. Chọn các màn hình cần (Login, Sign up, Home, Cart...) từ thư viện có sẵn.
3. Tool tự ghép style vào từng màn → cho ra **prompt hoàn chỉnh**.
4. **Copy tất cả** rồi mở **nhiều tab ChatGPT**, mỗi tab dán 1 prompt → nhiều
   ảnh được tạo **cùng lúc**, hoàn toàn miễn phí.

## Cách dùng

1. Mở file **`index.html`** bằng trình duyệt (nháy đúp là được).
2. Bên trái: chỉnh **Style chung** — áp dụng cho mọi màn.
3. Bên phải: tick chọn các màn hình cần. Có thể ghi chú riêng cho từng màn.
4. Bấm **📋 Copy tất cả** (các prompt được đánh số 1, 2, 3...).
5. Mở nhiều tab ChatGPT, mỗi tab dán 1 prompt và bấm tạo ảnh.

> 💡 Mẹo: Muốn thêm màn không có trong thư viện? Bấm **＋ Thêm màn tuỳ chỉnh**,
> nhập mô tả bố cục — style chung vẫn được áp dụng tự động.

## Kiểm soát style bằng ảnh mẫu (quan trọng)

Nếu bạn đã có sẵn ảnh style mình thích và muốn design bám **đúng** theo đó:

1. Bật **🎯 Dùng ảnh mẫu để kiểm soát style** ở panel bên trái.
2. Chọn mức độ bám: *chỉ theo phong cách* (màu/font/bo góc, bố cục tự do) hoặc
   *theo cả phong cách + bố cục tương tự*.
3. Copy prompt và dán vào ChatGPT — **nhớ đính kèm ảnh mẫu** vào chính tin nhắn
   đó (mỗi tab một ảnh khi chạy song song).

Prompt sẽ yêu cầu ChatGPT tái tạo **chính xác** bảng màu, typography, bo góc, đổ
bóng, spacing... của ảnh mẫu, và chỉ tạo **nội dung mới** cho màn hình bạn cần.

## Tuỳ chỉnh cho từng màn

- **Mô tả app**: điền một lần, áp dụng cho mọi màn (vd "app quản lý chi tiêu,
  phong cách trẻ trung") để các màn cụ thể và ăn khớp nhau.
- **Nội dung riêng cho màn này**: mỗi thẻ màn hình có ô ghi chú riêng, kèm gợi ý
  đúng ngữ cảnh (vd Dashboard gợi ý: "các widget: doanh thu, biểu đồ, KPI...").
  Vì mỗi app một khác, đây là chỗ bạn mô tả thành phần/nội dung cụ thể mình muốn.

## 2 kiểu xuất (chọn ở thanh dưới)

Vì ChatGPT chỉ tạo **1 ảnh mỗi prompt**, tool hỗ trợ 2 cách khi chọn nhiều màn:

- **Mỗi màn 1 ảnh (nhiều prompt):** mỗi màn ra 1 prompt riêng (đánh số). Mở nhiều
  tab ChatGPT, mỗi tab dán 1 prompt → chạy song song, mỗi màn 1 ảnh riêng.
- **Gộp tất cả vào 1 ảnh:** tạo **1 prompt duy nhất** yêu cầu vẽ tất cả các màn
  trong **cùng một ảnh** — có ghi rõ *tỉ lệ ảnh tổng (~16:9)*, *tỉ lệ từng màn*
  (vd 9:19.5), style dùng chung, và nội dung từng màn được đánh số.

Mọi prompt đều bắt đầu bằng câu lệnh **“Create an image: ...”** để ChatGPT hiểu
rõ là cần **sinh ảnh** (không phải trả lời bằng chữ).

## Giao diện sáng/tối

Có nút **☀️ Sáng / 🌙 Tối** ở góc trên phải. Mặc định theo cài đặt hệ thống của
bạn, và ghi nhớ lựa chọn cho lần sau.

## Tính năng

- Thư viện template cho ~25 loại màn hình phổ biến, chia theo nhóm + tìm kiếm.
- Panel style: nền tảng (iOS/Android/Web), phong cách thiết kế, màu chủ đạo,
  light/dark, độ chi tiết (ảnh thật / wireframe), tỉ lệ thiết bị, ngôn ngữ chữ.
- Xem trước prompt hoàn chỉnh của từng màn theo thời gian thực.
- Copy từng prompt hoặc copy tất cả màn đã chọn (đánh số).
- Ghi chú riêng cho từng màn.
- Thêm màn tự định nghĩa.
- Tự lưu style + lựa chọn vào trình duyệt (localStorage) — mở lại vẫn còn.

## Dùng online trên mọi thiết bị (GitHub Pages)

Deploy 1 lần để có 1 link, mở được trên iOS / Android / PC / Mac:

1. Vào repo trên GitHub → tab **Settings**.
2. (Nếu repo đang **Private**) kéo xuống mục **Danger Zone** → **Change visibility**
   → đổi sang **Public**. *GitHub Pages bản miễn phí chỉ chạy với repo public.*
   Tool này không chứa bí mật gì nên để public an toàn. (Muốn giữ private thì
   dùng Cloudflare Pages thay thế.)
3. Vào **Settings → Pages**.
4. Mục **Source** chọn **Deploy from a branch**.
5. **Branch**: chọn `claude/batch-ui-image-generation-ye8suj`, thư mục **`/ (root)`**
   → **Save**.
6. Đợi ~1 phút, tải lại trang. Link sẽ hiện dạng:
   `https://hphuoc1201.github.io/ui-generator/`

Mỗi lần code được cập nhật (push lên branch đó), trang tự cập nhật theo.

## Cài như app (PWA)

Sau khi có link, bạn có thể cài nó như một app thật:

- **iPhone/iPad (Safari):** mở link → nút **Chia sẻ** → **Thêm vào MH chính**.
- **Android (Chrome):** mở link → menu ⋮ → **Cài đặt ứng dụng / Thêm vào MH chính**.
- **PC/Mac (Chrome/Edge):** biểu tượng **Cài đặt** ⊕ trên thanh địa chỉ.

Sau khi cài, mở phát chạy ngay như app, và **dùng được cả khi offline**.

## Cấu trúc

- `index.html` — giao diện + CSS.
- `app.js` — thư viện template, cấu hình style, logic ghép prompt & copy.
- `manifest.json`, `sw.js`, `icon-*.png` — bộ PWA (cài như app + offline).

Không có bước build, không phụ thuộc thư viện ngoài, chạy hoàn toàn offline.
