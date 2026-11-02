import bcrypt from 'bcryptjs';
import db from '../../../../lib/db.js';
import { buatToken } from '../../../../lib/auth.js';
import { bacaJson } from '../../../../lib/siswa.js';

export async function POST(request) {
  try {
    const body = await bacaJson(request);
    const { username, password } = body || {};

    if (!username || !password) {
      return Response.json({ message: 'Username dan password wajib diisi' }, { status: 400 });
    }

    const [rows] = await db.query(
      'SELECT id, username, password FROM user WHERE username = ? LIMIT 1',
      [username]
    );
    const user = rows[0];

    // Mendukung password hash bcrypt (diawali $2) maupun teks biasa (sekolah.sql)
    let cocok = false;
    if (user) {
      const tersimpan = String(user.password);
      cocok = tersimpan.startsWith('$2')
        ? await bcrypt.compare(String(password), tersimpan)
        : tersimpan === String(password);
    }

    if (!cocok) {
      return Response.json({ message: 'Username atau password salah' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET belum diatur di file .env.local');
    }

    const token = buatToken({ id: user.id, username: user.username });

    return Response.json(
      {
        message: 'Login berhasil',
        token,
        user: { id: user.id, username: user.username },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error login:', error);
    return Response.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
