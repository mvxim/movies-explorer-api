require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const main = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await app.listen(PORT);
    console.log(`Running at ${PORT}`);
  } catch (error) {
    throw new Error(`Сервер не запускается: ${error}`);
  }
};
main();

app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' });
});
