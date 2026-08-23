# 🌟 Lý Minh Khôi - Fresher/Junior Business Analyst Portfolio

Trang web Portfolio cá nhân chuyên nghiệp dành cho vị trí **Fresher/Junior Business Analyst**, được xây dựng với cấu trúc hiện đại, thẩm mỹ cao và tối ưu hóa 100% cho việc ứng tuyển vào các công ty công nghệ, Product, B2B SaaS, FinTech và E-Commerce.

---

## 📁 Cấu Trúc Dự Án
```
├── index.html            # Toàn bộ mã nguồn & giao diện chính (SPA + Case Study Modals + PDF CV)
├── assets/
│   ├── css/
│   │   └── style.css     # Tùy chỉnh hiệu ứng, glassmorphism, typography, bản in CV
│   ├── js/
│   │   └── app.js        # Logic tương tác (bộ lọc, chuyển tab, modals, copy clipboard, theme)
│   └── images/           # Ảnh đại diện avatar & icon
├── .gitignore            # Loại bỏ các file tạm
└── README.md             # Tài liệu giới thiệu & hướng dẫn triển khai
```

---

## 💻 1. Xem Trước Trên Máy Tính (Local Preview)
* **Cách 1:** Nhấp đúp chuột vào file `index.html` để mở bằng trình duyệt (Chrome, Edge, Firefox, Brave,...).
* **Cách 2 (Khuyên dùng với VS Code):** Nhấp chuột phải vào `index.html` $\rightarrow$ Chọn **"Open with Live Server"**.

---

## 🚀 2. Hướng Dẫn Deploy Lên GitHub Pages Miễn Phí (Trong 2 phút)

Để website có link công khai chuyên nghiệp dạng `https://<ten-username>.github.io/<ten-repo>/` (hoặc `https://<ten-username>.github.io`):

### Bước 1: Tạo Repository mới trên GitHub
1. Truy cập [GitHub](https://github.com) và đăng nhập.
2. Nhấn nút **New** (hoặc dấu `+` ở góc trên bên phải $\rightarrow$ **New repository**).
3. Đặt tên Repository (ví dụ: `portfolio` hoặc `lyminhkhoi-ba-portfolio`).
4. Để chế độ **Public** và KHÔNG cần tích vào ô *Add a README file*.
5. Bấm **Create repository**.

### Bước 2: Đẩy toàn bộ mã nguồn lên GitHub
Mở Terminal / PowerShell tại thư mục dự án và chạy các lệnh:
```bash
git add .
git commit -m "feat: complete Fresher/Junior BA Portfolio for Ly Minh Khoi"
git branch -M main
git remote add origin https://github.com/<username-cua-ban>/<ten-repo>.git
git push -u origin main
```
*(Thay `<username-cua-ban>` và `<ten-repo>` bằng thông tin repo GitHub của bạn)*

### Bước 3: Kích hoạt GitHub Pages
1. Trong repository trên GitHub, chuyển sang tab **Settings** (Cài đặt).
2. Ở menu bên trái, chọn mục **Pages**.
3. Tại phần **Build and deployment**:
   * **Source**: Chọn `Deploy from a branch`
   * **Branch**: Chọn `main` (hoặc `master`), thư mục giữ nguyên là `/(root)`
4. Nhấn **Save**.
5. Đợi khoảng 1–2 phút, tải lại trang Settings $\rightarrow$ Pages, bạn sẽ thấy thông báo:
   > *"Your site is live at `https://<username-cua-ban>.github.io/<ten-repo>/`"*

---

## 💼 3. Cách Sử Dụng Link Portfolio Khi Ứng Tuyển (Apply)

1. **Gắn vào Top CV (dưới thông tin liên hệ):**
   * *Portfolio:* `https://<username>.github.io/<repo>/`
2. **Gắn vào hồ sơ LinkedIn:**
   * Thêm vào mục **Featured (Nổi bật)** hoặc **Contact info (Thông tin liên hệ)** $\rightarrow$ Website.
3. **Trong Email ứng tuyển / Thư ứng tuyển (Cover Letter):**
   * *"Quý nhà tuyển dụng có thể xem chi tiết các Case Study đặc tả yêu cầu (SRS, BRD, BPMN 2.0) và phong cách làm việc của tôi tại Portfolio trực tuyến: [Đường link website]"*
