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
  counter_likes: 0,
};

const sortedDate = (list: TypeProyects[]) => {
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

const reorganizeList = (list: TypeProyects[]) => {
  const sortedData = sortedDate(list);

  const firtsProyect = sortedData.slice(0, sortedData.length / 2);
  const secondProyect = sortedData.slice(
    sortedData.length / 2,
    sortedData.length
  );
  return [...firtsProyect, ...secondProyect];
};

const obtenerDatos = async (id: string): Promise<TypeProyects> => {
  const res = await axios(`${url}/Api/1.0/Proyects/${id}`);
  const data = res.data ? res.data : initialState;
  const convertData = fromToJsonMap(data);
  return convertData;
};

const obtenerProyectos = async (): Promise<TypeProyects[]> => {
  try {
    const res = await axios(`${url}/Api/1.0/Proyects`);
    const data = res.data ? res.data : [];
    const convertData = data.map(fromToJsonMap);
    const sortedData = sortedDate(convertData);
    const reorganizedData = reorganizeList(sortedData);
    return reorganizedData;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

const saveLikeProyect = async (
  id: string,
  value: number,
  api: string
): Promise<boolean> => {
  try {
    console.log("id", id, api);
    const res = await axios.patch(
      `${api}/Api/1.0/Proyects/update/counter-likes/${id}?counter_likes=${value}`
    );
    const data = res.data ? res.data : { success: false };
    return data.success;
  } catch (error) {
    return false;
  }
};

export { obtenerDatos, obtenerProyectos, saveLikeProyect, initialState };
