import obtenerProductosLocalStorage from "./obtenerProductosLocalStorage.js";
import guardarProductoLocalStorage from "./guardarProductosLocalStorage.js";
import compraExitosa from "./compraExitosa.js";

let formatoPlata = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
});

const carrito = () => {
    const productos = obtenerProductosLocalStorage();
    const div = document.getElementById("main-content");
    
    if (productos.length === 0) {
        div.innerHTML = '<h2>Productos del carrito</h2><h1>¡No hay productos en el carrito!</h1>';
    } else {
        let precioTotal = 0;
        let productosHTML = '<h2>Productos del carrito</h2>';

        productos.forEach(producto => {
            productosHTML += `
                <div class="productos_carrito">
                    <img class="imagen_carrito" src="${producto.image}" alt="${producto.title}">
                    <div class="producto_carrito">
                        <h3 class="titulo_carrito">${producto.title}</h3>
                        <p class="precio_carrito">Precio unitario: ${formatoPlata.format(producto.price)}</p>
                        <div class="quantity-selector">
                            <h3>Cantidad:</h3>
                            <input type="number" class="quantity" value="${producto.cantidad}" min="1">
                        </div>
                        <p>Total: ${formatoPlata.format(producto.price * producto.cantidad)}</p>
                        <button class="producto-comprar" data-id="${producto.id}">Comprar</button>
                        <button class="borrar_producto_carrito" data-id="${producto.id}">Borrar del carrito</button>
                    </div>
                </div>
            `;
            precioTotal += producto.price * producto.cantidad;
        });

        productosHTML += `<h3>Precio total: ${formatoPlata.format(precioTotal)}</h3>`;
        productosHTML += `<button class="producto-comprar-carrito">Comprar todo el carrito</button>`;
        
        div.innerHTML = productosHTML;

        // Eventos para comprar y borrar productos del carrito
        document.querySelectorAll('.producto-comprar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const producto = productos.filter(prod => prod.id !== id);
                guardarProductoLocalStorage(producto);
                alert('La compra se realizó correctamente.');
                carrito(); // Actualiza la interfaz de usuario del carrito
            });
        });

        document.querySelectorAll('.borrar_producto_carrito').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const producto = productos.filter(prod => prod.id !== id);
                guardarProductoLocalStorage(producto);
                carrito(); // Actualiza la interfaz de usuario del carrito
            });
        });

        // Evento para comprar todo el carrito
        document.querySelector('.producto-comprar-carrito').addEventListener('click', () => {
            compraExitosa();
        });
    }
};

export default carrito;
