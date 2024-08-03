//importamos los modulos y variables a ser utilizados

//datos carga el Json en variable (datos)
import  data from './jADatos.js';
const datos = Array.from(data);

//mBotones muestra los botones Agregar al carrito con movimiento
import * as mBotones from './mBotones.js';
//alertas muestras las alertas!
import * as alertas from './alertas.js';
//cargamos las funciones de vuscar los datos de los productos para agregar al carrito
import * as buscarDatos from './buscarDatos.js';
//funciones de carga y extraccion de local storage
import * as localStor from './localStor.js';
//cargamos la funcion de descuentos correspondientes
import * as descu from './descu.js';
//vargamos la funvion de subir scroll y el boton con esa misma accion
import * as subirScroll from './subirScroll.js';
//cargamos la inicializacion de itemCarrito
import * as inItemCarr from './inItemCarr.js';
//cargamos la variable de itemCarrito
import { itemCarrito } from './inItemCarr.js';
//cargamos los eventos de cerrar canvas
import * as eventCerrCanvas from './eventCerrCanvas.js';

let flagMostrarDescuentos = false;
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





//este es para poner imagen si no estala imagen
// var img = new Image();
// img.src = `./imgcarrito/${datos.Artículo}.jpg`;

// if  (img.src.includes(img.src))  {

// contenedorId = 0;

//   // La imagen existe, asignamos la ruta a la imagen en el DOM
//    let imgn= (datos.Artículo);

//    fragmento2 = MostrarEnCatalogo(datos, contenedorId, imgn);
//   console.log("se encontro imagen "+ datos.Artículo)


// } else

// {
//   // La imagen no existe, asignamos la ruta a la imagen predeterminada
//  contenedorId = 0;

  
//    let imgn="IMGND";
//    fragmento2 = MostrarEnCatalogo(datos, contenedorId, imgn);

//   console.log(" no se encontro imagen "+ datos.Artículo)


// }














//cargamos los template del html y creamos los fragmentos
let template = document.getElementById("contTemplate").content;
let fragmento = document.createDocumentFragment();

let template2 = document.getElementById("contTemplate2").content;
let fragmento2 = document.createDocumentFragment();

let template3 = document.getElementById("contTemplate3").content;

//cargamos donde mostramos total de carrino en el navbar
let totalCarritoNavb = document.getElementById("totalCarritoNavb");
//cargamos a interes la etiqueta donde mostraremos el titulo de producto
const interes = document.getElementById("interes");

//cargamos a interes2 la etiqueta donde mostraremos el precio total
const intprecioTotal = document.getElementById("precioTotal");



//creamos funcion con datos para mostrar elementos del catalogo y no repetir code <-------
function MostrarEnCatalogo(datos, contenedorId) {

  //MOSTRAMOS LOS ELEMENTOS DEL CATALOGO
  template.querySelector('.esteSi').setAttribute("id", contenedorId);
  const imageId = `gimg-${contenedorId}-${datos.Artículo}`;
  let im= mostrarImagen(datos, contenedorId);
  template2.querySelector("img").setAttribute("src", (im));
  template2.querySelector("img").setAttribute("id", imageId);
  template2.querySelector("h5").textContent = (datos.Descripción);
  template2.querySelector("p").textContent = (datos.Inventario) + " disponibles";
  // template2.querySelector("a").dataset.bsContent=(datos.Descripción);
  // template2.querySelector("a").setAttribute("id", "Modal-" + (datos.Artículo));
  // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
  template2.querySelector("select").setAttribute("id", "idbot" + (datos.Artículo));
  var precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
  precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

  template2.querySelector("small").textContent = "$" + precioCatalogo;

  template2.querySelector("button").setAttribute("id", "idbot" + (datos.Artículo));

  //hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes

  let clone2 = document.importNode(template2, true);
  fragmento2.appendChild(clone2);
  return fragmento2
};



function mostrarImagen(datos, contenedorId) {
  var imagen = datos.Artículo + ".jpg";
  var ruta = "./imgcarrito/" + imagen;
var img= ruta;
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", ruta, false);
  xhr.send();

  if (xhr.status === 200) {
    // La imagen existe, mostramos la imagen real
    img= ruta;
    return img;
  } else {
    // La imagen no existe, mostramos la imagen de "IMGINEXISTENTE"
    img= "./imgcarrito/" + "IMGND.jpg";
    return img;
  }
 
}














// function MostrarEnCatalogo(datos, contenedorId) {
//   //MOSTRAMOS LOS ELEMENTOS DEL CATALOGO
//   template.querySelector('.esteSi').setAttribute("id", contenedorId);

//   var imageId = `gimg-${contenedorId}-${datos.Artículo}`;

//   // Crear la nueva imagen y comprobar si existe
//   var img = new Image();
//   img.src = `./imgcarrito/${datos.Artículo}.jpg`;

//   img.onload = function() {
//     // La imagen existe, asignamos la ruta a la imagen en el DOM
//     template2.querySelector("img").setAttribute("src", `./imgcarrito/${datos.Artículo}.jpg`);
//   console.log("se encontro imagen "+ datos.Artículo)
  
//   };

//   img.onerror = function() {
//     // La imagen no existe, asignamos la ruta a la imagen predeterminada
//     template2.querySelector("img").setAttribute("src", "./imgcarrito/IMGND.jpeg");
//     console.log(" no se encontro imagen "+ datos.Artículo)

//   };

//   template2.querySelector("img").setAttribute("id", imageId);
//   template2.querySelector("h5").textContent = (datos.Descripción);
//   template2.querySelector("p").textContent = (datos.Inventario) + " unidades disponibles";
//   // template2.querySelector("a").dataset.bsContent=(datos.Descripción);
//   // template2.querySelector("a").setAttribute("id", "Modal-" + (datos.Artículo));
//   // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
//   template2.querySelector("select").setAttribute("id", "idbot" + (datos.Artículo));
//   var precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
//   precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

//   template2.querySelector("small").textContent = "$" + precioCatalogo;

//   template2.querySelector("button").setAttribute("id", "idbot" + (datos.Artículo));

//   //hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes

//   let clone2 = document.importNode(template2, true);
//   fragmento2.appendChild(clone2);
//   return fragmento2
// };















//llamamos a la inicializacion de itemCarrito y luego actualizamos
inItemCarr.inItemCarr();
actualizarCarrito();

//creamos una variable para los filtros de productos en catalogo
var FILTROS = "";

//creamos una variable para las unidades a ser agregadas al itemCarrito
let unidades = 1;

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
categoriasUnicas.add("TODOS");
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
    while (fragmento2.firstChild) {
      fragmento2.removeChild(fragmento2.firstChild);
    }
    while (fragmento.firstChild) {
      fragmento.removeChild(fragmento.firstChild);
    }
    datos.forEach((datos) => {
      if (datos.Inventario >= 1 && datos.Descuento == 0 && (FILTROS === "TODOS" || datos.Categoria == FILTROS)) {
        //mostramos los datos en el catalogo!!! <--------------------------------------------------
        contenedorId = 0;
        fragmento2 = MostrarEnCatalogo(datos, contenedorId);

      }

      mBotones.mostrarBotones();

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
    subirScroll.subir()
  });
  //ESTO SUBE AL DOM LAS CATEGORIAS
  lil.appendChild(boton);
  dropdownMenu.appendChild(lil);

});








function MostrarDescuentos() {
  if (flagMostrarDescuentos == false) {
    flagMostrarDescuentos = true
  }
  else {
    return
  }

  let contenedorId = 1;
  // Crear el elemento <a>
  while (fragmento2.firstChild) {
    fragmento2.removeChild(fragmento2.firstChild);
  }
  while (fragmento.firstChild) {
    fragmento.removeChild(fragmento.firstChild);
  }
  // Agregar el elemento <a> como hijo del template2
  // Por cada uno de los conjuntos de datos agregamos las variantes de cada etiqueta
  datos.forEach((datos) => {
    if (datos.Inventario >= 1 && datos.Descuento != 0) {
      // Mostramos los datos en el catalogo
      let contenedorId = 1;

      // MOSTRAMOS LOS ELEMENTOS DEL CATALOGO
      template3.querySelector('.caca').setAttribute("id", contenedorId);

      template2.querySelector("img").setAttribute("src", "./imgcarrito/" + (datos.Artículo) + ".jpg");
      template2.querySelector("img").setAttribute("id", "img" + (datos.Artículo));
      template2.querySelector("h5").textContent = (datos.Descripción);
      template2.querySelector("p").textContent = (datos.Inventario) + " disponibles";

      template2.querySelector("select").setAttribute("id", "idbot" + (datos.Artículo));

      // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
      let precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
      precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);
      //los valores vienen con "," y hay q pasarlos a puntos
      let precioCatalogo2 = (datos.Venta.replace(/,/g, ".") * datos.DOLAR) * (1 - (Number((datos.Descuento).replace(/,/g, "."))));
      precioCatalogo2 = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo2);

      template2.querySelector("small").innerHTML = "<del>$" + precioCatalogo + "</del>" + " $" + precioCatalogo2;

      template2.querySelector("button").setAttribute("id", "idbot" + (datos.Artículo));

      // Hacer un clon y subirlo al fragmento correspondiente para poder repetirlo
      let clone2 = document.importNode(template2, true);
      fragmento2.appendChild(clone2);
    }
  });

  if (fragmento2.hasChildNodes()) {
    template3.querySelector("H3").textContent = '¡PROMOCIONES Y OFERTAS SEMANALES!';
    let clon = document.importNode(template3, true);
    fragmento.appendChild(clon);
    document.body.appendChild(fragmento); // Agregamos el contenedor padre
    document.getElementById(contenedorId).appendChild(fragmento2); // Agregamos las cards
  }

  const toggleButton = document.getElementById('toggleDiscountSection');
  toggleButton.addEventListener('click', toggleCacaContent);

  return
}







function toggleCacaContent() {
  const cacaContainer = document.querySelector('.caca');
  cacaContainer.classList.toggle('d-none');

  const toggleButton = document.getElementById('toggleDiscountSection');
  if (cacaContainer.classList.contains('d-none')) {
    toggleButton.textContent = 'Mostrar sección de descuentos';
  } else {
    toggleButton.textContent = 'Ocultar sección de descuentos';
  }
}


function llamaMostDescuentos() {
  // Buscar el elemento con clase "caca" donde estan los productos con descuentos
  const element2 = document.querySelector(".caca");

  // Verificar si el elemento fue encontrado
  if (element2) {
    // Eliminar el elemento del DOM
    element2.parentElement.remove();
    element2.children.remove();
    element2.remove();
    //si aun no se ingreso los ingresa
    if (flagMostrarDescuentos == false) {
      MostrarDescuentos();
    }

  } else {
    // El elemento no fue encontrado
    console.log("A CONTINUACION SE CARGA CATALOGO");

    //si aun no se ingreso los ingresa
    if (flagMostrarDescuentos == false) {
      MostrarDescuentos();
    }
    mBotones.mostrarBotones();
  }
}



//muestra u oculta los descuentos desde un boton
toggleCacaContent
//llama a mostrar descuentos
llamaMostDescuentos()




let contenedorId = 0;
//por cada uno de los conjuntos de datos agregamos las variantes de cada etiqueta
datos.forEach((datos) => {
  if (datos.Inventario >= 1 && datos.Descuento == 0) {
    //mostramos los datos en el catalogo!!! <--------------------------------------------------
  
    contenedorId = 0
  
    fragmento2 = MostrarEnCatalogo(datos, contenedorId);
  }
  mBotones.mostrarBotones();
});

template.querySelector("H3").textContent = 'PRECIOS GENERALES';



let clone = document.importNode(template, true);
fragmento.appendChild(clone);
document.body.appendChild(fragmento);//agregamos el contenedor padre
document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards



//Ponemos a escuchar botones de productos
escucharBotones();








//esta es la funcion que agrega los datos a itemCarrito

//ponemos a escuchar todos los botones y mandamos a agregar los datos
function escucharBotones() {

  const btns = document.querySelectorAll('button[id^=idbot]');
  document.querySelectorAll('button[id^=idbot]').forEach(button => {
    button.removeEventListener('click', Event);
  })
  btns.forEach(btn => {
    btn.addEventListener('click', event => {
      event.stopImmediatePropagation(); // Detiene la propagación del evento de forma inmediata
      var da = event.target.id;
      var regex = /(\d+)/g;
      var da2 = (da.match(regex));

      let selectElement = document.getElementById('idbot' + da2); // Obtener el elemento select por su id
      unidades = Number(selectElement.value); // Obtener el valor seleccionado del elemento select

      var tit = buscarDatos.buscarId(parseInt(da2));
      var pre = buscarDatos.buscarIdPrecio(parseInt(da2));
      var dol = buscarDatos.buscarIdDol(parseInt(da2));
      var stock = buscarDatos.buscarStock(parseInt(da2));
      var desc = buscarDatos.buscarDescuento(parseInt(da2));

      let agregarOModificarItem = (da2, Artículo, Descripción, Venta, DOLAR, Unidades, Descuento) => {
        let siEsta = itemCarrito.find(artic => artic.Artículo === (parseInt(da2)));

        if (siEsta) {
          if ((siEsta.Unidades + unidades) <= stock) {

            siEsta.Unidades += unidades;
            localStor.guardarEnLocalStorage(itemCarrito);
            agregar(tit, da2);
          }
          else {
            //MOSTRAMOS ALERTAS DE NO HAY STOCK SUFICIENTE
            let suceso = "NO HAY STOCK SUFICIENTE";
            let tipoAlert = "alert-danger";
            alertas.alertAgrego(Descripción, suceso, tipoAlert);
            return;
          }



        } else {
          if ((Unidades) <= stock) {
            if (Descuento != 0) {
              let ventaCD = ((Venta) * (1 - (Number(Descuento) / 100)));

              itemCarrito.push({ Artículo, Descripción, Venta: ventaCD.toString(), DOLAR, Unidades });
              localStor.guardarEnLocalStorage(itemCarrito);
              agregar(tit, da2);

            }
            else {
              itemCarrito.push({ Artículo, Descripción, Venta, DOLAR, Unidades });
              localStor.guardarEnLocalStorage(itemCarrito);
              agregar(tit, da2);
              console.log(Venta)
              console.log(typeof Venta);

            }
          }
          else {

            //MOSTRAMOS ALERTAS DE NO HAY STOCK SUFICIENTE
            let suceso = "NO HAY STOCK SUFICIENTE";
            let tipoAlert = "alert-danger";
            alertas.alertAgrego(Descripción, suceso, tipoAlert);
            return;
          }

        }
      };

      agregarOModificarItem(da2, (parseInt(da2)), tit, pre, dol, unidades, desc);

      console.log(itemCarrito);

      EliminarV();
      total();
    });
  });
}



























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


      var prodAElimin = eliminarOModificarItem(Number(da2), unidades, da);


      //MOSTRAMOS ALERTAS DE LO ELIMINADO
      let suceso = "Se eliminó del carrito";
      let tipoAlert = "alert-danger";
      alertas.alertAgrego(prodAElimin, suceso, tipoAlert);




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















//AGREGAMOS LOS DATOS AL CANVAS AL TOCAR BOTONES "AGREGAR AL CARRITO" DEL CATALOGO

function agregar(da, da2) {
  console.log(itemCarrito);

  let suceso = "Se agregó al carrito";
  let tipoAlert = "alert-success";
  alertas.alertAgrego(da, suceso, tipoAlert);

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







eventCerrCanvas.eventCerrCanvas();











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
  enlaceWhatsApp.setAttribute("class", "btn btn-success")
  enlaceWhatsApp.setAttribute("href", enlace);
  enlaceWhatsApp.style.cssText = '  font-weight: bold;font-size: 17px; color: white;   ;';

}

// Agregamos el enlace de WhatsApp al documento
const enlaceWhatsApp = document.createElement("button");

enlaceWhatsApp.addEventListener('click', function (event) {
  event.preventDefault(); // Evita la redirección
  window.open(enlaceWhatsApp.getAttribute("href"), '_blank');
  localStorage.removeItem('datosCarrito')
});
enlaceWhatsApp.textContent = "Mandar carrito por WhatsApp";
document.getElementById("whats").appendChild(enlaceWhatsApp);

// Ejemplo de modificación del array y actualización del enlace

actualizarEnlaceWhatsApp(); // Actualizar el enlace



filtrarConBusqueda()

//usamos el siguiente codigo para buscar productos
function filtrarConBusqueda() {

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
      //VEMOS SI COINCIDEN CON EL TEXTO BUSCADO, SI TIENE INVENTARIO Y NO TIENE DESCUENTO
      if (Descripcion.indexOf(texto) !== -1 && producto.Descuento == 0 && producto.Inventario >= 1) {

        contenedorId = 0;
        //mostramos los datos en el catalogo!!! <--------------------------------------------------
        fragmento2 = MostrarEnCatalogo(producto, contenedorId);
      }

    }

    const element = document.querySelector(".esteSi");
    element.parentElement.remove();
    let clone = document.importNode(template, true);
    fragmento.appendChild(clone);

    document.body.appendChild(fragmento);//agregamos el contenedor padre


    document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards
    mBotones.mostrarBotones();

    escucharBotones();
    subirScroll.subir();
  };
  //PONEMOS LOS EVENTOS DEL BUSCADOR 
  formulario.addEventListener('keydown', filtrar);
  formulario.addEventListener('click', filtrar);
  formulario.addEventListener('change', filtrar);
  formulario.addEventListener('inputType', filtrar);


}

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

  localStor.guardarEnLocalStorage(itemCarrito);
  EliminarV();
};


//llamamos a la funcion que crea el boton scroll y sube.
subirScroll.crearBotonScroll();

//llamamos a la funcion para mostrar el % de descuento correspondiente
descu.porDeDescuento();











//funcion para comprobar si la imagen existe