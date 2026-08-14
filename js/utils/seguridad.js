export function escaparHTML(texto) {
    if (texto === null || texto === undefined) return "";
    const mapa = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    return String(texto).replace(/[&<>"']/g, (caracter) => mapa[caracter]);
    
}
export function limpiarTexto(texto, maximo = 300) {
    return String(texto ?? "").trim().slice(0, maximo);
}

export function esNumeroValido(valor) {
    const numero = Number(valor);
    return !Number.isNaN(numero) && Number.isFinite(numero) && numero >= 0;
}