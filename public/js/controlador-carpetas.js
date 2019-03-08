var informacion = [
    {nombreCarpeta:'Carpeta HOME'},
    {nombreCarpeta:'Carpeta 1'},
    {nombreCarpeta:'Carpeta 2'},
    {nombreCarpeta:'Carpeta 3'},
    {nombreCarpeta:'Carpeta 4'},
    {nombreCarpeta:'Carpeta 5'},
    {nombreCarpeta:'Carpeta 6'},
    {nombreCarpeta:'Carpeta 7'},
    {nombreCarpeta:'Carpeta 8'},
    {nombreCarpeta:'Carpeta 9'},
    {nombreCarpeta:'Carpeta 10'}
];

var seleccionado;

function generarCarpetas(){
    document.getElementById('carpetas').innerHTML = '';
    for(var i=0;i<informacion.length;i++){
        document.getElementById('carpetas').innerHTML += 
        `<div class="py-3 col-lg-4">
            <div class="card-body">
            
            <div class="d-flex justify-content-between align-items-center"> 
                <i class="fas fa-folder-open"></i>
                ${informacion[i].nombreCarpeta}
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
} generarCarpetas();


function editarCarpetas(indice){
    seleccionado = indice;
    document.getElementById('modalContenidoCarpeta').style.display = "block";
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


