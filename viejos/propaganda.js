


// import data from './jADatos.js';

// export function propagandaAlAzar(){
//     const propaganda = document.getElementById("propaganda");
  
//   // Obtener los últimos 5 elementos del array
//   let ultimosCinco = data.slice(-6);
  
//   // Seleccionar un elemento aleatorio de los últimos 5
//   const indiceAleatorio = Math.floor(Math.random() * ultimosCinco.length);
//   switch (true) {
//     case "indiceAleatorio.Inventario <= 1":
      
//       break;
  
//     default:
//       break;
  
//   }
  
  
//     const articulo = ultimosCinco[indiceAleatorio].Artículo;
//     const descripcion= ultimosCinco[indiceAleatorio].Descripción;
//     const Categoria = ultimosCinco[indiceAleatorio].Categoria;
//     const Marca = ultimosCinco[indiceAleatorio].Marca;
//     const Inventario = ultimosCinco[indiceAleatorio].Inventario;
    
    
//     const small = propaganda.querySelector("small");
//     small.textContent= "En: "+ Categoria
    
    
//     const parrafo = propaganda.querySelector("b");
//     // Asignar el artículo aleatorio al contenido del párrafo
//     parrafo.textContent =Marca
//     // Obtener el párrafo donde queremos mostrar el resultado
//     const parrafo2 = propaganda.querySelector("p");
//     // Asignar el artículo aleatorio al contenido del párrafo
//     parrafo2.textContent = descripcion;
    
    
    
//     const imagen = propaganda.querySelector("img");
//     // Asignar el artículo aleatorio al contenido del párrafo
//     imagen.src = "./imgcarrito/" + (articulo) + ".jpg";
  
  
//    }; 
  
  
  
  
//   //  const toast = document.getElementById('propaganda');
  
//   //  setTimeout(() => {
//   //      toast.parentNode.removeChild(toast);
//   //  }, 10000);
  
  
  
  
  
  
  
//   let isToastClosed = false;
  
//   const toast = document.getElementById('propaganda');
//   const countdownElement = toast.querySelector('li'); // Suponiendo que el elemento small contiene la cuenta regresiva
//   const toast2 = document.getElementById('propagandaPadre');
//   let timeLeft = 10; // Tiempo en segundos
  
//   const countdownInterval = setInterval(() => {
//       countdownElement.textContent = timeLeft + ' segundos';
//       timeLeft--;
  
//       if (timeLeft < 0 ) {
//           clearInterval(countdownInterval);
//           toast.style.opacity = 0;
//           setTimeout(() => {
//             if (timeLeft < 0 && !isToastClosed) {
//               // ... código para cerrar el toast
//               toast2.parentNode.removeChild(toast2);
//             }
            
             
  
//           }, 500);
//       }
//   }, 1000);
  
  
  
//   // obtiene el elemento padre a cerrar de propaganda
//   const propagandaPadre = document.getElementById('propagandaPadre');
  
//   // obtiene los botones dentro 
//   const buttons = propagandaPadre.querySelectorAll('button');
  
//   // agregamos evento click a los botones
//   buttons.forEach(button => {
//     button.addEventListener('click', () => {
//       // borramos el elemento padre y ponemos bandera para saber que se cerro
//       propagandaPadre.remove();
//        isToastClosed = true;
  
//     });
//   });
  
  
  
  
  
  