const technologiesColors = {
  html: "bg-red-500 text-red-900",
  css: "bg-blue-500 text-blue-900",
  react: "bg-blue-500 text-blue-900",
  flutter: "bg-blue-500 text-blue-900",
  "next js": "bg-black text-white",
  "vue js": "bg-green-500 text-green-900",
  astro: "bg-black text-white",
  pinia: "bg-green-500 text-green-900",
  tailwindcss: "bg-cyan-500 text-cyan-900",
  "node js": "bg-green-500 text-green-900",
  nodejs: "bg-green-500 text-green-900",
  express: "bg-gray-500 text-gray-900",
  fastify: "bg-blue-500 text-blue-900",
  zustand: "bg-blue-500 text-blue-900",
  "react query": "bg-blue-500 text-blue-900",
  "socket io": "bg-black text-white",
  mongodb: "bg-green-500 text-green-900",
  firebase: "bg-yellow-500 text-yellow-900",
  postgresql: "bg-blue-500 text-blue-900",
  graphql: "bg-pink-500 text-pink-900",
  apollo: "bg-gray-500 text-gray-900",
  prisma: "bg-gray-500 text-gray-900",
  typescript: "bg-blue-500 text-blue-900",
  javascript: "bg-yellow-500 text-yellow-900",
  dart: "bg-blue-500 text-blue-900",
  sass: "bg-pink-500 text-pink-900",
  bootstrap: "bg-purple-500 text-purple-900",
  "material-ui": "bg-blue-500 text-blue-900",
  figma: "bg-purple-500 text-purple-900",
  "adobe xd": "bg-red-500 text-red-900",
  photoshop: "bg-blue-500 text-blue-900",
  illustrator: "bg-yellow-500 text-yellow-900",
  indesign: "bg-red-500 text-red-900",
  "after effects": "bg-green-500 text-green-900",
  "premiere pro": "bg-pink-500 text-pink-900",
  jwt: "bg-black text-white",
  "mui/ui react": "bg-blue-500 text-blue-900",
  "react-query": "bg-blue-500 text-blue-900",
  pug: "bg-green-500 text-green-900",
  mysql: "bg-blue-500 text-blue-900",
  python: "bg-blue-500 text-blue-900",
  fastapi: "bg-green-500 text-green-900",
  flet: "bg-blue-500 text-blue-900",
  "vue router": "bg-green-500 text-green-900",
  "vue-query": "bg-green-500 text-green-900",
  "firebase-storage": "bg-yellow-500 text-yellow-900",
  vuefire: "bg-green-500 text-green-900",
  "toastify-js": "bg-blue-500 text-blue-900",
  formkit: "bg-blue-500 text-blue-900",
  supabase: "bg-blue-500 text-blue-900",
  axios: "bg-blue-500 text-blue-900",
  provider: "bg-blue-500 text-blue-900",
};

type tecnology = keyof typeof technologiesColors;

interface Proyect {
  id: string;
  name: string;
  description: string;
  image: string;
  tecnologias: tecnology[];
}

interface TypeLinks {
  frontend: string;
  backend: string;
}

interface TypeProyects {
  id: string;
  title: string;
  typeProyect: string;
  description: string;
  tecnologies: string[];
  characteristics: string[];
  learning: string[];
  image: string;
  imagenesProyect: string[];
  link: string;
  createdAt: string;
  links: TypeLinks;
  status: string;
  counter_likes: number;
}

export { technologiesColors };
export type { Proyect, tecnology, TypeProyects, TypeLinks };
