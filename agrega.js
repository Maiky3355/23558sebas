

//cargamos los template del html y creamos los fragmentos
let template = document.getElementById("contTemplate").content;
let fragmento = document.createDocumentFragment();

let template2 = document.getElementById("contTemplate2").content;
let fragmento2 = document.createDocumentFragment();


//creamos un array para guardar los intereses
let interesAgregado = [];

//creamos un array para guardar los precios
let interesPrecioAgregado = [];


//creamos el array con los datos
const datos = [{
    id: "idbot0",
    img: "IMG/LOGONEGRO.jpg",
    titulo: "Maquinas nacionales",
    descripcion: "Tu mejor opcion",
    precio: "66.33"
},
{

    id: "idbot1",
    img: "IMG/LOGOBLANCO.jpg",
    titulo: "Maquinas importadas",
    descripcion: "Calidad importada",
    precio: "70.33"
},
{
    id: "idbot2",
    img: "IMG/LOGONEGRO.jpg",
    titulo: "logo",
    descripcion: "compranos aqui",
    precio: "00.00"
},
{
    id: "idbot3",
    img: "IMG/LOGOBLANCO.jpg",
    titulo: "logo44",
    descripcion: "compranos aqui",
    precio: "00.01"
},
{
    id: "idbot4",
    img: "IMG/LOGONEGRO.jpg",
    titulo: "logo299",
    descripcion: "compranos aqui2",
    precio: "22.02"
},
{
    id: "idbot5",
    img: "IMG/LOGOBLANCO.jpg",
    titulo: "logo292",
    descripcion: "compranos aqui2",
    precio: "28.02"
},
{
    id: "idbot6",
    img: "IMG/LOGONEGRO.jpg",
    titulo: "logo022",
    descripcion: "compranos aqui2",
    precio: "20.62"
},
{
    id: "idbot7",
    img: "IMG/LOGOBLANCO.jpg",
    titulo: "logo232",
    descripcion: "compranos aqui2",
    precio: "20.02"
},
{
    id: "idbot8",
    img: "IMG/LOGONEGRO.jpg",
    titulo: "logo777",
    descripcion: "compranos aqui2",
    precio: "20.82"
}
];

let contenedorId = 0;
//por cada uno de los conjuntos de datos agregamos las variantes de cada etiqueta
datos.forEach((dat) => {
    template.querySelector(".esteSi").setAttribute("id", contenedorId);

    template2.querySelector("img").setAttribute("src", dat.img);
    template2.querySelector("h5").textContent = (dat.titulo);
    template2.querySelector("p").textContent = (dat.descripcion);
    template2.querySelector("small").textContent = (dat.precio);
    template2.querySelector("button").setAttribute("id", dat.id);

    //hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes
    let clone = document.importNode(template, true);
    fragmento.appendChild(clone);

    let clone2 = document.importNode(template2, true);
    fragmento2.appendChild(clone2);




});

document.body.appendChild(fragmento);//agregamos el contenedor padre
document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards


let totalCarritoNavb = document.getElementById("totalCarritoNavb");
//cargamos a interes la etiqueta donde mostraremos el titulo de producto
const interes = document.getElementById("interes");

//cargamos a interes2 la etiqueta donde mostraremos el precio unitario
const interes2 = document.getElementById("interes2");


//cargamos a interes2 la etiqueta donde mostraremos la cantidad
const interes3 = document.getElementById("interes3");

//cargamos a interes2 la etiqueta donde mostraremos el precio total
const intprecioTotal = document.getElementById("precioTotal");


//ponemos a escuchar todos los botones y mandamos a agregar los datos

const btns = document.querySelectorAll('button[id^=idbot]');

btns.forEach(btn => {



    btn.addEventListener('click', event => {


        da = event.target.id;

        let tit = buscarId(da);
        let pre = buscarIdPrecio(da);

        agregar(tit);
        agregarP(pre);
        agregarC();
        EliminarV();
        total();
        // let sumaTotal = 0;
        // interesPrecioAgregado.forEach(tot => {

        //     sumaTotal += Number(tot);


        //     intprecioTotal.textContent = "PRECIO TOTAL: $ " + sumaTotal;
        // });

    });

});

//buscamos el id y ponemos el titulo
function buscarId(id) {
    const found = datos.find(elem => elem.id == id);

    return found.titulo;
};

//buscamos el id y ponemos el precio
function buscarIdPrecio(id) {
    const found = datos.find(elem => elem.id == id);

    console.log(found.precio);
    return found.precio;
};




//agregamos a la lista el titulo a precionar de cada boton
function agregar(da) {

    interesAgregado.push(da);

    let suceso = "Se agrego al carrito";
    let tipoAlert = "alert-success";
    alertAgrego(da, suceso, tipoAlert);


    const conjuntoExistente = new Set();

    interesAgregado.forEach(ia => {

        const parrafoExistente = Array.from(interes.getElementsByTagName("p")).find(
            parrafo => parrafo.textContent === ia);

        if (parrafoExistente) {
            parrafoExistente.textContent = ia;

        }
        else {
            const parrafo = document.createElement("p");
            parrafo.textContent = ia;
            interes.appendChild(parrafo);
        };
    });

};




//calculamos el precio total y lo mostramos en canvas
function total() {

    let sumaTotal = 0;
    interesPrecioAgregado.forEach(tot => {

        sumaTotal += Number(tot);


    });
    intprecioTotal.textContent = "PRECIO TOTAL: $ " + sumaTotal.toFixed(2);
    totalCarritoNavb.textContent = "$ " + sumaTotal.toFixed(2);
};

//agregamos el precio unitario
function agregarP(da) {

    interesPrecioAgregado.push(da);
    console.log("Se agregó " + da);

    const conjuntoExistente = new Set();

    interesPrecioAgregado.forEach(ia => {
        const parrafoExistente = Array.from(interes2.getElementsByTagName("p")).find(
            parrafo => parrafo.textContent === ia
        );

        if (parrafoExistente) {
            parrafoExistente.textContent = ia;
        } else {
            const parrafo = document.createElement("p");
            parrafo.textContent = ia;
            interes2.appendChild(parrafo);
        }

        conjuntoExistente.add(ia); // Agregar el valor al conjunto existente
    });

    // Eliminar los párrafos sobrantes del contenedor
    Array.from(interes2.getElementsByTagName("p")).forEach(parrafo => {
        if (!conjuntoExistente.has(parrafo.textContent)) {
            interes2.removeChild(parrafo);

        };
    });
};







//agregamos la cantidad de cada producto

function agregarC() {

    const repeticionesMap = new Map();

    interesAgregado.forEach(dato => {
        if (repeticionesMap.has(dato)) {
            // Incrementar la cantidad de repeticiones para el dato existente
            repeticionesMap.set(dato, repeticionesMap.get(dato) + 1);
        } else {
            // Inicializar la cantidad de repeticiones para un nuevo dato
            repeticionesMap.set(dato, 1);
        };
    });

    // Crear el contenido para el párrafo interes3
    let contenidoInteres3 = "";
    repeticionesMap.forEach((repeticiones, dato) => {
        contenidoInteres3 += `<p id="${dato}"> ${repeticiones}</p>`;
    });

    // Agregar o reemplazar el contenido en el elemento con id="interes3"
    interes3.innerHTML = contenidoInteres3;
};













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





//eliminamos las ventas que tocamos
function EliminarV() {


    const parrafos = interes.querySelectorAll('p');

    parrafos.forEach(parrafo => {
        parrafo.addEventListener('click', event => {
            // const dato = parrafo.textContent;
            const dato = event.target.textContent;
            //hacemos visible el alert con su titulo y color
            let suceso = "Se elimino del carrito";
            let tipoAlert = "alert-danger";
            alertAgrego(dato, suceso, tipoAlert);

            const index = interesAgregado.indexOf(dato);


            if (index > -1) {

                interesAgregado.splice(index, 1);
                interesPrecioAgregado.splice(index, 1);

                actualizarCarrito();

            }
            else {
                console.log("no se elimino");

            };


            // Eliminar el elemento <p> del contenedor
            parrafo.parentNode.removeChild(parrafo);
        });
    });


};





//actualizamos el carrito

function actualizarCarrito() {
    total();
    agregarC();
    const conjuntoExistente = new Set();

    interesPrecioAgregado.forEach(ia => {
        const parrafoExistente = Array.from(interes2.getElementsByTagName("p")).find(
            parrafo => parrafo.textContent === ia
        );

        if (parrafoExistente) {
            parrafoExistente.textContent = ia;
        } else {
            const parrafo = document.createElement("p");
            parrafo.textContent = ia;
            interes2.appendChild(parrafo);
        }

        conjuntoExistente.add(ia); // Agregar el valor al conjunto existente
    });

    // Eliminar los párrafos sobrantes del contenedor
    Array.from(interes2.getElementsByTagName("p")).forEach(parrafo => {
        if (!conjuntoExistente.has(parrafo.textContent)) {
            interes2.removeChild(parrafo);

        };
    });
};



//funcion alert personalizada

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

    alertAgrego.classList.remove("alert-success", "alert-danger");
    alertAgrego.classList.add(tipoAlert);

    alertAgrego.classList.add("show");

    //Colocamos el timpo del alert antes de desactivarse
    setTimeout(() => {
        alertAgrego.classList.remove("hide", "show");

        alertAgrego.classList.add("hide");


    }, 2000);





function cargarDatosBack(){

    
}



};
