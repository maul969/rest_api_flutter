PERBAIKAN BACKEND + AUTH JWT

1. Pastikan MySQL aktif dan database `sekolah` sudah ada.
2. Periksa file `.env`, sesuaikan DB_HOST, DB_USER, DB_PASSWORD, dan DB_NAME.
3. Ganti JWT_SECRET dengan string rahasia acak yang panjang sebelum digunakan.
4. Pastikan tabel `users` memiliki kolom:
   - id (primary key)
   - nama
   - email
   - password
   Email sebaiknya UNIQUE agar email ganda tidak bisa tersimpan.
5. Tabel `data_siswa` harus sesuai dengan kolom yang digunakan oleh siswa_model.js.
6. Jalankan `npm install` lalu `npm start`.

ENDPOINT AUTH
POST http://localhost:3000/api/auth/register
JSON: { "nama": "Maulidan", "email": "user@example.com", "password": "password123" }

POST http://localhost:3000/api/auth/login
JSON: { "email": "user@example.com", "password": "password123" }

Login mengembalikan token. Untuk endpoint yang dilindungi, tambahkan header:
Authorization: Bearer TOKEN_HASIL_LOGIN

ENDPOINT YANG DILINDUNGI
GET    /api/siswa
POST   /api/siswa
PUT    /api/siswa/:nipd
DELETE /api/siswa/:nipd
GET    /api/user
POST   /api/user
PUT    /api/user/:id
DELETE /api/user/:id

CATATAN
- Password baru disimpan menggunakan bcrypt hash, bukan teks biasa.
- Akun lama yang password-nya tersimpan sebagai teks biasa tidak akan bisa login melalui bcrypt. Buat akun baru melalui /api/auth/register atau lakukan migrasi password lama dengan aman.
- File .env yang disertakan hanya konfigurasi lokal contoh; jangan unggah .env ke GitHub.
