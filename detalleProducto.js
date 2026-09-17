// detalleProducto.js
// Muestra el detalle de un producto (carrusel de imágenes + descripción +
// precio + stock + variantes + cantidad) en un modal de Bootstrap al hacer
// click en su imagen del catálogo. El carrusel arma sus fotos combinando
// la imagen base del producto (la misma de la tarjeta) con las numeradas
// (273.jpg, 273-1.jpg, 273-2.jpg...). Es una capa de "ver más" por encima
// de la tienda: se cierra con la X (o clickeando afuera) volviendo
// exactamente a donde estaba la persona, ya que es un modal superpuesto y
// no una página nueva, así que el carrito y el scroll quedan intactos.

import * as buscarDatos from './buscarDatos.js';
import { agregarProductoAlCarrito } from './logica.js';

// "COLOR" -> "Color". Solo estético, para que la etiqueta arriba del
// select no quede toda en mayúsculas.
function capitalizar(texto) {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Máximo de imágenes NUMERADAS adicionales que se intenta cargar por
// producto, además de la foto base. Esquema completo para el artículo 273:
//   imgcarrito/273.jpg     (la principal, la misma que usa la tarjeta)
//   imgcarrito/273-1.jpg
//   imgcarrito/273-2.jpg
//   ...y así, hasta MAX_IMAGENES_A_PROBAR.
// En cuanto falta un número de la secuencia, se deja de buscar (se asume
// que están numeradas sin saltos).
const MAX_IMAGENES_A_PROBAR = 6;

let modalInstancia = null;
let carruselInstancia = null;
// Referencia al listener de "slide.bs.carousel" actualmente activo, para
// poder quitarlo antes de agregar uno nuevo cuando se abre otro producto
// (si no, se van acumulando listeners viejos con datos del producto
// anterior cada vez que se abre el modal).
let listenerSlideActivo = null;

// Chequea si una imagen realmente existe (carga bien) antes de agregarla
// al carrusel, para no mostrar recuadros rotos.
function existeImagen(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function obtenerImagenesDelProducto(idArticulo) {
  const imagenes = [];

  // Primero la foto base (la misma que se ve en la tarjeta del catálogo).
  const imagenBase = `./imgcarrito/${idArticulo}.jpg`;
  if (await existeImagen(imagenBase)) {
    imagenes.push(imagenBase);
  }

  // Después las numeradas: 273-1.jpg, 273-2.jpg, etc.
  for (let i = 1; i <= MAX_IMAGENES_A_PROBAR; i++) {
    const candidata = `./imgcarrito/${idArticulo}-${i}.jpg`;
    if (await existeImagen(candidata)) {
      imagenes.push(candidata);
    } else {
      break;
    }
  }

  // Respaldo: si no cargó ni la base ni ninguna numerada, igual mostramos
  // la base como último intento (el onerror del <img> se encarga de poner
  // el cartel de "imagen no encontrada" en vez de dejar el carrusel vacío).
  if (imagenes.length === 0) {
    imagenes.push(imagenBase);
  }

  return imagenes;
}

// Limpia el carrusel al toque (sin esperar nada asíncrono) y muestra un
// spinner en su lugar. Se llama apenas se abre el modal, ANTES de
// consultar si existen las fotos del producto nuevo: esa comprobación es
// asíncrona, así que si no hiciéramos esto, se alcanzaba a ver un "flash"
// con las fotos del producto anterior durante ese instante.
function mostrarCarruselCargando() {
  const inner = document.getElementById('carruselDetalleInner');
  const controles = document.querySelectorAll('#carruselDetalleProducto .carousel-control-prev, #carruselDetalleProducto .carousel-control-next');

  inner.innerHTML = `
    <div class="carousel-item active">
      <div class="modal-carrusel-img d-flex align-items-center justify-content-center">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
  `;

  controles.forEach(boton => boton.classList.add('d-none'));

  if (carruselInstancia) {
    carruselInstancia.dispose();
    carruselInstancia = null;
  }
}

function armarCarrusel(imagenes, datosProducto) {
  const carruselEl = document.getElementById('carruselDetalleProducto');
  const inner = document.getElementById('carruselDetalleInner');
  const controles = document.querySelectorAll('#carruselDetalleProducto .carousel-control-prev, #carruselDetalleProducto .carousel-control-next');
  const descripcion = datosProducto.Descripción;

  inner.innerHTML = imagenes.map((src, indice) => `
    <div class="carousel-item ${indice === 0 ? 'active' : ''}">
      <img src="${src}" class="d-block modal-carrusel-img" alt="${descripcion}"
        onerror="this.src='./imgcarrito/IMGND.jpg'">
    </div>
  `).join('');

  // Si hay una sola imagen, no tiene sentido mostrar flechas de navegación.
  controles.forEach(boton => {
    boton.classList.toggle('d-none', imagenes.length <= 1);
  });

  // Reiniciamos la instancia del carrusel de Bootstrap cada vez que se
  // abre el modal (así agarra las imágenes del producto nuevo desde el
  // principio, en vez de arrastrar el estado del producto anterior).
  if (carruselInstancia) {
    carruselInstancia.dispose();
    carruselInstancia = null;
  }

  // Avanza solo de forma automática si hay más de una imagen; con una
  // sola no hay nada para intercambiar.
  carruselInstancia = new bootstrap.Carousel(carruselEl, {
    interval: imagenes.length > 1 ? 4000 : false,
    ride: imagenes.length > 1 ? 'carousel' : false,
    wrap: true,
    touch: true,
  });

  // Aviso "SIN STOCK" sobre la foto de una variante sin stock: se
  // actualiza según la foto que esté REALMENTE mostrando el carrusel en
  // cada momento (no según lo que diga el select), así que aparece igual
  // si se llega a esa foto por el select, las flechas, o el avance
  // automático del carrusel (el "interval" de 4 segundos).
  const overlaySinStock = document.getElementById('modalDetalleSinStockOverlay');
  const variantesNuevas = Array.isArray(datosProducto.variantes) ? datosProducto.variantes : [];

  if (overlaySinStock) {
    if (listenerSlideActivo) {
      carruselEl.removeEventListener('slide.bs.carousel', listenerSlideActivo);
    }

    listenerSlideActivo = event => {
      actualizarOverlaySinStock(event.relatedTarget, variantesNuevas, overlaySinStock);
    };
    carruselEl.addEventListener('slide.bs.carousel', listenerSlideActivo);

    // Estado inicial: la primera foto, antes de que dispare ninguna
    // transición.
    actualizarOverlaySinStock(inner.querySelector('.carousel-item'), variantesNuevas, overlaySinStock);
  }
}

// Prende o apaga el aviso "SIN STOCK" según de qué variante es la foto
// que se está mostrando. Convención de nombres: "{idArticulo}-{N}.jpg"
// corresponde a la variante en la POSICIÓN N dentro de SU PROPIO
// producto (1 = la de menor idVariante, 2 = la siguiente...), NO a la
// variante cuyo idVariante == N. idVariante es un autoincremental
// GLOBAL entre todos los productos, así que hay que ordenar las
// variantes de este producto por idVariante y tomar la que está en el
// índice N-1 (mismo criterio que irAImagenDeVariante /
// buscarPosicionVariante). La foto base (sin "-N") no corresponde a
// ninguna variante puntual, así que nunca lleva aviso.
function actualizarOverlaySinStock(slideEl, variantesNuevas, overlaySinStock) {
  if (!slideEl) return;

  const img = slideEl.querySelector('img');
  const src = img ? img.getAttribute('src') : '';
  const coincidencia = src.match(/-(\d+)\.jpg$/);

  if (!coincidencia) {
    overlaySinStock.classList.add('d-none');
    return;
  }

  const posicion = Number(coincidencia[1]);
  const variantesOrdenadas = [...variantesNuevas].sort((a, b) => Number(a.idVariante) - Number(b.idVariante));
  const variante = variantesOrdenadas[posicion - 1];
  const sinStock = variante ? Number(variante.stock) <= 0 : false;
  overlaySinStock.classList.toggle('d-none', !sinStock);
}

// Salta el carrusel a la foto específica de una variante, si existe.
// Convención de nombres: la variante en la POSICIÓN N dentro de SU
// PROPIO producto (1 = la de menor idVariante, 2 = la siguiente, etc) usa
// la foto "{idArticulo}-{N}.jpg" (ej: primera variante del artículo 228
// -> 228-1.jpg, segunda -> 228-2.jpg). Esas fotos ya están cargadas como
// slides del carrusel (las arma obtenerImagenesDelProducto), así que acá
// solo hace falta encontrar cuál slide es y pasarle el índice a
// Bootstrap. Si esa variante no tiene una foto propia (no se llegó a
// subir todavía), no hacemos nada y se queda en la foto que estuviera
// mostrando.
//
// OJO: no se puede usar "idVariante" directo para el nombre del archivo.
// idVariante es un autoincremental GLOBAL compartido por TODOS los
// productos (ej: el primer idVariante de este artículo puede ser 8, no
// 1), así que hay que traducirlo primero a la posición relativa dentro
// de este producto (ver buscarPosicionVariante en buscarDatos.js).
function irAImagenDeVariante(idArticulo, idVariante) {
  if (!carruselInstancia) return;

  const posicion = buscarDatos.buscarPosicionVariante(idArticulo, idVariante);
  if (posicion === undefined) return;

  const rutaEsperada = `./imgcarrito/${idArticulo}-${posicion}.jpg`;
  const imagenesDelCarrusel = document.querySelectorAll('#carruselDetalleInner img');

  for (let indice = 0; indice < imagenesDelCarrusel.length; indice++) {
    if (imagenesDelCarrusel[indice].getAttribute('src') === rutaEsperada) {
      carruselInstancia.to(indice);
      return;
    }
  }
}

function calcularPrecioFinal(datos, precioVarianteOverride) {
  // Si la variante elegida tiene su propio precio ("precioVenta"), se
  // usa ese en vez del "Venta" general del producto. El DOLAR y el
  // Descuento siguen siendo del producto en general, así que se aplican
  // exactamente igual en ambos casos.
  const precioBaseUnitario = precioVarianteOverride !== undefined
    ? Number(precioVarianteOverride)
    : Number(String(datos.Venta).replace(/,/g, '.'));

  const precioBase = precioBaseUnitario * Number(datos.DOLAR);

  if (datos.Descuento != 0) {
    const precioConDescuento = precioBase * (1 - Number(String(datos.Descuento).replace(/,/g, '.')));
    return {
      original: precioBase,
      final: precioConDescuento,
      tieneDescuento: true,
    };
  }

  return {
    original: precioBase,
    final: precioBase,
    tieneDescuento: false,
  };
}

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

// Arma las opciones de un select a partir de un string separado por comas
// (ej: "7,9,11,13,15"), con el MISMO criterio que usa varianteDeMedidas.js
// para las tarjetas del catálogo: el value de cada <option> es un número
// de orden (1, 2, 3...), no el texto en sí. Así, si el producto se agrega
// desde el modal, el id compuesto que se guarda en el carrito es idéntico
// al que se generaría agregándolo desde la tarjeta.
function armarOpciones(stringOpciones) {
  if (typeof stringOpciones !== 'string' || stringOpciones.trim().length === 0) {
    return [];
  }

  return stringOpciones
    .split(',')
    .map(opcion => opcion.trim())
    .filter(opcion => opcion.length > 0)
    .map((texto, indice) => ({ value: String(indice + 1), texto }));
}

function armarSelectorVariantes(datosProducto) {
  const contenedor = document.getElementById('modalDetalleVariantesContenedor');
  contenedor.innerHTML = '';

  // Sistema nuevo: arreglo "variantes", con stock y precio individual
  // por opción. Puede tener UN SOLO tipo de atributo (ej: todo "color")
  // o VARIOS mezclados en el mismo arreglo (ej: "color" y "medida", como
  // el artículo 260). En el segundo caso hacen falta DOS selects: uno
  // para elegir el TIPO y otro, debajo, que se repuebla con las opciones
  // puntuales (valor2) de ese tipo. El value del select final
  // ("modalDetalleVariante") es siempre el idVariante (no un índice),
  // para que agregarDesdeModal() arme el mismo id de carrito que se
  // generaría agregando desde la tarjeta.
  const grupos = buscarDatos.agruparVariantesPorTipo(datosProducto.Artículo);

  if (grupos.length > 0) {
    const necesitaDosNiveles = grupos.length > 1;

    if (necesitaDosNiveles) {
      const selectTipo = document.createElement('select');
      selectTipo.id = 'modalDetalleTipoVariante';
      selectTipo.className = 'form-select mb-2';
      selectTipo.innerHTML = grupos
        .map(g => `<option value="${g.tipo}">${capitalizar(g.tipo)}</option>`)
        .join('');
      contenedor.appendChild(selectTipo);
    } else if (grupos[0].tipo) {
      // Un solo tipo: no hace falta el select de arriba, mostramos
      // "valor1" como etiqueta arriba del único select.
      const etiquetaVariante = document.createElement('label');
      etiquetaVariante.setAttribute('for', 'modalDetalleVariante');
      etiquetaVariante.className = 'form-label mb-1';
      etiquetaVariante.textContent = capitalizar(grupos[0].tipo) + ':';
      contenedor.appendChild(etiquetaVariante);
    }

    const selectVariante = document.createElement('select');
    selectVariante.id = 'modalDetalleVariante';
    selectVariante.className = 'form-select mb-2';
    selectVariante.innerHTML = grupos[0].opciones.map(v => {
      const sinStock = Number(v.stock) <= 0;
      return `<option value="${v.idVariante}" ${sinStock ? 'disabled' : ''}>${v.valor2}${sinStock ? ' (sin stock)' : ''}</option>`;
    }).join('');
    contenedor.appendChild(selectVariante);

    if (necesitaDosNiveles) {
      const selectTipo = document.getElementById('modalDetalleTipoVariante');
      selectTipo.addEventListener('change', () => {
        const grupoElegido = grupos.find(g => g.tipo === selectTipo.value) || grupos[0];
        selectVariante.innerHTML = grupoElegido.opciones.map(v => {
          const sinStock = Number(v.stock) <= 0;
          return `<option value="${v.idVariante}" ${sinStock ? 'disabled' : ''}>${v.valor2}${sinStock ? ' (sin stock)' : ''}</option>`;
        }).join('');

        // El select de opción cambió de contenido "a mano" (no lo tocó
        // la persona), así que disparamos su propio evento "change" para
        // que se actualicen stock, precio, foto y aviso de "sin stock"
        // con la nueva opción que quedó elegida por defecto.
        selectVariante.dispatchEvent(new Event('change'));
      });
    }

    return;
  }

  // Sistema viejo: strings "VarianteP" / "VarianteS".
  const opcionesMedida = armarOpciones(datosProducto.VarianteP);
  const opcionesVariante = armarOpciones(datosProducto.VarianteS);

  if (opcionesMedida.length > 0) {
    const selectMedida = document.createElement('select');
    selectMedida.id = 'modalDetalleMedida';
    selectMedida.className = 'form-select mb-2';
    selectMedida.innerHTML = opcionesMedida
      .map(op => `<option value="${op.value}">${op.texto}</option>`)
      .join('');
    contenedor.appendChild(selectMedida);
  }

  if (opcionesVariante.length > 0) {
    const selectVariante = document.createElement('select');
    selectVariante.id = 'modalDetalleVariante';
    selectVariante.className = 'form-select mb-2';
    selectVariante.innerHTML = opcionesVariante
      .map(op => `<option value="${op.value}">${op.texto}</option>`)
      .join('');
    contenedor.appendChild(selectVariante);
  }
}

async function llenarModal(idArticulo) {
  const datosProducto = buscarDatos.buscarDatosCompletos(idArticulo);
  if (!datosProducto) return;

  // Primero limpiamos el carrusel (ver comentario en mostrarCarruselCargando),
  // y recién después el resto de los datos y la búsqueda de fotos, que sí
  // puede tardar un instante.
  mostrarCarruselCargando();

  document.getElementById('modalDetalleTitulo').textContent = datosProducto.Descripción;
  document.getElementById('modalDetalleCategoria').textContent = datosProducto.Categoria || '';

  const elementoStock = document.getElementById('modalDetalleStock');
  const inputCantidad = document.getElementById('modalDetalleCantidad');
  const overlaySinStock = document.getElementById('modalDetalleSinStockOverlay');

  // Escondemos el aviso de "sin stock" de un producto anterior apenas se
  // abre el modal; se vuelve a evaluar más abajo según la variante que
  // quede seleccionada.
  if (overlaySinStock) overlaySinStock.classList.add('d-none');

  // Productos con el arreglo "variantes" (stock individual por opción):
  // el stock a mostrar depende de CUÁL opción está elegida, así que se
  // recalcula cada vez que cambia el select. Productos del sistema viejo
  // (o sin variante): el stock es único, el "Inventario" del producto.
  const variantesNuevas = Array.isArray(datosProducto.variantes) ? datosProducto.variantes : [];

  function actualizarStockMostrado() {
    let stockAMostrar = datosProducto.Inventario;

    if (variantesNuevas.length > 0) {
      const selectVarianteModal = document.getElementById('modalDetalleVariante');
      const idVarianteElegida = selectVarianteModal ? selectVarianteModal.value : null;
      const varianteElegida = variantesNuevas.find(v => String(v.idVariante) === String(idVarianteElegida));
      stockAMostrar = varianteElegida ? varianteElegida.stock : 0;

      // Aviso superpuesto a la foto cuando la variante elegida no tiene
      // stock (si el producto no usa el arreglo nuevo, esto no aplica).
      if (overlaySinStock) {
        overlaySinStock.classList.toggle('d-none', Number(stockAMostrar) > 0);
      }
    }

    elementoStock.textContent = `${stockAMostrar} disponibles`;
    inputCantidad.max = stockAMostrar;
    // Si había una cantidad cargada mayor al nuevo stock (ej: se tenía
    // puesto "5" y se cambia a una opción con solo 2), la bajamos para
    // no dejar habilitado un pedido imposible de cumplir.
    if (Number(inputCantidad.value) > Number(stockAMostrar)) {
      inputCantidad.value = Number(stockAMostrar) > 0 ? 1 : 0;
    }
  }

  // Salta a la foto propia de la variante elegida (ej: variante 1 del
  // artículo 228 -> 228-1.jpg), si existe entre las fotos ya cargadas en
  // el carrusel. Ver irAImagenDeVariante() para la convención de nombres.
  function actualizarImagenSegunVariante() {
    if (variantesNuevas.length === 0) return;
    const selectVarianteModal = document.getElementById('modalDetalleVariante');
    const idVarianteElegida = selectVarianteModal ? selectVarianteModal.value : null;
    if (idVarianteElegida == null || idVarianteElegida === '') return;
    irAImagenDeVariante(idArticulo, idVarianteElegida);
  }

  function alCambiarVariante() {
    actualizarStockMostrado();
    actualizarPrecioMostrado();
    actualizarImagenSegunVariante();
  }

  const elementoPrecio = document.getElementById('modalDetallePrecio');

  // Si la variante elegida tiene su propio precio ("precioVenta"), se
  // usa ese en vez del "Venta" general del producto (el DOLAR y el
  // Descuento siguen siendo del producto, se aplican igual en ambos
  // casos). Se recalcula cada vez que cambia la opción elegida.
  function actualizarPrecioMostrado() {
    let precioVarianteOverride;
    if (variantesNuevas.length > 0) {
      const selectVarianteModal = document.getElementById('modalDetalleVariante');
      const idVarianteElegida = selectVarianteModal ? selectVarianteModal.value : null;
      precioVarianteOverride = buscarDatos.buscarPrecioVariante(idArticulo, idVarianteElegida);
    }

    const precios = calcularPrecioFinal(datosProducto, precioVarianteOverride);
    if (precios.tieneDescuento) {
      elementoPrecio.innerHTML = `<del class="text-muted fs-6">$${formatearPrecio(precios.original)}</del> $${formatearPrecio(precios.final)}`;
    } else {
      elementoPrecio.textContent = `$${formatearPrecio(precios.final)}`;
    }
  }

  // Cantidad: se resetea a 1 cada vez que se abre el modal.
  inputCantidad.value = 1;

  // Variantes (medida / color / etc), si el producto tiene.
  armarSelectorVariantes(datosProducto);
  actualizarStockMostrado();
  actualizarPrecioMostrado();

  // Con el arreglo nuevo, recalculamos el stock, el precio y la foto
  // mostrada cada vez que se cambia la opción elegida en el select.
  const selectVarianteModal = document.getElementById('modalDetalleVariante');
  if (selectVarianteModal && variantesNuevas.length > 0) {
    selectVarianteModal.addEventListener('change', alCambiarVariante);
  }

  // Guardamos el id en el botón de agregar para usarlo al clickearlo.
  document.getElementById('modalDetalleAgregarBtn').dataset.articuloId = idArticulo;

  const imagenes = await obtenerImagenesDelProducto(idArticulo);
  armarCarrusel(imagenes, datosProducto);

  // Recién acá existen los <img> reales del carrusel, así que saltamos a
  // la foto de la variante que haya quedado seleccionada por defecto (la
  // primera opción del select).
  actualizarImagenSegunVariante();
}

export function abrirDetalleProducto(idArticulo) {
  const modalEl = document.getElementById('modalDetalleProducto');
  if (!modalEl) return;

  if (!modalInstancia) {
    modalInstancia = new bootstrap.Modal(modalEl);
  }

  llenarModal(idArticulo);
  modalInstancia.show();
}

// Toma lo elegido en el modal (cantidad y, si corresponde, variantes) y
// agrega el producto al carrito con la misma función que usa el botón
// "Agregar" de la tarjeta del catálogo (agregarProductoAlCarrito, en
// logica.js), para que se comporte exactamente igual sin duplicar lógica.
function agregarDesdeModal() {
  const botonAgregarModal = document.getElementById('modalDetalleAgregarBtn');
  const idArticulo = parseInt(botonAgregarModal.dataset.articuloId);

  const inputCantidad = document.getElementById('modalDetalleCantidad');
  const unidades = Number(inputCantidad.value) || 1;

  const selectMedida = document.getElementById('modalDetalleMedida');
  const selectVariante = document.getElementById('modalDetalleVariante');

  const medida = selectMedida ? selectMedida.value : null;
  const medidaTexto = selectMedida ? selectMedida.options[selectMedida.selectedIndex].textContent : '';

  const variante = selectVariante ? selectVariante.value : null;
  const varianteTexto = selectVariante ? selectVariante.options[selectVariante.selectedIndex].textContent : '';

  agregarProductoAlCarrito(idArticulo, {
    unidades,
    medida,
    medidaTexto,
    variante,
    varianteTexto,
  });

  // El modal se queda abierto a propósito, tanto si se pudo agregar como
  // si no: el cliente puede querer seguir agregando más unidades, probar
  // otra variante del mismo producto, o corregir la cantidad si faltó
  // stock (la alerta ya avisa el motivo en ese caso). Se cierra
  // manualmente con la X, "Cerrar", o clickeando afuera.
}

// Delegación de eventos: escucha clicks en cualquier imagen de producto
// del catálogo (funciona también con las tarjetas que se generan
// dinámicamente al filtrar por categoría, porque el listener está en
// el document y no en cada tarjeta).
export function inicializarClicksDetalle() {
  document.addEventListener('click', event => {
    const imagen = event.target.closest('.img-prod');
    if (!imagen || !imagen.id) return;

    const idArticulo = parseInt(imagen.id.replace('img', ''));
    if (Number.isNaN(idArticulo)) return;

    abrirDetalleProducto(idArticulo);
  });

  const botonAgregarModal = document.getElementById('modalDetalleAgregarBtn');
  if (botonAgregarModal) {
    botonAgregarModal.addEventListener('click', agregarDesdeModal);
  }

  // Pausamos el avance automático al cerrar el modal, para que no siga
  // corriendo de fondo mientras la persona sigue viendo el catálogo.
  const modalEl = document.getElementById('modalDetalleProducto');
  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', () => {
      if (carruselInstancia) carruselInstancia.pause();
    });
  }
}
