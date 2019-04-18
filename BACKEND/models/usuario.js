let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    usuario: String,
    password: String
});

module.exports = mongoose.model('usuarios', userSchema);