$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    $.ajax({
        url:"/carpetas/compartidas",
        method:"GET",
        dataType:"json",
        success:function(res){
            document.getElementById('carpetasCompartidas').innerHTML='';       
                for (var i = 0; i < res.length; i++) {
                    document.getElementById('carpetasCompartidas').innerHTML+=`
                    <h2>Carpetas</h2> 
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center"> 
                                <button type="button" class="btn btn-proyecto" onclick="contenidoCarpeta('${res[i]._id}')">
                                    <i class="fas fa-folder-open"></i><br>
                                    ${res[i].nombreCarpeta}
                                    Creador: <span id='nombre-${i}'></span>
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
                //generarNombreCreador(`'`+res[i].usuarioCreador+`'`,i);
        },
        error: function (e) {
        //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
        },
    });
});

function generarNombreCreador(idCreador){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(respuesta){
			document.getElementById("nombre-"+ i).innerHTML = respuesta[0].nombre+' '+respuesta[0].apellido;  
		},
	}); 
}