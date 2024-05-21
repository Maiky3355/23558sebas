

//cargamos los template del html y creamos los fragmentos
let template = document.getElementById("contTemplate").content;
let fragmento = document.createDocumentFragment();

let template2 = document.getElementById("contTemplate2").content;
let fragmento2 = document.createDocumentFragment();


//cargamos donde mostramos total de carrino en el navbar
let totalCarritoNavb = document.getElementById("totalCarritoNavb");
//cargamos a interes la etiqueta donde mostraremos el titulo de producto
const interes = document.getElementById("interes");


//cargamos a interes2 la etiqueta donde mostraremos el precio total
const intprecioTotal = document.getElementById("precioTotal");



//  // Espera a que el documento esté cargado completamente
//    $(document).ready(function() {
//       $('[data-bs-toggle="popover"]').popover();

//       // Agrega el código para ocultar el popover al deslizar la pantalla
//       $(window).scroll(function () {
//         $('[data-bs-toggle="popover"]').popover('hide');
//       });
//     });

// $(document).ready(function() {
//   var images = $('.card-img-top');
//   var selectedCard = null;
//   var originalStyles = null;

//   images.each(function() {
//     $(this).click(function() {
//       $('.card').removeClass('card-selected');
//       selectedCard = $(this).closest('.card');
//       selectedCard.addClass('card-selected');
//       originalStyles = getOriginalStyles(selectedCard);
//       resizeAndCenterCard(selectedCard);
//     });
//   });

//   $(window).scroll(function() {
//     if (selectedCard) {
//       selectedCard.css(originalStyles);
//     }
//   });
// });

// function getOriginalStyles(card) {
//   return {
//     'position': card.css('position'),
//     'top': card.css('top'),
//     'left': card.css('left'),
//     'transform': card.css('transform')
//   };
// }

// function resizeAndCenterCard(card) {
//   var windowWidth = $(window).width();
//   var windowHeight = $(window).height();
//   var cardWidth = card.outerWidth();
//   var cardHeight = card.outerHeight();
//   var leftPosition = (windowWidth - cardWidth) / 2;
//   var topPosition = (windowHeight - cardHeight) / 2;

//   card.css({
//     'position': 'fixed',
//     'top': topPosition + 'px',
//     'left': leftPosition + 'px',
//     'transform': 'scale(1.5)'
//   });
// }


//hacemos que los botones aparezcan despues de mostrar las tarjetas

function mostrarBotones(){

    $(document).ready(function() {
      var botones = document.querySelectorAll('.card-text button');
    
      var opciones = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };
    
      var observer = new IntersectionObserver(function (entradas, observer) {
        entradas.forEach(function (entrada) {
          if (entrada.intersectionRatio > 0) {
            setTimeout(function() {
              entrada.target.style.opacity = '1';
              entrada.target.style.animation = 'aparecerDesdeAbajo 0.5s ease-in-out forwards';
            }, 900); // Retraso de 2 segundos (2000 milisegundos)
            observer.unobserve(entrada.target);
          }
        });
      }, opciones);
    
      botones.forEach(function (boton) {
        observer.observe(boton);
      });
    });
  }
  






//creamos funcion con datos para mostrar elementos del catalogo y no repetir code <-------
function MostrarEnCatalogo(datos) {
  //MOSTRAMOS LOS ELEMENTOS DEL CATALOGO
  template.querySelector('.esteSi').setAttribute("id", contenedorId);

  template2.querySelector("img").setAttribute("src", "./imgcarrito/" + (datos.Artículo) + ".jpg");
  template2.querySelector("h5").textContent = (datos.Descripción);
  template2.querySelector("p").textContent = (datos.Categoria);
  // template2.querySelector("a").dataset.bsContent=(datos.Descripción);
  // template2.querySelector("a").setAttribute("id", "Modal-" + (datos.Artículo));
  // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
  var precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
  precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

  template2.querySelector("small").textContent = "$" + precioCatalogo;

  template2.querySelector("button").setAttribute("id", "idbot" + (datos.Artículo));

  //hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes

  let clone2 = document.importNode(template2, true);
  fragmento2.appendChild(clone2);
  return fragmento2
};











//creamos una variable para los filtros de productos en catalogo
var FILTROS = "";

//creamos un array para guardar los productos
let itemCarrito = [];

//creamos una variable para las unidades (falta agregar para opciones de mas unidades)
let unidades = 1;

//creamos el array con los datos
import data from './articulos.json' with { type: 'json' };

//creamos el array datos con los datos del json
const datos = Array.from(data);

// Obtener el contenedor del menú desplegable para buscar productos por categoria
const dropdownContainer = document.querySelector(".porCategoria");
const dropdownMenu = dropdownContainer.querySelector(".porCategoriaUl");
const nombreDesplegable = dropdownContainer.querySelector(".nombreDesplegable");

// Crear un conjunto (Set) para almacenar las categorías únicas
const categoriasUnicas = new Set();

// Iterar sobre el array de datos y agregar cada categoría al conjunto
datos.forEach(objeto => {
  //si las categorias tienen productos con stock la agregamos al menu desplegable
  if (objeto.Inventario >= 1) {

    categoriasUnicas.add(objeto.Categoria);
  }
});

// Crear los elementos de lista dinámicamente utilizando las categorías únicas
categoriasUnicas.forEach(categoria => {
  const lil = document.createElement("li");
  const boton = document.createElement("button");
  boton.textContent = categoria;
  boton.className = "dropdown-item";
  boton.type = "button";

  // Agregar evento de clic al botón
  boton.addEventListener("click", () => {
    FILTROS = boton.textContent;

    //eliminamos el contenido del cATALOGO PARA MOSTRAR EL CONTENIDO FILTRADO
    const element = document.querySelector(".esteSi");
    element.parentElement.remove();

    datos.forEach((datos) => {
      if (datos.Inventario >= 1 && (FILTROS === "TODOS" || datos.Categoria == FILTROS)) {
        //mostramos los datos en el catalogo!!! <--------------------------------------------------
        fragmento2 = MostrarEnCatalogo(datos);

      }
      mostrarBotones();
    });
    let clone = document.importNode(template, true);
    fragmento.appendChild(clone);
    document.body.appendChild(fragmento);//agregamos el contenedor padre
    document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards
    //MOSTRAMOS EL BOTON QUE SELECCIONAMOS
    console.log("Botón seleccionado:", FILTROS);
    //CAMBIAMOS EL NOMBRE AL BOTON PRINCIPAL DEL MENU DESPLEGABLE POR EL SELECCIONADO
    nombreDesplegable.textContent = FILTROS;
    //PONEMOS A ESCUCHAR LOS BOTONES NUEVAMENTE
    escucharBotones();
    subir()
  });
  //ESTO SUBE AL DOM LAS CATEGORIAS
  lil.appendChild(boton);
  dropdownMenu.appendChild(lil);

});






















let contenedorId = 0;
//por cada uno de los conjuntos de datos agregamos las variantes de cada etiqueta
datos.forEach((datos) => {
  if (datos.Inventario >= 1) {
    //mostramos los datos en el catalogo!!! <--------------------------------------------------
    fragmento2 = MostrarEnCatalogo(datos);
  }
  mostrarBotones();
});
let clone = document.importNode(template, true);
fragmento.appendChild(clone);
document.body.appendChild(fragmento);//agregamos el contenedor padre
document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards



//Ponemos a escuchar botones de productos
escucharBotones();










//ponemos a escuchar todos los botones y mandamos a agregar los datos
function escucharBotones() {
  const btns = document.querySelectorAll('button[id^=idbot]');

  btns.forEach(btn => {



    btn.addEventListener('click', event => {


      var da = event.target.id;

      var regex = /(\d+)/g;
      var da2 = (da.match(regex));


      //juntamos los datos del producto que agregamos al carrito
      var tit = buscarId(parseInt(da2));
      var pre = buscarIdPrecio(parseInt(da2));
      var dol = buscarIdDol(parseInt(da2));
      let unidades = Number(1);

      //cargamos los datos en el array de objetos

      let agregarOModificarItem = (Artículo, Descripción, Venta, DOLAR, Unidades) => {

        let siEsta = itemCarrito.find(artic => artic.Artículo === (parseInt(da2)));

        if (siEsta) {
          siEsta.Unidades += unidades;
        } else {
          itemCarrito.push({ Artículo, Descripción, Venta, DOLAR, Unidades })
        }
      };

      agregarOModificarItem((parseInt(da2)), tit, pre, dol, unidades)

      //mostramos el array de objetos en la consola.
      console.log(itemCarrito)




      agregar(tit, da2);

      EliminarV();
      total();

    });

  });

};



























function EliminarV() {

  //SELECCIONAMOS LAS LI DEL CANVAS PARA HACERLAS ESCUCHAR
  const parrafos = document.querySelectorAll('li[id^=item]');

  parrafos.forEach(parr => {
    parr.addEventListener('click', parraf => {
      parraf.stopImmediatePropagation(); // Detener la propagación y ejecución adicional

      var da = parraf.target.id;
      unidades = 1;

      var regex = /(\d+)/g;
      let da2 = (da.match(regex));
      console.log(Number(da2));


      var caca = eliminarOModificarItem(Number(da2), unidades, da);


      //MOSTRAMOS ALERTAS DE LO ELIMINADO
      let suceso = "Se eliminó del carrito";
      let tipoAlert = "alert-danger";
      alertAgrego(caca, suceso, tipoAlert);




    })
  })
  //ELIMINAMOS DEPENDE SI HAY VARIOS O 1 SOLO Y VAMOS ACTUALIZANDO CARRITO Y LINK DE WHATSAPP
  let eliminarOModificarItem = (dato, unidades, parrafo) => {
    let siEsta = itemCarrito.find((artic) => artic.Artículo === dato);
    if (siEsta) {
      console.log(siEsta.Unidades);

      if (siEsta.Unidades >= 2) {
        siEsta.Unidades -= unidades;
        if (siEsta) {
          actualizarCarrito();
          actualizarEnlaceWhatsApp();
          return siEsta.Descripción
        }
        actualizarCarrito();

      } else {
        const index = itemCarrito.findIndex((artic) => artic.Artículo === dato);

        if (index > -1) {
          itemCarrito.splice(index, 1);
          document.getElementById(parrafo).remove();



          if (siEsta) {
            actualizarCarrito();
            actualizarEnlaceWhatsApp();
            return siEsta.Descripción
          }
          actualizarCarrito();
          actualizarEnlaceWhatsApp();
        }
      }
    } else {
      console.log("El elemento no se encontró en el carrito");
    }
    if (siEsta) {
      actualizarCarrito();
      actualizarEnlaceWhatsApp();
      return siEsta.Descripción
    }

    actualizarCarrito();
  };






}















//buscamos el id y ponemos el titulo
function buscarId(id) {
  const found = datos.find(elem => elem.Artículo == id);

  return found.Descripción;
};
//buscamos el id y ponemos el dolar
function buscarIdDol(id) {
  const found = datos.find(elem => elem.Artículo == id);

  return found.DOLAR;
};


//buscamos el id y ponemos el precio
function buscarIdPrecio(id) {
  const found = datos.find(elem => elem.Artículo == id);
  //buscamos el  valor del dolar en el array

  //reemplazamos las , por .
  var precioConPuntos = (found.Venta.replace(/,/g, "."));
  //((new Intl.NumberFormat('es-Mx').format(found.Venta.replace(/,/g, ".")*found.DOLAR)))

  return (precioConPuntos);
};








//AGREGAMOS LOS DATOS AL CANVAS AL TOCAR BOTONES "AGREGAR AL CARRITO" DEL CATALOGO

function agregar(da, da2) {
  console.log(itemCarrito);

  let suceso = "Se agregó al carrito";
  let tipoAlert = "alert-success";
  alertAgrego(da, suceso, tipoAlert);

  // Limpiar el contenido existente en el contenedor
  interes.innerHTML = '';

  // Mostrar los productos en el DOM
  itemCarrito.forEach(producto => {
    //CREAMOS LAS ETIQUETAS LI Y SPAN CON SUS DATOS PARA EL CANVAS
    const parrafo = document.createElement("li");
    var precioCatalogo = (producto.Venta.replace(/,/g, ".") * producto.DOLAR * producto.Unidades);
    precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

    parrafo.setAttribute("id", "item" + producto.Artículo);
    parrafo.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");

    parrafo.style.cssText = ' z-index: 998!important;';

    const span = document.createElement("span");
    span.setAttribute("class", "badge badge-primary badge-pill active");
    span.style.cssText = '  z-index: 1101 !important;  font-weight: bold;font-size: 16px;   background-color: rgb(0, 123, 255);';

    span.textContent = producto.Unidades;


    parrafo.textContent += ` - ${producto.Descripción} - $${precioCatalogo}`;
    parrafo.appendChild(span);
    interes.appendChild(parrafo);

  });
  //ACTUALIZAMOS CARRITO Y WHATSAPP.
  actualizarCarrito();
  actualizarEnlaceWhatsApp();
}










//MOSTRAMOS LOS TOTALES EN EL CANVAS Y EL MENU SUPERIOR, TAMBIEN DA EL TOTAL EN EL WHATSAPP

function total() {
  let sumaTotal = 0;

  itemCarrito.forEach(producto => {
    sumaTotal += (producto.Venta.replace(/,/g, ".") * producto.DOLAR * producto.Unidades);


  });
  sumaTotal = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sumaTotal);

  intprecioTotal.textContent = "PRECIO TOTAL: $ " + sumaTotal;
  totalCarritoNavb.textContent = "$ " + sumaTotal

  return ("$ " + sumaTotal);

}























//cargamos los valores de canvas y botones

let canvasInteres = document.getElementById("offcanvasDark");

let botonInteres = document.getElementById("listaInteres");

//cambiamos el hide por show del canvas al apretar boton
botonInteres.addEventListener("click", event => {

  canvasInteres.classList.remove("hide", "show");

  canvasInteres.classList.add("show");


});

//cambiamos el show por hide al apretar la x cerrar del canvas
let botonInteresC = document.getElementById("cerrarCanvas");

botonInteresC.addEventListener("click", event2 => {

  canvasInteres.classList.replace("show", "hide");

});







//actualizamos el carrito

function actualizarCarrito() {
  total();
  // Limpiar el contenido existente en el contenedor
  interes.innerHTML = '';
  // Mostrar los productos en el DOM
  itemCarrito.forEach(producto => {
    const parrafo = document.createElement("li");
    var precioCatalogo = (producto.Venta.replace(/,/g, ".") * producto.DOLAR * producto.Unidades);
    precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

    parrafo.setAttribute("id", "item" + producto.Artículo);
    parrafo.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");

    parrafo.style.cssText = ' z-index: 998!important;';

    const span = document.createElement("span");
    span.setAttribute("class", "badge badge-primary badge-pill active");
    span.style.cssText = '  z-index: 1101 !important;  font-weight: bold;font-size: 16px;   background-color: black;';

    span.textContent = producto.Unidades;


    parrafo.textContent += ` - ${producto.Descripción} - $${precioCatalogo}`;
    parrafo.appendChild(span);
    interes.appendChild(parrafo);

  });
  actualizarEnlaceWhatsApp();
  EliminarV();
};



//funcion PARA MOSTRAR ALERTAS PERSONALIZADAS

function alertAgrego(titAlert, suceso, tipoAlert) {
  //ponemos el titulo del producto en el alert
  let alertTitulo = document.getElementById("alertTit");
  alertTitulo.textContent = `${titAlert} `;

  //ponemos el suceso del alert- sea danger o sucess
  let alertSuceso = document.getElementById("alertSuceso");
  alertSuceso.textContent = `${suceso} `;

  let alertAgrego = document.getElementById("alertAgrego");
  //hacemos el alert visible 
  alertAgrego.classList.remove("hide", "show");
  alertAgrego.style.cssText = 'z-index: -50 !important;';

  alertAgrego.classList.remove("alert-success", "alert-danger");
  alertAgrego.classList.add(tipoAlert);

  alertAgrego.classList.add("show");
  alertAgrego.style.cssText = 'z-index: 50 !important;';
  //Colocamos el timpo del alert antes de desactivarse
  setTimeout(() => {
    alertAgrego.classList.remove("hide", "show");
    alertAgrego.style.cssText = 'z-index: -50 !important;';
    alertAgrego.classList.add("hide");


  }, 2000);


};







// Función para generar el enlace de WhatsApp
function generarEnlaceWhatsApp() {
  const telefono = "5491125275189"; // Reemplaza con el número de teléfono deseado

  // Construir el texto del mensaje con la información de los duplicados y los precios
  let textoCarrito = "Hola! Me interesan estos productos de la web:";
  itemCarrito.forEach(producto => {
    var precioCatalogo = (producto.Venta.replace(/,/g, ".") * producto.DOLAR * producto.Unidades);
    precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

    textoCarrito += `\n\n ${producto.Unidades} - ${producto.Descripción} -  $${precioCatalogo}`;

  });
  let tota = total();
  textoCarrito += `\n\n--- PRECIO TOTAL DEL CARRITO:${tota} \n\n`; // Agregar un salto de línea adicional

  const enlace = `https://wa.me/${telefono}/?text=${encodeURIComponent(textoCarrito)}`;
  return enlace;
}











// Función para actualizar el enlace de WhatsApp
function actualizarEnlaceWhatsApp() {
  const enlace = generarEnlaceWhatsApp();
  enlaceWhatsApp.setAttribute("href", enlace);
  enlaceWhatsApp.style.cssText = '  font-weight: bold;font-size: 17px; color: limegreen;   ;';

}

// Agregamos el enlace de WhatsApp al documento
const enlaceWhatsApp = document.createElement("a");
enlaceWhatsApp.addEventListener('click', function (event) {
  event.preventDefault(); // Evita la redirección
  window.open(enlaceWhatsApp.getAttribute("href"), '_blank');
});
enlaceWhatsApp.textContent = "Mandar carrito por WhatsApp";
document.getElementById("whats").appendChild(enlaceWhatsApp);

// Ejemplo de modificación del array y actualización del enlace

actualizarEnlaceWhatsApp(); // Actualizar el enlace

















//buscador 
//VEMOS EL CONTENIDO DEL FORMULARIO BUSCAR
const formulario = document.querySelector('#formulario');

const filtrar = () => {

  console.log("se busco:" + formulario.value)

  const texto = formulario.value.toLowerCase();
  for (let producto of datos) {


    let Descripcion = producto.Descripción.toLowerCase();
    //BORRAMOS LOS ELEMENTOS DEL CATALOGO
    
    //lo siguiente elimina tarjetas container, pero borra todos.
    // const element2 = document.querySelector(".tarjetas");
    // element2.remove();
    //VEMOS SI COINCIDEN CON EL TEXTO BUSCADO Y SI TIENE INVENTARIO
    if (Descripcion.indexOf(texto) !== -1 && producto.Inventario >= 1) {



      //mostramos los datos en el catalogo!!! <--------------------------------------------------
      fragmento2 = MostrarEnCatalogo(producto);


    }
 

  }

  const element = document.querySelector(".esteSi");
    element.parentElement.remove();
  let clone = document.importNode(template, true);
  fragmento.appendChild(clone);

  document.body.appendChild(fragmento);//agregamos el contenedor padre


  document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards
  mostrarBotones();
  escucharBotones();
  subir();
};
//PONEMOS LOS EVENTOS DEL BUSCADOR 
formulario.addEventListener('keydown', filtrar);
formulario.addEventListener('click', filtrar);
formulario.addEventListener('change', filtrar);
formulario.addEventListener('inputType', filtrar);

//FUNCION PARA SUBIR ARRIBA DEL DOM
function subir() {

  window.scrollTo({
    top: 0, behavior: "smooth"
  })
}
