<script setup lang="ts">
const selectedOperation = ref('add');
const selectedRange = ref(20);
const selectedCount = ref(50);
const includeAnswers = ref(true);

const toast = useToast();

const operationOptions = [
  { value: 'add', label: '加法', icon: 'i-lucide-plus' },
  { value: 'sub', label: '减法', icon: 'i-lucide-minus' },
  { value: 'mul', label: '乘法', icon: 'i-lucide-x' },
  { value: 'div', label: '除法', icon: 'i-lucide-divide' },
];

const rangeOptions = [
  { value: 10, label: '10以内' },
  { value: 20, label: '20以内' },
  { value: 100, label: '100以内' },
];

const countOptions = [
  { value: 20, label: '20题' },
  { value: 50, label: '50题' },
  { value: 100, label: '100题' },
];

// Generate test ID
const testId = computed(() => {
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  return `#TX-${dateStr}`;
});

// Get operation label
const operationLabel = computed(() => {
  const op = operationOptions.find((o) => o.value === selectedOperation.value);
  return op ? op.label : '加法';
});

// Generate questions based on settings
const questions = ref<{ num: number; question: string; answer: number }[]>([]);

function generateQuestions() {
  const newQuestions: { num: number; question: string; answer: number }[] = [];
  const max = selectedRange.value;
  const count = Math.min(selectedCount.value, 24); // Show max 24 in preview

  for (let i = 0; i < count; i++) {
    let a: number, b: number, question: string, answer: number;

    switch (selectedOperation.value) {
      case 'add':
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * (max - a)) + 1;
        question = `${a} + ${b} =`;
        answer = a + b;
        break;
      case 'sub':
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * a) + 1;
        question = `${a} - ${b} =`;
        answer = a - b;
        break;
      case 'mul':
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * 9) + 1;
        question = `${a} × ${b} =`;
        answer = a * b;
        break;
      case 'div':
        b = Math.floor(Math.random() * 9) + 1;
        answer = Math.floor(Math.random() * 9) + 1;
        a = b * answer;
        question = `${a} ÷ ${b} =`;
        break;
      default:
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * (max - a)) + 1;
        question = `${a} + ${b} =`;
        answer = a + b;
    }

    newQuestions.push({ num: i + 1, question, answer: answer! });
  }

  questions.value = newQuestions;
}

// Initial generation
onMounted(() => {
  generateQuestions();
});

// Split questions into 3 columns
const column1 = computed(() => questions.value.filter((_, i) => i % 3 === 0));
const column2 = computed(() => questions.value.filter((_, i) => i % 3 === 1));
const column3 = computed(() => questions.value.filter((_, i) => i % 3 === 2));

function handlePrint() {
  window.print();
}

function handleDownload() {
  toast.add({
    title: `已生成 ${selectedCount.value} 道${operationLabel.value}题，PDF 正在下载…`,
    icon: 'i-lucide-check-circle',
    color: 'success',
  });
}
</script>

<template>
  <div class="min-h-screen px-4 py-6 lg:px-8">
    <div class="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- Left Panel: Settings -->
      <div class="space-y-4 lg:col-span-4">
        <!-- Parameter Configuration Card -->
        <div class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-6 flex items-center gap-2">
            <UIcon name="i-lucide-sliders-horizontal" class="size-5 text-primary-500" />
            <h3 class="text-lg font-semibold text-slate-800">参数配置</h3>
          </div>

          <!-- Operation Type -->
          <div class="mb-6">
            <label class="mb-3 block text-sm text-slate-500">运算类型</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="op in operationOptions"
                :key="op.value"
                :class="[
                  'flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition-all',
                  selectedOperation === op.value
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200',
                ]"
                @click="selectedOperation = op.value"
              >
                <UIcon :name="op.icon" class="size-4" />
                {{ op.label }}
              </button>
            </div>
          </div>

          <!-- Number Range -->
          <div class="mb-6">
            <label class="mb-3 block text-sm text-slate-500">数值范围</label>
            <div class="flex gap-2">
              <button
                v-for="range in rangeOptions"
                :key="range.value"
                :class="[
                  'flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all',
                  selectedRange === range.value
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200',
                ]"
                @click="selectedRange = range.value"
              >
                {{ range.label }}
              </button>
            </div>
          </div>

          <!-- Question Count -->
          <div class="mb-6">
            <label class="mb-3 block text-sm text-slate-500">题目数量</label>
            <div class="flex gap-2">
              <button
                v-for="count in countOptions"
                :key="count.value"
                :class="[
                  'flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all',
                  selectedCount === count.value
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200',
                ]"
                @click="selectedCount = count.value"
              >
                {{ count.label }}
              </button>
            </div>
          </div>

          <!-- Print Options -->
          <div class="mb-6">
            <label class="mb-3 block text-sm text-slate-500">打印选项</label>
            <label
              class="group flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:bg-primary-50/50"
            >
              <div class="relative flex items-center">
                <input
                  v-model="includeAnswers"
                  type="checkbox"
                  class="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 transition-all checked:border-primary-500 checked:bg-primary-500 hover:border-primary-400"
                />
                <UIcon
                  name="i-lucide-check"
                  class="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                />
              </div>
              <div class="flex-1">
                <span class="text-sm font-medium text-slate-700 group-hover:text-primary-600">
                  包含答案页
                </span>
                <p class="mt-0.5 text-xs text-slate-400">打印时会额外生成一页答案</p>
              </div>
            </label>
          </div>

          <!-- Generate Button -->
          <button
            class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
            @click="generateQuestions"
          >
            <UIcon name="i-lucide-refresh-cw" class="size-4" />
            <span>重新生成题目</span>
          </button>
        </div>

        <!-- Tips Card -->
        <div class="rounded-xl bg-primary-50 p-5">
          <div class="mb-2 flex items-center gap-2">
            <UIcon name="i-lucide-lightbulb" class="size-4 text-primary-500" />
            <span class="font-medium text-primary-600">小贴士</span>
          </div>
          <p class="text-sm leading-relaxed text-primary-600/80">
            一年级学生建议选择"20以内"练习基础进位加法和退位减法。
          </p>
        </div>
      </div>

      <!-- Right Panel: Preview -->
      <div class="lg:col-span-8">
        <!-- Preview Header -->
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-eye" class="size-5 text-primary-500" />
            <h3 class="text-lg font-semibold text-slate-800">实时预览</h3>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
              @click="handlePrint"
            >
              <UIcon name="i-lucide-printer" class="size-4" />
              <span>打印练习纸</span>
            </button>
            <button
              class="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
              @click="handleDownload"
            >
              <UIcon name="i-lucide-download" class="size-4" />
              <span>下载PDF</span>
            </button>
          </div>
        </div>

        <!-- A4 Preview Area -->
        <div class="rounded-xl bg-slate-100 p-6">
          <div
            class="relative mx-auto aspect-[210/297] w-full max-w-[600px] overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <!-- Paper Content -->
            <div class="absolute inset-0 p-8">
              <!-- Header -->
              <div class="mb-6 flex items-start justify-between">
                <div>
                  <h4 class="text-xl font-bold text-slate-800">口算练习测试卷</h4>
                  <p class="mt-1 text-sm text-primary-500">
                    主题：{{ selectedRange }}以内{{ operationLabel }}练习
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-slate-400">试卷编号</p>
                  <p class="font-mono text-sm text-slate-600">{{ testId }}</p>
                </div>
              </div>

              <!-- Info Fields -->
              <div class="mb-6 grid grid-cols-4 gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span class="text-xs text-slate-400">姓名</span>
                  <div class="mt-1 border-b border-dashed border-slate-300" />
                </div>
                <div>
                  <span class="text-xs text-slate-400">日期</span>
                  <div class="mt-1 border-b border-dashed border-slate-300" />
                </div>
                <div>
                  <span class="text-xs text-slate-400">用时</span>
                  <div class="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <span>____分</span>
                    <span>____秒</span>
                  </div>
                </div>
                <div>
                  <span class="text-xs text-slate-400">得分</span>
                  <div class="mt-1 flex items-center text-xs text-primary-400">
                    <span class="border-b border-dashed border-slate-300 px-4" />
                    <span class="text-slate-400">/ {{ selectedCount }}</span>
                  </div>
                </div>
              </div>

              <!-- Questions Grid - 3 columns -->
              <div class="grid grid-cols-3 gap-x-6 gap-y-3">
                <!-- Column 1 -->
                <div class="space-y-3">
                  <div
                    v-for="q in column1"
                    :key="q.num"
                    class="flex items-center gap-2 border-b border-slate-100 pb-2"
                  >
                    <span class="w-5 text-xs text-primary-400">{{ q.num }})</span>
                    <span class="font-mono text-sm text-slate-700">{{ q.question }}</span>
                    <span class="flex-1 border-b border-slate-200" />
                  </div>
                </div>
                <!-- Column 2 -->
                <div class="space-y-3">
                  <div
                    v-for="q in column2"
                    :key="q.num"
                    class="flex items-center gap-2 border-b border-slate-100 pb-2"
                  >
                    <span class="w-5 text-xs text-primary-400">{{ q.num }})</span>
                    <span class="font-mono text-sm text-slate-700">{{ q.question }}</span>
                    <span class="flex-1 border-b border-slate-200" />
                  </div>
                </div>
                <!-- Column 3 -->
                <div class="space-y-3">
                  <div
                    v-for="q in column3"
                    :key="q.num"
                    class="flex items-center gap-2 border-b border-slate-100 pb-2"
                  >
                    <span class="w-5 text-xs text-primary-400">{{ q.num }})</span>
                    <span class="font-mono text-sm text-slate-700">{{ q.question }}</span>
                    <span class="flex-1 border-b border-slate-200" />
                  </div>
                </div>
              </div>

              <!-- Watermark -->
              <div
                class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
              >
                <span class="rotate-[-15deg] text-[120px] font-bold text-slate-900">童学趣盒</span>
              </div>

              <!-- Footer -->
              <div
                class="absolute bottom-6 left-8 right-8 flex items-center justify-between text-xs text-slate-400"
              >
                <span>由童学趣盒工具生成</span>
                <span>第 1 页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
