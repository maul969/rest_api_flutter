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
            const { username, password } = req.body || {};

            if (!username || !password) {
                return res.status(400).json({
                    message: 'Username dan password wajib diisi'
                });
            }

            const existingUser = await user.findByUsername(username.trim());
            if (existingUser) {
                return res.status(409).json({ message: 'Username sudah terdaftar' });
            }

            const result = await user.create({
                username: username.trim(),
                password
            });

            return res.status(201).json({
                message: 'User berhasil ditambahkan',
                id: result.insertId
            });
        } catch (error) {
            console.error('Create user error:', error.message);
            return res.status(500).json({ message: 'Gagal menambahkan user' });
        }
    },

    async update(req, res) {
        try {
            const { username, password } = req.body || {};
            if (username === undefined && password === undefined) {
                return res.status(400).json({
                    message: 'Isi minimal satu data yang ingin diperbarui'
                });
            }

            const result = await user.update({
                id: req.params.id,
                username: username === undefined ? undefined : username.trim(),
                password
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'User tidak ditemukan'
                });
            }

            return res.status(200).json({ message: 'User berhasil diperbarui' });
        } catch (error) {
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
