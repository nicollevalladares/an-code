var mongoose = require("mongoose");

var archivoSchema = new mongoose.Schema(
        {
                nombreArchivo : String,
                extension : String,
                contenido : String,
                usuarioCreador : mongoose.Schema.Types.ObjectId,
                carpetaRaiz : mongoose.Schema.Types.ObjectId,
                proyectoRaiz : mongoose.Schema.Types.ObjectId,
                colaboradores: Array
        }
);

module.exports = mongoose.model('archivos',archivoSchema);


