var mongoose = require("mongoose");

var proyectoSchema = new mongoose.Schema(
    {
        nombreProyecto : String,
        archivoHTML: mongoose.Schema.Types.ObjectId,
        archivoCSS: mongoose.Schema.Types.ObjectId,
        archivoJS: mongoose.Schema.Types.ObjectId,
        usuarioCreador : mongoose.Schema.Types.ObjectId,
        carpetaRaiz : mongoose.Schema.Types.ObjectId,
        colaboradores: Array
    }
);

module.exports = mongoose.model('proyectos',proyectoSchema);