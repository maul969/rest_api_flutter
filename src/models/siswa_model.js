const db = require('../config/db');

const siswa = {
    async findAll() {
        const [rows] = await db.query(
            'SELECT * FROM data_siswa'
        );
        return rows;
    },

    async create({ nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan }) {
        const [result] = await db.query(
            'INSERT INTO data_siswa (nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan) VALUES (?, ?, ?, ?, ?, ?)',
            [nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan]
        );
        return result;
    },

    async update({ nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan }) {
        const [result] = await db.query(
            'UPDATE data_siswa SET nama_lengkap = ?, jenis_kelamin = ?, alamat = ?, kelas = ?, jurusan = ? WHERE nipd = ?',
            [nama_lengkap, jenis_kelamin, alamat, kelas, jurusan, nipd]
        );
        return result;
    },

    async delete(nipd) {
        const [result] = await db.query(
            'DELETE FROM data_siswa WHERE nipd = ?',
            [nipd]
        );
        return result;
    }
};

module.exports = siswa;
