const express = require('express');
const { celebrate } = require('celebrate');
const {
  getMyUser,
  updateUser,
} = require('../controllers/users');
const { joiUserInfoScheme } = require('../utils/validation');

const usersRouter = express.Router();

usersRouter.get('/me', getMyUser);
usersRouter.patch('/me', express.json(), celebrate(joiUserInfoScheme), updateUser);

module.exports = usersRouter;
