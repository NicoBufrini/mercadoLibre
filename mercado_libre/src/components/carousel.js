const exportCarrousel = (productId) => {
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    const carousel = document.createElement('div');
    carousel.className = 'carousel-inner';
    carouselContainer.appendChild(carousel);

    const prevButton = document.createElement('button');
    prevButton.className = 'prev';
    prevButton.textContent = '❮';
    carouselContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.className = 'next';
    nextButton.textContent = '❯';
    carouselContainer.appendChild(nextButton);

    let index = 0;

    // Función para obtener las imágenes de la API
    async function fetchImages() {
        try {
            const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
            const data = await response.json();
            const imagenes = data.pictures;
            return imagenes;
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
        }
    }

    // Función para crear los elementos del carrusel
    function createCarouselItems(images) {
        images.forEach((image, i) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${i === 0 ? 'active' : ''}`;
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = `Imagen ${i + 1}`;
            item.appendChild(img);
            carousel.appendChild(item);
        });
    }

    // Función para mostrar el elemento actual del carrusel
    function showItem(n) {
        const items = carousel.querySelectorAll('.carousel-item');
        if (n >= items.length) {
            index = 0;            
        } else if (n < 0) {
            index = items.length - 1;
        } else {
            index = n;
        }
        carousel.style.transform = `translateX(-${index * 100}%)`;        
    }

    // Configurar los botones de navegación
    prevButton.addEventListener('click', () => {
        showItem(index - 1);
    });

    nextButton.addEventListener('click', () => {
        showItem(index + 1);
    });

    // Inicializar el carrusel con las imágenes de la API
    fetchImages().then(images => {
        if (images) {
            createCarouselItems(images);
        }
    });

    return carouselContainer;
};

export default exportCarrousel;
