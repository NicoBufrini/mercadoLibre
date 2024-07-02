const guardarProductoLocalStorage = (producto) => {
    localStorage.setItem('productos', JSON.stringify(producto));
};

export default guardarProductoLocalStorage;