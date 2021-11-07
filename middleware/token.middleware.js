const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const User = require('../db').models.user;

module.exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secret = config.jwtSecret;
    const payload = jwt.verify(token, secret);
    const user = await User.findOne({ userName: payload.userName });
    req.user = user;
    next();
  } catch (e) {
    console.log('error :', e);
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' });
      return;
    } else {
      res.staus(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
};