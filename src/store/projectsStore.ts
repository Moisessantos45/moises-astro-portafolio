import { ref } from "vue";
import { supabase } from "@/api/config";
import type { TypeProyects } from "@/types/data";
import { fromToJsonMap } from "@/service/data.service";

const projectsCache = ref<TypeProyects[]>([]);
const isLoading = ref(false);
const isLoaded = ref(false);
const error = ref<Error | null>(null);

export function useProjectsStore() {
  const fetchProjects = async (
    forceRefresh = false
  ): Promise<TypeProyects[]> => {
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
      const { data, error: supabaseError } = await supabase
        .from("Proyectos")
        .select("*");

      if (supabaseError) throw supabaseError;

      const mappedProjects = data.map(fromToJsonMap).sort((a, b) => {
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

  const getLatestProjects = async (count: number): Promise<TypeProyects[]> => {
    const projects = await fetchProjects();
    return projects.slice(0, count);
  };

  const getActiveProjects = async (): Promise<TypeProyects[]> => {
    const projects = await fetchProjects();
    return projects.filter((p) => p.status === "active");
  };

  const getAllProjects = async (): Promise<TypeProyects[]> => {
    return fetchProjects();
  };

  const refresh = async (): Promise<TypeProyects[]> => {
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
    getLatestProjects,
    getActiveProjects,
    getAllProjects,
    refresh,
    clearCache,
  };
}
