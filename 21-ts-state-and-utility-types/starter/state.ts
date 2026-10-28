export interface Product {
  readonly id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  readonly createdAt: string;
}

// TODO: deriva los DTOs con utility types.
export type ProductCreate = Product;
export type ProductPatch = Product;
export type ProductCardView = Product;

// TODO: sustituye flags por una union discriminada.
export interface LoadState<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export function mapState<T, R>(state: LoadState<T>, mapper: (value: T) => R): LoadState<R> {
  // TODO
  return state as unknown as LoadState<R>;
}

export function stateLabel<T>(state: LoadState<T>): string {
  // TODO
  if (state.loading) return 'Cargando';
  if (state.error) return state.error;
  return state.data ? 'Completado' : 'Inactivo';
}
