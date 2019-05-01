var mongoose = require("mongoose");

var tarjetaSchema = new mongoose.Schema(
    {
        numero : String,
        mesExpiracion: Number,
        anioExpiracion: Number,
        ccv : Number
    }
);

module.exports = mongoose.model('tarjetas',tarjetaSchema);
