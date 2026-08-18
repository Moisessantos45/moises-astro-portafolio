<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-14">
    <a :href="`${baseUrl}?page=${prevPage}`" class="btn-ghost px-4 py-2 text-xs"
      :class="page <= 1 ? 'opacity-30 pointer-events-none' : ''">
      ← Anterior
    </a>

    <div class="flex items-center gap-1.5">
      <template v-for="item in visiblePages" :key="item">
        <span v-if="item === -1" class="px-2 font-body text-(--color-ink-muted) text-sm">...</span>

        <a v-else :href="`${baseUrl}?page=${item}`"
          class="w-9 h-9 flex items-center justify-center text-sm font-body font-medium rounded-lg transition-all duration-200 border"
          :class="item === page
            ? 'bg-(--color-ink) border-(--color-ink) text-white'
            : 'border-(--color-border-mid) bg-white text-(--color-ink-soft) hover:text-(--color-ink) hover:bg-(--color-surface-alt)'">
          {{ item }}
        </a>
      </template>
    </div>

    <a :href="`${baseUrl}?page=${nextPage}`" class="btn-ghost px-4 py-2 text-xs"
      :class="page >= totalPages ? 'opacity-30 pointer-events-none' : ''">
      Siguiente →
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  baseUrl: string;
  page: number;
  totalPages: number;
}>();

const prevPage = computed(() => Math.max(1, props.page - 1));
const nextPage = computed(() => Math.min(props.totalPages, props.page + 1));

const visiblePages = computed(() => {
  const pages: (number | -1)[] = [];
  const total = props.totalPages;
  const current = props.page;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push(-1);

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push(-1);
    pages.push(total);
  }

  return pages;
});
</script>
