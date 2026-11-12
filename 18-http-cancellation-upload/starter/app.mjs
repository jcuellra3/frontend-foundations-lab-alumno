const searchInput = document.querySelector('[data-search]');
const searchStatus = document.querySelector('[data-search-status]');
const results = document.querySelector('[data-results]');
const uploadForm = document.querySelector('[data-upload-form]');
const uploadStatus = document.querySelector('[data-upload-status]');
const uploadButton = uploadForm.querySelector('[data-upload-button]');

let currentController = null;

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

async function searchProducts(query) {
  //Se cancela la busqueda anterior cuando llega una nueva consulta.
  if (currentController) {
    currentController.abort();
  }

  const controller = new AbortController();
  currentController = controller;

  searchStatus.textContent = 'Buscando...';

  try {
    const cleanQuery = query.trim();
    const url = cleanQuery
      ? `/api/products?search=${encodeURIComponent(cleanQuery)}`
      : '/api/products';

    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error('Error en la búsqueda');
    }

    const data = await response.json();
    let items;

    //La API puede devolver directamente una lista o un objeto con la propiedad "items".
    if (Array.isArray(data)) {
      items = data;
    } else {
      items = data.items || [];
    }

    // Una petición antigua no debe reemplazar los resultados de la más reciente.
    if (controller === currentController) {
      results.innerHTML = items
        .map((item) => `<li>${item.name || item.title}</li>`)
        .join('');
      searchStatus.textContent = `${items.length} resultados`;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }
    searchStatus.textContent = 'Error al cargar los productos.';
  }
}

async function uploadFile(event) {
  event.preventDefault();

  //FormData recoge los campos y el archivo.
  const formData = new FormData(uploadForm);
  uploadButton.disabled = true;
  uploadStatus.textContent = 'Subiendo archivo...';

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error en la subida');
    }

    const data = await response.json();
    const bytes = data.receivedBytes ?? data.bytes ?? data.size ?? '';
    uploadStatus.textContent = `Archivo subido (${bytes} bytes)`;
    uploadForm.reset();
  } catch (error) {
    uploadStatus.textContent = 'Error al subir el archivo.';
  } finally {
    uploadButton.disabled = false;
  }
}

const debouncedSearch = debounce((value) => searchProducts(value), 250);

searchInput.addEventListener('input', () => debouncedSearch(searchInput.value));
uploadForm.addEventListener('submit', uploadFile);