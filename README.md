# Frontend

Esta aplicacion es la capa frontend de la prueba tecnica.

## Características

* **Estilos con Bootstrap 5**: Diseño responsivo.
* **Interactividad con JavaScript y jQuery**: Validaciones y peticiones AJAX.

## Requisitos previos

* Conexión a la **API SGA**.

## Instalación

1. Clonar o descargar este repositorio.

## Configuración

En el archivo `script.js` se debe definir la URL de la **API SGA**. Modifica la constante `apiUrl`:

```javascript
// script.js
const apiUrl = "http://prueba-ga-api-sga.test:8083";
```

Asegúrate de que esta URL apunte correctamente al servidor de la API.

## Uso

1. Con la configuración correcta de `apiUrl`, carga la página `index.html` en tu navegador.
2. Ingresa los datos en el formulario para realizar una cotizacion.
