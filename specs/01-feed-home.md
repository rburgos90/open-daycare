# SPEC 01 — Home con feed de la guardería

> **Estado:** Implementado
> **Depende de:** Ninguno
> **Fecha:** 2026-10-26
> **Objetivo:** Reemplazar el home de Next por una réplica estática y fiel del prototipo `references/pantallas/feed.dc.html`, sin autenticación ni base de datos.

## Alcance

**Incluido:**

- Ruta `/` como feed de la guardería, visible en desktop, con sidebar fija de 248 px y contenido centrado a 760 px.
- Sidebar con logo, botón "Nueva publicación", navegación (Feed activo, Niños, Avisos, Mi cuenta) y pie con la usuaria Caro Giménez.
- Encabezado "GUARDERÍA · SALA SOLES", "Buenas, Caro" y "12 niños · martes 17 jun".
- Compositor visual "Compartí un momento…".
- Separador "PUBLICADO HOY" y tres tarjetas: logro, actividad con foto y anuncio.
- Contenido mock tipado en un módulo aparte, sin persistencia.
- Tipografías Fredoka y Nunito mediante `next/font/google`.
- Íconos SVG inline copiados del prototipo.
- Tokens de color y tipografía del diseño en `app/globals.css` vía `@theme`.
- Ajuste de `lang="es"` y metadata del sitio.

**Fuera de alcance (para specs futuras):**

- Rutas `/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`, `/detalle-publicacion`, `/login`.
- Autenticación, roles, sesión y cierre de sesión real.
- Base de datos, API routes, server actions y persistencia de cualquier tipo.
- Likes, comentarios, creación o edición de publicaciones.
- Subida o renderizado de imágenes reales; la foto queda como placeholder punteado.
- Fecha dinámica, internacionalización y selector de sala.
- Navegación mobile propia, menú colapsable o dark mode.

## Modelo de datos

No hay persistencia ni estructuras que sobrevivan entre sesiones. Se agrega un módulo de datos mock en `app/_data/feed.ts`:

```ts
export type PostKind = "achievement" | "activity" | "announcement";

export type FeedAuthor =
  | { kind: "child"; name: string; initial: string }
  | { kind: "announcement"; label: string };

export type FeedPost = {
  id: string;
  kind: PostKind;
  author: FeedAuthor;
  time: string;
  publishedBy: string;
  recipient: string;
  body: string;
  photo?: { alt: string };
  likes: number;
  comments: number;
};

export const currentUser = {
  name: "Caro Giménez",
  initial: "C",
  role: "Maestra · Soles",
};

export const room = {
  name: "Sala Soles",
  childrenCount: 12,
  dateLabel: "martes 17 jun",
};
```

Convenciones:

- `posts` contiene exactamente tres elementos en el orden del prototipo: `achievement`, `activity`, `announcement`.
- Los textos, horas, destinatarios y contadores son literales del prototipo.
- `photo` solo existe en la publicación de actividad y su `alt` es `"Foto · pintando con témperas"`.
- Los colores y las etiquetas visibles de cada badge se derivan de `PostKind`, no se guardan en los datos.
- Los identificadores del código van en inglés; solo el copy visible al usuario queda en español.

## Plan de implementación

1. Reemplazar `app/globals.css` con los tokens del diseño (`@theme`) y estilos base de `body`, fondos, tipografía y scrollbar. Actualizar `app/layout.tsx` para cargar Fredoka y Nunito con `next/font/google`, fijar `lang="es"` y la metadata "OpenDayCare · Sala Soles". Verificación: `npm run dev` levanta sin errores.
2. Crear `app/_data/feed.ts` con los tipos, `currentUser`, `room` y las tres publicaciones mock. Verificación: `npx tsc --noEmit` pasa.
3. Crear `app/_components/Sidebar.tsx` con logo, CTA, navegación, estado activo de Feed y pie de usuaria. Renderizarlo desde `app/page.tsx`. Verificación: la sidebar se ve en `/`.
4. Crear `app/_components/FeedPost.tsx` que cubra los tres tipos de publicación, el placeholder de foto y la fila de likes, comentarios y "Editar". Verificación: se renderiza una tarjeta de prueba de cada tipo.
5. Reescribir `app/page.tsx`: layout de dos columnas, header, compositor, separador y mapeo de `posts`. Eliminar todo el contenido del starter. Verificación: el home muestra el feed completo.
6. Pasada de fidelidad visual: espaciados, radios, sombras, bordes, tamaños de fuente, interlineado y letras mayúsculas. Verificación: comparación contra `references/screenshots/feed.png` a 924×540 y revisión a 1440 de ancho.

## Criterios de aceptación

- [x] `/` muestra el feed y no queda ningún texto ni imagen del starter de Next.
- [x] No existe ningún componente con `"use client"`, handler de eventos ni llamada a `fetch`.
- [x] El fondo general es `#F6ECDF` y la sidebar es `#FFFDF9` con borde derecho `#ECE0D0`.
- [x] La sidebar mide 248 px, queda fija y ocupa el alto del viewport.
- [x] El contenido principal tiene un ancho máximo de 760 px y se centra.
- [x] "Feed" se ve como ítem activo con fondo `#FBE3D8` y texto `#D9583C`.
- [x] Se leen exactamente "Buenas, Caro", "12 niños · martes 17 jun" y "Compartí un momento…".
- [x] Se muestran las tres publicaciones en orden: LOGRO, ACTIVIDAD y ANUNCIO.
- [x] Los contadores visibles son 3/1, 5/2 y 8/0.
- [x] La publicación de actividad muestra el placeholder punteado "Foto · pintando con témperas".
- [x] Los títulos, avatares y nombres usan Fredoka; el cuerpo usa Nunito.
- [x] Los íconos son SVG inline; no se agregó ninguna dependencia al `package.json`.
- [x] Los enlaces a pantallas inexistentes no navegan a rutas rotas.
- [x] A 924×540 y a 1440 de ancho no aparece scroll horizontal no intencional.
- [x] El documento tiene `lang="es"` y el título "OpenDayCare · Sala Soles".
- [x] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [x] La consola del navegador no muestra errores ni advertencias de hidratación.

## Decisiones tomadas y descartadas

- **Sí:** Tailwind v4 con tokens en `@theme` y valores arbitrarios donde haga falta. Mantiene el stack del repo y permite fidelidad al píxel.
- **No:** CSS Modules o estilos inline copiados. Duplican el sistema de estilos que ya provee Tailwind.
- **Sí:** módulo `app/_data/feed.ts` separado. Las specs futuras pueden reutilizar los tipos y los mocks.
- **Sí:** componentes `Sidebar` y `FeedPost` reutilizables. Las demás pantallas comparten la misma sidebar.
- **No:** descomposición fina en un archivo por bloque. Agrega archivos sin valor para este alcance.
- **Sí:** `next/font/google` para Fredoka y Nunito. Evita requests externos en runtime y sigue la convención de Next.
- **No:** `<link>` directo a Google Fonts o fuentes locales. El primero depende de terceros en runtime; el segundo suma archivos sin necesidad.
- **Sí:** SVG inline copiados del prototipo. Cero dependencias nuevas y fidelidad exacta de trazos.
- **No:** `lucide-react`. Obligaría a ajustar íconos para igualar el diseño.
- **Sí:** home 100 % estático como Server Component. No hay datos dinámicos ni interacción en este alcance.
- **No:** estado local para likes o botones. Agregaría comportamiento que el prototipo no define.
- **Sí:** enlaces a rutas inexistentes como elementos no interactivos con apariencia de link; solo Feed apunta a `/`. Evita rutas muertas y client JS.
- **Sí:** fecha y textos literales del prototipo. No se inventa lógica de fecha.
- **Sí:** desktop-first fiel, con sidebar fija y sin menú mobile. El prototipo no define mobile.
- **No:** dark mode. El diseño tiene un único tema claro.
- **Sí:** identificadores de código en inglés (`PostKind`, `achievement`, `activity`, `announcement`). Solo el copy visible al usuario queda en español.
- **Sí:** estado `Borrador` en español, consistente con el idioma del producto.

## Riesgos identificados

| Riesgo                                                             | Mitigación                                                                                               |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `next/font/google` requiere red en build o primer arranque         | Ejecutar el build con conexión; si falla, documentar el error y no cambiar de estrategia sin aprobación. |
| Los valores arbitrarios de Tailwind pueden desviarse del prototipo | Contrastar medidas, colores y sombras contra el HTML de referencia y la captura a 924×540.               |
| La captura de referencia solo cubre los primeros 540 px            | Validar el resto del feed con el HTML del prototipo, que es la fuente de verdad.                         |
| La fecha "martes 17 jun" queda obsoleta                            | Es contenido mock explícito; una fecha real requiere su propia spec.                                     |
| Los enlaces no interactivos pueden parecer rotos                   | Mantener el estilo visual del prototipo y marcar los elementos con `aria-disabled`.                      |

## Lo que **no** está en este spec

- Autenticación, sesión, roles y cierre de sesión.
- Base de datos, API y persistencia.
- Crear, editar, likear o comentar publicaciones.
- Rutas de niños, avisos, mi cuenta, login y detalle.
- Subida o visualización de imágenes reales.
- Navegación mobile y dark mode.

Cada uno de esos puntos, si llega, va en su propia spec.
