const products = [
  { id: '1', name: 'Teclado mecanico', category: 'Perifericos', price: 89.9, stock: 18 },
  { id: '2', name: 'Monitor 27 pulgadas', category: 'Monitores', price: 289, stock: 2 },
  { id: '3', name: 'Hub USB-C', category: 'Conectividad', price: 64.95, stock: 0 }
];

const container = document.querySelector('[data-products]');
const status = document.querySelector('[data-status]');

export function createProductCard(product) {
  // TODO: no utilices innerHTML con product.
  const article = document.createElement('article');
  article.className = 'product-card';
  article.textContent = product.name;
  return article;
}

export function renderProducts(target, items) {
  // TODO: reemplaza el contenido anterior y representa empty state.
  for (const item of items) target.append(createProductCard(item));
}

document.querySelector('[data-load]').addEventListener('click', () => {
  renderProducts(container, products);
  status.textContent = 'Productos renderizados.';
});

document.querySelector('[data-empty]').addEventListener('click', () => {
  renderProducts(container, []);
  status.textContent = 'Resultado vacio.';
});

document.querySelector('[data-untrusted]').addEventListener('click', () => {
  renderProducts(container, [{ id: 'x', name: '<img src=x onerror=alert(1)>', category: 'Demo', price: 1, stock: 1 }]);
  status.textContent = 'El contenido debe aparecer como texto literal.';
});
