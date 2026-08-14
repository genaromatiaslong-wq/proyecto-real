import { VideoclubService } from "../services/VideoclubService.js";
import { escaparHTML } from "../utils/seguridad.js";

const servicio = new VideoclubService();

const $codigo = document.getElementById("codigo");
const $fecha = document.getElementById("fecha");
const $codigoFuncionario = document.getElementById("codigo-funcionario");
const $codigoPelicula = document.getElementById("codigo-pelicula");
const $precioPelicula = document.getElementById("precio-pelicula");
const $cantidad = document.getElementById("cantidad");
const $total = document.getElementById("total");
const $lista = document.getElementById("lista-alquileres");

function fechaDeHoy() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

function cargarComboFuncionarios() {
    $codigoFuncionario.options.length = 0;
    $codigoFuncionario.add(new Option("Seleccione un funcionario", ""));
    for (const funcionario of servicio.getFuncionarios()) {
        $codigoFuncionario.add(new Option(escaparHTML(funcionario.nombre), funcionario.codigo));
    }
}

function cargarComboPeliculas() {
    $codigoPelicula.options.length = 0;
    $codigoPelicula.add(new Option("Seleccione una película", ""));
    for (const pelicula of servicio.getPeliculas()) {
        $codigoPelicula.add(new Option(escaparHTML(pelicula.nombre), pelicula.codigo));
    }
}

function cargarPrecioPelicula() {
    const pelicula = servicio.buscarPelicula($codigoPelicula.value);
    $precioPelicula.value = pelicula ? pelicula.precio : "";
    calcularTotal();
}

function calcularTotal() {
    const precio = Number($precioPelicula.value);
    const cantidad = Number($cantidad.value);
    $total.value = cantidad > 0 ? precio * cantidad : "";
}

function inicializarFormulario() {
    $codigo.value = "";
    $fecha.value = fechaDeHoy();
    $codigoFuncionario.value = "";
    $codigoPelicula.value = "";
    $precioPelicula.value = "";
    $cantidad.value = "";
    $total.value = "";
    $codigo.focus();
}

function listarAlquileres() {
    $lista.innerHTML = "";
    for (const alquiler of servicio.getAlquileres()) {
        const texto =
            `Código: ${alquiler.codigo} : Fecha: ${alquiler.fecha}` +
            ` - Película: ${alquiler.pelicula.nombre} - Total: $${alquiler.total}`;
        $lista.add(new Option(escaparHTML(texto), alquiler.codigo));
    }
}

function seleccionarAlquiler() {
    const alquiler = servicio.buscarAlquiler($lista.value);
    if (!alquiler) return;
    $codigo.value = alquiler.codigo;
    $fecha.value = alquiler.fecha;
    $codigoFuncionario.value = alquiler.funcionario.codigo;
    $codigoPelicula.value = alquiler.pelicula.codigo;
    $precioPelicula.value = alquiler.pelicula.precio;
    $cantidad.value = alquiler.cantidad;
    $total.value = alquiler.total;
}

function agregarAlquiler() {
    const resultado = servicio.agregarAlquiler({
        codigo: $codigo.value,
        fecha: $fecha.value,
        codigoFuncionario: $codigoFuncionario.value,
        codigoPelicula: $codigoPelicula.value,
        cantidad: $cantidad.value,
        total: $total.value
    });
    alert(resultado.mensaje);
    if (resultado.ok) {
        cargarComboPeliculas();
        inicializarFormulario();
        listarAlquileres();
    }
}

function eliminarAlquiler() {
    const resultado = servicio.eliminarAlquiler($lista.value);
    alert(resultado.mensaje);
    if (resultado.ok) {
        cargarComboPeliculas();
        inicializarFormulario();
        listarAlquileres();
    }
}

document.getElementById("dep").addEventListener("click", (evento) => {
    const accion = evento.target.dataset.accion;
    if (!accion) return;

    switch (accion) {
        case "agregar": agregarAlquiler(); break;
        case "eliminar": eliminarAlquiler(); break;
        case "limpiar": inicializarFormulario(); break;
    }
});

document.getElementById("dep").addEventListener("change", (evento) => {
    if (evento.target === $codigoPelicula) cargarPrecioPelicula();
});
$cantidad.addEventListener("blur", calcularTotal);
$lista.addEventListener("change", seleccionarAlquiler);

servicio.cargarTodo();
cargarComboFuncionarios();
cargarComboPeliculas();
inicializarFormulario();
listarAlquileres();