import * as eliminarDelDom from './eliminarDelDom.js';
import * as buscarDatos from './buscarDatos.js';

// "COLOR" -> "Color". Solo estético, para que la etiqueta al lado del
// select no quede toda en mayúsculas.
function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export function AgregaVariantes(datos, template2) {

    // IMPORTANTE: template2 es el contenido del <template> COMPARTIDO por
    // TODAS las tarjetas del catálogo (en logica.js se lo pisa con los
    // datos de cada producto, uno por uno, y recién DESPUÉS de llamar a
    // esta función se clona para esa tarjeta puntual). Por eso, cualquier
    // elemento que esta función agregue y no borre explícitamente queda
    // pegado en el template y aparece en TODAS las tarjetas siguientes.
    //
    // Antes, la etiqueta del tipo de variante (".etiquetaVariante", ej:
    // "Color: ") y el select de tipo (".tTipoVariante") solo se borraban
    // dentro de la rama de "sistema nuevo" (variantesNuevas.length > 0).
    // Si el producto SIGUIENTE no tenía variantes nuevas (sistema viejo o
    // ninguna variante), esa rama nunca se ejecutaba, así que esos dos
    // elementos quedaban del producto anterior y se colaban en las
    // tarjetas de productos que no debían mostrar variante ninguna. Por
    // eso el artículo 65 "contagiaba" su variante a las demás tarjetas.
    //
    // Solución: limpiamos SIEMPRE estos dos elementos al empezar, sin
    // importar qué rama se use después, para que cada tarjeta parta
    // realmente de cero.
    let selectElement5 = template2.querySelector('.tVariante');
    let selectElement4 = template2.querySelector('.tMedida');
    let etiquetaVarianteAnterior = template2.querySelector('.etiquetaVariante');
    let selectTipoAnterior = template2.querySelector('.tTipoVariante');
    if (etiquetaVarianteAnterior) eliminarDelDom.removeElements([etiquetaVarianteAnterior]);
    if (selectTipoAnterior) eliminarDelDom.removeElements([selectTipoAnterior]);
let i=0;

    // ------------------------------------------------------------------
    // SISTEMA NUEVO: arreglo "datos.variantes", con stock (y ahora
    // también precio) individual por opción. Si el producto lo trae, se
    // arma el selector a partir de ahí y las cadenas viejas
    // "VarianteP"/"VarianteS" dejan de usarse (aunque sigan presentes en
    // el JSON como remanente).
    //
    // Puede haber UN SOLO tipo de atributo (ej: todas las opciones son
    // "color") o VARIOS mezclados en el mismo arreglo (ej: "color" y
    // "medida", como en el artículo 260). En el primer caso alcanza un
    // solo select; en el segundo hacen falta DOS: uno para elegir el
    // TIPO (color/medida) y otro, debajo, que se repuebla con las
    // opciones puntuales (valor2) de ese tipo.
    // ------------------------------------------------------------------
    const variantesNuevas = Array.isArray(datos.variantes) ? datos.variantes : [];

    if (variantesNuevas.length > 0) {
        const grupos = buscarDatos.agruparVariantesPorTipo(datos.Artículo);
        const necesitaDosNiveles = grupos.length > 1;

        // Reconstruimos todo desde cero cada vez (etiqueta, select de
        // tipo, select de opción), para garantizar el orden correcto sin
        // importar qué hubiera quedado de un renderizado anterior.
        if (selectElement4) eliminarDelDom.removeElements([selectElement4]); // tMedida viejo, por si quedó de antes
        let etiquetaVariante = template2.querySelector('.etiquetaVariante');
        if (etiquetaVariante) eliminarDelDom.removeElements([etiquetaVariante]);
        let selectTipo = template2.querySelector('.tTipoVariante');
        if (selectTipo) eliminarDelDom.removeElements([selectTipo]);
        selectElement5 = template2.querySelector('.tVariante');
        if (selectElement5) eliminarDelDom.removeElements([selectElement5]);

        const contenedorVariantes = template2.querySelector('.variantes');

        if (necesitaDosNiveles) {
            // Select de primer nivel: el TIPO de atributo (ej: "Color" /
            // "Medida"). El de segundo nivel arranca con las opciones del
            // primer grupo; se repuebla al cambiar este de arriba (ver
            // actualizarCascadaDeVariantes, conectado después de insertar
            // la tarjeta real en el DOM: acá estamos mutando el <template>
            // compartido, todavía sin clonar, así que un addEventListener
            // acá se perdería al clonar).
            selectTipo = document.createElement('select');
            selectTipo.classList.add('tTipoVariante');
            selectTipo.setAttribute("id", "tipo" + (datos.Artículo));
            selectTipo.innerHTML = grupos
                .map(g => `<option value="${g.tipo}">${capitalizar(g.tipo)}</option>`)
                .join('');
            contenedorVariantes.appendChild(selectTipo);
        } else {
            // Un solo tipo: no hace falta el select de arriba, mostramos
            // "valor1" como etiqueta al lado del único select.
            const tipoVariante = grupos[0] ? grupos[0].tipo : '';
            if (tipoVariante) {
                etiquetaVariante = document.createElement('label');
                etiquetaVariante.classList.add('etiquetaVariante');
                etiquetaVariante.setAttribute('for', 'var' + (datos.Artículo));
                etiquetaVariante.textContent = capitalizar(tipoVariante) + ': ';
                contenedorVariantes.appendChild(etiquetaVariante);
            }
        }

        selectElement5 = document.createElement('select');
        selectElement5.classList.add('tVariante');
        selectElement5.setAttribute("id", "var" + (datos.Artículo));
        const opcionesIniciales = grupos[0] ? grupos[0].opciones : variantesNuevas;
        selectElement5.innerHTML = opcionesIniciales.map(v => {
            const sinStock = Number(v.stock) <= 0;
            return `<option value="${v.idVariante}" ${sinStock ? 'disabled' : ''}>${v.valor2}${sinStock ? ' (sin stock)' : ''}</option>`;
        }).join('');
        contenedorVariantes.appendChild(selectElement5);

        return;
    }

    // ------------------------------------------------------------------
    // SISTEMA VIEJO: strings "VarianteP" / "VarianteS" (se mantiene tal
    // cual para los productos que todavía no fueron migrados al arreglo).
    // ------------------------------------------------------------------
  //  const categoriasValidas = ["CABELLO", "PUNTERAS"];

    // Verificamos si la categoría NO está en la lista de categorías válidas

   // if (!categoriasValidas.includes(datos.Categoria) || datos.VarianteP=="1") {

    
    if (datos.VarianteP==""|| datos.VarianteP==null) {
     
    //if (!categoriasValidas.includes(datos.Categoria) || datos.VarianteP=="") {

        // Si existen los elementos, los eliminamos
        if (selectElement4) eliminarDelDom.removeElements([selectElement4]);
        if (selectElement5) eliminarDelDom.removeElements([selectElement5]);

    } else {
        // Si la categoría es válida, nos aseguramos de que los selects existan o los creamos.

        // Eliminar los existentes si es necesario (tu lógica original lo hacía aquí)
        // Considera si realmente necesitas eliminarlos y recrearlos siempre.
        // Si solo necesitas actualizar opciones, podrías solo limpiar el innerHTML.
        // Mantengo tu lógica original por ahora:
        if (selectElement4) eliminarDelDom.removeElements([selectElement4]);
        if (selectElement5) eliminarDelDom.removeElements([selectElement5]);

        // Volvemos a buscar por si fueron eliminados y necesitamos crearlos
        selectElement4 = template2.querySelector('.tMedida');
        selectElement5 = template2.querySelector('.tVariante');

        // Si no existen después de intentar eliminar, los creamos
        if (selectElement4 == null) {
            selectElement4 = document.createElement('select');
            selectElement4.classList.add('tMedida');
            selectElement4.setAttribute("id", "med" + (datos.Artículo));
            template2.querySelector('.variantes').appendChild(selectElement4);
        }

        if (selectElement5 == null) {
            selectElement5 = document.createElement('select');
            selectElement5.classList.add('tVariante');
            selectElement5.setAttribute("id", "var" + (datos.Artículo));
            template2.querySelector('.variantes').appendChild(selectElement5);
        }

        // --- Lógica para selectElement4 (tMedida) ---
        // Crear las nuevas opciones para tMedida (esto parece fijo en tu código)

      let nuevasOpciones = ''; // Inicializamos la cadena de opciones vacía

      // Verificamos que datos.VarianteP exista y sea un string no vacío

      if (typeof datos.VarianteP === 'string' && datos.VarianteP.trim().length > 0) {
          // Dividimos el string por la coma para obtener un array de opciones
          const opcionesArray = datos.VarianteP.split(',');

          // Iteramos sobre el array de opciones
          opcionesArray.forEach(opcion => {
              // Quitamos espacios en blanco al inicio y final de cada opción
              const opcionLimpia = opcion.trim();
              // Nos aseguramos de no agregar opciones vacías si hay comas seguidas (,,)
              
              if (opcionLimpia) {
                i++
                let opcionLimpia2= i;
                  // Creamos el string del <option> y lo añadimos a nuevasOpciones2
                  // Usamos la opción limpia como valor y como texto visible
                  nuevasOpciones += `<option value="${opcionLimpia2}">${opcionLimpia}</option>`;
              }
          });
      } else {
          // Opcional: ¿Qué hacer si datos.VarianteP está vacío o no existe?
          // Podrías poner una opción por defecto o dejarlo vacío.
          nuevasOpciones = '<option value="">--sin variantes--</option>';
         // console.warn(`datos.VarianteP está vacío o no definido para el artículo: ${datos.Artículo}`);
      }

      // Asignar las opciones generadas al select tVariante
      selectElement4.innerHTML = nuevasOpciones;
  i=0;
//----------------------------------------------------------------------------------------------------------------------------
        // --- Lógica para selectElement5 (tVariante) ---
        let nuevasOpciones2 = ''; // Inicializamos la cadena de opciones vacía

        // Verificamos que datos.VarianteS exista y sea un string no vacío

        if (typeof datos.VarianteS === 'string' && datos.VarianteS.trim().length > 0) {
            // Dividimos el string por la coma para obtener un array de opciones
            const opcionesArray = datos.VarianteS.split(',');

            // Iteramos sobre el array de opciones
            opcionesArray.forEach(opcion => {
                // Quitamos espacios en blanco al inicio y final de cada opción
                const opcionLimpia = opcion.trim();
                // Nos aseguramos de no agregar opciones vacías si hay comas seguidas (,,)
                
                if (opcionLimpia) {
                  i++
                  let opcionLimpia2= i;
                    // Creamos el string del <option> y lo añadimos a nuevasOpciones2
                    // Usamos la opción limpia como valor y como texto visible
                    nuevasOpciones2 += `<option value="${opcionLimpia2}">${opcionLimpia}</option>`;
                }
            });
        } else {
            // Opcional: ¿Qué hacer si datos.VarianteS está vacío o no existe?
            // Podrías poner una opción por defecto o dejarlo vacío.
            nuevasOpciones2 = '<option value="">--sin variantes--</option>';
           
           //SI NO HAY VARIANTES ELIMINAMOS EL SELECT
            if (selectElement5) eliminarDelDom.removeElements([selectElement5]);

           // console.warn(`datos.VarianteS está vacío o no definido para el artículo: ${datos.Artículo}`);
        }

        // Asignar las opciones generadas al select tVariante
        selectElement5.innerHTML = nuevasOpciones2;
    }
}


// --- Tu función cambiarVariantes (sin cambios respecto a la original) ---
export function cambiarVariantes() {
    const selects = document.querySelectorAll('select[id^=med]');

    selects.forEach(select => {
        select.addEventListener('change', event => {
            const id = event.target.id;

            // Corrección: Debería ser event.target.id, no event.target.Id
            if (!event.target) {
                console.error(`El elemento target del evento no existe.`);
                return;
            }
            let selectElement7 = document.getElementById(id); // Obtener el elemento select por su id
            if (!selectElement7) {
                 console.error(`El elemento select con ID "${id}" no existe en el DOM.`);
                 return;
            }

            var varied = selectElement7.value; // Obtener el valor seleccionado del elemento select

            var regex = /(\d+)/g;
            var idMatch = id.match(regex); // Es buena práctica chequear si match devolvió algo

            if (!idMatch) {
                console.error(`No se pudo extraer el número del ID "${id}"`);
                return;
            }
            var id2 = idMatch[0]; // match devuelve un array, usualmente queremos el primer elemento

            const selectElement77 = document.getElementById("var" + id2); // Obtener el elemento select por su id
            if (!selectElement77) {

               // console.error(`El elemento select variante con ID "var${id2}" no existe.`);
                return;
            }
        });
    });
}


// --- Sistema nuevo: refresca el "X disponibles" Y el precio de cada
// tarjeta según la opción elegida en su select de variante (segundo
// nivel) ---
// Antes ese texto era fijo (el "Inventario"/"Venta" general del
// producto). Ahora, para productos migrados al arreglo "variantes", cada
// opción puede tener su propio stock y su propio precio ("precioVenta").
// El DOLAR y el Descuento siguen siendo del producto en general (no son
// por variante), así que se les siguen aplicando igual. Se llama junto
// con cambiarVariantes() cada vez que se vuelve a pintar el catálogo
// (filtro de categoría, búsqueda, etc), ya que los <select> se recrean
// con el DOM.
export function actualizarStockPorVariante() {
    const selects = document.querySelectorAll('select.tVariante[id^=var]');

    selects.forEach(select => {
        const idMatch = select.id.match(/\d+/);
        if (!idMatch) return;
        const productId = idMatch[0];

        // Si el producto usa el sistema viejo (o no tiene variantes),
        // esto no aplica: su stock y precio ya se muestran fijos y
        // correctos.
        if (!buscarDatos.tieneVariantesPorArray(productId)) return;

        const cardBody = select.closest('.card-body');
        if (!cardBody) return;

        const elementoStock = cardBody.querySelector('.card-text');
        const inputCantidad = cardBody.querySelector('.cantidad');
        const elementoPrecioTachado = cardBody.querySelector('small');
        const elementoPrecioFinal = cardBody.querySelector('h7');
        const elementoPrecioSinImp = cardBody.querySelector('h11');

        const formatear = valor => new Intl.NumberFormat('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(valor);

        const refrescar = () => {
            const stockVariante = buscarDatos.buscarStockVariante(productId, select.value);
            const stockSeguro = stockVariante !== undefined ? stockVariante : 0;
            if (elementoStock) elementoStock.textContent = stockSeguro + " disponibles";
            if (inputCantidad) inputCantidad.max = stockSeguro;

            const datosProducto = buscarDatos.buscarDatosCompletos(productId);
            if (!datosProducto) return;

            // Si la variante elegida trae su propio "precioVenta", se usa
            // ese en vez del "Venta" general del producto.
            const precioVariante = buscarDatos.buscarPrecioVariante(productId, select.value);
            const precioBaseUnitario = precioVariante !== undefined
                ? Number(precioVariante)
                : Number(String(datosProducto.Venta).replace(/,/g, '.'));

            const precioConDolar = precioBaseUnitario * Number(datosProducto.DOLAR);

            if (datosProducto.Descuento != 0) {
                const precioConDescuento = precioConDolar * (1 - Number(String(datosProducto.Descuento).replace(/,/g, '.')));
                const precioSinImp = precioConDescuento / 1.21;
                if (elementoPrecioTachado) elementoPrecioTachado.innerHTML = `<del>$${formatear(precioConDolar)}</del>`;
                if (elementoPrecioFinal) elementoPrecioFinal.textContent = `$${formatear(precioConDescuento)}`;
                if (elementoPrecioSinImp) elementoPrecioSinImp.textContent = `Sin imp. nac.: $${formatear(precioSinImp)}`;
            } else {
                const precioSinImp = precioConDolar / 1.21;
                if (elementoPrecioTachado) elementoPrecioTachado.textContent = '';
                if (elementoPrecioFinal) elementoPrecioFinal.textContent = `$${formatear(precioConDolar)}`;
                if (elementoPrecioSinImp) elementoPrecioSinImp.textContent = `Sin imp. nac.: $${formatear(precioSinImp)}`;
            }
        };

        select.addEventListener('change', refrescar);
        refrescar(); // valor inicial, con la primera opción del select
    });
}


// --- Sistema nuevo con DOS niveles (ej: "color" y "medida" mezclados en
// el mismo arreglo "variantes"): repuebla el select de opciones (el de
// segundo nivel) cada vez que cambia el select de tipo (el de primer
// nivel), mostrando solo las opciones cuyo "valor1" coincide con el tipo
// elegido. Se llama junto con actualizarStockPorVariante() (y DESPUÉS de
// ella, para que su listener de "change" ya esté conectado al select de
// opciones antes de que este dispare el evento manualmente).
export function actualizarCascadaDeVariantes() {
    const selectsTipo = document.querySelectorAll('select.tTipoVariante[id^=tipo]');

    selectsTipo.forEach(selectTipo => {
        const idMatch = selectTipo.id.match(/\d+/);
        if (!idMatch) return;
        const productId = idMatch[0];

        const cardBody = selectTipo.closest('.card-body');
        if (!cardBody) return;

        const selectOpcion = cardBody.querySelector('select.tVariante[id^=var]');
        if (!selectOpcion) return;

        selectTipo.addEventListener('change', () => {
            const grupos = buscarDatos.agruparVariantesPorTipo(productId);
            const grupoElegido = grupos.find(g => g.tipo === selectTipo.value) || grupos[0];
            const opciones = grupoElegido ? grupoElegido.opciones : [];

            selectOpcion.innerHTML = opciones.map(v => {
                const sinStock = Number(v.stock) <= 0;
                return `<option value="${v.idVariante}" ${sinStock ? 'disabled' : ''}>${v.valor2}${sinStock ? ' (sin stock)' : ''}</option>`;
            }).join('');

            // El select de opción cambió de contenido "a mano" (no lo
            // tocó la persona), así que disparamos su propio evento
            // "change" para que se actualicen el stock y el precio
            // mostrados con la nueva opción que quedó elegida por
            // defecto.
            selectOpcion.dispatchEvent(new Event('change'));
        });
    });
}