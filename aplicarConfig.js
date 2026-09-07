// ============================================================
// aplicarConfig.js
// ============================================================
// Toma los valores de config.js y los vuelca en el HTML.
// No hace falta entender este archivo para cambiar textos: para
// eso está config.js. Este archivo solo "conecta" cada dato con
// el lugar de la página donde tiene que aparecer, buscando los
// elementos marcados con el atributo data-config="..." o
// data-config-href="..." en el HTML.
//
// Se incluye con <script type="module" src="aplicarConfig.js">
// en cada página (index.html, tienda.html, contacto.html).
// ============================================================

import config from './config.js';

// Busca un valor dentro de config a partir de una ruta como
// "contacto.telefono" (permite agrupar datos relacionados).
function obtenerValor(ruta) {
  return ruta.split('.').reduce((actual, parte) => (
    actual !== undefined ? actual[parte] : undefined
  ), config);
}

function aplicarConfig() {
  // Texto visible: <algo data-config="clave">...</algo>
  document.querySelectorAll('[data-config]').forEach(elemento => {
    const clave = elemento.getAttribute('data-config');
    const valor = obtenerValor(clave);
    if (valor !== undefined) {
      elemento.textContent = valor;
    } else {
      console.warn(`config.js no tiene un valor para "${clave}"`);
    }
  });

  // Enlaces: <a data-config-href="clave" href="...">
  document.querySelectorAll('[data-config-href]').forEach(elemento => {
    const clave = elemento.getAttribute('data-config-href');
    const valor = obtenerValor(clave);
    if (valor !== undefined) {
      elemento.setAttribute('href', valor);
    } else {
      console.warn(`config.js no tiene un valor para "${clave}"`);
    }
  });
}

aplicarConfig();

export { aplicarConfig };
