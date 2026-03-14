<script setup lang="ts">
import { getPinyin } from '~/utils/pinyin';
import { exportToPDF } from '~/utils/pdfExport';

const text = ref('春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。');
const gridType = ref<'tian' | 'mi'>('tian');
const fontStyle = ref('kai');
const showPinyin = ref(true);
const zoomLevel = ref(75);

// 排版设置
const gridSize = ref(10);
const lineSpacing = ref(2);
const charSpacing = ref(0); // px
const insertEmptyRows = ref(0);
const margin = ref({ top: 36, right: 36, bottom: 36, left: 36 });

// 字体设置
const fontStyles = [
  { value: 'kai', label: '楷体' },
  { value: 'song', label: '宋体' },
  { value: 'hei', label: '黑体' },
];
const fontWeight = ref(400);
const fontSize = ref(68);
const verticalOffset = ref(0);

// 颜色设置
const traceColor = ref('#FF0000');
const lineColor = ref('#E5D0D0');

const isExporting = ref(false);
const previewRef = ref<HTMLElement>();

// 处理段落文本，自动换行
const paragraphLines = computed(() => {
  const chars = text.value
    .split('')
    .filter((char) => /[\u4e00-\u9fa5，。！？、]/.test(char) || char.trim());
  const charsPerLine = 20; // 每行字符数
  const lines: string[] = [];

  for (let i = 0; i < chars.length; i += charsPerLine) {
    lines.push(chars.slice(i, i + charsPerLine).join(''));
  }

  return lines;
});

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

const charStyle = computed(() => ({
  fontSize: `${fontSize.value}%`,
  fontWeight: fontWeight.value,
  transform: `translateY(${verticalOffset.value}%)`,
  letterSpacing: `${charSpacing.value}px`,
}));

async function handleDownload() {
  if (!previewRef.value) return;
  if (!text.value.trim()) {
    alert('请先输入要练习的段落');
    return;
  }
  isExporting.value = true;
  try {
    await exportToPDF(previewRef.value, {
      filename: '中文段落字帖.pdf',
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
      <!-- Left Panel -->
      <div class="w-full max-w-[380px] shrink-0 space-y-4 overflow-y-auto max-h-[calc(100vh-3rem)]">
        <div class="rounded-xl bg-white p-5 shadow-sm">
          <div class="mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-type" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">输入段落</span>
          </div>
          <textarea
            v-model="text"
            class="h-32 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-600 placeholder-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="请输入段落文本，支持自动换行"
          />
        </div>

        <!-- Settings -->
        <div class="rounded-xl bg-white p-5 shadow-sm space-y-5">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sliders-horizontal" class="size-5 text-primary-500" />
            <span class="font-medium text-slate-800">字帖样式设置</span>
          </div>

          <!-- Font Selection -->
          <div>
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
          <div>
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
                <span class="text-xs">米字格</span>
              </button>
            </div>
          </div>

          <!-- Display Options -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-slate-700">显示拼音</div>
              </div>
              <USwitch v-model="showPinyin" />
            </div>
          </div>

          <!-- Layout Settings -->
          <div class="space-y-4 border-t border-slate-200 pt-4">
            <div class="text-sm font-medium text-slate-700">排版设置</div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>方格大小</span>
                <span>{{ gridSize }}mm</span>
              </label>
              <input
                v-model.number="gridSize"
                type="range"
                min="5"
                max="20"
                step="1"
                class="w-full"
              />
            </div>
            <div>
              <label class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>字间距</span>
                <span>{{ charSpacing }}px</span>
              </label>
              <input
                v-model.number="charSpacing"
                type="range"
                min="0"
                max="10"
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
          </div>

          <!-- Color Settings -->
          <div class="space-y-4 border-t border-slate-200 pt-4">
            <div class="text-sm font-medium text-slate-700">颜色设置</div>
            <ColorPicker v-model="lineColor" label="线条颜色" />
          </div>
        </div>
      </div>

      <!-- Right Panel: Preview -->
      <div class="flex-1">
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

        <div class="rounded-xl bg-slate-100 p-6">
          <div ref="previewRef" class="mx-auto bg-white shadow-lg" :style="previewStyle">
            <div class="mb-6 flex items-start justify-between">
              <h3 class="text-xl font-bold text-primary-500">段落练习字帖</h3>
              <div class="text-right text-sm text-slate-400">
                <span>姓名：</span>
                <span class="inline-block w-20 border-b border-dashed border-primary-300" />
                <span class="ml-4">日期：</span>
                <span class="inline-block w-20 border-b border-dashed border-primary-300" />
              </div>
            </div>

            <div class="space-y-2" :style="{ marginBottom: `${lineSpacing * 3.779527559}px` }">
              <div
                v-for="(line, lineIndex) in paragraphLines"
                :key="lineIndex"
                class="flex flex-wrap"
                :style="{ gap: `${charSpacing}px` }"
              >
                <template v-for="(char, charIndex) in line.split('')" :key="charIndex">
                  <div
                    v-if="/[\u4e00-\u9fa5]/.test(char)"
                    class="relative flex aspect-square items-center justify-center border"
                    :class="gridType === 'tian' ? 'tian-zi-ge' : 'mi-zi-ge'"
                    :style="{
                      width: `${gridSize * 3.779527559}px`,
                      height: `${gridSize * 3.779527559}px`,
                      borderColor: lineColor,
                    }"
                  >
                    <span
                      v-if="showPinyin"
                      class="absolute top-1 text-xs"
                      :style="{ color: lineColor }"
                    >
                      {{ getPinyin(char) }}
                    </span>
                    <span
                      :class="[
                        'text-2xl font-medium',
                        fontStyle === 'kai' ? 'font-serif' : 'font-sans',
                      ]"
                      :style="{
                        ...charStyle,
                        color: '#463AE8',
                      }"
                    >
                      {{ char }}
                    </span>
                  </div>
                  <span
                    v-else
                    :class="[
                      'text-2xl font-medium',
                      fontStyle === 'kai' ? 'font-serif' : 'font-sans',
                    ]"
                    :style="charStyle"
                  >
                    {{ char }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            :disabled="isExporting"
            class="flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleDownload"
          >
            <UIcon
              :name="isExporting ? 'i-lucide-loader-2' : 'i-lucide-download'"
              class="size-4"
              :class="{ 'animate-spin': isExporting }"
            />
            {{ isExporting ? '导出中...' : '下载 PDF' }}
          </button>
          <button
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50"
            @click="window.print()"
          >
            <UIcon name="i-lucide-printer" class="size-4" />
            直接打印
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tian-zi-ge {
  background:
    linear-gradient(
      to right,
      transparent 49.5%,
      v-bind(lineColor) 49.5%,
      v-bind(lineColor) 50.5%,
      transparent 50.5%
    ),
    linear-gradient(
      to bottom,
      transparent 49.5%,
      v-bind(lineColor) 49.5%,
      v-bind(lineColor) 50.5%,
      transparent 50.5%
    );
}

.mi-zi-ge {
  background:
    linear-gradient(
      to right,
      transparent 49.5%,
      v-bind(lineColor) 49.5%,
      v-bind(lineColor) 50.5%,
      transparent 50.5%
    ),
    linear-gradient(
      to bottom,
      transparent 49.5%,
      v-bind(lineColor) 49.5%,
      v-bind(lineColor) 50.5%,
      transparent 50.5%
    ),
    linear-gradient(
      45deg,
      transparent 49%,
      v-bind(lineColor) 49%,
      v-bind(lineColor) 51%,
      transparent 51%
    ),
    linear-gradient(
      -45deg,
      transparent 49%,
      v-bind(lineColor) 49%,
      v-bind(lineColor) 51%,
      transparent 51%
    );
}
</style>
