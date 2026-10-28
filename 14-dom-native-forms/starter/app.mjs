const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');
let products = [];

function clearErrors() {
  // TODO
}

function showValidationErrors() {
  // TODO: devuelve el primer control invalido.
  return null;
}

function toProductDraft(formData) {
  // TODO: convierte numeros y checkbox.
  return Object.fromEntries(formData);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO: validar, crear producto, renderizar, resetear y enfocar.
});
