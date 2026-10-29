# SPEC 02 — Niños: listado y perfil

> **Estado:** Aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-29
> **Objetivo:** Agregar las rutas `/kids` (listado) y `/kids/[id]` (perfil) como réplicas estáticas y fieles de `ninos.dc.html` y `perfil-nino.dc.html`, con datos mock completos para los ocho niños de la sala.

## Alcance

**Incluido:**

- Ruta `/kids`: encabezado "GESTIÓN / Niños", botón visual "Agregar niño", buscador solo visual, separador "SALA SOLES · 8 niños" y grilla de dos columnas con las ocho tarjetas de niño.
- Ruta `/kids/[id]`: enlace "Volver a Niños", encabezado con avatar de 84 px, caja condicional "Alergias y notas", tarjeta de detalles (nacimiento, sala, ingreso) y columna derecha con "Resumen del día" y "PADRES VINCULADOS".
- Datos mock tipados en `app/_data/children.ts` con perfil completo para los ocho niños del prototipo.
- Componentes `Avatar`, `ChildCard` y `ParentList` en `app/_components/`.
- Sidebar consciente de la ruta mediante prop `active`, con "Niños" como enlace real a `/kids`.
- Tokens nuevos en `app/globals.css` (badges, caja de alergia, hover de tarjetas) y estilos base de inputs.
- `generateStaticParams` + `notFound()` para ids desconocidos y títulos de pestaña por ruta.

**Fuera de alcance (para specs futuras):**

- Filtrado real del buscador; el input es solo visual.
- Crear, editar o dar de baja niños; vincular o desvincular padres; resumen del día.
- Pantallas de agregar/editar niño, resumen del día, vincular padre, avisos, mi cuenta, crear publicación y login.
- Autenticación, roles, sesión y base de datos de cualquier tipo.
- Unificar el conteo de niños entre el feed (12) y el listado (8).
- Imágenes reales, navegación mobile y dark mode.

## Modelo de datos

No hay persistencia. Se agrega un módulo mock en `app/_data/children.ts`:

```ts
export type AvatarColor = "blue" | "pink" | "green" | "yellow" | "purple" | "sky";

export type ParentStatus = "active" | "pending";

export type LinkedParent = {
  name: string;
  initial: string;
  relation: string; // "Mamá" | "Papá"
  status: ParentStatus;
  avatarColor: AvatarColor;
};

export type Child = {
  id: string; // slug ASCII: "mateo", "sofia", …
  name: string;
  initial: string;
  avatarColor: AvatarColor;
  ageLabel: string; // "3 años"
  room: string; // "Soles"
  birthDate: string; // "12 mar 2022"
  enrolled: string; // "feb 2025"
  allergy?: { badge: string; note: string };
  parents: LinkedParent[];
};

export const roomLabel = "Sala Soles";

export const children = [ /* ocho niños en el orden del prototipo */ ] satisfies Child[];
```

Paleta de `Avatar` (mapa en `Avatar.tsx`): `blue` #A9D9E8/#1F7A93, `pink` #F4B8CC/#C44A7A, `green` #B9DEC4/#3E8B62, `yellow` #F4DC8E/#9A7B1E, `purple` #C9B6E8/#7B5FC0, `sky` #A9C7E8 (solo variante sólida, texto blanco). Variantes: `soft` (fondo pastel + texto de color, niños) y `solid` (fondo + texto blanco, padres). Tamaños: `sm` 40 px, `md` 48 px, `lg` 84 px.

Convenciones:

- Los ocho ids, en el orden del prototipo: `mateo`, `sofia`, `benjamin`, `valentina`, `tomas`, `emma`, `lucas`, `olivia`.
- Mateo es el único con datos literales del prototipo: nacimiento "12 mar 2022", ingreso "feb 2025", nota de alergia al maní, Lucía Fernández (Mamá, activa, `purple`) y Diego Fernández (Papá, pendiente, `sky`).
- Los otros siete reciben literales inventados coherentes: fechas plausibles, padres con nombres propios en español y colores sólidos de la paleta. Valentina no tiene padres (`parents: []`).
- Alergias solo en Mateo (`Maní`) y Tomás (`Lactosa`): el listado del prototipo solo muestra esos dos badges.
- Etiquetas derivadas, no guardadas en los datos: la sub-línea de padres según `parents.length` ("sin padres vinculados" / "1 padre vinculado" / "N padres vinculados"); el badge de la tarjeta con prioridad alergia > VINCULAR (sin padres) > chevron; los textos y colores de estado de padres derivados de `ParentStatus` ("activa"/ACTIVA y "invitación enviada"/PENDIENTE).
- El conteo del listado se deriva de `children.length` (8).
- Los identificadores del código y las rutas van en inglés; solo el copy visible queda en español.

## Plan de implementación

1. Extender `app/globals.css`: tokens de badges (alergia, vincular, activa, pendiente), caja de alergia, hover de tarjetas y estilos base de `input` / `::placeholder`. Verificación: `npm run dev` levanta y `/` queda igual.
2. Crear `app/_data/children.ts` con los tipos, `roomLabel` y los ocho niños. Verificación: `npx tsc --noEmit` pasa.
3. Crear `app/_components/Avatar.tsx` con la paleta, las variantes `soft`/`solid` y los tres tamaños. Verificación: `npx tsc --noEmit` pasa.
4. Crear `app/_components/ChildCard.tsx` (avatar, nombre, sub-línea, lógica de badge/chevron, hover) y `app/_components/ParentList.tsx` (filas de padres y "Vincular otro padre"). Verificación: `npx tsc --noEmit` pasa.
5. Modificar `app/_components/Sidebar.tsx`: prop requerida `active: "feed" | "kids"`, Feed y Niños como `Link` reales con `aria-current` dinámico, Avisos y Mi cuenta siguen `aria-disabled`; `app/page.tsx` pasa `active="feed"`. Verificación: `/` se ve idéntico a SPEC 01.
6. Crear `app/kids/page.tsx`: layout de dos columnas (máximo 880 px), header, buscador visual, separador y grilla con `ChildCard`. Verificación: `/kids` muestra las ocho tarjetas y la sidebar marca Niños activo.
7. Crear `app/kids/[id]/page.tsx`: `generateStaticParams` desde `children`, `notFound()` para ids desconocidos, `generateMetadata` con el nombre, "Volver a Niños" a `/kids`, columnas del perfil, caja de alergias condicional, detalles y columna derecha. Verificación: `/kids/mateo` reproduce el prototipo y un id inexistente da 404.
8. Pasada de fidelidad visual contra `references/pantallas/ninos.dc.html` y `perfil-nino.dc.html`: medidas, colores, sombras, radios y tipografías. Verificación: comparación a 924×540 y revisión a 1440 de ancho.

## Criterios de aceptación

- [ ] `/kids` muestra "GESTIÓN", el título "Niños" y el botón "Agregar niño" con el gradiente del prototipo.
- [ ] El buscador se ve con el placeholder "Buscar niño…" y no filtra ni navega.
- [ ] El separador muestra "SALA SOLES" y "8 niños".
- [ ] La grilla tiene dos columnas y las ocho tarjetas en el orden del prototipo.
- [ ] Cada tarjeta navega a `/kids/<id>` del niño que muestra.
- [ ] Mateo muestra el badge MANÍ, Tomás LACTOSA, Valentina VINCULAR y el resto el chevron.
- [ ] Las sub-líneas de padres coinciden con el prototipo ("2 padres vinculados", "1 padre vinculado", "sin padres vinculados").
- [ ] El hover de la tarjeta cambia el borde a `#F2A78E` y eleva 2 px, solo con CSS.
- [ ] En `/kids` la sidebar marca "Niños" activo (`#FBE3D8` / `#D9583C`); en `/` marca "Feed".
- [ ] `/` no sufre ninguna regresión visual respecto de SPEC 01.
- [ ] "Volver a Niños" navega a `/kids`.
- [ ] `/kids/mateo` muestra el avatar M de 84 px, "Mateo Fernández", "3 años · Sala Soles" y el botón "Editar" no interactivo.
- [ ] La caja "Alergias y notas" reproduce el texto del prototipo y solo aparece en niños con alergia.
- [ ] La tarjeta de detalles muestra "12 mar 2022", "Soles" y "feb 2025".
- [ ] "Resumen del día" se ve con fondo `#3F362E` y "Vincular otro padre" no navega.
- [ ] "PADRES VINCULADOS" muestra a Lucía con badge ACTIVA y a Diego con PENDIENTE.
- [ ] El perfil de Valentina no muestra filas de padres y conserva "Vincular otro padre".
- [ ] Un id inexistente (p. ej. `/kids/pepe`) devuelve 404.
- [ ] Las pestañas se titulan "Niños · OpenDayCare" y "<Nombre> · OpenDayCare".
- [ ] Ningún componente nuevo usa `"use client"` ni handlers de eventos.
- [ ] No aparece scroll horizontal no intencional a 924×540 ni a 1440 de ancho.
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] La consola del navegador no muestra errores ni advertencias de hidratación.

## Decisiones tomadas y descartadas

- **Sí:** rutas en inglés `/kids` y `/kids/[id]` (decisión explícita del usuario). El código y las rutas van en inglés; el copy visible queda en español ("Niños").
- **No:** `/ninos` y `/ninos/[id]`, que era lo listado en SPEC 01. La decisión del usuario las reemplaza.
- **Sí:** sidebar con prop requerida `active`. Cada página declara su estado activo y todo sigue siendo Server Components, sin client JS.
- **No:** `usePathname()` en la sidebar. Convertiría el único componente compartido en client component y rompe el criterio de SPEC 01.
- **Sí:** perfiles completos para los ocho niños. Cada tarjeta navega a un perfil real y con contenido variado.
- **No:** una única página de perfil como el prototipo. Clicar a Sofía y ver el perfil de Mateo parece roto incluso en una demo de diseño.
- **Sí:** buscador solo visual. El prototipo no define ningún filtrado.
- **No:** filtrado client-side o por URL. Interacción inventada; además `searchParams` exigiría `<Suspense>` por PPR.
- **Sí:** fidelidad por pantalla en el conteo: 8 en `/kids`, 12 en `/`. Cada prototipo es la fuente de verdad de su pantalla.
- **No:** unificar el conteo. Tocaría el home ya implementado por una inconsistencia entre prototipos.
- **Sí:** alergias solo en Mateo y Tomás. El listado del prototipo solo muestra los badges MANÍ y LACTOSA; inventar más alergias no aporta.
- **Sí:** `Avatar` compartido con variantes `soft`/`solid` y tres tamaños. El mismo markup sirve para lista, perfil y padres.
- **No:** `AllergyNote` y `DetailList` como componentes separados. Se usan una sola vez; viven en la página del perfil.
- **Sí:** `generateStaticParams` + `notFound()`. Páginas estáticas sin Suspense y con 404 real para ids desconocidos.
- **Sí:** tokens en `@theme` para los grupos semánticos nuevos y valores arbitrarios para colores one-off. Convención de SPEC 01.
- **Sí:** enlaces a pantallas inexistentes como elementos `aria-disabled` ("Agregar niño", "Editar", "Resumen del día", "Vincular otro padre"). Convención de SPEC 01.

## Riesgos identificados

| Riesgo                                                       | Mitigación                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Los literales inventados de los 7 niños pueden chocar con futuros prototipos | Viven solo en `app/_data/children.ts`; se ajustan sin tocar componentes. |
| Rutas en inglés con copy en español puede confundir en specs futuras (¿avisos → `/notices`?) | La decisión queda registrada; cada spec futura define su ruta en inglés. |
| La sidebar compartida se modifica; una regresión rompe el home | El paso 5 exige verificación de `/` idéntico a SPEC 01 antes de continuar. |

## Lo que **no** está en este spec

- Filtrado del buscador.
- Crear, editar o dar de baja niños; vincular o desvincular padres; resumen del día.
- Pantallas de agregar niño, resumen del día, vincular padre, avisos, mi cuenta, crear publicación y login.
- Autenticación, roles, base de datos, API y persistencia.
- Unificar el conteo de niños entre el feed y el listado.
- Imágenes reales, navegación mobile y dark mode.

Cada uno de esos puntos, si llega, va en su propia spec.
