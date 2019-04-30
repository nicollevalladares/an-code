var mongoose = require("mongoose");

var carpetaSchema = new mongoose.Schema(
    {
        nombreCarpeta : String,
        usuarioCreador : mongoose.Schema.Types.ObjectId,
        archivos: Array,
        subcarpetas: Array,
        proyectos: Array
    }
);

module.exports = mongoose.model('carpetas',carpetaSchema);
