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
      class="w-full h-36 transition-transform transform hover:scale-110 object-fill"
      loading="lazy"
    />
    <div class="p-2 text-center">
      <h1
        class="text-xl font-bold mb-2 text-white hover:text-cyan-400 transition-colors"
      >
        {{ localProyect.title }}
      </h1>
      <div class="mb-4 h-24 overflow-hidden">
        <p class="mt-2 text-sm text-slate-200">
          {{ localProyect.description.substring(0, 130) }}....
        </p>
      </div>
      <div class="flex flex-wrap gap-2 justify-center">
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
  </figure>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { TypeProyects } from "@/types/data";
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
</style>
