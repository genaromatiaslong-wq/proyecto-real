import { VideoclubService } from "../services/VideoclubService.js";
import { escaparHTML } from "../utils/seguridad.js";

const servicio = new VideoclubService();

const $codigo = document.getElementById("codigo");
const $nombre = document.getElementById("nombre");
const $cedula = document.getElementById("cedula");
const $lista = document.getElementById("lista-funcionarios");

function inicializarFormulario() {
    $codigo.value = "";
    $nombre.value = "";
    $cedula.value = "";
    $codigo.focus();
}

function listarFuncionarios() {
    $lista.innerHTML = "";
    for (const funcionario of servicio.getFuncionarios()) {
        const texto = `Código: ${funcionario.codigo} : Nombre: ${funcionario.nombre} - Cédula: ${funcionario.cedula}`;
        const opcion = new Option(escaparHTML(texto), funcionario.codigo);
        $lista.add(opcion);
    }
}

function seleccionarFuncionario() {
    const funcionario = servicio.buscarFuncionario($lista.value);
    if (!funcionario) return;
    $codigo.value = funcionario.codigo;
    $nombre.value = funcionario.nombre;
    $cedula.value = funcionario.cedula;
}

function agregarFuncionario() {
    const resultado = servicio.agregarFuncionario({
        codigo: $codigo.value,
        nombre: $nombre.value,
        cedula: $cedula.value
    });
    alert(resultado.mensaje);
    if (resultado.ok) {
        inicializarFormulario();
        listarFuncionarios();
    }
}

function modificarFuncionario() {
    const resultado = servicio.modificarFuncionario($lista.value, {
        nombre: $nombre.value,
        cedula: $cedula.value
    });
    alert(resultado.mensaje);
    if (resultado.ok) {
        inicializarFormulario();
        listarFuncionarios();
    }
}

function eliminarFuncionario() {
    const resultado = servicio.eliminarFuncionario($lista.value);
    alert(resultado.mensaje);
    if (resultado.ok) {
        inicializarFormulario();
        listarFuncionarios();
    }
}

document.getElementById("dep").addEventListener("click", (evento) => {
    const accion = evento.target.dataset.accion;
    if (!accion) return;

    switch (accion) {
        case "agregar": agregarFuncionario(); break;
        case "modificar": modificarFuncionario(); break;
        case "eliminar": eliminarFuncionario(); break;
        case "limpiar": inicializarFormulario(); break;
    }
});

$lista.addEventListener("change", seleccionarFuncionario);

servicio.cargarFuncionarios();
inicializarFormulario();
listarFuncionarios();