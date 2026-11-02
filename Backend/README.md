# Backend Data Siswa (Next.js + MySQL + JWT)

REST API untuk mengelola data siswa, dengan fitur daftar akun dan login memakai JWT.

## Setup

1. Install dependensi:
   ```bash
   npm install
   ```
2. Salin `.env.local.example` menjadi `.env.local`, lalu isi `DB_*` dan `JWT_SECRET`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=sekolah
   JWT_SECRET=isi_dengan_string_acak_yang_panjang
   JWT_EXPIRES_IN=1h
   ```
3. Import `../Database/sekolah.sql` ke MySQL (berisi tabel `data_siswa`, `user`, dan akun `admin` / `admin123`).
   Lalu jalankan `../Database/migrasi_user.sql` sekali, supaya kolom `password` cukup panjang untuk menyimpan hash bcrypt (fitur daftar akun).
   Langkah migrasi ini tidak diperlukan kalau `sekolah.sql` yang diimport sudah memakai `password varchar(255)`.
4. Jalankan server:
   ```bash
   npm run dev
   ```
5. Buka http://localhost:3000. Jika muncul tulisan "API Data Siswa berjalan", backend sudah aktif.

## Endpoint

| Method | Path | Auth | Keterangan |
|---|---|---|---|
| POST | /api/auth/register | - | body: `username` (3-30 karakter), `password` (min 6) -> buat akun baru |
| POST | /api/auth/login | - | body: `username`, `password` -> `token` |
| GET | /api/siswa | Bearer | list semua siswa |
| POST | /api/siswa | Bearer | tambah siswa |
| PUT | /api/siswa/:id | Bearer | ubah siswa |
| DELETE | /api/siswa/:id | Bearer | hapus siswa |

Body siswa: `nipd`, `nama_lengkap`, `jenis_kelamin` (Laki-Laki / Perempuan), `alamat`, `kelas` (10 / 11 / 12), `jurusan` (RPL / TKJ / DKV / BIDI / AK).

Endpoint yang memakai Bearer harus menyertakan header:

```
Authorization: Bearer <token>
```

Token didapat dari respons `POST /api/auth/login`.

## Postman

Import `postman/Siswa_API.postman_collection.json`, lalu jalankan request berurutan dari atas.
Request Login menyimpan token otomatis, dan request Tambah Siswa menyimpan id untuk request Edit dan Hapus.