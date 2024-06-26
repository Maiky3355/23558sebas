//EL PRIMERO ES EL ORIGINAL
// //creamos el array con los datos
// import data from './articulos.json' with { type: 'json' };

// //creamos el array datos con los datos del json
// export const datos = Array.from(data);






// Cargar los datos desde el JSON

// export let datos;

// fetch('articulos.json')
//   .then(response => response.json())
//   .then(data => {
//     // Crear el array de datos
//     datos = Array.from(data);

//     // Hacer algo con los datos
//     console.log(datos);
//   })
//   .catch(error => {
//     console.error('Error al cargar los datos:', error);
//   });





// jADatos.js
// Cargar el archivo JSON
const data = JSON.parse(await (await window.fetch('./articulos.json')).text());


// Crear el array de datos

// Exportar el array de datos
export default data;