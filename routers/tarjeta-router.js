var express = require("express");
var router = express.Router();
var tarjeta = require("../models/tarjeta");
var mongoose = require("mongoose");

//Agregar una tarjeta 
router.post("/",function(req,res){
    var tarj = new tarjeta({
        numero: req.body.numero,
        mesExpiracion: req.body.mesExpiracion,
        anioExpiracion: req.body.anioExpiracion,
        ccv: req.body.ccv
    });

    tarj.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });
});


module.exports = router;