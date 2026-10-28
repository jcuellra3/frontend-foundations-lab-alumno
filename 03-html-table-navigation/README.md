# 03 · Tabla de datos y navegacion

**Tiempo orientativo:** 45-60 minutos

## Objetivos

- Marcar una tabla de datos correctamente.
- Facilitar el salto al contenido.
- Comunicar estados sin depender solo del color.

## Tarea

1. Añade un skip link que lleve al listado.
2. Convierte el listado visual en una tabla con caption, thead, tbody y cabeceras.
3. Usa `scope` para relacionar cabeceras y celdas.
4. Representa el estado con texto visible.
5. Añade acciones como enlaces o botones segun su comportamiento.

## Criterios de aceptacion

- [ ] La tabla tiene `caption` descriptivo.
- [ ] Cada columna tiene cabecera.
- [ ] El nombre del producto actua como cabecera de fila.
- [ ] El skip link se hace visible al recibir foco.
- [ ] La tabla conserva sentido sin estilos.

## Pistas

- Una tabla es adecuada cuando hay relaciones entre filas y columnas.
- Evita `aria-label` si ya existe texto visible.
- Prueba la tabla con los estilos deshabilitados.

## Comprobacion

Abre el starter desde el portal, revisa el arbol de accesibilidad de DevTools y recorre toda la pagina solo con teclado.
