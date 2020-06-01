const express = require("express");

module.exports = {
    async index(request, response) {
        var fs = require("fs");

        fs.readFile("./src/Utils/Cidades.json" , function(err, data){
        if(err){
            return response.status(400).json({ error: err });
        }
        
        var jsonData = JSON.parse(data); // faz o parse para json
        //var jsonData = Object.keys(jsonData);
        console.log(jsonData);
        return response.json({ jsonData });
        
        });
    },
    async consulta(request, response) {
        var fs = require("fs");

        fs.readFile("./src/Utils/Estados.json" , function(err, data){
        if(err){
            return response.status(400).json({ error: err });
        }
        
        var jsonData = JSON.parse(data); // faz o parse para json
        //var jsonData = Object.keys(jsonData);
        console.log(jsonData);
        return response.json({ jsonData });
        
        });
        
    }
}