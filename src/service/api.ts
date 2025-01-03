import type { TypeProyects } from "@/types/data";
import { fromToJsonMap } from "./data.service";
import { supabase } from "@/api/config";

const initialState: TypeProyects = {
  id: "",
  title: "",
  typeProyect: "",
  description: "",
  tecnologies: [],
  characteristics: [],
  image: "",
  imagenesProyect: [],
  link: "",
  createdAt: "",
  links: {
    frontend: "",
    backend: "",
  },
  status: "",
  counter_likes: 0,
};

const obtenerProyectos = async (): Promise<TypeProyects[]> => {
  try {
    const { data, error } = await supabase.from("Proyectos").select("*");
    if (error) throw error;
    const dataProjects = data.map(fromToJsonMap);
    return dataProjects;
  } catch (error) {
    return [];
  }
};

export { obtenerProyectos, initialState };
