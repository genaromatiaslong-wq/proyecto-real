import { VideoclubService } from "../services/VideoclubService.js";
import { escaparHTML } from "../utils/seguridad.js";

const servicio = new VideoclubService();

const $totalRecaudado = document.getElementById("totalRecaudado");
const $masAlquilada = document.getElementById("masAlquilada");
const $mejorFuncionario = document.getElementById("mejorFuncionario");
const $listaStock = document.getElementById("peliculas-con-stock");

function mostrarTotalRecaudado() {
    $totalRecaudado.value = `$${servicio.totalRecaudado()}`;
}

function mostrarPeliculaMasAlquilada() {
    const pelicula = servicio.peliculaMasAlquilada();
    $masAlquilada.value = pelicula
        ? `${pelicula.nombre} con ${pelicula.cantAlquilados} unidades`
        : "Sin datos aún";
}

function mostrarMejorFuncionario() {
    const funcionario = servicio.mejorFuncionario();
    $mejorFuncionario.value = funcionario
        ? `${funcionario.nombre} con ${funcionario.cantAlquileres} alquileres`
        : "Sin datos aún";
}

function mostrarPeliculasConStock() {
    $listaStock.innerHTML = "";
    for (const pelicula of servicio.peliculasConStock()) {
        const texto =
            `Código: ${pelicula.codigo} : Nombre: ${pelicula.nombre}` +
            ` - Precio: $${pelicula.precio} - Stock: ${pelicula.stock}`;
        $listaStock.add(new Option(escaparHTML(texto), pelicula.codigo));
    }
}

servicio.cargarTodo();
mostrarTotalRecaudado();
mostrarPeliculaMasAlquilada();
mostrarMejorFuncionario();
mostrarPeliculasConStock();