var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
var mongoose = require("mongoose");


//Obtener los datos del usuario loggeado

router.get("/todos",function(req, res){
    usuario.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
   
});

router.get("/",function(req, res){
    usuario.find({_id:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
   
});

router.get("/:id/creador",function(req, res){
    usuario.find({
        _id:req.params.id
    },
    {nombre:1,apellido:1})
    .then(data=>{
       res.send(data);
    });
});

/*router.get("/:id/proyectos",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"carpetas", 
                foreignField:"_id",
                as:"carpetas"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        { //Obtener solo el atributo de carpetas
            $project:{carpetas:{nombreProyecto:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    })
});*/


//Agregar una usuario
router.post("/",function(req,res){
    usuario.find({email:req.body.correo})
    .then(data=>{
        if (data.length==1){
            res.send({status:1,mensaje:"Ya existe un usuario con ese correo."});
        }else{
            usuario.find({usuario:req.body.usuario})
            .then(data=>{
            if (data.length==1){
                res.send({status:2,mensaje:"Ya existe un usuario con ese usuario."});
            }else{
                var user = new usuario({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    usuario: req.body.usuario,
                    email: req.body.correo,
                    password: req.body.password,
                    plan: mongoose.Types.ObjectId("5cc7993eb56d781460c5cddf")
                });
            
                user.save()
                .then(obj=>{
                    res.send(obj);
                })
                .catch(error=>{
                    res.send(obj);
                });
            
                res.send({status:0,mensaje:"Guardar un nuevo usuario"});
            }
            })
            .catch(error=>{
                res.send(error);
            });
        }
    })
});

//Agregar una usuario con plan 2
router.post("/plan2",function(req,res){
    var user = new usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        email: req.body.correo,
        password: req.body.password,
        plan: mongoose.Types.ObjectId("5cc7994eb56d781460c5cde0")
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

//Agregar una usuario con plan 3
router.post("/plan3",function(req,res){
    var user = new usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        email: req.body.correo,
        password: req.body.password,
        plan: mongoose.Types.ObjectId("5cc79970b56d781460c5cde1")
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

router.get("/nombre/:correo",function(req, res){
    usuario.find({email:req.params.correo})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
   
});

//Peticion para actualizar un usuario
router.put("/:id",function(req,res){
    usuario.update(
        {_id:req.body.id}, 
        {
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            usuario : req.body.usuario,
            email : req.body.email
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para actualizar plan de un usuario
router.post("/plan",function(req,res){
    usuario.update(
        {
            _id:req.session.codigoUsuario
        }, 
        {
            plan: mongoose.Types.ObjectId(req.body.idplan)
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para actualizar plan de un usuario
router.post("/psw",function(req,res){
    usuario.find(
        {
            _id:req.session.codigoUsuario
        } 
    ).then(result=>{
        if(req.session.password == req.body.actual){
            if(req.body.nueva != req.body.conf){
                res.send({status:2});
            }else{
                actualizarPWS(req,res);
            }
        }
        
        else if(req.session.password != req.body.actual){
            res.send({status:0});
        }

        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

function actualizarPWS(req,res){
    usuario.update(
        {_id:req.session.codigoUsuario},
        {
            password: req.body.nueva
        }
    ).then(data=>{
        res.send({data});
    })
    .catch(error=>{
        res.send(error);
    });
}

module.exports = router;