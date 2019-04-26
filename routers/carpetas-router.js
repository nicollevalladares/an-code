module.exports = (app, carpeta) => {

app.get('/carpetas', (req, res) => {
    res.render('carpetas.html', {
        user: req.user
    });
});


//Obtener una carpeta en particular
/*router.get("/:id",function(req,res){
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
    var p = new carpeta({
            nombre: req.body.nombre,
            usuario: {
                    _id: req.body.usuario,
                    nombre: req.body.nombreUsuario
            }
    });

    console.log(JSON.stringify({
        nombre: req.body.nombre,
        usuario: {
            _id: req.body.usuario,
            nombre: req.body.nombreUsuario
    }
}));

    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});

//Peticion para actualizar un registro
router.put("/:id",function(req,res){
    carpeta.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
            usuario : {
                    nombre : req.body.nombreUsuario,
                    usuario : req.body.Usuario
            }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para eliminar un registro
router.delete("/:id",function(req, res){
    carpeta.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});*/

}