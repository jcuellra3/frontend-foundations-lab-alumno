# 01 · Pagina semantica

**Tiempo orientativo:** 45-60 minutos

## Objetivos

- Utilizar landmarks HTML con intencion.
- Mantener una jerarquia de encabezados coherente.
- Distinguir enlaces, botones y texto no interactivo.

## Tarea

1. Sustituye los contenedores genericos por elementos semanticos.
2. Organiza la navegacion, el contenido principal, un articulo y contenido complementario.
3. Corrige las acciones: navegar debe ser un enlace; ejecutar una accion debe ser un boton.
4. Añade fecha legible mediante `time` y una lista de recursos relacionados.

## Criterios de aceptacion

- [ ] Existe un unico `h1`.
- [ ] El contenido principal esta dentro de `main`.
- [ ] La navegacion usa `nav` y enlaces con `href`.
- [ ] El articulo puede entenderse fuera del contexto de la pagina.
- [ ] No se utilizan roles ARIA para recrear semantica HTML disponible.

## Pistas

- Piensa primero en la estructura del documento, no en el aspecto visual.
- Un `section` suele necesitar un encabezado.
- No todo grupo de elementos necesita un `section`.

## Comprobacion

Abre el starter desde el portal, revisa el arbol de accesibilidad de DevTools y recorre toda la pagina solo con teclado.
