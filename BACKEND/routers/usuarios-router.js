var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
var mongoose = require("mongoose");


//Obtener el listado de las usuarios
router.get("/",function(req,res){
    usuario.find().sort({orden:1})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una usuario en particular
router.get("/:id",function(req,res){
    res.send("Enviar detalle del usuario: " + req.params.id);
});

//Agregar una usuario
router.post("/",function(req,res){
    res.send("Guardar un nuevo usuario");
});

//Para actualizar una usuario
router.put("/:id",function(req,res){
    res.send("Actualizar la usuario con código: " + req.params.id);
});

//eliminar una usuario
router.delete("/:id",function(req,res){
    res.send("Eliminar la usuario con código: " + req.params.id);
});

module.exports = router;