<template>
  <Loading v-if="projects.length === 0" />
  <section class="mx-auto max-w-screen-lg px-3 py-16 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
        Latest Projects
      </h2>
      <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
        Discover my latest creations and explore the code behind each project.
      </p>
    </div>
    <article class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <CardItem
        class="card__project"
        v-for="proyect in projects"
        :key="proyect.id"
        :proyect="proyect"
        ref="cardRefs"
      />
    </article>
    <div class="text-center mt-12">
      <a
        href="/ProyectsAll"
        class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg hover:from-sky-600 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20"
      >
        Ver todos los proyectos
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  </section>
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
    const dataProjects = data
      .map(fromToJsonMap)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
    projects.value = dataProjects;
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
