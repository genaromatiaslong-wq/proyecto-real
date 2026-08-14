export class Alquiler {
    #codigo;
    #fecha;
    #pelicula;
    #funcionario;
    #cantidad;
    #total;

    constructor(codigo, fecha, pelicula, funcionario, cantidad, total) {
        this.#codigo = codigo;
        this.#fecha = fecha;
        this.#pelicula = pelicula;
        this.#funcionario = funcionario;
        this.#cantidad = Number(cantidad);
        this.#total = Number(total);
    }
}