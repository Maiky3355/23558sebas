// ============================================================
// config.js — CONFIGURACIÓN GENERAL DEL SITIO
// ============================================================
// Este es el ÚNICO archivo que necesitás tocar para cambiar los
// textos, el nombre de la empresa, el WhatsApp o los avisos del
// carrito. No hace falta editar el HTML ni el JS de la lógica.
//
// Cada campo tiene un comentario que indica EXACTAMENTE dónde
// aparece ese texto en el sitio.
// ============================================================

const config = {

  // --------------------------------------------------------
  // Nombre completo de la empresa.
  // Aparece en: el título de la pestaña del navegador, la marca
  // de la barra de navegación (arriba a la izquierda) y el
  // encabezado grande de Inicio y de la Tienda.
  // --------------------------------------------------------
  nombreEmpresa: "Sublime Supplies",

  // --------------------------------------------------------
  // Rubro / a qué se dedica la empresa (bajada corta).
  // Aparece en: debajo del nombre en la portada de Inicio y en
  // el encabezado de la Tienda.
  // --------------------------------------------------------
  rubro: "Insumos para tatuadores",

  // --------------------------------------------------------
  // Título que aparece arriba del catálogo de productos.
  // Aparece en: tienda.html, justo antes de los filtros.
  // --------------------------------------------------------
  tituloTienda: "TIENDA ONLINE",

  // --------------------------------------------------------
  // Número de WhatsApp para recibir los pedidos del carrito.
  // Formato: código de país + código de área + número, todo
  // junto y sin espacios ni signos.
  // Ejemplo actual: 54 9 11 2527-5189  →  "5491125275189"
  // Aparece en: el botón "Mandar carrito por WhatsApp" dentro
  // del carrito (tienda.html).
  // --------------------------------------------------------
  telefonoWhatsApp: "5491125275189",

  // --------------------------------------------------------
  // Enlace de WhatsApp genérico (no depende del carrito).
  // Aparece en: el ícono de WhatsApp del pie de página, en
  // Inicio, Tienda y Contacto.
  // --------------------------------------------------------
  enlaceWhatsAppContacto: "https://wa.me/message/L5DVPFBSNYERD1",

  // --------------------------------------------------------
  // Primera línea del mensaje que se arma automáticamente al
  // enviar el carrito por WhatsApp (después siguen los productos
  // y el total, eso lo agrega el sistema solo).
  // Aparece en: el mensaje de WhatsApp del carrito (tienda.html).
  // --------------------------------------------------------
  mensajeInicialCarritoWhatsApp: "Hola! Me interesan estos productos de la web:",

  // --------------------------------------------------------
  // Avisos que se muestran dentro del panel del carrito, debajo
  // de la lista de productos.
  // Aparece en: tienda.html, panel lateral del carrito.
  // --------------------------------------------------------
  avisosCarrito: {
    formasDePago: "Precios solo en efectivo, debito, QR y transferencia.",
    cambiosDePrecio: "PRECIOS SUJETOS A CAMBIOS SIN PREVIO AVISO.",
    atencionWhatsapp: "Al enviar su carrito por WhatsApp, recibira atencion personalizada.",
    imagenesIlustrativas: "Imagenes a modo ilustrativo",
  },

  // --------------------------------------------------------
  // Datos de contacto y ubicación del local.
  // Aparece en: contacto.html
  // --------------------------------------------------------
  contacto: {
    telefono: "1125275189",
    direccion: "Av. del Sesquicentenario 2613, Ing. Pablo Nogues, Provincia de Buenos Aires",
    horarioAtencion: "Lunes a Viernes de 12hs a 18hs",
    horarioCerrado: "Sabados, Domingos y feriados CERRADO",
  },

};

export default config;
