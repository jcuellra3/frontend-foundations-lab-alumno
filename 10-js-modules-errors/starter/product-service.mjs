import { DomainError } from './domain-error.mjs';

export function parseProduct(value) {
  //Comprobamos que value exista y que id, name y price tengan el tipo correcto
  if (
    !value ||
    typeof value.id !== 'string' ||
    typeof value.name !== 'string' ||
    typeof value.price !== 'number'
  ) {
    throw new DomainError('INVALID_PRODUCT', 'Producto inválido', {
      details: { value }
    });
  }

  //Devolvemos SOLO las 3 propiedades permitidas.
  return {
    id: value.id,
    name: value.name,
    price: value.price
  };
}

export function findProductOrThrow(products, id) {
  //.find() busca en la lista el primer producto que coincida con el id
  const product = products.find((item) => item.id === id);

  //Si no se encuentra (undefined), lanzamos el error con el código que pide el test
  if (!product) {
    throw new DomainError('PRODUCT_NOT_FOUND', 'Producto no encontrado', {
      details: { id }
    });
  }

  return product;
}
