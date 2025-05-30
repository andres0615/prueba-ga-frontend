$(document).ready(() => {
    const apiUrl = "http://prueba-ga-api-sga.test:8083";

    $.validator.addMethod('placa', function(value, element) {
        return this.optional(element) || /^[A-Z]{3}\d{3}$/.test(value);
    }, 'Formato inválido. Debe ser 3 letras mayúsculas y 3 números, e.j. ABC123');

  // Configuración de jQuery Validation
  $("#quoteForm").on("submit", function(e) {
    e.preventDefault();
  }).validate({
    rules: {
      nombre: {
        required: true,
      },
      apellidos: {
        required: true,
      },
      fechaNacimiento: {
        required: true,
      },
      placa: {
        required: true,
        maxlength: 6,
        placa: true,
      },
    },
    messages: {
      nombre: {
        required: "Por favor ingrese su nombre",
      },
      apellidos: {
        required: "Por favor ingrese sus apellidos",
      },
      fechaNacimiento: {
        required: "Por favor seleccione su fecha de nacimiento",
      },
      placa: {
        required: "Por favor ingrese la placa de su automóvil",
        maxlength: "La placa no puede exceder los 6 caracteres",
        placa: 'Debe tener 3 letras mayúsculas seguidas de 3 dígitos (e.j. ABC123)'
      },
    },
    errorElement: "div",
    errorClass: "error",
    submitHandler: (form) => {
      // Procesar el formulario cuando pasa la validación
      processQuote();
      return false;
    },
  })

  // Función para procesar la cotización
  function processQuote() {
    // Obtener los valores del formulario
    let nombre = $("#nombre").val()
    let apellidos = $("#apellidos").val()
    let fechaNacimiento = $("#fechaNacimiento").val()
    let placa = $("#placa").val()

    let user = {
      nombre: nombre,
      apellidos: apellidos,
      fechaNacimiento: fechaNacimiento,
      placa: placa,
    };

    // Generar datos de cotización (simulados)
    let result = generarCotizaciones(user);
    console.log(result);

    if(result.success == true){
        cotizaciones = result.cotizaciones;

        // Mostrar los resultados en la tabla
        mostrarResultados(cotizaciones);

        // Ocultar formulario y mostrar resultados
        $("#quoteForm").hide();
        $("#resultSection").fadeIn();
    } else {
        $("#form-alert").css("display", "block").focus();
    }
    
  }

  // Función para generar cotizaciones simuladas
  function generarCotizaciones(user) {

    let cotizaciones = [];
    let url = apiUrl + "/cotizar";
    let success = false;

    $.ajax({
      url: url, // Replace with your endpoint
      method: "POST",
      contentType: 'application/json',
      data: JSON.stringify(user),
      async: false, // Ensure the request completes before returning
      success: (response) => {
        cotizaciones = response.cotizaciones; // Assuming the response contains a 'cotizaciones' array
        // success = true;
        if(typeof cotizaciones !== "undefined"){
            if (cotizaciones.length > 0) {
                success = true;
            }
        }
      },
      error: (xhr, status, error) => {
        console.error("Error obteniendo las cotizaciones:", error);
      },
    });

    let result = {
        cotizaciones: cotizaciones,
        success: success,
    };

    return result;

  }

  // Función para mostrar los resultados en la tabla
  function mostrarResultados(cotizaciones) {
    let tbody = $("#quoteResults")
    tbody.empty()

    cotizaciones.forEach((cotizacion) => {
      let row = `
        <tr>
          <td>${cotizacion.numero}</td>
          <td>${cotizacion.placa}</td>
          <td>${cotizacion.valor}</td>
          <td>${cotizacion.plan}</td>
        </tr>
      `
      tbody.append(row)
    });

    $("#quoteForm").hide()
    $("#resultSection").fadeIn()
  }

  // Botón para nueva cotización
  $("#newQuoteBtn").click(() => {
    // Resetear el formulario
    $("#quoteForm")[0].reset()

    // Mostrar formulario y ocultar resultados
    $("#resultSection").hide()
    $("#quoteForm").fadeIn()
  })
})
