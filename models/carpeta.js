var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        usuario : mongoose.Schema.Types.Mixed
    }
);

module.exports = mongoose.model('carpetas',esquema);
