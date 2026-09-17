//import { datos } from './jADatos.js'; SACAMOS ESTE Y PROBAMOS CON EL FETCH
import datos from './jADatos.js';




//buscamos el id y ponemos el titulo
export function buscarId(id) {
    const found = datos.find(elem => elem.Artículo == id);

    return found.Descripción;
};






//buscamos el id y ponemos el dolar
export function buscarIdDol(id) {
    const found = datos.find(elem => elem.Artículo == id);

    return found.DOLAR;
};





//buscamos el id y ponemos el precio
export function buscarIdPrecio(id) {
    const found = datos.find(elem => elem.Artículo == id);
    //buscamos el  valor del dolar en el array

    //reemplazamos las , por .
    var precioConPuntos = (found.Venta.replace(/,/g, "."));
    //((new Intl.NumberFormat('es-Mx').format(found.Venta.replace(/,/g, ".")*found.DOLAR)))

    return (precioConPuntos);
};





//buscamos el stock
export function buscarStock(id) {
    const found = datos.find(elem => elem.Artículo == id);
    // Antes, si no se encontraba el producto (por ejemplo los que tienen
    // variante/medida, cuyo id es compuesto y no existe tal cual en el
    // catálogo), esto rompía con un error "Cannot read properties of
    // undefined" que silenciosamente cortaba la ejecución de quien la
    // llamaba (por ejemplo, el botón "+" del carrito dejaba de responder).
    if (!found) return undefined;

    return found.Inventario;
};





//buscamos si tienen descuentos
//los numeros vienen con "," y hay q pasarlos a "." y multiplicar x100
export function buscarDescuento(id) {
    const found = datos.find(elem => elem.Artículo == id);
    let valor = ((found.Descuento.replace(/,/g, ".")) * 100)
    return valor
};




//devuelve el objeto completo del producto (todos sus campos), para
//pantallas como el detalle de producto que necesitan mostrar todo junto
export function buscarDatosCompletos(id) {
    return datos.find(elem => elem.Artículo == id);
};




// ------------------------------------------------------------------
// SISTEMA NUEVO DE VARIANTES (arreglo "variantes", stock individual)
// ------------------------------------------------------------------
// Antes, todas las opciones de un producto con variante (ej: "rojo" y
// "azul") compartían un único stock (el "Inventario" del producto). El
// arreglo "variantes" reemplaza esto: cada opción es un objeto con su
// propio "stock". Estas funciones lo leen; el sistema viejo de strings
// "VarianteP"/"VarianteS" sigue funcionando igual que siempre para los
// productos que todavía no fueron migrados.

//devuelve el arreglo "variantes" del producto, o vacío si no tiene
export function buscarVariantes(id) {
    const found = datos.find(elem => elem.Artículo == id);
    if (!found || !Array.isArray(found.variantes)) return [];
    return found.variantes;
};

//indica si el producto usa el sistema NUEVO (arreglo "variantes" con
//contenido) en vez del viejo sistema de strings
export function tieneVariantesPorArray(id) {
    return buscarVariantes(id).length > 0;
};

//busca el stock individual de una opción puntual dentro del arreglo,
//por su idVariante
export function buscarStockVariante(id, idVariante) {
    const variante = buscarVariantes(id).find(v => v.idVariante == idVariante);
    return variante ? Number(variante.stock) : undefined;
};

//busca el texto (valor2, ej: "rojo") de una opción puntual
export function buscarTextoVariante(id, idVariante) {
    const variante = buscarVariantes(id).find(v => v.idVariante == idVariante);
    return variante ? variante.valor2 : "";
};

//busca el valor1 (el TIPO de atributo, ej: "medida", "color") de una
//opción puntual. Antes solo se usaba valor1 para armar la etiqueta/select
//que se ve en la tarjeta, pero nunca viajaba hasta la descripción que se
//guarda en el carrito, por eso el carrito mostraba solo "3" en vez de
//"Medida 3".
export function buscarValor1Variante(id, idVariante) {
    const variante = buscarVariantes(id).find(v => v.idVariante == idVariante);
    return variante ? variante.valor1 : "";
};

// El idVariante es un autoincremental GLOBAL compartido entre TODOS los
// productos (ej: el primer artículo puede tener idVariante 8, otro 15,
// etc), así que no sirve para nombrar los archivos de fotos por variante.
// Lo que sí es estable es la POSICIÓN de esa variante dentro de SU
// PROPIO producto: la de menor idVariante es la "1", la siguiente la
// "2", etc. Esta función traduce idVariante -> posición, para usar en
// nombres de archivo como "65-1.jpg", "65-2.jpg" (ver detalleProducto.js).
export function buscarPosicionVariante(id, idVariante) {
    const variantesOrdenadas = [...buscarVariantes(id)].sort((a, b) => Number(a.idVariante) - Number(b.idVariante));
    const indice = variantesOrdenadas.findIndex(v => String(v.idVariante) === String(idVariante));
    return indice === -1 ? undefined : indice + 1;
};

// Agrupa el arreglo "variantes" de un producto por su "valor1" (el tipo
// de atributo: "color", "medida"...), preservando el orden de aparición.
// Devuelve algo como:
//   [{ tipo: "color", opciones: [...] }, { tipo: "medida", opciones: [...] }]
// Esto es lo que permite armar DOS selectores en cascada cuando un
// producto mezcla varios tipos de atributo en el mismo arreglo (ej: el
// artículo 260, con "color" Y "medida").
export function agruparVariantesPorTipo(id) {
    const variantes = buscarVariantes(id);
    const grupos = [];
    const indicePorTipo = new Map();

    variantes.forEach(v => {
        const tipo = v.valor1 || '';
        if (!indicePorTipo.has(tipo)) {
            indicePorTipo.set(tipo, grupos.length);
            grupos.push({ tipo, opciones: [] });
        }
        grupos[indicePorTipo.get(tipo)].opciones.push(v);
    });

    return grupos;
};

// Precio propio de una variante puntual (campo "precioVenta"), si lo
// trae. El DOLAR y el Descuento del producto se le siguen aplicando
// igual (son del producto en general, no de cada variante); eso se
// hace en donde se usa este precio, no acá.
export function buscarPrecioVariante(id, idVariante) {
    const variante = buscarVariantes(id).find(v => v.idVariante == idVariante);
    if (!variante || variante.precioVenta === undefined || variante.precioVenta === null || variante.precioVenta === '') {
        return undefined;
    }
    return String(variante.precioVenta).replace(/,/g, '.');
};
