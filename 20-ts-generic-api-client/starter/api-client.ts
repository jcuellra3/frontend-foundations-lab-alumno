export type Parser<T> = (value: unknown) => T;

export interface Page<T> {
  readonly items: readonly T[];
  readonly meta: {
    readonly page: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiContractError extends Error {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
    this.name = 'ApiContractError';
  }
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  options: { parser: Parser<T>; init?: RequestInit; fetcher?: typeof fetch },
): Promise<T> {
  const fetcher = options.fetcher ?? fetch;
  const response = await fetcher(input, options.init);
  if (!response.ok) {
    throw new ApiError(response.status, `Error HTTP: ${response.status}`);
  }
  const data: unknown = await response.json();
  try {
    return options.parser(data);
  } catch (error) {
    if (error instanceof ApiContractError) {
      throw error;
    }
    throw new ApiContractError('El cuerpo JSON no cumple el contrato esperado.', {
      cause: error,
    });
  }
}

export function parsePage<T>(itemParser: Parser<T>): Parser<Page<T>> {
  return (value: unknown) => {
    if (typeof value !== 'object' || value === null) {
      throw new ApiContractError('La página debe ser un objeto.');
    }

    if (!('items' in value) || !Array.isArray(value.items)) {
      throw new ApiContractError('La propiedad items debe ser un array.');
    }

    if (
      !('meta' in value) ||
      typeof value.meta !== 'object' ||
      value.meta === null
    ) {
      throw new ApiContractError('La propiedad meta debe ser un objeto.');
    }

    const meta = value.meta;
    if (
      !('page' in meta) ||
      typeof meta.page !== 'number' ||
      !('total' in meta) ||
      typeof meta.total !== 'number' ||
      !('totalPages' in meta) ||
      typeof meta.totalPages !== 'number'
    ) {
      throw new ApiContractError(
        'Las propiedades page, total y totalPages deben ser números.',
      );
    }

    return {
      items: value.items.map((item) => itemParser(item)),
      meta: {
        page: meta.page,
        total: meta.total,
        totalPages: meta.totalPages,
      },
    };
  };
}
