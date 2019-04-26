var mongoose = require("mongoose");

var proyectoSchema = new mongoose.Schema(
    {
        nombreProyecto : String,
        html : String,
        css : String,
        javascript : String,
        usuarioCreador : mongoose.Schema.Types.ObjectId,
        nombreCarpeta : mongoose.Schema.Types.ObjectId
    }
);

module.exports = mongoose.model('proyectos',proyectoSchema);
