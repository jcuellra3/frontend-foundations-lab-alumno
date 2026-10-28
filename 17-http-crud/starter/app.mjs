const form = document.querySelector('[data-form]');
const tableBody = document.querySelector('[data-table-body]');
const formStatus = document.querySelector('[data-form-status]');
const listStatus = document.querySelector('[data-list-status]');
let products = [];

async function requestJson(url, options = {}) {
  // TODO: trata 204, response.ok y cuerpo de error.
  const response = await fetch(url, options);
  return response.json();
}

async function loadProducts() {
  // TODO
}

async function saveProduct(event) {
  event.preventDefault();
  // TODO
}

function startEdit(product) {
  // TODO
}

function cancelEdit() {
  // TODO
}

async function deleteProduct(id) {
  // TODO
}

form.addEventListener('submit', saveProduct);
document.querySelector('[data-cancel]').addEventListener('click', cancelEdit);
document.querySelector('[data-refresh]').addEventListener('click', loadProducts);
tableBody.addEventListener('click', () => {});
loadProducts();
