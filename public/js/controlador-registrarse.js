function registrarse(){
    var campos = [
        {campo:'usuario',valido:false},
        {campo:'nombre',valido:false},
        {campo:'apellido',valido:false},
        {campo:'correo',valido:false},
        {campo:'password',valido:false}
    ];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    //location.href="menu.html";
    var parametro = {
        usuario: $('#usuario').val(),
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        correo: $('#correo').val(),
        password: $('#password').val(),
        //plan: ObjectId("5cc7993eb56d781460c5cddf")
    };
  // alert(parametro);
   console.log(parametro);
    $.ajax({
        url:"/user",
        data:parametro,
        method:"POST",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
           console.log(res);
            if (res.status == 1){
                //document.getElementById(correo).classList.add('input-error');
               // alert(res.mensaje);
               iziToast.error({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'ERROR',
                    message: res.mensaje,
                });
            }
            else if(res.status == 2){
                //alert(res.mensaje);
                iziToast.error({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'ERROR',
                    message: res.mensaje,
                });
            }
            else if(res.status == 0){
                iziToast.success({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'OK',
                    message: 'Registrado exitósamente!',
                    onClosing: function(instance, toast, closedBy){
                        console.info('Closed | closedBy: ' + closedBy);
                        window.location = "login.html"
                    }
                });
                //window.location = "login.html"
            }
        },
        error: function () {
           // alert('error');
           //window.location = "login.html"
        },
    });


}

function validarCampo(campo){
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

    