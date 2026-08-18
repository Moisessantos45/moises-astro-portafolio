<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <template v-if="projects.length > 0">
      <CardItem v-for="project in projects" :key="project.id" :project="project" />
    </template>
    <p v-else class="col-span-full font-body text-sm text-(--color-ink-muted)">
      Aún no hay proyectos publicados.
    </p>
  </div>
</template>

<script setup lang="ts">
import CardItem from "../CardItem.vue";
import type { Project } from "@/types/project";

defineProps<{
  projects: Project[];
}>();
</script>
