<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <template v-if="posts.length > 0">
      <PostItem v-for="(post, idx) in posts" :key="post.id" :post="post" :index="idx" />
    </template>
    <p v-else class="col-span-full font-body text-sm text-(--color-ink-muted)">
      Aún no hay artículos publicados.
    </p>
  </div>
</template>

<script setup lang="ts">
import PostItem from "../PostItem.vue";
import type { PostInfoBasic } from "@/types/post";

defineProps<{
  posts: PostInfoBasic[];
}>();
</script>
