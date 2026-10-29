//Función que recibe cualquier valor y lo convierte a texto normalizado para poder comparar búsquedas sin contar espacios, mayúsculas y acentos.
export function normalizeSearchTerm(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
//Se buscan coincidencias en nombre, categoría o descripción de cada producto.
export function filterProducts(products, query) {
  const term = normalizeSearchTerm(query);

  return products.filter((product) =>
    [product.name, product.category, product.description].some((value) =>
      normalizeSearchTerm(value).includes(term)
    )
  );
}

//Se devuelven los productos ordenados por nombre, precio o stock conservando array original.
export function sortProducts(products, criterion = 'name', direction = 'asc') {
  if (!['name', 'price', 'stock'].includes(criterion)) {
    throw new RangeError(`Criterio de ordenación no válido: ${criterion}`);
  }
  //Decidir sentido del orden
  let order;

  if (direction === 'desc') {
    order = -1;
  } else {
    order = 1;
  }

  //Se crea copia del array [...products]
  return [...products].sort((a, b) => {
    const valueA = a[criterion];
    const valueB = b[criterion];

    if (typeof valueA === 'string') {
      return valueA.localeCompare(valueB) * order;
    }

    return (valueA - valueB) * order;
  });
}

//Recibe array de objetos y devuelve un objeto cuyas propiedades son las categorías.
export function groupProductsByCategory(products) {
  const groups = {};

  for (const product of products) {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
  }

  return groups;
}

export function summarizeInventory(products) {
  const summary = {
    productCount: 0,
    totalUnits: 0,
    totalValue: 0
  };

  for (const product of products) {
    summary.productCount += 1;
    summary.totalUnits += product.stock;
    summary.totalValue += product.price * product.stock;
  }

  return summary;
}
