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
        <label for="plan-persona">Plan</label>
            <select id="plan-persona" class="form-control">
            <option value="" selected disabled>--Seleccione su plan--</option>
                <option value="5cc7993eb56d781460c5cddf">Plan Gratuito</option>
                <option value="5cc7994eb56d781460c5cde0">Plan $10</option>
                <option value="5cc79970b56d781460c5cde1">Plan $20</option>
            </select>
            <div class="invalid-feedback" style="width: 100%;">
            Se requiere un dato válido.
            </div>
        </div>

        <hr class="mb-4">
        <button class="btn btn-primary btn-lg btn-block" type="button" onclick="cambiarPlan('${res[0]._id}')">
            Actualizar Plan
        </button>

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
        <button class="btn btn-primary btn-lg btn-block" type="button" onclick="cambiarContrasenia('${res[0]._id}')">
            Actualizar Contraseña
        </button>

        </form>`;	
                },
        error: function (e) {
            console.log(e);
        },
    }); 
    
});

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

function cambiarPlan(){
    $('#modalTarjetaCredito').modal('show');
}

function registrarTarjeta(){
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

            //alert("Plan actualizado");
            $('#modalTarjetaCredito').modal('hide');
            var plan = "idplan=" + $('#plan-persona').val();
            console.log(plan);
            $.ajax({
                url:`/user/plan`,
                data: plan,
                method:"POST",
                dataType:"JSON",
                success:function(respuesta){
                   // alert('Actualizado');
                   iziToast.success({
                    timeout:1800,
                    overlay: true,
                    position: 'center', 
                    displayMode: 'once',
                    title: 'OK',
                    message: 'Has cambiado tu plan exitósamente!',
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

         },
         error: function () {
             //alert('error');
         },
     });


}


