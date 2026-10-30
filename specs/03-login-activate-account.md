# SPEC 03 — Login y activación de cuenta

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-30
> **Objetivo:** Agregar las rutas `/login` y `/activate-account` como réplicas estáticas y fieles de `login.dc.html` y `activar-cuenta.dc.html`, sin el selector de rol Personal/Familia ni autenticación real.

## Alcance

**Incluido:**

- Ruta `/login`: pantalla completa a dos columnas (1.05fr / 1fr) sin sidebar, con panel izquierdo degradado (155deg, `#F6A98E` → `#F2937A` 45% → `#EC7E62`), dos círculos decorativos translúcidos, logo OpenDayCare, titular "El día de cada niño, compartido con su familia.", bajada y pie "🌿 Guardería Sala Soles".
- Panel derecho del login: "Iniciar sesión" / "Ingresá para ver el día de hoy.", campo EMAIL vacío con placeholder "caro@opendaycare.com", campo CONTRASEÑA con placeholder "••••••••", "¿Olvidaste tu contraseña?" no interactivo, CTA "Iniciar sesión" que navega a `/` y link "Activá tu cuenta" a `/activate-account`.
- Ruta `/activate-account`: columna centrada de 440px sobre fondo `#FBF4EC`, tile de logo de 58px, titular "Bienvenida a OpenDayCare" y bajada, tarjeta de invitación con avatar M de 44px y "Mateo · Sala Soles", campos CÓDIGO DE INVITACIÓN (`7K4P9`, Fredoka 18px, tracking 3px), EMAIL (`lucia.fernandez@gmail.com`) y CREAR CONTRASEÑA (`contraseña`, borde `#F2A78E`), consentimiento marcado no interactivo, CTA "Activar mi cuenta" no interactivo y link "Iniciar sesión" a `/login`.
- Componente compartido `app/_components/FormField.tsx` (etiqueta + input) para los cinco campos de ambas pantallas.
- Mocks tipados de la invitación en `app/_data/invitation.ts`.
- Tokens nuevos en `app/globals.css`: fondo de auth `#FBF4EC`, borde de inputs de auth `#EADFD0` y colores del consentimiento (`#FBF1D6`, `#8A7234`, `#5FB97E`).
- Títulos de pestaña "Iniciar sesión · OpenDayCare" y "Activar cuenta · OpenDayCare".

**Fuera de alcance (para specs futuras):**

- Autenticación, sesión, roles, validación de formularios y manejo de errores.
- Pantalla y flujo de "¿Olvidaste tu contraseña?".
- `familia-feed.dc.html` y el resto de las pantallas del lado familia; el CTA de activación queda no interactivo hasta esa spec.
- Interactividad real de los formularios (submit, toggle del consentimiento).
- Modificar las pantallas existentes (`/`, `/kids`, `/kids/[id]`), incluido conectar "Cerrar sesión" de la sidebar con `/login`.
- Navegación mobile y dark mode.

## Modelo de datos

No hay persistencia ni estructuras que sobrevivan entre sesiones. Se agrega un módulo mock en `app/_data/invitation.ts`:

```ts
export type Invitation = {
  childInitial: string; // "M"
  childLabel: string; // "Mateo · Sala Soles"
  code: string; // "7K4P9"
  email: string; // "lucia.fernandez@gmail.com"
  password: string; // "contraseña" (literal del prototipo)
  consentText: string; // "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app."
};

export const invitation = { /* literales de activar-cuenta.dc.html */ } satisfies Invitation;
```

Convenciones:

- Todos los valores son literales de `activar-cuenta.dc.html`; no se inventa ninguno.
- El login no tiene módulo de datos: su copy y su placeholder viven en la página.
- El avatar de la invitación es un span inline de 44px dentro de la página (fuera de los tamaños sm/md/lg de `Avatar`), con los colores `#A9D9E8` / `#1F7A93` de la variante `blue` suave.
- Los identificadores del código van en inglés; solo el copy visible queda en español.

## Plan de implementación

1. Extender `app/globals.css` con los tokens `--color-auth-bg`, `--color-auth-input-border`, `--color-consent-bg`, `--color-consent-fg` y `--color-consent-check`, sin tocar tokens existentes. Verificación: `npm run dev` levanta y `/` y `/kids` quedan idénticos.
2. Crear `app/_components/FormField.tsx`: etiqueta en mayúsculas (12px, peso 700, tracking .7px) e input (borde 1.5px, fondo `#FFF`, radios 14px, padding 14px/16px) con props `label`, `type`, `placeholder`, `defaultValue` y `inputClassName`. Verificación: `npx tsc --noEmit` pasa.
3. Crear `app/_data/invitation.ts` con el tipo y los literales. Verificación: `npx tsc --noEmit` pasa.
4. Crear `app/login/page.tsx`: grid a pantalla completa, panel izquierdo (gradiente, círculos, logo, titular con salto de línea, pie), formulario con dos `FormField`, "¿Olvidaste tu contraseña?" `aria-disabled`, CTA como `Link` a `/` y link a `/activate-account`. Verificación: `/login` reproduce el prototipo sin el selector de rol y ambos links navegan.
5. Crear `app/activate-account/page.tsx`: columna de 440px, tile de logo, tarjeta de invitación con avatar inline, tres `FormField` (código con Fredoka 18px y tracking 3px; contraseña con borde `#F2A78E`), consentimiento marcado no interactivo, CTA `aria-disabled` y link a `/login`. Verificación: `/activate-account` reproduce el prototipo.
6. Pasada de fidelidad visual contra `login.dc.html` y `activar-cuenta.dc.html` (medidas, colores, sombras, radios, tipografías, interlineados) y chequeo de regresión de `/`, `/kids` y `/kids/1`. Verificación: comparación a 924×540 y revisión a 1440 de ancho.

## Criterios de aceptación

- [ ] `/login` ocupa toda la pantalla con dos columnas (1.05fr / 1fr) y no muestra la sidebar de la app.
- [ ] El panel izquierdo usa el gradiente 155deg `#F6A98E` → `#F2937A` (45%) → `#EC7E62` con los dos círculos decorativos translúcidos.
- [ ] El logo (tile + "OpenDayCare") queda arriba, el titular "El día de cada niño, compartido con su familia." al medio y "🌿 Guardería Sala Soles" abajo.
- [ ] No aparece el selector "INGRESO COMO" ni los botones "Personal" y "Familia".
- [ ] El formulario derecho muestra "Iniciar sesión", "Ingresá para ver el día de hoy.", EMAIL y CONTRASEÑA.
- [ ] EMAIL está vacío con placeholder "caro@opendaycare.com"; CONTRASEÑA muestra el placeholder "••••••••".
- [ ] "¿Olvidaste tu contraseña?" se ve como texto `#C5503A` pero es `aria-disabled` y no navega.
- [ ] El botón "Iniciar sesión" navega a `/`.
- [ ] "¿Te invitó la guardería? Activá tu cuenta" navega a `/activate-account`.
- [ ] `/activate-account` muestra la columna centrada de 440px sobre fondo `#FBF4EC` con el tile de logo de 58px.
- [ ] Se leen "Bienvenida a OpenDayCare" y "Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta."
- [ ] La tarjeta de invitación muestra el avatar M (44px, fondo `#A9D9E8`), "Te invitaron a seguir a" y "Mateo · Sala Soles".
- [ ] El campo CÓDIGO DE INVITACIÓN muestra "7K4P9" en Fredoka 18px con tracking de 3px.
- [ ] EMAIL muestra "lucia.fernandez@gmail.com" y CREAR CONTRASEÑA muestra la contraseña enmascarada con borde `#F2A78E`.
- [ ] La caja de consentimiento aparece marcada con fondo `#FBF1D6`, check `#5FB97E` y texto `#8A7234`, y no es interactiva.
- [ ] "Activar mi cuenta" tiene el estilo CTA del prototipo pero es `aria-disabled` y no navega.
- [ ] "¿Ya tenés cuenta? Iniciar sesión" navega a `/login`.
- [ ] Ningún componente nuevo usa `"use client"`, handlers de eventos ni `fetch`.
- [ ] Los fondos de ambas pantallas son `#FBF4EC` (token de auth), no el canvas `#F6ECDF` del resto de la app.
- [ ] Las pestañas se titulan "Iniciar sesión · OpenDayCare" y "Activar cuenta · OpenDayCare".
- [ ] No hay scroll horizontal a 924×540 ni a 1440 de ancho.
- [ ] `/`, `/kids` y `/kids/1` se ven idénticos a SPEC 01/02 (sin regresiones).
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] La consola del navegador no muestra errores ni advertencias de hidratación.

## Decisiones tomadas y descartadas

- **Sí:** eliminar el selector "INGRESO COMO" (Personal/Familia). Decisión explícita del usuario; el login no distingue roles.
- **Sí:** CTA "Iniciar sesión" → `/`. Decisión del usuario: es la única home implementada y el destino del personal en el prototipo.
- **Sí:** CTA "Activar mi cuenta" `aria-disabled`. Decisión del usuario: familia-feed no existe; se vuelve link real en su propia spec.
- **Sí:** EMAIL vacío con placeholder "caro@opendaycare.com". Decisión del usuario: conserva la referencia visual del prototipo sin dejar un mail cargado.
- **Sí:** ruta `/activate-account`. Decisión del usuario: traducción 1:1 de "activar-cuenta", consistente con las rutas en inglés de SPEC 02.
- **Sí:** fondo de auth propio `#FBF4EC` como token `--color-auth-bg`. Los prototipos de auth no usan el canvas `#F6ECDF` del feed.
- **Sí:** `FormField` compartido. Cinco usos entre las dos pantallas; centraliza el estilo de input de auth.
- **Sí:** mocks de la invitación en `app/_data/invitation.ts`. Convención de `_data` de SPEC 01/02.
- **No:** derivar la invitación de `children.ts`. Cada prototipo es la verdad de su pantalla (criterio SPEC 02); desacoplar evita que un cambio en Niños rompa Activar.
- **No:** extender `Avatar` con un cuarto tamaño. El avatar de 44px se usa una sola vez; va inline en la página.
- **Sí:** SVG del sol duplicado inline por pantalla (26px login, 30px activar). Convención de SVG por archivo; `PlusIcon` ya se duplica entre Sidebar y `/kids`.
- **Sí:** gradientes y sombras one-off como valores arbitrarios (panel izquierdo, sombra de los CTA). Convención de SPEC 02 para colores de un solo uso.
- **Sí:** "¿Olvidaste tu contraseña?" y la caja de consentimiento como elementos `aria-disabled`. No existen pantalla de recuperación ni interacción definida.
- **No:** autenticación, validación ni manejo de errores. Réplicas estáticas, como SPEC 01/02.
- **No:** `"use client"`, estado o handlers. `defaultValue` y el buscador de `/kids` ya prueban que los inputs uncontrolled funcionan sin client JS.
- **No:** conectar "Cerrar sesión" de la sidebar con `/login`. El prototipo lo mantiene deshabilitado y este spec no toca pantallas existentes.

## Riesgos identificados

| Riesgo | Mitigación |
| --- | --- |
| Modificar `globals.css` puede regresar las pantallas existentes | Solo se agregan tokens nuevos; el paso 1 exige ver `/` y `/kids` idénticos antes de seguir. |
| El fondo `#FBF4EC` de auth difiere del canvas `#F6ECDF` y puede parecer inconsistente | Decisión registrada: cada prototipo es la fuente de verdad de su pantalla (mismo criterio que el 8 vs 12 de SPEC 02). |
| La CTA "Activar mi cuenta" no interactivo puede parecer rota | Mismo criterio que "Agregar niño" y "Resumen del día" en SPEC 01/02; se habilita con la spec de familia-feed. |

## Lo que **no** está en este spec

- Autenticación, roles, sesión, validación y errores.
- Recuperación de contraseña.
- familia-feed y el resto de las pantallas del lado familia.
- Interactividad de los formularios, navegación mobile y dark mode.
- Cambios en las pantallas ya implementadas.

Cada uno de esos puntos, si llega, va en su propia spec.
