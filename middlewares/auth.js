const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new UnauthorizedError('Авторизация не удалась. Нужно авторизоваться, чтобы взаимодействовать с защищенным роутом.');
    }
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'war_is_over_if_you_want_it');
      if (!payload) {
        throw new UnauthorizedError('С токеном авторизации что-то не так: не удалось проверить его подлинность.');
      }
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        next(new UnauthorizedError('С токеном авторизации что-то не так: не удалось проверить его подлинность.'));
      } else {
        next(error);
      }
    }
    req.user = payload; // { _id: 'string', iat: created, exp: expires }
    next();
  } catch (error) {
    next(error);
  }
};
