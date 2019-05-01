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
                foreignField:"usuarioCreador",
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
    carpeta.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        if(req.session.plan == mongoose.Types.ObjectId("5cc7993eb56d781460c5cddf")){
            if(data.length < 5){
                crearCarpeta(req,res);
            } 
            else{
                respuesta={status:0, mensaje:'Límite de carpetas alcanzadas, si desea crear más, cambie de plan'}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc7994eb56d781460c5cde0")){
            if(data.length < 10){
                crearCarpeta(req,res);
            } 
            else{
                respuesta={status:0}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc79970b56d781460c5cde1")){
            crearCarpeta(req,res);
        }

    });
});

function crearCarpeta(req,res){
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
}



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