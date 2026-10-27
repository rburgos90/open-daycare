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

export const posts = [
  {
    id: "mateo-potty-milestone",
    kind: "achievement",
    author: { kind: "child", name: "Mateo", initial: "M" },
    time: "14:20",
    publishedBy: "vos",
    recipient: "familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "mateo-painting-tempera",
    kind: "activity",
    author: { kind: "child", name: "Mateo", initial: "M" },
    time: "09:40",
    publishedBy: "vos",
    recipient: "familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { alt: "Foto · pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "park-trip-reminder",
    kind: "announcement",
    author: { kind: "announcement", label: "Anuncio general" },
    time: "07:50",
    publishedBy: "vos",
    recipient: "toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
] satisfies FeedPost[];
