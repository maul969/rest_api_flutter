// Pemakaian:
//   npm run seed:admin -- <username> <password> "<Nama Lengkap>"
// Contoh:
//   npm run seed:admin -- admin rahasia123 "Administrator"
require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('../config/db');

async function main() {
    const [username, password, nama = 'Administrator'] = process.argv.slice(2);

    if (!username || !password) {
        console.error('Pemakaian: npm run seed:admin -- <username> <password> "<Nama>"');
        process.exit(1);
    }

    if (password.length < 6) {
        console.error('Password minimal 6 karakter');
        process.exit(1);
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
        'INSERT INTO `user` (nama, username, password, role) VALUES (?, ?, ?, ?)',
        [nama, username.trim(), hash, 'admin']
    );

    console.log(`Admin "${username}" berhasil dibuat`);
}

main()
    .catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('Username sudah ada');
        } else {
            console.error('Gagal membuat admin:', error.message);
        }
        process.exitCode = 1;
    })
    .finally(() => db.end());
