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
  id: number; // id numérico: 1–8 en orden del prototipo
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

export const children = [
  {
    id: 1,
    name: "Mateo Fernández",
    initial: "M",
    avatarColor: "blue",
    ageLabel: "3 años",
    room: "Soles",
    birthDate: "12 mar 2022",
    enrolled: "feb 2025",
    allergy: {
      badge: "Maní",
      note: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    },
    parents: [
      {
        name: "Lucía Fernández",
        initial: "L",
        relation: "Mamá",
        status: "active",
        avatarColor: "purple",
      },
      {
        name: "Diego Fernández",
        initial: "D",
        relation: "Papá",
        status: "pending",
        avatarColor: "sky",
      },
    ],
  },
  {
    id: 2,
    name: "Sofía Méndez",
    initial: "S",
    avatarColor: "pink",
    ageLabel: "2 años",
    room: "Soles",
    birthDate: "8 feb 2023",
    enrolled: "mar 2025",
    parents: [
      {
        name: "Ana Méndez",
        initial: "A",
        relation: "Mamá",
        status: "active",
        avatarColor: "green",
      },
    ],
  },
  {
    id: 3,
    name: "Benjamín Ruiz",
    initial: "B",
    avatarColor: "green",
    ageLabel: "3 años",
    room: "Soles",
    birthDate: "5 ene 2022",
    enrolled: "feb 2025",
    parents: [
      {
        name: "Paula Ruiz",
        initial: "P",
        relation: "Mamá",
        status: "active",
        avatarColor: "yellow",
      },
      {
        name: "Marcos Ruiz",
        initial: "M",
        relation: "Papá",
        status: "active",
        avatarColor: "blue",
      },
    ],
  },
  {
    id: 4,
    name: "Valentina Soto",
    initial: "V",
    avatarColor: "yellow",
    ageLabel: "2 años",
    room: "Soles",
    birthDate: "10 nov 2022",
    enrolled: "abr 2025",
    parents: [],
  },
  {
    id: 5,
    name: "Tomás Díaz",
    initial: "T",
    avatarColor: "purple",
    ageLabel: "3 años",
    room: "Soles",
    birthDate: "22 abr 2022",
    enrolled: "feb 2025",
    allergy: {
      badge: "Lactosa",
      note: "Alergia a la lactosa. Evitar leche y derivados. Le servimos bebida vegetal en la merienda.",
    },
    parents: [
      {
        name: "Marina Díaz",
        initial: "M",
        relation: "Mamá",
        status: "active",
        avatarColor: "pink",
      },
    ],
  },
  {
    id: 6,
    name: "Emma Castro",
    initial: "E",
    avatarColor: "pink",
    ageLabel: "2 años",
    room: "Soles",
    birthDate: "30 may 2023",
    enrolled: "mar 2025",
    parents: [
      {
        name: "Julián Castro",
        initial: "J",
        relation: "Papá",
        status: "active",
        avatarColor: "sky",
      },
    ],
  },
  {
    id: 7,
    name: "Lucas Romero",
    initial: "L",
    avatarColor: "blue",
    ageLabel: "3 años",
    room: "Soles",
    birthDate: "17 sep 2021",
    enrolled: "ago 2024",
    parents: [
      {
        name: "Romina Romero",
        initial: "R",
        relation: "Mamá",
        status: "active",
        avatarColor: "purple",
      },
    ],
  },
  {
    id: 8,
    name: "Olivia Vega",
    initial: "O",
    avatarColor: "green",
    ageLabel: "2 años",
    room: "Soles",
    birthDate: "25 dic 2022",
    enrolled: "abr 2025",
    parents: [
      {
        name: "Martín Vega",
        initial: "M",
        relation: "Papá",
        status: "active",
        avatarColor: "green",
      },
    ],
  },
] satisfies Child[];
