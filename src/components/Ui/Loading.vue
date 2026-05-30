<template>
  <div class="col-span-full flex justify-center items-center py-20">
    <div class="flex gap-1">
      <span
        v-for="i in 3"
        :key="i"
        class="w-2 h-2 rounded-full"
        style="background-color: #627A8B;"
        :style="{ animation: 'pulse 1s ease-in-out infinite', animationDelay: `${(i - 1) * 200}ms` }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>
