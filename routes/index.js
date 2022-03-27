const express = require('express');
const usersRouter = require('./userRouter');
const moviesRouter = require('./moviesRouter');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', express.json(), createUser);
router.post('/signin', express.json(), login);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.get('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

module.exports = router;
