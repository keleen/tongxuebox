<script setup lang="ts">
const featureCards = [
  {
    title: '中文练字帖',
    description: '输入古诗或课文，生成带田字格的可打印字帖',
    icon: 'i-lucide-pen-tool',
    to: '/chinese-writing',
  },
  {
    title: '英文手写练习',
    description: '四线三格规范书写，支持多种字体风格',
    icon: 'i-lucide-pencil',
    to: '/english-writing',
  },
  {
    title: '数学计算题',
    description: '按年级智能生成口算题，支持自定义难度',
    icon: 'i-lucide-calculator',
    to: '/math-worksheet',
  },
  {
    title: '简笔画下载',
    description: '丰富的简笔画素材库，分类清晰，一键下载',
    icon: 'i-lucide-palette',
    to: '/drawing-library',
  },
  {
    title: '乐谱天地',
    description: '适合儿童的简单乐谱，支持多种乐器',
    icon: 'i-lucide-music',
    to: '/sheet-music',
  },
  {
    title: '帮助中心',
    description: '使用指南和常见问题解答',
    icon: 'i-lucide-help-circle',
    to: '/help',
  },
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient py-16 lg:py-24">
      <UContainer>
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-default lg:text-5xl text-balance">
            让学习变得简单又有趣
          </h1>
          <p class="mt-6 text-lg text-muted lg:text-xl text-pretty">
            免费生成可打印的字帖、数学题、简笔画和乐谱，专为小学生设计
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <UButton
              to="/chinese-writing"
              size="lg"
              icon="i-lucide-pen-tool"
              label="中文练字"
            />
            <UButton
              to="/english-writing"
              size="lg"
              color="neutral"
              variant="subtle"
              icon="i-lucide-pencil"
              label="英文书写"
            />
            <UButton
              to="/math-worksheet"
              size="lg"
              color="neutral"
              variant="subtle"
              icon="i-lucide-calculator"
              label="数学练习"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Feature Cards Section -->
    <section class="py-16 lg:py-24">
      <UContainer>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-default">
            功能模块
          </h2>
          <p class="mt-4 text-lg text-muted">
            丰富的学习资源，助力孩子快乐成长
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="card in featureCards"
            :key="card.title"
            :to="card.to"
            class="group"
          >
            <UCard class="h-full card-hover">
              <div class="flex flex-col items-start gap-4">
                <div class="rounded-lg bg-primary-50 p-3">
                  <UIcon :name="card.icon" class="size-6 text-primary-500" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-default group-hover:text-primary-600">
                    {{ card.title }}
                  </h3>
                  <p class="mt-2 text-muted">
                    {{ card.description }}
                  </p>
                </div>
                <span class="mt-auto flex items-center gap-1 text-sm font-medium text-primary-600">
                  立即使用
                  <UIcon name="i-lucide-arrow-right" class="size-4" />
                </span>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Benefits Section -->
    <section class="bg-muted py-16 lg:py-24">
      <UContainer>
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="text-center">
            <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100">
              <UIcon name="i-lucide-zap" class="size-6 text-primary-600" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-default">完全免费</h3>
            <p class="mt-2 text-muted">所有功能永久免费，无隐藏收费</p>
          </div>
          <div class="text-center">
            <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100">
              <UIcon name="i-lucide-shield-check" class="size-6 text-primary-600" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-default">无需注册</h3>
            <p class="mt-2 text-muted">即开即用，保护隐私</p>
          </div>
          <div class="text-center">
            <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100">
              <UIcon name="i-lucide-printer" class="size-6 text-primary-600" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-default">高清打印</h3>
            <p class="mt-2 text-muted">生成标准A4尺寸PDF，打印效果清晰</p>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
