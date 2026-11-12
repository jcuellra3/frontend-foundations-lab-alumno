export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';

export interface Product {
  readonly id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  readonly createdAt: string;
}

export interface ProductDraft extends Omit<Product, 'id' | 'createdAt'> {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isProduct(value: unknown): value is Product {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && typeof value.price === 'number'
    && typeof value.stock === 'number'
    && (value.status === 'ACTIVE' || value.status === 'INACTIVE' || value.status === 'DISCONTINUED')
    && typeof value.createdAt === 'string';
}

export function formatProductStatus(status: ProductStatus): string {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'INACTIVE':
      return 'Inactivo';
    case 'DISCONTINUED':
      return 'Descatalogado';
    default: {
      const exhaustiveStatus: never = status;
      throw new Error(`Estado de producto desconocido: ${exhaustiveStatus}`);
    }
  }
}
