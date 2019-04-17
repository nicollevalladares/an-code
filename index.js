var express = require('express');
//var UserModel = require('./models/user');
//var testModule = require('./test-module');
var database = require('./database');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ancode");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.listen(3333, function(){
    database.test();
    console.log("Servidor levantado");
});