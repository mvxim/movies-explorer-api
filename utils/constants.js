const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const SALT_ROUNDS = 10;

const { PORT = 3000, MONGO_SERVER } = process.env;

const ALLOWED_CORS = [
  'https://mvxim.nomoredomains.work',
  'http://mvxim.nomoredomains.work',
  'http://mvxim.nomoredomains.work/',
  'https://mvxim.nomoredomains.work/',
  'http://localhost:3001',
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
};
