# 🎨 UI Prompt Studio

Nền tảng **thiết kế UI bằng prompt, quản lý theo dự án** — không cần Figma hay
Photoshop. Bạn kiểm soát thiết kế bằng prompt chuẩn dán vào ChatGPT.
**Miễn phí, không cần API, không cần cài đặt** — một trang web tĩnh.

## Flow chính

```
1. Tải CSV template → điền feature list của app (Tính năng, Màn hình, Ghi chú)
2. Vào trang → Tạo dự án mới (đặt tên) → upload/dán CSV
3. Hệ thống phân tích CSV → tự nhận diện các màn hình dự án cần
4. Vào workspace: tinh chỉnh từng màn (câu hỏi, ô "Khác", ghi chú)
5. Chọn tối đa 3 màn → Copy prompt → dán vào ChatGPT → nhận ảnh UI
```

## Dashboard & Dự án

- Mở trang là thấy **Dashboard**: danh sách dự án dạng card (tên, số màn, lần
  sửa cuối) + nút **＋ Tạo dự án mới** và **📄 Tải CSV template**.
- Mỗi dự án lưu riêng toàn bộ: style, màn đã chọn, câu trả lời, màn tuỳ chỉnh,
  ghi chú. Có thể **Mở / Đổi tên ✎ / Nhân bản ⧉ / Xoá 🗑**.
- Trong workspace, nút **← Dự án** quay về dashboard; mọi thay đổi tự lưu.

## CSV Feature list

File CSV 3 cột (mở bằng Excel / Google Sheets đều được, lưu định dạng CSV):

```csv
Tính năng,Màn hình,Ghi chú
Đăng nhập,Login,"Chỉ đăng nhập bằng Google và Apple"
Trang chủ,Dashboard,"Hiện doanh thu, biểu đồ, KPI"
Đặt lịch hẹn,Booking,"Chọn ngày giờ, xác nhận lịch"
```

- **Tính năng**: tên tính năng (tiếng Việt thoải mái)
- **Màn hình**: tên màn (Việt hoặc Anh đều nhận)
- **Ghi chú**: yêu cầu riêng — sẽ tự điền vào ô "Yêu cầu thêm" của màn đó

Khi upload: hệ thống hiện **bảng phân tích** để bạn duyệt (dòng nào map thành
màn template nào, dòng nào thành màn mới) rồi mới áp dụng. Các màn của dự án
hiện trong nhóm **📌 Màn hình của dự án** trên đầu workspace. Parser hỗ trợ cả
CSV dùng dấu `;` (Excel tiếng Việt), ô có dấu phẩy trong ngoặc kép, BOM.
Cũng có thể **📥 Import CSV** thêm vào dự án đang mở bất cứ lúc nào.

## Chọn màn & tỉ lệ ảnh (tự động)

Chọn **tối đa 3 màn** mỗi lần tạo ảnh (để ảnh đủ chi tiết — tạo theo đợt nếu
cần nhiều hơn):

| Số màn chọn | Ảnh tạo ra |
|---|---|
| 1 màn | 1 prompt riêng — ảnh dọc **9:19.5** |
| 2 màn | 1 prompt gộp — ảnh vuông **1:1**, 2 màn cạnh nhau |
| 3 màn | 1 prompt gộp — ảnh ngang **16:9**, 3 màn hàng ngang |

Prompt gộp giữ **chi tiết đầy đủ từng màn** (mọi lựa chọn, ô "Khác", ghi chú)
kèm chỉ dẫn *"không được rút gọn hay bỏ thành phần nào"*. Mọi prompt đều bắt
đầu bằng **"Create an image: ..."** để ChatGPT hiểu là cần sinh ảnh.

## Kiểm soát nội dung từng màn

- **Câu hỏi trên từng màn**: Login chọn phương thức đăng nhập (Email/SĐT/
  Google/Apple/SSO...), OTP chọn số chữ số (4/5/6/8) & kênh gửi, Dashboard chọn
  widget, Thanh toán chọn phương thức... Prompt cập nhật realtime.
- **Ô "Khác" (tự điền)** trên mỗi câu hỏi chọn nhiều — thêm mục không có sẵn.
- **Yêu cầu thêm**: ô tự do cho từng màn (ghi chú CSV tự điền vào đây).
- **Mô tả app**: điền 1 lần trong style panel, áp dụng mọi màn.

## Bộ nhận diện thương hiệu (Brand) — chống logo/màu ngẫu nhiên

Trước đây ChatGPT hay chèn logo/màu ngẫu nhiên. Nút **🎨 Bộ nhận diện (Brand)**
trong panel trái mở hộp thoại kiểu *Material Theme Builder*:

- **Màu chủ đạo** → tự sinh **màu phụ + màu nhấn + nền** (có thể chỉnh tay từng màu)
- **Xem trước** ngay trên 1 màn app mẫu (app bar, nút, card, chip, bottom nav)
- **Tên thương hiệu** + **upload logo**

Cách chống logo ngẫu nhiên:
- **Có logo (upload):** prompt yêu cầu *dùng đúng logo bạn đính kèm*, không tự chế
  — nhớ **đính kèm file logo** vào tin nhắn ChatGPT (nút "Tải lại" để lấy file).
- **Chưa có logo:** prompt dùng **chữ tên brand** làm logo.
- **Luôn luôn:** prompt **cấm** AI chèn logo/thương hiệu có thật hay bịa ngẫu nhiên.

Bảng màu &amp; logo lưu **theo từng dự án**, tự chèn vào mọi prompt của dự án đó.

## Kiểm soát style bằng ảnh mẫu

Ở **Phong cách thiết kế** (panel trái) chọn **🎯 Theo ảnh mẫu tôi đính kèm** nếu
bạn đã có ảnh style ưng ý: prompt sẽ yêu cầu ChatGPT tái tạo **chính xác** bảng
màu, typography, bo góc, đổ bóng, spacing... của ảnh bạn **đính kèm vào tin nhắn
ChatGPT**, và chỉ tạo nội dung mới cho màn hình cần. Chọn mức bám: chỉ phong
cách, hoặc cả bố cục. Chọn phong cách khác (Minimal, Material...) để mô tả style
bằng chữ (kèm màu chủ đạo, sáng/tối).

## Giao diện

- **☀️ Sáng / 🌙 Tối** — nút góc phải, mặc định theo hệ thống, có ghi nhớ.
- Cài như app (**PWA**): mở link → "Thêm vào màn hình chính" (iOS/Android) hoặc
  icon ⊕ trên thanh địa chỉ (PC/Mac). Chạy được cả khi offline.

## Dùng online trên mọi thiết bị (GitHub Pages)

1. Repo GitHub → **Settings** → (nếu Private: **Change visibility** → Public)
2. **Settings → Pages** → Source: **Deploy from a branch**
3. Branch: `claude/batch-ui-image-generation-ye8suj`, thư mục `/ (root)` → Save
4. Đợi ~1 phút → link: `https://hphuoc1201.github.io/ui-generator/`

Mỗi lần push code mới, trang tự cập nhật.

## Cấu trúc

- `index.html` — giao diện (dashboard + workspace) + CSS.
- `app.js` — thư viện màn hình & câu hỏi, CSV parser + phân tích, quản lý dự
  án, logic ghép prompt, theme.
- `manifest.json`, `sw.js`, `icon-*.png` — bộ PWA (cài như app + offline).

Không có bước build, không phụ thuộc thư viện ngoài, chạy hoàn toàn offline.
Dữ liệu dự án lưu trong trình duyệt (localStorage) của từng thiết bị.
