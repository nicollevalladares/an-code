/*var informacion = [
    {nombre:'Proyecto 1', icono: '<i class="far fa-file-alt"></i>'},
    {nombre:'Archivo CSS', icono: '<i class="fab fa-css3-alt"></i>'},
    {nombre:'Sub Carpeta 3', icono: '<i class="fas fa-folder-open"></i>'},
    {nombre:'Archivo HTML', icono: '<i class="fab fa-html5"></i>'},
    {nombre:'Archivo JS', icono: '<i class="fab fa-js-square"></i>'}
];

var seleccionado;*/

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

