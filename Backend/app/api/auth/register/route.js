import bcrypt from 'bcryptjs';
import db from '../../../../lib/db.js';
import { bacaJson } from '../../../../lib/siswa.js';

// POST /api/auth/register -> daftar akun baru (publik, tanpa token)
export async function POST(request) {
  try {
    const body = await bacaJson(request);
    const username = String(body?.username ?? '').trim();
    const password = String(body?.password ?? '');

    if (!username || !password) {
      return Response.json({ message: 'Username dan password wajib diisi' }, { status: 400 });
    }
    if (!/^[A-Za-z0-9_.]{3,30}$/.test(username)) {
      return Response.json(
        { message: 'Username 3-30 karakter, hanya huruf, angka, titik, dan underscore' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return Response.json({ message: 'Password minimal 6 karakter' }, { status: 400 });
    }
    if (password.length > 72) {
      return Response.json({ message: 'Password maksimal 72 karakter' }, { status: 400 });
    }

    const [ada] = await db.query('SELECT id FROM user WHERE username = ? LIMIT 1', [username]);
    if (ada.length > 0) {
      return Response.json({ message: 'Username sudah dipakai' }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO user (username, password) VALUES (?, ?)', [
      username,
      hash,
    ]);

    return Response.json(
      { message: 'Akun berhasil dibuat, silakan login', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return Response.json({ message: 'Username sudah dipakai' }, { status: 409 });
    }
    if (error.code === 'ER_DATA_TOO_LONG') {
      console.error('Kolom password terlalu pendek untuk hash:', error.message);
      return Response.json(
        { message: 'Kolom password di database terlalu pendek. Jalankan Database/migrasi_user.sql' },
        { status: 500 }
      );
    }
    console.error('Error register:', error);
    return Response.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
