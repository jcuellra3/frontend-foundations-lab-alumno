export class StockError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'StockError';
    this.code = 'STOCK_ERROR';
    this.details = details;
  }
}

export function calculateFinalPrice({ price, discountPercent = 0, taxPercent = 0 }) {
  //Se rechazan porcentajes fuera de 0 a 100.
  if (price < 0 || discountPercent < 0 || discountPercent > 100 || taxPercent < 0 || taxPercent > 100) {
    throw new Error("Precio o porcentaje no válido.");
  }
  //Se aplica descuento antes del impuesto.
  const discountedPrice = price * (1 - discountPercent / 100);
  const total = discountedPrice * (1 + taxPercent / 100);
  //Se redondea a 2 decimales y se devuelve como número.
  return Number(total.toFixed(2))
}

export function validateProductDraft(draft) {
  const errors = {};

  if (!draft.name || draft.name.trim() === "") {
    errors.name = "El nombre es obligatorio";
  }
  if (typeof draft.price !== "number" || Number.isNaN(draft.price) || draft.price < 0) {
    errors.price = "El precio debe ser mayor o igual a 0.";
  }
  if (draft.taxPercent < 0 || draft.taxPercent > 100) {
    errors.taxPercent = "El impuesto debe estar entre 0 y 100.";
  }
  if (!Number.isInteger(draft.stock) || draft.stock < 0) {
    errors.stock = "El stock debe ser mayor a 0.";
  }
  if (draft.quantity !== undefined && (!Number.isInteger(draft.quantity) || draft.quantity <= 0)) {
    errors.stock = "La cantidad debe ser mayor a 0."
  }
  return errors;
}

//Devuelve true si se puede vender o false si no se puede.
export function canSell(product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return false;
  }
  return product.stock >= quantity;
}

export function applyStockMovement(product, movement) {
  if (!Number.isInteger(movement)) {
    throw new Error("El stock debe moverse en números enteros.");
  }
  const nextStock = product.stock + movement;
  //Error si resultado es negativo.
  if (nextStock < 0) {
    throw new Error("No hay stock suficiente.", {
      productId: product.id,
      currentStock: product.stock,
      movement,
      nextStock
    });
  }
  return {
    ...product,
    stock: nextStock
  };
}
