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

## Tính năng

- Thư viện template cho ~25 loại màn hình phổ biến, chia theo nhóm + tìm kiếm.
- Panel style: nền tảng (iOS/Android/Web), phong cách thiết kế, màu chủ đạo,
  light/dark, độ chi tiết (ảnh thật / wireframe), tỉ lệ thiết bị, ngôn ngữ chữ.
- Xem trước prompt hoàn chỉnh của từng màn theo thời gian thực.
- Copy từng prompt hoặc copy tất cả màn đã chọn (đánh số).
- Ghi chú riêng cho từng màn.
- Thêm màn tự định nghĩa.
- Tự lưu style + lựa chọn vào trình duyệt (localStorage) — mở lại vẫn còn.

## Cấu trúc

- `index.html` — giao diện + CSS.
- `app.js` — thư viện template, cấu hình style, logic ghép prompt & copy.

Không có bước build, không phụ thuộc thư viện ngoài, chạy hoàn toàn offline.
