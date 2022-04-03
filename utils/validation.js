const { Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const joiSignUpScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
};

const joiSignInScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const joiMovieScheme = {
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    trailerLink: Joi.string().required().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат ссылки');
      }
      return value;
    }),
    image: Joi.string().required().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат ссылки');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат ссылки');
      }
      return value;
    }),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
  }),

};

const joiMovieIdScheme = {
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
};

const joiUserInfoScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),

  }),
};

module.exports = {
  joiSignUpScheme,
  joiSignInScheme,
  joiUserInfoScheme,
  joiMovieScheme,
  joiMovieIdScheme,
};
