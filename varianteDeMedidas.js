// let template2 = document.getElementById("contTemplate2").content;//por las dudas lo pongo aca
import * as eliminarDelDom from './eliminarDelDom.js'
export function AgregaVariantes(datos, template2){

var selectElement5 = template2.querySelector('.tVariante');
var selectElement4 = template2.querySelector('.tMedida');


const categoriasValidas = ["CARTUCHOS", "AGUJAS", "PUNTERAS"];

// Verificamos si la categoría NO está en la lista de categorías válidas
if (!categoriasValidas.includes(datos.Categoria)) {
  console.log("La categoría es válida (no es Cartuchos, Agujas o Punteras).");
 

  eliminarDelDom.removeElements([selectElement4, selectElement5]);


}else {

    eliminarDelDom.removeElements([selectElement4, selectElement5]);
  var selectElement5 = template2.querySelector('.tVariante');
  var selectElement4 = template2.querySelector('.tMedida');
  if (selectElement4 == null && selectElement5 == null) {



  

    const selectElement77 = document.createElement('select');
    selectElement77.classList.add('tMedida');
    selectElement77.setAttribute("id", "med" + (datos.Artículo));
    
    template2.querySelector('.variantes').appendChild(selectElement77);




    const selectElement7 = document.createElement('select');
    selectElement7.classList.add('tVariante');
    selectElement7.setAttribute("id", "var" + (datos.Artículo));

    template2.querySelector('.variantes').appendChild(selectElement7);


  }

  var selectElement5 = template2.querySelector('.tVariante');
  var selectElement4 = template2.querySelector('.tMedida');



  // Crear las nuevas opciones
  let nuevasOpciones = '<option value="1">RL</option>' +
    '<option value="2">M1</option>' +
    '<option value="3">RM</option>' +
    '<option value="4">RS</option>';

  // Asignar las opciones al select
  selectElement4.innerHTML = nuevasOpciones;

  // Crear las nuevas opciones
  let nuevasOpciones2 = '<option value="1">1</option>' +
    '<option value="3">3</option>' +
    '<option value="5">5</option>' +
    '<option value="7">7</option>' +
    '<option value="9">9</option>' +
    '<option value="11">11</option>' +
    '<option value="13">13</option>' +
    '<option value="15">15</option>';

  // Asignar las opciones al select
  selectElement5.innerHTML = nuevasOpciones2;







}
}



