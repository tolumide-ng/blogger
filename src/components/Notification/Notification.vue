<script setup lang="ts">
import { NoticeType } from '@/utils/types';

type Props = {
  title: string;
  message: string;
  type: NoticeType;
};
const { title, message } = defineProps<Props>();
</script>
<template>
  <article class="notice">
    <div
      :class="[
        {
          'notice-error': type === NoticeType.Error,
          'notice-warning': type === NoticeType.Warning,
        },
        'notice__container',
      ]"
    >
      <h2 class="notice__title">{{ title }}</h2>
      <p>{{ message }}</p>

      <RouterLink class="notice__button" to="/">Go Back Home</RouterLink>
    </div>
  </article>
</template>
<style scoped>
.notice {
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  justify-content: center;
  margin-top: 5rem;
}

.notice__container {
  width: calc(min(40rem, 80%));
  padding: 2rem 1rem;
  border-radius: var(--border-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.notice__title {
  font-size: 1.375rem;
  margin-bottom: 1rem;
}

.notice-error {
  --color-default: var(--color-softerror);
  border: 1px solid var(--color-default);
}

.notice-warning {
  --color-default: var(--color-softwarning);
}

.notice__button {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-sm);
  background-color: white;
  border: 1px solid var(--color-default);
}
</style>
