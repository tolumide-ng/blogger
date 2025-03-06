<script setup lang="ts">
import { Page, Status } from '@/utils/types';
import TextEditor from '../TextEditor/TextEditor.vue';
import { useRoute, useRouter } from 'vue-router';

type State = {
  title: string;
  post: string;
  author: string;
  description: string;
};

type Props = {
  onSubmit: () => Promise<void>;
  status: Status;
};

const state = defineModel<State>({ required: true });
const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();
const pageName = route.name;

function handleCancel() {
  router.push({ name: Page.Home });
}
</script>
<template>
  <div class="blog">
    <div class="blog__header">
      <h1 class="blog__header-title">
        {{ pageName === Page.CreateBlogPost ? 'Create' : 'Edit' }} blog entry
      </h1>
    </div>

    <form class="blog__entry" @submit.prevent="props.onSubmit">
      <div class="blog__entry-data">
        <label for="title" class="blog__entry-label"> Title </label>
        <input
          type="text"
          class="blog__entry-input"
          name="title"
          v-model="state.title"
          required
        />
      </div>

      <div class="blog__entry-data">
        <label for="title" class="blog__entry-label"> Description </label>
        <input
          type="text"
          class="blog__entry-input"
          name="description"
          v-model="state.description"
        />
      </div>

      <div class="blog__entry-data">
        <label for="author" class="blog__entry-label"> Author </label>
        <input
          type="author"
          class="blog__entry-input"
          name="author"
          v-model="state.author"
        />
      </div>

      <div class="blog__entry-data">
        <label for="author" class="blog__entry-label"> Body </label>
        <div class="blog__entry-editor">
          <TextEditor v-model="state.post" :status="status" />
        </div>
      </div>

      <div class="blog__entry-actions">
        <button
          type="button"
          class="blog__entry-button"
          @click="handleCancel"
          v-if="pageName === Page.EditBlogPost"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="blog__entry-button blog__entry-submit"
          :disabled="status === Status.Loading"
        >
          {{ pageName === Page.CreateBlogPost ? 'Submit' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>
<style lang="css" scoped>
.blog__header {
  border-bottom: 1px solid var(--color-default);
  margin-bottom: 2rem;
}

.blog__header-title {
  font-weight: bold;
  font-size: 1.25rem;
}

.blog__entry {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.blog__entry-data {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.blog__entry-label {
  font-size: 0.875rem;
}

.blog__entry-input {
  padding: 0.5rem;
  border: 1px solid var(--color-default);
  border-radius: var(--border-sm);
}

.blog__entry-editor {
  margin-top: 0.5rem;
}

.blog__entry-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
}

.blog__entry-button {
  padding: 0.5rem 1.25rem;
  border-radius: var(--border-sm);
  border: 1px solid var(--color-gray);
  background-color: transparent;
}

.blog__entry-submit {
  background-color: lightblue;
  border: none;
}

.blog__entry-button:active {
  transform: scale(0.95);
}
</style>
