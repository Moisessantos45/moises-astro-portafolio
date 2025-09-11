<template>
  <Loading v-if="projects.length === 0" />
  <CardItem class="card__project" v-for="proyect in projects" :key="proyect.id" :proyect="proyect" ref="cardRefs" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/api/config";
import type { TypeProyects } from "@/types/data";
import { useIntersectionObserver } from "@vueuse/core";
import { fromToJsonMap } from "@/service/data.service";
import CardItem from "../CardItem.vue";
import Loading from "../Ui/Loading.vue";

const projects = ref<TypeProyects[]>([]);
const cardRefs = ref([]);

const getProjects = async () => {
  try {
    const { data, error } = await supabase.from("Proyectos").select("*");
    if (error) throw error;
    const dataProjects = data.map(fromToJsonMap).sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    projects.value = dataProjects.filter(item => item.status === "active");
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
  getProjects();
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
