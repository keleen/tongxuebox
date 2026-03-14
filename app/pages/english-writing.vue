<script setup lang="ts">
import { exportToPDF } from '~/utils/pdfExport';

const text = ref('Apple, banana, cherry\nHello, my name is Lily.');
const fontStyle = ref('dnealian');
const caseMode = ref('original');
const enableTrace = ref(true);
const highlightFirst = ref(false);
const zoomLevel = ref(75);

// 排版设置
const lineHeight = ref(10); // mm
const lineSpacing = ref(2); // mm
const insertEmptyRows = ref(0);
const margin = ref({
  top: 36,
  right: 36,
  bottom: 36,
  left: 36,
});

// 字体设置
const fontSize = ref(85); // 百分比
const verticalOffset = ref(0); // 百分比

// 颜色设置
const traceColor = ref('#CCCCCC');
const lineColor = ref('#000000');

// PDF 导出状态
const isExporting = ref(false);
const previewRef = ref<HTMLElement>();

const fontStyles = [
  { value: 'dnealian', label: "D'Nealian（默认）" },
  { value: 'zb', label: 'ZB Manuscript' },
  { value: 'schoolbell', label: 'Schoolbell' },
];

const caseModes = [
  { value: 'original', label: '保持原文' },
  { value: 'lower', label: '全小写' },
  { value: 'upper', label: '全大写' },
  { value: 'capitalize', label: '首字母大写' },
];

const processedText = computed(() => {
  let result = text.value;
  switch (caseMode.value) {
    case 'lower':
      return result.toLowerCase();
    case 'upper':
      return result.toUpperCase();
    case 'capitalize':
      return result
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    default:
      return result;
  }
});

const lines = computed(() => {
  const processed = processedText.value.split('\n').filter((line) => line.trim());
  // 插入空行
  if (insertEmptyRows.value > 0 && processed.length > 0) {
    const result: string[] = [];
    const interval = Math.floor(processed.length / (insertEmptyRows.value + 1));
    processed.forEach((line, index) => {
      result.push(line);
      if (
        insertEmptyRows.value > 0 &&
        index < processed.length - 1 &&
        (index + 1) % interval === 0
      ) {
        result.push('');
      }
    });
    return result;
  }
  return processed;
});

// 计算预览尺寸
const previewStyle = computed(() => {
  const scale = zoomLevel.value / 100;
  return {
    width: `${210 * scale}mm`,
    minHeight: `${297 * scale}mm`,
    paddingTop: `${margin.value.top * scale}mm`,
    paddingRight: `${margin.value.right * scale}mm`,
    paddingBottom: `${margin.value.bottom * scale}mm`,
    paddingLeft: `${margin.value.left * scale}mm`,
  };
});

// 四线三格样式
const fourLineStyle = computed(() => {
  const lineHeightPx = lineHeight.value * 3.779527559; // mm to px
  return {
    height: `${lineHeightPx}px`,
    marginBottom: `${lineSpacing.value * 3.779527559}px`,
  };
});

async function handleDownload() {
  if (!previewRef.value) {
    return;
  }

  if (!text.value.trim()) {
    alert('请先输入要练习的英文');
    return;
  }

  isExporting.value = true;
  try {
    await exportToPDF(previewRef.value, {
      filename: '英文手写练习.pdf',
      format: 'a4',
      orientation: 'portrait',
    });
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('PDF 导出失败，请稍后重试');
  } finally {
    isExporting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen py-6">
    <div class="mx-auto flex max-w-[1400px] gap-6 px-4 sm:px-6">
      <!-- Left Panel: Settings -->
      <div class="w-full max-w-[380px] shrink-0 space-y-4 overflow-y-auto max-h-[calc(100vh-3rem)]">
        <!-- Input Card -->
        <div class="rounded-xl bg-white p-5 shadow-sm">
          <div class="mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-type" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">输入待练习英文</span>
          </div>
          <textarea
            v-model="text"
            class="h-32 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-600 placeholder-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="请输入要练习的英文（支持单词和句子）&#10;例如：Apple, banana, cherry&#10;Hello, my name is Lily."
          />
        </div>

        <!-- Settings Card -->
        <div class="rounded-xl bg-white p-5 shadow-sm space-y-5">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sliders-horizontal" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">字帖样式设置</span>
          </div>

          <!-- Font Style -->
          <div>
            <label class="mb-2 block text-xs text-slate-500">字体</label>
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

          <!-- Case Mode -->
          <div>
            <label class="mb-2 block text-xs text-slate-500">大小写</label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="mode in caseModes"
                :key="mode.value"
                :class="[
                  'flex items-center justify-center rounded-lg border-2 py-2 text-xs transition-all',
                  caseMode === mode.value
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                ]"
                @click="caseMode = mode.value"
              >
                {{ mode.label }}
              </button>
            </div>
          </div>

          <!-- Display Options -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-slate-700">启用描红</div>
                <div class="text-xs text-slate-400">显示灰色虚线字母</div>
              </div>
              <USwitch v-model="enableTrace" />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-slate-700">首字高亮</div>
                <div class="text-xs text-slate-400">突出显示第一个单词</div>
              </div>
              <USwitch v-model="highlightFirst" />
            </div>
          </div>

          <!-- Layout Settings -->
          <div class="space-y-4 border-t border-slate-200 pt-4">
            <div class="text-sm font-medium text-slate-700">排版设置</div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>行高</span>
                <span>{{ lineHeight }}mm</span>
              </label>
              <input
                v-model.number="lineHeight"
                type="range"
                min="5"
                max="20"
                step="1"
                class="w-full"
              />
            </div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>行间距</span>
                <span>{{ lineSpacing }}mm</span>
              </label>
              <input
                v-model.number="lineSpacing"
                type="range"
                min="0"
                max="10"
                step="1"
                class="w-full"
              />
            </div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>插入空行</span>
                <span>{{ insertEmptyRows }}</span>
              </label>
              <input
                v-model.number="insertEmptyRows"
                type="range"
                min="0"
                max="10"
                step="1"
                class="w-full"
              />
            </div>
            <div class="space-y-2">
              <div class="text-xs text-slate-500">页边距</div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="mb-1 block text-xs text-slate-400">上: {{ margin.top }}mm</label>
                  <input
                    v-model.number="margin.top"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-xs text-slate-400">下: {{ margin.bottom }}mm</label>
                  <input
                    v-model.number="margin.bottom"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-xs text-slate-400">左: {{ margin.left }}mm</label>
                  <input
                    v-model.number="margin.left"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-xs text-slate-400">右: {{ margin.right }}mm</label>
                  <input
                    v-model.number="margin.right"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Font Settings -->
          <div class="space-y-4 border-t border-slate-200 pt-4">
            <div class="text-sm font-medium text-slate-700">字体设置</div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>字体大小</span>
                <span>{{ fontSize }}%</span>
              </label>
              <input
                v-model.number="fontSize"
                type="range"
                min="50"
                max="150"
                step="1"
                class="w-full"
              />
            </div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>上下偏移</span>
                <span>{{ verticalOffset }}%</span>
              </label>
              <input
                v-model.number="verticalOffset"
                type="range"
                min="-20"
                max="20"
                step="1"
                class="w-full"
              />
            </div>
          </div>

          <!-- Color Settings -->
          <div class="space-y-4 border-t border-slate-200 pt-4">
            <div class="text-sm font-medium text-slate-700">颜色设置</div>
            <ColorPicker v-model="traceColor" label="描红颜色" />
            <ColorPicker v-model="lineColor" label="线条颜色" />
          </div>
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
            <UIcon name="i-lucide-zoom-in" class="size-4 text-slate-500" />
            缩放: {{ zoomLevel }}%
            <input
              v-model.number="zoomLevel"
              type="range"
              min="50"
              max="100"
              step="5"
              class="ml-2 w-20"
            />
          </div>
        </div>

        <!-- A4 Paper Preview -->
        <div class="rounded-xl bg-slate-100 p-6">
          <div ref="previewRef" class="mx-auto bg-white shadow-lg" :style="previewStyle">
            <!-- Title -->
            <div class="mb-6 text-center">
              <h4 class="text-xl font-bold text-slate-800">English Handwriting Practice</h4>
              <p class="mt-1 text-sm text-slate-500">Name: _______ Date: _______</p>
            </div>

            <!-- Four Line Grid Preview -->
            <div class="space-y-2">
              <div
                v-for="(line, index) in lines.slice(0, 20)"
                :key="index"
                class="relative"
                :style="fourLineStyle"
              >
                <!-- Four lines background -->
                <div
                  class="four-line-grid w-full rounded border"
                  :style="{
                    borderColor: lineColor,
                    height: `${lineHeight * 3.779527559}px`,
                  }"
                />

                <!-- Text overlay -->
                <div
                  v-if="enableTrace && line"
                  class="absolute inset-0 flex items-center px-2"
                  :style="{
                    transform: `translateY(${verticalOffset}%)`,
                  }"
                >
                  <span
                    :class="[
                      'tracking-widest',
                      fontStyle === 'schoolbell' ? 'font-serif italic' : 'font-sans',
                      highlightFirst && index === 0 ? 'font-bold text-primary-500' : '',
                    ]"
                    :style="{
                      fontSize: `${fontSize}%`,
                      color: traceColor,
                      letterSpacing: '0.15em',
                    }"
                  >
                    {{ line }}
                  </span>
                </div>

                <!-- Empty practice line -->
                <div
                  v-if="line"
                  class="four-line-grid mt-2 w-full rounded border"
                  :style="{
                    borderColor: lineColor,
                    height: `${lineHeight * 3.779527559}px`,
                  }"
                />
              </div>

              <!-- Additional empty lines -->
              <div
                v-for="i in 4"
                :key="'empty-' + i"
                class="four-line-grid w-full rounded border"
                :style="{
                  borderColor: lineColor,
                  height: `${lineHeight * 3.779527559}px`,
                }"
              />
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            :disabled="isExporting"
            class="flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleDownload"
          >
            <UIcon
              :name="isExporting ? 'i-lucide-loader-2' : 'i-lucide-download'"
              class="size-4 text-white"
              :class="{ 'animate-spin': isExporting }"
            />
            {{ isExporting ? '导出中...' : '下载 PDF' }}
          </button>
          <button
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50"
            @click="window.print()"
          >
            <UIcon name="i-lucide-printer" class="size-4 text-slate-700" />
            直接打印
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.four-line-grid {
  background-image: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 20%,
    v-bind(lineColor) 20%,
    v-bind(lineColor) 21%,
    transparent 21%,
    transparent 40%,
    v-bind(lineColor) 40%,
    v-bind(lineColor) 41%,
    transparent 41%,
    transparent 60%,
    v-bind(lineColor) 60%,
    v-bind(lineColor) 61%,
    transparent 61%,
    transparent 80%,
    v-bind(lineColor) 80%,
    v-bind(lineColor) 81%,
    transparent 81%
  );
  background-size: 100% 100%;
}

@media print {
  .page-bg {
    background: white !important;
  }
}
</style>
