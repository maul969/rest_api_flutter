# Backend Data Siswa

Express 5 + MySQL + JWT. Login hanya untuk role `admin`.

## Setup
1. `npm install`
2. Salin `.env.example` menjadi `.env`, isi `DB_*` dan buat `JWT_SECRET` acak.
3. Import `database/schema.sql` ke MySQL (atau cocokkan tabel yang sudah ada).
4. Buat admin pertama: `npm run seed:admin -- admin passwordkamu "Administrator"`
5. Jalankan: `npm run dev` (nodemon) atau `npm start`

## Endpoint (prefix `/api`)
| Method | Path | Auth | Keterangan |
|---|---|---|---|
| GET | /health | - | cek server hidup |
| POST | /login | - | body: `username`, `password` -> `token` |
| GET/POST | /siswa | admin | list / tambah |
| GET/PUT/DELETE | /siswa/:nipd | admin | detail / ubah / hapus |
| GET/POST | /user | admin | list / tambah (`nama`, `username`, `password`, `role?`) |
| PUT/DELETE | /user/:id | admin | ubah (parsial) / hapus |

Kirim token di header: `Authorization: Bearer <token>`
