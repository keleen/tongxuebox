<script setup lang="ts">
const text = ref('床前明月光，疑是地上霜。举头望明月，低头思故乡。');
const gridType = ref('tian');
const fontStyle = ref('kai');
const showPinyin = ref(true);
const traceMode = ref('full');

const gridTypes = [
  { value: 'tian', label: '田字格' },
  { value: 'mi', label: '米字格' },
  { value: 'hui', label: '回宫格' },
  { value: 'none', label: '无格' },
];

const fontStyles = [
  { value: 'kai', label: '楷体（推荐）' },
  { value: 'xingkai', label: '行楷' },
];

const traceModes = [
  { value: 'full', label: '全描红' },
  { value: 'semi', label: '半透明' },
  { value: 'empty', label: '仅空格' },
];

const charCount = computed(() => {
  return text.value.replace(/[^\u4e00-\u9fa5]/g, '').length;
});

const characters = computed(() => {
  return text.value.split('').filter((char) => /[\u4e00-\u9fa5]/.test(char));
});

const hasNonChinese = computed(() => {
  const nonChineseChars = text.value.replace(/[\u4e00-\u9fa5\s，。、；：！？""''（）]/g, '');
  return nonChineseChars.length > 0;
});

const gridClass = computed(() => {
  switch (gridType.value) {
    case 'tian':
      return 'tian-zi-ge';
    case 'mi':
      return 'mi-zi-ge';
    default:
      return '';
  }
});

const traceOpacity = computed(() => {
  switch (traceMode.value) {
    case 'full':
      return 'opacity-30';
    case 'semi':
      return 'opacity-15';
    case 'empty':
      return 'opacity-0';
    default:
      return 'opacity-30';
  }
});

function handleDownload() {
  // In a real implementation, this would generate a PDF
  alert('PDF 下载功能将在后续版本中实现。当前可以使用浏览器打印功能（Ctrl+P）进行打印。');
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-default">生成中文练字帖</h1>
      <p class="mt-2 text-muted">输入想要练习的汉字，自动生成可打印的练字帖</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Left Panel: Settings -->
      <div class="lg:col-span-5">
        <UCard>
          <div class="space-y-6">
            <!-- Text Input -->
            <div>
              <label class="mb-2 block text-sm font-medium text-default">
                请输入要练习的文字（支持古诗、课文）
              </label>
              <UTextarea
                v-model="text"
                :rows="5"
                placeholder="例如：床前明月光，疑是地上霜…"
                autoresize
                :maxrows="10"
              />
              <p class="mt-2 text-right text-sm text-muted">
                已输入 {{ charCount }} 字
              </p>
              <UAlert
                v-if="hasNonChinese"
                color="warning"
                icon="i-lucide-alert-triangle"
                title="建议仅输入汉字以获得最佳效果"
                class="mt-2"
              />
            </div>

            <USeparator />

            <!-- Grid Type -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">格子类型</label>
              <URadioGroup v-model="gridType" :items="gridTypes" />
            </div>

            <USeparator />

            <!-- Font Style -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">字体</label>
              <USelect v-model="fontStyle" :items="fontStyles" />
            </div>

            <USeparator />

            <!-- Pinyin Toggle -->
            <div>
              <UCheckbox v-model="showPinyin" label="显示拼音（自动标注）" />
            </div>

            <USeparator />

            <!-- Trace Mode -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">描红模式</label>
              <URadioGroup v-model="traceMode" :items="traceModes" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Panel: Preview -->
      <div class="lg:col-span-7">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-default">预览效果（A4 尺寸）</h3>
            </div>
          </template>

          <!-- A4 Preview Area -->
          <div class="overflow-auto">
            <div class="mx-auto w-full max-w-[210mm] rounded-lg border border-default bg-white p-8 shadow-lg">
              <!-- Title -->
              <div class="mb-6 text-center">
                <h4 class="text-xl font-bold text-slate-800">中文练字帖</h4>
                <p class="mt-1 text-sm text-slate-500">姓名：_______ 日期：_______</p>
              </div>

              <!-- Character Grid -->
              <div class="grid grid-cols-8 gap-1">
                <div
                  v-for="(char, index) in characters.slice(0, 32)"
                  :key="index"
                  :class="[
                    'relative flex aspect-square items-center justify-center border border-slate-300',
                    gridClass,
                  ]"
                >
                  <!-- Pinyin -->
                  <span
                    v-if="showPinyin"
                    class="absolute -top-5 text-xs text-slate-400"
                  >
                    pīn
                  </span>
                  <!-- Character -->
                  <span
                    :class="[
                      'text-2xl font-medium text-slate-800',
                      traceOpacity,
                      fontStyle === 'kai' ? 'font-serif' : 'font-sans',
                    ]"
                  >
                    {{ char }}
                  </span>
                </div>
              </div>

              <!-- Empty practice rows -->
              <div class="mt-4 grid grid-cols-8 gap-1">
                <div
                  v-for="i in 16"
                  :key="'empty-' + i"
                  :class="[
                    'aspect-square border border-slate-300',
                    gridClass,
                  ]"
                />
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-muted">
                提示：点击下载后请用 Adobe Reader 打印以确保格式正确
              </p>
              <UButton
                icon="i-lucide-download"
                color="success"
                label="下载 PDF"
                @click="handleDownload"
              />
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
