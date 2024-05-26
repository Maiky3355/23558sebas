<?php
// Configura la conexión a la base de datos MySQL
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "pdvvba";

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

// Ejecuta la consulta para obtener los datos
$query = "SELECT * FROM articulos_copy";  // Reemplaza "nombre_de_la_tabla" con el nombre de tu tabla
$result = $conn->query($query);

// Convierte los datos en un array de objetos
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Envía los datos como respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($data);

// Cierra la conexión
$conn->close();
?>