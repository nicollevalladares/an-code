var express = require("express");
var router = express.Router();
var archivo = require("../models/archivo");
var carpeta = require("../models/carpeta");
var subcarpeta = require("../models/subcarpeta");
var proyecto = require("../models/proyecto");
var mongoose = require("mongoose");

//Obtener un archivo en particular
router.get("/:id",function(req,res){
    archivo.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para actualizar un archivo
router.put("/:id",function(req,res){
    archivo.update(
        {_id:req.body.id}, 
        {
            nombreArchivo : req.body.nombreArchivo
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});



//Peticion para eliminar un archivo
router.delete("/:id",function(req, res){
    archivo.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para guardar un archivo
router.post("/", function(req, res){
    var arch = new archivo({
        nombreArchivo: req.body.nombreArchivo,
        extension: req.body.extension,
        usuarioCreador: req.session.codigoUsuario,
        carpetaRaiz: req.body.carpetaRaiz,
        contenido: " "
    });

    arch.save()
    .then(obj=>{
        carpeta.update(
            {
                _id:req.body.carpetaRaiz
            },
            {
                $push:{
                    archivosCarpeta: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
        })
        .catch(error=>{
            res.send(error);
        });

        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});

//Peticion para guardar un archivo
router.post("/subcarpetas", function(req, res){
    var arch = new archivo({
        nombreArchivo: req.body.nombreArchivo,
        extension: req.body.extension,
        usuarioCreador: req.session.codigoUsuario,
        carpetaRaiz: req.body.carpetaRaiz,
        contenido: " "
    });

    arch.save()
    .then(obj=>{
        subcarpeta.update(
            {
                _id:req.body.carpetaRaiz
            },
            {
                $push:{
                    archivosSubcarpeta: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
        })
        .catch(error=>{
            res.send(error);
        });

        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});


//Peticion para guardar archivos de un proyecto 
/*router.post("/proyecto", function(req, res){
    var arch = new archivo({
        nombreArchivo: req.body.nombreArchivo,
        extension: req.body.extension,
        contenido: req.body.contenido,
        usuarioCreador: req.session.codigoUsuario,
        proyectoRaiz: req.body.proyectoRaiz
    });

    arch.save()
    .then(obj=>{
        proyecto.update(
            {
                _id:req.body.proyectoRaiz
            },
            {
                $push:{
                    archivos: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
        })
        .catch(error=>{
            res.send(error);
        });

        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});*/

//Peticion para actualizar archivos de un proyecto 
router.post("/proyecto", function (req, res) {
    archivo.findOne(
        {
            _id: req.body.id
        }
    )
    .then(archivo=>{
        archivo.contenido = req.body.contenido;
        archivo.save()
        .then(obj=>{
            res.send(obj);
        })
        .catch(error=>{
            res.send(obj);
        });
    });
});

//Peticion para actualizar archivos
router.put("/:id/guardar", function (req, res) {
    archivo.update(
        {
            _id: req.body.id
        },
        {
            contenido : req.body.contenido
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para agregar colaborador a un arhivo
router.post("/compartir", function(req, res){
    archivo.update(
        { 
            _id: req.body.idArchivo
        },
        {
            $push:{
                colaboradores: mongoose.Types.ObjectId(req.body.idUsuario)
            }
        }
    )
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(data);
    });
});

//Obtener los colaboladores de un archivo en particular
router.get("/:id/usuarios",function(req,res){
    archivo.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"colaboradores", 
                foreignField:"_id",
                as:"usuarios"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        { 
            $project:{nombreArchivo:1, usuarios:{usuario:1, _id:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para eliminar un colaborador de un archivo
router.delete("/eliminarColaborador/:idArchivo/:idUsuario",function(req, res){
    archivo.update(
        {
            _id: req.params.idArchivo
        },
        {
            $pull:{
                colaboradores:mongoose.Types.ObjectId(req.params.idUsuario)
            }
            
        }
    ).then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//peticion para mostrar los archivos compartidos
router.post("/prueba",function(req,res){
    archivo.find({
        colaboradores:mongoose.Types.ObjectId(req.session.codigoUsuario)
    },
    {
        _id:1,usuarioCreador:1, nombreArchivo:1, extension:1
    })
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;