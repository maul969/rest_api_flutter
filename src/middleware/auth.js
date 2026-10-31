const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'Konfigurasi JWT_SECRET belum diatur' });
    }

    const token = authorization.slice(7);

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token tidak valid atau sudah kedaluwarsa'
        });
    }
}

module.exports = auth;
