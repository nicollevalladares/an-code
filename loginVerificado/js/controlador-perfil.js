$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    $.ajax({
        url:"/user",
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('perfil').innerHTML = `Perfil de: ${res[0].usuario}`;
            document.getElementById('contenido-perfil').innerHTML = `
            <h4 style="text-align:center" class="mb-3">Configuración de información</h4>
            <form class="needs-validation" novalidate>
            <div class="row">
                <div style="display: none" class="form-group">
                    <label for="idcliente">Id</label>
                    <input type="text" class="form-control" id="idcliente">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="primerNombre">Primer Nombre</label>
                    <input type="text" class="form-control" id="primerNombre" placeholder="Ingrese su primer nombre" value="${res[0].nombre}"  required>
                    <div class="invalid-feedback">
                        Se requiere un dato válido.
                    </div>
                </div>
                <div style="" class="col-md-6 mb-3">
                    <label for="primerApellido">Primer Apellido</label>
                    <input type="text" class="form-control" id="primerApellido" placeholder="Ingrese su primer apellido" value="${res[0].apellido}"  required>
                    <div class="invalid-feedback">
                        Se requiere un dato válido.
                    </div>
                </div>
                </div>
                
            </div>

            <div class="mb-3">
            <label for="email">Usuario</label>
                <input type="text" class="form-control" id="usuario" placeholder="Ingrese su usuario" value="${res[0].usuario}" required>
                <div class="invalid-feedback" style="width: 100%;">
                Se requiere un dato válido.
                </div>
            </div>

            <div class="mb-3">
                <label for="email">Email</label>
                <input type="text" class="form-control" value="${res[0].email}" id="email" placeholder="Ingrese su correo eléctronico" required>
                <div class="invalid-feedback" style="width: 100%;">
                    Se requiere un dato válido.
                </div>
            </div>

            <hr class="mb-4">
            <button class="btn btn-primary btn-lg btn-block" type="submit">Guardar</button>
            </form>`;	
                },
        error: function (e) {
            console.log(e);
        },
    }); 
    
});

