const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isUrl(v);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isUrl(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isUrl(v);
      },
    },
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
