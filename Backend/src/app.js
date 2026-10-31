const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const siswaRoutes = require('./routes/siswa');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api', authRoutes);
app.use('/api', siswaRoutes);
app.use('/api', userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Format JSON tidak valid' });
    }

    console.error('Unhandled error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

module.exports = app;
