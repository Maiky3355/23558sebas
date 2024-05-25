

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

























//hacemos que los botones agregar carrito aparezcan despues de mostrar las tarjetas

function mostrarBotones() {

  $(document).ready(function () {
    var botones = document.querySelectorAll('.card-text button');

    var opciones = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    var observer = new IntersectionObserver(function (entradas, observer) {
      entradas.forEach(function (entrada) {
        if (entrada.intersectionRatio > 0) {
          setTimeout(function () {
            entrada.target.style.opacity = '1';
            entrada.target.style.animation = 'aparecerDesdeAbajo 0.5s ease-in-out forwards';
          }, 400); // Retraso de 2 segundos (2000 milisegundos)
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
function MostrarEnCatalogo(datos, contenedorId) {
  //MOSTRAMOS LOS ELEMENTOS DEL CATALOGO
  console.log(template2)
  template.querySelector('.esteSi').setAttribute("id", contenedorId);
  const imageId = `img-${contenedorId}-${datos.Artículo}`;
  template2.querySelector("img").setAttribute("src", "./imgcarrito/" + (datos.Artículo) + ".jpg");
  template2.querySelector("img").setAttribute("id", imageId);
  template2.querySelector("h5").textContent = (datos.Descripción);
  template2.querySelector("p").textContent = (datos.Inventario)+" unidades disponibles";
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






//creamos una variable para los filtros de productos en catalogo
var FILTROS = "";

//creamos un array para guardar los productos
let itemCarrito = extraerDeLocalStorage();
if (itemCarrito !== null) {
  actualizarCarrito();
  let contenido = tieneContenido(itemCarrito);
  if (contenido > 0) {
    let suceso = "Productos en tu carrito";
    let tipoAlert = "alert-success";
    let da = contenido;
    alertAgrego(da, suceso, tipoAlert);

  }
}
function tieneContenido(array) {

  const sumarUnidades = (array) => array.reduce((total, item) => total + item.Unidades, 0);
  const sumaTotal = sumarUnidades(array)
  return sumaTotal;
}

// function tieneContenido(array) {
//   // Verificamos si el parámetro 'array' es un arreglo y si tiene al menos un elemento
//   if (!Array.isArray(array) || array.length === 0) {
//     // Si no cumple la condición, devolvemos 0
//     return 0;
//   }




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
        contenedorId=0;
        fragmento2 = MostrarEnCatalogo(datos,contenedorId);

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





function MostrarDescuentos() {
  if(flagMostrarDescuentos ==false){
    flagMostrarDescuentos= true
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
      template2.querySelector("p").textContent = (datos.Inventario) + " unidades disponibles";

      template2.querySelector("select").setAttribute("id", "idbot" + (datos.Artículo));


      // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
      let precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
      precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);
//los valores vienen con "," y hay q pasarlos a puntos
let precioCatalogo2 = (datos.Venta.replace(/,/g, ".") * datos.DOLAR) * (1 - (Number((datos.Descuento).replace(/,/g, ".")) ));
precioCatalogo2 = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo2);
 
template2.querySelector("small").innerHTML = "<del>$" + precioCatalogo + "</del>"+ " $"+ precioCatalogo2 ;

      template2.querySelector("button").setAttribute("id", "idbot" + (datos.Artículo));

      // Hacer un clon y subirlo al fragmento correspondiente para poder repetirlo
      let clone2 = document.importNode(template2, true);
      fragmento2.appendChild(clone2);
    }
  });

  if (fragmento2.hasChildNodes()) {
    template3.querySelector("H3").textContent = '¡PROMOCIONES Y OFERTAS!';
    let clon = document.importNode(template3, true);
    fragmento.appendChild(clon);
    document.body.appendChild(fragmento); // Agregamos el contenedor padre
    document.getElementById(contenedorId).appendChild(fragmento2); // Agregamos las cards
    
  }

  const toggleButton = document.getElementById('toggleDiscountSection');
  toggleButton.addEventListener('click', toggleCacaContent);


  
  return

}

















toggleCacaContent

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



// Buscar el elemento con clase "caca"
const element2 = document.querySelector(".caca");

// Verificar si el elemento fue encontrado
if (element2) {
  // Eliminar el elemento del DOM
  element2.parentElement.remove();
  element2.children.remove();
  element2.remove();
  if(flagMostrarDescuentos ==false){
    MostrarDescuentos();
  }

} else {
  // El elemento no fue encontrado
  console.log("No se encontró ningún elemento con la clase 'caca'");
if(flagMostrarDescuentos ==false){
  MostrarDescuentos();
}
  
  mostrarBotones();
}
















while (fragmento2.firstChild) {
  fragmento2.removeChild(fragmento2.firstChild);
}
while (fragmento.firstChild) {
  fragmento.removeChild(fragmento.firstChild);
}

let contenedorId = 0;
//por cada uno de los conjuntos de datos agregamos las variantes de cada etiqueta
datos.forEach((datos) => {
  if (datos.Inventario >= 1 && datos.Descuento == 0) {
    //mostramos los datos en el catalogo!!! <--------------------------------------------------
    contenedorId=0
    fragmento2 = MostrarEnCatalogo(datos,contenedorId);
  }
  mostrarBotones();
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
    button.removeEventListener('click',Event);})
  btns.forEach(btn => {
    btn.addEventListener('click', event => {
      event.stopImmediatePropagation(); // Detiene la propagación del evento de forma inmediata
      var da = event.target.id;
      var regex = /(\d+)/g;
      var da2 = (da.match(regex));

      let selectElement = document.getElementById('idbot' + da2); // Obtener el elemento select por su id
      unidades = Number(selectElement.value); // Obtener el valor seleccionado del elemento select

      var tit = buscarId(parseInt(da2));
      var pre = buscarIdPrecio(parseInt(da2));
      var dol = buscarIdDol(parseInt(da2));
      var stock = buscarStock(parseInt(da2));
      var desc = buscarDescuento(parseInt(da2));

      let agregarOModificarItem = (da2,Artículo, Descripción, Venta, DOLAR, Unidades,Descuento) => {
        let siEsta = itemCarrito.find(artic => artic.Artículo === (parseInt(da2)));

        if (siEsta) {
          if ((siEsta.Unidades + unidades) <= stock) {

            siEsta.Unidades += unidades;
            guardarEnLocalStorage(itemCarrito);
            agregar(tit, da2);
          }
          else {
       //MOSTRAMOS ALERTAS DE NO HAY STOCK SUFICIENTE
            let suceso = "NO HAY STOCK SUFICIENTE";
            let tipoAlert = "alert-danger";
            alertAgrego(Descripción, suceso, tipoAlert);
            return;
          }



        } else {
          if ((Unidades) <= stock) {
if(Descuento!=0){
  let ventaCD = ((Venta) * (1 - (Number(Descuento)/100)));

  itemCarrito.push({ Artículo, Descripción, Venta: ventaCD.toString(), DOLAR, Unidades });
  guardarEnLocalStorage(itemCarrito);
  agregar(tit, da2);

}
         else{
          itemCarrito.push({ Artículo, Descripción, Venta, DOLAR, Unidades });
          guardarEnLocalStorage(itemCarrito);
          agregar(tit, da2);
    console.log(Venta)
    console.log(typeof Venta);

         }
          }
          else {

                 //MOSTRAMOS ALERTAS DE NO HAY STOCK SUFICIENTE
      let suceso = "NO HAY STOCK SUFICIENTE";
      let tipoAlert = "alert-danger";
      alertAgrego(Descripción, suceso, tipoAlert);
            return;
          }

        }
      };

      agregarOModificarItem(da2,(parseInt(da2)), tit, pre, dol, unidades, desc);

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
function buscarStock(id) {
  const found = datos.find(elem => elem.Artículo == id);

  return found.Inventario;
};

//los numeros vienen con "," y hay q pasarlos a "." y multiplicar x100
function buscarDescuento(id) {
  const found = datos.find(elem => elem.Artículo == id);
let valor= ((found.Descuento.replace(/,/g, "."))*100)
  return valor
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
















//usamos el siguiente codigo para buscar productos
//buscador 
//VEMOS EL CONTENIDO DEL FORMULARIO BUSCAR
const formulario = document.querySelector('#formulario');

const filtrar = () => {
  while (fragmento2.firstChild) {
    fragmento2.removeChild(fragmento2.firstChild);
  }
  while (fragmento.firstChild) {
    fragmento.removeChild(fragmento.firstChild);
  }
  console.log("se busco:" + formulario.value)

  const texto = formulario.value.toLowerCase();
  for (let producto of datos) {


    let Descripcion = producto.Descripción.toLowerCase();
    //BORRAMOS LOS ELEMENTOS DEL CATALOGO

    //lo siguiente elimina tarjetas container, pero borra todos.
    // const element2 = document.querySelector(".tarjetas");
    // element2.remove();
    //VEMOS SI COINCIDEN CON EL TEXTO BUSCADO Y SI TIENE INVENTARIO
    if (Descripcion.indexOf(texto) !== -1 && producto.Descuento == 0 && producto.Inventario >= 1) {


      contenedorId=0;
      //mostramos los datos en el catalogo!!! <--------------------------------------------------
      fragmento2 = MostrarEnCatalogo(producto,contenedorId);


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

  guardarEnLocalStorage(itemCarrito);
  EliminarV();
};

// Función para guardar el carrito en el local storage
function guardarEnLocalStorage(array) {
  var datos = {
    items: array,
    timestamp: new Date().getTime() + 23 * 60 * 60 * 1000 // Marca de tiempo actual + 24 horas en milisegundos
  };

  localStorage.setItem('datosCarrito', JSON.stringify(datos));
}

// Función para extraer el carrito del local storage si existe y está dentro de la fecha de validez
function extraerDeLocalStorage() {
  var datos = localStorage.getItem('datosCarrito');

  if (datos === null) {
    return [];
  }

  datos = JSON.parse(datos);
  var tiempoActual = new Date().getTime();

  if (tiempoActual > datos.timestamp) {
    localStorage.removeItem('datosCarrito');
    return [];
  }

  return datos.items;
}
// Primero, crea el elemento del botón
const scrollUpButton = document.createElement('button');
const scrollUpButtonImg = document.createElement('img');
scrollUpButtonImg.src = './IMG/up.png'; // Reemplaza con la ruta de tu imagen
scrollUpButton.appendChild(scrollUpButtonImg);
scrollUpButton.classList.add('scroll-up-btn');

// Agrega un evento de clic al botón que llame a la función 'subir()'
scrollUpButton.addEventListener('click', subir);

// Luego, agrega el botón al DOM con posición fija
const scrollUpButtonContainer = document.createElement('div');
scrollUpButtonContainer.classList.add('scroll-up-btn-container');
scrollUpButtonContainer.appendChild(scrollUpButton);
document.body.appendChild(scrollUpButtonContainer);

// Función para mostrar/ocultar el botón según el scroll
function toggleScrollUpButton() {
  if (window.pageYOffset > 0) {
    scrollUpButtonContainer.style.display = 'block';
  } else {
    scrollUpButtonContainer.style.display = 'none';
  }
}

// Agrega un evento de scroll a la ventana que llame a la función 'toggleScrollUpButton()'
window.addEventListener('scroll', toggleScrollUpButton);



//EN EL SIGUIENTE CODIGO VEMOS LA ID DE IMAGEN Y AGREGAMOS AVISO DE DESCUENTO CORRESPONDIENTE AL PRODUCTO

// Obtener todas las imágenes con id que comienzan con "img"
const imageElements = document.querySelectorAll('[id^="img"]');

// Iterar sobre cada imagen
imageElements.forEach((imgElement) => {
  // Obtener el valor numérico del ID de la imagen
  const imageId = parseInt(imgElement.id.replace("img", ""));

  // Buscar el valor de descuento en el objeto "datos"
  let discountValue = datos.find(item => item.Artículo === imageId)?.Descuento;
  discountValue= (discountValue.replace(/,/g, "."))*100;
  // Crear el elemento de texto
  const textElement = document.createElement('span');
  textElement.classList.add('text-overlay');
  textElement.textContent = discountValue+"% OFF";

  // Posicionar el texto dentro de la imagen
  textElement.style.position = 'absolute';
  textElement.style.top = '15%';
  textElement.style.left = '87%';
  textElement.style.transform = 'translate(-50%, -50%)';

  // Agregar el texto al contenedor de la imagen
  imgElement.parentElement.appendChild(textElement);
});




