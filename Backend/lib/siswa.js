// Nilai yang diizinkan (sama dengan ENUM di tabel data_siswa)
export const JENIS_KELAMIN = ['Laki-Laki', 'Perempuan'];
export const KELAS = ['10', '11', '12'];
export const JURUSAN = ['RPL', 'TKJ', 'DKV', 'BIDI', 'AK'];

const FIELD_WAJIB = ['nipd', 'nama_lengkap', 'jenis_kelamin', 'alamat', 'kelas', 'jurusan'];

/** Mengembalikan { error } jika tidak valid, atau { data } jika valid. */
export function validasiSiswa(body) {
  const b = body && typeof body === 'object' ? body : {};

  const fieldKosong = FIELD_WAJIB.filter(
    (key) => b[key] === undefined || b[key] === null || String(b[key]).trim() === ''
  );
  if (fieldKosong.length > 0) {
    return { error: { message: 'Ada field yang belum diisi', field_kosong: fieldKosong } };
  }

  const data = {
    nipd: String(b.nipd).trim(),
    nama_lengkap: String(b.nama_lengkap).trim(),
    jenis_kelamin: String(b.jenis_kelamin).trim(),
    alamat: String(b.alamat).trim(),
    kelas: String(b.kelas).trim(),
    jurusan: String(b.jurusan).trim(),
  };

  if (!/^\d+$/.test(data.nipd)) {
    return { error: { message: 'NIPD harus berupa angka' } };
  }
  if (!JENIS_KELAMIN.includes(data.jenis_kelamin)) {
    return { error: { message: `jenis_kelamin harus salah satu dari: ${JENIS_KELAMIN.join(', ')}` } };
  }
  if (!KELAS.includes(data.kelas)) {
    return { error: { message: `kelas harus salah satu dari: ${KELAS.join(', ')}` } };
  }
  if (!JURUSAN.includes(data.jurusan)) {
    return { error: { message: `jurusan harus salah satu dari: ${JURUSAN.join(', ')}` } };
  }
  if (data.nama_lengkap.length > 50 || data.alamat.length > 50) {
    return { error: { message: 'nama_lengkap dan alamat maksimal 50 karakter' } };
  }

  return { data };
}

/** Baca body JSON; kembalikan null jika bukan JSON yang valid. */
export async function bacaJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
