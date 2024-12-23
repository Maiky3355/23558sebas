//importamos los modulos y variables a ser utilizados

//datos carga el Json en variable (datos)
import data from './jADatos.js';
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
//cargamos el evento que asigna las medidas de los productos cartuchos-agujas-punteras
import * as varianteDeMedidas from './varianteDeMedidas.js';
//import * as propagandaAlAzar from'./propaganda.js';

//VARIABLE PARA MOSTRAR CANTIDAD DE ITEMS EN FLOBO DE CARRITO
const cantCarritod = document.getElementById("cantCarrito");

let cantCarritoLet = 0;


let flagMostrarDescuentos = false;



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
var selectElement = template2.querySelector('.variantes');









//creamos funcion con datos para mostrar elementos del catalogo y no repetir code <-------
function MostrarEnCatalogo(datos, contenedorId) {

  //MOSTRAMOS LOS ELEMENTOS DEL CATALOGO
  template.querySelector('.esteSi').setAttribute("id", contenedorId);

  //const imageId = `gimg-${contenedorId}-${datos.Artículo}`;
  template2.querySelector("img").setAttribute("src", "./imgcarrito/" + (datos.Artículo) + ".jpg");
  template2.querySelector("img").setAttribute("id", "img" + datos.Artículo);
  template2.querySelector("h5").textContent = (datos.Descripción);

  //llamamos la funcion del modulo para agregar las variantes 
  varianteDeMedidas.AgregaVariantes(datos, template2);

  //mostramos el stock disponible
  template2.querySelector("p").textContent = (datos.Inventario) + " disponibles";

  // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
  template2.querySelector(".cantidad").setAttribute("id", "idbot" + (datos.Artículo));
  template2.querySelector(".cantidad").setAttribute("max", (datos.Inventario));
  if (datos.Descuento != 0) {
    // Formatear precioCatalogo con formato numérico y limitar a 2 decimales
    var precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
    precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

    //los valores vienen con "," y hay q pasarlos a puntos
    var precioCatalogo2 = (datos.Venta.replace(/,/g, ".") * datos.DOLAR) * (1 - (Number((datos.Descuento).replace(/,/g, "."))));
    precioCatalogo2 = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo2);

    //mostramos el precio del producto y el descuento tachado
    template2.querySelector("small").innerHTML = "<del>$" + precioCatalogo + "</del>" + " $" + precioCatalogo2;
  } else {
    var precioCatalogo = (datos.Venta.replace(/,/g, ".") * datos.DOLAR);
    precioCatalogo = new Intl.NumberFormat('es-Mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(precioCatalogo);

    //mostramos el precio del producto
    template2.querySelector("small").textContent = "$" + precioCatalogo;
  }

  //seleccionamos el boton y le asignamos el id que corresponde
  template2.querySelector("button").setAttribute("id", "idbot" + (datos.Artículo));

  //hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes

  let clone2 = document.importNode(template2, true);
  fragmento2.appendChild(clone2);
  return fragmento2
};











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
  categoriasUnicas.add("DESCUENTOS");
  categoriasUnicas.add("TODOS");

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
    while (fragmento2.firstChild) {
      fragmento2.removeChild(fragmento2.firstChild);
    }
    while (fragmento.firstChild) {
      fragmento.removeChild(fragmento.firstChild);
    }


    datos.forEach((datos) => {
      if (datos.Inventario >= 1 /*&& datos.Descuento == 0 */ && (FILTROS === "TODOS" || datos.Categoria == FILTROS || FILTROS === "DESCUENTOS" && datos.Descuento != 0)) {
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
    var a = true;

    descu.porDeDescuento();

    varianteDeMedidas.cambiarVariantes()

    subirScroll.subir()

  });
  //ESTO SUBE AL DOM LAS CATEGORIAS
  lil.appendChild(boton);
  dropdownMenu.appendChild(lil);
});





// function obtenerURL() {
//   const urlParams = new URLSearchParams(window.location.search);

//   const FILTROS = urlParams.get('filtro') || 'todos'; // Si no hay filtro, se usa 'todos'

//   //eliminamos el contenido del cATALOGO PARA MOSTRAR EL CONTENIDO FILTRADO
//   const element = document.querySelector(".esteSi");
//   element.parentElement.remove();
//   while (fragmento2.firstChild) {
//     fragmento2.removeChild(fragmento2.firstChild);
//   }
//   while (fragmento.firstChild) {
//     fragmento.removeChild(fragmento.firstChild);
//   }
// let FILTRO=FILTROS.toUpperCase();
//   datos.forEach((datos) => {
//     if (datos.Inventario >= 1 /*&& datos.Descuento == 0 */ && (FILTRO === "TODOS" || datos.Categoria == FILTRO)) {
//       //mostramos los datos en el catalogo!!! <--------------------------------------------------
//       contenedorId = 0;
//       fragmento2 = MostrarEnCatalogo(datos, contenedorId);
//     }

//     mBotones.mostrarBotones();
//   });
//   let clone = document.importNode(template, true);
//   fragmento.appendChild(clone);
//   document.body.appendChild(fragmento);//agregamos el contenedor padre
//   document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards
//   //MOSTRAMOS EL BOTON QUE SELECCIONAMOS
//   console.log("Botón seleccionado:", FILTRO);
//   //CAMBIAMOS EL NOMBRE AL BOTON PRINCIPAL DEL MENU DESPLEGABLE POR EL SELECCIONADO
//   nombreDesplegable.textContent = FILTRO;
//   //PONEMOS A ESCUCHAR LOS BOTONES NUEVAMENTE

//   escucharBotones();
//   var a = true;

//   descu.porDeDescuento();

//   varianteDeMedidas.cambiarVariantes()

//   subirScroll.subir()

// };



let contenedorId = 0;



// 1. Ordenar el array por la propiedad "Categoria":
datos.sort((a, b) => a.Descripción.localeCompare(b.Descripción));

// 2. Iterar sobre el array ordenado y agrupar por categoría:
let descActual = '';
datos.forEach(datos => {
  if (datos.Descripción !== descActual && datos.Inventario >= 1) {

    descActual = datos.Descripción;


  }
  if (datos.Inventario >= 1) {

    contenedorId = 0
    fragmento2 = MostrarEnCatalogo(datos, contenedorId);
  }

  mBotones.mostrarBotones();
});

template.querySelector("H3").textContent = 'PRECIOS EFECTIVO';


let clone = document.importNode(template, true);
fragmento.appendChild(clone);
document.body.appendChild(fragmento);//agregamos el contenedor padre
document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards


//Ponemos a escuchar botones de productos
escucharBotones();
descu.porDeDescuento();










//ponemos a escuchar todos los botones y mandamos a agregar los datos
//esta es la funcion que agrega los datos a itemCarrito
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

      let selectElement77 = document.getElementById('med' + da2); // Obtener el elemento select por su id
      if (selectElement77 != null) {
        var medidas = selectElement77.value; // Obtener el valor seleccionado del elemento select


        switch (medidas) {
          case '1':
            console.log('Has seleccionado la opción 1');
            // Aquí puedes realizar acciones específicas para la opción 1
            var textMedidas = "RL-";
            break;
          case '2':
            console.log('Has seleccionado la opción 2');
            // Acciones para la opción 2
            var textMedidas = "M1-";
            break;
          case '3':
            // ...
            var textMedidas = "RM-";
            break;
          case '4':
            // ...
            var textMedidas = "RS-";
            break;
          default:
            console.log('Opción no válida');
            break;
        }

      }

      let selectElement7 = document.getElementById('var' + da2); // Obtener el elemento select por su id
      if (selectElement7 != null) {
        var varied = selectElement7.value; // Obtener el valor seleccionado del elemento select

      }
      //buscamos los datos del boton precionado
      var tit = buscarDatos.buscarId(parseInt(da2));
      var pre = buscarDatos.buscarIdPrecio(parseInt(da2));
      var dol = buscarDatos.buscarIdDol(parseInt(da2));
      var stock = buscarDatos.buscarStock(parseInt(da2));
      var desc = buscarDatos.buscarDescuento(parseInt(da2));

      let agregarOModificarItem = (da2, Artículo, Descripción, Venta, DOLAR, Unidades, Descuento) => {
        //vemos si esta por el id
        let siEstaId = itemCarrito.find(artic => artic.Artículo === (parseInt(da2)));
        //vemos si esta con la misma descripcion

        if (siEstaId) {

          if ((siEstaId.Unidades + unidades) <= stock) {

            siEstaId.Unidades += unidades;
            localStor.guardarEnLocalStorage(itemCarrito);
            agregar(tit, da2);
          } else {
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

            } else {
              itemCarrito.push({ Artículo, Descripción, Venta, DOLAR, Unidades });
              localStor.guardarEnLocalStorage(itemCarrito);
              agregar(tit, da2);
              console.log(Venta)
              console.log(typeof Venta);

            }
          } else {
            //MOSTRAMOS ALERTAS DE NO HAY STOCK SUFICIENTE
            let suceso = "NO HAY STOCK SUFICIENTE";
            let tipoAlert = "alert-danger";
            alertas.alertAgrego(Descripción, suceso, tipoAlert);
            return;
          }

        }
      };
      if (medidas == null & varied == null) {
        agregarOModificarItem(da2, (parseInt(da2)), tit, pre, dol, unidades, desc);
      } else {
        //modificamos el id y agregamos descropcion diferente... agregamos la medida y 9990 al principio y la variedad al final
        agregarOModificarItem(medidas + 9990 + da2 + varied, (parseInt(medidas + 9990 + da2 + varied)), `${tit}  ${textMedidas} ${varied}`, pre, dol, unidades, desc);
      }


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

      if (Number(da2) != 0) {


        var prodAElimin = eliminarOModificarItem(Number(da2), unidades, da);

        console.log(`se elimino del carrito el id: ${Number(da2)}`);

        //MOSTRAMOS ALERTAS DE LO ELIMINADO
        let suceso = "Se eliminó del carrito";
        let tipoAlert = "alert-danger";
        alertas.alertAgrego(prodAElimin, suceso, tipoAlert);


      }


    })
  })
  //ELIMINAMOS DEPENDE SI HAY VARIOS O 1 SOLO Y VAMOS ACTUALIZANDO CARRITO Y LINK DE WHATSAPP
  let eliminarOModificarItem = (dato, unidades, parrafo) => {
    let siEsta = itemCarrito.find((artic) => artic.Artículo === dato);

    if (siEsta) {
      // console.log(siEsta.Unidades);

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
    span.style.cssText = '  z-index: 999 !important;  font-weight: bold;font-size: 16px;   background-color: rgb(0, 123, 255);';

    span.textContent = producto.Unidades;


    parrafo.textContent += ` - ${producto.Descripción} - $${precioCatalogo}`;


    //tratamos de poner imagen en carrito
    // const img1 = new Image();
    // img1.onload = () => {
    //   // Una vez que la imagen se ha cargado, la agregamos al elemento parrafo
    //   parrafo.appendChild(img1);
    // };
    // img1.src = "./imgcarrito/" + producto.Artículo + ".jpg";
    // img1.alt = "Imagen del producto " + producto.Artículo;
    // img1.style.cssText = 'z-index: 1100 !important; width:10px; height: 10px;';




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
      if (Descripcion.indexOf(texto) !== -1 /*&& producto.Descuento == 0*/ && producto.Inventario >= 1) {

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
    var a = true;

    descu.porDeDescuento();

    varianteDeMedidas.cambiarVariantes()


    subirScroll.subir();

  };
  //PONEMOS LOS EVENTOS DEL BUSCADOR 


  formulario.addEventListener('input', filtrar);
  formulario.addEventListener('change', filtrar);
  formulario.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') { // Verifica si se presionó Enter
      filtrar();
      //llamamos la funcion ocultar canvas cuando precionamos enter o buscar
      ocultarCanvasBusqueda();
    }
  });
}









// funcion ocultar canvas
function ocultarCanvasBusqueda() {
  // Obtenemos los elementos
  const elementosBackdrop = document.getElementsByClassName("offcanvas-backdrop");
  const canvasInteres = document.getElementById("offcanvasDarkNavbar");

  // Ocultamos los elementos backdrop y el canvas
  for (let i = 0; i < elementosBackdrop.length; i++) {
    elementosBackdrop[i].classList.remove('show');
  }
  if (canvasInteres) {
    canvasInteres.classList.remove('show');
  }

  // Usamos Bootstrap para ocultar el offcanvas
  const offcanvasElement = document.getElementById('offcanvasDarkNavbar');
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.hide();

  // Eliminamos los estilos del body
  const body = document.body;
  body.removeAttribute('style');
}





//actualizamos el carrito
function actualizarCarrito() {
  total();
  // Limpiar el contenido existente en el contenedor
  interes.innerHTML = '';
  cantCarritoLet = 0;
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



    //AGREGAMOS LAS UNIDADES A MOSTRAR EN GLOBO DE CARRITO    

    cantCarritoLet += producto.Unidades;






    parrafo.appendChild(span);
    interes.appendChild(parrafo);

  });

  cantCarritod.textContent = cantCarritoLet;

  localStor.guardarEnLocalStorage(itemCarrito);
  borrarCarritoCompleto()


  EliminarV();

};


//llamamos a la funcion que crea el boton scroll y sube.
subirScroll.crearBotonScroll();

//llamamos a la funcion para mostrar el % de descuento correspondiente
descu.porDeDescuento();









//si lo usamos, este codigo iria en mostrarCatalogo 
//llamamos a la funcion de control de imagen
//let im= mostrarImagen(datos, contenedorId);
//template2.querySelector("img").setAttribute("src", (im));


// //funcion para comprobar si la imagen existe
// function mostrarImagen(datos, contenedorId) {
//   var imagen = datos.Artículo + ".jpg";
//   var ruta = "./imgcarrito/" + imagen;
// var img= ruta;
//   var xhr = new XMLHttpRequest();
//   xhr.open("HEAD", ruta, false);
//   xhr.send();

//   if (xhr.status === 200) {
//     // La imagen existe, mostramos la imagen real
//     img= ruta;
//     return img;
//   } else {
//     // La imagen no existe, mostramos la imagen de "IMGINEXISTENTE"
//     img= "./imgcarrito/" + "IMGND.jpg";
//     return img;
//   }

// }





varianteDeMedidas.cambiarVariantes()









//creamos funcion que crea boton, lo muestra si hay items y borra todo el carrito.
function borrarCarritoCompleto() {


  const BCarritoComp = document.getElementById('borrarCarr');

  BCarritoComp.innerHTML = '';
  const btnBorrarCarrito = document.createElement("button");
  btnBorrarCarrito.setAttribute("class", "btn btn-danger");
  btnBorrarCarrito.setAttribute("id", "btbc");
  btnBorrarCarrito.textContent = "Vaciar Carrito";


  BCarritoComp.appendChild(btnBorrarCarrito)

  const btbc = document.getElementById('btbc');


  if (itemCarrito.length <= 0) {
    BCarritoComp.classList.remove('show');
    BCarritoComp.classList.add('hide');
  }

  else {
    if (itemCarrito.length >= 1) {
      BCarritoComp.classList.remove('hide');
      BCarritoComp.classList.add('show');


      btbc.addEventListener('click', function (event) {
        event.preventDefault(); // Evita la redirección
        itemCarrito.splice(0, itemCarrito.length);


        let suceso = "Ya no hay elementos";
        let tipoAlert = "alert-danger";
        let da = "SE VACIO EL CARRITO"
        alertas.alertAgrego(da, suceso, tipoAlert);



        actualizarCarrito()
        actualizarEnlaceWhatsApp(); // Actualizar el enlace
      });
    }
  }
};



//propagandaAlAzar.propagandaAlAzar()
// obtenerURL()

const fondo = document.getElementById('fondo');
const fondo2 = document.getElementById('fondo2');
// Función para cambiar el z-index después de 4 segundos
function cambiarZIndex() {
  fondo.style.zIndex = -50;
  fondo.style.opacity = "30%";
  fondo2.style.height = "200%";

}

// Llama a la función después de 4 segundos
setTimeout(cambiarZIndex, 2000);