<script setup lang="ts">
const activeTab = ref('grade');
const selectedGrade = ref(1);
const operations = ref(['add', 'sub']);
const minNumber = ref(1);
const maxNumber = ref(20);
const questionCount = ref(20);
const includeAnswers = ref(true);
const useVertical = ref(false);

const toast = useToast();

const grades = [
  { grade: 1, label: '一年级', desc: '20以内加减法' },
  { grade: 2, label: '二年级', desc: '100以内加减法' },
  { grade: 3, label: '三年级', desc: '乘法口诀' },
  { grade: 4, label: '四年级', desc: '多位数运算' },
  { grade: 5, label: '五年级', desc: '小数运算' },
  { grade: 6, label: '六年级', desc: '分数运算' },
];

const operationOptions = [
  { value: 'add', label: '加法' },
  { value: 'sub', label: '减法' },
  { value: 'mul', label: '乘法' },
  { value: 'div', label: '除法' },
  { value: 'mix', label: '混合' },
];

const questionCountOptions = [
  { value: 10, label: '10 题' },
  { value: 20, label: '20 题' },
  { value: 30, label: '30 题' },
];

const tabItems = [
  { label: '按年级选择', value: 'grade' },
  { label: '自定义出题', value: 'custom' },
];

// Generate sample questions based on settings
const sampleQuestions = computed(() => {
  const questions: string[] = [];
  const max = activeTab.value === 'grade' ? getMaxByGrade(selectedGrade.value) : maxNumber.value;
  const min = activeTab.value === 'grade' ? 1 : minNumber.value;
  const ops = activeTab.value === 'grade' ? getOpsByGrade(selectedGrade.value) : operations.value;

  for (let i = 0; i < Math.min(questionCount.value, 20); i++) {
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    const op = ops[Math.floor(Math.random() * ops.length)];

    let question = '';
    let answer = 0;

    switch (op) {
      case 'add':
        question = `${a} + ${b} = `;
        answer = a + b;
        break;
      case 'sub':
        question = `${Math.max(a, b)} - ${Math.min(a, b)} = `;
        answer = Math.max(a, b) - Math.min(a, b);
        break;
      case 'mul':
        question = `${Math.min(a, 9)} × ${Math.min(b, 9)} = `;
        answer = Math.min(a, 9) * Math.min(b, 9);
        break;
      case 'div':
        const divisor = Math.max(1, Math.min(b, 9));
        const dividend = divisor * Math.floor(Math.random() * 9 + 1);
        question = `${dividend} ÷ ${divisor} = `;
        answer = dividend / divisor;
        break;
      default:
        question = `${a} + ${b} = `;
        answer = a + b;
    }

    questions.push(question + (includeAnswers.value ? `___（${answer}）` : '___'));
  }

  return questions;
});

function getMaxByGrade(grade: number): number {
  switch (grade) {
    case 1:
      return 20;
    case 2:
      return 100;
    case 3:
    case 4:
      return 99;
    default:
      return 100;
  }
}

function getOpsByGrade(grade: number): string[] {
  switch (grade) {
    case 1:
    case 2:
      return ['add', 'sub'];
    case 3:
      return ['mul'];
    case 4:
      return ['add', 'sub', 'mul', 'div'];
    default:
      return ['add', 'sub', 'mul', 'div'];
  }
}

function handleDownload() {
  toast.add({
    title: `已生成 ${questionCount.value} 道题，PDF 正在下载…`,
    icon: 'i-lucide-check-circle',
    color: 'success',
  });
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-default">数学计算题生成器</h1>
      <p class="mt-2 text-muted">按年级选择或自定义出题，生成可打印的数学练习题</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Left Panel: Settings -->
      <div class="lg:col-span-5">
        <UCard>
          <UTabs v-model="activeTab" :items="tabItems" class="mb-6" />

          <!-- Grade Selection Mode -->
          <div v-if="activeTab === 'grade'" class="space-y-6">
            <div>
              <label class="mb-3 block text-sm font-medium text-default">选择年级</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="g in grades"
                  :key="g.grade"
                  :class="[
                    'rounded-lg border p-4 text-left transition-all',
                    selectedGrade === g.grade
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                      : 'border-default hover:border-primary-300',
                  ]"
                  @click="selectedGrade = g.grade"
                >
                  <div class="font-semibold text-default">{{ g.label }}</div>
                  <div class="mt-1 text-xs text-muted">{{ g.desc }}</div>
                </button>
              </div>
            </div>

            <USeparator />

            <div>
              <label class="mb-3 block text-sm font-medium text-default">题量</label>
              <URadioGroup v-model="questionCount" :items="questionCountOptions" />
            </div>

            <USeparator />

            <div class="space-y-3">
              <UCheckbox v-model="includeAnswers" label="包含答案页" />
              <UCheckbox v-model="useVertical" label="使用竖式排版（仅加减乘除）" />
            </div>
          </div>

          <!-- Custom Mode -->
          <div v-else class="space-y-6">
            <div>
              <label class="mb-3 block text-sm font-medium text-default">运算类型（可多选）</label>
              <UCheckboxGroup v-model="operations" :items="operationOptions" />
            </div>

            <USeparator />

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-2 block text-sm font-medium text-default">最小值</label>
                <UInputNumber v-model="minNumber" :min="1" :max="999" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-default">最大值</label>
                <UInputNumber v-model="maxNumber" :min="1" :max="999" />
              </div>
            </div>

            <USeparator />

            <div>
              <label class="mb-3 block text-sm font-medium text-default">题量</label>
              <URadioGroup v-model="questionCount" :items="questionCountOptions" />
            </div>

            <USeparator />

            <div class="space-y-3">
              <UCheckbox v-model="includeAnswers" label="包含答案页" />
              <UCheckbox v-model="useVertical" label="使用竖式排版（仅加减乘除）" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Panel: Preview -->
      <div class="lg:col-span-7">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-default">预览效果</h3>
              <UBadge v-if="includeAnswers" color="success" variant="subtle">
                含答案
              </UBadge>
            </div>
          </template>

          <!-- A4 Preview Area -->
          <div class="overflow-auto">
            <div class="mx-auto w-full max-w-[210mm] rounded-lg border border-default bg-white p-8 shadow-lg">
              <!-- Title -->
              <div class="mb-6 text-center">
                <h4 class="text-xl font-bold text-slate-800">数学口算练习</h4>
                <p class="mt-1 text-sm text-slate-500">
                  姓名：_______ 班级：_______ 日期：_______ 用时：_______
                </p>
              </div>

              <!-- Questions Grid -->
              <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                <div
                  v-for="(question, index) in sampleQuestions"
                  :key="index"
                  class="flex items-center gap-2 border-b border-slate-100 py-2"
                >
                  <span class="w-6 text-sm text-slate-400">{{ index + 1 }}.</span>
                  <span class="font-mono text-lg text-slate-800">{{ question }}</span>
                </div>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-muted">
                共 {{ questionCount }} 道题
              </p>
              <UButton
                icon="i-lucide-download"
                color="success"
                label="生成并下载 PDF（含答案）"
                @click="handleDownload"
              />
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
