# SPEC 05 — Modal Vincular padre

> **Estado:** Aprobado
> **Depende de:** SPEC 02, SPEC 04
> **Fecha:** 2026-10-30
> **Objetivo:** Abrir desde el perfil de cada niño un modal fiel a `references/pantallas/vincular-padre.dc.html` para invitar a un padre, reutilizando el patrón `<dialog>` de SPEC 04 y sin persistir datos.

## Alcance

**Incluido:**

- Componente `app/_components/LinkParentDialog.tsx` (`"use client"`):
  - Disparador "Vincular otro padre" que reemplaza el `span aria-disabled` actual de `ParentList`: botón real con el mismo círculo punteado de 40 px, texto `accent-strong` de 14.5 px/800 y `pt-2`, más `cursor-pointer`.
  - `<dialog>` nativo abierto con `showModal()`: foco atrapado, cierre con Esc, `::backdrop` `rgb(63 54 46 / 0.4)` y retorno de foco al disparador.
  - Tarjeta de 480 px (ancho del prototipo), fondo `#FBF4EC` (`auth-bg`), borde `#ECE0D0` (`line`), radios 24 px y sombra `0 20px 50px -24px rgb(63 54 46 / 0.35)`.
  - Header con padding 20 px/26 px y borde inferior `line`: título "Vincular padre" (Fredoka 18 px/600), subtítulo "a {nombre completo del niño}" (13 px, `muted`) y botón X de 34×34 px, radios 10 px, fondo `line-soft`, color `muted-strong` e icono de 18 px. No hay "Cancelar" ni "Guardar".
  - Cuerpo con padding 22 px/26 px:
    - Banner informativo azul (`#E3ECFB`, radios 14 px, padding 13 px/16 px, gap 11 px, margen inferior 20 px) con icono de info de 20 px `#4E72C8` y texto 13.5 px `#3F5694`: "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {nombre de pila}."
    - NOMBRE DEL PADRE/MADRE: input de texto, placeholder "Ej. Diego Fernández".
    - EMAIL: `type="email"`, placeholder "correo@ejemplo.com".
    - PARENTESCO: tres pills "Mamá", "Papá" y "Tutor/a" como radios nativos, con "Mamá" preseleccionada.
    - CÓDIGO DE INVITACIÓN: caja `consent-bg` con borde punteado 1.5 px `#E6D08A`, código "7K4P9" (Fredoka 34 px/600, tracking 7 px) y "Vence en 7 días".
    - CTA "Enviar invitación" con gradiente `cta-from`/`cta-to`, icono de avión de papel y la sombra del prototipo; cierra el modal sin persistir ni navegar.
  - Cierre por X, Esc, clic en el scrim y "Enviar invitación".
- `app/_components/ParentList.tsx`: nueva prop opcional `action?: ReactNode` que se renderiza después de las filas de padres; se elimina el `span` deshabilitado hardcodeado. `ParentList` sigue siendo server component.
- `app/kids/[id]/page.tsx`: pasa `action={<LinkParentDialog childName={child.name} />}` a `ParentList`, sin otros cambios.
- Tokens nuevos en `app/globals.css` para el dominio del modal: banner, pills activas y caja de código. Se reutilizan `auth-bg`, `auth-input-border`, `line`, `line-soft`, `surface`, `nav`, `muted`, `muted-strong`, `consent-bg`, `consent-fg`, `cta-from` y `cta-to`.

**Adaptaciones no definidas por el prototipo:** el prototipo es una página completa y no define overlay; se usa scrim translúcido, tarjeta centrada y scroll interno del cuerpo en viewports bajos. Los pills agregan un `focus-visible` ring para navegación por teclado. La X y el CTA del prototipo son enlaces al perfil; en el modal son botones que lo cierran.

**Fuera de alcance (para specs futuras):**

- Persistencia y alta real del padre: no se agrega una fila PENDIENTE al listado.
- Validación de nombre/email, mensajes de error, estados de carga y envío real de correo.
- Generación de códigos, expiración real o códigos distintos por niño.
- Desvincular o editar padres.
- Abrir el modal desde `/kids` o desde otro punto que no sea el perfil.
- Animaciones de entrada/salida, navegación mobile y dark mode.

## Modelo de datos

No hay persistencia ni estructuras nuevas. La única firma que cambia es la de `ParentList`:

```tsx
type ParentListProps = {
  parents: LinkedParent[];
  action?: ReactNode;
};
```

Y la del nuevo componente:

```tsx
type LinkParentDialogProps = {
  childName: string; // "Mateo Fernández"
};
```

Constantes locales del diálogo:

```ts
const invitationCode = "7K4P9";
const relationOptions = ["Mamá", "Papá", "Tutor/a"] as const;
```

Convenciones:

- El subtítulo usa el nombre completo (`childName`); el banner usa el nombre de pila derivado con `childName.split(" ")[0]`.
- `invitationCode` es un literal propio del modal y no se importa de `app/_data/invitation.ts`. Coinciden visualmente, pero desacoplar evita que el flujo de activación rompa la vinculación.
- Nombre y email son uncontrolled, sin estado de React ni `defaultValue`.
- Los identificadores del código van en inglés; solo el copy visible queda en español.

## Plan de implementación

1. Extender `app/globals.css` con el grupo de tokens del modal (`invite-info-*`, `invite-relation-active-*`, `invite-code-*`), sin tocar los existentes. Verificación: `npm run dev` levanta y `/`, `/kids` y `/kids/1` quedan idénticos.
2. Crear `app/_components/LinkParentDialog.tsx` con el disparador, el `<dialog>`, el header completo y la lógica de abrir/cerrar con retorno de foco. Verificación: `npx tsc --noEmit` pasa.
3. Extender `ParentList` con `action?: ReactNode` y pasar `<LinkParentDialog childName={child.name} />` desde `app/kids/[id]/page.tsx`. Verificación: el botón "Vincular otro padre" abre el modal en `/kids/1` y el resto del perfil no cambia.
4. Completar el cuerpo del modal: banner, campos, grupo de radios con Mamá por defecto, caja de código y CTA. Verificación: el modal reproduce el contenido del prototipo y "Enviar invitación" cierra.
5. Verificar interacciones y accesibilidad: selección exclusiva de parentesco con mouse y teclado, cierres por X/Esc/scrim/CTA, foco atrapado y devuelto, `aria-labelledby` y `aria-label` de la X. Verificación: recorrido manual en `npm run dev`.
6. Pasada de fidelidad visual contra `vincular-padre.dc.html` a 924×540 y 1440 de ancho: medidas, colores, borde punteado, tipografías y scroll interno sin desborde. Verificación: comparación con Playwright en `.playwright-mcp/`.
7. Pasada de no-regresión de `/`, `/kids`, `/kids/4` (Valentina, sin padres), `/login` y `/activate-account`, más `npm run lint`, `npx tsc --noEmit`, `npm run build` y consola sin errores ni advertencias de hidratación.

## Criterios de aceptación

- [ ] "Vincular otro padre" es un `<button>` real, sin `aria-disabled`, y abre el modal sin navegar.
- [ ] El modal se abre desde el perfil de los ocho niños; el subtítulo muestra el nombre completo del niño.
- [ ] El banner muestra el nombre de pila correcto ("Mateo", "Sofía", etc.) y no un literal fijo.
- [ ] En `/kids/4` (Valentina, sin padres) el disparador sigue visible y abre el modal.
- [ ] El modal es el único componente con `"use client"` que se renderiza en `/kids/[id]`; `ParentList` y la página siguen siendo server components.
- [ ] La tarjeta mide como máximo 480 px, con fondo `#FBF4EC`, borde `#ECE0D0`, radios 24 px y la sombra del prototipo, centrada sobre scrim `rgb(63 54 46 / 0.4)`.
- [ ] El header muestra "Vincular padre" (Fredoka 18 px/600), "a {nombre completo}" (13 px, `#A89A8B`), borde inferior `#ECE0D0` y la X de 34×34 px con fondo `#F0E6D8`.
- [ ] El header no muestra "Cancelar" ni "Guardar".
- [ ] El banner tiene fondo `#E3ECFB`, radios 14 px, icono `#4E72C8` y texto `#3F5694` de 13.5 px.
- [ ] NOMBRE DEL PADRE/MADRE muestra el placeholder "Ej. Diego Fernández".
- [ ] EMAIL es `type="email"` y muestra el placeholder "correo@ejemplo.com".
- [ ] Los tres pills tienen borde 1.5 px, radios 999 px y texto 14 px/800; "Mamá" aparece seleccionada con fondo `#CCD8F4`, borde `#9FB8EC` y texto `#4E72C8`.
- [ ] Al elegir "Papá" o "Tutor/a" la selección cambia y queda un solo pill activo; los no seleccionados usan fondo `#FFFDF9`, borde `#ECE0D0` y texto `#6E6359`.
- [ ] El grupo de parentesco funciona con teclado: Tab entra al grupo, las flechas cambian la opción y el anillo de foco es visible.
- [ ] La caja de código usa fondo `#FBF1D6`, borde punteado `#E6D08A` y muestra la etiqueta "CÓDIGO DE INVITACIÓN".
- [ ] El código "7K4P9" se muestra en Fredoka 34 px/600 con tracking de 7 px y color `#8A7234`.
- [ ] Debajo del código se lee "Vence en 7 días" en `#A88526` de 13 px.
- [ ] El CTA "Enviar invitación" usa el gradiente `#F4977E` → `#EE8164`, icono de avión de papel, texto blanco 15.5 px/800 y la sombra del prototipo.
- [ ] "Enviar invitación" cierra el modal sin persistir datos, sin navegar y sin agregar una fila de padre.
- [ ] El modal se cierra con la X, con Esc, con el clic en el scrim y con "Enviar invitación".
- [ ] El foco queda atrapado dentro del modal; el título está vinculado con `aria-labelledby` y al cerrar el foco vuelve a "Vincular otro padre".
- [ ] Nombre y email son uncontrolled: no hay estado de React para sus valores.
- [ ] El cuerpo del modal hace scroll interno a 924×540 sin desbordar el viewport ni generar scroll horizontal.
- [ ] `/kids` se ve idéntico a SPEC 02/04 y `/kids/1` solo cambia por el disparador ahora interactivo.
- [ ] Las pestañas siguen titulándose "<Nombre> · OpenDayCare" y "Niños · OpenDayCare".
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] La consola del navegador no muestra errores ni advertencias de hidratación.

## Decisiones tomadas y descartadas

- **Sí:** modal en vez de ruta aparte. Decisión del usuario; el prototipo enlaza `vincular-padre.dc.html` como página, pero el requisito es abrirlo como overlay.
- **Sí:** disparador solo en el perfil, reemplazando el `span aria-disabled` de SPEC 02. Esta spec supersede ese criterio; `/kids` queda intacto.
- **Sí:** `LinkParentDialog` como segundo client component de la app. La apertura y el cierre no existen sin client JS; la excepción queda acotada y `ParentList` sigue en el servidor mediante la prop `action`.
- **Sí:** `<dialog>` nativo + `showModal()`. Foco atrapado, Esc y backdrop sin librerías, igual que SPEC 04.
- **Sí:** "Enviar invitación" solo cierra. Sin persistencia ni alta de padre pendiente, consistente con "Guardar" de SPEC 04. La capa de datos llega con su propia spec.
- **Sí:** radios nativos para el parentesco. Permiten selección exclusiva y teclado sin estado de React ni interacción inventada.
- **Sí:** código fijo "7K4P9" como constante local. El prototipo no define generación ni expiración real; el texto "Vence en 7 días" es estático.
- **Sí:** nombres dinámicos por niño: nombre completo en el subtítulo y nombre de pila en el banner. Un literal "Mateo" se vería roto en los otros siete perfiles.
- **Sí:** ancho de 480 px, fiel al prototipo, en vez de los 520 px de `AddChildDialog`.
- **Sí:** tokens nuevos para el banner, el pill activo y la caja de código, y valores arbitrarios para la sombra del CTA y del modal. Convención de SPEC 02/04.
- **No:** reutilizar `invitation.ts`. Es el código de activación de la cuenta; acoplar ambos mocks haría que un cambio en login rompa la vinculación.
- **No:** reutilizar `FormField`. Usa etiqueta de 700 y no cubre banner, radios ni caja de código.
- **No:** extraer un `DialogShell` compartido con `AddChildDialog`. Dos usos con headers, acciones y anchos distintos; la abstracción sería prematura.
- **No:** validación, mensajes de error, envío real de correo, toasts, animaciones o persistencia. Nada de eso está definido por el prototipo.
- **No:** abrir el modal desde el listado. Decisión del usuario: solo perfil.

## Riesgos identificados

| Riesgo                                                                               | Mitigación                                                                                                     |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| El `<dialog>` queda anidado dentro de la tarjeta de `ParentList` y podría recortarse | `showModal()` lo lleva a la top layer y el `dialog` usa `fixed inset-0`; se verifica scrim completo a 924×540. |
| Segundo client component en el perfil: posible regresión de hidratación              | `/kids/[id]` ya declara `instant = false`; se exige consola limpia y no-regresión antes de cerrar.             |
| Cambiar la firma de `ParentList` afecta otros usos                                   | `ParentList` tiene un solo consumidor (`/kids/[id]`); se verifica el resto del perfil y `/kids`.               |
| "Enviar invitación" sin feedback puede parecer roto                                  | Decisión registrada, mismo criterio que SPEC 04; la persistencia y el estado real llegan en otra spec.         |
| Colores nuevos del banner/pills pueden chocar con tokens existentes                  | Se agregan tokens con prefijo `invite-` sin modificar los actuales; paso 1 verifica no-regresión.              |

## Lo que **no** está en este spec

- Persistencia, alta real del padre, envío de correo y estados de éxito/error.
- Validación de formularios y campos controlados.
- Generación o expiración real de códigos.
- Desvincular o editar padres.
- Abrir el modal desde `/kids` u otra pantalla.
- Animaciones, navegación mobile y dark mode.

Cada uno de esos puntos, si llega, va en su propia spec.
