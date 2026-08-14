import { VideoclubService } from "../services/VideoclubService.js";
import { buscarInfoPelicula } from "../services/ApiPeliculas.js";
import { escaparHTML } from "../utils/seguridad.js";

const servicio = new VideoclubService();

const $codigo = document.getElementById("codigo");
const $nombre = document.getElementById("nombre");
const $descripcion = document.getElementById("descripcion");
const $precio = document.getElementById("precio");
const $stock = document.getElementById("stock");
const $lista = document.getElementById("lista-peliculas");
const $mensajeApi = document.getElementById("mensaje-api");

function inicializarFormulario() {
    $codigo.value = "";
    $nombre.value = "";
    $descripcion.value = "";
    $precio.value = "";
    $stock.value = "";
    if ($mensajeApi) $mensajeApi.textContent = "";
    $codigo.focus();
}

function listarPeliculas() {
    $lista.innerHTML = "";
    for (const pelicula of servicio.getPeliculas()) {
        const texto =
            `Código: ${pelicula.codigo} : Nombre: ${pelicula.nombre}` +
            ` - Precio: $${pelicula.precio} - Stock: ${pelicula.stock}`;
        const opcion = new Option(escaparHTML(texto), pelicula.codigo);
        $lista.add(opcion);
    }
}

function seleccionarPelicula() {
    const pelicula = servicio.buscarPelicula($lista.value);
    if (!pelicula) return;
    $codigo.value = pelicula.codigo;
    $nombre.value = pelicula.nombre;
    $descripcion.value = pelicula.descripcion;
    $precio.value = pelicula.precio;
    $stock.value = pelicula.stock;
}

function agregarPelicula() {
    const resultado = servicio.agregarPelicula({
        codigo: $codigo.value,
        nombre: $nombre.value,
        descripcion: $descripcion.value,
        precio: $precio.value,
        stock: $stock.value
    });
    alert(resultado.mensaje);
    if (resultado.ok) {
        inicializarFormulario();
        listarPeliculas();
    }
}

function modificarPelicula() {
    const resultado = servicio.modificarPelicula($lista.value, {
        nombre: $nombre.value,
        descripcion: $descripcion.value,
        precio: $precio.value,
        stock: $stock.value
    });
    alert(resultado.mensaje);
    if (resultado.ok) {
        inicializarFormulario();
        listarPeliculas();
    }
}

function eliminarPelicula() {
    const resultado = servicio.eliminarPelicula($lista.value);
    alert(resultado.mensaje);
    if (resultado.ok) {
        inicializarFormulario();
        listarPeliculas();
    }
}

async function buscarInfoEnApi() {
    if (!$nombre.value.trim()) {
        alert("Escriba un nombre para poder buscarlo.");
        return;
    }

    $mensajeApi.textContent = "Buscando...";
    try {
        const resultado = await buscarInfoPelicula($nombre.value);
        if (!resultado) {
            $mensajeApi.textContent = "No se encontraron resultados.";
            return;
        }
        $descripcion.value = resultado.descripcion;
        $mensajeApi.textContent = `Descripción completada a partir de "${resultado.nombre}".`;
    } catch (error) {
        console.error(error);
        $mensajeApi.textContent = "Ocurrió un error al buscar. Intente nuevamente.";
    }
}

document.getElementById("dep").addEventListener("click", (evento) => {
    const accion = evento.target.dataset.accion;
    if (!accion) return;

    switch (accion) {
        case "agregar": agregarPelicula(); break;
        case "modificar": modificarPelicula(); break;
        case "eliminar": eliminarPelicula(); break;
        case "limpiar": inicializarFormulario(); break;
        case "buscar-api": buscarInfoEnApi(); break;
    }
});

$lista.addEventListener("change", seleccionarPelicula);

servicio.cargarPeliculas();
inicializarFormulario();
listarPeliculas();