//function generarCarpetas(){
    //console.log('GENERAR ITEMS');
    
    /*for(var i=0; i<informacion.length;i++){
        console.log(informacion[i]);

      document.getElementById('carpetas').innerHTML = '';
        for(var i=0;i<informacion.length;i++){
            document.getElementById('carpetas').innerHTML += 
            `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                <div class="card-body">
                
                <div class="d-flex justify-content-between align-items-center"> 
                    <button type="button" class="btn btn-proyecto" onclick="contenidoCarpeta(${i})">
                        <i class="fas fa-folder-open"></i><br>
                        ${informacion[i].nombreCarpeta}
                    </button>
                    <button class="btn btn-info btn-circle btn-sm" 
                    data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarCarpetas(${i})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarCarpetas(${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                </div>
            </div>`;
        }
    }*/
    
function generarCarpetas(){
    $.ajax({
        url:"/carpetas",
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('carpetas').innerHTML="";       
                for (var i = 0; i < res.length; i++) {
                    document.getElementById('carpetas').innerHTML+=`
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center"> 
                                <button type="button" class="btn btn-proyecto" onclick="contenidoCarpeta('${res[i]._id}')">
                                    <i class="fas fa-folder-open"></i><br>
                                    ${res[i].nombreCarpeta}
                                </button>
                                <button class="btn btn-info btn-circle btn-sm" 
                                data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarCarpetas('${res[i]._id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirCarpetas('${res[i]._id}')">
                                <i class="fas fa-share-alt"></i>
                                </button>
                                <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarCarpetas('${res[i]._id}')">
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

$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    /*$.ajax({
        url:"/carpetas",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            generarItems(res);
        },
        error:function(error){
            console.log(error);
        }
    });
   document.getElementById('carpetas').innerHTML = '';
    for(var i=0;i<informacion.length;i++){
        document.getElementById('carpetas').innerHTML += 
        `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
            <div class="card-body">
            
            <div class="d-flex justify-content-between align-items-center"> 
                <button type="button" class="btn btn-proyecto" onclick="contenidoCarpeta(${i})">
                    <i class="fas fa-folder-open"></i><br>
                    ${informacion[i].nombreCarpeta}
                </button>
                <button class="btn btn-info btn-circle btn-sm" 
                data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarCarpetas(${i})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarCarpetas(${i})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            </div>
        </div>`;
    }*/
});
generarCarpetas();

function crearCarpetas(){
    var campos = [{campo:'nombreCarpeta',valido:false}];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var parametro = "nombreCarpeta=" + $('#nombreCarpeta').val();
   // alert(parametro);
    $.ajax({
        url:"/carpetas",
        data:parametro,
        method:"POST",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
            if(respuesta.status == 0){
                /*document.getElementById('div-carpetas-maximas').style = 'display: block';
                $('#div-carpetas-maximas').fadeOut(6000);
                document.getElementById('limite').style = 'display: block';
                $('#limite').fadeOut(6000);*/
                //window.location = "carpetas.html";
                iziToast.error({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'ERROR',
                    message: respuesta.mensaje,
                });
            }
            else{
               // window.location = "carpetas.html";
                iziToast.success({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'OK',
                    message: 'Carpeta creada con éxito!',
                    onClosing: function(instance, toast, closedBy){
                        console.info('Closed | closedBy: ' + closedBy);
                        window.location = "menu.html"
                    }
                });
            } 
        },
        error: function () {
            //alert('error');
        },
    });

}

function editarCarpetas(idCarpeta){
    /*seleccionado = indice;
    $("#btn-crear-carpeta").hide();
    $("#btn-editar-carpeta").show();
    document.getElementById('nombreCarpeta').value = informacion[indice].nombreCarpeta;*/
    
    $.ajax({
        url:`/carpetas/${idCarpeta}`,
        //data:idCarpeta,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            //window.location = "carpetas.html"
            $("#btn-crear-carpeta").hide();
            $("#btn-editar-carpeta").show();
            document.getElementById('nombre').value = res[0].nombreCarpeta;
            document.getElementById('footer').innerHTML = `<button class="btn btn-primary" id="btn-editar" onclick=guardarCambios('${res[0]._id}')>Editar</button>`;
        },
        error: function () {
            //alert('error');
        },
    });
}

function eliminarCarpetas(idCarpeta){
    /*seleccionado = indice;
    informacion.splice(seleccionado, 1);
    generarCarpetas();*/
    $.ajax({
        url:`/carpetas/${idCarpeta}`,
        //data:idCarpeta,
        method:"DELETE",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
            //window.location = "carpetas.html"
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Carpeta eliminada con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    window.location = "carpetas.html"
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

function guardarCambios(idCarpeta){
    var campos = [{campo:'nombre',valido:false}];
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    $('#modalContenidoCarpeta').modal('hide');
    $('#modalConfirmacion').modal('show');
    document.getElementById('botones').innerHTML = `
            <button class="btn btn-danger" onclick="cancelarEdicion()"><i class="fa fa-times"></i> No</button>
            <button class="btn btn-primary" onclick="confirmarEdicion('${idCarpeta}')"><i class="fa fa-check"></i> Si</button>`;

    
    
            
    /*informacion[seleccionado].nombreCarpeta = document.getElementById('nombreCarpeta').value;
    generarCarpetas();*/
    
}

function cancelarEdicion(){
    window.location = "carpetas.html"
}

function confirmarEdicion(idCarpeta){
    var parametros = {
        id: idCarpeta,
        nombreCarpeta: $('#nombre').val()
    }; 

    $.ajax({
        url:`/carpetas/${idCarpeta}`,
        data: parametros,
        method:"PUT",
        dataType:"JSON",
        success:function(respuesta){
            // alert(respuesta);
            //window.location = "carpetas.html"
            $('#modalConfirmacion').modal('hide');
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Carpeta actualizada con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    window.location = "carpetas.html"
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

function contenidoCarpeta(idCarpeta){
    $.ajax({
        url:`/carpetas/${idCarpeta}/proyectos`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
                //window.location = "contenido-carpeta.html"
                console.log(res);
                document.getElementById('editor-archivo').innerHTML = `
                <div>
                    <div id="nombre-pagina">
                        <h1>CARPETAS</h1>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#modalCarpeta">Nueva Carpeta</button>
                    </div>
                    <div class="row" id="carpetas">
                        
                    </div>

                </div> `;
                document.getElementById('nombre-pagina').innerHTML =`
                <h1>CONTENIDO CARPETA: ${res[0].nombreCarpeta}</h1>
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalNuevosDocs"><i class="fas fa-plus"></i>Nuevo</button>`;
                document.getElementById('footer-contenido').innerHTML = `<button class="btn btn-primary" onclick=nuevoContenido('${idCarpeta}')>Crear</button>`;
                document.getElementById('carpetas').innerHTML = '';
                for(var i=0;i<res[0].proyectos.length;i++){
                    document.getElementById('carpetas').innerHTML += 
                    `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].proyectos[i]._id}')">
                                <i class="far fa-file-alt"></i><br>
                                ${res[0].proyectos[i].nombreProyecto}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalProyectos" onclick="editarProyectos('${res[0].proyectos[i]._id}', '${idCarpeta}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirProyectos('${res[0].proyectos[i]._id}')">
                                <i class="fas fa-share-alt"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarProyectos('${res[0].proyectos[i]._id}', '${idCarpeta}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        </div>
                    </div>`;
                }

                $.ajax({
                    url:`/carpetas/${idCarpeta}/subcarpetas`,
                    method:"GET",
                    dataType:"JSON",
                    success:function(res){
                            //window.location = "contenido-carpeta.html"
                            console.log(res);
                            for(var i=0;i<res[0].subcarpetas.length;i++){
                                document.getElementById('carpetas').innerHTML += 
                                `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                    <div class="card-body">
                                    
                                    <div class="d-flex justify-content-between align-items-center"> 
                                        <button type="button" class="btn btn-proyecto" onclick="cargarSubCarpeta('${res[0].subcarpetas[i]._id}')">
                                            <i class="fas fa-folder-open"></i><br>
                                            ${res[0].subcarpetas[i].nombreSubCarpeta}
                                        </button>
                                        <button class="btn btn-info btn-circle btn-sm" 
                                        data-toggle="modal" data-target="#modalSubCarpeta" onclick="editarSubCarpeta('${res[0].subcarpetas[i]._id}', '${idCarpeta}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirSubCarpetas('${res[0].subcarpetas[i]._id}')">
                                            <i class="fas fa-share-alt"></i>
                                        </button>
                                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarSubCarpeta('${res[0].subcarpetas[i]._id}', '${idCarpeta}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
                            }

                            $.ajax({
                                url:`/carpetas/${idCarpeta}/archivos`,
                                method:"GET",
                                dataType:"JSON",
                                success:function(res){
                                        //window.location = "contenido-carpeta.html"
                                        console.log(res);
                                        for(var i=0;i<res[0].archivos.length;i++){
                                            if(res[0].archivos[i].extension == "html"){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fab fa-html5"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                    <button class="btn btn-info btn-circle btn-sm" 
                                                    data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[0].archivos[i]._id}')">
                                                        <i class="fas fa-share-alt"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                                            else if(res[0].archivos[i].extension == 'css'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fab fa-css3-alt"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                    <button class="btn btn-info btn-circle btn-sm" 
                                                    data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[0].archivos[i]._id}')">
                                                        <i class="fas fa-share-alt"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                        
                                            else if(res[0].archivos[i].extension == 'js'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fab fa-js-square"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                    <button class="btn btn-info btn-circle btn-sm" 
                                                    data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[0].archivos[i]._id}')">
                                                        <i class="fas fa-share-alt"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                        
                                            else if(res[0].archivos[i].extension == 'py'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i style="font-size: 70px; color:#273c7c" class="fab fa-python"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                    <button class="btn btn-info btn-circle btn-sm" 
                                                    data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[0].archivos[i]._id}')">
                                                        <i class="fas fa-share-alt"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                        
                                            else if(res[0].archivos[i].extension == 'php'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i style="font-size: 70px; color:purple" class="fab fa-php"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                    <button class="btn btn-info btn-circle btn-sm" 
                                                    data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[0].archivos[i]._id}')">
                                                        <i class="fas fa-share-alt"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                                        }
                                },
                                error: function (e) {
                                //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
                                },
                            });
                    },
                    error: function (e) {
                    //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
                    },
                });
        },
        error: function (e) {
        //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
        },
    });
} 

function nuevoContenido(idCarpeta){
   /* if($("[name='"+vname+"']:checked").val()!=undefined){
        alert('seleccionado:' + $("[name='a']:checked").val());
    }else{
        alert('sin seleccinar');
    }*/
    var opcion = $('#opciones').val()
    if(opcion == 1){
        $('#modalNuevosDocs').modal('hide');
        $('#modalSubCarpeta').modal('show');
        document.getElementById('footer-subCarpeta').innerHTML = `
        <button class="btn btn-primary" onclick="crearSubCarpetas('${idCarpeta}')">Crear</button>`;
    }
    else if(opcion == 2){
        $('#modalNuevosDocs').modal('hide');
        $('#modalArchivos').modal('show');
        document.getElementById('footer-archivos').innerHTML = `
        <button class="btn btn-primary" onclick="crearArchivos('${idCarpeta}')">Crear</button>`;
    }
    else{
        $('#modalNuevosDocs').modal('hide');
        $('#modalProyectos').modal('show');
        document.getElementById('footer-proyectos').innerHTML = `
        <button class="btn btn-primary" onclick="crearProyectos('${idCarpeta}')">Crear</button>`;
    }

}

function crearSubCarpetas(idCarpeta){
    var campos = [{campo:'subCarpeta',valido:false}];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var parametro = {
        subCarpeta: $('#subCarpeta').val(),
        carpetaRaiz: idCarpeta
    };
   // alert(parametro);
    $.ajax({
        url:"/subcarpetas",
        data:parametro,
        method:"POST",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
            //window.location = "carpetas.html"
            $('#modalSubCarpeta').modal('hide');
            contenidoCarpeta(idCarpeta);
        },
        error: function () {
            alert('error');
        },
    });

}

function crearArchivos(idCarpeta){
    var campos = [{campo:'nombreArchivo',valido:false},
                {campo:'extension',valido:false}];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var parametro = {
        nombreArchivo: $('#nombreArchivo').val(),
        extension: $('#extension').val(),
        carpetaRaiz: idCarpeta
    };
   console.log(parametro);
    $.ajax({
        url:"/archivos",
        data:parametro,
        method:"POST",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
            //window.location = "carpetas.html"
            $('#modalArchivos').modal('hide');
            contenidoCarpeta(idCarpeta);
        },
        error: function () {
            alert('error');
        },
    });

}

function crearProyectos(idCarpeta){
    var campos = [
        {campo:'nombreProyecto',valido:false}
    ];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

   /* informacion.push({
        nombreProyecto:document.getElementById('nombreProyecto').value
    });
    generarProyectos();*/
    var parametros = {
        nombreProyecto: $('#nombreProyecto').val(),
        idCarpeta: idCarpeta
    };
       // alert(parametros);
     $.ajax({
         url:'/proyectos',
         data:parametros,
         method:"POST",
         dataType:"JSON",
         success:function(respuesta){
            // alert(respuesta);
            // window.location = "carpetas.html"
            $('#modalProyectos').modal('hide');
            localStorage.setItem("idHTML", respuesta.html);
            localStorage.setItem("idCSS", respuesta.css);
            localStorage.setItem("idJS", respuesta.js);
            contenidoCarpeta(idCarpeta);
         },
         error: function () {
             alert('error');
         },
     });
    
}

function cargarProyecto(idProyecto){
    window.location = "nuevoproyecto.html?idProyecto="+idProyecto;
}

/*function guardarProyecto(idProyecto){
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
}*/

function compartirCarpetas(idCarpeta){
    document.getElementById('resultado-busqueda').innerHTML = '';

    document.getElementById('busqueda').innerHTML = `
    <input id="busqueda-correo" style="width: 80%; text-align: center; float:left" type="text" class="form-control" placeholder="Ingrese correo electrónico">
    <button style="float: right" class="btn btn-primary" id="btn-editar" onclick="buscarCorreo('${idCarpeta}')">Buscar</button>`;

    $.ajax({
        url:`/carpetas/${idCarpeta}/usuarios`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            document.getElementById('colaboladores').innerHTML =`
            Carpeta: ${res[0].nombreCarpeta} compartida con:`;
            for(var i=0;i<res[0].usuarios.length;i++){
                document.getElementById('colaboladores').innerHTML += `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        ${res[0].usuarios[i].usuario}
                        <button onclick="eliminarColaboradorCarpeta('${idCarpeta}', '${res[0].usuarios[i]._id}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
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

function compartirSubCarpetas(idSubCarpeta){
    document.getElementById('resultado-busqueda').innerHTML = '';
    
    document.getElementById('busqueda').innerHTML = `
    <input id="busqueda-correo" style="width: 80%; text-align: center; float:left" type="text" class="form-control" placeholder="Ingrese correo electrónico">
    <button style="float: right" class="btn btn-primary" id="btn-editar" onclick="buscarCorreoSubCarpetas('${idSubCarpeta}')">Buscar</button>`;

    $.ajax({
        url:`/subcarpetas/${idSubCarpeta}/usuarios`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            document.getElementById('colaboladores').innerHTML =`
            Sub carpeta: ${res[0].nombreSubCarpeta} compartido con:`;
            for(var i=0;i<res[0].usuarios.length;i++){
                document.getElementById('colaboladores').innerHTML += `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        ${res[0].usuarios[i].usuario}
                        <button onclick="eliminarColaboradorSubCarpeta('${idSubCarpeta}', '${res[0].usuarios[i]._id}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
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

function compartirArchivos(idArchivo){
    document.getElementById('resultado-busqueda').innerHTML = '';
    
    document.getElementById('busqueda').innerHTML = `
    <input id="busqueda-correo" style="width: 80%; text-align: center; float:left" type="text" class="form-control" placeholder="Ingrese correo electrónico">
    <button style="float: right" class="btn btn-primary" id="btn-editar" onclick="buscarCorreoArchivos('${idArchivo}')">Buscar</button>`;

    $.ajax({
        url:`/archivos/${idArchivo}/usuarios`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            document.getElementById('colaboladores').innerHTML =`
            Archivos: ${res[0].nombreArchivo} compartido con:`;
            for(var i=0;i<res[0].usuarios.length;i++){
                document.getElementById('colaboladores').innerHTML += `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        ${res[0].usuarios[i].usuario}
                        <button onclick="eliminarColaboradorArchivo('${idArchivo}', '${res[0].usuarios[i]._id}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
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

function buscarCorreo(idCarpeta){
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
                <button onclick="compartir('${idCarpeta}')" style="border:none, background-color:none; float:right" class="btn btn-circle"><i style="font-size: 20px; color: green;" class="fas fa-user-check"></i></button>
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

function buscarCorreoSubCarpetas(idSubCarpeta){
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
                <button onclick="compartirSubCarpeta('${idSubCarpeta}')" style="border:none, background-color:none; float:right" class="btn btn-circle"><i style="font-size: 20px; color: green;" class="fas fa-user-check"></i></button>
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

function buscarCorreoArchivos(idArchivo){
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
                <button onclick="compartirArchivo('${idArchivo}')" style="border:none, background-color:none; float:right" class="btn btn-circle"><i style="font-size: 20px; color: green;" class="fas fa-user-check"></i></button>
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


function compartir(idCarpeta){
    var parametros = {
        idUsuario : $('#id-usuario').val(),
        idCarpeta: idCarpeta
    }
    console.log(parametros);

    $.ajax({
        url:`carpetas/compartir`,
        data:parametros,
        method:"POST",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //alert('SE COMPARTIÓ');
            //$(opcion).remove();
            //window.location = '/carpetas.html';
            compartirCarpetas(idCarpeta);
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

function compartirSubCarpeta(idSubCarpeta){
    var parametros = {
        idUsuario : $('#id-usuario').val(),
        idSubCarpeta: idSubCarpeta
    }
    console.log(parametros);

    $.ajax({
        url:`subcarpetas/compartir`,
        data:parametros,
        method:"POST",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //alert('SE COMPARTIÓ');
            //$(opcion).remove();
            //window.location = '/carpetas.html';
            compartirSubCarpetas(idSubCarpeta);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function compartirArchivo(idArchivo){
    var parametros = {
        idUsuario : $('#id-usuario').val(),
        idArchivo: idArchivo
    }
    console.log(parametros);

    $.ajax({
        url:'archivos/compartir',
        data:parametros,
        method:"POST",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //alert('SE COMPARTIÓ');
            //$(opcion).remove();
            //window.location = '/carpetas.html';
            compartirArchivos(idArchivo);
        },
        error: function (e) {
            console.log(e);
        },
    });
}



function eliminarColaboradorCarpeta(idCarpeta, idUsuario){
    $.ajax({
        url:`carpetas/eliminarColaborador/${idCarpeta}/${idUsuario}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            compartirCarpetas(idCarpeta);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function eliminarColaboradorProyecto(idProyecto, idUsuario){
    $.ajax({
        url:`proyectos/eliminarColaborador/${idProyecto}/${idUsuario}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            compartirProyectos(idProyecto);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function eliminarColaboradorProyecto(idProyecto, idUsuario){
    $.ajax({
        url:`proyectos/eliminarColaborador/${idProyecto}/${idUsuario}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            compartirProyectos(idProyecto);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function eliminarColaboradorSubCarpeta(idSubCarpeta, idUsuario){
    $.ajax({
        url:`subcarpetas/eliminarColaborador/${idSubCarpeta}/${idUsuario}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            compartirSubCarpetas(idSubCarpeta);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function eliminarColaboradorArchivo(idArchivo, idUsuario){
    $.ajax({
        url:`archivos/eliminarColaborador/${idArchivo}/${idUsuario}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            compartirArchivos(idArchivo);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function editorArchivos(idArchivo, idCarpeta){
    $.ajax({
        url:`/archivos/${idArchivo}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
        document.getElementById('editor-archivo').innerHTML = `
        <div id="nombre-pagina"></div>
        <h1 id="nombre-proyecto" class="nombre-proyecto">ARCHIVO: ${res[0].nombreArchivo}.${res[0].extension}</h1>
        <div id="contenido-archivo"></div>
        `;
        document.getElementById('contenido-archivo').innerHTML = `
        Contenido Archivo
        <div style="float:right" id="botones-archivo" class="botones"></div>
        <textarea id="contenidoArchivo" style="height: 500px;" class="form-control">${res[0].contenido}</textarea>`;
        document.getElementById('botones-archivo').innerHTML = `
        <a href download="${res[0].nombreArchivo}.${res[0].extension}" onclick="descargarArchivo(this)"><i class="fas fa-download"></i></a>
        <button type="button" class="btn btn-proyecto" onclick="guardarArchivo('${res[0]._id}', '${idCarpeta}')"><i class="fas fa-save"></i></button>
        <br>`;

        /*$.ajax({
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
        });*/
        },
        error: function () {
            alert('error');
        },
    });
}

/*function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//Función de ayuda: reúne los datos a exportar en un solo objeto
function obtenerDatos() {
    return {
        document.getElementById('contenidoArchivo').value,
        telefono: document.getElementById('textTelefono').value,
        fecha: (new Date()).toLocaleDateString()
    };
};


function descargarArchivo(idArchivo){
    var	contenido = $('#contenidoArchivo').val();
	nombre= $('#nombre-proyecto').val();
	idArchivo.download = nombre;
	idArchivo.href = "data:application/octet-stream," + encodeURIComponent(contenido);
}*/

/*window.onload = function() {
    var txt = document.getElementById('txt');
    txt.value = window.onload + '';
     document.getElementById('link').onclick = function(code) {
      this.href = 'data:text/plain;charset=utf-8,'
        + encodeURIComponent(txt.value);
    };
  };*/

  /*function descargarArchivo() {
    var nombre = $('#nombre-proyecto').val();
    var texto = document.getElementById('contenidoArchivo').value;
    var contenidoEnBlob = new Blob([texto], {type: 'text/plain'});
    var lector = new FileReader();
    
    lector.onload = function(event) {
    
    var guardar = document.createElement('a');
    guardar.href = event.target.result;
    guardar.target = '_blank';
    guardar.download = nombre || 'archivo.dat';
    var clicEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': false,
        'cancelable': true
    });
    
    guardar.dispatchEvent(clicEvent);
    };
    
    lector.readAsDataURL(contenidoEnBlob);
    };
    
    window.onload = function() {
    
    document.getElementById('boton').addEventListener( 'click', function () {
        alert('entra');
    var nombre = $('#nombre-proyecto').val();
    descargarArchivo(nombre);
    
    }, false);
    }*/

function descargarArchivo(archivo){
    var texto = document.getElementById('contenidoArchivo').value;

    archivo.download;

    /*function dataUrl(data) {return "data:x-application/text," + escape(data);}
    window.open(dataUrl(texto));*/
    archivo.href = "data:x-application/octet-stream," + encodeURIComponent(texto);
}

function guardarArchivo(idArchivo,idCarpeta){
    var parametros = {
        id: idArchivo,
        contenido: document.getElementById('contenidoArchivo').value
    }
    console.log(parametros);

    $.ajax({
        url:`/archivos/${idArchivo}/guardar`,
        data:parametros,
        method:"PUT",
        dataType:"JSON",
        success:function(respuesta){
        // alert(respuesta);
            //window.location = "proyectos.html"
            contenidoCarpeta(idCarpeta);
        },
        error: function () {
            alert('error');
        },
    });
}

function editarProyectos(idProyecto, idCarpeta){
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            //window.location = "carpetas.html"
            $("#btn-crear-proyecto").hide();
            document.getElementById('nombreProyecto').value = res[0].nombreProyecto;
            document.getElementById('footer-proyectos').innerHTML = `<button class="btn btn-primary" id="btn-editar" onclick=guardarCambiosProyectos('${res[0]._id}','${idCarpeta}')>Editar</button>`;
        },
        error: function () {
            alert('error');
        },
    });
}

function guardarCambiosProyectos(idProyecto,idCarpeta){
    /*informacion[seleccionado].nombreProyecto = document.getElementById('nombreProyecto').value;
    generarProyectos();*/
    var campos = [{campo:'nombreProyecto',valido:false}];
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    $('#modalProyectos').modal('hide');
    $('#modalConfirmacion').modal('show');
    document.getElementById('botones').innerHTML = `
            <button class="btn btn-danger" onclick="cancelarEdicionProyecto()"><i class="fa fa-times"></i> No</button>
            <button class="btn btn-primary" onclick="confirmarEdicionProyecto('${idProyecto}', '${idCarpeta}')"><i class="fa fa-check"></i> Si</button>`;

}

function cancelarEdicionProyecto(){
    $('#modalConfirmacion').modal('hide');
}

function confirmarEdicionProyecto(idProyecto, idCarpeta){
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
            //window.location = "proyectos.html"
            $('#modalConfirmacion').modal('hide');
            //contenidoCarpeta(idCarpeta);
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Proyecto actualizado con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    contenidoCarpeta(idCarpeta);
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

function eliminarProyectos(idProyecto, idCarpeta){
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
           iziToast.success({
               timeout:1800,
               overlay: true,
               position: 'center', 
               displayMode: 'once',
               title: 'OK',
               message: 'Proyecto eliminado con éxito!',
               onClosing: function(instance, toast, closedBy){
                   console.info('Closed | closedBy: ' + closedBy);
                   contenidoCarpeta(idCarpeta);
               }
           });
        },
        error: function () {
            alert('error');
        },
    });
}

function editarSubCarpeta(idSubCarpeta, idCarpeta){
    $.ajax({
        url:`/subcarpetas/${idSubCarpeta}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
            document.getElementById('subCarpeta').value = res[0].nombreSubCarpeta;
            document.getElementById('footer-subCarpeta').innerHTML = `<button class="btn btn-primary" id="btn-editar" onclick=guardarCambiosSubCarpeta('${res[0]._id}','${idCarpeta}')>Editar</button>`;
        },
        error: function () {
            alert('error');
        },
    });
}

function guardarCambiosSubCarpeta(idSubCarpeta,idCarpeta){
    var campos = [{campo:'subCarpeta',valido:false}];
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    $('#modalSubCarpeta').modal('hide');
    $('#modalConfirmacion').modal('show');
    document.getElementById('botones').innerHTML = `
            <button class="btn btn-danger" onclick="cancelarEdicionSubCarpeta()"><i class="fa fa-times"></i> No</button>
            <button class="btn btn-primary" onclick="confirmarEdicionSubCarpeta('${idSubCarpeta}', '${idCarpeta}')"><i class="fa fa-check"></i> Si</button>`;

}

function cancelarEdicionSubCarpeta(){
    $('#modalConfirmacion').modal('hide');
}

function confirmarEdicionSubCarpeta(idSubCarpeta, idCarpeta){
    var parametros = {
        id: idSubCarpeta,
        subCarpeta: $('#subCarpeta').val()
    }; 

    $.ajax({
        url:`/subcarpetas/${idSubCarpeta}`,
        data: parametros,
        method:"PUT",
        dataType:"JSON",
        success:function(respuesta){
            // alert(respuesta);
            //window.location = "proyectos.html"
            $('#modalConfirmacion').modal('hide');
            //contenidoCarpeta(idCarpeta);
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Subcarpeta actualizada con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    contenidoCarpeta(idCarpeta);
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

function eliminarSubCarpeta(idSubCarpeta, idCarpeta){
    $.ajax({
        url:`/subcarpetas/${idSubCarpeta}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
           //contenidoCarpeta(idCarpeta);
           iziToast.success({
               timeout:1800,
               overlay: true,
               position: 'center', 
               displayMode: 'once',
               title: 'OK',
               message: 'Subcarpeta eliminada con éxito!',
               onClosing: function(instance, toast, closedBy){
                   console.info('Closed | closedBy: ' + closedBy);
                   contenidoCarpeta(idCarpeta);
               }
           });
        },
        error: function () {
            alert('error');
        },
    });
}

function editarArchivos(idArchivo, idCarpeta){
    $.ajax({
        url:`/archivos/${idArchivo}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
            document.getElementById('nombreArchivo').value = res[0].nombreArchivo;
            document.getElementById('footer-archivos').innerHTML = `<button class="btn btn-primary" id="btn-editar" onclick=guardarCambiosArchivo('${res[0]._id}','${idCarpeta}')>Editar</button>`;
        },
        error: function () {
            alert('error');
        },
    });
}

function guardarCambiosArchivo(idArchivo,idCarpeta){
    var campos = [{campo:'nombreArchivo',valido:false}];
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    $('#modalArchivos').modal('hide');
    $('#modalConfirmacion').modal('show');
    document.getElementById('botones').innerHTML = `
            <button class="btn btn-danger" onclick="cancelarEdicionArchivo()"><i class="fa fa-times"></i> No</button>
            <button class="btn btn-primary" onclick="confirmarEdicionArchivo('${idArchivo}', '${idCarpeta}')"><i class="fa fa-check"></i> Si</button>`;

}

function cancelarEdicionArchivo(){
    $('#modalConfirmacion').modal('hide');
}

function confirmarEdicionArchivo(idArchivo, idCarpeta){
    var parametros = {
        id: idArchivo,
        nombreArchivo: $('#nombreArchivo').val()
    }; 

    $.ajax({
        url:`/archivos/${idArchivo}`,
        data: parametros,
        method:"PUT",
        dataType:"JSON",
        success:function(respuesta){
            // alert(respuesta);
            $('#modalConfirmacion').modal('hide'); 
            //contenidoCarpeta(idCarpeta);
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Archivo actualizado con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    contenidoCarpeta(idCarpeta);
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

function eliminarArchivo(idArchivo, idCarpeta){
    $.ajax({
        url:`/archivos/${idArchivo}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
           //contenidoCarpeta(idCarpeta);
           iziToast.success({
               timeout:1800,
               overlay: true,
               position: 'center', 
               displayMode: 'once',
               title: 'OK',
               message: 'Archivo eliminado con éxito!',
               onClosing: function(instance, toast, closedBy){
                   console.info('Closed | closedBy: ' + closedBy);
                   contenidoCarpeta(idCarpeta);
               }
           });
        },
        error: function () {
            alert('error');
        },
    });
}





