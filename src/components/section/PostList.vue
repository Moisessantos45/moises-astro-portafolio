<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Loading v-if="loading" class="py-16" />

    <template v-else>
      <PostItem v-for="(post, idx) in posts" :key="post.id" :post="post" :index="idx" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { usePostsStore } from "@/store/postStore";
import PostItem from "../PostItem.vue";
import Loading from "../Ui/Loading.vue";

const props = defineProps<{
  page?: number;
}>();

const { getAllPosts, posts, paginated } = usePostsStore();

const loading = ref(true);

const loadPosts = async () => {
  loading.value = true;
  try {
    if (props.page) {
      paginated.value.page = props.page;
    }
    await getAllPosts();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPosts();

  const handleNavigation = () => {
    const params = new URLSearchParams(window.location.search);
    const newPage = Number(params.get("page") || "1");
    if (newPage !== paginated.value.page) {
      paginated.value.page = newPage;
      getAllPosts(true);
    }
  };

  document.addEventListener("astro:after-swap", handleNavigation);
});

watch(() => props.page, () => {
  getAllPosts(true);
});
</script>
