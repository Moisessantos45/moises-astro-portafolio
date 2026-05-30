<template>
  <section class="section-max py-20 md:py-28 scroll-reveal">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14">
      <div>
        <p class="label-tag mb-2">Portafolio seleccionado</p>
        <h2 class="font-display text-4xl sm:text-5xl text-(--color-ink) leading-tight">
          Proyectos recientes
        </h2>
      </div>
      <a href="/Projects" class="btn-ghost shrink-0 self-start sm:self-center">
        Ver todos
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    <div class="relative">
      <Loading v-if="loading" class="py-16" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article v-for="(project, index) in projects" :key="project.id" class="portfolio-card flex flex-col group">
          <div :class="[
            'w-full aspect-16/10 overflow-hidden flex items-center justify-center relative mockup-bg',
            index % 4 === 0 ? 'bg-[#f0ede6]' :
              index % 4 === 1 ? 'bg-[#e8edf4]' :
                index % 4 === 2 ? 'bg-[#edf4ee]' : 'bg-[#f4ece8]'
          ]">
            <figure
              class="w-[90%] h-[85%] overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(24,24,27,0.08)] bg-white transition-transform duration-500 group-hover:scale-[1.02]">
              <img :src="project.banner" :alt="project.title" class="w-full h-full object-cover" loading="lazy" />
            </figure>
          </div>

          <div class="p-6 flex flex-col grow">
            <div class="flex items-center gap-2 mb-3">
              <span class="tech-tag">
                {{ project.typeProject === 'mobile-app' ? 'Mobile App' : 'Web & System' }}
              </span>
            </div>

            <a :href="`/project/${project.slug}`" class="block group/title mb-2">
              <h3
                class="font-display text-2xl text-(--color-ink) leading-snug group-hover/title:opacity-60 transition-opacity duration-200">
                {{ project.title }}
              </h3>
            </a>

            <p class="font-body text-sm text-(--color-ink-soft) leading-relaxed mb-5 grow">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-5">
              <span v-for="(item, idx) in project.technologies.slice(0, 4)" :key="idx" class="tech-tag">
                {{ item }}
              </span>
              <span v-if="project.technologies.length > 4" class="tech-tag">
                +{{ project.technologies.length - 4 }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-(--color-border)">
              <a v-for="(link, feIdx) in project.linkFrontend" :key="'fe-' + feIdx" :href="link" target="_blank"
                rel="noopener noreferrer" class="btn-ghost py-1.5 px-3 text-xs">
                Código{{ project.linkFrontend.length > 1 ? ` ${feIdx + 1}` : '' }}
              </a>

              <a v-for="(link, beIdx) in project.linkBackend" :key="'be-' + beIdx" :href="link" target="_blank"
                rel="noopener noreferrer" class="btn-ghost py-1.5 px-3 text-xs">
                Backend{{ project.linkBackend.length > 1 ? ` ${beIdx + 1}` : '' }}
              </a>

              <a v-if="project.link && !project.link.includes('#')" :href="project.link" target="_blank"
                rel="noopener noreferrer" class="btn-ghost py-1.5 px-3 text-xs">
                Demo
              </a>

              <a :href="`/project/${project.slug}`" class="ml-auto btn-primary py-1.5 px-4 text-xs">
                Detalles
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProjectsStore } from "@/store/projectStore";
import Loading from "@/components/Ui/Loading.vue";
import type { Project } from "@/types/project";

const { getLatestProjects } = useProjectsStore();

const projects = ref<Project[]>([]);
const loading = ref<boolean>(true);

const loadProjects = async () => {
  try {
    projects.value = await getLatestProjects();
  } catch (error) {
    projects.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProjects();
});
</script>
