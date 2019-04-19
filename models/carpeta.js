var mongoose = require("mongoose");

var carpetaSchema = new mongoose.Schema(
    {
        nombreCarpeta : String,
        usuario : mongoose.Schema.Types.Mixed
    }
);

module.exports = mongoose.model('carpetas',carpetaSchema);
