const express = require("express");
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const path = require('path');

const public = express.static(path.join('src/files'))

const app = express();

app.use(cors());
app.use(express.json());
app.use('/' ,public); 
app.use(routes);
app.use(errors());

module.exports = app;

