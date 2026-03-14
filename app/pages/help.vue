<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();

const faqItems = [
  {
    label: '如何打印才能不偏移？',
    content:
      '建议在打印设置中选择"实际大小"而非"缩放适应页面"。如果使用 Adobe Reader 打印，请确保在打印对话框中选择"实际大小"选项。对于浏览器打印，建议取消勾选"页眉和页脚"选项。',
    icon: 'i-lucide-printer',
  },
  {
    label: '字体显示异常怎么办？',
    content:
      '如果您在预览或打印时发现字体显示不正常，可能是因为系统缺少相应字体。对于中文字帖，建议安装"楷体"字体；对于英文练习，建议安装相应的手写字体。教师用户可以联系我们获取字体安装指南。',
    icon: 'i-lucide-type',
  },
  {
    label: '可以商用吗？',
    content:
      '童学宝盒生成的所有内容允许用于教学目的，包括学校、培训机构和家庭教育使用。但禁止将生成的内容直接转售或用于商业印刷品销售。如有特殊商用需求，请联系我们。',
    icon: 'i-lucide-briefcase',
  },
  {
    label: '为什么生成的 PDF 打不开？',
    content:
      '请确保您使用的是最新版本的 PDF 阅读器（推荐 Adobe Reader）。如果问题持续存在，可以尝试使用浏览器自带的打印功能（Ctrl+P）直接打印页面预览内容。',
    icon: 'i-lucide-file-question',
  },
  {
    label: '如何选择适合孩子的难度？',
    content:
      '对于刚开始学习的幼儿园和一年级学生，建议从简单内容开始，如20以内加减法、简单汉字等。随着孩子的进步，可以逐步增加难度。每个功能模块都有难度标识供参考。',
    icon: 'i-lucide-graduation-cap',
  },
  {
    label: '网站是否会收集个人信息？',
    content:
      '童学宝盒不要求用户注册，也不收集任何个人信息。所有内容生成都在您的浏览器本地完成，我们不会存储您输入的任何内容。',
    icon: 'i-lucide-shield-check',
  },
];

const schema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  message: z.string().min(10, '问题描述至少需要10个字符'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: '',
  email: '',
  message: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // In a real implementation, this would send the form data to a server
  console.log('Form submitted:', event.data);
  toast.add({
    title: '感谢您的反馈！',
    description: '我们会尽快回复您的问题。',
    icon: 'i-lucide-check-circle',
    color: 'success',
  });
  // Reset form
  state.name = '';
  state.email = '';
  state.message = '';
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-default">帮助中心</h1>
      <p class="mt-2 text-muted">常见问题解答和联系方式</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- FAQ Section -->
      <div class="lg:col-span-7">
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold text-default">常见问题</h2>
          </template>

          <UAccordion
            :items="faqItems"
            type="single"
            collapsible
          >
            <template #leading="{ item }">
              <UIcon :name="item.icon" class="size-5 text-primary-500" />
            </template>
          </UAccordion>
        </UCard>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-5">
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold text-default">联系我们</h2>
          </template>

          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField name="name" label="姓名">
              <UInput v-model="state.name" placeholder="请输入您的姓名" />
            </UFormField>

            <UFormField name="email" label="邮箱">
              <UInput v-model="state.email" type="email" placeholder="请输入您的邮箱" />
            </UFormField>

            <UFormField name="message" label="问题描述">
              <UTextarea
                v-model="state.message"
                :rows="4"
                placeholder="请详细描述您遇到的问题或建议"
              />
            </UFormField>

            <UButton type="submit" label="提交反馈" icon="i-lucide-send" class="w-full" />
          </UForm>

          <template #footer>
            <div class="text-center text-sm text-muted">
              或发送邮件至
              <a href="mailto:support@tongxuebox.com" class="text-primary-600 hover:underline">
                support@tongxuebox.com
              </a>
            </div>
          </template>
        </UCard>

        <!-- Quick Tips -->
        <UCard class="mt-6">
          <template #header>
            <h2 class="text-xl font-semibold text-default">使用小贴士</h2>
          </template>

          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-lightbulb" class="mt-0.5 size-5 text-amber-500" />
              <span class="text-muted">使用 A4 纸打印可获得最佳效果</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-lightbulb" class="mt-0.5 size-5 text-amber-500" />
              <span class="text-muted">建议每天练习15-20分钟，养成良好习惯</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-lightbulb" class="mt-0.5 size-5 text-amber-500" />
              <span class="text-muted">可以将本站添加到浏览器书签，方便下次访问</span>
            </li>
          </ul>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
