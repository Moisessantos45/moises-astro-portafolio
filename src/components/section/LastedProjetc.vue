<template>
  <Loading v-if="projects.length === 0" />
  <section class="mx-auto max-w-screen-lg px-3 py-6">
    <div class="flex items-baseline justify-between py-5">
      <span
        class="bg-gradient-to-br from-sky-500 text-2xl font-bold to-cyan-400 bg-clip-text text-transparent text-white"
        >Recient <span class="text-cyan-400"> Post </span>
      </span>
      <a
        href="/ProyectsAll"
        class="text-lg text-white hover:text-cyan-500 hover:font-bold"
        >View all</a
      >
    </div>
    <article class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <CardItem
        class="card__project"
        v-for="proyect in projects"
        :key="proyect.id"
        :proyect="proyect"
        ref="cardRefs"
      />
    </article>
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
