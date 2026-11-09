const products = [
  { id: '1', name: 'Teclado mecanico', category: 'Perifericos', price: 89.9, stock: 18 },
  { id: '2', name: 'Monitor 27 pulgadas', category: 'Monitores', price: 289, stock: 2 },
  { id: '3', name: 'Hub USB-C', category: 'Conectividad', price: 64.95, stock: 0 }
];

const container = document.querySelector('[data-products]');
const status = document.querySelector('[data-status]');

export function createProductCard(product) {
  //Se crea la carpeta contenedora.
  const article = document.createElement('article');
  article.className = 'product-card';

  //Se crea el título como <h2>.
  const title = document.createElement('h2');
  title.textContent = product.name;
  article.append(title);

  if (product.stock <= 2) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = product.stock === 0 ? 'Sin stock' : 'Stock bajo';
    article.append(badge);
  }
  return article;
}

export function renderProducts(target, items) {
  if (!items || items.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No hay productos disponibles.';
    target.replaceChildren(emptyMessage);
    return;
  }
  const fragment = document.createDocumentFragment();
  for (const item of items) {
    const card = createProductCard(item);
    fragment.append(card);
  }
  target.replaceChildren(fragment);
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
