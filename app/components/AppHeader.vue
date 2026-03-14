<script setup lang="ts">
const navItems = [
  { label: '简笔画', to: '/drawing-library' },
  { label: '乐谱下载', to: '/sheet-music' },
  { label: '口算练习', to: '/math-worksheet' },
];

const mobileMenuOpen = ref(false);
const chineseCopybookMenuOpen = ref(false);
const englishCopybookMenuOpen = ref(false);
const route = useRoute();

// 检查当前路由是否匹配导航项
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/');
};

// 检查是否是中文字帖相关页面
const isChineseCopybookPage = computed(() => {
  return (
    route.path.startsWith('/chinese-writing') ||
    route.path.startsWith('/chinese-phrase') ||
    route.path.startsWith('/chinese-paragraph') ||
    route.path.startsWith('/chinese-stroke')
  );
});

// 检查是否是英文字帖相关页面
const isEnglishCopybookPage = computed(() => {
  return (
    route.path.startsWith('/english-writing') ||
    route.path.startsWith('/english-alphabet') ||
    route.path.startsWith('/english-word') ||
    route.path.startsWith('/english-paragraph')
  );
});
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
            <!-- 字帖生成下拉菜单（中文字帖） -->
            <div
              class="relative"
              @mouseenter="chineseCopybookMenuOpen = true"
              @mouseleave="chineseCopybookMenuOpen = false"
            >
              <button
                :class="[
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                  isChineseCopybookPage
                    ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                    : 'text-slate-600 hover:text-primary-500',
                ]"
                @click="chineseCopybookMenuOpen = !chineseCopybookMenuOpen"
              >
                字帖生成
                <UIcon
                  name="i-lucide-chevron-down"
                  class="size-4 transition-transform"
                  :class="{ 'rotate-180': chineseCopybookMenuOpen }"
                />
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="chineseCopybookMenuOpen"
                class="absolute right-0 top-full w-48 rounded-lg border border-slate-200 bg-white shadow-lg"
                style="margin-top: -2px; padding-top: 2px"
              >
                <div class="py-2">
                  <NuxtLink
                    to="/chinese-writing"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{ 'bg-primary-50 text-primary-600': route.path === '/chinese-writing' }"
                  >
                    中文汉字
                  </NuxtLink>
                  <NuxtLink
                    to="/chinese-phrase"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{ 'bg-primary-50 text-primary-600': route.path === '/chinese-phrase' }"
                  >
                    中文词组
                  </NuxtLink>
                  <NuxtLink
                    to="/chinese-paragraph"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{
                      'bg-primary-50 text-primary-600': route.path === '/chinese-paragraph',
                    }"
                  >
                    中文段落
                  </NuxtLink>
                  <NuxtLink
                    to="/chinese-stroke"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{ 'bg-primary-50 text-primary-600': route.path === '/chinese-stroke' }"
                  >
                    中文笔画
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- 英文字帖下拉菜单 -->
            <div
              class="relative"
              @mouseenter="englishCopybookMenuOpen = true"
              @mouseleave="englishCopybookMenuOpen = false"
            >
              <button
                :class="[
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                  isEnglishCopybookPage
                    ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                    : 'text-slate-600 hover:text-primary-500',
                ]"
                @click="englishCopybookMenuOpen = !englishCopybookMenuOpen"
              >
                英文字帖
                <UIcon
                  name="i-lucide-chevron-down"
                  class="size-4 transition-transform"
                  :class="{ 'rotate-180': englishCopybookMenuOpen }"
                />
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="englishCopybookMenuOpen"
                class="absolute right-0 top-full w-48 rounded-lg border border-slate-200 bg-white shadow-lg"
                style="margin-top: -2px; padding-top: 2px"
              >
                <div class="py-2">
                  <NuxtLink
                    to="/english-writing"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{ 'bg-primary-50 text-primary-600': route.path === '/english-writing' }"
                  >
                    英文手写
                  </NuxtLink>
                  <NuxtLink
                    to="/english-alphabet"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{
                      'bg-primary-50 text-primary-600': route.path === '/english-alphabet',
                    }"
                  >
                    英文字母
                  </NuxtLink>
                  <NuxtLink
                    to="/english-word"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{ 'bg-primary-50 text-primary-600': route.path === '/english-word' }"
                  >
                    英文单词
                  </NuxtLink>
                  <NuxtLink
                    to="/english-paragraph"
                    class="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    :class="{
                      'bg-primary-50 text-primary-600': route.path === '/english-paragraph',
                    }"
                  >
                    英文段落
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- 其他导航项 -->
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
        <!-- 字帖生成（中文字帖） -->
        <div>
          <div class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500">字帖生成</div>
          <NuxtLink
            to="/chinese-writing"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/chinese-writing'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            中文汉字
          </NuxtLink>
          <NuxtLink
            to="/chinese-phrase"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/chinese-phrase'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            中文词组
          </NuxtLink>
          <NuxtLink
            to="/chinese-paragraph"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/chinese-paragraph'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            中文段落
          </NuxtLink>
          <NuxtLink
            to="/chinese-stroke"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/chinese-stroke'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            中文笔画
          </NuxtLink>
        </div>

        <!-- 英文字帖 -->
        <div>
          <div class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500">英文字帖</div>
          <NuxtLink
            to="/english-writing"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/english-writing'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            英文手写
          </NuxtLink>
          <NuxtLink
            to="/english-alphabet"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/english-alphabet'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            英文字母
          </NuxtLink>
          <NuxtLink
            to="/english-word"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/english-word'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            英文单词
          </NuxtLink>
          <NuxtLink
            to="/english-paragraph"
            :class="[
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              route.path === '/english-paragraph'
                ? 'bg-primary-100 text-primary-600'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-500',
            ]"
            @click="mobileMenuOpen = false"
          >
            英文段落
          </NuxtLink>
        </div>

        <!-- 其他导航项 -->
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
