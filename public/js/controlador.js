
function registrarTarjeta(){

    var nombreCompleto = document.getElementById("nombre-completo").value;
    var numTarjeta = document.getElementById("num-tarjeta").value;
    var codigo = document.getElementById("ccv").value;
    

    
    if (nombreCompleto == "") {  //COMPRUEBA CAMPOS VACIOS
        document.getElementById(nombreCompleto).classList.add('input-error');
        return true;
    } 

    if (numTarjeta == ""){  //COMPRUEBA CAMPOS VACIOS
        document.getElementById(numTarjeta).classList.add('input-error');
        return true;
    } 

    if (codigo == ""){  //COMPRUEBA CAMPOS VACIOS
        document.getElementById(codigo).classList.add('input-error');
        return true;
    }
    
}



    