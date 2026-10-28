const searchInput = document.querySelector('[data-search]');
const searchStatus = document.querySelector('[data-search-status]');
const results = document.querySelector('[data-results]');
const uploadForm = document.querySelector('[data-upload-form]');
const uploadStatus = document.querySelector('[data-upload-status]');

function debounce(callback, delay) {
  // TODO
  return callback;
}

async function searchProducts(query) {
  // TODO: cancela la anterior con AbortController.
}

async function uploadFile(event) {
  event.preventDefault();
  // TODO: usa FormData y no fijes Content-Type.
}

searchInput.addEventListener('input', () => searchProducts(searchInput.value));
uploadForm.addEventListener('submit', uploadFile);
