export type Invitation = {
  childInitial: string; // "M"
  childLabel: string; // "Mateo · Sala Soles"
  code: string; // "7K4P9"
  email: string; // "lucia.fernandez@gmail.com"
  password: string; // "contraseña" (literal del prototipo)
  consentText: string; // "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app."
};

export const invitation = {
  childInitial: "M",
  childLabel: "Mateo · Sala Soles",
  code: "7K4P9",
  email: "lucia.fernandez@gmail.com",
  password: "contraseña",
  consentText:
    "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.",
} satisfies Invitation;
