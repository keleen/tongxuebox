<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '颜色',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);

// 预设颜色
const presetColors = [
  '#FF0000', // 红色
  '#FF6B6B', // 浅红色
  '#4ECDC4', // 青色
  '#45B7D1', // 蓝色
  '#96CEB4', // 绿色
  '#FFEAA7', // 黄色
  '#DDA0DD', // 紫色
  '#98D8C8', // 薄荷绿
  '#F7DC6F', // 金色
  '#BB8FCE', // 淡紫色
  '#85C1E2', // 天蓝色
  '#F8B739', // 橙色
  '#000000', // 黑色
  '#666666', // 灰色
  '#999999', // 浅灰色
];

const colorValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function selectColor(color: string) {
  colorValue.value = color;
  isOpen.value = false;
}

function handleCustomColorChange(event: Event) {
  const target = event.target as HTMLInputElement;
  colorValue.value = target.value;
}
</script>

<template>
  <div class="relative">
    <label v-if="label" class="mb-2 block text-xs text-slate-500">{{ label }}</label>
    <div class="flex items-center gap-2">
      <!-- 颜色预览 -->
      <button
        type="button"
        class="h-10 w-20 rounded-lg border-2 border-slate-200 transition-all hover:border-slate-300"
        :style="{ backgroundColor: colorValue }"
        @click="isOpen = !isOpen"
      />
      <!-- 颜色值显示 -->
      <input
        v-model="colorValue"
        type="text"
        class="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-600 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
        placeholder="#FF0000"
      />
      <!-- 自定义颜色选择器 -->
      <input
        type="color"
        :value="colorValue"
        class="h-10 w-10 cursor-pointer rounded-lg border border-slate-200"
        @change="handleCustomColorChange"
      />
    </div>

    <!-- 预设颜色面板 -->
    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
    >
      <div class="mb-2 text-xs text-slate-500">预设颜色</div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in presetColors"
          :key="color"
          type="button"
          class="h-8 w-8 rounded border-2 transition-all hover:scale-110"
          :class="colorValue === color ? 'border-primary-500' : 'border-slate-200'"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        />
      </div>
    </div>
  </div>
</template>
