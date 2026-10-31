const express = require('express');
const cors = require('cors');
require('dotenv').config();

const AuthRoutes = require('./src/routes/auth');
const SiswaRoutes = require('./src/routes/siswa');
const UserRoutes = require('./src/routes/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', AuthRoutes);
app.use('/api', SiswaRoutes);
app.use('/api', UserRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});