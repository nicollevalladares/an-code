var express = require("express");
var app = express();

app.use(express.static("public"));

app.listen(3334, function(){
    console.log("Frontend en linea");
});