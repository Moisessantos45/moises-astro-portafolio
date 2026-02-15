import type { TypeProject } from "@/types/data";
import { fromToJsonMap } from "./data.service";
import { useProjectsStore } from "@/store/projectStore";

const initialState: TypeProject = {
  id: "",
  title: "",
  typeProyect: "",
  description: "",
  tecnologies: [],
  characteristics: [],
  learning: [],
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

const loadProjectData = async (): Promise<TypeProject[]> => {
  try {
    const data = await useProjectsStore().fetchProjects();
    const dataProjects = data.map(fromToJsonMap);
    return dataProjects;
  } catch (error) {
    return [];
  }
};

export { loadProjectData, initialState };
