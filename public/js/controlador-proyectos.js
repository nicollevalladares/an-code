/*var informacion = [
    {nombreProyecto:'Proyecto HOME'},
    {nombreProyecto:'Proyecto 1'},
    {nombreProyecto:'Proyecto 2'},
    {nombreProyecto:'Proyecto 3'},
    {nombreProyecto:'Proyecto 4'},
    {nombreProyecto:'Proyecto 5'}
];

var seleccionado;*/
$(document).ready(function(){
    console.log("El DOM ha sido cargado");

});
generarProyectos();

function generarProyectos(){
    /*for(var i=0;i<informacion.length;i++){
        document.getElementById('proyectos').innerHTML += 
        `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
            <div class="card-body">
            
            <div class="d-flex justify-content-between align-items-center"> 
                <button type="button" class="btn btn-proyecto" onclick="">
                    <i class="far fa-file-alt"></i><br>
                    ${informacion[i].nombreProyecto}
                </button>
                <button class="btn btn-info btn-circle btn-sm" 
                data-toggle="modal" data-target="#modalContenidoProyecto" onclick="editarProyectos(${i})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarProyectos(${i})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            </div>
        </div>`;
    }*/

    $.ajax({
        url:`/proyectos`,
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('proyectos').innerHTML = '';
                for (var i = 0; i < res.length; i++) {
                    document.getElementById('proyectos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[i]._id}')">
                                <i class="far fa-file-alt"></i><br>
                                ${res[i].nombreProyecto}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoProyecto" onclick="editarProyectos('${res[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarProyectos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        </div>
                    </div>`;
    
                }
        },
        error: function (e) {
        //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
        },
    });
}


function editarProyectos(indice){
    seleccionado = indice;
    $("#btn-crear-proyecto").hide();
    $("#btn-editar-proyecto").show();
    document.getElementById('nombreProyecto').value = informacion[indice].nombreProyecto;
}

function guardarCambios(){
    informacion[seleccionado].nombreProyecto = document.getElementById('nombreProyecto').value;
    generarProyectos();
}

function crearProyectos(){
    $("#btn-editar-proyecto").hide();
    $("#btn-crear-proyecto").show();
    
    var campos = [
        {campo:'nombreProyecto',valido:false}
    ];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

   /* informacion.push({
        nombreProyecto:document.getElementById('nombreProyecto').value
    });
    generarProyectos();*/
    var parametros = "nombreProyecto=" + $('#nombreProyecto').val() + "&idCarpeta=" + $('#select-carpeta').val();
       // alert(parametros);
     $.ajax({
         url:'/proyectos',
         data:parametros,
         method:"POST",
         dataType:"JSON",
         success:function(respuesta){
            // alert(respuesta);
            localStorage.setItem("idHTML", respuesta.html);
            localStorage.setItem("idCSS", respuesta.css);
            localStorage.setItem("idJS", respuesta.js);
             window.location = "proyectos.html";
         },
         error: function () {
             alert('error');
         },
     });
    
}

function validarCampoVacio(campo){
    if (document.getElementById(campo).value ==''){   
        document.getElementById(campo).classList.add('input-error');
        document.getElementById('div-error-'+campo).style.display = 'block';
        return false;
    }else{
        document.getElementById(campo).classList.remove('input-error');
        document.getElementById('div-error-'+campo).style.display = 'none';
        return true;
    }
}

function eliminarProyectos(idProyecto){
    //seleccionado = i;
    //console.log(i);
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
            window.location = "proyectos.html"
        },
        error: function () {
            alert('error');
        },
    });
}

function cargarProyecto(idProyecto){
    //window.location = "nuevo-proyecto.html"
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            console.log(res);
            //window.location = "nuevo-proyecto.html"
            document.getElementById('proyectos').innerHTML = '';
            document.getElementById('nombre-pagina').innerHTML = '';
            document.getElementById('editor').style = "display: block";
            document.getElementById('botones-proyecto').innerHTML = `
            <button type="button" class="btn btn-proyecto" onclick="ejecutarProyecto()"><i class="fas fa-play"></i></button>
            <button type="button" class="btn btn-proyecto" onclick="guardarProyecto('${res[0]._id}')"><i class="fas fa-save"></i></button>
            <br>`;

        },
        error: function () {
            alert('error');
        },
    });
}


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

    var estructura = `<!DOCTYPE html>
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

    var res = document.getElementById("resultado").contentWindow.document;
    res.body.innerHTML=estructura;
  }

  function guardarProyecto(idProyecto){
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
