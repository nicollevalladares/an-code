var mongoose = require("mongoose");

var proyectoSchema = new mongoose.Schema(
    {
        nombreProyecto : String,
        archivos: Array,
        usuarioCreador : mongoose.Schema.Types.ObjectId,
        carpetaRaiz : mongoose.Schema.Types.ObjectId
    }
);

module.exports = mongoose.model('proyectos',proyectoSchema);