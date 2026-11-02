const db = require('../config/db');

const siswa = {
    async findAll() {
        const [rows] = await db.query(
            'SELECT id, nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan FROM data_siswa ORDER BY id ASC'
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

    // Update berdasarkan id (primary key). nipd ikut bisa diubah.
    async update({ id, nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan }) {
        const [result] = await db.query(
            'UPDATE data_siswa SET nipd = ?, nama_lengkap = ?, jenis_kelamin = ?, alamat = ?, kelas = ?, jurusan = ? WHERE id = ?',
            [nipd, nama_lengkap, jenis_kelamin, alamat, kelas, jurusan, id]
        );
        return result;
    },

    async delete(id) {
        const [result] = await db.query(
            'DELETE FROM data_siswa WHERE id = ?',
            [id]
        );
        return result;
    }
};

module.exports = siswa;
