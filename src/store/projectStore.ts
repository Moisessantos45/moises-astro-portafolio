import { ref } from "vue";
import { api } from "@/api/config";
import type { TypeProject } from "@/types/data";
import { fromToJsonMap } from "@/service/data.service";
import { initialState } from "@/service/api";

const projectsCache = ref<TypeProject[]>([]);
const isLoading = ref(false);
const isLoaded = ref(false);
const error = ref<Error | null>(null);

export function useProjectsStore() {
  const fetchProjects = async (
    forceRefresh = false,
  ): Promise<TypeProject[]> => {
    if (isLoaded.value && projectsCache.value.length > 0 && !forceRefresh) {
      return projectsCache.value;
    }
    if (isLoading.value) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isLoading.value) {
            clearInterval(interval);
            resolve(projectsCache.value);
          }
        }, 50);
      });
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api.get("/project");
      const newData = data["data"] ?? [];

      const mappedProjects = newData
        .map(fromToJsonMap)
        .sort((a: TypeProject, b: TypeProject) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

      projectsCache.value = mappedProjects;
      isLoaded.value = true;

      return mappedProjects;
    } catch (err) {
      error.value = err as Error;
      projectsCache.value = [];
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const getProjectById = async (id: string): Promise<TypeProject> => {
    try {
      const { data } = await api.get(`/project/${id}`);
      const projectData = data["data"] ?? initialState;
      return fromToJsonMap(projectData);
    } catch (error) {
      return initialState;
    }
  };

  const updateProjectLikes = async (proyect: TypeProject) => {
    try {
      await api.put(`/project/likes/${proyect.id}`, {});
    } catch (error) {
      return;
    }
  };

  const getLatestProjects = async (count: number): Promise<TypeProject[]> => {
    const projects = await fetchProjects();
    return projects.slice(0, count);
  };

  const getActiveProjects = async (): Promise<TypeProject[]> => {
    const projects = await fetchProjects();
    return projects.filter((p) => p.status === "active");
  };

  const getAllProjects = async (): Promise<TypeProject[]> => {
    return fetchProjects();
  };

  const refresh = async (): Promise<TypeProject[]> => {
    return fetchProjects(true);
  };
  const clearCache = () => {
    projectsCache.value = [];
    isLoaded.value = false;
    error.value = null;
  };

  return {
    projects: projectsCache,
    isLoading,
    isLoaded,
    error,
    fetchProjects,
    updateProjectLikes,
    getLatestProjects,
    getProjectById,
    getActiveProjects,
    getAllProjects,
    refresh,
    clearCache,
  };
}
