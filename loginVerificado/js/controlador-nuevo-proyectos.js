var db;

$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    if(!navigator.onLine){
    var solicitud = window.indexedDB.open("ancode", 1);
        solicitud.onsuccess = function(evento){
            db = solicitud.result;
            var transaccion = db.transaction(["proyectos"],"readonly");
            var objectStoreProyectos = transaccion.objectStore("proyectos");
            var cursor = objectStoreProyectos.openCursor();
            cursor.onsuccess = function(evento){
                //Se ejecuta por cada elemento leído del objectstore
                if(evento.target.result){
                    //console.log(evento.target.result.value);
                    var registro = evento.target.result.value;
                    HTML.setValue(registro.html);
                    CSS.setValue(registro.css);
                    JS.setValue(registro.js);
                    evento.target.result.continue();
                }
            }
        };
    }
    else{
    $.ajax({
        url:`/proyectos/${obtenerId('idProyecto')}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            console.log(res);
            localStorage.setItem("idHTML", res[0].archivoHTML);
            localStorage.setItem("idCSS", res[0].archivoCSS);
            localStorage.setItem("idJS", res[0].archivoJS);
            //window.location = "nuevo-proyecto.html"
            document.getElementById('nombre-proyecto').innerHTML = `PROYECTO: ${res[0].nombreProyecto}`;
            document.getElementById('botones-proyecto').innerHTML = `
            <button type="button" class="btn btn-proyecto" onclick="ejecutarProyecto()"><i class="fas fa-play"></i></button>
            <button type="button" class="btn btn-proyecto" onclick="guardarProyecto('${res[0]._id}')"><i class="fas fa-save"></i></button>
            <br>`;

            $.ajax({
                url:`/proyectos/${obtenerId('idProyecto')}/archivosHTML`,
                method:"GET",
                dataType:"JSON",
                success:function(res){
                   // alert(respuesta);
                    console.log(res);
                    HTML.setValue(res[0].archivos[0].contenido);
                },
                error: function () {
                    alert('error');
                },
            });

            $.ajax({
                url:`/proyectos/${obtenerId('idProyecto')}/archivosCSS`,
                method:"GET",
                dataType:"JSON",
                success:function(res){
                   // alert(respuesta);
                    console.log(res);
                    CSS.setValue(res[0].archivos[0].contenido);
                },
                error: function () {
                    alert('error');
                },
            });

            $.ajax({
                url:`/proyectos/${obtenerId('idProyecto')}/archivosJS`,
                method:"GET",
                dataType:"JSON",
                success:function(res){
                   // alert(respuesta);
                    console.log(res);
                    JS.setValue(res[0].archivos[0].contenido);
                },
                error: function () {
                    alert('error');
                },
            });

        },
        error: function () {
            alert('error');
        },
    });
    }
});

var HTML = CodeMirror(document.getElementById('html'), {
    lineNumbers: true,
    mode:'xml'
});

var CSS = CodeMirror(document.getElementById('css'), {
    lineNumbers: true,
    mode:'css'
});

var JS = CodeMirror(document.getElementById('js'), {
    lineNumbers: true,
    mode:'javascript'
});

var input = document.getElementById("select");
function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    HTML.setOption("theme", theme);
    CSS.setOption("theme", theme);
    JS.setOption("theme", theme);
    location.hash = "#" + theme;
}

var choice = (location.hash && location.hash.slice(1)) ||
            (document.location.search &&
            decodeURIComponent(document.location.search.slice(1)));
if (choice) {
    input.value = choice;
    HTML.setOption("theme", choice);
    CSS.setOption("theme", choice);
    JS.setOption("theme", choice);
}
CodeMirror.on(window, "hashchange", function() {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
});

function ejecutarProyecto(){
var html = HTML.getValue();
var css = CSS.getValue();
var js = JS.getValue();

var mostrarRes = `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
                    <style>
                          body{
                            background-color: #f8f9fc !important;
                          }

                          ${css}  
                    </style>  
                  </head>
                  <body>
                        ${html} 

                  <script src="vendor/jquery/jquery.min.js"></script>
                  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                  <script>${js}</script>
                  </body>

                  </html>`;

    /*var resultado = document.getElementById("resultado").contentWindow.document;
    resultado.body.innerHTML=mostrarRes;*/

    var resFrame = document.getElementById("resultado");
    var res = resFrame.contentDocument ||  resFrame.contentWindow.document;
    res.open();
    res.write(mostrarRes);
    res.close();
}

function guardarProyecto(idProyecto){
    if(internet==false){
       //guardar en indexed
        var transaccion = db.transaction(["proyectos"],"readwrite");
        var objectStoreProyectos = transaccion.objectStore("proyectos");
    
        var solicitud = objectStoreProyectos.put({
            codigo: obtenerId('idProyecto'),
            html: HTML.getValue(),
            css: CSS.getValue(),
            js: JS.getValue()
        });
    
        /*var solicitud = objectStoreProyectos.put({
            codigo: `${localStorage.getItem("idCSS")}`,
            css: CSS.getValue()
        });
    
        var solicitud = objectStoreProyectos.put({
            codigo: `${localStorage.getItem("idJS")}`,
            js: JS.getValue()
        });*/
    
       solicitud.onsuccess = function(evento){
           console.log("Se agrego el proyecto con éxito");
           //actualizarTabla();
       }
    }else{
      var html = {
        id: `${localStorage.getItem("idHTML")}`,
        contenido: HTML.getValue(),
        extension: 'html',
        nombreArchivo: 'archivo1',
        proyectoRaiz: idProyecto
      }
     
      console.log(html);
        $.ajax({
            url:"/archivos/proyecto",
            data:html,
            method:"POST",
            dataType:"JSON",
            success:function(respuesta){
            // alert(respuesta);
                //window.location = "proyectos.html"
            },
            error: function () {
                alert('error');
            },
        });
    
        var css = {
            id: `${localStorage.getItem("idCSS")}`,
            contenido: CSS.getValue(),
            extension: 'css',
            nombreArchivo: 'archivo2',
            proyectoRaiz: idProyecto
        }
        
        $.ajax({
            url:"/archivos/proyecto",
            data:css,
            method:"POST",
            dataType:"JSON",
            success:function(respuesta){
            // alert(respuesta);
            //window.location = "proyectos.html"
            },
            error: function () {
                alert('error');
            },
        });
    
        var js = {
            id: `${localStorage.getItem("idJS")}`,
            contenido: JS.getValue(),
            extension: 'css',
            nombreArchivo: 'archivo2',
            proyectoRaiz: idProyecto
        }
        
        $.ajax({
            url:"/archivos/proyecto",
            data:js,
            method:"POST",
            dataType:"JSON",
            success:function(respuesta){
            // alert(respuesta);
            //window.location = "proyectos.html"
            },
            error: function () {
                alert('error');
            },
        });
    
        window.location = "proyectos.html";
        }
    }


function obtenerId(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var internet=true;
document.addEventListener('keyup',function(){
if(!navigator.onLine) {
    console.log('sin internet');
    //modal
    crearIndexeddDB();
    internet=false;
}else{
    internet=true;
}
})



function crearIndexeddDB(){
    if (!('indexedDB' in window)){
        console.err("El navegador no soporta indexedDB");
        return;
    }
    //open crea la base de datos si no existe, en caso contrario la abre para utilizarla
    var solicitud = window.indexedDB.open("ancode", 1);//Parametros: nombre, version. La version debe ser entero
    
    solicitud.onsuccess = function(evento){
        db = solicitud.result;
    }

    solicitud.onerror = function(evento){
        console.error(evento);
    }

    //Evento que se ejecuta cuando se crea  o actualiza la base datos
    solicitud.onupgradeneeded = function(evento){
        db = evento.target.result;//Obtener referencia de la BD creada
        //Crear contenedores de objetos (ObjectStores)
        var objectStoreProyectos = db.createObjectStore("proyectos", {keyPath: "codigo", autoIncrement: true});
        objectStoreProyectos.transaction.oncomplete = function(evento){
        }
        objectStoreProyectos.transaction.onerror = function(evento){
            console.log("Error al crear el object store de proyectos");
        }
    }
}
crearIndexeddDB();