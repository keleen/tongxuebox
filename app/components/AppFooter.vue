<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="mx-auto max-w-[1200px] px-4 py-8 sm:px-10 lg:px-0">
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="flex flex-col gap-1 text-center sm:text-left">
        <p class="text-sm text-slate-600">
          &copy; {{ currentYear }} 童学趣盒. 所有资源免费，无广告，可商用教学
        </p>
        <p class="text-xs text-slate-400">
          联系邮箱：support@tongxuebox.com
        </p>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/help" class="text-sm text-slate-600 transition-colors hover:text-primary-500">
          帮助中心
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
