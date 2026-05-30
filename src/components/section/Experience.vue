<template>
  <section class="section-max py-20 md:py-28 scroll-reveal">
    <div class="mb-14">
      <p class="label-tag mb-2">Traye ctoria profesional</p>
      <h2 class="font-display text-4xl sm:text-5xl text-(--color-ink) leading-tight">
        Experiencia & Proyectos
      </h2>
    </div>

    <div class="space-y-6">
      <article v-for="exp in workExperience" :key="exp.id"
        class="portfolio-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 group">
        <div class="shrink-0 w-28 text-left sm:text-left">
          <time class="label-tag text-(--color-ink-muted)">{{ exp.period }}</time>
        </div>

        <div class="flex-1">
          <div class="flex items-start gap-3 mb-3">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span v-if="exp.status === 'current'" class="inline-flex items-center gap-1.5 label-tag text-[#22c55e]">
                  <span class="status-dot-active"></span>
                  Activo
                </span>
              </div>
              <h3
                class="font-display text-2xl text-(--color-ink) leading-snug group-hover:opacity-70 transition-opacity duration-200">
                {{ exp.title }}
              </h3>
              <p class="font-body text-sm font-medium text-(--color-ink-muted) mt-0.5">
                {{ exp.company }}
              </p>
            </div>
          </div>

          <p class="font-body text-sm text-(--color-ink-soft) leading-relaxed">
            {{ exp.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Experience } from "@/types/experience";

const workExperience = ref<Experience[]>([
  {
    id: "1",
    title: "Web Developer",
    company: "Toman jido-ka ikigai Company",
    period: "May 2024 – Aug 2025",
    status: "completed",
    description:
      "Development of modern web applications using technologies such as React, Vue, Node.js, and databases.",
  },
  {
    id: "2",
    title: "ICP-MEXICO",
    company: "ICP",
    period: "May 2025",
    status: "completed",
    description:
      "Participation in a technological development and innovation project.",
  },
  {
    id: "3",
    title: "ICP-MEXICO",
    company: "ICP",
    period: "Sep 2024",
    status: "completed",
    description:
      "Development of technological solutions and participation in innovation projects.",
  },
  {
    id: "4",
    title: "UASLP MAGNA Hackathon",
    company: "UASLP-MAGNA",
    period: "Nov 2024",
    status: "completed",
    description:
      "Participation in a hackathon developing innovative solutions in a limited time.",
  },
  {
    id: "5",
    title: "Website for parts management",
    company: "Precision Digital",
    period: "Mar – Jul 2024",
    status: "completed",
    description:
      "Development of a web system for the management and administration of industrial parts inventory.",
  },
  {
    id: "7",
    title: "Cleaning Services Website",
    company: "Perfect Home",
    period: "Nov 2023",
    status: "completed",
    description:
      "Creation of a corporate website for a cleaning services company with a quoting system.",
  },
  {
    id: "8",
    title: "Wedding Website",
    company: "Private Client",
    period: "Nov 2023",
    status: "completed",
    description:
      "Custom website development for a wedding event with a photo gallery and RSVP.",
  },
  {
    id: "10",
    title: "Japanese Light Novel Manager",
    company: "Shigatsutranslations",
    period: "Mar 2023 – current",
    status: "current",
    description:
      "Development and maintenance of a web platform for the management and translation of Japanese light novels.",
  },
  {
    id: "11",
    title: "Japanese Light Novel Manager",
    company: "Underwordliellanovels",
    period: "Nov 2022 – current",
    status: "current",
    description:
      "Creation of a complete web system for the management, translation, and publication of Japanese light novels.",
  },
]);
</script>