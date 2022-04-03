const express = require('express');
const { celebrate } = require('celebrate');
const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');
const { joiMovieScheme, joiMovieIdScheme } = require('../utils/validation');

const moviesRouter = express.Router();

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', express.json(), celebrate(joiMovieScheme), saveMovie);
moviesRouter.delete('/:movieId', celebrate(joiMovieIdScheme), deleteMovie);

module.exports = moviesRouter;
