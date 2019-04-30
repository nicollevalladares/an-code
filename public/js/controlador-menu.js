$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    $.ajax({
        url:"/carpetas",
        method:"GET",
        dataType:"JSON",
        success:function(res){
            for (var i = 0; i < res.length; i++) {
            document.getElementById('select-carpeta').innerHTML += `
            <option value="${res[i]._id}">${res[i].nombreCarpeta}</option>`;	
            }
        },
        error: function (e) {
            console.log(e);
        },
    }); 
});

function nombreUsuario(){
    $.ajax({
        url:"/user",
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('nombre-usuario').innerHTML=res[0].usuario;	
        },
        error: function (e) {
            console.log(e);
        },
    }); 
}

function crearCarpeta(){
    var campos = [{campo:'nombreCarpeta',valido:false}];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
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

function crearProyecto(){
    var campos = [{campo:'nombreProyecto',valido:false}];

    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampo(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    ///location.href="nuevo-proyecto.html";
  

    var parametros = "nombreProyecto=" + $('#nombreProyecto').val() + "&idCarpeta=" + $('#select-carpeta').val();
       // alert(parametros);
     $.ajax({
         url:"/proyectos",
         data:parametros,
         method:"POST",
         dataType:"JSON",
         success:function(respuesta){
            // alert(respuesta);
             window.location = "proyectos.html"
         },
         error: function () {
             alert('error');
         },
     });

}




    
    