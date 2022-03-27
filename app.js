require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { PORT } = require('./utils/constants');
const { handleError } = require('./middlewares/handleError');

const app = express();

const main = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await app.listen(PORT);
  } catch (error) {
    throw new Error(`Сервер не запускается: ${error}`);
  }
};
main();

app.use(cors);
app.use(requestLogger);
app.use(cookieParser());
app.use(router);
app.use(errorLogger);

app.use(handleError);
