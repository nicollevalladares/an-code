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


  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function() {
    FB.init({
      appId      : '2234395893307279',
      cookie     : true,
                         
      xfbml      : true,  
      version    : 'v3.2'
    });
  };

  
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

function logInFB(){
    FB.login(function(response) {
        if (response.status=="connected"){
           FB.api('/me?fields=id,name,first_name,last_name,email', function(datosUsuario) {

            var parametros = {
                    idFB: datosUsuario.id,
                    nombre: datosUsuario.first_name,
                    apellido: datosUsuario.last_name,
                    email: datosUsuario.email
            };
            
            $.ajax({
                      url:"/login_fb",
                      method:"POST",
                      data:parametros,
                      dataType:"json",
                      success:function(respuesta){
                          console.log(respuesta.status);
                          if(respuesta.status==2){
                          location.href ="menu.html";
                          }else{
                             //alert('error');
                             //location.href ="menu.html";
                          }
                      },
                      error: function (e) {
                          console.log(e);
                      },
              });
                       
         });
        }
  
      }, {scope: 'public_profile,email'});
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

