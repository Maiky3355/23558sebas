

//import { datos } from './jADatos.js'; SACAMOS ESTE Y PROBAMOS CON EL FETCH
import datos from './jADatos.js';





export function porDeDescuento() {
  //EN EL SIGUIENTE CODIGO VEMOS LA ID DE IMAGEN Y AGREGAMOS AVISO DE DESCUENTO CORRESPONDIENTE AL PRODUCTO

  // Obtener todas las imágenes con id que comienzan con "img"
  const imageElements = document.querySelectorAll('[id^="img"]');

  // Iterar sobre cada imagen
  imageElements.forEach((imgElement) => {
    // Obtener el valor numérico del ID de la imagen
    const imageId = parseInt(imgElement.id.replace("img", ""));

    // Buscar el valor de descuento en el objeto "datos"
    let discountValue = datos.find(item => item.Artículo === imageId)?.Descuento;
    // Antes se comparaba el string tal cual contra 0 ("0,00" != 0 da
    // true, porque Number("0,00") es NaN en JS -la coma no es el
    // separador decimal que espera-, y NaN != 0 también es true). Un
    // descuento guardado como "0,00" mostraba igual el cartel de
    // "% OFF". Normalizamos la coma a punto ANTES de comparar.
    if (discountValue != null && Number(discountValue.replace(/,/g, ".")) !== 0) {
      discountValue = (discountValue.replace(/,/g, ".")) * 100;
      discountValue = discountValue.toFixed(0);
      // Crear el elemento de texto
      const textElement = document.createElement('span');
      textElement.classList.add('text-overlay');
      textElement.textContent = discountValue + "% OFF";

      // Posicionar el texto dentro de la imagen
      textElement.style.position = 'absolute';
      textElement.style.top = '15%';
      textElement.style.left = '87%';
      textElement.style.transform = 'translate(-50%, -50%)';
      textElement.style.borderRadius = '50%';
      textElement.style.backgroundColor= 'rgba(200, 50, 100, 0.5)';
      textElement.style.opacity = '50%';

      // Agregar el texto al contenedor de la imagen
      imgElement.parentElement.appendChild(textElement);
    }
  });

}
