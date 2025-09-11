<template>
  <Loading v-if="loading" />

  <article
    v-else
    v-for="proyect in projects"
    :key="proyect.id"
    class="flex flex-col md:flex-row items-center bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border border-slate-700/50"
  >
    <figure class="flex justify-center items-center shrink-0 mb-6 md:mb-0 md:mr-8 relative group overflow-hidden rounded-xl">
      <img
        :class="[
          proyect.typeProyect === 'mobile-app' ? 'object-cover object-top' : 'object-cover',
          'h-48 w-72 rounded-xl transition-all duration-500 group-hover:scale-105',
        ]"
        :src="proyect.image"
        :alt="proyect.title"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </figure>
    <div class="flex flex-col flex-grow">
      <div class="flex flex-col md:flex-row items-start justify-between mb-4">
        <div>
          <h2 class="text-2xl font-bold text-white hover:text-cyan-400 transition-colors mb-2">
            {{ proyect.title }}
          </h2>
          <span class="inline-block px-3 py-1 text-sm font-medium bg-cyan-500/20 text-cyan-300 rounded-full mb-4">
            {{ proyect.typeProyect }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2 mt-2 md:mt-0">
          <span v-for="(item, index) in proyect.tecnologies.slice(0, 3)" :key="index">
            <li
              :class="[
                'rounded-full px-3 py-1 text-xs font-medium text-white',
                technologiesColors[item.toLowerCase() as tecnology],
              ]"
            >
              {{ item }}
            </li>
          </span>
          <span v-if="proyect.tecnologies.length > 3" class="px-3 py-1 text-xs font-medium text-white bg-slate-700 rounded-full">
            +{{ proyect.tecnologies.length - 3 }}
          </span>
        </div>
      </div>
      <p class="text-slate-300 mb-6 line-clamp-3">
        {{ proyect.description }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          v-if="proyect.links.frontend"
          :href="proyect.links.frontend"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-300 bg-cyan-500/10 rounded-lg hover:bg-cyan-400/20 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          Ver Código
        </a>
        <a
          :href="`/Post/${proyect.id}`"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-300 bg-cyan-500/10 rounded-lg hover:bg-cyan-400/20 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Ver Detalles
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/api/config";
import type { TypeProyects } from "@/types/data";
import { fromToJsonMap } from "@/service/data.service";
import { technologiesColors, type tecnology } from "@/types/data";
import Loading from "@/components/Ui/Loading.vue";

const projects = ref<TypeProyects[]>([]);
const loading = ref<boolean>(true);

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
      .slice(0, 4);

    projects.value = dataProjects;
  } catch (error) {
    projects.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProjects();
});
</script>
