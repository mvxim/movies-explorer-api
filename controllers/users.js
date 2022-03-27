const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUNDS } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// POST, /signup
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email && !password) {
      throw new BadRequestError('Для регистрации нужен имейл и пароль');
    }
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email, password: hashedPass, name,
    });
    if (user) {
      res.status(201).send({
        message: 'Регистрация успешна!',
        user,
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные создания пользователя.'));
    } else if (error.code === 11000) {
      next(new ConflictError(
        'Пользователь с таким имейлом уже зарегистрирован.',
      ));
    } else {
      next(error);
    }
  }
};

// POST, /signin
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Неправильные почта или пароль');
    }
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'war_is_over_if_you_want_it',
        { expiresIn: '7d' },
      );

      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .status(200).send({
          message: 'Авторизация успешна.',
          id: user._id,
        });
    }
  } catch (error) {
    next(error);
  }
};

// GET, /signout
const logout = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new UnauthorizedError('Нужно авторизоваться, чтобы взаимодействовать с защищенным роутом.');
    }
    res.clearCookie('token', {
      httpOnly: true,
    }).send({ message: 'Разлогинено!' });
  } catch (error) {
    next(error);
  }
};

// GET, /users/me
const getMyUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      throw new NotFoundError('Пользователя с вашим ID не существует!');
    }
    const { name, email } = currentUser;
    res.send({ name, email });
  } catch (error) {
    next(error);
  }
};

// PATCH, /users/me
const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const isThereUserWithSameEmail = await User.findOne({ email });
    if (!isThereUserWithSameEmail) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name,
          email,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (updatedUser) {
        res.send(updatedUser);
      }
    } else {
      throw new ConflictError(
        'Пользователь с таким имейлом уже зарегистрирован.',
      );
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError(
        'Некорректные данные обновления информации пользователя.',
      ));
    } else if (error.code === 11000) {
      next(new ConflictError(
        'Пользователь с таким имейлом уже зарегистрирован.',
      ));
    } else {
      next(error);
    }
  }
};

module.exports = {
  createUser,
  login,
  logout,
  getMyUser,
  updateUser,
};
