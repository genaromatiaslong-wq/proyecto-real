# Cinecito — Sistema de gestión de Videoclub

Proyecto de la materia Analista Programador. Permite administrar el
catálogo de películas, los funcionarios y los alquileres de un
videoclub, además de ver estadísticas generales del negocio.

Realizado por: [Eugenia Larrama y Genaro Long]

## Funcionalidades

- ABM de Películas: alta, baja, modificación y listado. Incluye un
  botón para autocompletar la descripción buscando el título en una
  API pública.
- ABM de Funcionarios: alta, baja, modificación y listado.
- Alquileres: registrar un alquiler (descuenta stock automáticamente),
  eliminarlo (devuelve el stock) y listarlos.
- Estadísticas: total recaudado, película más alquilada, mejor
  funcionario y listado de películas con stock disponible.

Todos los datos se guardan en el localStorage del navegador.

## Cómo ejecutar el proyecto

Como el proyecto usa módulos ES6 (import/export), no se puede abrir
el .html directo con doble clic. Hay que servirlo con un servidor
local, por ejemplo con la extensión "Live Server" de VS Code:
clic derecho sobre principal.html → "Open with Live Server".

## Estructura del proyecto

- js/models/ → Clases de datos (Pelicula, Funcionario, Alquiler)
- js/services/ → Memoria (localStorage), ApiPeliculas (fetch a
  TVMaze), VideoclubService (lógica de negocio)
- js/controllers/ → Un controlador por pantalla
- js/utils/ → Funciones de seguridad (sanitización, validaciones)
- css/ → Estilos
- imagenes/ → Pósters de la cartelera

## Tecnologías utilizadas

- Clases JavaScript con campos privados
- Módulos ES6 (import/export)
- Bootstrap 5
- LocalStorage
- Fetch + async/await (API pública TVMaze)
- Delegación de eventos
- Accesibilidad (aria-label, aria-live, :focus-visible)
- Seguridad básica (escape de HTML, Content-Security-Policy)
- Responsive Design