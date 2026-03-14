<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <UFooter class="border-t border-default">
    <template #left>
      <div class="flex flex-col gap-1">
        <p class="text-sm text-muted">
          &copy; {{ currentYear }} 童学宝盒. 所有资源免费，无广告，可商用教学
        </p>
        <p class="text-xs text-dimmed">
          联系邮箱：support@tongxuebox.com
        </p>
      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-4">
        <NuxtLink to="/help" class="text-sm text-muted hover:text-default">
          帮助中心
        </NuxtLink>
      </div>
    </template>
  </UFooter>
</template>
