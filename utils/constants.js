const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const SALT_ROUNDS = 10;

const { PORT = 3000, MONGO_SERVER, NODE_ENV } = process.env;

const MONGO_SERVER_DEV = 'mongodb://localhost:27017/moviesdb-dev';

const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3000/',
  'https://localhost:3001/',
  'https://localhost:3001',
  'http://localhost:3001/',
  'https://localhost:3001/',
];

module.exports = {
  DEFAULT_ALLOWED_METHODS,
  SALT_ROUNDS,
  PORT,
  ALLOWED_CORS,
  MONGO_SERVER,
  NODE_ENV,
  MONGO_SERVER_DEV,
};
