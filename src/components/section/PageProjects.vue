<template>
  <Loading v-if="projects.length === 0" />
  <CardItem class="card__project" v-for="proyect in projects" :key="proyect.id" :proyect="proyect" ref="cardRefs" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProjectsStore } from "@/store/projectsStore";
import type { TypeProyects } from "@/types/data";
import { useIntersectionObserver } from "@vueuse/core";
import CardItem from "../CardItem.vue";
import Loading from "../Ui/Loading.vue";

const { getActiveProjects } = useProjectsStore();

const projects = ref<TypeProyects[]>([]);
const cardRefs = ref([]);

const loadProjects = async () => {
  try {
    projects.value = await getActiveProjects();
  } catch (error) {
    projects.value = [];
  }
};

const observerCallback = (entries: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
};

const { stop } = useIntersectionObserver(cardRefs, observerCallback, {
  threshold: 0.2,
});

onMounted(() => {
  loadProjects();
  cardRefs.value.forEach((card) => {
    if (card) {
      stop();
    }
  });
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

.card__project {
  opacity: 0;
  transition: 150ms;
}

.show {
  opacity: 1;
}
</style>
