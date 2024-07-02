const obtenerProductosLocalStorage = () => {
    const productosString = localStorage.getItem('productos');
    return productosString ? JSON.parse(productosString) : [];
};

export default obtenerProductosLocalStorage;