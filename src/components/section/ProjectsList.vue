<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Loading v-if="loading" />

    <template v-else>
      <CardItem v-for="project in projects" :key="project.id" :project="project" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useProjectsStore } from "@/store/projectStore";
import CardItem from "../CardItem.vue";
import Loading from "../Ui/Loading.vue";

const props = defineProps<{
  page?: number;
}>();

const { getAllProjects, projects, paginated } = useProjectsStore();

const loading = ref(true);

const loadProjects = async () => {
  loading.value = true;
  try {
    if (props.page) {
      paginated.value.page = props.page;
    }
    await getAllProjects();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProjects();

  const handleNavigation = () => {
    const params = new URLSearchParams(window.location.search);
    const newPage = Number(params.get("page") || "1");
    if (newPage !== paginated.value.page) {
      paginated.value.page = newPage;
      getAllProjects(true);
    }
  };

  document.addEventListener("astro:after-swap", handleNavigation);
});

watch(() => props.page, () => {
  getAllProjects(true);
});
</script>
