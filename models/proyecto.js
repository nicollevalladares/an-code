var mongoose = require("mongoose");

var proyectoSchema = new mongoose.Schema(
    {
        nombreProyecto : String,
        usuario : mongoose.Schema.Types.Mixed,
        nombreCarpeta : mongoose.Schema.Types.Mixed
    }
);

module.exports = mongoose.model('proyectos',proyectoSchema);
