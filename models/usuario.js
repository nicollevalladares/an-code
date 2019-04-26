var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String,
        apellido : String,
        usuario : String,
        email : String,
        password : String,
        plan: {
                _id: mongoose.Schema.Types.ObjectId,
                nombre: String
        }
}

);

module.exports = mongoose.model('usuarios',esquema);


