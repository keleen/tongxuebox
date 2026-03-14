<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: '中文练字帖',
    to: '/chinese-writing',
    icon: 'i-lucide-pen-tool',
  },
  {
    label: '英文手写练习',
    to: '/english-writing',
    icon: 'i-lucide-pencil',
  },
  {
    label: '数学计算题',
    to: '/math-worksheet',
    icon: 'i-lucide-calculator',
  },
  {
    label: '简笔画下载',
    to: '/drawing-library',
    icon: 'i-lucide-palette',
  },
  {
    label: '乐谱天地',
    to: '/sheet-music',
    icon: 'i-lucide-music',
  },
  {
    label: '帮助中心',
    to: '/help',
    icon: 'i-lucide-help-circle',
  },
]);
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-2">
        <UIcon name="i-lucide-pencil" class="size-6 text-primary-500" />
        <span class="text-xl font-bold text-default">童学宝盒</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navItems" class="hidden lg:flex" />

    <template #right>
      <UBadge color="primary" variant="subtle" class="hidden sm:flex">
        无需注册，免费使用
      </UBadge>
    </template>

    <template #body>
      <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
