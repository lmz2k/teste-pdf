const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const routers = require('./src/router');

app.use(bodyParse.json());
app.use(cors());
app.options('*', cors());
app.use('/', routers);

app.listen(3001, () => {
  console.log('Api online');
});
