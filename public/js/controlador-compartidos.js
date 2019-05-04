$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    $.ajax({
        url:"/carpetas/compartidas",
        method:"POST",
        dataType:"json",
        success:function(res){
            console.log(res);

            document.getElementById('carpetasCompartidas').innerHTML='';
                
                    if(res.length == 0){
                        document.getElementById('carpetasCompartidas').innerHTML=`
                        <div style="width:50%" class="alert alert-danger" role="alert">
                            No hay carpetas compartidas
                        </div>`;
                    }
                    else{
                        document.getElementById('carpetasCompartidas').innerHTML='';
                        for (var i = 0; i < res.length; i++) {
                        document.getElementById('carpetasCompartidas').innerHTML+=`
                        <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center"> 
                                    <button type="button" class="btn btn-proyecto" onclick="contenidoCarpeta('${res[i]._id}')">
                                        <i class="fas fa-folder-open"></i><br>
                                        ${res[i].nombreCarpeta} <Br>
                                        Creador: <span id='nombre-${res[i].usuarioCreador}-${i}'></span>
                                    </button>
                                    <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarCarpetaCompartida('${res[i]._id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`;
                        generarNombreCreador(res[i].usuarioCreador,i);
                        }
                    }
                
            }   ,
            error: function (e) {
             //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
            },
    });

    $.ajax({
        url:"/proyectos/compartidos",
        method:"POST",
        dataType:"json",
        success:function(res){
            console.log(res);

            document.getElementById('proyectosCompartidos').innerHTML='';
                
            if(res.length == 0){
                document.getElementById('proyectosCompartidos').innerHTML=`
                <div  style="width:50%" class="alert alert-danger" role="alert">
                    No hay proyectos compartidos
                </div>`;
            }
            else{
                document.getElementById('proyectosCompartidos').innerHTML='' ;
                for (var i = 0; i < res.length; i++) {
                document.getElementById('proyectosCompartidos').innerHTML+=`
                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[i]._id}')">
                                <i class="far fa-file-alt"></i><br>
                                ${res[i].nombreProyecto} <Br>
                                Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-proyecto'></span>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarProyectosCompartidos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
                generarNombreCreadorProyecto(res[i].usuarioCreador,i);
                }
            }  
        },
        error: function (e) {
        },
    });

    $.ajax({
        url:"/archivos/prueba",
        method:"POST",
        dataType:"json",
        success:function(res){
            console.log(res);

            document.getElementById('archivosCompartidos').innerHTML='';
                
            if(res.length < 1){
                document.getElementById('archivosCompartidos').innerHTML=`
                <div style="width:50%" class="alert alert-danger" role="alert">
                    No hay archivos compartidos
                </div>`;
            }
            else{
                document.getElementById('archivosCompartidos').innerHTML='';
                for (var i = 0; i < res.length; i++) {
                if(res[i].extension == "html"){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}')">
                            <i class="fab fa-html5"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'css'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fab fa-css3-alt"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <button class="btn btn-info btn-circle btn-sm" 
                        data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[i]._id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'js'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fab fa-js-square"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <button class="btn btn-info btn-circle btn-sm" 
                        data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[i]._id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'py'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i style="font-size: 70px; color:#273c7c" class="fab fa-python"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <button class="btn btn-info btn-circle btn-sm" 
                        data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[i]._id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'php'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i style="font-size: 70px; color:purple" class="fab fa-php"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <button class="btn btn-info btn-circle btn-sm" 
                        data-toggle="modal" data-target="#modalArchivos" onclick="editarArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirArchivos('${res[i]._id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    </div>
                </div>`;
                }
                generarNombreCreadorArchivo(res[i].usuarioCreador,i);
                }
            }  
        },
        error: function (e) {
        console.log('ERROR ARCHIVOS', e);
        },
    });

});

function generarNombreCreador(idCreador, i){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(res){
            document.getElementById(`nombre-${idCreador}-${i}`).innerHTML = res[0].nombre+' '+res[0].apellido; 
		},
	}); 
}

function generarNombreCreadorProyecto(idCreador, i){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(res){
            document.getElementById(`nombre-${idCreador}-${i}-proyecto`).innerHTML = res[0].nombre+' '+res[0].apellido; 
		},
	}); 
}

function generarNombreCreadorArchivo(idCreador, i){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(res){
            document.getElementById(`nombre-${idCreador}-${i}-archivo`).innerHTML = res[0].nombre+' '+res[0].apellido;
		},
	}); 
}

function cargarProyecto(idProyecto){
    window.location = "nuevoproyecto.html?idProyecto="+idProyecto;
}