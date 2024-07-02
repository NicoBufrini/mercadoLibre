import displayProductDetails from "./components/productDetails.js";
import carrito from "./components/carrito.js";
import exportCarrousel from "./components/carousel.js";

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const mainContent = document.getElementById('main-content');
    const featuredCarousel = document.getElementById('featured-carousel');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        searchProducts(query);
    });

    const boton_carrito = document.querySelector('.btn-carrito');
    boton_carrito.addEventListener("click", () => {
        carrito();
    });

    const searchProducts = (query) => {
        if (query === '') {
            displayFeaturedProducts();
        } else {
            fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    displayProducts(data.results);
                })
                .catch(error => {
                    console.error('Error al buscar productos:', error);
                });
        }
    };

    const displayProducts = (products) => {
        mainContent.innerHTML = '';
        products.forEach(product => {
            const productElement = createProductElement(product);
            mainContent.appendChild(productElement);
        });
    };

    const createProductElement = (product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Precio: ${formatoPlata.format(product.price)}</p>
            <button data-id="${product.id}" class="details-button">Detalles</button>
            <button data-id="${product.id}" class="add-to-cart-button">Agregar al Carrito</button>
        `;
        productElement.querySelector('.details-button').addEventListener('click', () => {
            const productId = product.id;
            displayProductDetails(productId);
        });
        productElement.querySelector('.add-to-cart-button').addEventListener('click', () => {
            const productId = product.id;
            agregarCarrito(productId);
        });
        return productElement;
    };

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

                mainContent.appendChild(productDetailsElement);
            })
            .catch(error => {
                console.error('Error al obtener detalles del producto:', error);
            });
    };

    const displayFeaturedProducts = () => {
        featuredCarousel.innerHTML = '';
        const carousel = exportCarrousel();
        featuredCarousel.appendChild(carousel);
    };

    let formatoPlata = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
});
