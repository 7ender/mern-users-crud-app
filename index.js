require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-cqa9f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('MongoDB Connected');
    app.use('/api/users', users);
    return app.listen(PORT);
  })
  .then(() => {
    console.log(`Server running on port ${PORT}`);
  })
  .catch((err) => console.log(err));
