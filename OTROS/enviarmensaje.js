// let idd= ["0","1","2","3","4","5","6"];                
// let titulos=["sebas","sebas2","sebas3","sebas4","sebas5","sebas6"];
// let descripcion=["maquina pen","maquina bobina","maquina rotativa","maquina importada","maquina nacional","maquina asesina"];
// let precio=["11","22","333","444","55","66"];

// let div1 = document.createElement("div");
// div1.classList.add("tarjetas", "container");

// let div2 = document.createElement("div");
// div2.classList.add("row");

// let div3 = document.createElement("div");
// div3.classList.add("col-12");

// let div4 = document.createElement("div");
// div4.classList.add("card-group", "tarjetas2");
// div4.setAttribute("id", "contenededor");

// let div5 = document.createElement("div");
// div5.classList.add("card");
// div5.setAttribute("id", "targetAgregaC");

// let img = document.createElement("img");
// img.setAttribute("src", "IMG/LOGONEGRO.jpg");
// img.setAttribute("alt", "LOGONEGRO");

// let div6 = document.createElement("div");
// div6.classList.add("card-body");

// let h5 = document.createElement("h5");
// h5.classList.add("card-title");
// let textH5 = document.createTextNode("Maquinas Pen");

// let p = document.createElement("p");
// p.classList.add("card-text");
// let textP = document.createTextNode("Las maquinas pen son la nueva tendencia");

// let p2 = document.createElement("p");
// p2.classList.add("card-text");

// let small = document.createElement("small");
// small.classList.add("text-body-secondary");
// let textSmall = document.createTextNode("Reconocidas por su gran versatibilidad y estupendos resultados");


// div1.appendChild(div2);
// div2.appendChild(div3);
// div3.appendChild(div4);
// div4.appendChild(div5);
// div5.appendChild(img);
// div5.appendChild(div6);
// div6.appendChild(h5);
// h5.appendChild(textH5);
// div6.appendChild(p);
// p.appendChild(textP);
// div6.appendChild(p2);
// p2.appendChild(small);
// small.appendChild(textSmall);


// let fragmento =document.createDocumentFragment();



// titulos.forEach(val =>{
  
//     let div0 = document.createElement("div");
//     div0.setAttribute("id", val);

//     document.getElementById("contPrincipal").appendChild(div0);
//     document.getElementById(val).appendChild(div1);
//     console.log(val);
//     console.log(div0);
//     console.log(fragmento);

//     fragmento.appendChild(div0);
//     fragmento.getElementById(val).appendChild(div1);

// }

// ) 
// document.body.appendChild(fragmento);







// ESTE CODIGO A CONTINUACION LO HICE MEJORAR CON IA. PERO DEJO EL ORIGINAL PARA EL TP


// // Cargamos los templates del HTML y creamos los fragmentos
// const template = document.getElementById("contTemplate").content;
// const template2 = document.getElementById("contTemplate2").content;
// const fragmento = document.createDocumentFragment();
// const fragmento2 = document.createDocumentFragment();

// // Creamos arrays para guardar los intereses y precios de los productos agregados
// const interesAgregado = [];
// const interesPrecioAgregado = [];

// // Creamos el array con los datos de los productos
// const datos = [
//   {
//     id: "idbot0",
//     img: "IMG/LOGONEGRO.jpg",
//     titulo: "Maquinas nacionales",
//     descripcion: "Tu mejor opción",
//     precio: "66.33"
//   },
//   {
//     id: "idbot1",
//     img: "IMG/LOGOBLANCO.jpg",
//     titulo: "Maquinas importadas",
//     descripcion: "Calidad importada",
//     precio: "70.33"
//   },
//   // ...otros productos
// ];

// // Iteramos sobre los datos y agregamos los elementos al fragmento
// datos.forEach((dat) => {
//   template.querySelector(".esteSi").setAttribute("id", "0");

//   template2.querySelector("img").setAttribute("src", dat.img);
//   template2.querySelector("h5").textContent = dat.titulo;
//   template2.querySelector("p").textContent = dat.descripcion;
//   template2.querySelector("small").textContent = dat.precio;
//   template2.querySelector("button").setAttribute("id", dat.id);

//   const clone = document.importNode(template, true);
//   fragmento.appendChild(clone);

//   const clone2 = document.importNode(template2, true);
//   fragmento2.appendChild(clone2);
// });

// // Agregamos los fragmentos al documento
// document.body.appendChild(fragmento);
// document.getElementById("0").appendChild(fragmento2);

// // Obtenemos los elementos del carrito
// const carritoInteres = document.getElementById("interes");
// const carritoPrecio = document.getElementById("interes2");
// const carritoCantidad = document.getElementById("interes3");
// const carritoPrecioTotal = document.getElementById("precioTotal");

// // Obtenemos los botones de los productos
// const btns = document.querySelectorAll('button[id^=idbot]');

// // Función para buscar el título de un producto por su ID
// function buscarTituloPorId(id) {
//   const producto = datos.find((elem) => elem.id === id);
//   return producto ? producto.titulo : '';
// }

// // Función para buscar el precio de un producto por su ID
// function buscarPrecioPorId(id) {
//   const producto = datos.find((elem) => elem.id === id);
//   return producto ? parseFloat(producto.precio) : 0;
// }

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
//     parrafoPrecio.textContent = `$${buscarPrecioPorId(id)}`;
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

// // Función para agregar un producto al carrito
// function agregarProducto(id) {
//   if (!interesAgregado.includes(id)) {
//     interesAgregado.push(id);
//     actualizarCarrito();
//   }

//   else if(interesAgregado.includes(id)) {
//           interesAgregado.push(id);
//           actualizarCarrito();
    

      
// }}

// // Función para eliminar un producto del carrito
// function eliminarProducto(id) {
//   const index = interesAgregado.indexOf(id);
//   if (index !== -1) {
//     interesAgregado.splice(index, 1);
//     actualizarCarrito();
//   }
// }

// // Asignamos los eventos a los botones
// btns.forEach((btn) => {
//   btn.addEventListener('click', (event) => {
//     const id = event.target.id;
//     agregarProducto(id);
//   });
// });

// // Agregamos eventos para eliminar productos del carrito
// carritoInteres.addEventListener('click', (event) => {
//   const parrafoInteres = event.target.closest('p');
//   if (parrafoInteres) {
//     const titulo = parrafoInteres.textContent;
//     const id = datos.find((elem) => elem.titulo === titulo).id;
//     eliminarProducto(id);
//   }
// });

// carritoPrecio.addEventListener('click', (event) => {
//   const parrafoPrecio = event.target.closest('p');
//   if (parrafoPrecio) {
//     const titulo = parrafoPrecio.textContent.slice(1); // Eliminamos el símbolo de $
//     const id = datos.find((elem) => elem.titulo == titulo).id;
//     eliminarProducto(id);
//   }
// });




// //cargamos los valores de canvas y botones

// let canvasInteres = document.getElementById("offcanvasDark");

// let botonInteres = document.getElementById("listaInteres");

// //cambiamos el hide por show del canvas al apretar boton
// botonInteres.addEventListener("click", event => {

//     canvasInteres.classList.remove("hide", "show");

//     canvasInteres.classList.add("show");

// });

// //cambiamos el show por hide al apretar la x cerrar del canvas
// let botonInteresC = document.getElementById("cerrarCanvas");

// botonInteresC.addEventListener("click", event2 => {

//     canvasInteres.classList.replace("show", "hide");

// });


