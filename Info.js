document.addEventListener('DOMContentLoaded', function () {
  const totalAmountElement = document.getElementById('total-amount');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const submitInfoBtn = document.getElementById('submit-info-btn');

  submitInfoBtn.addEventListener('click', function () {
    const buyerName = document.getElementById('buyer-name').value;
    const buyerPhone = document.getElementById('buyer-phone').value;
    const buyerEmail = document.getElementById('buyer-email').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Obtener datos del carrito desde localStorage
    const cartData = obtenerDatosDelCarrito();

    // Crear un formulario para cada producto y agregar campos
    cartData.forEach((item, index) => {
      const formData = new FormData();
      formData.append('buyer_name', buyerName);
      formData.append('buyer_phone', buyerPhone);
      formData.append('buyer_email', buyerEmail);
      formData.append('payment_method', paymentMethod);
      formData.append(`product_name_${index}`, item.name);
      formData.append(`product_size_${index}`, item.selectedSize);
      formData.append(`product_price_${index}`, item.price.toFixed(2));

      // Enviar datos al servidor y actualizar el carrito localmente
      enviarDatosAlServidor(formData);
    });

    // Opcional: Limpiar el carrito localmente después de completar la orden
    localStorage.removeItem('shoppingCart');

    // Opcional: Redirigir a la página principal
    window.location.href = 'index.html';
  });

  function obtenerDatosDelCarrito() {
    const cartData = localStorage.getItem('shoppingCart');
    return cartData ? JSON.parse(cartData) : [];
  }

  function enviarDatosAlServidor(formData) {
    fetch('guardar_datos.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.error('Su pedido se realizo con exito, pronto recibira un mensaje para validar y verificar sus datos y entregar su producto. Buen dia');
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // Manejar errores si es necesario
      });
  }

  function mostrarProductosEnCarrito(cartData) {
    let totalPrice = 0;

    // Limpiar el contenedor antes de agregar los productos
    cartItemsContainer.innerHTML = '';

    cartData.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item-info';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-info-image">
        <div class="cart-item-info-details">
          <p class="cart-item-info-name">${item.name} - Talla: ${item.selectedSize}</p>
          <p class="cart-item-info-price">$${item.price.toFixed(2)}</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);

      totalPrice += item.price;
    });

    totalAmountElement.textContent = totalPrice.toFixed(2);
  }

  // Mostrar productos del carrito al cargar la página
  mostrarProductosEnCarrito(obtenerDatosDelCarrito());
});
