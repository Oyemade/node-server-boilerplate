// Starting Point

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Logger
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB setup

mongoose.connect('mongodb://localhost:auth/auth', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// App setup

app.use(morgan('combined'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
