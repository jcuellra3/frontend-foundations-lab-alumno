export function toUserMessage(error) {
  if (error && error.code === 'PRODUCT_NOT_FOUND') {
    return 'No encontramos ese producto.';
  }

  if (error && error.code === 'INVALID_PRODUCT') {
    return 'Los datos del producto no son válidos.';
  }

  return 'No se pudo completar la operacion. Intentalo de nuevo.';
}
