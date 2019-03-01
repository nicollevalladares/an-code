
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



    