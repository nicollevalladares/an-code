var express = require("express");
var router = express.Router();
var carpeta = require("../models/carpeta");

//Obtener el listado de todas las carpetas de dicho usuario
router.get("/", function(req,res){
    carpeta.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una carpeta en particular
router.get("/:id",function(req,res){
    carpeta.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar una carpeta
router.post("/", function(req, res){
    var carp = new carpeta({
        nombreCarpeta : req.body.nombreCarpeta,
        usuarioCreador :req.session.codigoUsuario
    });

    carp.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});



//Peticion para actualizar un carpeta
router.put("/",function(req,res){
    carpeta.update(
        {_id:req.body.id},
        {
            nombreCarpeta : req.body.nombreCarpeta
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para eliminar un carpeta
router.delete("/:id",function(req, res){
    carpeta.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;