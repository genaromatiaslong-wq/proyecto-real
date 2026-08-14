export class Memoria {
    leer(clave) {
        try {
            const datos = localStorage.getItem(clave);
            return datos ? JSON.parse(datos) : null;
        } catch (error) {
            console.error(`No se pudo leer la clave "${clave}" de localStorage:`, error);
            return null;
        }
    }

        escribir(clave, dato) {
        try {
            localStorage.setItem(clave, JSON.stringify(dato));
            return true;
        } catch (error) {
            console.error(`No se pudo guardar la clave "${clave}" en localStorage:`, error);
            return false;
        }
    }
    eliminar(clave) {
        try {
            localStorage.removeItem(clave);
            return true;
        } catch (error) {
            console.error(`No se pudo eliminar la clave "${clave}" de localStorage:`, error);
            return false;
        }
    }
}

