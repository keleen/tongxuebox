<script setup lang="ts">
const searchQuery = ref('');
const activeTab = ref('all');
const activeCategory = ref<string | null>(null);
const selectedDifficulties = ref<string[]>(['basic']);

const navItems = [
  { id: 'writing', label: '字帖生成', icon: 'i-lucide-pen-line', to: '/chinese-writing' },
  {
    id: 'drawing',
    label: '简笔画',
    icon: 'i-lucide-palette',
    to: '/drawing-library',
    active: true,
  },
  { id: 'music', label: '乐谱下载', icon: 'i-lucide-music', to: '/sheet-music' },
  { id: 'math', label: '口算练习', icon: 'i-lucide-calculator', to: '/math-worksheet' },
];

const browseCategories = [
  { id: 'animal', label: '动物世界', icon: 'i-lucide-paw-print' },
  { id: 'plant', label: '花草植物', icon: 'i-lucide-flower-2' },
  { id: 'people', label: '可爱人物', icon: 'i-lucide-user' },
];

const difficultyOptions = [
  { id: 'beginner', label: '入门级 (3-5岁)' },
  { id: 'basic', label: '基础级 (6-8岁)' },
  { id: 'challenge', label: '挑战级 (9岁+)' },
];

const tabs = [
  { label: '全部', value: 'all' },
  { label: '最新', value: 'latest' },
  { label: '精选', value: 'featured' },
];

const drawings = ref([
  {
    id: 1,
    title: '好奇的小猫',
    category: 'animal',
    difficulty: 'beginner',
    downloads: '12.5k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: true,
  },
  {
    id: 2,
    title: '太空火箭',
    category: 'vehicle',
    difficulty: 'basic',
    downloads: '8.2k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: true,
  },
  {
    id: 3,
    title: '向日葵',
    category: 'plant',
    difficulty: 'beginner',
    downloads: '5.9k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: false,
  },
  {
    id: 4,
    title: '生日蛋糕',
    category: 'food',
    difficulty: 'basic',
    downloads: '21.3k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: true,
  },
  {
    id: 5,
    title: '黄色校车',
    category: 'vehicle',
    difficulty: 'challenge',
    downloads: '4.1k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: false,
  },
  {
    id: 6,
    title: '智慧猫头鹰',
    category: 'animal',
    difficulty: 'basic',
    downloads: '10.4k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: true,
  },
  {
    id: 7,
    title: '奔跑的女孩',
    category: 'people',
    difficulty: 'challenge',
    downloads: '7.6k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: false,
  },
  {
    id: 8,
    title: '常青松树',
    category: 'plant',
    difficulty: 'beginner',
    downloads: '3.2k',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen-nyfgYWhqwYzNfoOfWueVW0W9Ejq2RX.png',
    featured: false,
  },
]);

const filteredDrawings = computed(() => {
  let result = drawings.value;

  // Filter by tab
  if (activeTab.value === 'featured') {
    result = result.filter((d) => d.featured);
  } else if (activeTab.value === 'latest') {
    result = [...result].reverse();
  }

  // Filter by category
  if (activeCategory.value) {
    result = result.filter((d) => d.category === activeCategory.value);
  }

  // Filter by difficulty
  if (selectedDifficulties.value.length > 0) {
    result = result.filter((d) => selectedDifficulties.value.includes(d.difficulty));
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((d) => d.title.toLowerCase().includes(query));
  }

  return result;
});

function getDifficultyLabel(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return '入门级';
    case 'basic':
      return '基础级';
    case 'challenge':
      return '挑战级';
    default:
      return '入门级';
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-50 text-green-600';
    case 'basic':
      return 'bg-blue-50 text-blue-600';
    case 'challenge':
      return 'bg-orange-50 text-orange-600';
    default:
      return 'bg-gray-50 text-gray-600';
  }
}

function toggleDifficulty(id: string) {
  const index = selectedDifficulties.value.indexOf(id);
  if (index === -1) {
    selectedDifficulties.value.push(id);
  } else {
    selectedDifficulties.value.splice(index, 1);
  }
}

function selectCategory(id: string) {
  activeCategory.value = activeCategory.value === id ? null : id;
}

function loadMore() {
  // Simulate loading more items
  alert('加载更多素材...');
}
</script>

<template>
  <div class="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 sm:px-6">
    <!-- Left Sidebar -->
    <aside class="hidden w-56 shrink-0 lg:block">
      <!-- Navigation Section -->
      <div class="mb-6">
        <h3 class="mb-3 text-xs font-medium text-slate-400">功能导航</h3>
        <nav class="space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
            :class="[
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              item.active ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-100',
            ]"
          >
            <UIcon :name="item.icon" class="size-4" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Browse Categories -->
      <div class="mb-6">
        <h3 class="mb-3 text-xs font-medium text-slate-400">分类浏览</h3>
        <nav class="space-y-1">
          <button
            v-for="cat in browseCategories"
            :key="cat.id"
            :class="[
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
              activeCategory === cat.id
                ? 'bg-primary-50 text-primary-600'
                : 'text-slate-600 hover:bg-slate-100',
            ]"
            @click="selectCategory(cat.id)"
          >
            <UIcon :name="cat.icon" class="size-4" />
            {{ cat.label }}
          </button>
        </nav>
      </div>

      <!-- Difficulty Filter -->
      <div>
        <h3 class="mb-3 text-xs font-medium text-slate-400">难度筛选</h3>
        <div class="space-y-2">
          <label
            v-for="opt in difficultyOptions"
            :key="opt.id"
            class="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              :checked="selectedDifficulties.includes(opt.id)"
              class="size-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
              @change="toggleDifficulty(opt.id)"
            />
            <span class="text-sm text-slate-600">{{ opt.label }}</span>
          </label>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="min-w-0 flex-1">
      <!-- Header -->
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">热门素材</h1>
          <p class="mt-1 text-sm text-slate-500">专为小学生设计的清爽线条画素材，适合涂色与临摹</p>
        </div>

        <!-- Tabs -->
        <div class="flex items-center rounded-lg border border-slate-200 bg-white p-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            :class="[
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'bg-primary-500 text-white'
                : 'text-slate-600 hover:text-slate-900',
            ]"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Drawing Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="drawing in filteredDrawings"
          :key="drawing.id"
          class="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
        >
          <!-- Image Container -->
          <div class="relative aspect-square overflow-hidden bg-slate-50 p-4">
            <div class="flex h-full items-center justify-center">
              <!-- Placeholder illustration using icons -->
              <div class="text-center">
                <UIcon
                  :name="
                    drawing.category === 'animal'
                      ? 'i-lucide-cat'
                      : drawing.category === 'plant'
                        ? 'i-lucide-flower-2'
                        : drawing.category === 'people'
                          ? 'i-lucide-user'
                          : drawing.category === 'vehicle'
                            ? 'i-lucide-rocket'
                            : 'i-lucide-cake'
                  "
                  class="size-24 text-slate-300 transition-transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="p-4">
            <h3 class="mb-2 font-medium text-slate-900">{{ drawing.title }}</h3>
            <div class="flex items-center justify-between">
              <span
                :class="[
                  'rounded px-2 py-0.5 text-xs font-medium',
                  getDifficultyColor(drawing.difficulty),
                ]"
              >
                {{ getDifficultyLabel(drawing.difficulty) }}
              </span>
              <span class="text-xs text-slate-400">{{ drawing.downloads }} 下载</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredDrawings.length === 0"
        class="flex flex-col items-center justify-center py-16"
      >
        <UIcon name="i-lucide-search-x" class="mb-4 size-12 text-slate-300" />
        <p class="text-slate-500">未找到匹配的素材</p>
      </div>

      <!-- Load More Button -->
      <div v-if="filteredDrawings.length > 0" class="mt-8 flex justify-center">
        <button
          class="rounded-full bg-primary-500 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          @click="loadMore"
        >
          加载更多素材
        </button>
      </div>

      <!-- Footer -->
      <footer class="mt-12 border-t border-slate-200 pt-6 text-center">
        <p class="text-sm text-slate-500">&copy; 2024 童学趣盒-简笔画资源库</p>
        <p class="mt-2 text-xs text-slate-400">
          注：本站所有素材仅供个人学习与教学使用，严禁任何形式的商业用途 (For personal study only).
        </p>
      </footer>
    </main>
  </div>
</template>
