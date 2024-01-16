// Realiza la solicitud a la API
fetch('api.php')
  .then(response => response.json())
  .then(data => {
    // Manipula los datos recibidos, que serán un array de objetos
    console.log(data);
    // ... haz algo más con los datos aquí
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });