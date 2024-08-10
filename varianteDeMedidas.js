// let template2 = document.getElementById("contTemplate2").content;//por las dudas lo pongo aca
import * as eliminarDelDom from './eliminarDelDom.js'








export function AgregaVariantes(datos, template2) {

  var selectElement5 = template2.querySelector('.tVariante');
  var selectElement4 = template2.querySelector('.tMedida');


  const categoriasValidas = ["CARTUCHOS", "AGUJAS", "PUNTERAS"];

  // Verificamos si la categoría NO está en la lista de categorías válidas
  if (!categoriasValidas.includes(datos.Categoria)) {

    eliminarDelDom.removeElements([selectElement4, selectElement5]);

  } else {

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










export function cambiarVariantes() {
  const selects = document.querySelectorAll('select[id^=med]');

  selects.forEach(select => {
    select.addEventListener('change', event => {
      const id = event.target.id;

      if (!event.target) {
        console.error(`El elemento select con ID "${event.target.Id}" no existe.`);
        return;
      }
      let selectElement7 = document.getElementById(id); // Obtener el elemento select por su id
      var varied = selectElement7.value; // Obtener el valor seleccionado del elemento select

      var regex = /(\d+)/g;
      var id2 = (id.match(regex));

      const selectElement77 = document.getElementById("var" + id2); // Obtener el elemento select por su id


      switch (varied) {
        case '1':
          // Aquí puedes realizar acciones específicas para la opción

          // Crear las nuevas opciones
          let nuevasOpcionesRL = '<option value="1">1</option>' +
            '<option value="3">3</option>' +
            '<option value="5">5</option>' +
            '<option value="7">7</option>' +
            '<option value="9">9</option>' +
            '<option value="11">11</option>' +
            '<option value="13">13</option>' +
            '<option value="15">15</option>';

          // Asignar las opciones al select
          selectElement77.innerHTML = nuevasOpcionesRL;


          break;
        case '2':
          // Acciones para la opción 2


          // Crear las nuevas opciones
          let nuevasOpcionesM1 = '<option value="7">7</option>' +
            '<option value="9">9</option>' +
            '<option value="11">11</option>' +
            '<option value="13">13</option>' +
            '<option value="15">15</option>';

          // Asignar las opciones al select
          selectElement77.innerHTML = nuevasOpcionesM1;

          break;
        case '3':
          // ...

          // Crear las nuevas opciones
          let nuevasOpcionesRM = '<option value="7">7</option>' +
            '<option value="9">9</option>' +
            '<option value="11">11</option>' +
            '<option value="13">13</option>' +
            '<option value="15">15</option>';

          // Asignar las opciones al select
          selectElement77.innerHTML = nuevasOpcionesRM;


          break;
        case '4':
          // ...

          // Crear las nuevas opciones
          let nuevasOpcionesRS = '<option value="7">7</option>' +
            '<option value="9">9</option>' +
            '<option value="11">11</option>';

          // Asignar las opciones al select
          selectElement77.innerHTML = nuevasOpcionesRS;


          break;
        default:
          console.log('Opción no válida');
          break;
      }

    }
    )
  })
}