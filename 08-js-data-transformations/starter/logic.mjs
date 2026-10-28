export function normalizeSearchTerm(value) {
  // TODO
  return String(value ?? '');
}

export function filterProducts(products, query) {
  // TODO
  return products;
}

export function sortProducts(products, criterion = 'name', direction = 'asc') {
  // TODO
  return products;
}

export function groupProductsByCategory(products) {
  // TODO
  return {};
}

export function summarizeInventory(products) {
  // TODO
  return { productCount: 0, totalUnits: 0, totalValue: 0 };
}
