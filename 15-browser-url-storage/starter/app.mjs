const products = [
  { name: 'Teclado', category: 'Perifericos', price: 89.9 },
  { name: 'Raton', category: 'Perifericos', price: 54.5 },
  { name: 'Monitor 27', category: 'Monitores', price: 289 },
  { name: 'Monitor portatil', category: 'Monitores', price: 169.99 }
];

const form = document.querySelector('[data-filters]');
const results = document.querySelector('[data-results]');
const status = document.querySelector('[data-status]');
const viewControls = [...document.querySelectorAll('input[name="view"]')];

function readFiltersFromUrl() {
  // TODO
  return { search: '', category: '', sort: 'name' };
}

function writeFiltersToUrl(filters) {
  // TODO
}

function readViewPreference() {
  // TODO: soporta storage corrupto.
  return 'grid';
}

function writeViewPreference(view) {
  // TODO
}

function render() {
  // TODO: filtra, ordena y renderiza segun formulario y vista.
  results.textContent = JSON.stringify(products);
}

form.addEventListener('input', render);
form.addEventListener('reset', () => setTimeout(render));
viewControls.forEach((control) => control.addEventListener('change', render));
render();
