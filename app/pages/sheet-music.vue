<script setup lang="ts">
const currentRoute = useRoute();

// Navigation links for sidebar
const navLinks = [
  { to: '/chinese-writing', icon: 'i-lucide-text-cursor-input', label: '字帖生成' },
  { to: '/drawing-library', icon: 'i-lucide-brush', label: '简笔画' },
  { to: '/sheet-music', icon: 'i-lucide-music', label: '乐谱下载' },
  { to: '/math-worksheet', icon: 'i-lucide-calculator', label: '口算练习' },
];

// Categories for sidebar
const categories = [
  { id: 'children', icon: 'i-lucide-baby', label: '儿童歌曲' },
  { id: 'folk', icon: 'i-lucide-flower-2', label: '民谣经典' },
  { id: 'holiday', icon: 'i-lucide-gift', label: '节日歌曲' },
];

// Filter state
const activeCategory = ref<string | null>(null);
const activeTab = ref('all');
const difficultyFilters = ref<string[]>(['beginner']);

const tabs = [
  { label: '全部', value: 'all' },
  { label: '最新', value: 'latest' },
  { label: '热门', value: 'popular' },
];

const difficulties = [
  { value: 'beginner', label: '初级 (入门)' },
  { value: 'intermediate', label: '中级 (进阶)' },
  { value: 'advanced', label: '高级 (挑战)' },
];

// Songs data with images
const songs = ref([
  {
    id: 1,
    title: '小星星',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=200&fit=crop',
    difficulty: 'beginner',
    downloads: '15.2k',
    category: 'children',
    isNew: false,
  },
  {
    id: 2,
    title: '两只老虎',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop',
    difficulty: 'beginner',
    downloads: '12.8k',
    category: 'children',
    isNew: false,
  },
  {
    id: 3,
    title: '生日快乐',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=200&fit=crop',
    difficulty: 'beginner',
    downloads: '18.5k',
    category: 'holiday',
    isNew: true,
  },
  {
    id: 4,
    title: '新年好',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=200&fit=crop',
    difficulty: 'beginner',
    downloads: '9.3k',
    category: 'holiday',
    isNew: false,
  },
  {
    id: 5,
    title: '让我们荡起双桨',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
    difficulty: 'intermediate',
    downloads: '7.6k',
    category: 'children',
    isNew: false,
  },
  {
    id: 6,
    title: '铃儿响叮当',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=200&fit=crop',
    difficulty: 'beginner',
    downloads: '11.2k',
    category: 'holiday',
    isNew: true,
  },
  {
    id: 7,
    title: '茉莉花',
    image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=200&fit=crop',
    difficulty: 'intermediate',
    downloads: '8.9k',
    category: 'folk',
    isNew: false,
  },
  {
    id: 8,
    title: '欢乐颂',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=200&fit=crop',
    difficulty: 'advanced',
    downloads: '6.4k',
    category: 'folk',
    isNew: false,
  },
]);

// Computed filtered songs
const filteredSongs = computed(() => {
  let result = songs.value;

  // Filter by category
  if (activeCategory.value) {
    result = result.filter((s) => s.category === activeCategory.value);
  }

  // Filter by difficulty
  if (difficultyFilters.value.length > 0) {
    result = result.filter((s) => difficultyFilters.value.includes(s.difficulty));
  }

  // Sort by tab
  if (activeTab.value === 'latest') {
    result = [...result].filter((s) => s.isNew).concat([...result].filter((s) => !s.isNew));
  } else if (activeTab.value === 'popular') {
    result = [...result].sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
  }

  return result;
});

function getDifficultyLabel(value: string) {
  if (value === 'beginner') return '初级';
  if (value === 'intermediate') return '中级';
  return '高级';
}

function getDifficultyColor(value: string) {
  if (value === 'beginner') return 'bg-emerald-100 text-emerald-700';
  if (value === 'intermediate') return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

function toggleCategory(categoryId: string) {
  activeCategory.value = activeCategory.value === categoryId ? null : categoryId;
}

function toggleDifficulty(value: string) {
  const index = difficultyFilters.value.indexOf(value);
  if (index > -1) {
    difficultyFilters.value.splice(index, 1);
  } else {
    difficultyFilters.value.push(value);
  }
}

function handleDownload(title: string) {
  alert(`正在下载 ${title} 乐谱 PDF...`);
}
</script>

<template>
  <div class="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
    <!-- Left Sidebar -->
    <aside class="hidden w-52 shrink-0 lg:block">
      <!-- Navigation -->
      <div class="mb-6">
        <h3 class="mb-3 text-xs font-medium text-slate-400">功能导航</h3>
        <nav class="space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
            :class="
              currentRoute.path === link.to
                ? 'bg-primary-50 font-medium text-primary-600'
                : 'text-slate-600 hover:bg-slate-100'
            "
          >
            <UIcon :name="link.icon" class="size-4" />
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Categories -->
      <div class="mb-6">
        <h3 class="mb-3 text-xs font-medium text-slate-400">分类浏览</h3>
        <nav class="space-y-1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
            :class="
              activeCategory === cat.id
                ? 'bg-primary-50 font-medium text-primary-600'
                : 'text-slate-600 hover:bg-slate-100'
            "
            @click="toggleCategory(cat.id)"
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
            v-for="diff in difficulties"
            :key="diff.value"
            class="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
          >
            <input
              type="checkbox"
              :checked="difficultyFilters.includes(diff.value)"
              class="size-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
              @change="toggleDifficulty(diff.value)"
            />
            {{ diff.label }}
          </label>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="min-w-0 flex-1">
      <!-- Header -->
      <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">乐谱天地</h1>
          <p class="mt-1 text-sm text-slate-500">适合儿童的简单乐谱，支持多种乐器演奏</p>
        </div>

        <!-- Tab Filters -->
        <div class="flex overflow-hidden rounded-lg border border-slate-200 bg-white">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-4 py-2 text-sm font-medium transition-colors"
            :class="
              activeTab === tab.value
                ? 'bg-primary-500 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            "
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Songs Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="song in filteredSongs"
          :key="song.id"
          class="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
        >
          <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <img
              :src="song.image"
              :alt="song.title"
              class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <!-- New Badge -->
            <span
              v-if="song.isNew"
              class="absolute left-2 top-2 rounded bg-rose-500 px-2 py-0.5 text-xs font-medium text-white"
            >
              NEW
            </span>
            <!-- Play Button Overlay -->
            <button
              class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
              @click="handleDownload(song.title)"
            >
              <div class="flex size-12 items-center justify-center rounded-full bg-white/90">
                <UIcon name="i-lucide-play" class="size-6 text-primary-500" />
              </div>
            </button>
          </div>

          <!-- Info -->
          <div class="p-4">
            <h3 class="font-medium text-slate-900">{{ song.title }}</h3>
            <div class="mt-2 flex items-center justify-between">
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="getDifficultyColor(song.difficulty)"
              >
                {{ getDifficultyLabel(song.difficulty) }}
              </span>
              <span class="text-xs text-slate-400">{{ song.downloads }} 下载</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredSongs.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <UIcon name="i-lucide-music-2" class="mb-4 size-12 text-slate-300" />
        <p class="text-slate-500">未找到符合条件的乐谱</p>
        <p class="mt-1 text-sm text-slate-400">尝试更换筛选条件</p>
      </div>

      <!-- Load More Button -->
      <div v-if="filteredSongs.length > 0" class="mt-8 flex justify-center">
        <button
          class="rounded-full bg-primary-500 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          加载更多乐谱
        </button>
      </div>

      <!-- Footer -->
      <div class="mt-12 border-t border-slate-200 pt-6 text-center">
        <p class="text-sm text-slate-500">&copy; 2024 童学趣盒 - 乐谱资源库</p>
        <p class="mt-1 text-xs text-slate-400">
          注：本站所有素材仅供个人学习与教学使用，严禁任何形式的商业用途 (For personal study only).
        </p>
      </div>
    </main>
  </div>
</template>
