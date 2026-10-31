-- Skema yang dipakai kode backend. Jika tabel kamu sudah ada, cocokkan nama kolomnya
-- dengan yang di bawah (jangan dijalankan mentah-mentah di database yang sudah berisi data).

CREATE DATABASE IF NOT EXISTS sekolah
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sekolah;

CREATE TABLE IF NOT EXISTS `user` (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama       VARCHAR(100) NOT NULL,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,              -- hash bcrypt, BUKAN teks asli
  role       ENUM('admin','user') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_siswa (
  nipd          VARCHAR(20)  NOT NULL PRIMARY KEY,
  nama_lengkap  VARCHAR(100) NOT NULL,
  jenis_kelamin VARCHAR(20)  NOT NULL,
  alamat        TEXT         NOT NULL,
  kelas         VARCHAR(20)  NOT NULL,
  jurusan       VARCHAR(50)  NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
