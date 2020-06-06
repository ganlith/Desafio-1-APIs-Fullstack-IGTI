const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');

const teste = require('./controllers/estadosCidades');

const routes = express.Router();

routes.get("/separaEstados", teste.separaEstados);


routes.get("/countCidadesUf", celebrate({
    [Segments.BODY]: Joi.object().keys({
      Sigla: Joi.string().required()
    })
}), teste.countCidadesUf);


routes.get("/maioresUfs", teste.maioresUfs);

routes.get("/menoresUfs", teste.menoresUfs);

routes.get("/maioresNomesCidadesUfs", teste.maioresNomesCidadesUfs);

routes.get("/menoresNomesCidadesUf", teste.menoresNomesCidadesUf);

routes.get("/cidadeMaiorNomeGeral", teste.cidadeMaiorNomeGeral);

routes.get("/cidadeMenorNomeGeral", teste.cidadeMenorNomeGeral);

module.exports = routes;
