require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const {
  PORT,
  MONGO_SERVER,
  NODE_ENV,
  MONGO_SERVER_DEV,
} = require('./utils/constants');
const { handleError } = require('./middlewares/handleError');
const { limiter } = require('./utils/limiter');

const app = express();

const dbAddress = NODE_ENV === 'production' ? MONGO_SERVER : MONGO_SERVER_DEV;

const main = async () => {
  try {
    await mongoose.connect(dbAddress, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await app.listen(PORT);
  } catch (error) {
    throw new Error(`Сервер не запускается: ${error}`);
  }
};

main();

app.use(limiter);
app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(cookieParser());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
