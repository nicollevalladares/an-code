/*var informacion = [
    {nombre:'Proyecto 1', icono: '<i class="far fa-file-alt"></i>'},
    {nombre:'Archivo CSS', icono: '<i class="fab fa-css3-alt"></i>'},
    {nombre:'Sub Carpeta 3', icono: '<i class="fas fa-folder-open"></i>'},
    {nombre:'Archivo HTML', icono: '<i class="fab fa-html5"></i>'},
    {nombre:'Archivo JS', icono: '<i class="fab fa-js-square"></i>'}
];

var seleccionado;*/

function generarContenidoCarpetas(){
    $.ajax({
        url:"/carpetas/:id",
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('contenido-carpeta').innerHTML = '';
                for(var i=0;i<res.length;i++){
                    document.getElementById('contenido-carpeta').innerHTML += 
                    `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="">
                                ${res[i].icono}<br>
                                ${res[i].nombre}
                            </button>
                            <button class="btn btn-info btn-circle btn-sm" 
                            data-toggle="modal" data-target="#modalContenidoCarpeta" onclick="editarContenidoCarpetas('${res[i]._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarContenidoCarpetas('${res[i]._id}')">
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
} generarContenidoCarpetas();


function editarContenidoCarpetas(indice){
    seleccionado = indice;
    document.getElementById('nombre').value = informacion[indice].nombre;
}

function eliminarContenidoCarpetas(indice){
    seleccionado = indice;
    informacion.splice(seleccionado, 1);
    generarContenidoCarpetas();
}

function guardarCambios(){
    informacion[seleccionado].nombre = document.getElementById('nombre').value;
    generarContenidoCarpetas();
}

