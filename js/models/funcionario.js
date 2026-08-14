export class Funcionario {
    #codigo;
    #nombre;
    #cedula;
    #cantAlquileres;

    constructor(codigo, nombre, cedula, cantAlquileres = 0) {
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#cedula = cedula;
        this.#cantAlquileres = Number(cantAlquileres);
    }
    get codigo() { return this.#codigo; }
    get nombre() { return this.#nombre; }
    get cedula() { return this.#cedula; }
    get cantAlquileres() { return this.#cantAlquileres; }

    set nombre(valor) { this.#nombre = valor; }
    set cedula(valor) { this.#cedula = valor; }

    sumarAlquiler() { this.#cantAlquileres += 1; }
    restarAlquiler() { this.#cantAlquileres -= 1; }
    
    toJSON() {
        return {
            codigo: this.#codigo,
            nombre: this.#nombre,
            cedula: this.#cedula,
            cantAlquileres: this.#cantAlquileres
        };
    }

    static desdeObjeto(obj) {
        return new Funcionario(obj.codigo, obj.nombre, obj.cedula, obj.cantAlquileres);
    }
}
