$(document).ready(function(){
    $('#div-datos-incorrectos').hide();
});

function logIn(){
 var campos = [
        {campo:'email',valido:false},
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
    var parametros = "email="+$("#email").val()+"&password="+$("#password").val();
    $.ajax({
        url:"/login",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.status == 1){
                iziToast.success({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'OK',
                    message: 'Has ingresado exitósamente!',
                    onClosing: function(instance, toast, closedBy){
                        console.info('Closed | closedBy: ' + closedBy);
                        window.location = "menu.html"
                    }
                });
            }
            else {
                //alert(res.mensaje);
                iziToast.error({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'ERROR',
                    message: 'Correo o contraseña incorrectos, verifique los campos.',
                    onClosing: function(instance, toast, closedBy){
                        console.info('Closed | closedBy: ' + closedBy);
                        window.location = "login.html"
                    }
                });
            }
        },
        error:function(error){
            console.error(error);
        }
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

function validarCorreo(etiquetaCorreo){
   // alert(etiquetaCorreo);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(etiquetaCorreo))
        etiquetaCorreo.classList.remove('input-error');
    else
        etiquetaCorreo.classList.add('input-error');

}

function validarPassword(etiquetaPassword){
   // alert(etiquetaPassword)
    var re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    if (re.test(etiquetaPassword))
        etiquetaPassword.classList.remove('input-error');
    else
        etiquetaPassword.classList.add('input-error');

}

