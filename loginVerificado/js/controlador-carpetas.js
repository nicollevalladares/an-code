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
                document.getElementById('div-carpetas-maximas').style = 'display: block';
                $('#div-carpetas-maximas').fadeOut(6000);
                document.getElementById('limite').style = 'display: block';
                $('#limite').fadeOut(6000);
                //window.location = "carpetas.html";
            }
            else{
                window.location = "carpetas.html";
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
            alert('error');
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
            window.location = "carpetas.html"
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
            window.location = "carpetas.html"
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
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].proyectos[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].proyectos[i]._id}')">
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
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].subcarpetas[i]._id}')">
                                <i class="fas fa-folder-open"></i><br>
                                ${res[0].subcarpetas[i].nombreSubCarpeta}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].subcarpetas[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].subcarpetas[i]._id}')">
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
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].archivos[i]._id}')">
                                <i class="fab fa-html5"></i><br>
                                ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].archivos[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].archivos[i]._id}')">
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
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].archivos[i]._id}')">
                                <i class="fab fa-css3-alt"></i><br>
                                ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].archivos[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].archivos[i]._id}')">
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
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].archivos[i]._id}')">
                                <i class="fab fa-js-square"></i><br>
                                ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].archivos[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].archivos[i]._id}')">
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
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].archivos[i]._id}')">
                                <i style="font-size: 70px; color:#273c7c" class="fab fa-python"></i><br>
                                ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].archivos[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].archivos[i]._id}')">
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
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].archivos[i]._id}')">
                                <i style="font-size: 70px; color:purple" class="fab fa-php"></i><br>
                                ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[0].archivos[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[0].archivos[i]._id}')">
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
            contenidoCarpeta(idCarpeta);
         },
         error: function () {
             alert('error');
         },
     });
    
}

function cargarProyecto(idProyecto){
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            console.log(res);
            window.location = "proyectos.html"
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