 
var mongoose = require('mongoose');


const server = 'localhost:27017';
const database = 'ancode';


class Database{
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(`mongodb://${server}/${database}`).
        then(function(){
            console.log("Base de datos conectada correctamente");
        }).catch(function(error){
            console.log(JSON.stringify(error));
        });

    }

    test(){
        console.log('Prueba');
    }
}


module.exports = new Database();