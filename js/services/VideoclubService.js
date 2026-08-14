import { Memoria } from "./Memoria.js";
import { Pelicula } from "../models/Pelicula.js";
import { Funcionario } from "../models/Funcionario.js";
import { Alquiler } from "../models/Alquiler.js";
import { limpiarTexto, esNumeroValido } from "../utils/seguridad.js";

export class VideoclubService {
    #memoria = new Memoria();
    #peliculas = [];
    #funcionarios = [];
    #alquileres = [];

cargarPeliculas() { 
        const datos = this.#memoria.leer("peliculas") || [];
        this.#peliculas = datos.map(Pelicula.desdeObjeto);
        return this.#peliculas;
    }

    cargarFuncionarios() {
        const datos = this.#memoria.leer("funcionarios") || [];
        this.#funcionarios = datos.map(Funcionario.desdeObjeto);
        return this.#funcionarios;
    }

    cargarAlquileres() {
        const datos = this.#memoria.leer("alquileres") || [];
        this.#alquileres = datos.map(Alquiler.desdeObjeto);
        return this.#alquileres;
    }

    cargarTodo() {
        this.cargarPeliculas();
        this.cargarFuncionarios();
        this.cargarAlquileres();
    }
    getPeliculas() { return this.#peliculas; }
    getFuncionarios() { return this.#funcionarios; }
    getAlquileres() { return this.#alquileres; }

    #guardarPeliculas() { this.#memoria.escribir("peliculas", this.#peliculas); }
    #guardarFuncionarios() { this.#memoria.escribir("funcionarios", this.#funcionarios); }
    #guardarAlquileres() { this.#memoria.escribir("alquileres", this.#alquileres); }

//#region ABM Peliculas
buscarPelicula(codigo) {
        return this.#peliculas.find((p) => p.codigo == codigo) || null;
    }

    agregarPelicula({ codigo, nombre, descripcion, precio, stock }) {
        codigo = limpiarTexto(codigo, 20);
        nombre = limpiarTexto(nombre, 100);
        descripcion = limpiarTexto(descripcion, 300);

        if (!codigo || !nombre || !descripcion) {
            return { ok: false, mensaje: "Debe ingresar todos los campos." };
        }
        if (!esNumeroValido(precio) || !esNumeroValido(stock)) {
            return { ok: false, mensaje: "Los valores de precio y stock no son correctos." };
        }
        if (this.buscarPelicula(codigo)) {
            return { ok: false, mensaje: "Ya existe una película con ese código." };
        }

        const nueva = new Pelicula(codigo, nombre, descripcion, precio, stock);
        this.#peliculas.push(nueva);
        this.#guardarPeliculas();
        return { ok: true, mensaje: "Película agregada correctamente." };
    }

    modificarPelicula(codigoSeleccionado, { nombre, descripcion, precio, stock }) {
        nombre = limpiarTexto(nombre, 100);
        descripcion = limpiarTexto(descripcion, 300);

        if (!codigoSeleccionado || !nombre || !descripcion) {
            return { ok: false, mensaje: "Debe ingresar todos los campos." };
        }
        if (!esNumeroValido(precio) || !esNumeroValido(stock)) {
            return { ok: false, mensaje: "Los valores de precio y stock no son correctos." };
        }

        const pelicula = this.buscarPelicula(codigoSeleccionado);
        if (!pelicula) {
            return { ok: false, mensaje: "No se encontró la película seleccionada." };
        }

        pelicula.nombre = nombre;
        pelicula.descripcion = descripcion;
        pelicula.precio = precio;
        pelicula.stock = stock;

        this.#guardarPeliculas();
        return { ok: true, mensaje: "Película modificada correctamente." };
    }

    eliminarPelicula(codigoSeleccionado) {
        if (!codigoSeleccionado) {
            return { ok: false, mensaje: "Debe seleccionar una película." };
        }
        const posicion = this.#peliculas.findIndex((p) => p.codigo == codigoSeleccionado);
        if (posicion === -1) {
            return { ok: false, mensaje: "No se encontró la película seleccionada." };
        }
        this.#peliculas.splice(posicion, 1);
        this.#guardarPeliculas();
        return { ok: true, mensaje: "Película eliminada correctamente." };
    }
//#endregion

//#region ABM Funcionarios
buscarFuncionario(codigo) {
        return this.#funcionarios.find((f) => f.codigo == codigo) || null;
    }

    agregarFuncionario({ codigo, nombre, cedula }) {
        codigo = limpiarTexto(codigo, 20);
        nombre = limpiarTexto(nombre, 100);
        cedula = limpiarTexto(cedula, 20);

        if (!codigo || !nombre || !cedula) {
            return { ok: false, mensaje: "Debe ingresar todos los campos." };
        }
        if (this.buscarFuncionario(codigo)) {
            return { ok: false, mensaje: "Ya existe un funcionario con ese código." };
        }

        const nuevo = new Funcionario(codigo, nombre, cedula);
        this.#funcionarios.push(nuevo);
        this.#guardarFuncionarios();
        return { ok: true, mensaje: "Funcionario agregado correctamente." };
    }

    modificarFuncionario(codigoSeleccionado, { nombre, cedula }) {
        nombre = limpiarTexto(nombre, 100);
        cedula = limpiarTexto(cedula, 20);

        if (!codigoSeleccionado || !nombre || !cedula) {
            return { ok: false, mensaje: "Debe ingresar todos los campos." };
        }
        const funcionario = this.buscarFuncionario(codigoSeleccionado);
        if (!funcionario) {
            return { ok: false, mensaje: "No se encontró el funcionario seleccionado." };
        }
        funcionario.nombre = nombre;
        funcionario.cedula = cedula;

        this.#guardarFuncionarios();
        return { ok: true, mensaje: "Funcionario modificado correctamente." };
    }

    eliminarFuncionario(codigoSeleccionado) {
        if (!codigoSeleccionado) {
            return { ok: false, mensaje: "Debe seleccionar un funcionario." };
        }
        const posicion = this.#funcionarios.findIndex((f) => f.codigo == codigoSeleccionado);
        if (posicion === -1) {
            return { ok: false, mensaje: "No se encontró el funcionario seleccionado." };
        }
        this.#funcionarios.splice(posicion, 1);
        this.#guardarFuncionarios();
        return { ok: true, mensaje: "Funcionario eliminado correctamente." };
    }
//#endregion

//#region ABM Alquileres
buscarAlquiler(codigo) {
        return this.#alquileres.find((a) => a.codigo == codigo) || null;
    }

    agregarAlquiler({ codigo, fecha, codigoFuncionario, codigoPelicula, cantidad, total }) {
        codigo = limpiarTexto(codigo, 20);

        if (!codigo || !fecha || !codigoFuncionario || !codigoPelicula) {
            return { ok: false, mensaje: "Debe ingresar todos los campos." };
        }
        if (!esNumeroValido(cantidad) || !esNumeroValido(total) || Number(cantidad) <= 0) {
            return { ok: false, mensaje: "Los valores ingresados no son correctos." };
        }
        if (this.buscarAlquiler(codigo)) {
            return { ok: false, mensaje: "Ya existe un alquiler con ese código." };
        }

        const pelicula = this.buscarPelicula(codigoPelicula);
        const funcionario = this.buscarFuncionario(codigoFuncionario);
        if (!pelicula || !funcionario) {
            return { ok: false, mensaje: "Película o funcionario inválido." };
        }
        if (pelicula.stock < Number(cantidad)) {
            return { ok: false, mensaje: `No hay stock suficiente. Stock disponible: ${pelicula.stock}.` };
        }

        const nuevo = new Alquiler(codigo, fecha, pelicula, funcionario, cantidad, total);
        this.#alquileres.push(nuevo);

        pelicula.descontarStock(Number(cantidad));
        funcionario.sumarAlquiler();

        this.#guardarAlquileres();
        this.#guardarPeliculas();
        this.#guardarFuncionarios();

        return { ok: true, mensaje: "Alquiler agregado correctamente." };
    }

    eliminarAlquiler(codigoSeleccionado) {
        if (!codigoSeleccionado) {
            return { ok: false, mensaje: "Debe seleccionar un alquiler." };
        }
        const posicion = this.#alquileres.findIndex((a) => a.codigo == codigoSeleccionado);
        if (posicion === -1) {
            return { ok: false, mensaje: "No se encontró el alquiler seleccionado." };
        }

        const [alquilerEliminado] = this.#alquileres.splice(posicion, 1);

        const pelicula = this.buscarPelicula(alquilerEliminado.pelicula.codigo);
        const funcionario = this.buscarFuncionario(alquilerEliminado.funcionario.codigo);
        if (pelicula) pelicula.devolverStock(alquilerEliminado.cantidad);
        if (funcionario) funcionario.restarAlquiler();

        this.#guardarAlquileres();
        this.#guardarPeliculas();
        this.#guardarFuncionarios();

        return { ok: true, mensaje: "Alquiler eliminado correctamente." };
    }
//#endregion
//#region Estadisticas
totalRecaudado() {
        return this.#alquileres.reduce((acumulado, alquiler) => acumulado + alquiler.total, 0);
    }

    peliculaMasAlquilada() {
        if (this.#peliculas.length === 0) return null;
        return this.#peliculas.reduce((mayor, actual) =>
            actual.cantAlquilados > (mayor?.cantAlquilados ?? -1) ? actual : mayor
        , null);
    }

    mejorFuncionario() {
        if (this.#funcionarios.length === 0) return null;
        return this.#funcionarios.reduce((mayor, actual) =>
            actual.cantAlquileres > (mayor?.cantAlquileres ?? -1) ? actual : mayor
        , null);
    }

    peliculasConStock() {
        return this.#peliculas.filter((p) => p.stock > 0);
    }
//#endregion
}
