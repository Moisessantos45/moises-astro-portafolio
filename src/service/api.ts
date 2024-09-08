import axios from "axios";
import type { TypeProyects } from "@/types/data";
import { fromToJsonMap } from "./data.service";
const url = import.meta.env.URL_BACKEND_HOST_API;

const initialState: TypeProyects = {
  id: "",
  title: "",
  typeProyect: "",
  description: "",
  tecnologies: [],
  caracteristicas: [],
  image: "",
  imagenesProyect: [],
  link: "",
  createdAt: "",
  link_github: {
    frontend: "",
    backend: "",
  },
  status: "",
};
const obtenerDatos = async (id: string): Promise<TypeProyects> => {
  const res = await axios(`${url}/Api/1.0/Proyects/${id}`);
  const data = res.data ? res.data : initialState;
  const convertData = fromToJsonMap(data);
  return convertData;
};

const obtenerProyectos = async (): Promise<TypeProyects[]> => {
  const res = await axios(`${url}/Api/1.0/Proyects`);
  const data = res.data ? res.data : [];
  const convertData = data.map(fromToJsonMap);
  return convertData;
};

export { obtenerDatos, obtenerProyectos, initialState };
