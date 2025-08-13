const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "SECRETO_SUPER_SEGURO";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido o expirado' });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

