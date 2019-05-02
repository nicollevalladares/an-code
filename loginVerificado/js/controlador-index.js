function registrarTarjeta(){
    /*var campos = [{campo:'nombre-completo',valido:false},
    {campo:'num-tarjeta',valido:false},
    {campo:'ccv',valido:false}];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }*/


    //location.href="registrarse.html";
    var parametros = {
        numero : $('#primer-bloque').val() + '-' + $('#segundo-bloque').val() + '-' + $('#tercer-bloque').val() + '-' + $('#cuarto-bloque').val(),
        mesExpiracion : $('#mes').val(),
        anioExpiracion : $('#anio').val(),
        ccv : $('#ccv').val(),
    };
    console.log(parametros);

     $.ajax({
         url:"/tarjetas",
         data:parametros,
         method:"POST",
         dataType:"JSON",
         success:function(res){
            // alert(respuesta);
            $('#modalFormularioCenter').modal('hide');
            $('#modalRegistro').modal('show');
            document.getElementById('footer-registro').innerHTML = `
            <button type="button" style="" onclick="registrarsePlan2()" class="btn btn-dark">Registrarse</button>
            `;

         },
         error: function () {
             //alert('error');
         },
     });


}

function registrarTarjeta2(){
    var parametros = {
        numero : $('#primer-bloque2').val() + '-' + $('#segundo-bloque2').val() + '-' + $('#tercer-bloque2').val() + '-' + $('#cuarto-bloque2').val(),
        mesExpiracion : $('#mes2').val(),
        anioExpiracion : $('#anio2').val(),
        ccv : $('#ccv2').val(),
    };
    console.log(parametros);

     $.ajax({
         url:"/tarjetas",
         data:parametros,
         method:"POST",
         dataType:"JSON",
         success:function(res){
            // alert(respuesta);
            $('#modalFormulario2Center').modal('hide');
            $('#modalRegistro').modal('show');
            document.getElementById('footer-registro').innerHTML = `
            <button type="button" style="" onclick="registrarsePlan3()" class="btn btn-dark">Registrarse</button>
            `;

         },
         error: function () {
             //alert('error');
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

! function(a) {
    a(function() {
        a(".button-sent #back").hide(), a(".button-sent #guardar").hide(), a(".button-sent #continue").click(function(b) {
            a("#area .master-card").css("transform", "rotateY(180deg)"), a(".button-sent #back").show(), a(".button-sent #guardar").show(), a(".button-sent #continue").hide()
        }), a(".button-sent #back").click(function(b) {
            a("#area .master-card").css("transform", "rotateY(0deg)"), a(this).hide(),
            a(".button-sent #continue").show(), a(".button-sent #guardar").hide()
        })
    })
}(jQuery);


function registrarsePlan2(){
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
        url:"/user/plan2",
        data:parametro,
        method:"POST",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
           console.log(res);
            window.location = "login.html"
        },
        error: function () {
           // alert('error');
           window.location = "login.html"
        },
    });

}
    
function registrarsePlan3(){
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
        url:"/user/plan3",
        data:parametro,
        method:"POST",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
           console.log(res);
            window.location = "login.html"
        },
        error: function () {
           // alert('error');
           window.location = "login.html"
        },
    });

}
    