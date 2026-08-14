    export class Pelicula {
    #codigo;
    #nombre;
    #descripcion;
    #precio;
    #stock;
    #cantAlquilados;
    constructor(codigo, nombre, descripcion, precio, stock, cantAlquilados = 0) {
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precio = Number(precio);
        this.#stock = Number(stock);
        this.#cantAlquilados = Number(cantAlquilados);
    }
    get codigo() { return this.#codigo; }
    get nombre() { return this.#nombre; }
    get descripcion() { return this.#descripcion; }
    get precio() { return this.#precio; }
    get stock() { return this.#stock; }
    get cantAlquilados() { return this.#cantAlquilados; }

    set nombre(valor) { this.#nombre = valor; }
    set descripcion(valor) { this.#descripcion = valor; }
    set precio(valor) { this.#precio = Number(valor); }
    set stock(valor) { this.#stock = Number(valor); }

    descontarStock(cantidad) {
        this.#stock -= cantidad;
        this.#cantAlquilados += cantidad;
    }
        devolverStock(cantidad) {
        this.#stock += cantidad;
        this.#cantAlquilados -= cantidad;
    }
    toJSON() {
        return {
            codigo: this.#codigo,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            precio: this.#precio,
            stock: this.#stock,
            cantAlquilados: this.#cantAlquilados
        };
    }
    static desdeObjeto(obj) {
        return new Pelicula(obj.codigo, obj.nombre, obj.descripcion, obj.precio, obj.stock, obj.cantAlquilados);
    }
}
