/*var informacion = [
    {nombreProyecto:'Proyecto HOME'},
    {nombreProyecto:'Proyecto 1'},
    {nombreProyecto:'Proyecto 2'},
    {nombreProyecto:'Proyecto 3'},
    {nombreProyecto:'Proyecto 4'},
    {nombreProyecto:'Proyecto 5'}
];

var seleccionado;*/
$(document).ready(function(){
    console.log("El DOM ha sido cargado");

});
generarProyectos();

function generarProyectos(){
    /*for(var i=0;i<informacion.length;i++){
        document.getElementById('proyectos').innerHTML += 
        `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
            <div class="card-body">
            
            <div class="d-flex justify-content-between align-items-center"> 
                <button type="button" class="btn btn-proyecto" onclick="">
                    <i class="far fa-file-alt"></i><br>
                    ${informacion[i].nombreProyecto}
                </button>
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
    }*/

    $.ajax({
        url:`/proyectos`,
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('proyectos').innerHTML = '';
                for (var i = 0; i < res.length; i++) {
                    document.getElementById('proyectos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[i]._id}')">
                                <i class="far fa-file-alt"></i><br>
                                ${res[i].nombreProyecto}
                            </button>
                            <div style="width:300px; margin-top:-50px">
                                <button class="btn btn-info btn-circle btn-sm" 
                                data-toggle="modal" data-target="#modalContenidoProyecto" onclick="editarProyectos('${res[i]._id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button style="margin-right: 1%;" class="btn btn-success btn-circle btn-sm" onclick="compartirProyectos('${res[i]._id}')">
                                    <i class="fas fa-share-alt"></i>
                                </button>
                                <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarProyectos('${res[i]._id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>`;
    
                }
        },
        error: function (e) {
        //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
        },
    });
}


function editarProyectos(idProyecto){
    /*seleccionado = indice;
    $("#btn-crear-proyecto").hide();
    $("#btn-editar-proyecto").show();
    document.getElementById('nombreProyecto').value = informacion[indice].nombreProyecto;*/
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
           // alert(respuesta);
            //window.location = "carpetas.html"
            $("#btn-crear-proyecto").hide();
            document.getElementById('nombreProyecto').value = res[0].nombreProyecto;
            document.getElementById('footer-proyectos').innerHTML = `<button class="btn btn-primary" id="btn-editar" onclick=guardarCambios('${res[0]._id}')>Editar</button>`;
        },
        error: function () {
            alert('error');
        },
    });
}

function guardarCambios(idProyecto){
    /*informacion[seleccionado].nombreProyecto = document.getElementById('nombreProyecto').value;
    generarProyectos();*/
    var campos = [{campo:'nombreProyecto',valido:false}];
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }

    $('#modalContenidoProyecto').modal('hide');
    $('#modalConfirmacion').modal('show');
    document.getElementById('botones').innerHTML = `
            <button class="btn btn-danger" onclick="cancelarEdicion()"><i class="fa fa-times"></i> No</button>
            <button class="btn btn-primary" onclick="confirmarEdicion('${idProyecto}')"><i class="fa fa-check"></i> Si</button>`;

}

function cancelarEdicion(){
    window.location = "proyectos.html"
}

function confirmarEdicion(idProyecto){
    var parametros = {
        id: idProyecto,
        nombreProyecto: $('#nombreProyecto').val()
    }; 

    $.ajax({
        url:`/proyectos/${idProyecto}`,
        data: parametros,
        method:"PUT",
        dataType:"JSON",
        success:function(respuesta){
            // alert(respuesta);
            //window.location = "proyectos.html"
            $('#modalConfirmacion').modal('hide');
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Proyecto actualizado con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    window.location = "proyectos.html"
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}


function crearProyectos(idpr){
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

   /* informacion.push({
        nombreProyecto:document.getElementById('nombreProyecto').value
    });
    generarProyectos();*/
    var parametros = "nombreProyecto=" + $('#nombreProyecto').val() + "&idCarpeta=" + $('#select-carpeta').val();
       // alert(parametros);
     $.ajax({
         url:'/proyectos',
         data:parametros,
         method:"POST",
         dataType:"JSON",
         success:function(respuesta){
            // alert(respuesta);
            localStorage.setItem("idHTML", respuesta.html);
            localStorage.setItem("idCSS", respuesta.css);
            localStorage.setItem("idJS", respuesta.js);
            // window.location = "proyectos.html";
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Proyecto creado con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    window.location = "proyectos.html"
                }
            });
         },
         error: function () {
             alert('error');
         },
     });
    
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

function eliminarProyectos(idProyecto){
    //seleccionado = i;
    //console.log(i);
    $.ajax({
        url:`/proyectos/${idProyecto}`,
        method:"DELETE",
        dataType:"JSON",
        success:function(respuesta){
           // alert(respuesta);
            //window.location = "proyectos.html"
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Proyecto eliminado con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    window.location = "proyectos.html"
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

    function cargarProyecto(idProyecto){
        window.location = "nuevoproyecto.html?idProyecto="+idProyecto;
        
    }

  function compartirProyectos(idProyecto){
    document.getElementById('resultado-busqueda').innerHTML = '';
    
    document.getElementById('busqueda').innerHTML = `
    <input id="busqueda-correo" style="width: 80%; text-align: center; float:left" type="text" class="form-control" placeholder="Ingrese correo electrónico">
    <button style="float: right" class="btn btn-primary" id="btn-editar" onclick="buscarCorreoProyectos('${idProyecto}')">Buscar</button>`;

    $.ajax({
    url:`/proyectos/${idProyecto}/usuarios`,
    method:"GET",
    dataType:"JSON",
    success:function(res){
        console.log(res);
        console.log(idProyecto);
        document.getElementById('colaboladores').innerHTML =`
        Proyecto: ${res[0].nombreProyecto} compartido con:`;
        for(var i=0;i<res[0].usuarios.length;i++){
            document.getElementById('colaboladores').innerHTML += `
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    ${res[0].usuarios[i].usuario}
                    <button onclick="eliminarColaboradorProyecto('${idProyecto}', '${res[0].usuarios[i]._id}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
                    <i style="color:red" class="fas fa-user-times"></i>
                    </button>
                </li>
            </ul>`;
        }
    },
    error: function (e) {
    //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
    },
});

$('#modalCompartir').modal('show');
}

function buscarCorreoProyectos(idProyecto){
    $.ajax({
        url:`/user/nombre/${$('#busqueda-correo').val()}`,
        method:"get",
        dataType:"json",
        success:function(res){
           // document.getElementById("contactos").innerHTML = '';
            for (var i=0;i<res.length;i++){
                document.getElementById('linea').style = 'margin-top: 12%; display:block';
                document.getElementById('resultado-busqueda').innerHTML += `
                <tr>${res[0].email}
                <button onclick="compartirProyecto('${idProyecto}')" style="border:none, background-color:none; float:right" class="btn btn-circle">
                    <i style="font-size: 20px; color: green;" class="fas fa-user-check"></i>
                </button>
                </tr>`;

                document.getElementById('idUser').innerHTML = `
                <input id="id-usuario" type="text" value="${res[0]._id}">`
			}
        },
        error: function (e) {
            console.log(e);
        },
    }); 
}

function compartirProyecto(idProyecto){
    var parametros = {
        idUsuario : $('#id-usuario').val(),
        idProyecto: idProyecto
    }
    console.log(parametros);

    $.ajax({
        url:`proyectos/compartir`,
        data:parametros,
        method:"POST",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //alert('SE COMPARTIÓ');
            //$(opcion).remove();
            //window.location = '/carpetas.html';
            compartirProyectos(idProyecto);
        },
        error: function (e) {
            console.log(e);
        },
    }); 
}