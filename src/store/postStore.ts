import { ref } from "vue";
import api from "@/api/config";
import { initialPostData, type PostInfoBasic } from "@/types/post";
import { mapperPostInfoBasic } from "@/helpers/mappers/post";
import { initialPaginationState, type Pagination } from "@/types/pagination";
import { mapperPagination } from "@/helpers/mappers/paginated";

const posts = ref<PostInfoBasic[]>([]);
const isLoading = ref(false);
const isLoaded = ref(false);
const error = ref<Error | null>(null);
const paginated = ref<Pagination>(structuredClone(initialPaginationState));

export function usePostsStore() {
  const getAllPosts = async (
    forceRefresh = false,
  ): Promise<PostInfoBasic[]> => {
    if (isLoaded.value && posts.value.length > 0 && !forceRefresh) {
      return posts.value;
    }

    if (isLoading.value) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isLoading.value) {
            clearInterval(interval);
            resolve(posts.value);
          }
        }, 50);
      });
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api.get("/post/public", {
        params: {
          pageSize: paginated.value.pageSize,
          page: paginated.value.page,
        },
      });
      const newData = data["data"]["data"] ?? [];

      const mappedPosts = newData.map(mapperPostInfoBasic);

      posts.value = mappedPosts;

      paginated.value = mapperPagination(data["data"]["paginate"]);
      isLoaded.value = true;

      return mappedPosts;
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error("An unknown error occurred");
      posts.value = [];
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const getPostBySlug = async (slug: string): Promise<PostInfoBasic> => {
    try {
      const { data } = await api.get(`/post/${slug}`);
      const postData = data["data"];
      return mapperPostInfoBasic(postData);
    } catch (_) {
      return initialPostData;
    }
  };

  const getLatestPosts = async (): Promise<PostInfoBasic[]> => {
    try {
      const { data } = await api.get("/post/recent", {
        params: {
          max: 4,
        },
      });
      const postData = data["data"]["data"] ?? [];
      return postData.map(mapperPostInfoBasic);
    } catch (_) {
      return [];
    }
  };

  const refresh = async (): Promise<PostInfoBasic[]> => {
    return getAllPosts(true);
  };

  const clearCache = () => {
    posts.value = [];
    isLoaded.value = false;
    error.value = null;
  };

  return {
    posts,
    isLoading,
    isLoaded,
    error,
    paginated,
    getAllPosts,
    getLatestPosts,
    getPostBySlug,
    refresh,
    clearCache,
  };
}
