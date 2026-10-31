const db = require('../config/db');
const bcrypt = require('bcrypt');

const user = {
    async findAll() {
        const [rows] = await db.query(
            'SELECT id, nama, email FROM users'
        );
        return rows;
    },

    async findByEmail(email) {
        const [rows] = await db.query(
            'SELECT id, nama, email, password FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0] || null;
    },

    async create({ nama, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)',
            [nama, email, hashedPassword]
        );
        return result;
    },

    async update({ id, nama, email, password }) {
        const fields = [];
        const values = [];

        if (nama !== undefined) {
            fields.push('nama = ?');
            values.push(nama);
        }

        if (email !== undefined) {
            fields.push('email = ?');
            values.push(email);
        }

        if (password !== undefined && password !== '') {
            fields.push('password = ?');
            values.push(await bcrypt.hash(password, 10));
        }

        if (fields.length === 0) {
            return { affectedRows: 0 };
        }

        values.push(id);
        const [result] = await db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result;
    },

    async delete(id) {
        const [result] = await db.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return result;
    }
};

module.exports = user;
