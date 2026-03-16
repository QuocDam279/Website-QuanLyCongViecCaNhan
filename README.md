# 📌 Quản Lý Công Việc Cá Nhân

Đây là đồ án môn học được phát triển nhằm mục tiêu giúp người dùng cá nhân dễ dàng quản lý các công việc hằng ngày, phân loại, theo dõi tiến độ, lịch trình và lịch sử thay đổi. Hệ thống gồm frontend React và backend Node.js sử dụng MongoDB, hỗ trợ đăng nhập, phân quyền và giao diện thân thiện.

## 🚀 Link Demo

- 🔗 Frontend: [https://qlcvcn.netlify.app](https://qlcvcn.netlify.app)
- 🔗 Backend: [https://be-qlcvcn.onrender.com/api](https://be-qlcvcn.onrender.com/api)

## 🎯 Mục Tiêu

- Quản lý công việc một cách cá nhân hóa theo từng người dùng.
- Hỗ trợ đăng ký, đăng nhập và phân quyền.
- Tối ưu trải nghiệm người dùng với giao diện đơn giản, dễ dùng.

## ⚙️ Chức Năng Chính

- [x] Đăng ký / Đăng nhập (sử dụng JWT)
- [x] Quản lý công việc: tạo, sửa, xóa, cập nhật trạng thái
- [x] Phân loại công việc theo loại
- [x] Lọc, tìm kiếm theo thời gian, loại, trạng thái
- [x] Xem lịch công việc
- [x] Ghi lại lịch sử thay đổi (xóa, sửa, đổi trạng thái, thời gian, ...)
- [x] Giao diện người dùng hiện đại (Figma thiết kế sẵn)

## 🧱 Công Nghệ Sử Dụng

### 🔹 Frontend

- ReactJS
- TailwindCSS
- Axios
- React Router DOM

### 🔹 Backend

- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- Dotenv

### 🔹 Khác

- Docker
- Render (host backend)
- Netlify (host frontend)

## 🛠️ Cài Đặt & Chạy Local

### 👉 Yêu cầu:

- Node.js
- Docker
- Kết nối Mongo Atlas

### 📦 Cài đặt thủ công

```bash
# Backend
cd backend
npm install
cp .env.example .env # Cấu hình biến môi trường
node app.js

# Frontend
cd frontend
npm install
npm run dev
```
🐳 Chạy bằng Docker: 
docker-compose up --build

👨‍💻 Thành Viên Thực Hiện
- Họ tên: Trần Quốc Đạm
- Họ tên: Triệu Chanh Đa
- Họ tên: Huỳnh Hữu Lộc

Lớp: DA22TTA

GVHD: Thầy Nguyễn Bảo Ân
