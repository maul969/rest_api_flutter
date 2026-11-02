import db from '../../../../lib/db.js';
import { cekToken } from '../../../../lib/auth.js';
import { validasiSiswa, bacaJson } from '../../../../lib/siswa.js';

async function ambilId(params) {
  const { id } = await params; // di Next.js 15+, params adalah Promise
  const angka = Number(id);
  return Number.isInteger(angka) && angka > 0 ? angka : null;
}

// PUT /api/siswa/:id -> ubah siswa
export async function PUT(request, { params }) {
  const { response } = cekToken(request);
  if (response) return response;

  try {
    const id = await ambilId(params);
    if (id === null) return Response.json({ message: 'id tidak valid' }, { status: 400 });

    const body = await bacaJson(request);
    const { error, data } = validasiSiswa(body);
    if (error) return Response.json(error, { status: 400 });

    const [result] = await db.query(
      'UPDATE data_siswa SET nipd = ?, nama_lengkap = ?, jenis_kelamin = ?, alamat = ?, kelas = ?, jurusan = ? WHERE id = ?',
      [data.nipd, data.nama_lengkap, data.jenis_kelamin, data.alamat, data.kelas, data.jurusan, id]
    );

    if (result.affectedRows === 0) {
      return Response.json({ message: 'Data siswa tidak ditemukan' }, { status: 404 });
    }

    return Response.json({ message: 'Data siswa berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    console.error('Error memperbarui data siswa:', error);
    return Response.json({ message: 'Gagal memperbarui data siswa' }, { status: 500 });
  }
}

// DELETE /api/siswa/:id -> hapus siswa
export async function DELETE(request, { params }) {
  const { response } = cekToken(request);
  if (response) return response;

  try {
    const id = await ambilId(params);
    if (id === null) return Response.json({ message: 'id tidak valid' }, { status: 400 });

    const [result] = await db.query('DELETE FROM data_siswa WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return Response.json({ message: 'Data siswa tidak ditemukan' }, { status: 404 });
    }

    return Response.json({ message: 'Data siswa berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error menghapus data siswa:', error);
    return Response.json({ message: 'Gagal menghapus data siswa' }, { status: 500 });
  }
}
