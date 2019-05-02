var express = require("express");
var router = express.Router();
var archivo = require("../models/archivo");
var carpeta = require("../models/carpeta");
var proyecto = require("../models/proyecto");
var mongoose = require("mongoose");

//Peticion para guardar un archivo
router.post("/", function(req, res){
    var arch = new archivo({
        nombreArchivo: req.body.nombreArchivo,
        extension: req.body.extension,
        usuarioCreador: req.session.codigoUsuario,
        carpetaRaiz: req.body.carpetaRaiz
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
            proyecto.update(
                {
                    _id:req.body.proyectoRaiz
                },
                {
                    $push:{
                        archivos: mongoose.Types.ObjectId(req.body.id)
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
});

module.exports = router;