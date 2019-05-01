var express = require("express");
var router = express.Router();
var carpeta = require("../models/carpeta");
var mongoose = require("mongoose");

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

//Obtener el contenido de una carpeta en particular
router.get("/:id/contenido",function(req,res){
    carpeta.aggregate([
        {
            $lookup:{
                from:"proyectos",
                localField:"proyectos-carpeta", 
                foreignField:"_id",
                as:"proyectos"
            }
        },
        { 
            $project:{proyectos:{nombreProyecto:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


/*router.post("/nuevoProyecto",function(req,res){
    carpeta.update(
        {
            _id:mongoose.Types.ObjectId(req.body.idCarpeta)
        },
        {
            $push:{
                proyectos: mongoose.Types.ObjectId()
        }
        }
    )
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});*/


//Peticion para guardar una carpeta
router.post("/", function(req, res){
    var carp = new carpeta({
        nombreCarpeta: req.body.nombreCarpeta,
        usuarioCreador: req.session.codigoUsuario,
        archivos: [],
        subcarpetas:[],
        proyectos: []
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
router.put("/:id",function(req,res){
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