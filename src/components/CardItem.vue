<template>
  <article class="portfolio-card flex flex-col group h-full">
    <div :class="[
      'w-full aspect-16/10 overflow-hidden flex items-center justify-center relative mockup-bg',
      projectData.typeProject === 'mobile-app' ? 'bg-[#f4ece8]' : 'bg-[#e8edf4]'
    ]">
      <figure
        class="w-[90%] h-[85%] overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(24,24,27,0.08)] bg-white transition-transform duration-500 group-hover:scale-[1.02]">
        <img :src="projectData.banner" :alt="projectData.title" class="w-full h-full object-cover" loading="lazy" />
      </figure>
    </div>

    <div class="p-5 flex flex-col grow">
      <div class="flex items-center gap-2 mb-3">
        <span class="tech-tag">
          {{ projectData.typeProject === 'mobile-app' ? 'Mobile App' : 'Web & System' }}
        </span>
      </div>

      <a :href="`/project/${projectData.slug}`" class="block group/title mb-2">
        <h3
          class="font-display text-xl text-(--color-ink) leading-snug group-hover/title:opacity-60 transition-opacity duration-200">
          {{ projectData.title }}
        </h3>
      </a>

      <p class="font-body text-sm text-(--color-ink-soft) leading-relaxed line-clamp-3 mb-4 grow">
        {{ projectData.description }}
      </p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        <span v-for="(tech, index) in project.technologies.slice(0, 3)" :key="index" class="tech-tag">
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="tech-tag">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-1.5 pt-4 mt-auto border-t border-(--color-border)">
        <a v-for="(link, idx) in projectData.linkFrontend" :key="'fe-' + idx" :href="link" target="_blank"
          rel="noopener noreferrer" class="btn-ghost py-1.5 px-3 text-xs">
          Código{{ projectData.linkFrontend.length > 1 ? ` ${idx + 1}` : '' }}
        </a>

        <a v-for="(link, idx) in projectData.linkBackend" :key="'be-' + idx" :href="link" target="_blank"
          rel="noopener noreferrer" class="btn-ghost py-1.5 px-3 text-xs">
          Backend{{ projectData.linkBackend.length > 1 ? ` ${idx + 1}` : '' }}
        </a>

        <a v-if="projectData.link && !projectData.link.includes('#')" :href="projectData.link" target="_blank"
          rel="noopener noreferrer" class="btn-ghost py-1.5 px-3 text-xs">
          Demo
        </a>

        <a :href="`/project/${projectData.slug}`" class="ml-auto btn-primary py-1.5 px-4 text-xs">
          Ver más
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { Project } from "@/types/project";

const props = defineProps<{
  project: Project;
}>();

const projectData = reactive({ ...props.project });
</script>
