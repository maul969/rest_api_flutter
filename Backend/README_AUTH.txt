BACKEND EXPRESS + MYSQL + AUTH (REGISTER & LOGIN)

1. Pastikan MySQL aktif dan database `sekolah` sudah dibuat.
2. Sesuaikan nilai di file .env dengan konfigurasi MySQL lokal.
3. Jalankan di terminal folder proyek:
   npm install
   npm start

AUTH ENDPOINTS

REGISTER
POST http://localhost:3000/api/auth/register
Body JSON:
{
  "nama": "Maulidan",
  "email": "user@example.com",
  "password": "password123"
}

LOGIN
POST http://localhost:3000/api/auth/login
Body JSON:
{
  "email": "user@example.com",
  "password": "password123"
}

Jika berhasil, login mengembalikan token JWT. Gunakan token untuk endpoint yang dilindungi dengan header:
Authorization: Bearer TOKEN_HASIL_LOGIN

File login:
- src/routes/auth.js: mendefinisikan POST /register dan POST /login
- src/controllers/auth_controller.js: berisi logika register dan login
- src/models/user_model.js: mencari user berdasarkan email dan menyimpan password dengan bcrypt
- src/middleware/auth.js: memvalidasi token JWT untuk endpoint terlindungi

STRUKTUR TABEL USERS YANG DIHARAPKAN
- id (primary key)
- nama
- email
- password

Contoh SQL jika tabel users belum ada:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

Catatan:
- Pastikan tabel data_siswa sesuai kolom pada src/models/siswa_model.js.
- Akun lama dengan password teks biasa tidak cocok untuk login bcrypt. Buat akun baru melalui endpoint register.
- Ganti JWT_SECRET di .env dengan nilai acak yang panjang sebelum penggunaan serius.
- Jangan unggah file .env berisi rahasia ke GitHub.
