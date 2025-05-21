const passport = require('passport');
const jwt = require('../providers/jwt.provider');
const authService = require('../services/auth.services');



const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    
      const token = jwt.generateToken({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    return res.json({
      message: 'Authentication successful',
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  })(req, res, next);
};

const register = async (req, res) => {
  try {
    const result =  await authService.createUser(req.body);
    res.status(201).json(result)
    } catch (error) {
      console.error('Error registering user:', error);
  }
}
module.exports = {
    login, register
};