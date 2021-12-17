const express = require('express');

const config = require('./services/config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(config.appPort);
