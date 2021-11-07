const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports.tokensGenerate = (user) => {

  const payload = {
    id: user.id,
    username: user.userName,
  };

  const secret = config.jwtSecret;
  const tokenEx = config.tokenLife;
  const refreshTokenEx = config.refreshTokenLife;
  
  const token = jwt.sign(payload, secret, { expiresIn: tokenEx });
  const refreshToken = jwt.sign(payload, secret, { expiresIn: refreshTokenEx });

  const data = {
    accessToken: token,
    refreshToken: refreshToken,
    accessTokenExpiredAt: jwt.verify(token, secret).exp * 10,
    refreshTokenExpiredAt: jwt.verify(refreshToken, secret).exp * 10,
  };
  return data;
};

module.exports.tokenGetPayload = (token) => {
  secret = config.jwtSecret;
  payload = jwt.verify(token, secret);
  return payload;
};