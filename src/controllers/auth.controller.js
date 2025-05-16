const passport = require('passport');
const jwt = require('jsonwebtoken');



const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      'tu_secreto_super_seguro',
      { expiresIn: '2h' }
    );

    return res.json({
      message: 'Authentication successful',
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  })(req, res, next);
};

module.exports = {
    login
};