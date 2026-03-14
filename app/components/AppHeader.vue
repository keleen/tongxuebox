<script setup lang="ts">
const navItems = [
  { label: '字帖生成', to: '/chinese-writing' },
  { label: '简笔画', to: '/drawing-library' },
  { label: '乐谱下载', to: '/sheet-music' },
  { label: '口算练习', to: '/math-worksheet' },
];

const mobileMenuOpen = ref(false);
const route = useRoute();

// 检查当前路由是否匹配导航项
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/');
};
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-primary-500/20 bg-white/80 backdrop-blur-md shadow-sm"
  >
    <div class="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 text-primary-500">
          <UIcon name="i-lucide-toy-brick" class="size-7" />
          <span class="text-xl font-bold text-slate-900">童学趣盒</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden flex-1 justify-end md:flex">
          <nav class="flex items-center gap-6 lg:gap-9">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              :class="[
                'text-sm font-medium transition-colors',
                isActive(item.to)
                  ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                  : 'text-slate-600 hover:text-primary-500',
              ]"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Mobile Menu Button -->
        <button class="text-slate-600 md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <UIcon :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="mx-auto max-w-[1400px] border-b border-primary-500/20 bg-white/95 backdrop-blur-md px-4 py-4 shadow-lg sm:px-6 md:hidden"
    >
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            isActive(item.to)
              ? 'bg-primary-100 text-primary-600'
              : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
          ]"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
