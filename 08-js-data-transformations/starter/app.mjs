import {
  filterProducts,
  groupProductsByCategory,
  sortProducts,
  summarizeInventory
} from './logic.mjs';

const products = [
  { id: 1, name: 'Monitor 27 pulgadas', category: 'Monitores', description: 'Panel IPS', price: 289, stock: 9 },
  { id: 2, name: 'Monitor portatil', category: 'Monitores', description: 'Pantalla USB-C', price: 169.99, stock: 12 },
  { id: 3, name: 'Teclado mecanico', category: 'Perifericos', description: 'Formato compacto', price: 89.9, stock: 18 },
  { id: 4, name: 'Raton ergonomico', category: 'Perifericos', description: 'Inalambrico', price: 54.5, stock: 31 }
];

const search = document.querySelector('[data-search]');
const sort = document.querySelector('[data-sort]');
const output = document.querySelector('[data-output]');
const status = document.querySelector('[data-status]');

document.querySelector('[data-run]').addEventListener('click', () => {
  try {
    const filtered = filterProducts(products, search.value);
    const sorted = sortProducts(filtered, sort.value);
    output.textContent = JSON.stringify({
      results: sorted,
      groups: groupProductsByCategory(sorted),
      summary: summarizeInventory(sorted),
      originalFirstItem: products[0]
    }, null, 2);
    status.dataset.kind = 'success';
    status.textContent = 'Transformaciones ejecutadas.';
  } catch (error) {
    status.dataset.kind = 'error';
    status.textContent = error instanceof Error ? error.message : 'Error desconocido.';
  }
});
