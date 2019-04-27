var mongoose = require("mongoose");

var carpetaSchema = new mongoose.Schema(
    {
        nombreCarpeta : String,
        usuarioCreador : mongoose.Schema.Types.ObjectId
    }
);

module.exports = mongoose.model('carpetas',carpetaSchema);
