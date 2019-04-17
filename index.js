var express = require("express");
var app = express();

app.use(express.static("public"));

app.listen("3333" , function(){
		console.log("servidor levantado en el puerto 3333");
});