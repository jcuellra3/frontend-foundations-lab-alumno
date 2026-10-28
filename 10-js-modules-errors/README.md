# 10 · Modulos y errores

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Dividir codigo por responsabilidades.
- Crear errores de dominio con contexto.
- Traducir errores en la frontera de presentacion.

## Tarea

1. Implementa `DomainError` con `code`, `details` y `cause` opcional.
2. Implementa `parseProduct` para validar un valor externo.
3. Implementa `findProductOrThrow`.
4. Implementa `toUserMessage` sin filtrar detalles internos.
5. Conecta los modulos desde `app.mjs` sin crear variables globales.

## Criterios de aceptacion

- [ ] Los modulos no dependen del DOM salvo `app.mjs`.
- [ ] Los datos externos entran como `unknown` conceptual y se comprueban.
- [ ] El error conserva su causa.
- [ ] La UI muestra mensajes distintos para not found, invalid data y fallo desconocido.
- [ ] No se captura un error para ignorarlo.

## Ejecutar pruebas

```bash
npm run test:exercise -- 10
```

## Pistas

- El punto adecuado para traducir un error suele ser una frontera de la aplicacion.
- Un error de dominio no debe contener HTML.
- Evita `throw "texto"`; lanza instancias de `Error`.
