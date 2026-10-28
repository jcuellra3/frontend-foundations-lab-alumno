export class StockError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'StockError';
    this.code = 'STOCK_ERROR';
    this.details = details;
  }
}

export function calculateFinalPrice({ price, discountPercent = 0, taxPercent = 0 }) {
  // TODO
  return price;
}

export function validateProductDraft(draft) {
  // TODO
  return {};
}

export function canSell(product, quantity) {
  // TODO
  return false;
}

export function applyStockMovement(product, movement) {
  // TODO
  return product;
}
