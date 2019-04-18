var express = require('express');
var session = require("express-session");
var database = require('./modules/database');
var usuario = require("./models/usuario");
var usuariosRouter = require('./routers/usuarios-router');
var cors = require('cors'); //Cross-Origin Resource Sharing (CORS), Intercambio de recursos de origen cruzado (CORS)
var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use("/usuarios",usuariosRouter);

app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

app.post("/login-in.html",function(req, res){

  usuario.find({usuario:req.body.usuario, contrasena:req.body.contrasena})
  .then(data=>{
      if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
          //Establecer las variables de sesion
          req.session.codigoUsuario = data[0]._id;
          req.session.correoUsuario =  data[0].correo;
          req.session.codigoTipoUsuario = data[0].tipoUsuario;
          res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
      }else{
          res.send({status:0,mensaje:"Credenciales inválidas"});
      }
      
  })
  .catch(error=>{
      res.send(error);
  }); 
  /*if (req.body.usuario == 'jperez' && req.body.contrasena=='asd.456'){
      req.session.codigoUsuario = 1;
      req.session.correoUsuario =  'jperez@gmail.com';
      req.session.codigoTipoUsuario = '2';
  }*/
});

app.listen(3333, function(){
    console.log("Servidor levantado");
});