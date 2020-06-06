const express = require("express");
const leituraArquivo = require('../utils/leituraArquivo'); 

module.exports = {
    //Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, 
    //e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. 
    //O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
    async separaEstados(request, response) {
        
        return response.json(leituraArquivo());
    },

    //Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON 
    //correspondente e retorne a quantidade de cidades daquele estado.
    async countCidadesUf(request, response) {
        var fs = require("fs");
        var files = './src/files';
        const { sigla } = request.body;
        
        let data = fs.readFileSync(`${files}/${sigla}.json`, 'utf8');
        const total = JSON.parse(data).length;
                
        return response.json({ total });                
    },

    //Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, 
    //em ordem decrescente. Utilize o método criado no tópico anterior. 
    //Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
    async maioresUfs(request, response) {
        var fs = require("fs");
        var files = './src/files';
        let quantidades = [];
        
        let data = fs.readFileSync('./src/Utils/Estados.json', 'utf8');
        
        const states = JSON.parse(data);

        states.forEach(state => {        
            let data = fs.readFileSync(`${files}/${state.Sigla}.json`, 'utf8');
            const total = JSON.parse(data).length;

            let estadoObj = {Sigla: state.Sigla, Quantidade: total}; 
        
            quantidades.push(estadoObj);
        });   
        quantidades = quantidades.sort((a, b) => b.Quantidade - a.Quantidade);
        
        let quantidadesRetorno = [];
        let qtd = 0;

        for(let i=0; i<5; i++){
            quantidadesRetorno.push(`${quantidades[i].Sigla} - ${quantidades[i].Quantidade}`);
            qtd += quantidades[i].Quantidade;
        }
        return response.json({ quantidadesRetorno });     

    },
    //Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, 
    //seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. 
    //Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
    async menoresUfs(request, response) {
        var fs = require("fs");
        var files = './src/files';
        let quantidades = [];
        
        let data = fs.readFileSync('./src/Utils/Estados.json', 'utf8');
        
        const states = JSON.parse(data);

        states.forEach(state => {        
            let data = fs.readFileSync(`${files}/${state.Sigla}.json`, 'utf8');
            const total = JSON.parse(data).length;

            let estadoObj = {Sigla: state.Sigla, Quantidade: total}; 
        
            quantidades.push(estadoObj);
        });   
        
        quantidades = quantidades.sort((a, b) => a.Quantidade - b.Quantidade);

        let quantidadesRetorno = [];
        let qtd = 0;

        for(let i=0; i<5; i++){

            quantidadesRetorno.push(`${quantidades[i].Sigla} - ${quantidades[i].Quantidade}`);

            qtd += quantidades[i].Quantidade;
        }
        
        return response.json({ quantidadesRetorno });     

    },
    
    //Criar um método que imprima no console um array com a cidade de maior nome de cada estado, 
    //seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. 
    //Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
    async maioresNomesCidadesUfs(request, response) {
        
        var fs = require("fs");
        var files = './src/files';        
        let maiorCidade = []

        let data = fs.readFileSync(`./src/Utils/Estados.json`, 'utf8');

        const statesFull = JSON.parse(data);
        

        statesFull.forEach(stateFull => {    
            
            data = fs.readFileSync(`${files}/${stateFull.Sigla}.json`, 'utf8');

            const states = JSON.parse(data);

            states.sort((a, b) => 
                a.Nome.localeCompare(b.Nome)).sort((a, b) => 
                    b.Nome.length - a.Nome.length);    

            maiorCidade.push({
                        UF: stateFull.Sigla,
                        nomeCidade: states[0].Nome,
                      });
        });
                
        return response.json({ maiorCidade });     
    },
    //Criar um método que imprima no console um array com a cidade de menor nome de cada estado, 
    //seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. 
    //Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
    async menoresNomesCidadesUf(request, response) {
        
        var fs = require("fs");
        var files = './src/files';        
        let menorCidade = []

        let data = fs.readFileSync(`./src/Utils/Estados.json`, 'utf8');

        const statesFull = JSON.parse(data);
        

        statesFull.forEach(stateFull => {    
            
            data = fs.readFileSync(`${files}/${stateFull.Sigla}.json`, 'utf8');

            const states = JSON.parse(data);

            states.sort((a, b) => 
                b.Nome.localeCompare(a.Nome)).sort((a, b) => 
                    a.Nome.length - b.Nome.length);    

            menorCidade.push({
                        UF: stateFull.Sigla,
                        nomeCidade: states[0].Nome,
                      });
        });
                
        return response.json({ menorCidade });    

    },

    //Criar um método que imprima no console a cidade de maior nome entre todos os estados, 
    //seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e 
    //então retornar o primeiro. Exemplo: “Nome da Cidade - UF".
    async cidadeMaiorNomeGeral(request, response) {
        
        var fs = require("fs");

        let data = fs.readFileSync(`./src/Utils/Cidades.json`, 'utf8');

        const cities = JSON.parse(data);

        data = fs.readFileSync(`./src/Utils/Estados.json`, 'utf8');

        const states = JSON.parse(data);

        cities.sort((a, b) => 
            a.Nome.localeCompare(b.Nome)).sort((a, b) => 
                b.Nome.length - a.Nome.length);    
        
        const estadoPesquisa = states.filter(state => cities[0].Estado === state.ID);
        
        const maiorCidadeGeral = {...estadoPesquisa, ...cities[0]};
        
        return response.json({ maiorCidadeGeral });     
    },
    //Criar um método que imprima no console a cidade de menor nome entre todos os estados, 
    //seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e 
    //então retornar o primeiro. Exemplo: “Nome da Cidade - UF".
    async cidadeMenorNomeGeral(request, response) {
        
        var fs = require("fs");

        let data = fs.readFileSync(`./src/Utils/Cidades.json`, 'utf8');

        const cities = JSON.parse(data);

        data = fs.readFileSync(`./src/Utils/Estados.json`, 'utf8');

        const states = JSON.parse(data);

        cities.sort((a, b) => 
            b.Nome.localeCompare(a.Nome)).sort((a, b) => 
                a.Nome.length - b.Nome.length);    

        const estadoPesquisa = states.filter(state => cities[0].Estado === state.ID);
        
        const maiorCidadeGeral = {...estadoPesquisa, ...cities[0]};
                
        return response.json({ maiorCidadeGeral });     
    }
}