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
            window.location = "carpetas.html"
        },
        error: function () {
            alert('error');
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
        url:`/carpetas/${idCarpeta}/contenido`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
                //window.location = "contenido-carpeta.html"
                console.log(res);
                document.getElementById('nombre-pagina').innerHTML =`
                <h1>CARPETA:  nombreCarpeta</h1>
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalCarpeta">Nueva SubCarpeta</button>`;
                document.getElementById('carpetas').innerHTML = '';
                for(var i=0;i<res[0].length;i++){
                    document.getElementById('carpetas').innerHTML += 
                    `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="">
                                prueba<br>
                                ${res[0].archivos[i].nombreArchivo}
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
        },
        error: function (e) {
        //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
        },
    });
} 