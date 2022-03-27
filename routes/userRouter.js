const express = require('express');
const {
  getMyUser,
  updateUser,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/me', getMyUser);
usersRouter.patch('/me', express.json(), updateUser);

module.exports = usersRouter;
