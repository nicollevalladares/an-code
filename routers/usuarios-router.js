var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
//var mongoose = require("mongoose");


//Obtener los datos del usuario loggeado

router.get("/",function(req, res){
    usuario.find({_id:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
   
});

//Agregar una usuario
router.post("/",function(req,res){
    var user = new usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        email: req.body.correo,
        password: req.body.password,
        plan: []
    });

    user.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

    res.send("Guardar un nuevo usuario");
});

/*//Obtener una usuario en particular
router.get("/:id",function(req,res){
    res.send("Enviar detalle del usuario: " + req.params.id);
});


//Para actualizar una usuario
router.put("/:id",function(req,res){
    res.send("Actualizar la usuario con código: " + req.params.id);
});

//eliminar una usuario
router.delete("/:id",function(req,res){
    res.send("Eliminar la usuario con código: " + req.params.id);
});*/

module.exports = router;