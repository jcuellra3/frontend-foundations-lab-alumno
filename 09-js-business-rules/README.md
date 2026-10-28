# 09 · Reglas de negocio

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Representar reglas mediante funciones puras.
- Diferenciar validacion y excepciones.
- Evitar estados de dominio invalidos.

## Tarea

1. Calcula precio final aplicando descuento antes del impuesto y redondea a dos decimales.
2. Devuelve errores de validacion por campo.
3. Comprueba si una venta es posible.
4. Aplica entradas y salidas de stock sin mutar el producto.
5. Lanza `StockError` cuando una salida deja stock negativo.

## Criterios de aceptacion

- [ ] Los porcentajes fuera de rango se rechazan.
- [ ] La cantidad debe ser un entero positivo.
- [ ] El producto original nunca se modifica.
- [ ] Los errores de dominio incluyen codigo y datos utiles.
- [ ] No hay dependencias del DOM.

## Ejecutar pruebas

```bash
npm run test:exercise -- 09
```

## Pistas

- El redondeo monetario puede encapsularse.
- Una validacion que espera errores de usuario suele devolverlos; una operacion imposible puede lanzar un error.
- Congela los fixtures en tests para detectar mutaciones.
