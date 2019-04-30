var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String,
        apellido : String,
        usuario : String,
        email : String,
        password : String,
        plan: Array
}

);

module.exports = mongoose.model('usuarios',esquema);


