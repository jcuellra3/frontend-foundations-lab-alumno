// TODO: restringe los estados validos.
export type ProductStatus = string;

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt: string;
}

// TODO: deriva este tipo de Product sin repetir propiedades.
export interface ProductDraft {
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  id?: string;
}

export function isProduct(value: unknown): value is Product {
  // TODO: valida la frontera externa.
  return typeof value === 'object' && value !== null;
}

export function formatProductStatus(status: ProductStatus): string {
  // TODO: implementa un switch exhaustivo.
  return String(status);
}
