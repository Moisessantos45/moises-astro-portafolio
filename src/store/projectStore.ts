import { ref } from "vue";
import api from "@/api/config";
import {
  initialProject,
  type Project,
  type ProjectDTO,
} from "@/types/project";
import {
  mapperProject,
  mapperProjectDTO,
} from "@/helpers/mappers/project";
import { initialPaginationState, type Pagination } from "@/types/pagination";
import { mapperPagination } from "@/helpers/mappers/paginated";

const projects = ref<Project[]>([]);
const isLoading = ref(false);
const isLoaded = ref(false);
const error = ref<Error | null>(null);
const paginated = ref<Pagination>(structuredClone(initialPaginationState));

export function useProjectsStore() {
  const getAllProjects = async (forceRefresh = false): Promise<Project[]> => {
    if (isLoaded.value && projects.value.length > 0 && !forceRefresh) {
      return projects.value;
    }

    if (isLoading.value) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isLoading.value) {
            clearInterval(interval);
            resolve(projects.value);
          }
        }, 50);
      });
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api.get("/project/public", {
        params: {
          pageSize: paginated.value.pageSize,
          page: paginated.value.page,
        },
      });
      const newData = data["data"]["data"] ?? [];

      const mappedProjects = newData.map(mapperProject);

      projects.value = mappedProjects;

      paginated.value = mapperPagination(data["data"]["paginate"]);
      isLoaded.value = true;

      return mappedProjects;
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error("An unknown error occurred");
      projects.value = [];
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const getProjectBySlug = async (slug: string): Promise<ProjectDTO> => {
    try {
      const { data } = await api.get(`/project/${slug}`);

      const projectData = data["data"];
      return mapperProjectDTO(projectData);
    } catch (_) {
      return initialProject;
    }
  };

  // const updateProjectLikes = async (proyect: TypeProject) => {
  //   try {
  //     await api.put(`/project/likes/${proyect.id}`, {});
  //   } catch (error) {
  //     return;
  //   }
  // };

  const getLatestProjects = async (): Promise<Project[]> => {
    try {
      const { data } = await api.get("/project/recent", {
        params: {
          max: 4,
        },
      });
      const projectData = data["data"]["data"] ?? [];
      return projectData.map(mapperProject);
    } catch (_) {
      return [];
    }
  };

  const refresh = async (): Promise<Project[]> => {
    return getAllProjects(true);
  };

  const clearCache = () => {
    projects.value = [];
    isLoaded.value = false;
    error.value = null;
  };

  return {
    projects,
    isLoading,
    isLoaded,
    error,
    paginated,
    getAllProjects,
    // updateProjectLikes,
    getLatestProjects,
    getProjectBySlug,
    refresh,
    clearCache,
  };
}
