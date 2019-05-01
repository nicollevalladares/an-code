var express = require("express");
var router = express.Router();
var subcarpeta = require("../models/subcarpeta");
var carpeta = require("../models/carpeta");
var mongoose = require("mongoose");

//Peticion para guardar una sub-carpeta
router.post("/", function(req, res){
    var subcarp = new subcarpeta({
        nombreSubCarpeta: req.body.subCarpeta,
        usuarioCreador: req.session.codigoUsuario,
        archivos: [],
        subcarpetas:[],
        proyectos: [],
        carpetaRaiz: req.body.carpetaRaiz
    });

    subcarp.save()
    .then(obj=>{
        carpeta.update(
            {
                _id:req.body.carpetaRaiz
            },
            {
                $push:{
                    subcarpetas: mongoose.Types.ObjectId(obj._id)
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

module.exports = router;