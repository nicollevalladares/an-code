var mongoose = require("mongoose");

var subCarpetaSchema = new mongoose.Schema(
    {
        nombreSubCarpeta : String,
        usuarioCreador : mongoose.Schema.Types.ObjectId,
        archivosSubcarpeta: Array,
        proyectosSubcarpeta: Array,
        carpetaRaiz : mongoose.Schema.Types.ObjectId,
        colaboradores: Array
    }
);

module.exports = mongoose.model('subcarpetas',subCarpetaSchema);
