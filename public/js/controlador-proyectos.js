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

    $.ajax({
        url:"/carpetas",
        method:"GET",
        dataType:"JSON",
        success:function(res){
            for (var i = 0; i < res.length; i++) {
            document.getElementById('select-carpeta').innerHTML+=`
            <option value="${res[i]._id}">${res[i].nombreCarpeta}</option>`;	
            }
        },
        error: function (e) {
            console.log(e);
        },
    }); 
});
generarProyectos();

function generarProyectos(){
    document.getElementById('proyectos').innerHTML = '';
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

function eliminarProyectos(i){
    seleccionado = i;
    console.log(i);
    informacion.splice(seleccionado, 1);
    generarProyectos();
}


