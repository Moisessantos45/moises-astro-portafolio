<template>
  <Loading v-if="loading" />

  <article
    v-else
    v-for="proyect in projects"
    :key="proyect.id"
    class="flex flex-col md:flex-row items-center bg-slate-800 p-6 rounded-lg shadow-lg transition-transform transform sm:hover:scale-105"
  >
    <figure
      class="flex justify-center items-center shrink-0 mb-4 md:mb-0 md:mr-8"
    >
      <img
        :class="[
          proyect.typeProyect === 'mobile-app' && 'object-cover object-top',
          ,
          'h-32 w-48 rounded-lg transition-transform transform hover:translate-y-1]',
        ]"
        :src="proyect.image"
        :alt="proyect.title"
      />
    </figure>
    <div class="flex flex-col">
      <div class="flex flex-col md:flex-row items-start">
        <h1
          class="text-xl font-semibold text-white hover:text-cyan-400 transition-colors"
        >
          {{ proyect.title }}
        </h1>
        <div class="sm:ml-3 flex flex-wrap gap-2 mt-2 md:mt-0">
          <span v-for="(item, index) in proyect.tecnologies" :key="index">
            <li
              :class="[
                'rounded-full px-3 py-1 text-xs font-semibold text-white',
                technologiesColors[item.toLowerCase() as tecnology],
              ]"
            >
              {{ item }}
            </li>
          </span>
        </div>
      </div>
      <p class="mt-4 text-gray-300">
        {{ proyect.description.substring(0, 50) }}
      </p>
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
