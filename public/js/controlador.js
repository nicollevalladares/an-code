
function registrarTarjeta(){

    var nombreCompleto = document.getElementById("nombre-completo").value;
    var numTarjeta = document.getElementById("num-tarjeta").value;
    var codigo = document.getElementById("ccv").value;
    

    
    if ((nombreCompleto == "") & (numTarjeta == "") & (codigo == "")) {  //COMPRUEBA CAMPOS VACIOS
        document.getElementById('nombre-completo').classList.add('input-error');
        document.getElementById('num-tarjeta').classList.add('input-error');
        document.getElementById('ccv').classList.add('input-error');
    } 
    else if ((nombreCompleto != "") & (numTarjeta == "") & (codigo == "")) {
        document.getElementById('nombre-completo').classList.remove('input-error');
        document.getElementById('num-tarjeta').classList.add('input-error');
        document.getElementById('ccv').classList.add('input-error');
    }
    else if ((nombreCompleto == "") & (numTarjeta != "") & (codigo == "")) {
        document.getElementById('nombre-completo').classList.add('input-error');
        document.getElementById('num-tarjeta').classList.remove('input-error');
        document.getElementById('ccv').classList.add('input-error');
    }
    else if ((nombreCompleto == "") & (numTarjeta == "") & (codigo != "")) {
        document.getElementById('nombre-completo').classList.add('input-error');
        document.getElementById('num-tarjeta').classList.add('input-error');
        document.getElementById('ccv').classList.remove('input-error');
    }
    else if ((nombreCompleto == "") & (numTarjeta != "") & (codigo != "")) {
        document.getElementById('nombre-completo').classList.add('input-error');
        document.getElementById('num-tarjeta').classList.remove('input-error');
        document.getElementById('ccv').classList.remove('input-error');
    }
    else if ((nombreCompleto != "") & (numTarjeta == "") & (codigo != "")) {
        document.getElementById('nombre-completo').classList.remove('input-error');
        document.getElementById('num-tarjeta').classList.add('input-error');
        document.getElementById('ccv').classList.remove('input-error');
    }
    else if ((nombreCompleto != "") & (numTarjeta != "") & (codigo == "")) {
        document.getElementById('nombre-completo').classList.remove('input-error');
        document.getElementById('num-tarjeta').classList.remove('input-error');
        document.getElementById('ccv').classList.add('input-error');
    }
    else {
        document.getElementById('nombre-completo').classList.remove('input-error');
        document.getElementById('num-tarjeta').classList.remove('input-error');
        document.getElementById('ccv').classList.remove('input-error');
    }

}

var informacion = [];

function crearCarpeta(){
    var campos =[
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
    actualizarCarpetas();
    
}

function validarCampoVacio(campo){
    if (document.getElementById(campo).value ==''){   
        document.getElementById(campo).classList.add('input-error');
        return true;
    }else{
        document.getElementById(campo).classList.remove('input-error');
        return false;
    }
}

function actualizarCarpetas(){
    //alert('creada');
    document.getElementById('primera-fila').innerHTML = '';
    for (var i=0; i<informacion.length;i++){
    document.getElementById('primera-fila').innerHTML += 
     `<div class="py-3">
      <div class="card-body">
        <a style="text-decoration:none; color: black; " href="contenido-carpeta.html">
          <div class="d-flex justify-content-between align-items-center"> 
            <img style=" width: 80px; height: 70px; fill: #15223d" src="svg/si-glyph-folder.svg" >
            ${informacion[i].nombreCarpeta}
            <a href="#" class="btn btn-info btn-circle btn-sm">
                <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="btn btn-danger btn-circle btn-sm">
                <i class="fas fa-trash"></i>
            </a>
            
          </div>
        </a>
      </div>
    </div>`
    }
}

    