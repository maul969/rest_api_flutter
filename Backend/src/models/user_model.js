const db = require('../config/db');

const user = {
    async findByUsername(username) {
        const [rows] = await db.query(
            'SELECT id, username, password FROM user WHERE username = ? LIMIT 1',
            [username]
        );

        return rows[0];
    },

    async findAll() {
        const [rows] = await db.query('SELECT id, username FROM user');
        return rows;
    },

    async create({ username, password }) {
        const [result] = await db.query(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [username, password]
        );
        return result;
    },

    async update({ id, username, password }) {
        const sets = [];
        const values = [];

        if (username !== undefined) {
            sets.push('username = ?');
            values.push(username);
        }
        if (password !== undefined) {
            sets.push('password = ?');
            values.push(password);
        }

        values.push(id);
        const [result] = await db.query(
            `UPDATE user SET ${sets.join(', ')} WHERE id = ?`,
            values
        );
        return result;
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM user WHERE id = ?', [id]);
        return result;
    }
};

module.exports = user;
