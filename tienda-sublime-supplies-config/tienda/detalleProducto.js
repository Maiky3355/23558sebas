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

function armarCarrusel(imagenes, descripcion) {
  const carruselEl = document.getElementById('carruselDetalleProducto');
  const inner = document.getElementById('carruselDetalleInner');
  const controles = document.querySelectorAll('#carruselDetalleProducto .carousel-control-prev, #carruselDetalleProducto .carousel-control-next');

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
}

function calcularPrecioFinal(datos) {
  const precioBase = Number(datos.Venta.replace(/,/g, '.')) * Number(datos.DOLAR);

  if (datos.Descuento != 0) {
    const precioConDescuento = precioBase * (1 - Number(datos.Descuento.replace(/,/g, '.')));
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

  const stock = datosProducto.Inventario;
  document.getElementById('modalDetalleStock').textContent = `${stock} disponibles`;

  const precios = calcularPrecioFinal(datosProducto);
  const elementoPrecio = document.getElementById('modalDetallePrecio');
  if (precios.tieneDescuento) {
    elementoPrecio.innerHTML = `<del class="text-muted fs-6">$${formatearPrecio(precios.original)}</del> $${formatearPrecio(precios.final)}`;
  } else {
    elementoPrecio.textContent = `$${formatearPrecio(precios.final)}`;
  }

  // Cantidad: se resetea a 1 cada vez que se abre el modal, con el tope
  // en el stock disponible (igual que en la tarjeta del catálogo).
  const inputCantidad = document.getElementById('modalDetalleCantidad');
  inputCantidad.value = 1;
  inputCantidad.max = stock;

  // Variantes (medida / color / etc), si el producto tiene.
  armarSelectorVariantes(datosProducto);

  // Guardamos el id en el botón de agregar para usarlo al clickearlo.
  document.getElementById('modalDetalleAgregarBtn').dataset.articuloId = idArticulo;

  const imagenes = await obtenerImagenesDelProducto(idArticulo);
  armarCarrusel(imagenes, datosProducto.Descripción);
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

  const agregado = agregarProductoAlCarrito(idArticulo, {
    unidades,
    medida,
    medidaTexto,
    variante,
    varianteTexto,
  });

  // Si no había stock suficiente, dejamos el modal abierto (la alerta ya
  // avisa el motivo). Si se agregó bien, cerramos y volvemos al catálogo.
  if (agregado && modalInstancia) {
    modalInstancia.hide();
  }
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
