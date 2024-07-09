<?php

$servername = "localhost";
$username = "id21668647_emma";
$password = "Emma1101#";
$dbname = "id21668647_emma";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del comprador
    $buyerName = $_POST["buyer_name"];
    $buyerPhone = $_POST["buyer_phone"];
    $buyerEmail = $_POST["buyer_email"];
    $paymentMethod = $_POST["payment_method"];

    // Insertar datos del comprador en la tabla de compradores
    $sqlComprador = "INSERT INTO `compradores` (`nombre`, `telefono`, `correo`, `metodo_pago`) 
                     VALUES ('$buyerName', '$buyerPhone', '$buyerEmail', '$paymentMethod')";

    if ($conn->query($sqlComprador) === TRUE) {
        // Obtener el ID del comprador recién insertado
        $compradorId = $conn->insert_id;

        // Obtener datos de cada producto y agregarlo a la tabla de ordenes
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'product_name') !== false) {
                $index = substr($key, -1);
                $producto = $_POST["product_name_$index"];
                $talla = $_POST["product_size_$index"];
                $precio = $_POST["product_price_$index"];

                $sqlOrden = "INSERT INTO `ordenes` (`comprador_id`, `producto`, `talla`, `precio`) 
                             VALUES ('$compradorId', '$producto', '$talla', '$precio')";

                if ($conn->query($sqlOrden) !== TRUE) {
                    echo 'error: Error al procesar la orden: ' . $conn->error;
                    exit;
                }
            }
        }

        echo 'success: Orden completada. Le llegará un mensaje en unos instantes con información de su orden.';
    } else {
        echo 'error: Error al insertar datos del comprador: ' . $conn->error;
    }
}

$conn->close();
?>

