var informacion = [
    {nombreProyecto:'Proyecto HOME'},
    {nombreProyecto:'Proyecto 1'},
    {nombreProyecto:'Proyecto 2'},
    {nombreProyecto:'Proyecto 3'},
    {nombreProyecto:'Proyecto 4'},
    {nombreProyecto:'Proyecto 5'},
    {nombreProyecto:'Proyecto 6'},
    {nombreProyecto:'Proyecto 7'},
    {nombreProyecto:'Proyecto 8'},
    {nombreProyecto:'Proyecto 9'},
    {nombreProyecto:'Proyecto 10'}
];

var seleccionado;

function generarProyectos(){
    document.getElementById('proyectos').innerHTML = '';
    for(var i=0;i<informacion.length;i++){
        document.getElementById('proyectos').innerHTML += 
        `<div class="py-3 col-lg-4">
            <div class="card-body">
            
            <div class="d-flex justify-content-between align-items-center"> 
                <i class="far fa-file-alt"></i>
                ${informacion[i].nombreProyecto}
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
    }
} generarProyectos();


function editarProyectos(indice){
    seleccionado = indice;
    document.getElementById('modalContenidoProyecto').style.display = "block";
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

    informacion.push({
        nombreProyecto:document.getElementById('nombreProyecto').value
    });
    generarProyectos();
    
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
    informacion.shift(i);
    generarProyectos();
}


