var mongoose = require("mongoose");

var carpetaSchema = new mongoose.Schema(
    {
        nombreCarpeta : String,
        usuarioCreador : mongoose.Schema.Types.ObjectId,
        archivosCarpeta: Array,
        subcarpetasCarpeta: Array,
        proyectosCarpeta: Array
    }
);

module.exports = mongoose.model('carpetas',carpetaSchema);
