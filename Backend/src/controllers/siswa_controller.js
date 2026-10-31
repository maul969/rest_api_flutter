const siswa = require('../models/siswa_model');

const siswaController = {
    async findAll(req, res) {
        try {
            const data = await siswa.findAll();

            res.status(200).json(data);
        } catch (error) {
            console.error('Error mengambil data siswa:', error);

            res.status(500).json({
                message: 'Gagal mengambil data siswa'
            });
        }
    },

    async create(req, res) {
        try {
            console.log('Content-Type:', req.headers['content-type']);
            console.log('Request body:', req.body);

            const {
                nipd,
                nama_lengkap,
                jenis_kelamin,
                alamat,
                kelas,
                jurusan
            } = req.body || {};

            const dataWajib = {
                nipd,
                nama_lengkap,
                jenis_kelamin,
                alamat,
                kelas,
                jurusan
            };

            const fieldKosong = Object.entries(dataWajib)
                .filter(([key, value]) =>
                    value === undefined ||
                    value === null ||
                    String(value).trim() === ''
                )
                .map(([key]) => key);

            if (fieldKosong.length > 0) {
                return res.status(400).json({
                    message: 'Ada field yang belum diisi',
                    field_kosong: fieldKosong
                });
            }

            const result = await siswa.create({
                nipd,
                nama_lengkap,
                jenis_kelamin,
                alamat,
                kelas,
                jurusan
            });

            res.status(201).json({
                message: 'Data siswa berhasil ditambahkan',
                id: result.insertId
            });
        } catch (error) {
            console.error('Error menambahkan data siswa:', error);

            res.status(500).json({
                message: 'Gagal menambahkan data siswa',
                error: error.message,
                code: error.code
            });
        }
    },

    async update(req, res) {
        try {
            const {
                nama_lengkap,
                jenis_kelamin,
                alamat,
                kelas,
                jurusan
            } = req.body || {};

            const nipd = req.params.nipd;

            const dataWajib = {
                nama_lengkap,
                jenis_kelamin,
                alamat,
                kelas,
                jurusan
            };

            const fieldKosong = Object.entries(dataWajib)
                .filter(([key, value]) =>
                    value === undefined ||
                    value === null ||
                    String(value).trim() === ''
                )
                .map(([key]) => key);

            if (fieldKosong.length > 0) {
                return res.status(400).json({
                    message: 'Ada field yang belum diisi',
                    field_kosong: fieldKosong
                });
            }

            const result = await siswa.update({
                nipd,
                nama_lengkap,
                jenis_kelamin,
                alamat,
                kelas,
                jurusan
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Data siswa tidak ditemukan atau tidak ada perubahan'
                });
            }

            res.status(200).json({
                message: 'Data siswa berhasil diperbarui'
            });
        } catch (error) {
            console.error('Error memperbarui data siswa:', error);

            res.status(500).json({
                message: 'Gagal memperbarui data siswa',
                error: error.message,
                code: error.code
            });
        }
    },

    async delete(req, res) {
        try {
            const nipd = req.params.nipd;

            const result = await siswa.delete(nipd);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Data siswa tidak ditemukan'
                });
            }

            res.status(200).json({
                message: 'Data siswa berhasil dihapus'
            });
        } catch (error) {
            console.error('Error menghapus data siswa:', error);

            res.status(500).json({
                message: 'Gagal menghapus data siswa'
            });
        }
    }
};

module.exports = siswaController;
