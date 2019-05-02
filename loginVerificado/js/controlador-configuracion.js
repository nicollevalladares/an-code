$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    $.ajax({
        url:"/user",
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('perfil').innerHTML = `Perfil de: ${res[0].usuario}`;
            document.getElementById('info-config').innerHTML = `
            <h4 style="text-align:center" class="mb-3">Configuración de información</h4>
            <form class="needs-validation" novalidate>
            <div class="row">
            <div style="display: none" class="form-group">
                <label for="idcliente">Id</label>
                <input type="text" class="form-control" id="idcliente">
            </div>
            </div>
            
        </div>

        <div class="mb-3">
        <label for="email">Plan</label>
            <select id="plan-persona" class="form-control">
            <option value="" selected disabled>--Seleccione su plan--</option>
                <option value="Plan Gratuito">Plan Gratuito</option>
                <option value="Plan $10">Plan $10</option>
                <option value="Plan $20">Plan $20</option>
            </select>
            <div class="invalid-feedback" style="width: 100%;">
            Se requiere un dato válido.
            </div>
        </div>

        <div class="mb-3">
            <label for="password">Cambio de Contraseña</label>
            <input type="password" class="form-control" id="pws-vieja" placeholder="Ingrese su contraseña actual" required>
            <div class="invalid-feedback" style="width: 100%;">
                Se requiere un dato válido.
            </div>
        </div>

        <div class="mb-3">
            <input type="password" class="form-control" id="pws-nueva" placeholder="Ingrese su contraseña nueva" required>
            <div class="invalid-feedback" style="width: 100%;">
                Se requiere un dato válido.
            </div>
        </div>

        <div class="mb-3">
            <input type="password" class="form-control" id="pws-nueva-conf" placeholder="Confirme su contraseña nueva" required>
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


