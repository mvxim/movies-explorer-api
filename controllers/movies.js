const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// GET, /movies
const getSavedMovies = async (req, res, next) => {
  try {
    const savedMovies = await Movie.find({}).populate(['owner']);
    if (!savedMovies) {
      throw new NotFoundError('Фильмов не нашлось :(');
    }
    res.send(savedMovies);
  } catch (error) {
    next(error);
  }
};

// POST, /movies
const saveMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const savedMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    if (savedMovie) {
      res.status(201).send(savedMovie);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при сохранении фильма'));
    } else {
      next(error);
    }
  }
};

// DELETE, /movies/_id
const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id; // достать user._id и сравнить с id овнера фильма
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильма с таким ID не существует.');
    }
    const movieOwnerId = movie.owner.valueOf();
    if (movieOwnerId !== userId) {
      throw new ForbiddenError('Нельзя удалить чужой фильм.');
    }
    const isRemoved = await Movie.findByIdAndRemove(movieId);
    if (!isRemoved) {
      throw new NotFoundError('Передан неверный айди фильма, поэтому не получилось удалить.');
    }
    res.send({
      message: 'Фильм удален',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Передан некорректный ID фильма.'));
    } else {
      next(error);
    }
  }
};

module.exports = {
  getSavedMovies,
  saveMovie,
  deleteMovie,
};
