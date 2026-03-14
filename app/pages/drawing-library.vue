<script setup lang="ts">
const searchQuery = ref('');
const activeCategory = ref('all');

const categories = [
  { value: 'all', label: '全部', icon: 'i-lucide-grid-3x3' },
  { value: 'animal', label: '动物', icon: 'i-lucide-cat' },
  { value: 'plant', label: '植物', icon: 'i-lucide-flower-2' },
  { value: 'vehicle', label: '交通工具', icon: 'i-lucide-car' },
  { value: 'holiday', label: '节日', icon: 'i-lucide-gift' },
  { value: 'school', label: '学校', icon: 'i-lucide-graduation-cap' },
  { value: 'cartoon', label: '卡通', icon: 'i-lucide-smile' },
];

const drawings = [
  { id: 1, title: '小兔子', category: 'animal', difficulty: 1, icon: 'i-lucide-rabbit' },
  { id: 2, title: '小猫咪', category: 'animal', difficulty: 1, icon: 'i-lucide-cat' },
  { id: 3, title: '小狗狗', category: 'animal', difficulty: 2, icon: 'i-lucide-dog' },
  { id: 4, title: '小鸟', category: 'animal', difficulty: 1, icon: 'i-lucide-bird' },
  { id: 5, title: '蝴蝶', category: 'animal', difficulty: 2, icon: 'i-lucide-bug' },
  { id: 6, title: '向日葵', category: 'plant', difficulty: 2, icon: 'i-lucide-sun' },
  { id: 7, title: '玫瑰花', category: 'plant', difficulty: 3, icon: 'i-lucide-flower' },
  { id: 8, title: '大树', category: 'plant', difficulty: 1, icon: 'i-lucide-tree-pine' },
  { id: 9, title: '小草', category: 'plant', difficulty: 1, icon: 'i-lucide-sprout' },
  { id: 10, title: '汽车', category: 'vehicle', difficulty: 2, icon: 'i-lucide-car' },
  { id: 11, title: '火车', category: 'vehicle', difficulty: 3, icon: 'i-lucide-train' },
  { id: 12, title: '飞机', category: 'vehicle', difficulty: 2, icon: 'i-lucide-plane' },
  { id: 13, title: '轮船', category: 'vehicle', difficulty: 2, icon: 'i-lucide-ship' },
  { id: 14, title: '圣诞树', category: 'holiday', difficulty: 2, icon: 'i-lucide-tree-pine' },
  { id: 15, title: '灯笼', category: 'holiday', difficulty: 2, icon: 'i-lucide-lamp' },
  { id: 16, title: '礼物盒', category: 'holiday', difficulty: 1, icon: 'i-lucide-gift' },
  { id: 17, title: '书本', category: 'school', difficulty: 1, icon: 'i-lucide-book-open' },
  { id: 18, title: '铅笔', category: 'school', difficulty: 1, icon: 'i-lucide-pencil' },
  { id: 19, title: '书包', category: 'school', difficulty: 2, icon: 'i-lucide-backpack' },
  { id: 20, title: '笑脸', category: 'cartoon', difficulty: 1, icon: 'i-lucide-smile' },
  { id: 21, title: '星星', category: 'cartoon', difficulty: 1, icon: 'i-lucide-star' },
  { id: 22, title: '爱心', category: 'cartoon', difficulty: 1, icon: 'i-lucide-heart' },
  { id: 23, title: '太阳', category: 'cartoon', difficulty: 1, icon: 'i-lucide-sun' },
  { id: 24, title: '月亮', category: 'cartoon', difficulty: 1, icon: 'i-lucide-moon' },
];

const filteredDrawings = computed(() => {
  let result = drawings;

  if (activeCategory.value !== 'all') {
    result = result.filter((d) => d.category === activeCategory.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((d) => d.title.toLowerCase().includes(query));
  }

  return result;
});

function getDifficultyStars(level: number) {
  return Array(3)
    .fill(false)
    .map((_, i) => i < level);
}

function getDifficultyLabel(level: number) {
  switch (level) {
    case 1:
      return '初级';
    case 2:
      return '中级';
    case 3:
      return '高级';
    default:
      return '初级';
  }
}

function handleDownloadPNG(title: string) {
  alert(`正在下载 ${title} PNG 文件...`);
}

function handleDownloadPDF(title: string) {
  alert(`正在下载 ${title} PDF 文件...`);
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-default">简笔画下载</h1>
      <p class="mt-2 text-muted">丰富的简笔画素材库，适合儿童临摹学习</p>
    </div>

    <div class="relative">
      <!-- Category Navigation -->
      <div class="mb-6 flex flex-wrap items-center gap-2">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="[
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
            activeCategory === cat.value
              ? 'bg-primary-500 text-white'
              : 'bg-muted text-muted hover:bg-primary-50 hover:text-primary-600',
          ]"
          @click="activeCategory = cat.value"
        >
          <UIcon :name="cat.icon" class="size-4" />
          {{ cat.label }}
        </button>
      </div>

      <!-- Search Box (Fixed Position on Desktop) -->
      <div class="mb-6 lg:fixed lg:right-8 lg:top-24 lg:z-10 lg:mb-0 lg:w-64">
        <UInput
          v-model="searchQuery"
          placeholder="搜索简笔画…"
          icon="i-lucide-search"
          class="w-full"
        />
      </div>

      <!-- Drawing Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="drawing in filteredDrawings"
          :key="drawing.id"
          class="card-hover"
        >
          <!-- Drawing Preview -->
          <div class="flex aspect-square items-center justify-center rounded-lg bg-slate-50">
            <UIcon :name="drawing.icon" class="size-24 text-slate-300" />
          </div>

          <template #footer>
            <div class="space-y-3">
              <!-- Title and Difficulty -->
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-default">{{ drawing.title }}</h3>
                <div class="flex items-center gap-1">
                  <UIcon
                    v-for="(filled, index) in getDifficultyStars(drawing.difficulty)"
                    :key="index"
                    name="i-lucide-star"
                    :class="[
                      'size-4',
                      filled ? 'text-amber-400' : 'text-slate-200',
                    ]"
                  />
                  <span class="ml-1 text-xs text-muted">
                    {{ getDifficultyLabel(drawing.difficulty) }}
                  </span>
                </div>
              </div>

              <!-- Download Buttons -->
              <div class="flex gap-2">
                <UButton
                  size="sm"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-image"
                  label="PNG"
                  class="flex-1"
                  @click="handleDownloadPNG(drawing.title)"
                />
                <UButton
                  size="sm"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-file-text"
                  label="PDF"
                  class="flex-1"
                  @click="handleDownloadPDF(drawing.title)"
                />
              </div>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Empty State -->
      <UEmpty
        v-if="filteredDrawings.length === 0"
        icon="i-lucide-search-x"
        title="未找到简笔画"
        description="尝试更换搜索关键词或分类"
      />
    </div>
  </UContainer>
</template>
