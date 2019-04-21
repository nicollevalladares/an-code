var express = require('express');
var session = require("express-session");
var usuario = require("./models/usuario");
var carpeta = require("./models/carpeta");
var proyecto = require("./models/proyecto");
var usuariosRouter = require('./routers/usuarios-router');
//var carpetasRouter = require('./routers/carpetas-router');
var cors = require('cors'); //Cross-Origin Resource Sharing (CORS), Intercambio de recursos de origen cruzado (CORS)
var bodyParser = require('body-parser');
var app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { url } = require('./modules/database');

mongoose.connect(url, {
	useMongoClient: true
});

require('./modules/passport')(passport);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use("/usuarios",usuariosRouter);

app.use(session({
	secret: 'ancode',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routers/login-router')(app, passport);
require('./routers/registrarse-router')(app, passport);
require('./routers/index-router')(app);
require('./routers/landing-page-router')(app);
require('./routers/carpetas-router')(app,carpeta);
require('./routers/proyectos-router')(app, proyecto);

app.use(express.static(path.join(__dirname, 'public')));


app.listen(3333, function(){
    console.log("Servidor levantado");
});