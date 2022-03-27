const express = require('express');
const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

const moviesRouter = express.Router();

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', express.json(), saveMovie);
moviesRouter.delete('/:movieId', deleteMovie);

module.exports = moviesRouter;
