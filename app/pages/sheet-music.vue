<script setup lang="ts">
const instrumentFilter = ref('all');
const difficultyFilter = ref('all');
const holidayFilter = ref<string[]>([]);
const expandedSong = ref<number | null>(null);

const instruments = [
  { value: 'all', label: '全部' },
  { value: 'piano', label: '钢琴' },
  { value: 'recorder', label: '竖笛' },
  { value: 'harmonica', label: '口琴' },
  { value: 'choir', label: '合唱' },
];

const difficulties = [
  { value: 'all', label: '全部难度' },
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
];

const holidays = [
  { value: 'spring', label: '春节' },
  { value: 'children', label: '儿童节' },
  { value: 'christmas', label: '圣诞节' },
];

const songs = [
  {
    id: 1,
    title: '小星星',
    key: 'C大调',
    time: '4/4',
    instrument: 'piano',
    difficulty: 'beginner',
    holiday: null,
    lyrics: '一闪一闪亮晶晶，满天都是小星星...',
  },
  {
    id: 2,
    title: '两只老虎',
    key: 'C大调',
    time: '4/4',
    instrument: 'piano',
    difficulty: 'beginner',
    holiday: null,
    lyrics: '两只老虎，两只老虎，跑得快，跑得快...',
  },
  {
    id: 3,
    title: '生日快乐',
    key: 'G大调',
    time: '3/4',
    instrument: 'piano',
    difficulty: 'beginner',
    holiday: null,
    lyrics: '祝你生日快乐，祝你生日快乐...',
  },
  {
    id: 4,
    title: '新年好',
    key: 'C大调',
    time: '2/4',
    instrument: 'choir',
    difficulty: 'beginner',
    holiday: 'spring',
    lyrics: '新年好呀，新年好呀，祝贺大家新年好...',
  },
  {
    id: 5,
    title: '让我们荡起双桨',
    key: 'F大调',
    time: '4/4',
    instrument: 'choir',
    difficulty: 'intermediate',
    holiday: 'children',
    lyrics: '让我们荡起双桨，小船儿推开波浪...',
  },
  {
    id: 6,
    title: '铃儿响叮当',
    key: 'G大调',
    time: '4/4',
    instrument: 'piano',
    difficulty: 'beginner',
    holiday: 'christmas',
    lyrics: 'Jingle bells, jingle bells, jingle all the way...',
  },
  {
    id: 7,
    title: '欢乐颂',
    key: 'D大调',
    time: '4/4',
    instrument: 'recorder',
    difficulty: 'intermediate',
    holiday: null,
    lyrics: '欢乐女神圣洁美丽，灿烂光芒照大地...',
  },
  {
    id: 8,
    title: '茉莉花',
    key: 'G大调',
    time: '4/4',
    instrument: 'harmonica',
    difficulty: 'intermediate',
    holiday: null,
    lyrics: '好一朵美丽的茉莉花，好一朵美丽的茉莉花...',
  },
  {
    id: 9,
    title: '卖报歌',
    key: 'C大调',
    time: '2/4',
    instrument: 'recorder',
    difficulty: 'beginner',
    holiday: null,
    lyrics: '啦啦啦，啦啦啦，我是卖报的小行家...',
  },
  {
    id: 10,
    title: '粉刷匠',
    key: 'C大调',
    time: '2/4',
    instrument: 'piano',
    difficulty: 'beginner',
    holiday: null,
    lyrics: '我是一个粉刷匠，粉刷本领强...',
  },
];

const filteredSongs = computed(() => {
  let result = songs;

  if (instrumentFilter.value !== 'all') {
    result = result.filter((s) => s.instrument === instrumentFilter.value);
  }

  if (difficultyFilter.value !== 'all') {
    result = result.filter((s) => s.difficulty === difficultyFilter.value);
  }

  if (holidayFilter.value.length > 0) {
    result = result.filter((s) => s.holiday && holidayFilter.value.includes(s.holiday));
  }

  return result;
});

function getInstrumentLabel(value: string) {
  return instruments.find((i) => i.value === value)?.label || value;
}

function getDifficultyLabel(value: string) {
  return value === 'beginner' ? '初级' : '中级';
}

function toggleExpand(id: number) {
  expandedSong.value = expandedSong.value === id ? null : id;
}

function handleDownload(title: string) {
  alert(`正在下载 ${title} 乐谱 PDF...`);
}

function handlePlay(title: string) {
  alert(`播放 ${title} 示范音频（10秒）`);
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-default">乐谱天地</h1>
      <p class="mt-2 text-muted">适合儿童的简单乐谱，支持多种乐器</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Left Panel: Filters -->
      <div class="lg:col-span-3">
        <UCard>
          <div class="space-y-6">
            <!-- Instrument Filter -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">乐器类型</label>
              <URadioGroup v-model="instrumentFilter" :items="instruments" orientation="vertical" />
            </div>

            <USeparator />

            <!-- Difficulty Filter -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">难度</label>
              <URadioGroup v-model="difficultyFilter" :items="difficulties" orientation="vertical" />
            </div>

            <USeparator />

            <!-- Holiday Filter -->
            <div>
              <label class="mb-3 block text-sm font-medium text-default">节日（可多选）</label>
              <UCheckboxGroup v-model="holidayFilter" :items="holidays" orientation="vertical" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Panel: Song List -->
      <div class="lg:col-span-9">
        <div class="space-y-4">
          <UCard
            v-for="song in filteredSongs"
            :key="song.id"
            class="card-hover"
          >
            <div class="flex items-start justify-between gap-4">
              <!-- Song Info -->
              <div class="flex-1">
                <button
                  class="text-left"
                  @click="toggleExpand(song.id)"
                >
                  <h3 class="text-lg font-semibold text-default hover:text-primary-600">
                    {{ song.title }}
                  </h3>
                </button>
                <div class="mt-2 flex flex-wrap items-center gap-3">
                  <UBadge color="primary" variant="subtle">
                    {{ getInstrumentLabel(song.instrument) }}
                  </UBadge>
                  <span class="text-sm text-muted">{{ song.key }}</span>
                  <span class="text-sm text-muted">{{ song.time }}</span>
                  <UBadge
                    :color="song.difficulty === 'beginner' ? 'success' : 'warning'"
                    variant="subtle"
                  >
                    {{ getDifficultyLabel(song.difficulty) }}
                  </UBadge>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2">
                <UButton
                  size="sm"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-play"
                  @click="handlePlay(song.title)"
                />
                <UButton
                  size="sm"
                  color="primary"
                  icon="i-lucide-file-text"
                  label="PDF"
                  @click="handleDownload(song.title)"
                />
              </div>
            </div>

            <!-- Expanded Content -->
            <UCollapsible :open="expandedSong === song.id">
              <div class="mt-4 border-t border-default pt-4">
                <!-- Lyrics -->
                <div class="mb-4">
                  <h4 class="mb-2 text-sm font-medium text-default">歌词</h4>
                  <p class="text-sm text-muted">{{ song.lyrics }}</p>
                </div>

                <!-- Sheet Music Preview (Placeholder) -->
                <div class="rounded-lg bg-slate-50 p-4">
                  <div class="flex h-24 items-center justify-center">
                    <div class="text-center">
                      <UIcon name="i-lucide-music-4" class="mx-auto size-8 text-slate-300" />
                      <p class="mt-2 text-sm text-muted">五线谱预览</p>
                    </div>
                  </div>
                </div>
              </div>
            </UCollapsible>
          </UCard>

          <!-- Empty State -->
          <UEmpty
            v-if="filteredSongs.length === 0"
            icon="i-lucide-music-2"
            title="未找到乐谱"
            description="尝试更换筛选条件"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
