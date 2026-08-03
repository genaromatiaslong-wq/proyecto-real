let funcionarios = [];
let peliculas = [];
let alquileres = [];

//#region Metodos de Alquileres
function CargoDatosAlquileres(){
    const LaMemoria = new Memoria();
    alquileres = LaMemoria.leer('alquileres');
    peliculas = LaMemoria.leer('peliculas');
    funcionarios = LaMemoria.leer('funcionarios');
    
    if(!alquileres){
        alquileres = [];
    }
    InicializarAlquiler();
    CargarFuncionario();
    CargarPelicula();
    ListarAlquileres();
}

function CargarFuncionario(){
    let lista = document.getElementById('codigo-funcionario').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione un funcionario", "");
    lista.add(elementoBase);

    for (let objFuncionario of funcionarios) {
        let elemento = new Option(objFuncionario.nombre, objFuncionario.codigo);
        lista.add(elemento);
    }
}

function CargarPelicula(){
    let lista = document.getElementById('codigo-pelicula').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione una pelicula", "");
    lista.add(elementoBase);

    for (let objPelicula of peliculas) {
        let elemento = new Option(objPelicula.nombre, objPelicula.codigo);
        lista.add(elemento);
    }
}

function CargarPrecioPelicula(){
    document.getElementById('precio-pelicula').value = "";

    let codigoPelicula = document.getElementById('codigo-pelicula').value;
    for (let objPelicula of peliculas) {
        if(objPelicula.codigo == codigoPelicula){
            document.getElementById('precio-pelicula').value = objPelicula.precio;
        }
    }
}

function ActualizarStock(pCodigoPelicula, pCantidad){
    for (const unaPelicula of peliculas) {
        if(unaPelicula.codigo == pCodigoPelicula){
            unaPelicula.stock = unaPelicula.stock - pCantidad;
        }
    }
}

function DevolverStock(pCodigoPelicula, pCantidad){
    for (const unaPelicula of peliculas) {
        if(unaPelicula.codigo == pCodigoPelicula){
            unaPelicula.stock = unaPelicula.stock + pCantidad;
        }
    }
}

function DevolverCantidadAlquilados(pCodigoPelicula, pCantidad){
    for (const unaPelicula of peliculas) {
        if(unaPelicula.codigo == pCodigoPelicula){
            unaPelicula.cantAlquilados =
                unaPelicula.cantAlquilados - pCantidad;
        }
    }
}

function DevolverCantidadAlquiler(pCodigoFuncionario){
    for (const unFuncionario of funcionarios) {
        if(unFuncionario.codigo == pCodigoFuncionario){
            unFuncionario.cantAlquileres -= 1;
        }
    }
}
function ActualizarCantidadAlquilados(pCodigoPelicula, pCantidad){

    for(const unaPelicula of peliculas){

        if(unaPelicula.codigo == pCodigoPelicula){
            unaPelicula.cantAlquilados += pCantidad;
        }
    }
}

function CalculoTotal(){
    let precio = document.getElementById('precio-pelicula').value;
    let cantidad = document.getElementById('cantidad').value;
    let total = 0;
    if(cantidad > 0){
        total = precio * cantidad;
        document.getElementById('total').value = total;
    }
}

function ListarAlquileres(){
    let lista = document.getElementById('lista-alquileres').options;
    lista.length = 0;

    for (let objAlquiler of alquileres) {
        let texto = 'Codigo: ' + objAlquiler.codigo +' : Fecha: ' + objAlquiler.fecha +
        ' - Pelicula: ' + objAlquiler.pelicula.nombre + ' - Total: ' + objAlquiler.total;
        let elemento = new Option(texto, objAlquiler.codigo);
        lista.add(elemento);
    }
}
function InicializarAlquiler(){

    let hoy = new Date();
    console.log("HOY", hoy);
    
    let anio = hoy.getFullYear();
    let mes = ""+(hoy.getMonth()+1);
    mes = (mes.length == 1)?"0"+mes:mes;
    let dia = ""+hoy.getDate();
    dia = (dia.length == 1)?"0"+dia:dia;

    let fecha = anio + "-" + mes + "-" + dia;
    console.log("FECHA", fecha);
    
    document.getElementById("codigo").value = "";
    document.getElementById("fecha").value = fecha;
    document.getElementById("codigo-funcionario").value = "";
    document.getElementById("codigo-pelicula").value = "";
    document.getElementById("precio-pelicula").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("total").value = "";
    document.getElementById("codigo").focus();
}

function ActualizarCantidadAlquileres(pCodigoFuncionario){

    for(const unFuncionario of funcionarios){
        if(unFuncionario.codigo == pCodigoFuncionario){
            unFuncionario.cantAlquileres += 1;
            
        }
    }
}

function AgregarAlquiler(){
    let codigo = document.getElementById("codigo").value;
    let fecha = document.getElementById("fecha").value;
    let codigoFuncionario = document.getElementById("codigo-funcionario").value;
    let codigoPelicula = document.getElementById("codigo-pelicula").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = parseInt(document.getElementById("total").value);

    if(codigo == "" || fecha == "" || codigoFuncionario == "" || codigoPelicula == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(cantidad) || isNaN(total)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unaPelicula = BuscarPelicula(codigoPelicula);
    let unFuncionario = BuscarFuncionario(codigoFuncionario);
    let unAlquiler = new Alquiler(codigo, fecha, unaPelicula, unFuncionario, cantidad, total);
    alquileres.push(unAlquiler);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('alquileres', alquileres);

    
    ActualizarStock(codigoPelicula, cantidad);
    ActualizarCantidadAlquilados(codigoPelicula, cantidad);
    LaMemoria.escribir('peliculas', peliculas);

    ActualizarCantidadAlquileres(codigoFuncionario);
    LaMemoria.escribir('funcionarios', funcionarios);

    InicializarAlquiler();
    ListarAlquileres();

}

function SeleccionarAlquiler(){
    let codigoSeleccionado = document.getElementById('lista-alquileres').value;
    
    for (let objAlquiler of alquileres) {
        if(objAlquiler.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objAlquiler.codigo;
            document.getElementById("fecha").value = objAlquiler.fecha;
            document.getElementById("codigo-funcionario").value = objAlquiler.funcionario.codigo;
            document.getElementById("codigo-pelicula").value = objAlquiler.pelicula.codigo;
            CargarPrecioPelicula();
            document.getElementById("cantidad").value = objAlquiler.cantidad;
            document.getElementById("total").value = objAlquiler.total;
        }
    }
}

function ModificarAlquiler(){
    let codigoSeleccionado = document.getElementById("lista-alquileres").value;
    let fecha = document.getElementById("fecha").value;
    let codigoFuncionario = document.getElementById("codigo-funcionario").value;
    let codigoPelicula = document.getElementById("codigo-pelicula").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = parseInt(document.getElementById("total").value);

    if(codigo == "" || fecha == "" || codigoFuncionario == "" || codigoPelicula == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(cantidad) || isNaN(total)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unaPelicula = BuscarPelicula(codigoPelicula);
    let unFuncionario = BuscarFuncionario(codigoFuncionario);


    let unAlquiler = BuscarAlquiler(codigoSeleccionado);

    unAlquiler.fecha = fecha;
    unAlquiler.funcionario = unFuncionario;
    unAlquiler.pelicula = unaPelicula;
    unAlquiler.cantidad = cantidad;
    unAlquiler.total = total;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('alquileres', alquileres);
    alert("Alquiler modificado correctamente.")
    
    InicializarAlquiler();
    ListarAlquileres();
}

function BuscarAlquiler(pCodigo){
    for (let objAlquiler of alquileres) {
        if(objAlquiler.codigo == pCodigo){
            return objAlquiler;
        }
    }
    return null;
}


function EliminarAlquiler(){
    let codigoSeleccionado = document.getElementById("lista-alquileres").value;
    let posicionAlquiler = -1;

    if(codigoSeleccionado == ""){
        alert("Debe seleccionar un alquiler!");
        return;
    }

    let unAlquiler = BuscarAlquiler(codigoSeleccionado);

    for (let pos = 0; pos < alquileres.length; pos++) {
        if(alquileres[pos].codigo == codigoSeleccionado){
            posicionAlquiler = pos;
        }
    }
    if(posicionAlquiler != -1){
        alquileres.splice(posicionAlquiler, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('alquileres', alquileres);

    
    DevolverStock(unAlquiler.pelicula.codigo, unAlquiler.cantidad);
    DevolverCantidadAlquilados(unAlquiler.pelicula.codigo, unAlquiler.cantidad);
    LaMemoria.escribir('peliculas', peliculas);
    alert("Alquiler eliminado correctamente")

    DevolverCantidadAlquiler(unAlquiler.funcionario.codigo);
    LaMemoria.escribir('alquileres', alquileres);

    InicializarAlquiler();
    ListarAlquileres();
}
//#endregion

//#region Metodos de Peliculas

function CargoDatosPeliculas(){
    const LaMemoria = new Memoria();
    peliculas = LaMemoria.leer('peliculas');
    
    if(!peliculas){
        peliculas = [];
    }
    InicializarPeliculas();
    ListarPeliculas();
}

function ListarPeliculas(){
    let lista = document.getElementById('lista-peliculas').options;
    lista.length = 0;

    for (let objPelicula of peliculas) {
        let texto = 'Codigo: ' + objPelicula.codigo + ' : Nombre: ' + objPelicula.nombre 
        + ' - Precio: ' + objPelicula.precio + ' - Stock: ' + objPelicula.stock;
        let elemento = new Option(texto, objPelicula.codigo);
        lista.add(elemento);
    }
}

function InicializarPeliculas(){
    
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("codigo").focus();
}

function AgregarPelicula(){
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    if(codigo == "" || nombre == "" || descripcion == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(precio) || isNaN(stock)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unaPelicula = new Pelicula(codigo, nombre, descripcion, precio, stock);
    peliculas.push(unaPelicula);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('peliculas', peliculas);
    alert("Pelicula agregada correctamente.")

    InicializarPeliculas();
    ListarPeliculas();

}

function SeleccionarPelicula(){
    let codigoSeleccionado = document.getElementById('lista-peliculas').value;
    
    for (let objPelicula of peliculas) {
        if(objPelicula.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objPelicula.codigo;
            document.getElementById("nombre").value = objPelicula.nombre;
            document.getElementById("descripcion").value = objPelicula.descripcion;
            document.getElementById("precio").value = objPelicula.precio;
            document.getElementById("stock").value = objPelicula.stock;
        }
    }
}

function ModificarPeliculas(){
    let codigoSeleccionado = document.getElementById("lista-peliculas").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    if(codigoSeleccionado == "" || nombre == "" || descripcion == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(precio) || isNaN(stock)){
        alert("Los valores ingresados no son correctos!");
        return;
    }
    let unaPelicula = BuscarPelicula(codigoSeleccionado);

    unaPelicula.nombre = nombre;
    unaPelicula.descripcion = descripcion;
    unaPelicula.precio = precio;
    unaPelicula.stock = stock;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('peliculas', peliculas);
    alert("Pelicula modificada correctamente.")
    
    InicializarPeliculas();
    ListarPeliculas();
}

function BuscarPelicula(pCodigo){
    for (let objPelicula of peliculas) {
        if(objPelicula.codigo == pCodigo){
            return objPelicula;
        }
    }
    return null;
}

function EliminarPelicula(){
    let codigoSeleccionado = document.getElementById("lista-peliculas").value;
    let posicionPeliculas = -1;

    if(codigoSeleccionado == ""){
        alert("Debe seleccionar una pelicula!");
        return;
    }

    for (let pos = 0; pos < peliculas.length; pos++) {
        if(peliculas[pos].codigo == codigoSeleccionado){
            posicionPeliculas = pos;
        }
    }
    if(posicionPeliculas != -1){
        peliculas.splice(posicionPeliculas, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('peliculas', peliculas);
    alert("Pelicula eliminada correctamente.")

    InicializarPeliculas();
    ListarPeliculas();
}

//#endregion

//#region Metodos de Funcionarios

function CargoDatosFuncionarios(){
    const LaMemoria = new Memoria();
    funcionarios = LaMemoria.leer('funcionarios');
    
    if(!funcionarios){
        funcionarios = [];
    }
    InicializarFuncionario();
    ListarFuncionarios();
}

function AgregarFuncionarios(){
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    if(cedula == "" || nombre == "" || codigo == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }

    let unFuncionario = new Funcionarios(codigo, nombre, cedula);
    funcionarios.push(unFuncionario);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('funcionarios', funcionarios);
    alert("Funcionario agregado correctamente.")

    InicializarFuncionario();
    ListarFuncionarios();

}

function SeleccionarFuncionarios(){
    let codigoSeleccionado = document.getElementById('lista-funcionarios').value;
    
    for (let objFuncionario of funcionarios) {
        if(objFuncionario.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objFuncionario.codigo;
            document.getElementById("nombre").value = objFuncionario.nombre;
            document.getElementById("cedula").value = objFuncionario.cedula;
        }
    }
}

function ListarFuncionarios(){
    let lista = document.getElementById('lista-funcionarios').options;
    lista.length = 0;

    for (let objFuncionario of funcionarios) {
        let texto = 'Codigo: ' + objFuncionario.codigo + ' : Nombre: ' + objFuncionario.nombre 
        + ' - Cedula: ' + objFuncionario.cedula;
        let elemento = new Option(texto, objFuncionario.codigo);
        lista.add(elemento);
    }
}
function InicializarFuncionario(){
    
    document.getElementById("codigo").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("codigo").focus();
}

function ModificarFuncionario(){
    let codigoSeleccionado = document.getElementById("lista-funcionarios").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    if(codigoSeleccionado == "" || nombre == "" || cedula == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    let unFuncionario = BuscarFuncionario(codigoSeleccionado);

    unFuncionario.nombre = nombre;
    unFuncionario.cedula = cedula;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('funcionarios', funcionarios);
    alert("Funcionario modificado correctamente.")
    
    InicializarFuncionario();
    ListarFuncionarios();
}

function BuscarFuncionario(pCodigo){
    for (let objFuncionario of funcionarios) {
        if(objFuncionario.codigo == pCodigo){
            return objFuncionario;
        }
    }
    return null;
}

function EliminarFuncionario(){
    let codigoSeleccionado = document.getElementById("lista-funcionarios").value;
    let posicionFuncionario = -1;

    if(codigoSeleccionado == ""){
        alert("Debe seleccionar un Vendedor!");
        return;
    }

    for (let pos = 0; pos < funcionarios.length; pos++) {
        if(funcionarios[pos].codigo == codigoSeleccionado){
            posicionFuncionario = pos;
        }
    }
    if(posicionFuncionario != -1){
        funcionarios.splice(posicionFuncionario, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('funcionarios', funcionarios);
    alert("Funcionario eliminado correctamente.")

    InicializarFuncionario();
    ListarFuncionarios();
}

//#endregion

//#region Metodos de Estadísticas

function CargoDatosEstadisticas(){
    const LaMemoria = new Memoria();
    alquileres = LaMemoria.leer('alquileres');
    peliculas = LaMemoria.leer('peliculas');
    funcionarios = LaMemoria.leer('funcionarios');
    
    TotalRecaudado();
    PeliculaMasAlquilada();
    MejorFuncionario();
    PeliculasConStock();
}

function TotalRecaudado(){
    let total = 0;
    for (const unAlquiler of alquileres) {
        total = total + unAlquiler.total;
    }
    document.getElementById('totalRecaudado').value = total;
}

function PeliculasConStock(){
    let lista = document.getElementById('peliculas-con-stock').options;
    lista.length = 0;

    for (const objPelicula of peliculas) {
        if(objPelicula.stock > 0){
            let texto = 'Codigo: ' + objPelicula.codigo + ' : Nombre: ' + objPelicula.nombre 
            + ' - Precio: ' + objPelicula.precio + ' - Stock: ' + objPelicula.stock;
            let elemento = new Option(texto, objPelicula.codigo);
            lista.add(elemento);
        }
    }
}

function PeliculaMasAlquilada(){
    let mayor = 0;
    let objMayor;
    for (const unaPelicula of peliculas) {
        if(unaPelicula.cantAlquilados > mayor){
            mayor = unaPelicula.cantAlquilados;
            objMayor = unaPelicula;
        }
    }
    document.getElementById('masAlquilada').value = objMayor.nombre 
    + " con " + objMayor.cantAlquilados + " unidades";
}

function MejorFuncionario(){
    console.log(funcionarios);
    let mayor = 0;
    let objMayor;

    for (const unFuncionario of funcionarios)  {   
       if(unFuncionario.cantAlquileres > mayor){
            mayor = unFuncionario.cantAlquileres;
            objMayor = unFuncionario;
        }
    }
    document.getElementById('mejorFuncionario').value = objMayor.nombre 
    + " con " + objMayor.cantAlquileres + " alquilados";
}
//#endregion