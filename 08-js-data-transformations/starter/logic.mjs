export function normalizeSearchTerm(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function filterProducts(products, query) {
  const term = normalizeSearchTerm(query);

  return products.filter((product) =>
    [product.name, product.category, product.description].some((value) =>
      normalizeSearchTerm(value).includes(term)
    )
  );
}

export function sortProducts(products, criterion = 'name', direction = 'asc') {
  if (!['name', 'price', 'stock'].includes(criterion)) {
    throw new RangeError(`Criterio de ordenación no válido: ${criterion}`);
  }

  const order = direction === 'desc' ? -1 : 1;

  return [...products].sort((a, b) => {
    const first = a[criterion];
    const second = b[criterion];
    const comparison = typeof first === 'string'
      ? first.localeCompare(second)
      : first - second;

    return comparison * order;
  });
}

export function groupProductsByCategory(products) {
  return products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});
}

export function summarizeInventory(products) {
  return products.reduce(
    (acc, product) => {
      acc.productCount += 1;
      acc.totalUnits += product.stock;
      acc.totalValue += product.price * product.stock;
      return acc;
    },
    { productCount: 0, totalUnits: 0, totalValue: 0 }
  );
}
