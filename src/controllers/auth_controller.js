const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user_model');

const authController = {
    async register(req, res) {
        try {
            const { nama, email, password } = req.body;

            if (!nama || !email || !password) {
                return res.status(400).json({
                    message: 'Nama, email, dan password wajib diisi'
                });
            }

            if (typeof email !== 'string' || typeof password !== 'string') {
                return res.status(400).json({
                    message: 'Format email atau password tidak valid'
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    message: 'Password minimal 8 karakter'
                });
            }

            const existingUser = await user.findByEmail(email.trim());
            if (existingUser) {
                return res.status(409).json({
                    message: 'Email sudah terdaftar'
                });
            }

            const result = await user.create({
                nama: nama.trim(),
                email: email.trim().toLowerCase(),
                password
            });

            return res.status(201).json({
                message: 'Registrasi berhasil',
                id: result.insertId
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Email sudah terdaftar' });
            }
            console.error('Register error:', error.message);
            return res.status(500).json({ message: 'Gagal melakukan registrasi' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email dan password wajib diisi'
                });
            }

            const foundUser = await user.findByEmail(email.trim().toLowerCase());

            if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
                return res.status(401).json({
                    message: 'Email atau password salah'
                });
            }

            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET belum diatur pada file .env');
                return res.status(500).json({ message: 'Konfigurasi server belum lengkap' });
            }

            const token = jwt.sign(
                { id: foundUser.id, email: foundUser.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );

            return res.status(200).json({
                message: 'Login berhasil',
                token,
                user: {
                    id: foundUser.id,
                    nama: foundUser.nama,
                    email: foundUser.email
                }
            });
        } catch (error) {
            console.error('Login error:', error.message);
            return res.status(500).json({ message: 'Gagal melakukan login' });
        }
    }
};

module.exports = authController;
