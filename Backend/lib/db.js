import mysql from 'mysql2/promise';

// Pool disimpan di globalThis supaya tidak dibuat ulang tiap hot-reload (mode dev).
const globalForDb = globalThis;

const db =
  globalForDb.__mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sekolah',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

globalForDb.__mysqlPool = db;

export default db;
