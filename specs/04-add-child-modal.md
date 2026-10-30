# SPEC 04 — Modal Agregar niño

> **Estado:** Aprobado
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-30
> **Objetivo:** Al clicar "Agregar niño" en `/kids`, abrir un modal fiel a `references/pantallas/agregar-nino.dc.html`. Es el primer componente interactivo (`"use client"`) de la app: excepción explícita y acotada a la convención "sin client JS" de SPEC 01–03, necesaria porque abrir y cerrar un modal no es posible sin client JS.

## Alcance

**Incluido:**

- Componente `app/_components/AddChildDialog.tsx`, el primer client component de la app:
  - Disparador: botón "Agregar niño" con el mismo gradiente CTA, sombra y estilo del botón actual de `/kids` (reemplaza al `<span aria-disabled>`).
  - Modal con `<dialog>` nativo abierto vía `showModal()`: foco atrapado, cierre con Esc y `::backdrop` sin librerías. Título vinculado con `aria-labelledby`.
  - Tarjeta fiel al prototipo: ancho máximo 520px, fondo `#FBF4EC` (token `auth-bg`), borde `#ECE0D0` (`line`), radios 24px, sombra one-off `0 20px 50px -24px rgb(63 54 46 / 0.35)`.
  - Header con padding 20px/26px y borde inferior `#ECE0D0`: "Cancelar" (`#94887B`, peso 700, 15px), "Agregar niño" (Fredoka, peso 600, 18px) y "Guardar" (`#D9583C`, peso 800, 15px).
  - Cuerpo con padding 24px/26px: NOMBRE COMPLETO (placeholder "Ej. Martina López"), fila a dos columnas con FECHA DE NACIMIENTO (input de texto, placeholder "dd/mm/aaaa") y SALA (`<select>` nativo `appearance-none` con chevron custom, única opción "Soles"), ALERGIAS (ETIQUETAS) (placeholder "Ej. Maní, Lactosa") y NOTAS MÉDICAS (textarea, placeholder "Indicaciones, medicación, contactos…", altura mínima 90px, `resize: vertical`).
  - Cierre por "Cancelar", "Guardar", tecla Esc y clic en el scrim. Ninguno persiste datos ni navega.
- Cambio mínimo en `app/kids/page.tsx`: reemplazar el span por `<AddChildDialog />`; la página sigue siendo server component y el resto queda intacto.
- Tokens: se reutilizan los existentes (`auth-bg`, `auth-input-border`, `line`, `muted-strong`, `accent`, gradiente CTA). La sombra del modal va como valor arbitrario (convención one-off) junto con el estilo del scrim y `::backdrop`.

**Adaptaciones no definidas por el prototipo** (es una página completa, no un overlay): scrim translúcido `rgb(63 54 46 / 0.4)`, tarjeta centrada en el viewport y scroll interno del contenido en viewports bajos.

**Fuera de alcance (para specs futuras):**

- Persistencia de cualquier tipo, validación de campos y manejo de errores.
- Inputs controlados: los campos siguen uncontrolled (convención del buscador de `/kids` y `defaultValue` del login).
- Fecha nativa (`type="date"`): se mantiene el input de texto con placeholder, fiel al prototipo.
- Interacción de las alergias como etiquetas/chips: el prototipo solo define un input.
- Editar o dar de baja niños; vincular padres; el resto de las pantallas del prototipo.
- Modal por URL (`searchParams`): PPR exigiría `<Suspense>` (razón ya registrada en SPEC 02) y no aporta nada.
- Animaciones de entrada/salida, navegación mobile y dark mode.

## Modelo de datos

No hay persistencia ni módulo mock nuevo. La única opción del select SALA ("Soles") se deriva de los valores únicos de `room` en `app/_data/children.ts`, sin literales duplicados:

```ts
const rooms = [...new Set(children.map((child) => child.room))]; // ["Soles"]
```

Convenciones:

- Los campos son uncontrolled: `placeholder` y `defaultValue` ("Soles" en el select), sin estado de React para sus valores.
- Las etiquetas de campo usan peso 800 (difiere del 700 de `FormField` de SPEC 03, que no se reutiliza).
- Los identificadores del código van en inglés; solo el copy visible queda en español.

## Plan de implementación

1. Crear `app/_components/AddChildDialog.tsx` (`"use client"`): botón disparador, `<dialog>` con `showModal()` (el `dialog` ocupa el viewport como contenedor flex centrado; un clic con `target === dialog` cierra, lo que implementa el cierre por scrim), tarjeta con header y campos, select SALA derivado del mock y cierre por Cancelar/Guardar/Esc/scrim. Verificación: `npx tsc --noEmit` pasa.
2. Reemplazar el `<span aria-disabled>` de `app/kids/page.tsx` por `<AddChildDialog />`, sin tocar nada más de la página. Verificación: con el modal cerrado `/kids` es idéntico a SPEC 02 y el clic en "Agregar niño" abre el modal.
3. Verificar interacciones: abrir, cerrar por las cuatro vías, foco atrapado dentro del modal, foco devuelto al botón al cerrar y campos editables. Verificación: recorrido manual en `npm run dev`.
4. Pasada de fidelidad visual contra `references/pantallas/agregar-nino.dc.html`: medidas (520px, paddings 20px/26px y 24px/26px, gap 14px de la fila fecha/sala, márgenes 8px/18px), colores, sombra, radios y tipografías; scrim y scroll interno a 924×540. Verificación: comparación a 924×540 y revisión a 1440 de ancho.
5. Pasada de no-regresión de `/`, `/kids`, `/kids/1`, `/login` y `/activate-account`, más `npm run lint`, `npx tsc --noEmit`, `npm run build` y consola del navegador sin errores ni advertencias de hidratación.

## Criterios de aceptación

- [x] El botón "Agregar niño" de `/kids` abre el modal al clicarlo; es el primer y único componente con `"use client"` de la app.
- [x] Con el modal cerrado, `/kids` es visualmente idéntico a SPEC 02 (mismo header, botón con el gradiente CTA, buscador, separador y grilla de ocho tarjetas).
- [x] El modal muestra la tarjeta de 520px con fondo `#FBF4EC`, borde `#ECE0D0`, radios 24px y la sombra del prototipo, centrada sobre un scrim translúcido.
- [x] El header muestra "Cancelar" (`#94887B`, peso 700, 15px), "Agregar niño" (Fredoka, peso 600, 18px) y "Guardar" (`#D9583C`, peso 800, 15px) sobre el borde inferior `#ECE0D0`.
- [x] NOMBRE COMPLETO muestra el placeholder "Ej. Martina López".
- [x] FECHA DE NACIMIENTO es un input de texto con placeholder "dd/mm/aaaa" (no `type="date"`).
- [x] SALA es un `<select>` nativo estilizado (`appearance-none` + chevron del prototipo) con la única opción "Soles", derivada del mock, y no muestra el chevron nativo.
- [x] ALERGIAS (ETIQUETAS) muestra el placeholder "Ej. Maní, Lactosa".
- [x] NOTAS MÉDICAS es un textarea con placeholder "Indicaciones, medicación, contactos…", altura mínima 90px y `resize: vertical`.
- [x] Las etiquetas usan 12px, peso 800, tracking .7px y color `#94887B`; los inputs usan borde 1.5px `#EADFD0`, fondo blanco, radios 14px, padding 13px/16px y texto de 15px.
- [x] El modal se cierra con "Cancelar", con "Guardar", con la tecla Esc y con el clic en el scrim.
- [x] "Guardar" y "Cancelar" cierran el modal sin persistir datos ni navegar a otra ruta.
- [x] El foco queda atrapado dentro del modal mientras está abierto, el título está vinculado con `aria-labelledby` y al cerrar el foco vuelve al botón "Agregar niño".
- [x] Los campos son uncontrolled: no hay estado de React para sus valores.
- [x] El contenido del modal hace scroll interno (sin desborde del viewport) a 924×540 y no aparece scroll horizontal.
- [x] `/`, `/kids/1`, `/login` y `/activate-account` se ven idénticos a sus specs, y la pestaña de `/kids` sigue titulándose "Niños · OpenDayCare".
- [x] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [x] La consola del navegador no muestra errores ni advertencias de hidratación.

## Decisiones tomadas y descartadas

- **Sí:** modal en vez de ruta aparte (`/kids/new`). Decisión explícita del usuario; el prototipo enlaza `agregar-nino.dc.html` como página, pero el requisito es abrirlo como modal desde el listado.
- **Sí:** primer `"use client"` (`AddChildDialog`), excepción a la convención de SPEC 01–03. La interacción requerida no existe sin client JS; la excepción queda acotada a este componente y `/kids` sigue siendo server component.
- **Sí:** `<dialog>` nativo + `showModal()`. Foco atrapado, Esc y `::backdrop` gratis, sin librerías de UI.
- **Sí:** "Guardar" solo visual: cierra el modal sin persistir. Decisión del usuario, consistente con las réplicas estáticas de SPEC 01–03.
- **Sí:** `<select>` nativo para SALA con la única opción "Soles". Decisión del usuario: funcional y listo para futuras salas, estilizado idéntico al prototipo.
- **Sí:** fecha como input de texto con placeholder "dd/mm/aaaa". Fidelidad al prototipo; el selector nativo de fecha rompería el diseño.
- **Sí:** scrim `rgb(63 54 46 / 0.4)` y tarjeta centrada. Adaptación obligada: el prototipo es una página completa y no define overlay.
- **Sí:** opción "Soles" derivada del mock (`room` único de `children`). Evita duplicar el literal; cuando existan más salas el select las toma solo.
- **No:** reutilizar `FormField`. Su etiqueta usa peso 700 y no soporta textarea ni select; los campos viven en el modal.
- **No:** inputs controlados o estado de formulario. Uncontrolled, como el buscador de `/kids` y el `defaultValue` del login.
- **No:** modal por `searchParams`. PPR exigiría `<Suspense>` (SPEC 02 ya lo descartó para el buscador) y no aporta nada.
- **No:** validación, mensajes de error ni chips de alergias. El prototipo no los define.
- **No:** librerías de modal ni animaciones de entrada/salida. Nada en el prototipo las justifica.

## Riesgos identificados

| Riesgo                                                       | Mitigación                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Primer client JS de la app: posible regresión o error de hidratación en `/kids` | El paso 2 exige `/kids` idéntico con el modal cerrado y la consola limpia antes de seguir. |
| Estilos de `::backdrop` y `<dialog>` varían entre navegadores | Estilos simples (color plano, sin animaciones) y verificación en Chromium vía Playwright. |
| El markup del header de `/kids` cambia (span → botón/client component) | Paso de no-regresión dedicado (paso 5) sobre todas las pantallas previas. |
| "Guardar" sin persistencia puede parecer roto | Decisión del usuario registrada; la persistencia llega con su propia spec cuando exista capa de datos. |

## Lo que **no** está en este spec

- Persistencia, validación de formularios y manejo de errores.
- Editar o dar de baja niños; vincular o desvincular padres.
- Fecha nativa y alergias como chips interactivos.
- Animaciones del modal, navegación mobile y dark mode.
- Cambios en las pantallas existentes más allá del swap del botón en `/kids`.

Cada uno de esos puntos, si llega, va en su propia spec.
