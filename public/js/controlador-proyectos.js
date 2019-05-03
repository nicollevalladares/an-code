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
                            <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirProyectos('${res[i]._id}')">
                                <i class="fas fa-share-alt"></i>
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


function editarProyectos(idProyecto){
    /*seleccionado = indice;
    $("#btn-crear-proyecto").hide();
    $("#btn-editar-proyecto").show();
    document.getElementById('nombreProyecto').value = informacion[indice].nombreProyecto;*/
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            //window.location = "carpetas.html"
            $("#btn-crear-proyecto").hide();
            document.getElementById('nombreProyecto').value = res[0].nombreProyecto;
            document.getElementById('footer-proyectos').innerHTML = `<button class="btn btn-primary" id="btn-editar" onclick=guardarCambios('${res[0]._id}')>Editar</button>`;
        },
        error: function () {
            alert('error');
        },
    });
}

function guardarCambios(idProyecto){
    /*informacion[seleccionado].nombreProyecto = document.getElementById('nombreProyecto').value;
    generarProyectos();*/
    var campos = [{campo:'nombreProyecto',valido:false}];
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    $('#modalContenidoProyecto').modal('hide');
    $('#modalConfirmacion').modal('show');
    document.getElementById('botones').innerHTML = `
            <button class="btn btn-danger" onclick="cancelarEdicion()"><i class="fa fa-times"></i> No</button>
            <button class="btn btn-primary" onclick="confirmarEdicion('${idProyecto}')"><i class="fa fa-check"></i> Si</button>`;

}

function cancelarEdicion(){
    window.location = "proyectos.html"
}

function confirmarEdicion(idProyecto){
    var parametros = {
        id: idProyecto,
        nombreProyecto: $('#nombreProyecto').val()
    }; 

    $.ajax({
        url:`/proyectos/${idProyecto}`,
        data: parametros,
        method:"PUT",
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


function crearProyectos(idpr){
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
            localStorage.setItem("idHTML", res[0].archivoHTML);
            localStorage.setItem("idCSS", res[0].archivoCSS);
            localStorage.setItem("idJS", res[0].archivoJS);
            //window.location = "nuevo-proyecto.html"
            document.getElementById('proyectos').innerHTML = '';
            document.getElementById('nombre-pagina').innerHTML = '';
            document.getElementById('editor').style = "display: block";
            document.getElementById('botones-proyecto').innerHTML = `
            <button type="button" class="btn btn-proyecto" onclick="ejecutarProyecto()"><i class="fas fa-play"></i></button>
            <button type="button" class="btn btn-proyecto" onclick="guardarProyecto('${res[0]._id}')"><i class="fas fa-save"></i></button>
            <br>`;

            $.ajax({
                url:`/proyectos/${idProyecto}/archivosHTML`,
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
                url:`/proyectos/${idProyecto}/archivosCSS`,
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
                url:`/proyectos/${idProyecto}/archivosJS`,
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

var internet=true;
  document.addEventListener('keyup',function(){
    if(navigator.onLine) {
        console.log('sin internet');
        //modal
        crearIndexeddDB();
        internet=false;
    }else{
        internet=true;
    }
  })

  function guardarProyecto(idProyecto){
   if(internet==false){
       //guardar en indexed
        var transaccion = db.transaction(["proyectos"],"readwrite");
        var objectStoreProyectos = transaccion.objectStore("proyectos");

        var solicitud = objectStoreProyectos.put({
            codigo: `${localStorage.getItem("idHTML")}`,
            html: HTML.getValue()
        });

        var solicitud = objectStoreProyectos.put({
            codigo: `${localStorage.getItem("idCSS")}`,
            css: CSS.getValue()
        });

        var solicitud = objectStoreProyectos.put({
            codigo: `${localStorage.getItem("idJS")}`,
            js: JS.getValue()
        });

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

  function compartirProyectos(idProyecto){
    document.getElementById('resultado-busqueda').innerHTML = '';
    
    document.getElementById('busqueda').innerHTML = `
    <input id="busqueda-correo" style="width: 80%; text-align: center; float:left" type="text" class="form-control" placeholder="Ingrese correo electrónico">
    <button style="float: right" class="btn btn-primary" id="btn-editar" onclick="buscarCorreoProyectos('${idProyecto}')">Buscar</button>`;

    $.ajax({
    url:`/proyectos/${idProyecto}/usuarios`,
    method:"GET",
    dataType:"JSON",
    success:function(res){
        console.log(res);
        console.log(idProyecto);
        document.getElementById('colaboladores').innerHTML =`
        Proyecto: ${res[0].nombreProyecto} compartido con:`;
        for(var i=0;i<res[0].usuarios.length;i++){
            document.getElementById('colaboladores').innerHTML += `
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    ${res[0].usuarios[i].usuario}
                    <button onclick="eliminarColaboradorProyecto('${idProyecto}', '${res[0].usuarios[i]._id}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
                    <i style="color:red" class="fas fa-user-times"></i>
                    </button>
                </li>
            </ul>`;
        }
    },
    error: function (e) {
    //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
    },
});

$('#modalCompartir').modal('show');
}

function buscarCorreoProyectos(idProyecto){
    $.ajax({
        url:`/user/nombre/${$('#busqueda-correo').val()}`,
        method:"get",
        dataType:"json",
        success:function(res){
           // document.getElementById("contactos").innerHTML = '';
            for (var i=0;i<res.length;i++){
                document.getElementById('linea').style = 'margin-top: 12%; display:block';
                document.getElementById('resultado-busqueda').innerHTML += `
                <tr>${res[0].email}
                <button onclick="compartirProyecto('${idProyecto}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
                    <i style="font-size: 20px; color: green;" class="fas fa-user-check"></i>
                </button>
                </tr>`;

                document.getElementById('idUser').innerHTML = `
                <input id="id-usuario" type="text" value="${res[0]._id}">`
			}
        },
        error: function (e) {
            console.log(e);
        },
    }); 
}

function compartirProyecto(idProyecto){
    var parametros = {
        idUsuario : $('#id-usuario').val(),
        idProyecto: idProyecto
    }
    console.log(parametros);

    $.ajax({
        url:`proyectos/compartir`,
        data:parametros,
        method:"POST",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //alert('SE COMPARTIÓ');
            //$(opcion).remove();
            //window.location = '/carpetas.html';
            compartirProyectos(idProyecto);
        },
        error: function (e) {
            console.log(e);
        },
    }); 
}

var db;

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