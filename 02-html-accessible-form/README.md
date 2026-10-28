# 02 · Formulario accesible

**Tiempo orientativo:** 60-75 minutos

## Objetivos

- Asociar labels y controles.
- Agrupar campos relacionados.
- Aprovechar tipos y atributos nativos.
- Ofrecer instrucciones antes del error.

## Tarea

1. Completa el formulario de alta.
2. Elige tipos de input adecuados.
3. Añade restricciones nativas (`required`, `minlength`, `min`, etc.).
4. Agrupa disponibilidad y preferencias con `fieldset` y `legend`.
5. Relaciona las ayudas con `aria-describedby` solo donde aporten contexto.

## Criterios de aceptacion

- [ ] Cada control tiene un `label` asociado.
- [ ] Los mensajes de ayuda son entendibles antes de enviar.
- [ ] El boton de envio es un `button type="submit"`.
- [ ] No se utiliza placeholder como sustituto de label.
- [ ] El formulario se puede completar solo con teclado.

## Pistas

- Prueba a enviar el formulario vacio.
- Usa `autocomplete` cuando exista un token apropiado.
- Un asterisco visual por si solo no comunica obligatoriedad.

## Comprobacion

Abre el starter desde el portal, revisa el arbol de accesibilidad de DevTools y recorre toda la pagina solo con teclado.
