const user = require('../models/user_model');

const userController = {
    async findAll(req, res) {
        try {
            const data = await user.findAll();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Get users error:', error.message);
            return res.status(500).json({ message: 'Gagal mengambil data user' });
        }
    },

    async create(req, res) {
        try {
            const { nama, email, password } = req.body;

            if (!nama || !email || !password) {
                return res.status(400).json({
                    message: 'Nama, email, dan password wajib diisi'
                });
            }

            const existingUser = await user.findByEmail(email.trim().toLowerCase());
            if (existingUser) {
                return res.status(409).json({ message: 'Email sudah terdaftar' });
            }

            const result = await user.create({
                nama: nama.trim(),
                email: email.trim().toLowerCase(),
                password
            });

            return res.status(201).json({
                message: 'User berhasil ditambahkan',
                id: result.insertId
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Email sudah terdaftar' });
            }
            console.error('Create user error:', error.message);
            return res.status(500).json({ message: 'Gagal menambahkan user' });
        }
    },

    async update(req, res) {
        try {
            const { nama, email, password } = req.body;
            if (nama === undefined && email === undefined && password === undefined) {
                return res.status(400).json({
                    message: 'Isi minimal satu data yang ingin diperbarui'
                });
            }

            const result = await user.update({
                id: req.params.id,
                nama,
                email: email === undefined ? undefined : email.trim().toLowerCase(),
                password
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'User tidak ditemukan atau tidak ada perubahan'
                });
            }

            return res.status(200).json({ message: 'User berhasil diperbarui' });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Email sudah digunakan user lain' });
            }
            console.error('Update user error:', error.message);
            return res.status(500).json({ message: 'Gagal memperbarui user' });
        }
    },

    async delete(req, res) {
        try {
            const result = await user.delete(req.params.id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User tidak ditemukan' });
            }

            return res.status(200).json({ message: 'User berhasil dihapus' });
        } catch (error) {
            console.error('Delete user error:', error.message);
            return res.status(500).json({ message: 'Gagal menghapus user' });
        }
    }
};

module.exports = userController;
