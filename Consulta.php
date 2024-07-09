<?php
$servername = "localhost";
$username = "id21668647_emma";
$password = "Emma1101#";
$dbname = "id21668647_emma";


$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Lógica para eliminar la orden si se proporciona un ID de orden en la URL
if (isset($_GET['eliminar_id'])) {
    $eliminar_id = $_GET['eliminar_id'];
    $consulta_eliminar = "DELETE FROM ordenes WHERE id = $eliminar_id";
    $resultado_eliminar = $conn->query($consulta_eliminar);

    // Redirigir a la página principal después de la eliminación
    header("Location: {$_SERVER['PHP_SELF']}");
    exit();
}

// Consulta para obtener información combinada de compradores y órdenes
$consulta_combinada = "SELECT compradores.id as comprador_id, compradores.nombre as nombre_comprador, compradores.telefono, ordenes.id as orden_id, ordenes.producto, ordenes.talla, ordenes.precio
                      FROM compradores
                      INNER JOIN ordenes ON compradores.id = ordenes.comprador_id";
$resultado_combinado = $conn->query($consulta_combinada);

// Cerrar la conexión
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información de Compras</title>
</head>
<body>
    <h2>Información de Compras</h2>
    <table border="1">
        <tr>
            <th>Comprador</th>
            <th>Número de Teléfono</th>
            <th>Producto</th>
            <th>Talla</th>
            <th>Precio</th>
            <th>Acciones</th>
        </tr>
        <?php
        while ($row = $resultado_combinado->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['nombre_comprador']}</td>
                    <td>{$row['telefono']}</td>
                    <td>{$row['producto']}</td>
                    <td>{$row['talla']}</td>
                    <td>{$row['precio']}</td>
                    <td><a href='{$_SERVER['PHP_SELF']}?eliminar_id={$row['orden_id']}'>Eliminar</a></td>
                </tr>";
        }
        ?>
    </table>
</body>
</html>
