const siswa = require('../models/siswa_model');

const siswaController = {
    async findAll(req, res) {
        try {
            const data = await siswa.findAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data siswa' });
        }
    },

    async create(req, res) {
        try {
            const result = await siswa.create(req.body);
            res.status(201).json({
                message: 'Data siswa berhasil ditambahkan',
                id: result.insertId
            });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menambahkan data siswa' });
        }
    },

    async update(req, res) {
        try {
            const result = await siswa.update({
                ...req.body,
                nipd: req.params.nipd
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Data siswa tidak ditemukan atau tidak ada perubahan' });
            }

            res.status(200).json({ message: 'Data siswa berhasil diperbarui' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal memperbarui data siswa' });
        }
    },

    async delete(req, res) {
        try {
            const result = await siswa.delete(req.params.nipd);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Data siswa tidak ditemukan' });
            }

            res.status(200).json({ message: 'Data siswa berhasil dihapus' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menghapus data siswa' });
        }
    }
};

module.exports = siswaController;
