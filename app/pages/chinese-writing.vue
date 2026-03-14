<script setup lang="ts">
const text = ref('');
const gridType = ref<'tian' | 'mi'>('tian');
const fontStyle = ref('kai');
const showPinyin = ref(true);
const zoomLevel = ref(75);

const fontStyles = [
  { value: 'kai', label: '楷体 (Kaiti)' },
  { value: 'song', label: '宋体 (Songti)' },
  { value: 'hei', label: '黑体 (Heiti)' },
];

// Simple pinyin mapping for demo purposes
const pinyinMap: Record<string, string> = {
  好: 'hǎo',
  学: 'xué',
  习: 'xí',
  天: 'tiān',
  向: 'xiàng',
  上: 'shàng',
  床: 'chuáng',
  前: 'qián',
  明: 'míng',
  月: 'yuè',
  光: 'guāng',
  疑: 'yí',
  是: 'shì',
  地: 'dì',
  霜: 'shuāng',
  举: 'jǔ',
  头: 'tóu',
  望: 'wàng',
  低: 'dī',
  思: 'sī',
  故: 'gù',
  乡: 'xiāng',
  中: 'zhōng',
  国: 'guó',
  人: 'rén',
  民: 'mín',
  大: 'dà',
  小: 'xiǎo',
  我: 'wǒ',
  你: 'nǐ',
  他: 'tā',
  她: 'tā',
  的: 'de',
  了: 'le',
  在: 'zài',
  有: 'yǒu',
  不: 'bù',
  这: 'zhè',
  那: 'nà',
  和: 'hé',
  就: 'jiù',
  也: 'yě',
  都: 'dōu',
  而: 'ér',
  说: 'shuō',
  能: 'néng',
  会: 'huì',
  做: 'zuò',
  看: 'kàn',
  来: 'lái',
  去: 'qù',
  想: 'xiǎng',
  要: 'yào',
  知: 'zhī',
  道: 'dào',
};

const charCount = computed(() => {
  return text.value.replace(/[^\u4e00-\u9fa5]/g, '').length;
});

const characters = computed(() => {
  return text.value.split('').filter((char) => /[\u4e00-\u9fa5]/.test(char));
});

function getPinyin(char: string): string {
  return pinyinMap[char] || 'pīn';
}

function handleGenerate() {
  if (charCount.value === 0) {
    alert('请先输入要练习的汉字');
    return;
  }
}

function handleDownload() {
  alert('PDF 下载功能将在后续版本中实现。');
}

function handlePrint() {
  window.print();
}

function handleShare() {
  if (navigator.share) {
    navigator.share({
      title: '生字练习字帖',
      text: '来自童学趣盒的练字帖',
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('链接已复制到剪贴板');
  }
}

// Fill empty cells to complete grid rows (6 columns)
const gridCells = computed(() => {
  const chars = characters.value.slice(0, 30);
  const totalCells = Math.max(30, Math.ceil(chars.length / 6) * 6);
  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    cells.push(chars[i] || '');
  }
  return cells;
});
</script>

<template>
  <div class="min-h-screen py-6">
    <div class="mx-auto flex max-w-[1400px] gap-6 px-4 sm:px-6">
      <!-- Left Panel: Input & Settings -->
      <div class="w-full max-w-[340px] shrink-0 space-y-4">
        <!-- Input Card -->
        <div class="rounded-xl bg-white p-5 shadow-sm">
          <div class="mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-type" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">输入待练习汉字</span>
          </div>
          <textarea
            v-model="text"
            class="h-32 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-600 placeholder-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="在此输入想要练习的汉字，例如：好好学习 天天向上..."
          />
          <div class="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>支持多行输入</span>
            <span>{{ charCount }} / 500 字</span>
          </div>
        </div>

        <!-- Settings Card -->
        <div class="rounded-xl bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-center gap-2">
            <UIcon name="i-lucide-sliders-horizontal" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">字帖样式设置</span>
          </div>

          <!-- Font Selection -->
          <div class="mb-4">
            <label class="mb-2 block text-xs text-slate-500">字体选择</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="font in fontStyles"
                :key="font.value"
                :class="[
                  'flex flex-col items-center justify-center gap-1 rounded-lg border-2 py-3 transition-all',
                  fontStyle === font.value
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                ]"
                @click="fontStyle = font.value"
              >
                <span class="text-xs">{{ font.label }}</span>
              </button>
            </div>
          </div>

          <!-- Grid Type -->
          <div class="mb-4">
            <label class="mb-2 block text-xs text-slate-500">格子类型</label>
            <div class="flex gap-2">
              <button
                :class="[
                  'flex flex-1 flex-col items-center gap-1 rounded-lg border-2 py-3 transition-all',
                  gridType === 'tian'
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                ]"
                @click="gridType = 'tian'"
              >
                <div class="grid grid-cols-2 gap-px">
                  <div class="size-2.5 rounded-sm bg-current opacity-60" />
                  <div class="size-2.5 rounded-sm bg-current opacity-60" />
                  <div class="size-2.5 rounded-sm bg-current opacity-60" />
                  <div class="size-2.5 rounded-sm bg-current opacity-60" />
                </div>
                <span class="text-xs">田字格</span>
              </button>
              <button
                :class="[
                  'flex flex-1 flex-col items-center gap-1 rounded-lg border-2 py-3 transition-all',
                  gridType === 'mi'
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                ]"
                @click="gridType = 'mi'"
              >
                <div class="grid grid-cols-3 gap-px">
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                  <div class="size-1.5 rounded-full bg-current opacity-60" />
                </div>
                <span class="text-xs">米字格</span>
              </button>
            </div>
          </div>

          <!-- Pinyin Toggle -->
          <div class="mb-5 flex items-center justify-between">
            <div>
              <div class="text-sm text-slate-700">显示拼音</div>
              <div class="text-xs text-slate-400">在汉字上方自动标注</div>
            </div>
            <USwitch v-model="showPinyin" />
          </div>

          <!-- Generate Button -->
          <button
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 py-3 font-medium text-white transition-colors hover:bg-primary-600"
            @click="handleGenerate"
          >
            <UIcon name="i-lucide-refresh-cw" class="size-4" />
            立即生成字帖
          </button>
        </div>
      </div>

      <!-- Right Panel: Preview -->
      <div class="flex-1">
        <!-- Preview Header -->
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-eye" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">实时预览 (A4 纸张)</span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500"
          >
            <UIcon name="i-lucide-zoom-in" class="size-4" />
            缩放: {{ zoomLevel }}%
          </div>
        </div>

        <!-- A4 Paper Preview -->
        <div class="rounded-xl bg-slate-100 p-6">
          <div
            class="mx-auto bg-white shadow-lg"
            :style="{
              width: `${210 * (zoomLevel / 100)}mm`,
              minHeight: `${297 * (zoomLevel / 100)}mm`,
              padding: `${20 * (zoomLevel / 100)}mm`,
            }"
          >
            <!-- Paper Header -->
            <div class="mb-6 flex items-start justify-between">
              <h3 class="text-xl font-bold text-primary-500">生字练习字帖</h3>
              <div class="text-right text-sm text-slate-400">
                <span>姓名：</span>
                <span class="inline-block w-20 border-b border-dashed border-primary-300" />
                <span class="ml-4">日期：</span>
                <span class="inline-block w-20 border-b border-dashed border-primary-300" />
              </div>
            </div>

            <!-- Character Grid -->
            <div class="grid grid-cols-6 border border-slate-300">
              <template v-for="(cell, index) in gridCells" :key="index">
                <div
                  class="relative flex aspect-square items-center justify-center border border-slate-300"
                  :class="gridType === 'tian' ? 'tian-zi-ge' : 'mi-zi-ge'"
                >
                  <!-- Pinyin -->
                  <span v-if="showPinyin && cell" class="absolute top-1 text-xs text-slate-400">
                    {{ getPinyin(cell) }}
                  </span>
                  <!-- Character -->
                  <span
                    v-if="cell"
                    :class="[
                      'text-2xl font-medium',
                      fontStyle === 'kai' ? 'font-serif' : 'font-sans',
                    ]"
                    :style="{ color: '#463AE8' }"
                  >
                    {{ cell }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            class="flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary-600 hover:shadow-lg"
            @click="handleDownload"
          >
            <UIcon name="i-lucide-download" class="size-4" />
            下载 PDF
          </button>
          <button
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50"
            @click="handlePrint"
          >
            <UIcon name="i-lucide-printer" class="size-4" />
            直接打印
          </button>
          <button
            class="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50"
            @click="handleShare"
          >
            <UIcon name="i-lucide-share-2" class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tian Zi Ge (田字格) */
.tian-zi-ge {
  background:
    linear-gradient(to right, transparent 49.5%, #e5d0d0 49.5%, #e5d0d0 50.5%, transparent 50.5%),
    linear-gradient(to bottom, transparent 49.5%, #e5d0d0 49.5%, #e5d0d0 50.5%, transparent 50.5%);
}

/* Mi Zi Ge (米字格) */
.mi-zi-ge {
  background:
    linear-gradient(to right, transparent 49.5%, #e5d0d0 49.5%, #e5d0d0 50.5%, transparent 50.5%),
    linear-gradient(to bottom, transparent 49.5%, #e5d0d0 49.5%, #e5d0d0 50.5%, transparent 50.5%),
    linear-gradient(45deg, transparent 49%, #e5d0d0 49%, #e5d0d0 51%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, #e5d0d0 49%, #e5d0d0 51%, transparent 51%);
}

@media print {
  .page-bg {
    background: white !important;
  }
}
</style>
