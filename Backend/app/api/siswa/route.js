import db from '../../../lib/db.js';
import { cekToken } from '../../../lib/auth.js';
import { validasiSiswa, bacaJson } from '../../../lib/siswa.js';

// GET /api/siswa -> daftar semua siswa
export async function GET(request) {
  const { response } = cekToken(request);
  if (response) return response;

  try {
    const [rows] = await db.query(
      'SELECT id, nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan FROM data_siswa ORDER BY id ASC'
    );
    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error mengambil data siswa:', error);
    return Response.json({ message: 'Gagal mengambil data siswa' }, { status: 500 });
  }
}

// POST /api/siswa -> tambah siswa
export async function POST(request) {
  const { response } = cekToken(request);
  if (response) return response;

  try {
    const body = await bacaJson(request);
    const { error, data } = validasiSiswa(body);
    if (error) return Response.json(error, { status: 400 });

    const [result] = await db.query(
      'INSERT INTO data_siswa (nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan) VALUES (?, ?, ?, ?, ?, ?)',
      [data.nipd, data.nama_lengkap, data.jenis_kelamin, data.alamat, data.kelas, data.jurusan]
    );

    return Response.json(
      { message: 'Data siswa berhasil ditambahkan', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error menambahkan data siswa:', error);
    return Response.json({ message: 'Gagal menambahkan data siswa' }, { status: 500 });
  }
}
