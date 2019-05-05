$(document).ready(function(){
    console.log("El DOM ha sido cargado");

        $.ajax({
            url:`/archivos/${obtenerId('idArchivo')}`,
            method:"GET",
            dataType:"JSON",
            success:function(res){
            document.getElementById('editor-archivo').innerHTML = `
            <div id="nombre-pagina"></div>
            <h1 id="nombre-proyecto" class="nombre-proyecto">ARCHIVO: ${res[0].nombreArchivo}.${res[0].extension}</h1>
            <div id="contenido-archivo">
            <div id="botones-archivo"></div>
            </div>
            `;
            document.getElementById('contenido-archivo').innerHTML = `
            Contenido Archivo
            <div style="float:right" id="botones-archivo" class="botones"></div>
            <textarea id="contenidoArchivo" style="height: 500px;" class="form-control">${res[0].contenido}</textarea>`;
            document.getElementById('botones-archivo').innerHTML = `
            <a href download="${res[0].nombreArchivo}.${res[0].extension}" onclick="descargarArchivo(this)"><i class="fas fa-download"></i></a>
            <button type="button" class="btn btn-proyecto" onclick="guardarArchivo('${res[0]._id}')"><i class="fas fa-save"></i></button>
            <br>`;
            },
            error: function () {
                alert('error');
            },
        });
});

function obtenerId(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function descargarArchivo(archivo){
    var texto = document.getElementById('contenidoArchivo').value;

    archivo.download;

    /*function dataUrl(data) {return "data:x-application/text," + escape(data);}
    window.open(dataUrl(texto));*/
    archivo.href = "data:x-application/octet-stream," + encodeURIComponent(texto);
}

function guardarArchivo(idArchivo){
    var parametros = {
        id: idArchivo,
        contenido: document.getElementById('contenidoArchivo').value
    }
    console.log(parametros);

    $.ajax({
        url:`/archivos/${idArchivo}/guardar`,
        data:parametros,
        method:"PUT",
        dataType:"JSON",
        success:function(respuesta){
            //window.location = "menu.html"
            iziToast.success({
                timeout:1800,
                overlay: true,
                position: 'center', 
                displayMode: 'once',
                title: 'OK',
                message: 'Archivo actualizado con éxito!',
                onClosing: function(instance, toast, closedBy){
                    console.info('Closed | closedBy: ' + closedBy);
                    window.location = "menu.html"
                }
            });
        },
        error: function () {
            alert('error');
        },
    });
}

