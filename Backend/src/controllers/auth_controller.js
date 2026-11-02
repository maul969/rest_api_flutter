const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user_model');

const authController = {
    async login(req, res) {
        try {
            const { username, password } = req.body || {};

            if (!username || !password) {
                return res.status(400).json({
                    message: 'Username dan password wajib diisi'
                });
            }

            const foundUser = await user.findByUsername(username);

            // Mendukung password hash bcrypt (diawali $2) maupun teks biasa (sekolah.sql)
            let passwordCocok = false;
            if (foundUser) {
                const tersimpan = String(foundUser.password);
                passwordCocok = tersimpan.startsWith('$2')
                    ? await bcrypt.compare(String(password), tersimpan)
                    : tersimpan === String(password);
            }

            if (!passwordCocok) {
                return res.status(401).json({
                    message: 'Username atau password salah'
                });
            }

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET belum diatur di file .env');
            }

            const token = jwt.sign(
                {
                    id: foundUser.id,
                    username: foundUser.username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
                }
            );

            return res.status(200).json({
                message: 'Login berhasil',
                token,
                user: {
                    id: foundUser.id,
                    username: foundUser.username
                }
            });
        } catch (error) {
            console.error('Error login:', error);

            return res.status(500).json({
                message: 'Terjadi kesalahan pada server'
            });
        }
    }
};

module.exports = authController;
