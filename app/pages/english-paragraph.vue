<script setup lang="ts">
import { exportToPDF } from '~/utils/pdfExport';

const text = ref(
  'The quick brown fox jumps over the lazy dog. This is a sample paragraph for handwriting practice.',
);
const fontStyle = ref('dnealian');
const zoomLevel = ref(75);

// 排版设置
const lineHeight = ref(10);
const lineSpacing = ref(2);
const margin = ref({ top: 36, right: 36, bottom: 36, left: 36 });

// 字体设置
const fontSize = ref(85);
const verticalOffset = ref(0);

// 颜色设置
const lineColor = ref('#000000');

const isExporting = ref(false);
const previewRef = ref<HTMLElement>();

const paragraphLines = computed(() => {
  const words = text.value.split(' ');
  const charsPerLine = 50;
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length <= charsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

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

async function handleDownload() {
  if (!previewRef.value) return;
  if (!text.value.trim()) {
    alert('请先输入要练习的段落');
    return;
  }
  isExporting.value = true;
  try {
    await exportToPDF(previewRef.value, {
      filename: '英文段落字帖.pdf',
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
          </div>

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
            <div class="mb-6 text-center">
              <h4 class="text-xl font-bold text-slate-800">English Paragraph Practice</h4>
              <p class="mt-1 text-sm text-slate-500">Name: _______ Date: _______</p>
            </div>

            <div class="space-y-2">
              <div
                v-for="(line, index) in paragraphLines"
                :key="index"
                class="relative"
                :style="{
                  height: `${lineHeight * 3.779527559}px`,
                  marginBottom: `${lineSpacing * 3.779527559}px`,
                }"
              >
                <div
                  class="four-line-grid w-full rounded border"
                  :style="{
                    borderColor: lineColor,
                    height: `${lineHeight * 3.779527559}px`,
                  }"
                />
                <div
                  class="absolute inset-0 flex items-center px-2"
                  :style="{ transform: `translateY(${verticalOffset}%)` }"
                >
                  <span
                    :class="[
                      'tracking-widest',
                      fontStyle === 'schoolbell' ? 'font-serif italic' : 'font-sans',
                    ]"
                    :style="{
                      fontSize: `${fontSize}%`,
                      color: '#333',
                      letterSpacing: '0.1em',
                    }"
                  >
                    {{ line }}
                  </span>
                </div>
                <div
                  class="four-line-grid mt-2 w-full rounded border"
                  :style="{
                    borderColor: lineColor,
                    height: `${lineHeight * 3.779527559}px`,
                  }"
                />
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
</style>
