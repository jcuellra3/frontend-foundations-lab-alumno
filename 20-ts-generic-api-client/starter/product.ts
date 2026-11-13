import {
  ApiContractError,
  parsePage,
  requestJson,
  type Page,
  type Parser,
} from './api-client.js';

export interface Product {
  readonly id: string;
  name: string;
  price: number;
}

export const parseProduct: Parser<Product> = (value) => {
  if (typeof value !== 'object' || value === null) {
    throw new ApiContractError('El producto debe ser un objeto.');
  }
  if (
    !('id' in value) ||
    typeof value.id !== 'string' ||
    !('name' in value) ||
    typeof value.name !== 'string' ||
    !('price' in value) ||
    typeof value.price !== 'number'
  ) {
    throw new ApiContractError('El producto no tiene el formato esperado.');
  }
  return {
    id: value.id,
    name: value.name,
    price: value.price,
  };
};

export function getProducts(
  fetcher: typeof fetch = fetch,
): Promise<Page<Product>> {
  return requestJson('/api/products', {
    parser: parsePage(parseProduct),
    fetcher,
  });
}
