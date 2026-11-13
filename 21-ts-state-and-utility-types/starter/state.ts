export interface Product {
  readonly id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  readonly createdAt: string;
}

//DTOs derivados con utility types
export type ProductCreate = Omit<Product, 'id' | 'createdAt'>;
export type ProductPatch = Partial<ProductCreate>;
export type ProductCardView = Pick<Product, 'id' | 'name' | 'price' | 'stock'>;

//Unión discriminada para evitar estados imposibles
export type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

//Transforma solo el estado 'success' y mantiene el resto igual
export function mapState<T, R>(
  state: LoadState<T>,
  mapper: (value: T) => R,
): LoadState<R> {
  if (state.status === 'success') {
    return {
      status: 'success',
      data: mapper(state.data),
    };
  }

  return state;
}

//Render exhaustivo comprobando todas las variantes con 'never'
export function stateLabel<T>(state: LoadState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Inactivo';
    case 'loading':
      return 'Cargando';
    case 'success':
      return 'Completado';
    case 'error':
      return state.error;
    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}
