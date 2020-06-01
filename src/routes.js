const express = require("express");

const teste = require('./controllers/teste');

const routes = express.Router();

routes.get("/index", teste.index);
routes.get("/consulta", teste.consulta);

module.exports = routes;
