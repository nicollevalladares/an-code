function generarCarpetas(){
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

$.ajax({
    url:"/carpetas",
    method:"get",
    dataType:"json",
    success:function(res){
        document.getElementById('carpetas').innerHTML="";
        if(res.length>0){
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

function crearCarpeta(){
    var parametro = "nombreCarpeta=" + $('#nombreCarpeta').val();
    $.ajax({
        url:"/carpetas",
        data:parametro,
        method:"post",
        dataType:"json",
        success:function(respuesta){
            alert(respuesta);
            generarCarpetas();
        },
        error: function () {
            alert('error');
        },
    });

}

function editarCarpetas(indice){
    seleccionado = indice;
    $("#btn-crear-carpeta").hide();
    $("#btn-editar-carpeta").show();
    document.getElementById('nombreCarpeta').value = informacion[indice].nombreCarpeta;
}

function eliminarCarpetas(indice){
    seleccionado = indice;
    informacion.splice(seleccionado, 1);
    generarCarpetas();
}

function guardarCambios(){
    informacion[seleccionado].nombreCarpeta = document.getElementById('nombreCarpeta').value;
    generarCarpetas();
}

function crearCarpetas(){
    $("#btn-editar-carpeta").hide();
    $("#btn-crear-carpeta").show();
    
    var campos = [
        {campo:'nombreCarpeta',valido:false}
    ];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    informacion.push({
        nombreCarpeta:document.getElementById('nombreCarpeta').value
    });
    generarCarpetas();
    
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

function contenidoCarpeta(){
    window.location ="contenido-carpeta.html";
}
