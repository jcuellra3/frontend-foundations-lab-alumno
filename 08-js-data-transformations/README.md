# 08 · Transformaciones de datos

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Aplicar metodos de arrays con intencion.
- Mantener inmutabilidad.
- Separar normalizacion, filtrado, ordenacion y agregacion.

## Tarea

1. Implementa `normalizeSearchTerm` para ignorar espacios, mayusculas y diacriticos.
2. Implementa `filterProducts` buscando en nombre, categoria y descripcion.
3. Implementa `sortProducts` sin mutar el array original.
4. Implementa `groupProductsByCategory`.
5. Implementa `summarizeInventory` con total de productos, unidades y valor.

## Criterios de aceptacion

- [ ] Ninguna funcion muta los argumentos.
- [ ] Una cadena vacia devuelve todos los productos.
- [ ] La ordenacion soporta nombre, precio y stock.
- [ ] La agrupacion crea arrays independientes.
- [ ] El valor total se calcula como `price * stock`.

## Ejecutar pruebas

```bash
npm run test:exercise -- 08
```

## Pistas

- `toSorted` devuelve un nuevo array.
- Normaliza ambos lados de una comparacion textual.
- Un `reduce` es util cuando produces un unico acumulador.
