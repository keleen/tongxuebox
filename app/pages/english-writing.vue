<script setup lang="ts">
const text = ref('Apple, banana, cherry\nHello, my name is Lily.');
const fontStyle = ref('dnealian');
const caseMode = ref('original');
const enableTrace = ref(true);

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
  return processedText.value.split('\n').filter((line) => line.trim());
});

function handleDownload() {
  alert('PDF 下载功能将在后续版本中实现。当前可以使用浏览器打印功能（Ctrl+P）进行打印。');
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-default">生成英文手写练习</h1>
      <p class="mt-2 text-muted">使用四线三格规范书写英文，支持多种字体风格</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Left Panel: Settings -->
      <div class="lg:col-span-5">
        <UCard>
          <div class="space-y-6">
            <!-- Text Input -->
            <div>
              <label class="mb-2 block text-sm font-medium text-default">
                请输入要练习的英文（支持单词和句子）
              </label>
              <UTextarea
                v-model="text"
                :rows="5"
                placeholder="e.g., Apple, banana, cherry...&#10;Hello, my name is Lily."
                autoresize
                :maxrows="10"
              />
            </div>

            <USeparator />

            <!-- Line Type (Fixed) -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">书写线型</label>
              <UBadge color="primary" variant="subtle">四线三格（固定）</UBadge>
            </div>

            <USeparator />

            <!-- Font Style -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">字体</label>
              <USelect v-model="fontStyle" :items="fontStyles" />
              <p class="mt-2 text-xs text-muted">
                提示：悬停在字体名称上可查看示例（如 a, g 的写法差异）
              </p>
            </div>

            <USeparator />

            <!-- Case Mode -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">大小写</label>
              <URadioGroup v-model="caseMode" :items="caseModes" />
            </div>

            <USeparator />

            <!-- Trace Toggle -->
            <div>
              <UCheckbox v-model="enableTrace" label="启用描红（灰色虚线字母）" />
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
                <h4 class="text-xl font-bold text-slate-800">English Handwriting Practice</h4>
                <p class="mt-1 text-sm text-slate-500">Name: _______ Date: _______</p>
              </div>

              <!-- Four Line Grid Preview -->
              <div class="space-y-8">
                <div
                  v-for="(line, index) in lines.slice(0, 6)"
                  :key="index"
                  class="relative"
                >
                  <!-- Four lines background -->
                  <div class="four-line-grid h-10 w-full rounded border border-slate-200" />

                  <!-- Text overlay -->
                  <div
                    v-if="enableTrace"
                    class="absolute inset-0 flex items-center px-2"
                  >
                    <span
                      :class="[
                        'text-xl tracking-widest text-slate-300',
                        fontStyle === 'schoolbell' ? 'font-serif italic' : 'font-sans',
                      ]"
                      style="letter-spacing: 0.15em"
                    >
                      {{ line }}
                    </span>
                  </div>

                  <!-- Empty practice line -->
                  <div class="four-line-grid mt-2 h-10 w-full rounded border border-slate-200" />
                </div>

                <!-- Additional empty lines -->
                <div
                  v-for="i in 4"
                  :key="'empty-' + i"
                  class="four-line-grid h-10 w-full rounded border border-slate-200"
                />
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-muted">
                提示：下伸字母（g, y, p）会正确延伸至底线
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
