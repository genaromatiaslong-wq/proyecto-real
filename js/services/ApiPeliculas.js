const URL_BASE = "https://api.tvmaze.com/search/shows";

export async function buscarInfoPelicula(nombre) {
    if (!nombre || !nombre.trim()) {
        throw new Error("Debe indicar un nombre para buscar.");
    }

    const url = `${URL_BASE}?q=${encodeURIComponent(nombre.trim())}`;

    const controlador = new AbortController();
    const timeoutId = setTimeout(() => controlador.abort(), 8000);

    try {
        const respuesta = await fetch(url, { signal: controlador.signal });

        if (!respuesta.ok) {
            throw new Error(`La API respondió con estado ${respuesta.status}`);
        }

        const resultados = await respuesta.json();

        if (!Array.isArray(resultados) || resultados.length === 0) {
            return null;
        }
        const mejorResultado = resultados[0].show;

        const descripcionSinHTML = (mejorResultado.summary || "")
            .replace(/<[^>]*>/g, "")
            .trim();

        return {
            nombre: mejorResultado.name,
            descripcion: descripcionSinHTML || "Sin descripción disponible.",
            imagen: mejorResultado.image ? mejorResultado.image.medium : null
        };
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("La búsqueda tardó demasiado y fue cancelada. Intente nuevamente.");
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}