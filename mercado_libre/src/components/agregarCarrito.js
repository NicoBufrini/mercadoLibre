import carrito from "./carrito.js";
import obtenerProductosLocalStorage from "./obtenerProductosLocalStorage.js";
import guardarProductoLocalStorage from "./guardarProductosLocalStorage.js";

const agregarCarrito = (productId) => {
    fetch(`https://api.mercadolibre.com/items/${productId}`)
        .then(response => response.json())
        .then(product => {
            let id = product.id;
            let title = product.title;
            let image = product.thumbnail;
            let price = product.price;
            let cantidad = document.getElementById('quantity').value || 1;

            let obtenerProductos = obtenerProductosLocalStorage();

            const productoExistente = obtenerProductos.find(prod => prod.id === id);
            if (productoExistente) {
                alert('El producto ya existe en el carrito.');
            } else {
                obtenerProductos.push({ id, title, image, price, cantidad });
                guardarProductoLocalStorage(obtenerProductos);
                
                alert("El producto se guardó con éxito en el carrito.");
                carrito(); // Actualiza la interfaz de usuario del carrito
            }
        })
        .catch(error => {
            console.error('Error al agregar producto al carrito:', error);
            alert('Hubo un problema al agregar el producto al carrito. Por favor, inténtalo nuevamente.');
        });
};

export default agregarCarrito;
