const siswa = require('../models/siswa_model');

// Nilai yang diizinkan (sama dengan ENUM di tabel data_siswa)
const JENIS_KELAMIN = ['Laki-Laki', 'Perempuan'];
const KELAS = ['10', '11', '12'];
const JURUSAN = ['RPL', 'TKJ', 'DKV', 'BIDI', 'AK'];

const FIELD_WAJIB = ['nipd', 'nama_lengkap', 'jenis_kelamin', 'alamat', 'kelas', 'jurusan'];

// Mengembalikan { error: {...} } jika tidak valid, atau { data: {...} } jika valid
function validasi(body) {
    const b = body || {};

    const fieldKosong = FIELD_WAJIB.filter((key) =>
        b[key] === undefined || b[key] === null || String(b[key]).trim() === ''
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
        jurusan: String(b.jurusan).trim()
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

const siswaController = {
    async findAll(req, res) {
        try {
            const data = await siswa.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error mengambil data siswa:', error);
            res.status(500).json({ message: 'Gagal mengambil data siswa' });
        }
    },

    async create(req, res) {
        try {
            const { error, data } = validasi(req.body);
            if (error) return res.status(400).json(error);

            const result = await siswa.create(data);

            res.status(201).json({
                message: 'Data siswa berhasil ditambahkan',
                id: result.insertId
            });
        } catch (error) {
            console.error('Error menambahkan data siswa:', error);
            res.status(500).json({ message: 'Gagal menambahkan data siswa' });
        }
    },

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'id tidak valid' });
            }

            const { error, data } = validasi(req.body);
            if (error) return res.status(400).json(error);

            const result = await siswa.update({ id, ...data });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Data siswa tidak ditemukan' });
            }

            res.status(200).json({ message: 'Data siswa berhasil diperbarui' });
        } catch (error) {
            console.error('Error memperbarui data siswa:', error);
            res.status(500).json({ message: 'Gagal memperbarui data siswa' });
        }
    },

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'id tidak valid' });
            }

            const result = await siswa.delete(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Data siswa tidak ditemukan' });
            }

            res.status(200).json({ message: 'Data siswa berhasil dihapus' });
        } catch (error) {
            console.error('Error menghapus data siswa:', error);
            res.status(500).json({ message: 'Gagal menghapus data siswa' });
        }
    }
};

module.exports = siswaController;
