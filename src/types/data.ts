
const technologiesColors = {
  React: "bg-blue-500 text-blue-900",
  "Next js": "bg-black text-white",
  "Tailwind css": "bg-cyan-500 text-cyan-900",
  "Node js": "bg-green-500 text-green-900",
  Express: "bg-gray-500 text-gray-900",
  zustand: "bg-blue-500 text-blue-900",
  "Socket IO": "bg-black text-white",
  MongoDB: "bg-green-500 text-green-900",
  Firebase: "bg-yellow-500 text-yellow-900",
  PostgreSQL: "bg-blue-500 text-blue-900",
  GraphQL: "bg-pink-500 text-pink-900",
  Apollo: "bg-gray-500 text-gray-900",
  Prisma: "bg-gray-500 text-gray-900",
  TypeScript: "bg-blue-500 text-blue-900",
  JavaScript: "bg-yellow-500 text-yellow-900",
  HTML: "bg-red-500 text-red-900",
  CSS: "bg-blue-500 text-blue-900",
  SASS: "bg-pink-500 text-pink-900",
  Bootstrap: "bg-purple-500 text-purple-900",
  "Material-UI": "bg-blue-500 text-blue-900",
  Figma: "bg-purple-500 text-purple-900",
  "Adobe XD": "bg-red-500 text-red-900",
  Photoshop: "bg-blue-500 text-blue-900",
  Illustrator: "bg-yellow-500 text-yellow-900",
  InDesign: "bg-red-500 text-red-900",
  "After Effects": "bg-green-500 text-green-900",
  "Premiere Pro": "bg-pink-500 text-pink-900",
};

type tecnology = keyof typeof technologiesColors;

interface Proyect {
  id: string;
  name: string;
  description: string;
  image: string;
  tecnologias: tecnology[];
}

interface TypeProyects {
  id: string;
  title: string;
  description: string;
  tecnologies: string[];
  caracteristicas: string[];
  image: string;
  imagenesProyect: string[];
  link: string;
  createdAt: string;
}

const obtenerDatos = async (id: string): Promise<TypeProyects[]> => {
  const url = import.meta.env.URL_BACKEND_HOST_API;
  const res = await fetch(`${url}/Api/1.0/Proyects/${id}`);
  const data = await res.json();
  return data;
};

const obtenerProyectos = async (): Promise<TypeProyects[]> => {
  const url = import.meta.env.URL_BACKEND_HOST_API;
  const res = await fetch(`${url}/Api/1.0/Proyects`);
  const data = await res.json();
  return data;
};

export { obtenerDatos, obtenerProyectos, technologiesColors };
export type { Proyect, tecnology, TypeProyects };
