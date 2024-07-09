document.addEventListener('DOMContentLoaded', function () {
  const productList = document.getElementById('product-list');
  const cart = document.getElementById('cart');
  const cartItems = document.getElementById('cart-items');
  const totalAmountElement = document.getElementById('total-amount');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const placeOrderBtn = document.getElementById('place-order-btn');

  const products = [
    { id: 1, name: 'Tenis Para Dama', price: 349, image: 'Media/BlancoNaranja.jpg', sizes: ['2', '2.5', '3'] },
    { id: 2, name: 'Tenis Para Hombre Negros', price: 349, image: 'Media/HNegro.jpg', sizes: ['4.5', '5', '5'] },
    { id: 3, name: 'Zapatos Moda Osos Zapatos Mujer', price: 349, image: 'Media/NegroConv.jpg', sizes: ['4', '4.5'] },
    { id: 4, name: 'Lonchera Toper Hermetico', price: 169, image:'Media/Toper.jpg', sizes: ['.'] },
    { id: 5, name: 'Lonchera Toper Hermetico acero inoxidable', price: 189, image:'Media/Lunch.jpg', sizes: ['.'] },
    { id: 6, name: 'Lonchera Portatil Box', price: 199, image:'Media/Topper.jpg', sizes: ['Azul','Verde'] },
    { id: 7, name: 'Toalla de Baño 70x140', price: 159, image:'Media/Tcolor.jpg', sizes: ['Blanco','Azul Claro','Marron','Marron Claro','Rosa'] },
    { id: 8, name: '2 Pack Toalla de Baño 35x75', price: 219, image:'Media/T2pz.jpg', sizes: ['Blanco','Rosa'] },
    { id: 9, name: 'Toalla Para Bebe Animales', price: 159, image:'Media/Tniños.jpg', sizes: ['Azul','Blanco','Marron','Celeste','Rosa'] },
    { id:10, name: 'Playera Estampado California 91', price: 209, image: 'Media/P2.jpg', sizes: ['S', 'M', 'G', 'XL'] },
    { id:11, name: 'Playera Estampado California 91', price: 209, image: 'Media/P1.jpg', sizes: ['M', 'G', 'XL'] },
    { id:12, name: 'Playera Manga Larga Estampada', price: 209, image: 'Media/P3.jpg', sizes: ['S', 'G', 'XL'] },
    { id:11, name: 'Playera Manga Larga Estampada', price: 209, image: 'Media/P4.jpg', sizes: [ 'G', 'XL'] },
    { id:12, name: 'Sandalia Confort Moda Vacas', price: 199, image: 'Media/Sandalias.jpg', sizes: ['2.5', '3', '3.5','4','4.5'] },
    { id:13, name: 'SandaliaDisnosaurios Para niño', price: 199, image: 'Media/crockboy.jpg', sizes: ['17'] },

  ];

  const shoppingCart = [];

  function addToCart(product, selectedSize) {
    shoppingCart.push({ ...product, selectedSize });
    updateCart();
  }

  function removeFromCart(index) {
    shoppingCart.splice(index, 1);
    updateCart();
  }

  function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    shoppingCart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <p class="cart-item-name">${item.name} - Talla: ${item.selectedSize}</p>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <button class="remove-from-cart-btn" data-index="${index}">Eliminar</button>
          </div>
        </div>
      `;
      cartItems.appendChild(listItem);

      totalPrice += item.price;
    });

    totalAmountElement.textContent = totalPrice.toFixed(2);

    // Guardar el carrito en localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        removeFromCart(index);
      });
    });
  }

  function displayProducts() {
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <p>Precio: $${product.price}</p>
        <label for="size-${product.id}">Talla:</label>
        <select id="size-${product.id}" class="size-select">
          ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
        </select>
        <button class="add-to-cart-btn">Agregar al carrito</button>
      `;
      productList.appendChild(productElement);

      const addToCartButton = productElement.querySelector('.add-to-cart-btn');
      addToCartButton.addEventListener('click', function () {
        const selectedSize = productElement.querySelector('.size-select').value;
        addToCart(product, selectedSize);
      });
    });
  }

  // Llamada para mostrar la lista de productos
  displayProducts();

  cartToggleBtn.addEventListener('click', function () {
    cart.classList.toggle('hide-cart');
  });


  
  placeOrderBtn.addEventListener('click', function () {
    if (shoppingCart.length > 0) {
      const cartData = JSON.stringify(shoppingCart);
      document.cookie = `shoppingCart=${cartData}; expires=${new Date(Date.now() + 1).toUTCString()}; path=/`;
      window.location.href = 'info.html';
    } else {
      alert('El carrito está vacío. Agrega productos antes de realizar un pedido.');
    }
  });
});