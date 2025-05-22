<template>
  <figure
    class="relative overflow-hidden rounded-lg bg-slate-800 shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
  >
    <span
      class="absolute top-2 left-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
    >
      {{ localProyect.typeProyect }}
    </span>
    <button
      id="likeButton"
      type="button"
      class="absolute top-2 right-2 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-all duration-300 z-10 flex items-center space-x-1"
      aria-label="Me gusta"
      @click="saveLike(proyect)"
    >
      <i
        :class="[isLiked && 'fa-solid', 'fa-regular fa-thumbs-up icon-like']"
      ></i>
      <span class="text-xs font-bold couter_like">{{
        localProyect.counter_likes
      }}</span>
    </button>

    <img
      :src="localProyect.image"
      alt="Hero"
      :class="[
        proyect.typeProyect === 'mobile-app'
          ? 'object-cover object-top'
          : 'object-fill',
        'w-full h-36 transition-transform transform hover:scale-110',
      ]"
      loading="lazy"
    />
    <div class="p-4 flex flex-col h-[calc(100%-9rem)]">
      <h1
        class="text-xl font-bold mb-2 text-white hover:text-cyan-400 transition-colors"
      >
        {{ localProyect.title }}
      </h1>
      <div class="flex-grow mb-4">
        <p class="text-sm text-slate-200 line-clamp-3">
          {{ localProyect.description }}
        </p>
      </div>
      <div class="space-y-4">
        <div class="technologies-container min-h-[80px]">
          <ul class="flex flex-wrap gap-1.5">
            <li v-for="(item, index) in proyect.tecnologies" :key="index"
              :class="[
                'rounded-full px-2 py-0.5 text-[11px] font-medium text-white transition-colors',
                technologiesColors[item.toLowerCase() as keyof typeof technologiesColors],
              ]"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="flex flex-wrap gap-2 justify-center pt-2 border-t border-slate-700">
          <Link :link="localProyect.links.frontend" text="Frontend" icon="code" />
          <Link :link="localProyect.links.backend" text="Backend" icon="code" />
          <Link
            :link="`/Post/${localProyect.id}`"
            text="Details"
            icon="external-link"
          />
          <Link :link="localProyect.link" text="Website" icon="globe" />
        </div>
      </div>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { technologiesColors, type TypeProyects } from "@/types/data";
import Link from "./Ui/Link.vue";
import { supabase } from "@/api/config";

const props = defineProps<{
  proyect: TypeProyects;
}>();

const localProyect = reactive({ ...props.proyect });
const isLiked = ref(false);

const likesStorage: string[] = JSON.parse(
  localStorage.getItem("likesProjects") ?? "[]"
);

isLiked.value = likesStorage.includes(props.proyect.id);

const saveLike = async (proyect: TypeProyects) => {
  try {
    console.log(proyect);
    const { error } = await supabase
      .from("Proyectos")
      .update({ counter_likes: proyect.counter_likes + 1 })
      .eq("id", proyect.id);
    if (error) throw error;
    likesStorage.push(proyect.id);
    localStorage.setItem("likesProjects", JSON.stringify(likesStorage));
    localProyect.counter_likes++;
    isLiked.value = !isLiked.value;
  } catch (error) {
    return;
  }
};
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

.technologies-container {
  display: flex;
  align-items: flex-start;
}
</style>
