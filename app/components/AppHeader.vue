<script setup lang="ts">
const navItems = [
  { label: '字帖生成', to: '/chinese-writing' },
  { label: '简笔画', to: '/drawing-library' },
  { label: '乐谱下载', to: '/sheet-music' },
  { label: '口算练习', to: '/math-worksheet' },
];

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="sticky top-0 z-50 px-4 py-4 lg:px-8">
    <div
      class="mx-auto flex max-w-[1400px] items-center justify-between rounded-xl border border-primary-500/20 bg-white px-4 sm:px-10 py-3 shadow-sm"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 text-primary-500">
        <UIcon name="i-lucide-toy-brick" class="size-7" />
        <span class="text-xl font-bold text-slate-900">童学趣盒</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden flex-1 justify-end gap-8 md:flex">
        <nav class="flex items-center gap-6 lg:gap-9">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium text-slate-600 transition-colors hover:text-primary-500"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <UButton color="primary" size="md" class="rounded-lg px-6"> 立即登录 </UButton>
      </div>

      <!-- Mobile Menu Button -->
      <button class="text-slate-600 md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
        <UIcon :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="mx-auto mt-2 max-w-[1400px] rounded-xl border border-primary-500/20 bg-white p-4 shadow-lg md:hidden"
    >
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-500"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <UButton color="primary" block class="mt-2 rounded-lg"> 立即登录 </UButton>
      </nav>
    </div>
  </header>
</template>
