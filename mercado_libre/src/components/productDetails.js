import agregarCarrito from "./agregarCarrito.js";

const displayProductDetails = (productId) => {
    fetch(`https://api.mercadolibre.com/items/${productId}`)
        .then(response => response.json())
        .then(product => {
            mainContent.innerHTML = ''; // Limpiar contenido anterior
            const productDetailsElement = document.createElement('div');
            productDetailsElement.classList.add('product-details');

            const title = document.createElement('h1');
            title.textContent = product.title;
            productDetailsElement.appendChild(title);

            let formatoPlata = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
            });

            const precio = document.createElement('p');
            precio.textContent = 'Precio: ' + formatoPlata.format(product.price);
            productDetailsElement.appendChild(precio);

            const descripcion = document.createElement('p');
            fetch(`https://api.mercadolibre.com/items/${productId}/description`)
                .then(response => response.json())
                .then(descriptionData => {
                    descripcion.textContent = descriptionData.plain_text;
                    productDetailsElement.appendChild(descripcion);
                })
                .catch(error => {
                    console.error('Error al obtener la descripción del producto:', error);
                });

            const backBtn = document.createElement('button');
            backBtn.className = "back-button";
            backBtn.textContent = "<- Volver a la Búsqueda";
            backBtn.addEventListener('click', () => {
                const query = searchInput.value.trim();
                searchProducts(query);
            });
            productDetailsElement.appendChild(backBtn);

            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Agregar al Carrito';
            addToCartBtn.addEventListener('click', () => {
                agregarCarrito(productId); // Llamada a la función agregarCarrito con el productId
            });
            productDetailsElement.appendChild(addToCartBtn);

            mainContent.appendChild(productDetailsElement);
        })
        .catch(error => {
            console.error('Error al obtener detalles del producto:', error);
        });
};

export default displayProductDetails;
