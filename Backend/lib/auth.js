import jwt from 'jsonwebtoken';

/**
 * Cek header "Authorization: Bearer <token>".
 * Hasil: { user } jika valid, atau { response } (Response 401/500) jika tidak.
 */
export function cekToken(request) {
  const authorization = request.headers.get('authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return { response: Response.json({ message: 'Token tidak ditemukan' }, { status: 401 }) };
  }

  if (!process.env.JWT_SECRET) {
    return { response: Response.json({ message: 'Konfigurasi JWT_SECRET belum diatur' }, { status: 500 }) };
  }

  try {
    const user = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
    return { user };
  } catch {
    return {
      response: Response.json(
        { message: 'Token tidak valid atau sudah kedaluwarsa' },
        { status: 401 }
      ),
    };
  }
}

export function buatToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
}
