import { mapperProject } from "@/helpers/mappers/project";
import { useProjectsStore } from "@/store/projectStore";
import type { Project } from "@/types/project";

const loadProjectData = async (): Promise<Project[]> => {
  try {
    const data = await useProjectsStore().getAllProjects();
    return data;
  } catch (error) {
    return [];
  }
};

export { loadProjectData };
