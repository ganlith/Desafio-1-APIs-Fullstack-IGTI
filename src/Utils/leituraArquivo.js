const fs = require("fs");

module.exports = function leArquivo() {

    const files = "./src/files";
    const retorno = "Arquivos gerados com sucesso. Para consultar acesse http://localhost:2000/ + Sigla do Estado '.json'. Exemplo: 'MG.json' ";

    let data = fs.readFileSync('./src/Utils/Estados.json', 'utf8');
    const states = JSON.parse(data);

    data = fs.readFileSync('./src/Utils/Cidades.json', 'utf8');
    const cities = JSON.parse(data);
    
    states.forEach(state => {        
        const cidadeEstado = cities.filter(citie => citie.Estado === state.ID);
        fs.writeFile(`${files}/${state.Sigla}.json`,JSON.stringify(cidadeEstado), function (err) {
            if (err) throw err;
            console.log('Arquivo ' + `${files}/${state.Sigla}.json` + ' - Saved!');            
        });
    });   

    return retorno;

  }
