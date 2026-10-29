export class StockError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'StockError';
    this.code = 'STOCK_ERROR';
    this.details = details;
  }
}

export function calculateFinalPrice({ price, discountPercent = 0, taxPercent = 0 }) {
  if (
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100 ||
    !Number.isFinite(taxPercent) ||
    taxPercent < 0 ||
    taxPercent > 100
  ) {
    throw new RangeError("Precio o porcentaje no válido.");
  }

  const discountedPrice = price * (1 - discountPercent / 100);
  const total = discountedPrice * (1 + taxPercent / 100);
  return Number(total.toFixed(2));
}

export function validateProductDraft(draft) {
  const errors = {};

  if (typeof draft.name !== "string" || draft.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  }
  if (!Number.isFinite(draft.price) || draft.price < 0) {
    errors.price = "El precio debe ser mayor o igual que 0.";
  }
  if (draft.discountPercent !== undefined && (
    !Number.isFinite(draft.discountPercent) ||
    draft.discountPercent < 0 ||
    draft.discountPercent > 100
  )) {
    errors.discountPercent = "El descuento debe estar entre 0 y 100.";
  }
  if (draft.taxPercent !== undefined && (
    !Number.isFinite(draft.taxPercent) ||
    draft.taxPercent < 0 ||
    draft.taxPercent > 100
  )) {
    errors.taxPercent = "El impuesto debe estar entre 0 y 100.";
  }
  if (!Number.isInteger(draft.stock) || draft.stock < 0) {
    errors.stock = "El stock debe ser un entero mayor o igual que 0.";
  }
  if (draft.quantity !== undefined && (!Number.isInteger(draft.quantity) || draft.quantity <= 0)) {
    errors.quantity = "La cantidad debe ser un entero mayor que 0.";
  }

  return errors;
}

export function canSell(product, quantity) {
  return Number.isInteger(quantity) && quantity > 0 && product.stock >= quantity;
}

export function applyStockMovement(product, movement) {
  if (!Number.isInteger(movement)) {
    throw new RangeError("El movimiento de stock debe ser un número entero.");
  }

  const nextStock = product.stock + movement;
  if (nextStock < 0) {
    throw new StockError("No hay stock suficiente.", {
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
