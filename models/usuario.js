var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        idFB: String,
        nombre : String,
        apellido : String,
        usuario : String,
        email : String,
        password : String,
        plan: mongoose.Schema.Types.ObjectId
}

);

module.exports = mongoose.model('usuarios',esquema);


