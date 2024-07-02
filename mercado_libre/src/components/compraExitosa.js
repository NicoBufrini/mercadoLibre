import obtenerProductosLocalStorage from "./obtenerProductosLocalStorage.js";
import guardarProductoLocalStorage from "./guardarProductosLocalStorage.js";
import carrito from "./carrito.js";

const compraExitosa = () => {
    alert('¡¡Sus compras se realizaron exitosamente!! ')
    let productos = obtenerProductosLocalStorage();
    // Verifica si el objeto de productos existe
    if (productos) {
        // Si es un array, simplemente vacíalo
        if (Array.isArray(productos)) {
            productos.length = 0;
        } else {
            // Si es un objeto, elimina todas sus propiedades
            for (let key in productos) {
                if (productos.hasOwnProperty(key)) {
                    delete productos[key];
                }
            }
        }
        // Guarda el objeto vacío de nuevo en localStorage
        guardarProductoLocalStorage(productos);
        carrito();
    } else {
        console.log("No se encontraron productos en localStorage.");
    }

}

export default compraExitosa;