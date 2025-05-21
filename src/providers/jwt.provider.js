const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'SECRETO_SUPER_SEGURO';

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '2h' });
};
const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
    generateToken,
    verifyToken
    };