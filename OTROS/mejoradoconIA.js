
// Cargamos los templates del HTML y creamos los fragmentos
const template = document.getElementById("contTemplate").content;
const template2 = document.getElementById("contTemplate2").content;
const fragmento = document.createDocumentFragment();
const fragmento2 = document.createDocumentFragment();

// Creamos arrays para guardar los intereses y precios de los productos agregados
const interesAgregado = [];
const interesPrecioAgregado = [];


//creamos variables para mandar lista por whatsapp
let prod=[];
let pre=[];
let tota=[];

// Creamos el array con los datos de los productos
const datos = [
  {
    id: "idbot0",
    img: "IMG/LOGONEGRO.jpg",
    titulo: "Maquinas nacionales",
    descripcion: "Tu mejor opción",
    precio: "66.33"
  },
  {
    id: "idbot1",
    img: "IMG/LOGOBLANCO.jpg",
    titulo: "Maquinas importadas",
    descripcion: "Calidad importada",
    precio: "70.33"
  },
  // ...otros productos
];

// Iteramos sobre los datos y agregamos los elementos al fragmento
datos.forEach((dat) => {
  template.querySelector(".esteSi").setAttribute("id", "0");

  template2.querySelector("img").setAttribute("src", dat.img);
  template2.querySelector("h5").textContent = dat.titulo;
  template2.querySelector("p").textContent = dat.descripcion;
  template2.querySelector("small").textContent = dat.precio;
  template2.querySelector("button").setAttribute("id", dat.id);

  const clone = document.importNode(template, true);
  fragmento.appendChild(clone);

  const clone2 = document.importNode(template2, true);
  fragmento2.appendChild(clone2);
});

// Agregamos los fragmentos al documento
document.body.appendChild(fragmento);
document.getElementById("0").appendChild(fragmento2);

// Obtenemos los elementos del carrito
const carritoInteres = document.getElementById("interes");
const carritoPrecio = document.getElementById("interes2");
const carritoCantidad = document.getElementById("interes3");
const carritoPrecioTotal = document.getElementById("precioTotal");

// Obtenemos los botones de los productos
const btns = document.querySelectorAll('button[id^=idbot]');

// Función para buscar el título de un producto por su ID
function buscarTituloPorId(id) {
  const producto = datos.find((elem) => elem.id === id);
  return producto ? producto.titulo : '';
}

// Función para buscar el precio de un producto por su ID
function buscarPrecioPorId(id) {
  const producto = datos.find((elem) => elem.id === id); 
  return producto ? parseFloat(producto.precio) : 0;
  

}

// // Función para actualizar el carrito
// function actualizarCarrito() {
//   carritoInteres.innerHTML = '';
//   carritoPrecio.innerHTML = '';

//   let total = 0;
//   const productoMap = new Map();
//   interesAgregado.forEach((id) => {
//     const titulo = buscarTituloPorId(id);
//     const precio = buscarPrecioPorId(id);
//     total += precio;



//     if (productoMap.has(titulo)) {
//       productoMap.set(titulo, productoMap.get(titulo) + 1);
//     } else {
//       productoMap.set(titulo, 1);
//     }
//   });

//   productoMap.forEach((cantidad, titulo) => {
//     const parrafoInteres = document.createElement("p");
//     parrafoInteres.textContent = titulo;
//     carritoInteres.appendChild(parrafoInteres);

//     const parrafoPrecio = document.createElement("p");
//     parrafoPrecio.textContent = `$${buscarPrecioPorId(titulo)}`;
//     carritoPrecio.appendChild(parrafoPrecio);
  
//   });

//   carritoCantidad.innerHTML = '';
//   productoMap.forEach((cantidad, titulo) => {
//     const parrafoCantidad = document.createElement("p");
//     parrafoCantidad.textContent = cantidad;
//     carritoCantidad.appendChild(parrafoCantidad);
//   });

//   carritoPrecioTotal.textContent = `PRECIO TOTAL: $${total.toFixed(2)}`;
// }


function actualizarCarrito() {
  carritoInteres.innerHTML = '';
  carritoPrecio.innerHTML = '';

  let total = 0;
  const productoMap = new Map();
  interesAgregado.forEach((id) => {
    const titulo = buscarTituloPorId(id);
    const precio = buscarPrecioPorId(id);
    total += precio;

    if (productoMap.has(id)) {
      productoMap.set(id, productoMap.get(id) + 1);
    } else {
      productoMap.set(id, 1);
    }
  });

  productoMap.forEach((cantidad, id) => {
    const titulo = buscarTituloPorId(id);
    const parrafoInteres = document.createElement("p");
    parrafoInteres.textContent = titulo;
    prod+=titulo+" ,";
    carritoInteres.appendChild(parrafoInteres);

    const parrafoPrecio = document.createElement("p");
    const precio = buscarPrecioPorId(id);
    const precioTotal = precio * cantidad; // Calcula el precio total por cantidad
    parrafoPrecio.textContent = `$${precioTotal.toFixed(2)}`; // Muestra el precio total
    pre=`$${precioTotal.toFixed(2)}`
    carritoPrecio.appendChild(parrafoPrecio);
  });

  carritoCantidad.innerHTML = '';
  productoMap.forEach((cantidad, id) => {
    const parrafoCantidad = document.createElement("p");
    parrafoCantidad.textContent = cantidad;
    carritoCantidad.appendChild(parrafoCantidad);
  });

  carritoPrecioTotal.textContent = `PRECIO TOTAL: $${total.toFixed(2)}`;
tota=`PRECIO TOTAL: $${total.toFixed(2)}`



}




// Función para agregar un producto al carrito
function agregarProducto(id) {
  if (!interesAgregado.includes(id)) {
    interesAgregado.push(id);
    actualizarCarrito();
  }

  else if(interesAgregado.includes(id)) {
          interesAgregado.push(id);
          actualizarCarrito();
    

      
}}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
  const index = interesAgregado.indexOf(id);
  if (index !== -1) {
    interesAgregado.splice(index, 1);
    actualizarCarrito();
  }
}

// Asignamos los eventos a los botones
btns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const id = event.target.id;
    agregarProducto(id);
  });
});

// Agregamos eventos para eliminar productos del carrito
carritoInteres.addEventListener('click', (event) => {
  const parrafoInteres = event.target.closest('p');
  if (parrafoInteres) {
    const titulo = parrafoInteres.textContent;
    const id = datos.find((elem) => elem.titulo === titulo).id;
    eliminarProducto(id);
  }
});

carritoPrecio.addEventListener('click', (event) => {
  const parrafoPrecio = event.target.closest('p');
  if (parrafoPrecio) {
    const titulo = parrafoPrecio.textContent.slice(1); // Eliminamos el símbolo de $
    const id = datos.find((elem) => elem.titulo == titulo).id;
    eliminarProducto(id);
  }
});




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



// ...




// ...// ...


// Función para obtener el texto del carrito
function obtenerTextoCarrito() {
  let textoCarrito = "¡Hola! Estos son los productos en mi carrito:\n";

  interesAgregado.forEach((id) => {
    const producto = datos.find((dat) => dat.id === id);
    if (producto) {
      const { titulo, precio } = producto;
      textoCarrito += `- ${titulo}: $${precio}\n`;
    }
  });

  const total = interesPrecioAgregado.reduce((acc, precio) => acc + Number(precio), 0);
  textoCarrito += `\nPrecio Total: $${total.toFixed(2)}`;

  return encodeURIComponent(textoCarrito);
}

// ...

// Función para generar el enlace de WhatsApp
function generarEnlaceWhatsApp() {
  const textoCarrito = obtenerTextoCarrito();
  const telefono = "1125275189"; // Reemplaza con el número de teléfono deseado

  const enlace = `https://wa.me/${telefono}/?text=${textoCarrito}`;
  return enlace;
}

// Agregamos el enlace de WhatsApp al documento
const enlaceWhatsApp = document.createElement("a");
enlaceWhatsApp.setAttribute("href", generarEnlaceWhatsApp());
enlaceWhatsApp.textContent = "Mandar carrito por WhatsApp";
document.getElementById("whats").appendChild(enlaceWhatsApp);

// ...