var express = require('express');
var session = require("express-session");
var usuario = require("./models/usuario");
/*var carpeta = require("./models/carpeta");
var proyecto = require("./models/proyecto");*/
var usuariosRouter = require('./routers/usuarios-router');
var proyectosRouter = require('./routers/proyectos-router');
var carpetasRouter = require('./routers/carpetas-router');
var archivosRouter = require('./routers/archivos-router');
var tajetasRouter = require('./routers/tarjeta-router');
var subCarpetasRouter = require('./routers/subcarpetas-router');
var cors = require('cors'); //Cross-Origin Resource Sharing (CORS), Intercambio de recursos de origen cruzado (CORS)
var bodyParser = require('body-parser');
var app = express();

const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { url } = require('./modules/database');

mongoose.connect(url, {
	useMongoClient: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static("public"));
var loginVerificado = express.static("loginVerificado");

app.use(session({
	secret: 'ancode',
	resave: false,
	saveUninitialized: false
}));


/*require('./routers/login-router')(app, passport);
require('./routers/registrarse-router')(app, passport);
require('./routers/index-router')(app);
require('./routers/configuracion-router')(app);
require('./routers/perfil-router')(app);
require('./routers/landing-page-router')(app);
require('./routers/carpetas-router')(app,passport);
require('./routers/proyectos-router')(app, proyecto);*/

app.use("/usuarios",usuario);
app.use("/user",usuariosRouter);
app.use("/carpetas",carpetasRouter);
app.use("/subcarpetas",subCarpetasRouter);
app.use("/proyectos",proyectosRouter);
app.use("/archivos",archivosRouter);
app.use("/tarjetas",tajetasRouter);


app.get('/', (req, res) => {
	res.redirect('index.html');
});

app.use(
    function(req,res,next){
        if (req.session.codigoUsuario){
            loginVerificado(req, res, next);
        }
        else{
            return next();
        }
    }
);


//login
app.post("/login",function(req, res){
    usuario.find({email:req.body.email, password:req.body.password})
    .then(data=>{
        if (data.length==1){
            req.session.codigoUsuario = data[0]._id;
            req.session.plan = data[0].plan;
            req.session.password = data[0].password;
            res.cookie("codigoUsuario", req.session.codigoUsuario);

            res.send({status:1,mensaje:"Usuario loggeado con éxito"});
        }else{
            res.send({status:0,mensaje:"Correo o contraseña incorrecta."});
        }
        
    })
    .catch(error=>{
        res.send(error);
    });
});

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/login.html");
});

/*Verificaciones de acceso*/
app.get('/menu.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/menu.html');
});

app.get('/proyectos.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/proyectos.html');
});

app.get('/nuevoproyecto.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/nuevoproyecto.html');
});

app.get('/carpetas.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/carpetas.html');
});

app.get('/compartidos.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/compartidos.html');
});

app.get('/perfil.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/perfil.html');
});

app.get('/configuracion.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/configuracion.html');
});

app.get('/editor.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/editor.html');
});

function verificarAutenticacion(req, res, next) {
    if (req.session.codigoUsuario){
        return next();
    }
    else{
        res.redirect('/error404.html');
    }
}
/*Fin Verificaciones de Acceso*/


//app.use(express.static(path.join(__dirname, 'public')));


app.listen(process.env.PORT || 3334, function(){
    console.log("Servidor levantado");
});