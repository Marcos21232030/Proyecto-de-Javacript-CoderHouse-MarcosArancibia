
document.addEventListener('DOMContentLoaded', function () {
    // Cargar productos desde el archivo JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            addCartListeners(data);
        });

    // Función para mostrar los productos en la página
    function displayProducts(products) {
        const productsList = document.getElementById('products-list');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img class="imagen-producto" src="${product.imagen}" alt="${product.nombre}">
                <h3 class="nombre-producto">${product.nombre}</h3>
                <p class="precio"s>$${product.precio.toFixed(3)}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
            `;
            productsList.appendChild(productElement);
        });
    }

    // Función para agregar listeners a los botones de "Agregar al Carrito"
    function addCartListeners(products) {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => addToCart(products, button.dataset.id));
        });
    }

    // Función para agregar un producto al carrito
    function addToCart(products, productId) {
        const selectedProduct = products.find(product => product.id === productId);

        if (selectedProduct) {
            const cartList = document.getElementById('cart-list');
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${selectedProduct.nombre} - $${selectedProduct.precio.toFixed(2)}</span>
                <button class="remove-from-cart" data-id="${selectedProduct.id}">X</button>
            `;
            cartList.appendChild(cartItem);

            updateTotal(products);
        }
    }

    // Función para actualizar el total del carrito
    function updateTotal(products) {
        const cartItems = document.querySelectorAll('#cart-list li span');
        let total = 0;

        cartItems.forEach(item => {
            const productId = item.nextSibling.dataset.id;
            const product = products.find(product => product.id === productId);

            if (product) {
                total += product.precio;
            }
        });


    }

    // Event listener para vaciar el carrito
    document.getElementById('empty-cart').addEventListener('click', () => {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        updateTotal([]);
    });

    // Event listener para comprar
    document.getElementById('buy-button').addEventListener('click', () => {
        const cartList = document.getElementById('cart-list');
        if (cartList.children.length === 0) {
            alert('El carrito está vacío');
        } else {
            alert('Gracias por tu compra! Que disfrutes tu consola.');
            cartList.innerHTML = '';
            updateTotal([]);
        }
    });

    // Event listener para eliminar un producto del carrito
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = e.target.dataset.id;
            const cartItem = e.target.parentNode;
            cartItem.parentNode.removeChild(cartItem);

            updateTotal(products);
        }
    });
});
