# 24 · Tarjeta de perfil accesible

**Tiempo orientativo:** 45-60 minutos

## Objetivos

- Estructurar una ficha de perfil usando HTML semántico.
- Escribir textos alternativos (`alt`) adecuados para imágenes de perfil.
- Crear enlaces accesibles con textos comprensibles fuera de contexto.

## Contexto

Las tarjetas de perfil son un componente habitual en cualquier aplicación web. Si se construyen solo con etiquetas genéricas (`div`, `span`) o enlaces tipo "Pulsa aquí", los lectores de pantalla no pueden interpretar bien su contenido.

## Tarea

1. Abre `starter/index.html` y revisa la estructura inicial.
2. Sustituye los contenedores genéricos por etiquetas semánticas (`article`, `header`, `nav`, etc.) y respeta la jerarquía de encabezados (`h1`, `h2`).
3. Añade un atributo `alt` descriptivo a la imagen de perfil.
4. Asegúrate de que los enlaces a redes o contacto tengan textos descriptivos (evita textos genéricos como "Ver más" o "Click aquí").

## Criterios de aceptación

- [ ] La ficha usa una estructura HTML semántica coherente.
- [ ] La imagen tiene un texto alternativo (`alt`) adecuado.
- [ ] Los enlaces tienen nombres comprensibles y descriptivos.

## Pistas

- Usa `<article>` para envolver la tarjeta de perfil completa y un encabezado principal único (`<h1>`).
- Si un enlace solo contiene un icono o necesita más contexto, apóyate en un texto claro o en `aria-label`.
