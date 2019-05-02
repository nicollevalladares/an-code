var express = require("express");
var router = express.Router();
var proyecto = require("../models/proyecto");
var carpeta = require("../models/carpeta");
var mongoose = require("mongoose");
var archivo = require("../models/archivo");

//Obtener el listado de todos los proyectos
router.get("/", function(req,res){
    proyecto.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una proyecto en particular
router.get("/:id",function(req,res){
    proyecto.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar una proyecto
router.post("/", function(req, res){
    proyecto.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        if(req.session.plan == mongoose.Types.ObjectId("5cc7993eb56d781460c5cddf")){
            if(data.length < 15){
                crearProyecto(req,res);
            } 
            else{
                respuesta={status:0, mensaje:'Límite de carpetas alcanzadas, si desea crear más, cambie de plan'}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc7994eb56d781460c5cde0")){
            if(data.length < 30){
                crearProyecto(req,res);
            } 
            else{
                respuesta={status:0}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc79970b56d781460c5cde1")){
            crearProyecto(req,res);
        }

    });
});

function crearProyecto(req,res){
    var proyect = new proyecto({
        usuarioCreador: req.session.codigoUsuario,
        nombreProyecto: req.body.nombreProyecto,
        archivos: [],
        carpetaRaiz: req.body.idCarpeta
    });

    proyect.save()
    .then(obj=>{

        carpeta.update(
            {
                _id:req.body.idCarpeta
            },
            {
                $push:{
                    proyectosCarpeta: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(error=>{
            res.send(error);
        });

        var idArchivo1 = mongoose.Types.ObjectId();
        var idArchivo2 = mongoose.Types.ObjectId();
        var idArchivo3 = mongoose.Types.ObjectId();

        var arch1 = new archivo({
            _id: idArchivo1,
            nombreArchivo: 'archivo1',
            extension: 'html',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        var arch2 = new archivo({
            _id: idArchivo2,
            nombreArchivo: 'archivo2',
            extension: 'css',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        var arch3 = new archivo({
            _id: idArchivo3,
            nombreArchivo: 'archivo3',
            extension: 'js',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        arch1.save();
        arch2.save();
        arch3.save();

        idsArchivos = {
            html: idArchivo1,
            css: idArchivo2,
            js: idArchivo3
        }
        
        res.send(idsArchivos);
        
    res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });
}

//Peticion para actualizar un proyecto
router.put("/:id",function(req,res){
    proyecto.update(
        {_id:req.params.id},
        {
            css : req.body.css,
            html : req.body.html,
            javascript:req.body.javascript,
            ultimaModificacion:req.body.ultimaModificacion
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para actualizar un proyecto
router.put("/",function(req,res){
    proyecto.update(
        {_id:req.body.id},
        {
            nombre : req.body.nombre
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para eliminar un proyecto
router.delete("/:id",function(req, res){
    proyecto.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;