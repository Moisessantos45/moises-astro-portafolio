<template>
  <section
    class="mx-auto max-w-screen-lg px-3 py-16 bg-gradient-to-b from-slate-900/50 to-slate-800/30"
  >
    <div class="text-center mb-12">
      <h2
        class="text-4xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent"
      >
        Work Experience
      </h2>
      <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
        My professional journey and projects completed throughout my career as a
        developer.
      </p>
    </div>

    <div class="relative">
      <!-- Línea timeline vertical -->
      <div
        class="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-slate-600"
      ></div>

      <div class="space-y-8">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          :class="[
            'relative flex items-center experience-item',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
          ]"
          ref="experienceRefs"
        >
          <!-- Círculo en la línea -->
          <div
            class="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 z-10"
          >
            <div
              :class="[
                'w-8 h-8 rounded-full border-4 shadow-lg transition-all duration-500 hover:scale-110',
                exp.status === 'current'
                  ? 'bg-cyan-400 border-cyan-300 shadow-cyan-400/50 animate-pulse'
                  : 'bg-slate-700 border-slate-600 shadow-slate-600/30',
              ]"
            >
              <div
                v-if="exp.status === 'current'"
                class="w-full h-full rounded-full bg-cyan-400 animate-ping opacity-75"
              ></div>
            </div>
          </div>

          <!-- Contenedor de la tarjeta -->
          <div
            :class="[
              'ml-16 md:ml-0 w-full md:w-5/12 transition-all duration-500 hover:scale-105',
              index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8',
            ]"
          >
            <article
              class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border border-slate-700/50 hover:border-cyan-400/30 relative"
            >
              <!-- Indicador de flecha -->
              <div
                :class="[
                  'absolute top-6 w-0 h-0 border-solid',
                  index % 2 === 0
                    ? 'md:-right-2 md:border-l-8 md:border-l-slate-800/50 md:border-t-8 md:border-t-transparent md:border-b-8 md:border-b-transparent hidden md:block'
                    : 'md:-left-2 md:border-r-8 md:border-r-slate-800/50 md:border-t-8 md:border-t-transparent md:border-b-8 md:border-b-transparent hidden md:block',
                ]"
              ></div>

              <!-- Badge de estado -->
              <div class="flex items-center justify-between mb-4">
                <span
                  :class="[
                    'inline-block px-3 py-1 text-xs font-medium rounded-full',
                    exp.status === 'current'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      : 'bg-slate-600/20 text-slate-300 border border-slate-600/30',
                  ]"
                >
                  {{ exp.status === "current" ? "Activo" : "Finalizado" }}
                </span>
                <time class="text-sm text-slate-400 font-medium">
                  {{ exp.period }}
                </time>
              </div>

              <!-- Contenido -->
              <div class="space-y-3">
                <h3
                  class="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
                >
                  {{ exp.title.toUpperCase() }}
                </h3>
                <p class="text-cyan-300 font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ exp.company }}
                </p>
                <p class="text-slate-300 leading-relaxed">
                  {{ exp.description }}
                </p>
              </div>

              <!-- Decoración -->
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-sm"
              ></div>
            </article>
          </div>
        </div>
      </div>

      <!-- Gradiente final -->
      <div
        class="absolute bottom-0 left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-8 bg-gradient-to-t from-slate-900 to-transparent"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Experience } from "@/types/experience";

const experienceRefs = ref([]);

const experiences = ref<Experience[]>([
  {
    id: "1",
    title: "Web Developer",
    company: "Toman jido-ka ikigai Company",
    period: "May 2024 - August 2024",
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
    period: "September 2024",
    status: "completed",
    description:
      "Development of technological solutions and participation in innovation projects.",
  },
  {
    id: "4",
    title: "UASLP MAGNA Hackathon",
    company: "UASLP-MAGNA",
    period: "November 2024",
    status: "completed",
    description:
      "Participation in a hackathon developing innovative solutions in a limited time.",
  },
  {
    id: "5",
    title: "Website for parts management",
    company: "Precision Digital",
    period: "March-July 2024",
    status: "completed",
    description:
      "Development of a web system for the management and administration of industrial parts inventory.",
  },
  {
    id: "6",
    title: "Parts Management Website",
    company: "Precision Digital",
    period: "March-July 2024",
    status: "completed",
    description:
      "Development of a web system for managing and administering industrial parts inventory (duplicate project).",
  },
  {
    id: "7",
    title: "Cleaning Services Website",
    company: "Perfect Home",
    period: "November 2023",
    status: "completed",
    description:
      "Creation of a corporate website for a cleaning services company with a quoting system.",
  },
  {
    id: "8",
    title: "Wedding Website",
    company: "Private Client",
    period: "November 2023",
    status: "completed",
    description:
      "Custom website development for a wedding event with a photo gallery and RSVP.",
  },
  {
    id: "9",
    title: "Cleaning Services Website",
    company: "Private Client",
    period: "November 2023",
    status: "completed",
    description:
      "Web platform development for a residential and commercial cleaning services company.",
  },
  {
    id: "10",
    title: "Japanese Light Novel Manager",
    company: "Shigatsutranslations (Facebook)",
    period: "March 2023 - current 2025",
    status: "current",
    description:
      "Development and maintenance of a web platform for the management and translation of Japanese light novels.",
  },
  {
    id: "11",
    title: "Japanese Light Novel Manager",
    company: "Underwordliellanovels (Facebook)",
    period: "November 2022 - current 2025",
    status: "current",
    description:
      "Creation of a complete web system for the management, translation, and publication of Japanese light novels.",
  },
]);
</script>

<style scoped>
/* Animaciones */
.experience-item {
  transition: all 0.3s ease-out;
}

/* Efecto hover para las tarjetas */
article:hover {
  transform: translateY(-4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .absolute.left-4 {
    left: 1rem;
  }

  .ml-16 {
    margin-left: 4rem;
  }
}

/* Animación personalizada para elementos activos */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(34, 211, 238, 0.8);
  }
}

.animate-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}
</style>
