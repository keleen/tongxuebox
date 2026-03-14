<script setup lang="ts">
// Hero carousel slides
const slides = [
  {
    title: '智能字帖生成',
    description: '轻松定制专属字帖，让孩子爱上写字，培养良好的书写习惯。',
    buttonText: '立即体验',
    buttonLink: '/chinese-writing',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDw5X1h-KP2UXqTaGnP-tQtP7xVqKZscdjU-4jRZZZZsr33AJN_zpLZPjShztsV20iyOuwsAqu5nx4TJgrEOUNE8jXSyQWj161lPVBVJ4kHkcFjhEtmKV5Ltw8qGrbeyhovjYKWKg-Bl7FIJ5LsjjCdkMEvPNSrLcAeE8W7Db87kPtwE3aDF_H-zOy0dI_84jB0HyUrqdSSm2Ch4LvYj2lGHVsOcih3biz1XMTpCVMpQUgCgN4aWKvwI-TMeDHsWM34wR8-gkXQ2MYt',
  },
  {
    title: '趣味简笔画',
    description: '丰富的简笔画教程，分步指导，激发孩子的绘画兴趣和想象力。',
    buttonText: '开始画画',
    buttonLink: '/drawing-library',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6eGI9hK62zwT5dBOcgeSnuJQq294TXFIx0HY_E8pL4ieoE7IEZeouIe1D6zxm_u50v-quO3EN90GdCmmhNDKQuXFEkkf8H0c661PhoGxOBm7pYdbGaniPPwaN6OmYPOs1Bam3yHfw3CygYTwVSakG9At2wpedZmquijjSs7-Ds2nYSzBlD7eic8VL2PIPbEWl_F9HOpLO-Z1DKUy5YH1QJRlLcMTw6DTgzxs7QMOjQ1ukhu3C4PrT6_riuxL3vKghyIYUOI_k7Zfn',
  },
  {
    title: '口算练习',
    description: '自动生成各年级口算题库，支持在线练习和打印，快速提升计算能力。',
    buttonText: '开始练习',
    buttonLink: '/math-worksheet',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDauZqwrlQyz3GRYAV67-XKaCIL7i5aqskwlqsRGhyyRO0gIrRmtBaij2MUAi8L0Yg9n9rEmcXAl9_A3NClzfnHRTwPq61lnR_cpJcIdmDPCdDeGJpMnVXgWw6pA43qY-K6A-IxGkeJeRZqHhwcRorpYLor8J0lU8g9okPRi61lztGyOFhEKZl-aWW7q8bTJLS9olS1Jw9hwoN001j30iw7ptqYHwl4UucZVLVqbqR3X6t_EOTY8nVC1OmJlrWsFvc71KD7VVulfEK1',
  },
  {
    title: '乐谱天地',
    description: '海量儿童歌曲和钢琴初级乐谱，免费下载打印，让音乐启蒙更简单。',
    buttonText: '浏览乐谱',
    buttonLink: '/sheet-music',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4m30A663RbrHACQC52fErenoPkKYldglK5OosMpUvw5N8QYO_3vNnynQX-X3wU6J4yuDYFmMJmXZQKylfQYRGmrLocYnOZ0-ZoMqhtPls5TwxXjioHkFB4j565no3JS7rkivPEkv0z6oYhU8wfrhfu3aj8wKWOMlsR41VAtwkYOKNlD_y5CeCFJqH4LBL9H1g6gg4s7sPnEmC5eb254Jffx5DuAiqZ-E9bHZdWHhTjXFjpCNYoxQ6Fhl8lXjPPILVdyKVXoa0nNbs',
  },
];

const currentSlide = ref(0);
let slideInterval: ReturnType<typeof setInterval>;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(slideInterval);
});

// Feature cards
const featureCards = [
  {
    title: '字帖生成',
    description: '一键生成专属字帖，支持拼音、笔顺、田字格等多种样式定制。',
    icon: 'i-lucide-file-pen-line',
    to: '/chinese-writing',
    buttonText: '开始制作',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOBbpEbQS23e6h5TAzrW1F1ttGBh-aX4O7A1QT9X-PurLQZxfopcXArbZrpYB9MVBMWDZ_YLn6QIza9h3Su30fHyynW58Bu3JwKmLIbWQxv17e2B8kwTVmwrQ6srweb9c2joXiaWVjVoCmBeZ5JdwODazhDxpgK0mWVJnf8Oq_OyKeQmKK-95o1IKP7KPFNE1KqvblohGWhIY2vCFieH6HulmrcsT2IsAxZlwCQeTJ_UF9dcHF-ykSt8rv-t-o8isLJweZ5mw-jIK2',
  },
  {
    title: '简笔画',
    description: '丰富的简笔画教程，分步指导，激发孩子的绘画兴趣和想象力。',
    icon: 'i-lucide-palette',
    to: '/drawing-library',
    buttonText: '开始画画',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6eGI9hK62zwT5dBOcgeSnuJQq294TXFIx0HY_E8pL4ieoE7IEZeouIe1D6zxm_u50v-quO3EN90GdCmmhNDKQuXFEkkf8H0c661PhoGxOBm7pYdbGaniPPwaN6OmYPOs1Bam3yHfw3CygYTwVSakG9At2wpedZmquijjSs7-Ds2nYSzBlD7eic8VL2PIPbEWl_F9HOpLO-Z1DKUy5YH1QJRlLcMTw6DTgzxs7QMOjQ1ukhu3C4PrT6_riuxL3vKghyIYUOI_k7Zfn',
  },
  {
    title: '乐谱下载',
    description: '海量儿童歌曲和钢琴初级乐谱，免费下载打印，让音乐启蒙更简单。',
    icon: 'i-lucide-music',
    to: '/sheet-music',
    buttonText: '浏览乐谱',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4m30A663RbrHACQC52fErenoPkKYldglK5OosMpUvw5N8QYO_3vNnynQX-X3wU6J4yuDYFmMJmXZQKylfQYRGmrLocYnOZ0-ZoMqhtPls5TwxXjioHkFB4j565no3JS7rkivPEkv0z6oYhU8wfrhfu3aj8wKWOMlsR41VAtwkYOKNlD_y5CeCFJqH4LBL9H1g6gg4s7sPnEmC5eb254Jffx5DuAiqZ-E9bHZdWHhTjXFjpCNYoxQ6Fhl8lXjPPILVdyKVXoa0nNbs',
  },
  {
    title: '口算练习',
    description: '自动生成各年级口算题库，支持在线练习和打印，快速提升计算能力。',
    icon: 'i-lucide-calculator',
    to: '/math-worksheet',
    buttonText: '开始练习',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDauZqwrlQyz3GRYAV67-XKaCIL7i5aqskwlqsRGhyyRO0gIrRmtBaij2MUAi8L0Yg9n9rEmcXAl9_A3NClzfnHRTwPq61lnR_cpJcIdmDPCdDeGJpMnVXgWw6pA43qY-K6A-IxGkeJeRZqHhwcRorpYLor8J0lU8g9okPRi61lztGyOFhEKZl-aWW7q8bTJLS9olS1Jw9hwoN001j30iw7ptqYHwl4UucZVLVqbqR3X6t_EOTY8nVC1OmJlrWsFvc71KD7VVulfEK1',
  },
];

// Recommended tools
const recommendedTools = [
  {
    title: '智能拼音田字格生成器',
    description:
      '输入汉字即可自动生成带有正确拼音、声调和笔顺的田字格字帖。非常适合学前班和小学低年级学生练习硬笔书法，支持一键导出PDF打印。',
    icon: 'i-lucide-type',
    buttonText: '立即制作',
    to: '/chinese-writing',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChUwK5QMRESMg0KptJzE4qeZ_l34Na5N8lW7OdGLm_j0M5LXUuAwOnQvYdGcJTIVAYQdSjyTeAgVVTvvUEt8m-LzV0Yz_rSYO58B8RWEERa48PicSYqoySVRvicX2XAqIHyS90N6wuAuOZpyHvkfBDt2zdRth-x-22Ksp1zZas_uyAfOzUdjD2jF2Ysx-Qb5qB4TZ10OQTYKcpuBPdHHYtTOxt0bto_oNgZewUznjX_ibya-6q-_XV_ND-4ZK5s0hFa_ILOQR5vN1y',
  },
  {
    title: '100以内加减法混合训练',
    description:
      '根据人教版教材大纲设计，随机生成口算题目。支持设置题目数量、难度级别，可在线答题自动批改，也可排版打印成纸质试卷。',
    icon: 'i-lucide-sigma',
    buttonText: '生成试卷',
    to: '/math-worksheet',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyTqQyEGKOdUS8NQ6DpO0xUTXRwMns78xcBoDTZaL-MZxCy0jdAJRQDK9moMZsb26qInJYWBlyi5853Qr548MvYgQcGLWmP2rR3e-56d4ANkSCv-qN8OK-M6_fgOtY0T3dJPvTaSIUCSWhEqhSXh1x-ribladjNmSb8QhDItIUzIqck72RaxfaH_x9GuzgzTEibNYzWnTWnS040x33FslocASurSByodS1G-vvJ6B0z1jAyx19FrvdNCUaUZU6Xc1Zj1Yn3RsidAhM',
  },
];
</script>

<template>
  <div class="page-bg min-h-screen">
    <div class="mx-auto max-w-[1200px] px-4 pb-10 sm:px-10 lg:px-0">
      <!-- Hero Carousel -->
      <section class="group relative mb-10 h-[300px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[400px]">
        <!-- Slides -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-opacity duration-500"
          :class="index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'"
        >
          <div
            class="flex h-full w-full items-center bg-cover bg-center"
            :style="{
              backgroundImage: `linear-gradient(to right, rgba(70, 58, 232, 0.9), rgba(70, 58, 232, 0.4)), url('${slide.image}')`,
            }"
          >
            <div class="max-w-2xl px-10 text-white md:px-20">
              <h1 class="mb-4 text-3xl font-bold md:text-5xl">{{ slide.title }}</h1>
              <p class="mb-8 text-lg opacity-90 md:text-xl">{{ slide.description }}</p>
              <NuxtLink
                :to="slide.buttonLink"
                class="inline-block rounded-xl bg-white px-8 py-3 font-bold text-primary-500 shadow-md transition-colors hover:bg-slate-100"
              >
                {{ slide.buttonText }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            v-for="(_, index) in slides"
            :key="index"
            class="cursor-pointer rounded-full transition-all"
            :class="
              index === currentSlide ? 'h-2 w-8 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/80'
            "
            @click="goToSlide(index)"
          />
        </div>

        <!-- Arrow Navigation -->
        <button
          class="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white/40 group-hover:opacity-100"
          @click="prevSlide"
        >
          <UIcon name="i-lucide-chevron-left" class="size-5" />
        </button>
        <button
          class="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white/40 group-hover:opacity-100"
          @click="nextSlide"
        >
          <UIcon name="i-lucide-chevron-right" class="size-5" />
        </button>
      </section>

      <!-- Feature Cards -->
      <section class="mb-10">
        <h2 class="px-4 pb-4 pt-2 text-2xl font-bold text-slate-900">特色功能</h2>
        <div class="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="card in featureCards"
            :key="card.title"
            class="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="aspect-video w-full bg-cover bg-center"
              :style="{ backgroundImage: `url('${card.image}')` }"
            />
            <div class="flex flex-1 flex-col justify-between gap-4 p-5 pt-2">
              <div>
                <div class="mb-1 flex items-center gap-2">
                  <UIcon :name="card.icon" class="size-5 text-primary-500" />
                  <p class="text-lg font-bold text-slate-900">{{ card.title }}</p>
                </div>
                <p class="text-sm text-slate-500">{{ card.description }}</p>
              </div>
              <NuxtLink
                :to="card.to"
                class="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-primary-500/10 px-4 text-sm font-bold text-primary-500 transition-colors hover:bg-primary-500 hover:text-white"
              >
                {{ card.buttonText }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Recommended Tools -->
      <section>
        <h2 class="px-4 pb-4 pt-4 text-2xl font-bold text-slate-900">热门推荐</h2>
        <div class="flex flex-col gap-4 px-4 pb-10">
          <div
            v-for="tool in recommendedTools"
            :key="tool.title"
            class="flex flex-col items-stretch justify-between gap-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row"
          >
            <div class="flex flex-[2] flex-col justify-center">
              <div class="mb-2 flex items-center gap-2">
                <span class="rounded-lg bg-primary-500/10 p-2">
                  <UIcon :name="tool.icon" class="size-5 text-primary-500" />
                </span>
                <h3 class="text-xl font-bold text-slate-900">{{ tool.title }}</h3>
              </div>
              <p class="mb-6 text-base leading-relaxed text-slate-500">
                {{ tool.description }}
              </p>
              <NuxtLink
                :to="tool.to"
                class="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
              >
                <UIcon name="i-lucide-arrow-right" class="size-4" />
                <span>{{ tool.buttonText }}</span>
              </NuxtLink>
            </div>
            <div
              class="aspect-video w-full flex-1 rounded-lg bg-cover bg-center sm:aspect-auto sm:w-1/3"
              :style="{ backgroundImage: `url('${tool.image}')` }"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
