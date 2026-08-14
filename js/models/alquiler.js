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
    get codigo() { return this.#codigo; }
    get fecha() { return this.#fecha; }
    get pelicula() { return this.#pelicula; }
    get funcionario() { return this.#funcionario; }
    get cantidad() { return this.#cantidad; }
    get total() { return this.#total; }

    set fecha(valor) { this.#fecha = valor; }
    set pelicula(valor) { this.#pelicula = valor; }
    set funcionario(valor) { this.#funcionario = valor; }
    set cantidad(valor) { this.#cantidad = Number(valor); }
    set total(valor) { this.#total = Number(valor); }

    toJSON() {
        return {
            codigo: this.#codigo,
            fecha: this.#fecha,
            pelicula: this.#pelicula, 
            funcionario: this.#funcionario,
            cantidad: this.#cantidad,
            total: this.#total
        };
    }

    static desdeObjeto(obj) {
        return new Alquiler(obj.codigo, obj.fecha, obj.pelicula, obj.funcionario, obj.cantidad, obj.total);
    }
}