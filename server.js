require('dotenv').config();

const express = require('express');
const cors = require('cors');

const AuthRoutes = require('./src/routes/auth');
const SiswaRoutes = require('./src/routes/siswa');
const UserRoutes = require('./src/routes/user');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API berhasil',
        status: 200
    });
});

app.use('/api/auth', AuthRoutes);
app.use('/api', SiswaRoutes);
app.use('/api', UserRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint tidak ditemukan'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API berjalan di http://localhost:${PORT}`);
});
