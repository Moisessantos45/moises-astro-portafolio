<template>
  <article class="portfolio-card flex flex-col group h-full">
    <div :class="[
      'w-full aspect-16/10 overflow-hidden flex items-center justify-center relative mockup-bg',
      bgColors[(index ?? 0) % 4]
    ]">
      <figure v-if="postData.banner"
        class="w-[90%] h-[85%] overflow-hidden rounded-xl bg-white transition-transform duration-500 group-hover:scale-[1.02]"
        style="box-shadow:0 8px 24px rgba(24,24,27,0.08)">
        <img :src="postData.banner" :alt="postData.title" class="w-full h-full object-cover" loading="lazy" />
      </figure>
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="font-display" style="font-size:3rem;color:rgba(24,24,27,0.1)">
          {{ postData.title[0] }}
        </span>
      </div>
    </div>

    <div class="p-6 flex flex-col grow">
      <div v-if="postData.category" class="mb-3">
        <span class="tech-tag">{{ postData.category }}</span>
      </div>

      <a :href="`/post/${postData.slug}`" class="block group/title mb-2">
        <h2 class="font-display text-2xl leading-snug transition-opacity duration-200"
          :style="{ color: 'var(--color-ink)' }">
          {{ postData.title }}
        </h2>
      </a>

      <p v-if="formattedDate" class="label-tag mb-3" style="color:var(--color-ink-muted)">
        {{ formattedDate }}
      </p>

      <p v-if="postData.author" class="font-body text-xs mb-3" style="color:var(--color-ink-muted)">
        Por {{ postData.author }}
      </p>

      <div v-if="postData.tags && postData.tags.length > 0" class="flex flex-wrap gap-1.5 mb-4">
        <span v-for="(tag, idx) in postData.tags.slice(0, 3)" :key="idx" class="tech-tag">
          {{ tag }}
        </span>
        <span v-if="postData.tags.length > 3" class="tech-tag">
          +{{ postData.tags.length - 3 }}
        </span>
      </div>

      <div class="flex items-center pt-4 mt-auto" style="border-top:1px solid rgba(24,24,27,0.08)">
        <a :href="`/post/${postData.slug}`" class="btn-primary py-1.5 px-4 text-xs ml-auto">
          Leer artículo
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
import { reactive, computed } from "vue";
import type { PostInfoBasic } from "@/types/post";

const props = defineProps<{
  post: PostInfoBasic;
  index?: number;
}>();

const postData = reactive({ ...props.post });
const bgColors = ["bg-[#f0ede6]", "bg-[#e8edf4]", "bg-[#edf4ee]", "bg-[#f4ece8]"];

const formattedDate = computed(() => {
  if (!postData.createdAt) return "";
  return new Date(postData.createdAt).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
</script>
